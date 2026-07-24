import { motion } from 'framer-motion';
import {
  Globe,
  TrendingUp,
  TrendingDown,
  Newspaper,
  Landmark,
  Briefcase,
  DollarSign,
  AlertCircle,
} from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { PreviewCardShell } from '@/components/common/PreviewCardShell';
import { cn } from '@/lib/utils';
import type { NewsCategory, Sentiment } from '@/types';

const CATEGORY_META: Record<NewsCategory, { icon: React.ComponentType<{ className?: string }>; color: string; label: string }> = {
  economic: { icon: DollarSign, color: 'text-primary', label: 'Economic' },
  interest_rate: { icon: Landmark, color: 'text-secondary', label: 'Interest Rate' },
  inflation: { icon: TrendingDown, color: 'text-warning', label: 'Inflation' },
  employment: { icon: Briefcase, color: 'text-info', label: 'Employment' },
  sentiment: { icon: AlertCircle, color: 'text-danger', label: 'Sentiment' },
  policy: { icon: Newspaper, color: 'text-success', label: 'Policy' },
};

const SENTIMENT_DOT: Record<Sentiment, string> = {
  positive: 'bg-success',
  neutral: 'bg-muted-foreground',
  negative: 'bg-danger',
};

const IMPACT_COLOR: Record<string, string> = {
  high: 'border-primary/30 text-primary',
  medium: 'border-secondary/30 text-secondary',
  low: 'border-muted-foreground/30 text-muted-foreground',
};

export function WorldIntelligenceCard() {
  const world = useAppStore((s) => s.simulation.world);
  const sorted = [...world.items].sort((a, b) => b.timestep - a.timestep);

  return (
    <PreviewCardShell sectionKey="worldIntelligence" number={11} title="World Intelligence" icon={Globe}>
      <div className="space-y-2.5">
        {sorted.map((item, i) => {
          const meta = CATEGORY_META[item.category];
          const Icon = meta.icon;
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex gap-3 rounded-xl border border-border bg-card/60 p-3.5 transition hover:border-primary/30"
            >
              <div className={cn('flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted/50', meta.color)}>
                <Icon className="h-[18px] w-[18px]" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-semibold text-foreground">{item.headline}</p>
                  <span className={cn('shrink-0 rounded-md border px-1.5 py-0.5 text-[10px] font-semibold uppercase', IMPACT_COLOR[item.impact])}>
                    {item.impact}
                  </span>
                </div>
                <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">{item.summary}</p>
                <div className="mt-2 flex items-center gap-3 text-[11px] text-muted-foreground">
                  <span className="font-medium">{meta.label}</span>
                  <span>·</span>
                  <span>Timestep {item.timestep}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <span className={cn('h-1.5 w-1.5 rounded-full', SENTIMENT_DOT[item.sentiment])} />
                    {item.sentiment}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </PreviewCardShell>
  );
}
