import { create } from 'zustand';
import type {
  AIModel,
  ChatMessage,
  ImprovementProjection,
  ImprovementToggle,
  ScenarioName,
  Simulation,
  SimulationSectionKey,
} from '@/types';
import { seedSimulation } from '@/data/sampleData';
import { resolvePrompt } from '@/services/aiService';

// ============================================================
// Boardroom AI — Global store (Zustand)
// Manages: simulation, replay state, KPIs, losses, recommendations,
// feedback, chat, world news, marketplace, bank/consumer intel,
// selected scenario, selected timestep.
// ============================================================

function uid(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

interface AppState {
  simulation: Simulation;
  selectedScenario: ScenarioName;
  selectedTimestep: number;
  currentSection: SimulationSectionKey | null;
  simulationRunning: boolean;

  // replay controls
  isPlaying: boolean;
  replaySpeed: number;

  // projection
  projection: ImprovementProjection | null;

  // chat
  messages: ChatMessage[];
  model: AIModel;
  loading: boolean;

  // filters
  consumerSearch: string;
  feedbackFilter: 'all' | 'positive' | 'negative' | 'neutral';

  // actions
  setScenario: (s: ScenarioName) => void;
  setTimestep: (t: number) => void;
  setCurrentSection: (k: SimulationSectionKey | null) => void;
  runSimulation: () => void;
  togglePlay: () => void;
  setReplaySpeed: (s: number) => void;
  stepForward: () => void;
  stepBackward: () => void;
  toggleImprovement: (id: string) => void;
  recomputeProjection: () => void;
  setModel: (m: AIModel) => void;
  sendPrompt: (prompt: string) => void;
  resetChat: () => void;
  setConsumerSearch: (q: string) => void;
  setFeedbackFilter: (f: 'all' | 'positive' | 'negative' | 'neutral') => void;
}

let replayTimer: ReturnType<typeof setInterval> | null = null;

export const useAppStore = create<AppState>((set, get) => ({
  simulation: seedSimulation,
  selectedScenario: 'Baseline',
  selectedTimestep: 24,
  currentSection: null,
  simulationRunning: false,
  isPlaying: false,
  replaySpeed: 1,
  projection: null,

  messages: [
    {
      id: uid(),
      role: 'assistant',
      content:
        "Hi Swapnil — I'm your **Boardroom AI** copilot. I can analyze your lending world simulation across KPIs, marketplace intelligence, bank actions, consumer journeys, losses, and feedback. Try **Summarize Simulation** or **Explain Customer Losses** to get started.",
      createdAt: Date.now(),
    },
  ],
  model: 'GPT-4o',
  loading: false,

  consumerSearch: '',
  feedbackFilter: 'all',

  setScenario: (s) =>
    set((st) => ({
      selectedScenario: s,
      simulation: {
        ...st.simulation,
        summary: { ...st.simulation.summary, scenarioName: s },
      },
    })),

  setTimestep: (t) => set({ selectedTimestep: t }),

  setCurrentSection: (k) => set({ currentSection: k }),

  runSimulation: () => {
    set({ simulationRunning: true });
    let step = 0;
    const total = 24;
    const interval = setInterval(() => {
      step += 1;
      set((st) => ({
        simulation: {
          ...st.simulation,
          summary: {
            ...st.simulation.summary,
            status: 'running',
            currentTimestep: step,
            progress: Math.round((step / total) * 100),
          },
        },
        selectedTimestep: step,
      }));
      if (step >= total) {
        clearInterval(interval);
        set((st) => ({
          simulationRunning: false,
          simulation: {
            ...st.simulation,
            summary: { ...st.simulation.summary, status: 'completed', progress: 100 },
          },
        }));
      }
    }, 120);
  },

  togglePlay: () => {
    const { isPlaying, selectedTimestep, simulation } = get();
    const total = simulation.summary.totalTimesteps;

    if (isPlaying) {
      if (replayTimer) clearInterval(replayTimer);
      set({ isPlaying: false });
      return;
    }

    set({ isPlaying: true });
    const startStep = selectedTimestep >= total ? 1 : selectedTimestep;
    set({ selectedTimestep: startStep });

    replayTimer = setInterval(() => {
      const cur = get().selectedTimestep;
      if (cur >= total) {
        if (replayTimer) clearInterval(replayTimer);
        set({ isPlaying: false });
        return;
      }
      set({ selectedTimestep: cur + 1 });
    }, 800 / get().replaySpeed);
  },

  setReplaySpeed: (s) => set({ replaySpeed: s }),

  stepForward: () => {
    const cur = get().selectedTimestep;
    const total = get().simulation.summary.totalTimesteps;
    if (cur < total) set({ selectedTimestep: cur + 1 });
  },

  stepBackward: () => {
    const cur = get().selectedTimestep;
    if (cur > 1) set({ selectedTimestep: cur - 1 });
  },

  toggleImprovement: (id) => {
    set((st) => ({
      simulation: {
        ...st.simulation,
        improvements: {
          ...st.simulation.improvements,
          toggles: st.simulation.improvements.toggles.map((t) =>
            t.id === id ? { ...t, active: !t.active } : t
          ),
        },
      },
    }));
    get().recomputeProjection();
  },

  recomputeProjection: () => {
    const { simulation } = get();
    const active: ImprovementToggle[] = simulation.improvements.toggles.filter((t) => t.active);
    const base = simulation.kpis;
    let winRate = base.dbWinRate;
    let recoverable = base.recoverableLosses;
    let dropOffs = base.dropOffs;
    for (const t of active) {
      winRate += t.winRateDelta;
      recoverable += t.recoverableDelta;
      dropOffs += t.dropOffDelta;
    }
    const uplift = winRate - base.dbWinRate;
    set({
      projection: {
        projectedWinRate: Math.round(winRate * 10) / 10,
        projectedRecoverable: Math.max(0, Math.round(recoverable)),
        projectedDropOffs: Math.max(0, Math.round(dropOffs)),
        uplift: Math.round(uplift * 10) / 10,
      },
    });
  },

  setModel: (m) => set({ model: m }),

  sendPrompt: (prompt) => {
    if (!prompt.trim() || get().loading) return;

    const userMsg: ChatMessage = { id: uid(), role: 'user', content: prompt, createdAt: Date.now() };
    const assistantId = uid();
    const assistantMsg: ChatMessage = { id: assistantId, role: 'assistant', content: '', createdAt: Date.now(), streaming: true };

    set((s) => ({ messages: [...s.messages, userMsg, assistantMsg], loading: true }));

    const sim = get().simulation;
    const intent = resolvePrompt(prompt, sim);
    if (intent.sectionKey) set({ currentSection: intent.sectionKey });

    const full = intent.markdown;
    const chunkSize = 4;
    let i = 0;
    const tick = () => {
      if (i >= full.length) {
        set((s) => ({
          loading: false,
          messages: s.messages.map((m) => (m.id === assistantId ? { ...m, content: full, streaming: false } : m)),
        }));
        return;
      }
      i += chunkSize;
      const partial = full.slice(0, i);
      set((s) => ({
        messages: s.messages.map((m) => (m.id === assistantId ? { ...m, content: partial, streaming: true } : m)),
      }));
      setTimeout(tick, 16);
    };
    setTimeout(tick, 240);
  },

  resetChat: () =>
    set({
      messages: [
        {
          id: uid(),
          role: 'assistant',
          content: "Hi Swapnil — I'm your **Boardroom AI** copilot. How can I help analyze your lending world simulation?",
          createdAt: Date.now(),
        },
      ],
    }),

  setConsumerSearch: (q) => set({ consumerSearch: q }),
  setFeedbackFilter: (f) => set({ feedbackFilter: f }),
}));
