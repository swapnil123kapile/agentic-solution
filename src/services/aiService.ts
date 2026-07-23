import type { AIModel, ChatIntent, Simulation } from '@/types';
// When the backend /api/chat (SSE) is live, replace resolvePrompt
// with a real streaming call and keep the store's chunk logic.
// ============================================================

const SUGGESTED_PROMPTS: string[] = [
  'Summarize Simulation',
  'Explain Customer Losses',
  'Compare Scenarios',
  'Improve Win Rate',
  'Suggest Improvements',
  'Analyze Funnel',
  'Review Feedback',
  'Generate Executive Report',
];

const AI_MODELS: AIModel[] = ['GPT-4o', 'Claude 3.5', 'Gemini 1.5'];

function modelTagline(model: AIModel): string {
  switch (model) {
    case 'GPT-4o':
      return 'OpenAI · Multi-modal reasoning';
    case 'Claude 3.5':
      return 'Anthropic · Long-context analysis';
    case 'Gemini 1.5':
      return 'Google · Native multimodal';
  }
}

function summarizeMarkdown(sim: Simulation): string {
  const k = sim.kpis;
  return `## Simulation Summary — ${sim.summary.scenarioName}

The **${sim.summary.scenarioName}** scenario ran across **${sim.summary.totalTimesteps} timesteps** with **${sim.summary.personas.banks} bank personas** competing for **${sim.summary.personas.consumers.toLocaleString()} consumer personas**.

### Headline KPIs
| Metric | Value |
| --- | --- |
| DB Wins | ${k.dbWins.toLocaleString()} |
| Competitor Wins | ${k.competitorWins.toLocaleString()} |
| Drop-offs | ${k.dropOffs.toLocaleString()} |
| Recoverable Losses | ${k.recoverableLosses.toLocaleString()} |
| **DB Win Rate** | **${k.dbWinRate}%** |

### Takeaway
DB secured a **${k.dbWinRate}% win rate**. Of the ${k.dropOffs.toLocaleString()} drop-offs, **${k.recoverableLosses.toLocaleString()}** are recoverable — primarily lost to competitor pricing.

*Simulation Summary (Card 1) and Current KPIs (Card 2) have been updated.*`;
}

function lossesMarkdown(sim: Simulation): string {
  const l = sim.losses;
  const rows = l.reasons.map((r) => `| ${r.reason} | ${r.value} | ${(r.value / l.totalLosses * 100).toFixed(1)}% |`).join('\n');
  return `## Loss Analysis — Why DB Lost Customers

DB lost **${l.totalLosses}** customers this simulation. The breakdown:

| Reason | Customers | Share |
| --- | --- | --- |
${rows}

**Top reason:** ${l.topReason}.

### Recommended Action
${l.recommendation}

*Loss Analysis (Card 6) has been updated with the chart above.*`;
}

function compareMarkdown(sim: Simulation): string {
  const c = sim.comparison;
  const rows = c.kpis.map((k) => `| ${k.label} | ${k.baseline} | ${k.improved} |`).join('\n');
  return `## Scenario Comparison — ${c.baselineName} vs ${c.improvedName}

| KPI | Baseline | Improved |
| --- | --- | --- |
${rows}

### Summary
${c.summary}

*Scenario Comparison (Card 10) has been updated.*`;
}

function winRateMarkdown(sim: Simulation): string {
  return `## Improving DB Win Rate

Current win rate is **${sim.kpis.dbWinRate}%**. Based on loss analysis, the highest-impact levers are:

1. **Targeted rate-matching** for prime applicants — +4.2pp
2. **Faster approval** (48h SLA) — +2.8pp
3. **Digital-first journey** — +3.4pp

Activating all levers projects a win rate of **48.9%** — a +12.5pp uplift.

*Toggle levers in the Improvement Simulator (Card 7) to see live projections.*`;
}

function suggestMarkdown(sim: Simulation): string {
  const top = sim.recommendations.recommendations.slice(0, 3);
  return `## Strategic Recommendations

Based on the simulation, here are the top prioritized actions:

${top.map((r, i) => `**${i + 1}. ${r.title}**\n- _${r.priority.toUpperCase()} priority · ${r.complexity} complexity_\n- Impact: ${r.expectedImpact}\n- Owner: ${r.owner}`).join('\n\n')}

*Full recommendations are in Card 8.*`;
}

function funnelMarkdown(sim: Simulation): string {
  const f = sim.funnel;
  const rows = f.stages.map((s) => `| ${s.stage} | ${s.value.toLocaleString()} |`).join('\n');
  const lead = f.stages[0].value;
  const disb = f.stages[f.stages.length - 1].value;
  return `## Customer Funnel Analysis

| Stage | Customers |
| --- | --- |
${rows}

### Conversion
- **Lead → Application:** ${((f.stages[1].value / lead) * 100).toFixed(1)}%
- **Application → Approval:** ${((f.stages[2].value / f.stages[1].value) * 100).toFixed(1)}%
- **Offer → Accepted:** ${((f.stages[4].value / f.stages[3].value) * 100).toFixed(1)}%
- **Overall Lead → Disbursed:** ${((disb / lead) * 100).toFixed(1)}%

The biggest leak is **Application → Approval** — primarily from approval delays and SCHUFA rejections.

*Customer Funnel (Card 5) has been updated.*`;
}

function feedbackMarkdown(sim: Simulation): string {
  const neg = sim.feedback.entries.filter((e) => e.sentiment === 'negative').length;
  const pos = sim.feedback.entries.filter((e) => e.sentiment === 'positive').length;
  return `## Customer Feedback Review

Across ${sim.feedback.entries.length} sampled reviews:

- **Positive:** ${pos} customers — praise fast approval and digital experience
- **Negative:** ${neg} customers — frustration with competitor rates and approval delays

> "${sim.feedback.entries[0].comment}"
> — *${sim.feedback.entries[0].customer}, ${sim.feedback.entries[0].persona}*

*Customer Feedback (Card 9) has been updated.*`;
}

function reportMarkdown(sim: Simulation): string {
  const k = sim.kpis;
  return `## Executive Report — ${sim.summary.scenarioName}

### Overview
${sim.summary.description}

### Results
- **DB Win Rate:** ${k.dbWinRate}%
- **DB Wins:** ${k.dbWins.toLocaleString()} / ${k.totalCustomers.toLocaleString()} customers
- **Drop-offs:** ${k.dropOffs.toLocaleString()} (${k.recoverableLosses.toLocaleString()} recoverable)
- **Top Loss Reason:** ${sim.losses.topReason}

### Recommendations
1. ${sim.recommendations.recommendations[0].title}
2. ${sim.recommendations.recommendations[1].title}
3. ${sim.recommendations.recommendations[2].title}

### Projected Improvement
Applying all levers: **${sim.comparison.kpis[0].improved}% win rate** (+${(sim.comparison.kpis[0].improved - k.dbWinRate).toFixed(1)}pp).

*Executive report ready. Use the toolbar to export as PDF or CSV.*`;
}

function resolvePrompt(prompt: string, sim: Simulation): ChatIntent {
  const p = prompt.toLowerCase();
  const pick = (...keys: string[]) => keys.some((k) => p.includes(k));

  if (pick('summar', 'summary', 'overview')) return { sectionKey: 'simulationSummary', markdown: summarizeMarkdown(sim) };
  if (pick('loss', 'lose', 'lost', 'why did db')) return { sectionKey: 'lossAnalysis', markdown: lossesMarkdown(sim) };
  if (pick('compare', 'comparison', 'vs', 'baseline')) return { sectionKey: 'scenarioComparison', markdown: compareMarkdown(sim) };
  if (pick('improve win', 'win rate', 'increase win')) return { sectionKey: 'improvementSimulator', markdown: winRateMarkdown(sim) };
  if (pick('suggest', 'recommend', 'recommendation')) return { sectionKey: 'recommendations', markdown: suggestMarkdown(sim) };
  if (pick('funnel', 'conversion', 'stage')) return { sectionKey: 'customerFunnel', markdown: funnelMarkdown(sim) };
  if (pick('feedback', 'review', 'sentiment', 'customer said')) return { sectionKey: 'customerFeedback', markdown: feedbackMarkdown(sim) };
  if (pick('report', 'executive', 'export')) return { sectionKey: null, markdown: reportMarkdown(sim) };

  return {
    sectionKey: null,
    markdown: `I can analyze this lending simulation across KPIs, losses, funnel, feedback, and scenarios. Try a suggested prompt like **"Explain Customer Losses"** or **"Improve Win Rate"** and I'll update the relevant preview card.`,
  };
}

export {
  SUGGESTED_PROMPTS,
  AI_MODELS,
  modelTagline,
  resolvePrompt,
};
