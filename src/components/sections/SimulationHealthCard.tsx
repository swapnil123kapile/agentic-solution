import { motion } from 'framer-motion';
import { ShieldCheck, AlertTriangle, Wrench, CheckCircle2, XCircle } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { PreviewCardShell } from '@/components/common/PreviewCardShell';
import { cn } from '@/lib/utils';
import type { ValidationStatus } from '@/types';

const STATUS_META: Record<ValidationStatus, { icon: React.ComponentType<{ className?: string }>; color: string; label: string }> = {
  valid: { icon: CheckCircle2, color: 'text-success', label: 'Valid' },
  repaired: { icon: Wrench, color: 'text-warning', label: 'Repaired' },
  invalid: { icon: XCircle, color: 'text-danger', label: 'Invalid' },
};

export function SimulationHealthCard() {
  const health = useAppStore((s) => s.simulation.health);

  const healthScore = Math.round((health.validRows / health.totalRows) * 100);
  const issuesWithErrors = health.issues.filter((i) => i.errorCount > 0 || i.status === 'invalid');

  return (
    <PreviewCardShell sectionKey="simulationHealth" number={15} title="Simulation Health" icon={ShieldCheck}>
      <div className="space-y-4">
        {/* Health score ring */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <HealthStat label="Total Rows" value={health.totalRows.toLocaleString()} icon={ShieldCheck} color="text-muted-foreground" />
          <HealthStat label="Valid" value={health.validRows.toLocaleString()} icon={CheckCircle2} color="text-success" />
          <HealthStat label="Repaired" value={health.repairedRows.toLocaleString()} icon={Wrench} color="text-warning" />
          <HealthStat label="Invalid" value={health.invalidRows.toLocaleString()} icon={AlertTriangle} color="text-danger" />
        </div>

        {/* Health bar */}
        <div className="rounded-xl border border-border bg-card/50 p-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-semibold text-foreground">Data Quality Score</span>
            <span className={cn('text-2xl font-bold', healthScore > 90 ? 'text-success' : healthScore > 75 ? 'text-warning' : 'text-danger')}>
              {healthScore}%
            </span>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-muted">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${healthScore}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className={cn('h-full rounded-full', healthScore > 90 ? 'bg-success' : healthScore > 75 ? 'bg-warning' : 'bg-danger')}
            />
          </div>
        </div>

        {/* Issues */}
        <div>
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Validation Issues</p>
          <div className="space-y-1.5">
            {health.issues.map((issue, i) => {
              const meta = STATUS_META[issue.status];
              const Icon = meta.icon;
              return (
                <motion.div
                  key={issue.id}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className={cn(
                    'flex items-start gap-3 rounded-xl border p-3 transition',
                    issue.status === 'invalid' ? 'border-danger/30 bg-danger/5' : issue.status === 'repaired' ? 'border-warning/20 bg-warning/5' : 'border-border bg-card/40'
                  )}
                >
                  <Icon className={cn('mt-0.5 h-4 w-4 shrink-0', meta.color)} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-medium text-muted-foreground">{issue.source}</span>
                      <span className="text-[10px] text-muted-foreground">·</span>
                      <span className="text-[11px] font-medium text-muted-foreground">T{issue.timestep}</span>
                      <span className={cn('ml-auto rounded-md border border-current/20 px-1.5 py-0.5 text-[10px] font-semibold', meta.color)}>
                        {meta.label}
                      </span>
                    </div>
                    <p className="mt-1 text-[13px] text-foreground">{issue.message}</p>
                    {issue.errorCount > 0 && (
                      <p className="mt-0.5 text-[11px] text-muted-foreground">
                        {issue.errorCount} error{issue.errorCount > 1 ? 's' : ''} · {issue.repairStatus}
                      </p>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </PreviewCardShell>
  );
}

function HealthStat({ label, value, icon: Icon, color }: { label: string; value: string; icon: React.ComponentType<{ className?: string }>; color: string }) {
  return (
    <div className="rounded-xl border border-border bg-card/50 p-3">
      <Icon className={cn('h-4 w-4', color)} />
      <p className="mt-2 text-lg font-bold tabular-nums text-foreground">{value}</p>
      <p className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
    </div>
  );
}
