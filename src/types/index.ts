// ============================================================
// Boardroom AI — Agentic Lending World Simulation Platform
// Shared TypeScript Types
// ============================================================

export type Role = 'user' | 'assistant';
export type AIModel = 'GPT-4o' | 'Claude 3.5' | 'Gemini 1.5';

export interface ChatMessage {
  id: string;
  role: Role;
  content: string;
  createdAt: number;
  section?: SimulationSectionKey;
  streaming?: boolean;
}

export interface ChatIntent {
  sectionKey: SimulationSectionKey | null;
  markdown: string;
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
  | 'scenarioComparison'
  | 'worldIntelligence'
  | 'marketplaceIntelligence'
  | 'bankIntelligence'
  | 'consumerIntelligence'
  | 'simulationHealth';

// ---------- Simulation Summary ----------
export interface SimulationSummary {
  scenarioName: string;
  status: SimulationStatus;
  currentTimestep: number;
  totalTimesteps: number;
  progress: number;
  personas: { banks: number; consumers: number };
  description: string;
}

// ---------- KPIs ----------
export interface SimulationKpis {
  totalConsumers: number;
  activeConsumers: number;
  dbWins: number;
  competitorWins: number;
  dropOffs: number;
  recoverableLosses: number;
  conversionRate: number;
  dbWinRate: number;
}

// ---------- Replay ----------
export interface ReplayStep {
  timestep: number;
  label: string;
  dbWins: number;
  competitorWins: number;
  dropOffs: number;
  activeConsumers: number;
}
export interface SimulationProgress {
  steps: ReplayStep[];
}

// ---------- Bank Performance ----------
export interface BankPerformance {
  bank: string;
  winRate: number;
  offers: number;
  approvalRate: number;
}
export interface BankPerformanceData {
  banks: BankPerformance[];
}

// ---------- Funnel ----------
export interface FunnelStage {
  id: string;
  stage: string;
  value: number;
  color: string;
}
export interface CustomerFunnel {
  stages: FunnelStage[];
}

// ---------- Loss Analysis ----------
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

// ---------- Improvement Simulator ----------
export interface ImprovementToggle {
  id: string;
  label: string;
  description: string;
  icon: string;
  active: boolean;
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

// ---------- Recommendations ----------
export type Priority = 'high' | 'medium' | 'low';
export type Complexity = 'high' | 'medium' | 'low';
export type ImplementationStatus = 'not_started' | 'in_progress' | 'completed';
export interface Recommendation {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  expectedImpact: string;
  expectedWinIncrease: number;
  complexity: Complexity;
  owner: string;
  status: ImplementationStatus;
}
export interface Recommendations {
  recommendations: Recommendation[];
}

// ---------- Feedback ----------
export type Sentiment = 'positive' | 'neutral' | 'negative';
export interface FeedbackEntry {
  id: string;
  customer: string;
  persona: string;
  sentiment: Sentiment;
  rating: number;
  comment: string;
  timestep: number;
}
export interface CustomerFeedback {
  entries: FeedbackEntry[];
}

// ---------- Scenario Comparison ----------
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

// ---------- World Intelligence ----------
export type NewsCategory = 'economic' | 'interest_rate' | 'inflation' | 'employment' | 'sentiment' | 'policy';
export interface WorldNewsItem {
  id: string;
  timestep: number;
  category: NewsCategory;
  headline: string;
  summary: string;
  sentiment: Sentiment;
  impact: 'high' | 'medium' | 'low';
}
export interface WorldIntelligence {
  items: WorldNewsItem[];
}

// ---------- Marketplace Intelligence ----------
export interface MarketplaceRanking {
  rank: number;
  bank: string;
  bankId: string;
  score: number;
  visibility: number;
  rankChange: number;
}
export interface MarketplaceRecommendation {
  id: string;
  bank: string;
  title: string;
  detail: string;
  priority: Priority;
}
export interface MarketplaceIntelligence {
  rankings: MarketplaceRanking[];
  recommendations: MarketplaceRecommendation[];
  trends: { timestep: number; visibilityAvg: number; offersTotal: number }[];
}

// ---------- Bank Intelligence ----------
export interface BankOffer {
  offerId: string;
  productName: string;
  productType: string;
  interestRateApr: number;
  effectiveRateApr: number;
  processingFeePct: number;
  minAmount: number;
  maxAmount: number;
  minTermMonths: number;
  maxTermMonths: number;
}
export interface BankAction {
  timestep: number;
  actionType: string;
  detail: string;
  visibility: 'public' | 'private';
}
export interface BankMarketingCampaign {
  timestep: number;
  description: string;
}
export interface BankIntelligenceItem {
  bankId: string;
  bankName: string;
  shortName: string;
  color: string;
  reputation: number;
  winRate: number;
  offers: BankOffer[];
  actions: BankAction[];
  campaigns: BankMarketingCampaign[];
}
export interface BankIntelligenceData {
  banks: BankIntelligenceItem[];
}

// ---------- Consumer Intelligence ----------
export interface ConsumerAction {
  timestep: number;
  actionType: string;
  funnelStageBefore: string;
  funnelStageAfter: string;
  selectedBank: string;
}
export interface ConsumerIntelligenceItem {
  consumerId: string;
  consumerName: string;
  persona: string;
  funnelStage: string;
  selectedBank: string;
  approvalStatus: string;
  loanAmount: number;
  interestRate: number;
  journey: ConsumerAction[];
}
export interface ConsumerIntelligenceData {
  consumers: ConsumerIntelligenceItem[];
}

// ---------- Simulation Health ----------
export type ValidationStatus = 'valid' | 'repaired' | 'invalid';
export interface SimHealthIssue {
  id: string;
  timestep: number;
  source: string;
  status: ValidationStatus;
  errorCount: number;
  repairStatus: string;
  message: string;
}
export interface SimulationHealth {
  totalRows: number;
  validRows: number;
  repairedRows: number;
  invalidRows: number;
  issues: SimHealthIssue[];
}

// ---------- Full Simulation ----------
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
  world: WorldIntelligence;
  marketplace: MarketplaceIntelligence;
  bankIntel: BankIntelligenceData;
  consumerIntel: ConsumerIntelligenceData;
  health: SimulationHealth;
}

export const SCENARIOS = ['Baseline', 'Aggressive Pricing', 'Faster Approval', 'Digital-First', 'Premium Service'] as const;
export type ScenarioName = (typeof SCENARIOS)[number];
