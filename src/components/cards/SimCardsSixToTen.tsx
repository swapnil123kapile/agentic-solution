import { motion, AnimatePresence } from 'framer-motion';
import {
  TrendingDown,
  SlidersHorizontal,
  Lightbulb,
  MessageSquareQuote,
  GitCompare,
  Percent,
  Zap,
  Upload,
  Smartphone,
  PhoneCall,
  Star,
} from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { useCountUp } from '@/hooks/useCountUp';
import { PreviewCardShell } from '@/components/common/PreviewCardShell';
import { LossAnalysisChart } from '@/components/charts/LossAnalysisChart';
import { ComparisonChart } from '@/components/charts/ComparisonChart';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import type { Complexity, Priority, Sentiment } from '@/types';

// ============================================================
// Card 6: Loss Analysis
// ============================================================
export function LossAnalysisCard() {
  const losses = useAppStore((s) => s.simulation.losses);
  const totalLosses = useCountUp(losses.totalLosses);

  return (
    <PreviewCardShell sectionKey="lossAnalysis" number={6} title="Loss Analysis" icon={TrendingDown}>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <LossAnalysisChart data={losses.reasons} total={losses.totalLosses} />
        </div>
        <div className="space-y-3 lg:col-span-2">
          <div className="rounded-xl border border-danger/20 bg-danger/5 p-3">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-danger">Total Losses</p>
            <p className="mt-0.5 text-2xl font-bold tabular-nums text-foreground">{Math.round(totalLosses).toLocaleString()}</p>
          </div>
          <div className="rounded-xl border border-border bg-white p-3">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Top Reason</p>
            <p className="mt-0.5 text-sm font-semibold text-foreground">{losses.topReason}</p>
          </div>
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-3">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-primary">Recommendation</p>
            <p className="mt-0.5 text-[13px] leading-relaxed text-foreground">{losses.recommendation}</p>
          </div>
        </div>
      </div>
    </PreviewCardShell>
  );
}

// ============================================================
// Card 7: Improvement Simulator
// ============================================================
const TOGGLE_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Percent,
  Zap,
  Upload,
  Smartphone,
  PhoneCall,
};

export function ImprovementSimulatorCard() {
  const improvements = useAppStore((s) => s.simulation.improvements);
  const toggleImprovement = useAppStore((s) => s.toggleImprovement);
  const projection = useAppStore((s) => s.projection);
  const kpis = useAppStore((s) => s.simulation.kpis);

  const projectedWinRate = projection?.projectedWinRate ?? kpis.dbWinRate;
  const uplift = projection?.uplift ?? 0;
  const projectedWinRateAnim = useCountUp(projectedWinRate);

  return (
    <PreviewCardShell sectionKey="improvementSimulator" number={7} title="Improvement Simulator" icon={SlidersHorizontal}>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
        {/* Toggle levers */}
        <div className="space-y-2 lg:col-span-3">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Improvement Levers</p>
          {improvements.toggles.map((t) => {
            const Icon = TOGGLE_ICONS[t.icon] ?? Zap;
            return (
              <div
                key={t.id}
                className={cn(
                  'flex items-center gap-3 rounded-xl border p-3 transition',
                  t.active ? 'border-primary/40 bg-primary/5 shadow-soft' : 'border-border bg-white hover:border-primary/30'
                )}
              >
                <div className={cn('flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition', t.active ? 'bg-primary text-white' : 'bg-muted text-muted-foreground')}>
                  <Icon className="h-[18px] w-[18px]" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-foreground">{t.label}</p>
                  <p className="text-[12px] text-muted-foreground">{t.description}</p>
                </div>
                <Checkbox checked={t.active} onCheckedChange={() => toggleImprovement(t.id)} className="data-[state=checked]:bg-primary data-[state=checked]:border-primary" />
              </div>
            );
          })}
        </div>

        {/* Live projection */}
        <div className="lg:col-span-2">
          <div className={cn('rounded-2xl border p-4 transition', uplift > 0 ? 'border-primary/30 bg-primary/5 shadow-glow' : 'border-border bg-white')}>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Live Projection</p>
            <AnimatePresence mode="wait">
              <motion.div
                key={projectedWinRate.toFixed(1)}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
                className="mt-2"
              >
                <p className="text-3xl font-bold tabular-nums text-foreground">{projectedWinRateAnim.toFixed(1)}%</p>
                <p className="text-sm font-medium text-muted-foreground">Projected Win Rate</p>
              </motion.div>
            </AnimatePresence>

            {uplift > 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-3 flex items-center gap-2 rounded-lg bg-success/10 px-3 py-2"
              >
                <TrendingUpIcon />
                <span className="text-sm font-bold text-success">+{uplift.toFixed(1)}pp uplift</span>
              </motion.div>
            ) : (
              <p className="mt-3 text-xs text-muted-foreground">Toggle levers to see projected KPIs.</p>
            )}

            <div className="mt-3 space-y-2 border-t border-border pt-3">
              <ProjRow label="Recoverable" value={projection?.projectedRecoverable ?? kpis.recoverableLosses} base={kpis.recoverableLosses} lowerBetter />
              <ProjRow label="Drop-offs" value={projection?.projectedDropOffs ?? kpis.dropOffs} base={kpis.dropOffs} lowerBetter />
            </div>
          </div>
        </div>
      </div>
    </PreviewCardShell>
  );
}

function TrendingUpIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-4 w-4 text-success" fill="none">
      <path d="M2 11l4-4 3 3 5-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11 4h3v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ProjRow({ label, value, base, lowerBetter }: { label: string; value: number; base: number; lowerBetter?: boolean }) {
  const delta = value - base;
  const isBetter = lowerBetter ? delta < 0 : delta > 0;
  const isSame = delta === 0;
  return (
    <div className="flex items-center justify-between text-xs">
      <span className="text-muted-foreground">{label}</span>
      <div className="flex items-center gap-2">
        <span className="font-bold tabular-nums text-foreground">{value.toLocaleString()}</span>
        {!isSame && (
          <span className={cn('font-semibold', isBetter ? 'text-success' : 'text-danger')}>
            {delta > 0 ? '+' : ''}{delta.toLocaleString()}
          </span>
        )}
      </div>
    </div>
  );
}

// ============================================================
// Card 8: Recommendations
// ============================================================
const PRIORITY_STYLES: Record<Priority, string> = {
  high: 'bg-danger/10 text-danger border-danger/20',
  medium: 'bg-warning/10 text-warning border-warning/20',
  low: 'bg-success/10 text-success border-success/20',
};

const COMPLEXITY_STYLES: Record<Complexity, string> = {
  high: 'bg-slate-100 text-slate-600 border-slate-200',
  medium: 'bg-primary/10 text-primary border-primary/20',
  low: 'bg-success/10 text-success border-success/20',
};

export function RecommendationsCard() {
  const recs = useAppStore((s) => s.simulation.recommendations);
  return (
    <PreviewCardShell sectionKey="recommendations" number={8} title="Recommendations" icon={Lightbulb}>
      <div className="space-y-2.5">
        {recs.recommendations.map((r) => (
          <div key={r.id} className="rounded-xl border border-border bg-white p-3.5 transition hover:border-primary/30 hover:shadow-soft">
            <div className="flex items-start justify-between gap-3">
              <p className="text-sm font-semibold text-foreground">{r.title}</p>
              <Badge variant="outline" className={cn('shrink-0 border text-[10px] font-semibold uppercase', PRIORITY_STYLES[r.priority])}>
                {r.priority}
              </Badge>
            </div>
            <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">{r.description}</p>
            <div className="mt-2.5 flex flex-wrap items-center gap-2 text-[11px]">
              <span className="font-medium text-muted-foreground">Impact:</span>
              <span className="font-semibold text-foreground">{r.expectedImpact}</span>
              <span className="text-border">·</span>
              <Badge variant="outline" className={cn('border text-[10px] font-semibold', COMPLEXITY_STYLES[r.complexity])}>
                {r.complexity} complexity
              </Badge>
              <span className="text-border">·</span>
              <span className="font-medium text-muted-foreground">Owner:</span>
              <span className="font-semibold text-foreground">{r.owner}</span>
            </div>
          </div>
        ))}
      </div>
    </PreviewCardShell>
  );
}

// ============================================================
// Card 9: Customer Feedback
// ============================================================
const SENTIMENT_STYLES: Record<Sentiment, { badge: string; dot: string; label: string }> = {
  positive: { badge: 'bg-success/10 text-success border-success/20', dot: 'bg-success', label: 'Positive' },
  neutral: { badge: 'bg-slate-100 text-slate-600 border-slate-200', dot: 'bg-slate-400', label: 'Neutral' },
  negative: { badge: 'bg-danger/10 text-danger border-danger/20', dot: 'bg-danger', label: 'Negative' },
};

export function CustomerFeedbackCard() {
  const feedback = useAppStore((s) => s.simulation.feedback);
  return (
    <PreviewCardShell sectionKey="customerFeedback" number={9} title="Customer Feedback" icon={MessageSquareQuote}>
      <ScrollArea className="h-[300px] pr-3">
        <div className="space-y-2.5">
          {feedback.entries.map((e) => {
            const s = SENTIMENT_STYLES[e.sentiment];
            return (
              <motion.div
                key={e.id}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                className="rounded-xl border border-border bg-white p-3.5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                      {e.customer.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{e.customer}</p>
                      <p className="text-[11px] text-muted-foreground">{e.persona} · Timestep {e.timestep}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className={cn('border text-[10px] font-semibold', s.badge)}>
                    <span className={cn('mr-1 h-1.5 w-1.5 rounded-full', s.dot)} />
                    {s.label}
                  </Badge>
                </div>
                <div className="mt-2 flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={cn('h-3.5 w-3.5', i < e.rating ? 'fill-warning text-warning' : 'fill-muted text-muted')}
                    />
                  ))}
                </div>
                <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">"{e.comment}"</p>
              </motion.div>
            );
          })}
        </div>
      </ScrollArea>
    </PreviewCardShell>
  );
}

// ============================================================
// Card 10: Scenario Comparison
// ============================================================
export function ScenarioComparisonCard() {
  const comparison = useAppStore((s) => s.simulation.comparison);
  return (
    <PreviewCardShell sectionKey="scenarioComparison" number={10} title="Scenario Comparison" icon={GitCompare}>
      <div className="space-y-4">
        <div className="flex items-center justify-center gap-4">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-slate-400" />
            <span className="text-sm font-semibold text-foreground">{comparison.baselineName}</span>
          </div>
          <span className="rounded-lg bg-muted px-2 py-0.5 text-xs font-bold text-muted-foreground">VS</span>
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-primary" />
            <span className="text-sm font-semibold text-foreground">{comparison.improvedName}</span>
          </div>
        </div>

        <ComparisonChart data={comparison.kpis} />

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
          {comparison.kpis.map((k) => {
            const delta = k.improved - k.baseline;
            const isWinRate = k.label.includes('Win Rate');
            const lowerBetter = k.label === 'Drop-offs' || k.label === 'Recoverable Losses';
            const isBetter = lowerBetter ? delta < 0 : delta > 0;
            return (
              <div key={k.label} className="rounded-lg border border-border bg-white p-2.5">
                <p className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">{k.label}</p>
                <p className="text-sm font-bold text-foreground">{k.improved.toLocaleString()}{isWinRate ? '%' : ''}</p>
                <p className={cn('text-[11px] font-semibold', isBetter ? 'text-success' : 'text-danger')}>
                  {delta > 0 ? '+' : ''}{delta.toFixed(1)}{isWinRate ? 'pp' : ''}
                </p>
              </div>
            );
          })}
        </div>

        <div className="rounded-xl border border-primary/20 bg-primary/5 p-3.5">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-primary">Summary</p>
          <p className="mt-1 text-[13px] leading-relaxed text-foreground">{comparison.summary}</p>
        </div>
      </div>
    </PreviewCardShell>
  );
}
