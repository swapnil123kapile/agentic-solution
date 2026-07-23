import {
  Rocket,
  Handshake,
  Crosshair,
  ListChecks,
  Milestone,
  Brain,
  Smartphone,
  Cloud,
  CreditCard,
  Network,
  TrendingUp,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import { PreviewCardShell } from '@/components/common/PreviewCardShell';
import { EmptyState } from '@/components/common/CardPrimitives';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import type { Priority, FitRecommendation, TimelineStatus } from '@/types';

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Brain,
  Smartphone,
  Cloud,
  CreditCard,
  Network,
  TrendingUp,
};

// ---------- Card 6: Growth Opportunities ----------
export function GrowthOpportunitiesCard() {
  const data = useAppStore((s) => s.pitchbook.growthOpportunities);
  const generated = useAppStore((s) => s.generatedSections.growthOpportunities);
  return (
    <PreviewCardShell sectionKey="growthOpportunities" number={6} title="Growth Opportunities" icon={Rocket} generated={generated}>
      {data ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {data.opportunities.map((o, i) => {
            const Icon = ICONS[o.icon] ?? Rocket;
            return (
              <motion.div
                key={o.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group rounded-xl border border-border bg-gradient-to-b from-white to-muted/30 p-3.5 transition hover:border-primary/30 hover:shadow-soft-md"
              >
                <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-white">
                  <Icon className="h-[18px] w-[18px]" />
                </div>
                <p className="text-sm font-semibold text-foreground">{o.title}</p>
                <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">{o.description}</p>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <EmptyState icon={Rocket} label="Growth opportunities not generated" />
      )}
    </PreviewCardShell>
  );
}

// ---------- Card 7: Recent M&A ----------
export function RecentMACard() {
  const data = useAppStore((s) => s.pitchbook.recentMA);
  const generated = useAppStore((s) => s.generatedSections.recentMA);
  return (
    <PreviewCardShell sectionKey="recentMA" number={7} title="Recent M&A" icon={Handshake} generated={generated}>
      {data ? (
        <div className="overflow-hidden rounded-xl border border-border">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                <TableHead className="text-xs font-semibold uppercase">Company</TableHead>
                <TableHead className="text-xs font-semibold uppercase">Acquirer</TableHead>
                <TableHead className="text-right text-xs font-semibold uppercase">Deal Size</TableHead>
                <TableHead className="text-right text-xs font-semibold uppercase">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.records.map((r) => (
                <TableRow key={r.id} className="text-sm">
                  <TableCell className="font-medium text-foreground">{r.company}</TableCell>
                  <TableCell className="text-muted-foreground">{r.acquirer}</TableCell>
                  <TableCell className="text-right font-semibold text-foreground">{r.dealSize}</TableCell>
                  <TableCell className="text-right text-muted-foreground">{r.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <EmptyState icon={Handshake} label="Recent M&A data not generated" />
      )}
    </PreviewCardShell>
  );
}

// ---------- Card 8: Potential Targets ----------
const FIT_STYLES: Record<FitRecommendation, string> = {
  'Strong Fit': 'bg-success/10 text-success border-success/20',
  'Good Fit': 'bg-primary/10 text-primary border-primary/20',
  Watch: 'bg-warning/10 text-warning border-warning/20',
};

export function PotentialTargetsCard() {
  const data = useAppStore((s) => s.pitchbook.potentialTargets);
  const generated = useAppStore((s) => s.generatedSections.potentialTargets);
  return (
    <PreviewCardShell sectionKey="potentialTargets" number={8} title="Potential Targets" icon={Crosshair} generated={generated}>
      {data ? (
        <div className="overflow-hidden rounded-xl border border-border">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                <TableHead className="text-xs font-semibold uppercase">Company</TableHead>
                <TableHead className="text-xs font-semibold uppercase">Industry</TableHead>
                <TableHead className="w-[140px] text-xs font-semibold uppercase">Fit Score</TableHead>
                <TableHead className="text-right text-xs font-semibold uppercase">Recommendation</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.targets.map((t) => (
                <TableRow key={t.id} className="text-sm">
                  <TableCell className="font-medium text-foreground">{t.company}</TableCell>
                  <TableCell className="text-muted-foreground">{t.industry}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={t.fitScore} className="h-1.5 w-20" />
                      <span className="text-xs font-bold text-foreground">{t.fitScore}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge variant="outline" className={cn('border text-[11px] font-semibold', FIT_STYLES[t.recommendation])}>
                      {t.recommendation}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <EmptyState icon={Crosshair} label="Potential targets not generated" />
      )}
    </PreviewCardShell>
  );
}

// ---------- Card 9: Strategic Recommendations ----------
const PRIORITY_STYLES: Record<Priority, string> = {
  high: 'bg-danger/10 text-danger border-danger/20',
  medium: 'bg-warning/10 text-warning border-warning/20',
  low: 'bg-success/10 text-success border-success/20',
};

export function StrategicRecommendationsCard() {
  const data = useAppStore((s) => s.pitchbook.strategicRecommendations);
  const generated = useAppStore((s) => s.generatedSections.strategicRecommendations);
  const toggleRecommendation = useAppStore((s) => s.toggleRecommendation);
  return (
    <PreviewCardShell sectionKey="strategicRecommendations" number={9} title="Strategic Recommendations" icon={ListChecks} generated={generated}>
      {data ? (
        <div className="space-y-2.5">
          {data.recommendations.map((r) => (
            <div
              key={r.id}
              className={cn(
                'flex items-start gap-3 rounded-xl border bg-white p-3 transition',
                r.completed ? 'border-success/30 bg-success/5' : 'border-border hover:border-primary/30'
              )}
            >
              <button
                onClick={() => toggleRecommendation(r.id)}
                className={cn(
                  'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition',
                  r.completed ? 'border-success bg-success text-white' : 'border-muted-foreground/40 bg-white hover:border-primary'
                )}
              >
                {r.completed && (
                  <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none">
                    <path d="M2 6l3 3 5-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
              <div className="min-w-0 flex-1">
                <p className={cn('text-sm font-medium text-foreground', r.completed && 'line-through text-muted-foreground')}>{r.title}</p>
                <div className="mt-1.5 flex flex-wrap items-center gap-2 text-[11px]">
                  <Badge variant="outline" className={cn('border font-semibold uppercase', PRIORITY_STYLES[r.priority])}>
                    {r.priority} priority
                  </Badge>
                  <span className="text-muted-foreground">Owner: <span className="font-medium text-foreground">{r.owner}</span></span>
                  <span className="text-muted-foreground">Impact: <span className="font-medium text-foreground">{r.expectedImpact}</span></span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState icon={ListChecks} label="Strategic recommendations not generated" />
      )}
    </PreviewCardShell>
  );
}

// ---------- Card 10: Next Steps (Timeline) ----------
const STEP_STYLES: Record<TimelineStatus, { ring: string; bg: string; text: string }> = {
  completed: { ring: 'ring-success', bg: 'bg-success', text: 'text-success' },
  active: { ring: 'ring-primary', bg: 'bg-primary', text: 'text-primary' },
  pending: { ring: 'ring-border', bg: 'bg-muted-foreground/30', text: 'text-muted-foreground' },
};

export function NextStepsCard() {
  const data = useAppStore((s) => s.pitchbook.nextSteps);
  const generated = useAppStore((s) => s.generatedSections.nextSteps);
  return (
    <PreviewCardShell sectionKey="nextSteps" number={10} title="Next Steps" icon={Milestone} generated={generated}>
      {data ? (
        <div className="overflow-x-auto pb-2">
          <div className="flex min-w-max items-start gap-0 px-1">
            {data.steps.map((step, i) => {
              const s = STEP_STYLES[step.status];
              const isLast = i === data.steps.length - 1;
              return (
                <div key={step.id} className="flex items-start">
                  <div className="flex flex-col items-center" style={{ minWidth: 110 }}>
                    <div className={cn('flex h-9 w-9 items-center justify-center rounded-full text-white ring-4 ring-offset-2 ring-offset-white', s.bg, s.ring)}>
                      {step.status === 'completed' ? (
                        <svg viewBox="0 0 12 12" className="h-4 w-4" fill="none">
                          <path d="M2 6l3 3 5-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      ) : step.status === 'active' ? (
                        <span className="h-2.5 w-2.5 rounded-full bg-white" />
                      ) : (
                        <span className="text-xs font-bold">{i + 1}</span>
                      )}
                    </div>
                    <p className={cn('mt-2 text-sm font-semibold', s.text)}>{step.label}</p>
                    <p className="text-[11px] text-muted-foreground">{step.date}</p>
                  </div>
                  {!isLast && (
                    <div className="mt-[18px] h-0.5 w-16 shrink-0 rounded-full bg-gradient-to-r from-border to-border">
                      <div
                        className={cn('h-full rounded-full transition-all', step.status === 'completed' ? 'w-full bg-success' : 'w-0')}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <EmptyState icon={Milestone} label="Next steps not generated" />
      )}
    </PreviewCardShell>
  );
}
