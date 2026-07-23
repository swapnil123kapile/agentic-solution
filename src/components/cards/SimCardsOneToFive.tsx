import { motion } from 'framer-motion';
import { Activity, Gauge, PlayCircle, Building2, Filter, Trophy, Swords, UserMinus, RotateCcw, Percent } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { useCountUp } from '@/hooks/useCountUp';
import { PreviewCardShell } from '@/components/common/PreviewCardShell';
import { ProgressChart } from '@/components/charts/ProgressChart';
import { BankPerformanceChart } from '@/components/charts/BankPerformanceChart';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { SimulationStatus } from '@/types';

// ============================================================
// Card 1: Simulation Summary
// ============================================================
const STATUS_META: Record<SimulationStatus, { label: string; color: string; badge: string }> = {
  idle: { label: 'Idle', color: 'bg-muted-foreground', badge: 'bg-muted text-muted-foreground border-border' },
  running: { label: 'Running', color: 'bg-warning', badge: 'bg-warning/10 text-warning border-warning/20' },
  completed: { label: 'Completed', color: 'bg-success', badge: 'bg-success/10 text-success border-success/20' },
  failed: { label: 'Failed', color: 'bg-danger', badge: 'bg-danger/10 text-danger border-danger/20' },
};

export function SimulationSummaryCard() {
  const summary = useAppStore((s) => s.simulation.summary);
  const progress = useCountUp(summary.progress);

  const meta = STATUS_META[summary.status];

  return (
    <PreviewCardShell sectionKey="simulationSummary" number={1} title="Simulation Summary" icon={Activity}>
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Activity className="h-5 w-5" />
            </div>
            <div>
              <p className="text-base font-bold text-foreground">{summary.scenarioName}</p>
              <p className="text-xs text-muted-foreground">{summary.personas.banks} banks · {summary.personas.consumers.toLocaleString()} consumers</p>
            </div>
          </div>
          <Badge variant="outline" className={cn('border px-2.5 py-1 text-xs font-semibold', meta.badge)}>
            <span className={cn('mr-1.5 h-1.5 w-1.5 rounded-full', meta.color, summary.status === 'running' && 'animate-pulse-dot')} />
            {meta.label}
          </Badge>
        </div>

        <p className="text-[13px] leading-relaxed text-muted-foreground">{summary.description}</p>

        <div className="grid grid-cols-3 gap-3">
          <SummaryStat label="Timestep" value={`${summary.currentTimestep}`} sub={`/ ${summary.totalTimesteps}`} />
          <SummaryStat label="Progress" value={`${Math.round(progress)}%`} />
          <SummaryStat label="Consumers" value={summary.personas.consumers.toLocaleString()} />
        </div>

        <div>
          <div className="mb-1.5 flex items-center justify-between text-xs">
            <span className="font-medium text-muted-foreground">Simulation progress</span>
            <span className="font-bold text-foreground">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>
    </PreviewCardShell>
  );
}

function SummaryStat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-xl border border-border bg-white p-3">
      <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-0.5 text-lg font-bold text-foreground">
        {value} {sub && <span className="text-xs font-medium text-muted-foreground">{sub}</span>}
      </p>
    </div>
  );
}

// ============================================================
// Card 2: Current KPIs
// ============================================================
export function CurrentKpisCard() {
  const kpis = useAppStore((s) => s.simulation.kpis);
  const dbWins = useCountUp(kpis.dbWins);
  const compWins = useCountUp(kpis.competitorWins);
  const dropOffs = useCountUp(kpis.dropOffs);
  const recoverable = useCountUp(kpis.recoverableLosses);
  const winRate = useCountUp(kpis.dbWinRate);

  return (
    <PreviewCardShell sectionKey="currentKpis" number={2} title="Current KPIs" icon={Gauge}>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
        <KpiTile label="DB Wins" value={Math.round(dbWins)} accent="primary" icon={Trophy} />
        <KpiTile label="Competitor Wins" value={Math.round(compWins)} accent="muted" icon={Swords} />
        <KpiTile label="Drop-offs" value={Math.round(dropOffs)} accent="danger" icon={UserMinus} />
        <KpiTile label="Recoverable" value={Math.round(recoverable)} accent="warning" icon={RotateCcw} />
        <KpiTile label="DB Win Rate" value={winRate.toFixed(1)} suffix="%" accent="success" icon={Percent} highlight />
      </div>
    </PreviewCardShell>
  );
}

const ACCENT_STYLES = {
  primary: 'text-primary bg-primary/10',
  muted: 'text-slate-600 bg-slate-100',
  danger: 'text-danger bg-danger/10',
  warning: 'text-warning bg-warning/10',
  success: 'text-success bg-success/10',
};

function KpiTile({
  label,
  value,
  suffix,
  accent,
  highlight,
  icon: Icon,
}: {
  label: string;
  value: number | string;
  suffix?: string;
  accent: keyof typeof ACCENT_STYLES;
  highlight?: boolean;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div
      className={cn(
        'rounded-xl border p-3.5 transition',
        highlight ? 'border-primary/30 bg-primary/5 shadow-soft' : 'border-border bg-white'
      )}
    >
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
        <span className={cn('flex h-6 w-6 items-center justify-center rounded-md', ACCENT_STYLES[accent])}>
          <Icon className="h-3.5 w-3.5" />
        </span>
      </div>
      <p className={cn('mt-1 text-2xl font-bold tabular-nums', highlight ? 'text-primary' : 'text-foreground')}>
        {typeof value === 'number' ? value.toLocaleString() : value}
        {suffix && <span className="text-base font-semibold">{suffix}</span>}
      </p>
    </div>
  );
}

// ============================================================
// Card 3: Simulation Progress (replay slider + chart)
// ============================================================
export function SimulationProgressCard() {
  const progress = useAppStore((s) => s.simulation.progress);
  const timestep = useAppStore((s) => s.selectedTimestep);
  const setTimestep = useAppStore((s) => s.setTimestep);
  const total = useAppStore((s) => s.simulation.summary.totalTimesteps);

  return (
    <PreviewCardShell sectionKey="simulationProgress" number={3} title="Simulation Progress" icon={PlayCircle}>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="border-primary/20 bg-primary/5 text-xs font-semibold text-primary">
              Timestep {timestep}
            </Badge>
            <span className="text-xs text-muted-foreground">/ {total}</span>
          </div>
          <span className="text-xs text-muted-foreground">Drag to replay</span>
        </div>

        <Slider
          value={[timestep]}
          min={1}
          max={total}
          step={1}
          onValueChange={(v) => setTimestep(v[0])}
          className="py-1"
        />

        <ProgressChart data={progress.steps} />
      </div>
    </PreviewCardShell>
  );
}

// ============================================================
// Card 4: Bank Performance
// ============================================================
export function BankPerformanceCard() {
  const banks = useAppStore((s) => s.simulation.bankPerformance);
  return (
    <PreviewCardShell sectionKey="bankPerformance" number={4} title="Bank Performance" icon={Building2}>
      <div className="space-y-4">
        <div className="flex flex-wrap gap-4 text-xs">
          <LegendDot color="#2563EB" label="Win Rate" />
          <LegendDot color="#10B981" label="Approval Rate" />
        </div>
        <BankPerformanceChart data={banks.banks} />
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {banks.banks.slice(0, 6).map((b) => (
            <div key={b.bank} className="rounded-lg border border-border bg-white px-3 py-2">
              <p className="truncate text-xs font-medium text-foreground">{b.bank}</p>
              <p className="text-sm font-bold text-primary">{b.winRate}%</p>
            </div>
          ))}
        </div>
      </div>
    </PreviewCardShell>
  );
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="h-2.5 w-2.5 rounded-full" style={{ background: color }} />
      <span className="text-muted-foreground">{label}</span>
    </div>
  );
}

// ============================================================
// Card 5: Customer Funnel (animated)
// ============================================================
export function CustomerFunnelCard() {
  const funnel = useAppStore((s) => s.simulation.funnel);
  const max = funnel.stages[0].value;

  return (
    <PreviewCardShell sectionKey="customerFunnel" number={5} title="Customer Funnel" icon={Filter}>
      <div className="space-y-2">
        {funnel.stages.map((stage, i) => {
          const pct = (stage.value / max) * 100;
          const conversion = i > 0 ? (stage.value / funnel.stages[i - 1].value) * 100 : 100;
          return (
            <div key={stage.id}>
              <div className="mb-1 flex items-center justify-between text-xs">
                <span className="font-medium text-foreground">{stage.stage}</span>
                <span className="text-muted-foreground">
                  {stage.value.toLocaleString()} · <span className="font-semibold text-foreground">{conversion.toFixed(0)}%</span>
                </span>
              </div>
              <motion.div
                initial={{ width: 0, opacity: 0.6 }}
                animate={{ width: `${pct}%`, opacity: 1 }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: 'easeOut' }}
                className="h-9 rounded-lg shadow-soft"
                style={{ background: `linear-gradient(90deg, ${stage.color}, ${stage.color}cc)` }}
              />
            </div>
          );
        })}
        <div className="mt-2 flex items-center justify-between rounded-lg bg-muted/40 px-3 py-2 text-xs">
          <span className="text-muted-foreground">Overall conversion</span>
          <span className="font-bold text-foreground">
            {((funnel.stages[funnel.stages.length - 1].value / funnel.stages[0].value) * 100).toFixed(1)}%
          </span>
        </div>
      </div>
    </PreviewCardShell>
  );
}
