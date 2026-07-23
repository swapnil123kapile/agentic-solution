import { FileText, Building2, BarChart3, TrendingUp, Target } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { PreviewCardShell } from '@/components/common/PreviewCardShell';
import { EmptyState } from '@/components/common/CardPrimitives';
import { IndustryBarChart } from '@/components/charts/IndustryBarChart';
import { CompetitiveDonutChart } from '@/components/charts/CompetitiveDonutChart';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { KeyTrend, TrendImpact } from '@/types';

// ---------- Card 1: Executive Summary ----------
export function ExecutiveSummaryCard() {
  const data = useAppStore((s) => s.pitchbook.executiveSummary);
  const generated = useAppStore((s) => s.generatedSections.executiveSummary);
  return (
    <PreviewCardShell sectionKey="executiveSummary" number={1} title="Executive Summary" icon={FileText} generated={generated}>
      {data ? (
        <div className="space-y-4">
          <p className="text-sm leading-relaxed text-foreground">{data.overview}</p>
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Key Highlights</p>
            <ul className="space-y-2">
              {data.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-foreground">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span className="leading-relaxed">{h}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-3.5">
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">Key Takeaway</p>
            <p className="mt-1 text-sm font-medium leading-relaxed text-foreground">{data.keyTakeaway}</p>
          </div>
        </div>
      ) : (
        <EmptyState icon={FileText} label="Executive summary not generated" hint="Ask the AI copilot to generate an executive summary." />
      )}
    </PreviewCardShell>
  );
}

// ---------- Card 2: Client Snapshot ----------
export function ClientSnapshotCard() {
  const data = useAppStore((s) => s.pitchbook.clientSnapshot);
  const generated = useAppStore((s) => s.generatedSections.clientSnapshot);
  return (
    <PreviewCardShell sectionKey="clientSnapshot" number={2} title="Client Snapshot" icon={Building2} generated={generated}>
      {data ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <SnapshotField label="Client Name" value={data.clientName} />
            <SnapshotField label="Industry" value={data.industry} />
            <SnapshotField label="Relationship Manager" value={data.relationshipManager} />
            <SnapshotField label="Region" value={data.region} />
            <SnapshotField label="Revenue" value={data.revenue} />
            <SnapshotField label="Employees" value={data.employees} />
          </div>
          <div className="rounded-xl border border-border bg-muted/40 p-3.5">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Engagement Objective</p>
            <p className="mt-1 text-sm leading-relaxed text-foreground">{data.engagementObjective}</p>
          </div>
        </div>
      ) : (
        <EmptyState icon={Building2} label="Client snapshot not generated" />
      )}
    </PreviewCardShell>
  );
}

function SnapshotField({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-white p-3">
      <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-0.5 text-sm font-semibold text-foreground">{value}</p>
    </div>
  );
}

// ---------- Card 3: Industry Overview ----------
export function IndustryOverviewCard() {
  const data = useAppStore((s) => s.pitchbook.industryOverview);
  const generated = useAppStore((s) => s.generatedSections.industryOverview);
  return (
    <PreviewCardShell sectionKey="industryOverview" number={3} title="Industry Overview" icon={BarChart3} generated={generated}>
      {data ? (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <Metric label="Market Size" value={data.marketSize} />
            <Metric label="CAGR" value={data.cagr} />
            <Metric label="Growth" value={data.growth} accent />
          </div>
          <IndustryBarChart data={data.chart} />
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Industry Highlights</p>
            <ul className="space-y-2">
              {data.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-foreground">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span className="leading-relaxed">{h}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <EmptyState icon={BarChart3} label="Industry overview not generated" />
      )}
    </PreviewCardShell>
  );
}

function Metric({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className={cn('rounded-xl border p-3', accent ? 'border-success/30 bg-success/5' : 'border-border bg-white')}>
      <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className={cn('mt-0.5 text-base font-bold', accent ? 'text-success' : 'text-foreground')}>{value}</p>
    </div>
  );
}

// ---------- Card 4: Key Trends ----------
const IMPACT_STYLES: Record<TrendImpact, { dot: string; badge: string }> = {
  high: { dot: 'bg-danger', badge: 'bg-danger/10 text-danger border-danger/20' },
  medium: { dot: 'bg-warning', badge: 'bg-warning/10 text-warning border-warning/20' },
  low: { dot: 'bg-success', badge: 'bg-success/10 text-success border-success/20' },
};

export function KeyTrendsCard() {
  const data = useAppStore((s) => s.pitchbook.keyTrends);
  const generated = useAppStore((s) => s.generatedSections.keyTrends);
  return (
    <PreviewCardShell sectionKey="keyTrends" number={4} title="Key Trends" icon={TrendingUp} generated={generated}>
      {data ? (
        <div className="space-y-2.5">
          {data.trends.map((t: KeyTrend) => {
            const s = IMPACT_STYLES[t.impact];
            return (
              <div key={t.id} className="flex items-start gap-3 rounded-xl border border-border bg-white p-3 transition hover:border-primary/30 hover:shadow-soft">
                <span className={cn('mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full', s.dot)} />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-semibold text-foreground">{t.title}</p>
                    <Badge variant="outline" className={cn('border text-[10px] font-semibold uppercase', s.badge)}>
                      {t.impact} impact
                    </Badge>
                  </div>
                  <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">{t.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <EmptyState icon={TrendingUp} label="Key trends not generated" />
      )}
    </PreviewCardShell>
  );
}

// ---------- Card 5: Competitive Landscape ----------
export function CompetitiveLandscapeCard() {
  const data = useAppStore((s) => s.pitchbook.competitiveLandscape);
  const generated = useAppStore((s) => s.generatedSections.competitiveLandscape);
  return (
    <PreviewCardShell sectionKey="competitiveLandscape" number={5} title="Competitive Landscape" icon={Target} generated={generated}>
      {data ? (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <CompetitiveDonutChart data={data.chart} />
          </div>
          <div className="space-y-2 lg:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Competitor List</p>
            {data.competitors.map((c, i) => (
              <div key={c.id} className="flex items-center justify-between rounded-lg border border-border bg-white px-3 py-2">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full" style={{ background: ['#2563EB', '#10B981', '#F59E0B', '#7C3AED', '#EF4444'][i] }} />
                  <span className="text-[13px] font-medium text-foreground">{c.name}</span>
                </div>
                <span className="text-sm font-bold text-foreground">{c.marketShare}%</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <EmptyState icon={Target} label="Competitive landscape not generated" />
      )}
    </PreviewCardShell>
  );
}
