import type {
  AIModel,
  PitchBook,
  PitchBookSectionKey,
  ExecutiveSummary,
  ClientSnapshot,
  IndustryOverview,
  KeyTrends,
  CompetitiveLandscape,
  GrowthOpportunities,
  RecentMA,
  PotentialTargets,
  StrategicRecommendations,
  NextSteps,
} from '@/types';
import {
  sampleExecutiveSummary,
  sampleClientSnapshot,
  sampleIndustryOverview,
  sampleKeyTrends,
  sampleCompetitiveLandscape,
  sampleGrowthOpportunities,
  sampleRecentMA,
  samplePotentialTargets,
  sampleStrategicRecommendations,
  sampleNextSteps,
} from '@/data/sampleData';

// ============================================================
// Mock AI service — maps a prompt to a section + structured data
// plus a markdown response. Streaming is simulated by the store.
// ============================================================

export interface AIResponse {
  sectionKey: PitchBookSectionKey | null;
  markdown: string;
  payload: Partial<PitchBook>;
}

export interface PromptIntent {
  intent: string;
  sectionKey: PitchBookSectionKey | null;
  payload: Partial<PitchBook>;
  markdown: string;
}

type SectionData<T> = { sectionKey: PitchBookSectionKey; data: T; markdown: string };

const EXEC: SectionData<ExecutiveSummary> = {
  sectionKey: 'executiveSummary',
  data: sampleExecutiveSummary,
  markdown: `## Executive Summary

${sampleExecutiveSummary.overview}

### Key Highlights
${sampleExecutiveSummary.highlights.map((h) => `- ${h}`).join('\n')}

**Key Takeaway:** ${sampleExecutiveSummary.keyTakeaway}

*Preview Card 1 (Executive Summary) has been updated.*`,
};

const SNAPSHOT: SectionData<ClientSnapshot> = {
  sectionKey: 'clientSnapshot',
  data: sampleClientSnapshot,
  markdown: `## Client Snapshot

| Attribute | Detail |
| --- | --- |
| **Client** | ${sampleClientSnapshot.clientName} |
| **Industry** | ${sampleClientSnapshot.industry} |
| **Region** | ${sampleClientSnapshot.region} |
| **Revenue** | ${sampleClientSnapshot.revenue} |
| **Employees** | ${sampleClientSnapshot.employees} |
| **Relationship Manager** | ${sampleClientSnapshot.relationshipManager} |

**Engagement Objective:** ${sampleClientSnapshot.engagementObjective}

*Preview Card 2 (Client Snapshot) has been updated.*`,
};

const INDUSTRY: SectionData<IndustryOverview> = {
  sectionKey: 'industryOverview',
  data: sampleIndustryOverview,
  markdown: `## Industry Overview — Banking

The North American banking sector is in the middle of a structural shift driven by **digital adoption**, **open banking regulation**, and **embedded finance**.

| Metric | Value |
| --- | --- |
| Market Size | ${sampleIndustryOverview.marketSize} |
| CAGR | ${sampleIndustryOverview.cagr} |
| YoY Growth | ${sampleIndustryOverview.growth} |

### Key Highlights
${sampleIndustryOverview.highlights.map((h) => `- ${h}`).join('\n')}

\`\`\`chart
type: bar
title: North American Banking Market Size ($B)
\`\`\`

*Preview Card 3 (Industry Overview) has been updated with the chart above.*`,
};

const TRENDS: SectionData<KeyTrends> = {
  sectionKey: 'keyTrends',
  data: sampleKeyTrends,
  markdown: `## Key Trends

I identified five trends shaping the banking sector, ranked by impact:

${sampleKeyTrends.trends
  .map(
    (t) =>
      `- **${t.title}** — _${t.impact.toUpperCase()} impact_ — ${t.description}`
  )
  .join('\n')}

*Preview Card 4 (Key Trends) has been updated.*`,
};

const COMPETITIVE: SectionData<CompetitiveLandscape> = {
  sectionKey: 'competitiveLandscape',
  data: sampleCompetitiveLandscape,
  markdown: `## Competitive Landscape

The market remains concentrated at the top, with the two largest players holding **42%** of deposits.

\`\`\`chart
type: donut
title: Deposit Market Share
\`\`\`

### Competitor Market Share
${sampleCompetitiveLandscape.competitors
  .map((c) => `- **${c.name}** — ${c.marketShare}%`)
  .join('\n')}

*Preview Card 5 (Competitive Landscape) has been updated.*`,
};

const GROWTH: SectionData<GrowthOpportunities> = {
  sectionKey: 'growthOpportunities',
  data: sampleGrowthOpportunities,
  markdown: `## Growth Opportunities

Six high-priority growth vectors identified for ABC National Bank:

${sampleGrowthOpportunities.opportunities
  .map((o) => `- **${o.title}** — ${o.description}`)
  .join('\n')}

*Preview Card 6 (Growth Opportunities) has been updated.*`,
};

const MA: SectionData<RecentMA> = {
  sectionKey: 'recentMA',
  data: sampleRecentMA,
  markdown: `## Recent M&A Activity

| Company | Acquirer | Deal Size | Date |
| --- | --- | --- | --- |
${sampleRecentMA.records
  .map((r) => `| ${r.company} | ${r.acquirer} | ${r.dealSize} | ${r.date} |`)
  .join('\n')}

The **Capital One / Discover** deal signals accelerating convergence between banking and payments.

*Preview Card 7 (Recent M&A) has been updated.*`,
};

const TARGETS: SectionData<PotentialTargets> = {
  sectionKey: 'potentialTargets',
  data: samplePotentialTargets,
  markdown: `## Potential Targets

I scored five targets against ABC National Bank's strategic fit criteria:

| Company | Industry | Fit Score | Recommendation |
| --- | --- | --- | --- |
${samplePotentialTargets.targets
  .map(
    (t) =>
      `| ${t.company} | ${t.industry} | ${t.fitScore} | ${t.recommendation} |`
  )
  .join('\n')}

**Top recommendation:** Stripe Connect (92) — closes the payments revenue gap immediately.

*Preview Card 8 (Potential Targets) has been updated.*`,
};

const RECS: SectionData<StrategicRecommendations> = {
  sectionKey: 'strategicRecommendations',
  data: sampleStrategicRecommendations,
  markdown: `## Strategic Recommendations

Five prioritized recommendations, mapped to owners and expected business impact:

${sampleStrategicRecommendations.recommendations
  .map(
    (r) =>
      `- [${r.completed ? 'x' : ' '}] **${r.title}** — _${r.priority.toUpperCase()}_ — Owner: ${r.owner} — Impact: ${r.expectedImpact}`
  )
  .join('\n')}

*Preview Card 9 (Strategic Recommendations) has been updated.*`,
};

const STEPS: SectionData<NextSteps> = {
  sectionKey: 'nextSteps',
  data: sampleNextSteps,
  markdown: `## Next Steps

A 6-week engagement roadmap:

${sampleNextSteps.steps
  .map((s) => `- **${s.label}** — ${s.date} — _${s.status}_`)
  .join('\n')}

*Preview Card 10 (Next Steps) has been updated.*`,
};

// ---------- prompt → intent resolution ----------

const INTENT_MAP: { keywords: string[]; section: SectionData<unknown> }[] = [
  { keywords: ['executive summary', 'summary', 'overview of the deal'], section: EXEC as SectionData<unknown> },
  { keywords: ['client snapshot', 'client profile', 'client overview'], section: SNAPSHOT as SectionData<unknown> },
  { keywords: ['industry overview', 'industry analysis', 'market overview', 'analyze industry'], section: INDUSTRY as SectionData<unknown> },
  { keywords: ['key trend', 'trends', 'emerging trend'], section: TRENDS as SectionData<unknown> },
  { keywords: ['competitive landscape', 'competitor', 'market share', 'competition'], section: COMPETITIVE as SectionData<unknown> },
  { keywords: ['growth opportunity', 'growth opportunities', 'opportunities'], section: GROWTH as SectionData<unknown> },
  { keywords: ['m&a', 'merger', 'acquisition', 'recent deals', 'ma target'], section: MA as SectionData<unknown> },
  { keywords: ['potential target', 'targets', 'acquisition target', 'fit score'], section: TARGETS as SectionData<unknown> },
  { keywords: ['strategic recommendation', 'recommendations', 'strategy'], section: RECS as SectionData<unknown> },
  { keywords: ['next step', 'roadmap', 'timeline', 'plan'], section: STEPS as SectionData<unknown> },
];

const FULL_PITCHBOOK_PAYLOAD: Partial<PitchBook> = {
  executiveSummary: EXEC.data,
  clientSnapshot: SNAPSHOT.data,
  industryOverview: INDUSTRY.data,
  keyTrends: TRENDS.data,
  competitiveLandscape: COMPETITIVE.data,
  growthOpportunities: GROWTH.data,
  recentMA: MA.data,
  potentialTargets: TARGETS.data,
  strategicRecommendations: RECS.data,
  nextSteps: STEPS.data,
};

const FULL_PITCHBOOK_MARKDOWN = `## Full PitchBook — ABC National Bank

I've generated a complete advisory pitchbook across all 10 sections:

1. **Executive Summary** — strategic thesis & key takeaway
2. **Client Snapshot** — ABC National Bank profile & objective
3. **Industry Overview** — $4.8T market, 6.2% CAGR
4. **Key Trends** — 5 trends ranked by impact
5. **Competitive Landscape** — market share donut
6. **Growth Opportunities** — 6 vectors (AI, digital, cloud, payments, open banking, wealth)
7. **Recent M&A** — 5 reference transactions
8. **Potential Targets** — 5 scored targets
9. **Strategic Recommendations** — 5 prioritized actions
10. **Next Steps** — 6-week engagement roadmap

### Headline
**$1.4B** in incremental revenue over 3 years via focused M&A in payments, a BaaS platform launch, and wealth management expansion.

*All 10 preview cards have been updated. Use the footer to save, export, or share.*`;

const SWOT_MARKDOWN = `## SWOT Analysis — ABC National Bank

| | Helpful | Harmful |
| --- | --- | --- |
| **Internal** | **Strengths** — Strong CET1 capital (12.4%), growing digital adoption (+34% YoY), wealth AUM momentum (+18%) | **Weaknesses** — Payments revenue below peer benchmark, legacy core banking stack, limited SMB footprint |
| **External** | **Opportunities** — BaaS platform, embedded finance, mass-affluent wealth, M&A in payments | **Threats** — Neobank deposit share rising, rate cycle pressure, open banking disintermediation |

*SWOT analysis is contextual — preview cards are unchanged. Generate specific sections to update the preview.*`;

const INVESTMENT_MARKDOWN = `## Investment Opportunities

Three investment themes for ABC National Bank's board to consider:

1. **Payments Platform Build/Buy** — $400–600M capex or M&A; 18-month payback
2. **BaaS / Embedded Finance** — $120M build cost; recurring SaaS revenue stream
3. **Wealth Tech Scale-up** — $200M acquisition of a digital-first RIA platform

*Investment opportunities overlap with Growth Opportunities (Card 6) and Potential Targets (Card 8).*`;

export function resolvePrompt(prompt: string): PromptIntent {
  const lower = prompt.toLowerCase().trim();

  if (lower.includes('swot')) {
    return { intent: 'SWOT Analysis', sectionKey: null, payload: {}, markdown: SWOT_MARKDOWN };
  }
  if (lower.includes('investment opportunit')) {
    return { intent: 'Investment Opportunities', sectionKey: null, payload: {}, markdown: INVESTMENT_MARKDOWN };
  }
  if (
    lower.includes('full pitchbook') ||
    lower.includes('generate pitchbook') ||
    lower.includes('entire pitchbook') ||
    lower.includes('complete pitchbook') ||
    lower.includes('all sections')
  ) {
    return {
      intent: 'Generate Full PitchBook',
      sectionKey: null,
      payload: FULL_PITCHBOOK_PAYLOAD,
      markdown: FULL_PITCHBOOK_MARKDOWN,
    };
  }

  for (const entry of INTENT_MAP) {
    if (entry.keywords.some((k) => lower.includes(k))) {
      const s = entry.section;
      return {
        intent: s.sectionKey,
        sectionKey: s.sectionKey,
        payload: { [s.sectionKey]: s.data } as Partial<PitchBook>,
        markdown: s.markdown,
      };
    }
  }

  // Fallback — generic advisory answer
  return {
    intent: 'general',
    sectionKey: null,
    payload: {},
    markdown: `I can help build that section of your pitchbook. Try one of the suggested prompts (e.g. *"Analyze Industry"*, *"Competitive Landscape"*, or *"Generate Full PitchBook"*) and I'll update the live preview automatically.`,
  };
}

export const SUGGESTED_PROMPTS: string[] = [
  'Generate Executive Summary',
  'Analyze Industry',
  'SWOT Analysis',
  'Competitive Landscape',
  'Growth Opportunities',
  'M&A Targets',
  'Investment Opportunities',
  'Strategic Recommendations',
  'Generate Full PitchBook',
];

export const AI_MODELS: AIModel[] = ['GPT-4o', 'Claude 3.5', 'Gemini 1.5'];

export function modelTagline(model: AIModel): string {
  switch (model) {
    case 'GPT-4o':
      return 'OpenAI · Multi-modal';
    case 'Claude 3.5':
      return 'Anthropic · Long-context reasoning';
    case 'Gemini 1.5':
      return 'Google · Native multimodal';
  }
}
