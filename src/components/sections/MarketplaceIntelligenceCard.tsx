import { motion } from 'framer-motion';
import {
  Store,
  Trophy,
  ArrowUp,
  ArrowDown,
  Minus,
  TrendingUp,
  Lightbulb,
} from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { PreviewCardShell } from '@/components/common/PreviewCardShell';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { Priority } from '@/types';

const RANK_COLORS = [
  'bg-gradient-to-br from-yellow-400 to-orange-500 text-white',
  'bg-gradient-to-br from-slate-300 to-slate-400 text-slate-900',
  'bg-gradient-to-br from-orange-600 to-amber-700 text-white',
];

const PRIORITY_STYLES: Record<Priority, string> = {
  high: 'border-primary/30 text-primary bg-primary/10',
  medium: 'border-warning/30 text-warning bg-warning/10',
  low: 'border-muted-foreground/30 text-muted-foreground bg-muted/30',
};

export function MarketplaceIntelligenceCard() {
  const marketplace = useAppStore((s) => s.simulation.marketplace);

  return (
    <PreviewCardShell sectionKey="marketplaceIntelligence" number={12} title="Marketplace Intelligence" icon={Store}>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Leaderboard */}
        <div>
          <div className="mb-3 flex items-center gap-2">
            <Trophy className="h-4 w-4 text-primary" />
            <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Bank Leaderboard</p>
          </div>
          <div className="space-y-1.5">
            {marketplace.rankings.map((r, i) => (
              <motion.div
                key={r.bankId}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                className={cn(
                  'flex items-center gap-3 rounded-xl border p-2.5 transition',
                  r.bankId === 'B001' ? 'border-secondary/30 bg-secondary/5' : 'border-border bg-card/40'
                )}
              >
                <div className={cn('flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold', RANK_COLORS[i] ?? 'bg-muted text-muted-foreground')}>
                  {r.rank}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-foreground">{r.bank}</p>
                  <p className="text-[11px] text-muted-foreground">Score {r.score} · Visibility {r.visibility}%</p>
                </div>
                <RankChange change={r.rankChange} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Trends + recommendations */}
        <div className="space-y-4">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-secondary" />
              <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Visibility Trends</p>
            </div>
            <div className="space-y-1.5">
              {marketplace.trends.map((t, i) => {
                const prev = i > 0 ? marketplace.trends[i - 1].visibilityAvg : t.visibilityAvg;
                const delta = t.visibilityAvg - prev;
                return (
                  <div key={t.timestep} className="flex items-center gap-3 rounded-lg border border-border bg-card/40 px-3 py-2">
                    <span className="text-xs font-medium text-muted-foreground">T{t.timestep}</span>
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${t.visibilityAvg}%` }}
                        transition={{ duration: 0.6, delay: i * 0.08 }}
                        className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                      />
                    </div>
                    <span className="text-xs font-bold tabular-nums text-foreground">{t.visibilityAvg}%</span>
                    {i > 0 && delta !== 0 && (
                      <span className={cn('text-[10px] font-semibold', delta > 0 ? 'text-success' : 'text-danger')}>
                        {delta > 0 ? '+' : ''}{delta}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <div className="mb-3 flex items-center gap-2">
              <Lightbulb className="h-4 w-4 text-primary" />
              <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Recommendations</p>
            </div>
            <div className="space-y-2">
              {marketplace.recommendations.map((rec) => (
                <div key={rec.id} className="rounded-xl border border-border bg-card/40 p-3">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-semibold text-foreground">{rec.title}</p>
                    <Badge variant="outline" className={cn('shrink-0 border text-[10px] font-semibold', PRIORITY_STYLES[rec.priority])}>
                      {rec.priority}
                    </Badge>
                  </div>
                  <p className="mt-1 text-[12px] text-muted-foreground">{rec.detail}</p>
                  <p className="mt-1.5 text-[11px] font-medium text-secondary">{rec.bank}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PreviewCardShell>
  );
}

function RankChange({ change }: { change: number }) {
  if (change === 0) return <Minus className="h-4 w-4 text-muted-foreground/50" />;
  if (change > 0) return (
    <span className="flex items-center gap-0.5 text-[11px] font-semibold text-success">
      <ArrowUp className="h-3 w-3" />{change}
    </span>
  );
  return (
    <span className="flex items-center gap-0.5 text-[11px] font-semibold text-danger">
      <ArrowDown className="h-3 w-3" />{Math.abs(change)}
    </span>
  );
}
