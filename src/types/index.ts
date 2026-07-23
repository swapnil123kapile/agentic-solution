// ============================================================
// Boardroom AI — AI Lending Advisory Platform
// Shared TypeScript Types
// ============================================================

export type Role = 'user' | 'assistant';
export type AIModel = 'GPT-4o' | 'Claude 3.5' | 'Gemini 1.5';

export interface ChatIntent {
  sectionKey: SimulationSectionKey | null;
  markdown: string;
}

export interface ChatMessage {
  id: string;
  role: Role;
  content: string;
  createdAt: number;
  section?: SimulationSectionKey;
  streaming?: boolean;
}

export type SimulationStatus = 'idle' | 'running' | 'completed' | 'failed';

export type SimulationSectionKey =
  | 'simulationSummary'
  | 'currentKpis'
  | 'simulationProgress'
  | 'bankPerformance'
  | 'customerFunnel'
  | 'lossAnalysis'
  | 'improvementSimulator'
  | 'recommendations'
  | 'customerFeedback'
  | 'scenarioComparison';

// ---------- Card 1: Simulation Summary ----------
export interface SimulationSummary {
  scenarioName: string;
  status: SimulationStatus;
  currentTimestep: number;
  totalTimesteps: number;
  progress: number; // 0-100
  personas: { banks: number; consumers: number };
  description: string;
}

// ---------- Card 2: Current KPIs ----------
export interface SimulationKpis {
  dbWins: number;
  competitorWins: number;
  dropOffs: number;
  recoverableLosses: number;
  dbWinRate: number; // percentage
  totalCustomers: number;
}

// ---------- Card 3: Simulation Progress ----------
export interface ReplayStep {
  timestep: number;
  label: string;
  dbWins: number;
  competitorWins: number;
  dropOffs: number;
}
export interface SimulationProgress {
  steps: ReplayStep[];
}

// ---------- Card 4: Bank Performance ----------
export interface BankPerformance {
  bank: string;
  winRate: number;
  offers: number;
  approvalRate: number;
}
export interface BankPerformanceData {
  banks: BankPerformance[];
}

// ---------- Card 5: Customer Funnel ----------
export interface FunnelStage {
  id: string;
  stage: string;
  value: number;
  color: string;
}
export interface CustomerFunnel {
  stages: FunnelStage[];
}

// ---------- Card 6: Loss Analysis ----------
export interface LossReason {
  id: string;
  reason: string;
  value: number;
  color: string;
}
export interface LossAnalysis {
  totalLosses: number;
  reasons: LossReason[];
  topReason: string;
  recommendation: string;
}

// ---------- Card 7: Improvement Simulator ----------
export interface ImprovementToggle {
  id: string;
  label: string;
  description: string;
  icon: string;
  active: boolean;
  // projected deltas when active
  winRateDelta: number;
  recoverableDelta: number;
  dropOffDelta: number;
}
export interface ImprovementProjection {
  projectedWinRate: number;
  projectedRecoverable: number;
  projectedDropOffs: number;
  uplift: number;
}
export interface ImprovementSimulator {
  toggles: ImprovementToggle[];
}

// ---------- Card 8: Recommendations ----------
export type Priority = 'high' | 'medium' | 'low';
export type Complexity = 'high' | 'medium' | 'low';
export interface Recommendation {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  expectedImpact: string;
  complexity: Complexity;
  owner: string;
}
export interface Recommendations {
  recommendations: Recommendation[];
}

// ---------- Card 9: Customer Feedback ----------
export type Sentiment = 'positive' | 'neutral' | 'negative';
export interface FeedbackEntry {
  id: string;
  customer: string;
  persona: string;
  sentiment: Sentiment;
  rating: number; // 1-5
  comment: string;
  timestep: number;
}
export interface CustomerFeedback {
  entries: FeedbackEntry[];
}

// ---------- Card 10: Scenario Comparison ----------
export interface ScenarioKpi {
  label: string;
  baseline: number;
  improved: number;
}
export interface ScenarioComparison {
  baselineName: string;
  improvedName: string;
  kpis: ScenarioKpi[];
  summary: string;
}

// ---------- Full Simulation State ----------
export interface Simulation {
  summary: SimulationSummary;
  kpis: SimulationKpis;
  progress: SimulationProgress;
  bankPerformance: BankPerformanceData;
  funnel: CustomerFunnel;
  losses: LossAnalysis;
  improvements: ImprovementSimulator;
  recommendations: Recommendations;
  feedback: CustomerFeedback;
  comparison: ScenarioComparison;
}

export interface SectionMeta {
  key: SimulationSectionKey;
  number: number;
  title: string;
  icon: string;
}

export const SECTION_ORDER: SectionMeta[] = [
  { key: 'simulationSummary', number: 1, title: 'Simulation Summary', icon: 'Activity' },
  { key: 'currentKpis', number: 2, title: 'Current KPIs', icon: 'Gauge' },
  { key: 'simulationProgress', number: 3, title: 'Simulation Progress', icon: 'PlayCircle' },
  { key: 'bankPerformance', number: 4, title: 'Bank Performance', icon: 'Building2' },
  { key: 'customerFunnel', number: 5, title: 'Customer Funnel', icon: 'Filter' },
  { key: 'lossAnalysis', number: 6, title: 'Loss Analysis', icon: 'TrendingDown' },
  { key: 'improvementSimulator', number: 7, title: 'Improvement Simulator', icon: 'SlidersHorizontal' },
  { key: 'recommendations', number: 8, title: 'Recommendations', icon: 'Lightbulb' },
  { key: 'customerFeedback', number: 9, title: 'Customer Feedback', icon: 'MessageSquareQuote' },
  { key: 'scenarioComparison', number: 10, title: 'Scenario Comparison', icon: 'GitCompare' },
];

export const SCENARIOS = ['Baseline', 'Aggressive Pricing', 'Faster Approval', 'Digital-First', 'Premium Service'] as const;
export type ScenarioName = (typeof SCENARIOS)[number];
