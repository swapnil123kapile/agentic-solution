import type {
  PitchBook,
  ClientSnapshot,
  ExecutiveSummary,
  IndustryOverview,
  KeyTrends,
  CompetitiveLandscape,
  GrowthOpportunities,
  RecentMA,
  PotentialTargets,
  StrategicRecommendations,
  NextSteps,
} from '@/types';

// ============================================================
// Sample / seed data — realistic figures for ABC National Bank
// ============================================================

export const sampleClientSnapshot: ClientSnapshot = {
  clientName: 'ABC National Bank',
  industry: 'Financial Services',
  relationshipManager: 'Rahul Sharma',
  region: 'North America',
  revenue: '$12 Billion',
  employees: '18,000',
  engagementObjective:
    'Identify inorganic growth targets and build a 3-year strategic roadmap for digital-first banking expansion.',
};

export const sampleExecutiveSummary: ExecutiveSummary = {
  overview:
    'ABC National Bank is a mid-cap financial services institution with $12B in revenue and 18,000 employees across North America. The bank is seeking a strategic transformation to accelerate digital adoption, expand its wealth management franchise, and pursue selective M&A to build scale in payments and open banking.',
  highlights: [
    'Strong capital position with CET1 ratio of 12.4%, providing $2.1B of deployable excess capital.',
    'Digital channel adoption grew 34% YoY, outpacing peer average of 21%.',
    'Wealth management AUM up 18% — highest-growth segment in the portfolio.',
    'Payments revenue at $840M represents 7% of total revenue, below the 11% peer benchmark.',
  ],
  keyTakeaway:
    'A focused M&A and partnership strategy across payments, digital banking, and wealth management can unlock an estimated $1.4B in incremental revenue over 3 years.',
};

export const sampleIndustryOverview: IndustryOverview = {
  marketSize: '$4.8 Trillion',
  cagr: '6.2%',
  growth: '+8.4% YoY',
  chart: [
    { year: '2020', value: 3950 },
    { year: '2021', value: 4210 },
    { year: '2022', value: 4480 },
    { year: '2023', value: 4680 },
    { year: '2024', value: 4810 },
    { year: '2025E', value: 5120 },
  ],
  highlights: [
    'North American banking sector revenue is projected to surpass $5.1T in 2025.',
    'Digital-only neobanks now hold 8.7% of retail deposits, up from 4.1% in 2021.',
    'Embedded finance and BaaS revenue growing at 23% CAGR through 2027.',
    'Regulatory tailwinds around open banking expected to formalize in H2 2025.',
  ],
};

export const sampleKeyTrends: KeyTrends = {
  trends: [
    {
      id: 't1',
      title: 'Embedded Finance & BaaS',
      impact: 'high',
      description:
        'Non-financial brands are integrating banking services directly into their platforms, creating a $38B revenue pool by 2027.',
    },
    {
      id: 't2',
      title: 'AI-Driven Underwriting',
      impact: 'high',
      description:
        'Generative AI is compressing credit decisioning from days to minutes while reducing default rates by 12–18%.',
    },
    {
      id: 't3',
      title: 'Open Banking Standardization',
      impact: 'medium',
      description:
        'Mandatory API sharing is restructuring competitive dynamics and enabling third-party product distribution.',
    },
    {
      id: 't4',
      title: 'Consolidation in Wealth Tech',
      impact: 'medium',
      description:
        'Fragmented RIA platforms are consolidating; 40+ deals closed in the last 18 months at premium valuations.',
    },
    {
      id: 't5',
      title: 'Climate Risk Disclosure',
      impact: 'low',
      description:
        'TCFD-aligned reporting requirements are pushing banks to invest in climate risk modeling infrastructure.',
    },
  ],
};

export const sampleCompetitiveLandscape: CompetitiveLandscape = {
  competitors: [
    { id: 'c1', name: 'ABC National Bank', marketShare: 12 },
    { id: 'c2', name: 'JPMorgan Chase', marketShare: 24 },
    { id: 'c3', name: 'Bank of America', marketShare: 18 },
    { id: 'c4', name: 'Citigroup', marketShare: 11 },
    { id: 'c5', name: 'Regional Peers', marketShare: 35 },
  ],
  chart: [
    { name: 'JPMorgan Chase', share: 24 },
    { name: 'Bank of America', share: 18 },
    { name: 'Regional Peers', share: 35 },
    { name: 'ABC National Bank', share: 12 },
    { name: 'Citigroup', share: 11 },
  ],
};

export const sampleGrowthOpportunities: GrowthOpportunities = {
  opportunities: [
    {
      id: 'g1',
      title: 'AI',
      description: 'Deploy generative AI for customer service, underwriting, and advisor productivity.',
      icon: 'Brain',
    },
    {
      id: 'g2',
      title: 'Digital Banking',
      description: 'Expand the mobile-first neobank platform into adjacent SMB and freelancer segments.',
      icon: 'Smartphone',
    },
    {
      id: 'g3',
      title: 'Cloud',
      description: 'Accelerate core banking migration to cloud-native infrastructure for 30% cost reduction.',
      icon: 'Cloud',
    },
    {
      id: 'g4',
      title: 'Payments',
      description: 'Acquire or partner with a payment processor to close the 4-point revenue gap vs peers.',
      icon: 'CreditCard',
    },
    {
      id: 'g5',
      title: 'Open Banking',
      description: 'Launch a BaaS platform to monetize regulated APIs and distribution reach.',
      icon: 'Network',
    },
    {
      id: 'g6',
      title: 'Wealth Management',
      description: 'Scale the hybrid advisor + robo-advisor model into the mass-affluent segment.',
      icon: 'TrendingUp',
    },
  ],
};

export const sampleRecentMA: RecentMA = {
  records: [
    { id: 'm1', company: 'First Horizon Bank', acquirer: 'TD Bank Group', dealSize: '$13.4B', date: 'Aug 2024' },
    { id: 'm2', company: 'PacWest Bancorp', acquirer: 'Banc of California', dealSize: '$1.8B', date: 'Apr 2024' },
    { id: 'm3', company: 'Discover Financial', acquirer: 'Capital One', dealSize: '$35.3B', date: 'Jan 2024' },
    { id: 'm4', company: 'BBVA USA', acquirer: 'PNC Financial', dealSize: '$11.6B', date: 'Nov 2023' },
    { id: 'm5', company: 'Plaid Inc.', acquirer: 'Visa (terminated)', dealSize: '$5.3B', date: 'Jan 2021' },
  ],
};

export const samplePotentialTargets: PotentialTargets = {
  targets: [
    { id: 'p1', company: 'Stripe Connect', industry: 'Payments', fitScore: 92, recommendation: 'Strong Fit' },
    { id: 'p2', company: 'Plaid', industry: 'Open Banking', fitScore: 88, recommendation: 'Strong Fit' },
    { id: 'p3', company: 'Wealthfront', industry: 'Wealth Tech', fitScore: 79, recommendation: 'Good Fit' },
    { id: 'p4', company: 'Marqeta', industry: 'Payments / Cards', fitScore: 74, recommendation: 'Good Fit' },
    { id: 'p5', company: 'Nium', industry: 'Cross-border', fitScore: 61, recommendation: 'Watch' },
  ],
};

export const sampleStrategicRecommendations: StrategicRecommendations = {
  recommendations: [
    {
      id: 'r1',
      title: 'Acquire a mid-market payment processor to close the payments revenue gap.',
      owner: 'Chief Strategy Officer',
      priority: 'high',
      expectedImpact: '+$420M revenue, +1.8pp margin',
      completed: false,
    },
    {
      id: 'r2',
      title: 'Launch enterprise BaaS platform leveraging existing banking license.',
      owner: 'Head of Digital',
      priority: 'high',
      expectedImpact: '+$260M revenue, new SaaS line',
      completed: false,
    },
    {
      id: 'r3',
      title: 'Migrate core banking to cloud-native stack over 24 months.',
      owner: 'CTO',
      priority: 'medium',
      expectedImpact: '30% infrastructure cost reduction',
      completed: true,
    },
    {
      id: 'r4',
      title: 'Expand wealth management into mass-affluent segment via hybrid advisor model.',
      owner: 'Head of Wealth',
      priority: 'medium',
      expectedImpact: '+$310M fee revenue',
      completed: false,
    },
    {
      id: 'r5',
      title: 'Establish AI governance committee and deploy GenAI across customer service.',
      owner: 'Chief Data Officer',
      priority: 'low',
      expectedImpact: '15% contact center cost reduction',
      completed: false,
    },
  ],
};

export const sampleNextSteps: NextSteps = {
  steps: [
    { id: 's1', label: 'Discovery', status: 'completed', date: 'Week 1' },
    { id: 's2', label: 'Analysis', status: 'completed', date: 'Week 2' },
    { id: 's3', label: 'Draft', status: 'active', date: 'Week 3' },
    { id: 's4', label: 'Review', status: 'pending', date: 'Week 4' },
    { id: 's5', label: 'Approval', status: 'pending', date: 'Week 5' },
    { id: 's6', label: 'Completed', status: 'pending', date: 'Week 6' },
  ],
};

// Empty starting state
export const emptyPitchBook: PitchBook = {
  clientSnapshot: null,
  executiveSummary: null,
  industryOverview: null,
  keyTrends: null,
  competitiveLandscape: null,
  growthOpportunities: null,
  recentMA: null,
  potentialTargets: null,
  strategicRecommendations: null,
  nextSteps: null,
};

// Pre-loaded PitchBook used as the initial seeded state so the preview
// shows realistic content immediately (and updates as the AI "streams").
export const seededPitchBook: PitchBook = {
  clientSnapshot: sampleClientSnapshot,
  executiveSummary: sampleExecutiveSummary,
  industryOverview: sampleIndustryOverview,
  keyTrends: sampleKeyTrends,
  competitiveLandscape: sampleCompetitiveLandscape,
  growthOpportunities: sampleGrowthOpportunities,
  recentMA: sampleRecentMA,
  potentialTargets: samplePotentialTargets,
  strategicRecommendations: sampleStrategicRecommendations,
  nextSteps: sampleNextSteps,
};
