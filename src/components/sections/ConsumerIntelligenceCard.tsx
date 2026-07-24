import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Search, Filter } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { PreviewCardShell } from '@/components/common/PreviewCardShell';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const STAGE_COLORS: Record<string, string> = {
  Lead: 'bg-muted text-muted-foreground border-border',
  Application: 'bg-info/15 text-info border-info/30',
  Approval: 'bg-secondary/15 text-secondary border-secondary/30',
  Offer: 'bg-primary/15 text-primary border-primary/30',
  Accepted: 'bg-success/15 text-success border-success/30',
  Disbursed: 'bg-success/20 text-success border-success/40',
  Dropped: 'bg-danger/15 text-danger border-danger/30',
};

const APPROVAL_STYLES: Record<string, string> = {
  Approved: 'text-success',
  Pending: 'text-warning',
  Rejected: 'text-danger',
};

export function ConsumerIntelligenceCard() {
  const consumers = useAppStore((s) => s.simulation.consumerIntel.consumers);
  const search = useAppStore((s) => s.consumerSearch);
  const setSearch = useAppStore((s) => s.setConsumerSearch);
  const [stageFilter, setStageFilter] = useState<string>('all');

  const stages = ['all', 'Lead', 'Application', 'Offer', 'Accepted', 'Disbursed', 'Dropped'];

  const filtered = consumers.filter((c) => {
    const matchesSearch =
      !search ||
      c.consumerName.toLowerCase().includes(search.toLowerCase()) ||
      c.persona.toLowerCase().includes(search.toLowerCase()) ||
      c.selectedBank.toLowerCase().includes(search.toLowerCase());
    const matchesStage = stageFilter === 'all' || c.funnelStage === stageFilter;
    return matchesSearch && matchesStage;
  });

  return (
    <PreviewCardShell sectionKey="consumerIntelligence" number={14} title="Consumer Intelligence" icon={Users}>
      <div className="space-y-4">
        {/* Search + filters */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search consumers, personas, banks…"
              className="h-9 rounded-xl border-border bg-muted/40 pl-10 text-sm"
            />
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto">
            <Filter className="h-4 w-4 shrink-0 text-muted-foreground" />
            {stages.map((s) => (
              <button
                key={s}
                onClick={() => setStageFilter(s)}
                className={cn(
                  'shrink-0 rounded-lg px-2.5 py-1 text-xs font-medium transition',
                  stageFilter === s ? 'bg-primary text-white' : 'bg-muted/50 text-muted-foreground hover:text-foreground'
                )}
              >
                {s === 'all' ? 'All' : s}
              </button>
            ))}
          </div>
        </div>

        {/* Consumer cards */}
        <div className="grid grid-cols-1 gap-2.5 md:grid-cols-2">
          {filtered.map((c, i) => (
            <motion.div
              key={c.consumerId}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-xl border border-border bg-card/50 p-3.5 transition hover:border-primary/30"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-sm font-semibold text-foreground">{c.consumerName}</p>
                  <p className="text-[11px] text-muted-foreground">{c.persona}</p>
                </div>
                <Badge variant="outline" className={cn('shrink-0 border text-[10px] font-semibold', STAGE_COLORS[c.funnelStage] ?? STAGE_COLORS.Lead)}>
                  {c.funnelStage}
                </Badge>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                <InfoRow label="Selected Bank" value={c.selectedBank || '—'} />
                <InfoRow label="Approval" value={c.approvalStatus} valueClass={APPROVAL_STYLES[c.approvalStatus]} />
                {c.loanAmount > 0 && <InfoRow label="Loan Amount" value={`€${c.loanAmount.toLocaleString()}`} />}
                {c.interestRate > 0 && <InfoRow label="Interest Rate" value={`${c.interestRate.toFixed(2)}%`} />}
              </div>

              {/* Journey timeline */}
              <div className="mt-3 border-t border-border pt-2.5">
                <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">Journey</p>
                <div className="flex items-center gap-1">
                  {c.journey.map((step, idx) => (
                    <div key={idx} className="flex items-center gap-1">
                      {idx > 0 && <div className="h-px w-3 bg-border" />}
                      <div className="flex flex-col items-center">
                        <div className={cn('h-2 w-2 rounded-full', step.funnelStageAfter === 'Dropped' ? 'bg-danger' : 'bg-primary')} />
                        <span className="mt-0.5 text-[9px] text-muted-foreground">T{step.timestep}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="py-8 text-center text-sm text-muted-foreground">No consumers match your search.</p>
        )}
      </div>
    </PreviewCardShell>
  );
}

function InfoRow({ label, value, valueClass }: { label: string; value: string; valueClass?: string }) {
  return (
    <div className="rounded-lg bg-muted/30 px-2.5 py-1.5">
      <p className="text-[10px] text-muted-foreground">{label}</p>
      <p className={cn('text-[13px] font-semibold text-foreground', valueClass)}>{value}</p>
    </div>
  );
}
