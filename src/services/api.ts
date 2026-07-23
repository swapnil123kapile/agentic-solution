import type { Simulation, SimulationSectionKey } from '@/types';
import { seedSimulation } from '@/data/sampleData';

// ============================================================
// API SERVICE LAYER
// ------------------------------------------------------------
// Every backend interaction is isolated here so swapping from
// mock data to the real FastAPI backend is a one-file change.
//
// EXPECTED BACKEND ENDPOINTS (FastAPI):
//   POST /api/simulations/run          -> run a lending-world sim
//   GET  /api/simulations/:id          -> full simulation JSON
//   GET  /api/simulations/:id/kpis     -> KPIs (card 2)
//   GET  /api/simulations/:id/funnel   -> funnel (card 5)
//   GET  /api/simulations/:id/losses   -> loss analysis (card 6)
//   POST /api/simulations/:id/improve  -> improvement projection (card 7)
//   GET  /api/simulations/:id/recommendations
//   GET  /api/simulations/:id/feedback
//   POST /api/simulations/compare      -> baseline vs improved (card 10)
//   POST /api/chat                     -> copilot streaming (SSE)
//   GET  /api/scenarios                -> available scenarios
//   GET  /api/simulations/:id/replay   -> timeline replay data (card 3)
//   GET  /api/export/csv/:id           -> CSV download
//   GET  /api/export/pdf/:id           -> PDF download
// ============================================================

const API_BASE = (import.meta as unknown as { env?: Record<string, string> }).env?.VITE_API_BASE_URL ?? '';

// Latency to simulate a real network round-trip while on mock data.
const MOCK_DELAY = 280;

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getJson<T>(path: string, fallback: T): Promise<T> {
  if (!API_BASE) {
    await delay(MOCK_DELAY);
    return fallback;
  }
  const res = await fetch(`${API_BASE}${path}`);
  if (!res.ok) throw new Error(`GET ${path} failed: ${res.status}`);
  return (await res.json()) as T;
}

async function postJson<T>(path: string, body: unknown, fallback: T): Promise<T> {
  if (!API_BASE) {
    await delay(MOCK_DELAY);
    return fallback;
  }
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`POST ${path} failed: ${res.status}`);
  return (await res.json()) as T;
}

// ---------- Simulation lifecycle ----------

export async function fetchSimulation(scenario: string): Promise<Simulation> {
  return getJson(`/api/simulations/${encodeURIComponent(scenario)}`, seedSimulation);
}

export interface RunSimulationResponse {
  simulationId: string;
  status: 'running' | 'completed';
}

export async function runSimulation(scenario: string): Promise<RunSimulationResponse> {
  return postJson('/api/simulations/run', { scenario }, {
    simulationId: `sim-${Date.now()}`,
    status: 'running',
  });
}

// ---------- Improvement projection ----------
// POST /api/simulations/:id/improve  { activeLevers: string[] }
export interface ImprovementRequest {
  activeLevers: string[];
}
export interface ImprovementProjectionResponse {
  projectedWinRate: number;
  projectedRecoverable: number;
  projectedDropOffs: number;
  uplift: number;
}
export async function fetchImprovementProjection(
  levers: string[],
  fallback: ImprovementProjectionResponse
): Promise<ImprovementProjectionResponse> {
  return postJson('/api/simulations/baseline/improve', { activeLevers: levers } as ImprovementRequest, fallback);
}

// ---------- Copilot chat ----------
// POST /api/chat  { message, model, context }
// Streaming via Server-Sent Events when the backend is live.
export interface ChatRequest {
  message: string;
  model: string;
  scenario: string;
}

export interface ChatIntent {
  sectionKey: SimulationSectionKey | null;
  markdown: string;
}

// ---------- Scenario compare ----------
// POST /api/simulations/compare { baseline, improved }
export async function fetchScenarioComparison(
  baseline: string,
  improved: string
) {
  return postJson('/api/simulations/compare', { baseline, improved }, seedSimulation.comparison);
}

// ---------- Export ----------
export function exportUrl(format: 'csv' | 'pdf', simulationId = 'baseline'): string {
  if (API_BASE) return `${API_BASE}/api/export/${format}/${simulationId}`;
  return '';
}

export { API_BASE };
