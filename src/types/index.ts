// ============================================================
// PitchBook Advisory Assistant — Shared TypeScript Types
// ============================================================

export type Role = 'user' | 'assistant';

export type AIModel = 'GPT-4o' | 'Claude 3.5' | 'Gemini 1.5';

export interface ChatMessage {
  id: string;
  role: Role;
  content: string;
  createdAt: number;
  section?: PitchBookSectionKey;
  streaming?: boolean;
}

// ---------- Section keys ----------
export type PitchBookSectionKey =
  | 'executiveSummary'
  | 'clientSnapshot'
  | 'industryOverview'
  | 'keyTrends'
  | 'competitiveLandscape'
  | 'growthOpportunities'
  | 'recentMA'
  | 'potentialTargets'
  | 'strategicRecommendations'
  | 'nextSteps';

// ---------- 1. Executive Summary ----------
export interface ExecutiveSummary {
  overview: string;
  highlights: string[];
  keyTakeaway: string;
}

// ---------- 2. Client Snapshot ----------
export interface ClientSnapshot {
  clientName: string;
  industry: string;
  relationshipManager: string;
  region: string;
  revenue: string;
  employees: string;
  engagementObjective: string;
}

// ---------- 3. Industry Overview ----------
export interface IndustryOverview {
  marketSize: string;
  cagr: string;
  growth: string;
  chart: { year: string; value: number }[];
  highlights: string[];
}

// ---------- 4. Key Trends ----------
export type TrendImpact = 'high' | 'medium' | 'low';
export interface KeyTrend {
  id: string;
  title: string;
  impact: TrendImpact;
  description: string;
}
export interface KeyTrends {
  trends: KeyTrend[];
}

// ---------- 5. Competitive Landscape ----------
export interface Competitor {
  id: string;
  name: string;
  marketShare: number;
}
export interface CompetitiveLandscape {
  competitors: Competitor[];
  chart: { name: string; share: number }[];
}

// ---------- 6. Growth Opportunities ----------
export interface GrowthOpportunity {
  id: string;
  title: string;
  description: string;
  icon: string;
}
export interface GrowthOpportunities {
  opportunities: GrowthOpportunity[];
}

// ---------- 7. Recent M&A ----------
export interface MARecord {
  id: string;
  company: string;
  acquirer: string;
  dealSize: string;
  date: string;
}
export interface RecentMA {
  records: MARecord[];
}

// ---------- 8. Potential Targets ----------
export type FitRecommendation = 'Strong Fit' | 'Good Fit' | 'Watch';
export interface PotentialTarget {
  id: string;
  company: string;
  industry: string;
  fitScore: number;
  recommendation: FitRecommendation;
}
export interface PotentialTargets {
  targets: PotentialTarget[];
}

// ---------- 9. Strategic Recommendations ----------
export type Priority = 'high' | 'medium' | 'low';
export interface StrategicRecommendation {
  id: string;
  title: string;
  owner: string;
  priority: Priority;
  expectedImpact: string;
  completed: boolean;
}
export interface StrategicRecommendations {
  recommendations: StrategicRecommendation[];
}

// ---------- 10. Next Steps ----------
export type TimelineStatus = 'completed' | 'active' | 'pending';
export interface TimelineStep {
  id: string;
  label: string;
  status: TimelineStatus;
  date: string;
}
export interface NextSteps {
  steps: TimelineStep[];
}

// ---------- Full PitchBook ----------
export interface PitchBook {
  clientSnapshot: ClientSnapshot | null;
  executiveSummary: ExecutiveSummary | null;
  industryOverview: IndustryOverview | null;
  keyTrends: KeyTrends | null;
  competitiveLandscape: CompetitiveLandscape | null;
  growthOpportunities: GrowthOpportunities | null;
  recentMA: RecentMA | null;
  potentialTargets: PotentialTargets | null;
  strategicRecommendations: StrategicRecommendations | null;
  nextSteps: NextSteps | null;
}

export type GeneratedSections = Record<PitchBookSectionKey, boolean>;

export type CollapseState = Record<PitchBookSectionKey, boolean>;

export interface SectionMeta {
  key: PitchBookSectionKey;
  number: number;
  title: string;
  icon: string;
}

export const SECTION_ORDER: SectionMeta[] = [
  { key: 'executiveSummary', number: 1, title: 'Executive Summary', icon: 'FileText' },
  { key: 'clientSnapshot', number: 2, title: 'Client Snapshot', icon: 'Building2' },
  { key: 'industryOverview', number: 3, title: 'Industry Overview', icon: 'BarChart3' },
  { key: 'keyTrends', number: 4, title: 'Key Trends', icon: 'TrendingUp' },
  { key: 'competitiveLandscape', number: 5, title: 'Competitive Landscape', icon: 'Target' },
  { key: 'growthOpportunities', number: 6, title: 'Growth Opportunities', icon: 'Rocket' },
  { key: 'recentMA', number: 7, title: 'Recent M&A', icon: 'Handshake' },
  { key: 'potentialTargets', number: 8, title: 'Potential Targets', icon: 'Crosshair' },
  { key: 'strategicRecommendations', number: 9, title: 'Strategic Recommendations', icon: 'ListChecks' },
  { key: 'nextSteps', number: 10, title: 'Next Steps', icon: 'Milestone' },
];
