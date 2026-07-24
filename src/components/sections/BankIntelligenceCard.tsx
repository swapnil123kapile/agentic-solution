import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, ChevronDown, Megaphone, Percent, FileText, TrendingUp } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { PreviewCardShell } from '@/components/common/PreviewCardShell';
import { cn } from '@/lib/utils';

export function BankIntelligenceCard() {
  const banks = useAppStore((s) => s.simulation.bankIntel.banks);
  const [expanded, setExpanded] = useState<string | null>(banks[0]?.bankId ?? null);

  return (
    <PreviewCardShell sectionKey="bankIntelligence" number={13} title="Bank Intelligence" icon={Building2}>
      <div className="space-y-2.5">
        {banks.map((bank, i) => {
          const isOpen = expanded === bank.bankId;
          const isDB = bank.bankId === 'B001';
          return (
            <div
              key={bank.bankId}
              className={cn(
                'overflow-hidden rounded-xl border transition',
                isDB ? 'border-secondary/40 bg-secondary/5' : 'border-border bg-card/40',
                isOpen && 'border-primary/30 shadow-soft'
              )}
            >
              {/* Header row */}
              <button
                onClick={() => setExpanded(isOpen ? null : bank.bankId)}
                className="flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-white/5"
              >
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xs font-bold text-white shadow-soft"
                  style={{ backgroundColor: bank.color }}
                >
                  {bank.shortName}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-foreground">{bank.bankName}</p>
                  <p className="text-[11px] text-muted-foreground">
                    Reputation {bank.reputation} · {bank.offers.length} offers · Win rate {bank.winRate}%
                  </p>
                </div>
                <div className="hidden items-center gap-2 sm:flex">
                  <div className="flex items-center gap-1.5 rounded-lg bg-muted/50 px-2 py-1">
                    <Percent className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs font-bold text-foreground">{bank.offers[0]?.interestRateApr.toFixed(2)}%</span>
                    <span className="text-[10px] text-muted-foreground">from</span>
                  </div>
                </div>
                <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </motion.span>
              </button>

              {/* Expandable details */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden border-t border-border"
                  >
                    <div className="grid grid-cols-1 gap-4 p-4 lg:grid-cols-3">
                      {/* Offers */}
                      <div className="lg:col-span-2">
                        <div className="mb-2 flex items-center gap-2">
                          <FileText className="h-3.5 w-3.5 text-muted-foreground" />
                          <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Current Offers</p>
                        </div>
                        <div className="space-y-1.5">
                          {bank.offers.map((offer) => (
                            <div key={offer.offerId} className="flex items-center justify-between rounded-lg border border-border bg-card/60 px-3 py-2">
                              <div className="min-w-0">
                                <p className="text-[13px] font-medium text-foreground">{offer.productName}</p>
                                <p className="text-[10px] text-muted-foreground">
                                  €{offer.minAmount.toLocaleString()}–{offer.maxAmount.toLocaleString()} · {offer.minTermMonths}–{offer.maxTermMonths}m
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm font-bold text-primary">{offer.interestRateApr.toFixed(2)}%</p>
                                <p className="text-[10px] text-muted-foreground">APR</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Actions + Campaigns */}
                      <div className="space-y-3">
                        <div>
                          <div className="mb-2 flex items-center gap-2">
                            <TrendingUp className="h-3.5 w-3.5 text-muted-foreground" />
                            <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Recent Actions</p>
                          </div>
                          <div className="space-y-1.5">
                            {bank.actions.slice(-3).map((a, idx) => (
                              <div key={idx} className="rounded-lg border border-border bg-card/60 px-3 py-2">
                                <div className="flex items-center justify-between">
                                  <span className="rounded bg-muted/60 px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">T{a.timestep}</span>
                                  <span className="text-[10px] font-semibold text-secondary">{a.actionType}</span>
                                </div>
                                <p className="mt-1 text-[12px] leading-snug text-muted-foreground">{a.detail}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {bank.campaigns.length > 0 && (
                          <div>
                            <div className="mb-2 flex items-center gap-2">
                              <Megaphone className="h-3.5 w-3.5 text-muted-foreground" />
                              <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Campaigns</p>
                            </div>
                            <div className="space-y-1.5">
                              {bank.campaigns.map((c, idx) => (
                                <div key={idx} className="rounded-lg border border-primary/20 bg-primary/5 px-3 py-2">
                                  <span className="text-[10px] font-medium text-primary">T{c.timestep}</span>
                                  <p className="mt-0.5 text-[12px] leading-snug text-foreground">{c.description}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </PreviewCardShell>
  );
}
