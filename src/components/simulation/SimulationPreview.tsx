import { motion } from 'framer-motion';
import { FlaskConical, Activity, Clock, Zap } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { useCountUp } from '@/hooks/useCountUp';
import {
  SimulationSummaryCard,
  CurrentKpisCard,
  SimulationProgressCard,
  BankPerformanceCard,
  CustomerFunnelCard,
} from '@/components/cards/SimCardsOneToFive';
import {
  LossAnalysisCard,
  ImprovementSimulatorCard,
  RecommendationsCard,
  CustomerFeedbackCard,
  ScenarioComparisonCard,
} from '@/components/cards/SimCardsSixToTen';
import { WorldIntelligenceCard } from '@/components/sections/WorldIntelligenceCard';
import { MarketplaceIntelligenceCard } from '@/components/sections/MarketplaceIntelligenceCard';
import { BankIntelligenceCard } from '@/components/sections/BankIntelligenceCard';
import { ConsumerIntelligenceCard } from '@/components/sections/ConsumerIntelligenceCard';
import { SimulationHealthCard } from '@/components/sections/SimulationHealthCard';

export function SimulationPreview() {
  const summary = useAppStore((s) => s.simulation.summary);
  const progress = useCountUp(summary.progress);

  return (
    <div className="flex h-full flex-col">
      {/* Hero section */}
      <div className="relative overflow-hidden border-b border-border bg-gradient-to-br from-card/60 via-background to-background px-4 py-6 lg:px-6">
        <div className="absolute inset-0 bg-glass-radial opacity-40" />
        <div className="relative flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="mt-0.5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-orange-600 text-white shadow-glow ring-1 ring-white/10">
              <FlaskConical className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-foreground">
                Executive Command Center
              </h1>
              <p className="mt-0.5 text-[13px] text-muted-foreground">
                {summary.scenarioName} · {summary.personas.banks} banks competing for {summary.personas.consumers} consumers
              </p>
            </div>
          </div>

          {/* Hero stats */}
          <div className="flex items-center gap-4">
            <HeroStat icon={Activity} label="Status" value={summary.status === 'completed' ? 'Completed' : summary.status === 'running' ? 'Running' : 'Idle'} color={summary.status === 'completed' ? 'text-success' : summary.status === 'running' ? 'text-warning' : 'text-muted-foreground'} />
            <HeroStat icon={Clock} label="Timestep" value={`${summary.currentTimestep} / ${summary.totalTimesteps}`} color="text-secondary" />
            <HeroStat icon={Zap} label="Progress" value={`${Math.round(progress)}%`} color="text-primary" />
          </div>
        </div>

        {/* Animated progress bar */}
        <div className="relative mt-5">
          <div className="h-1.5 overflow-hidden rounded-full bg-muted">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
              className="h-full rounded-full bg-gradient-to-r from-primary via-orange-500 to-secondary"
            />
          </div>
          {/* Timestep markers */}
          <div className="mt-2 flex justify-between">
            {summary.totalTimesteps > 0 && Array.from({ length: 6 }).map((_, i) => {
              const step = Math.round((i / 5) * summary.totalTimesteps);
              return (
                <div key={i} className="flex flex-col items-center">
                  <div className="h-1 w-px bg-border" />
                  <span className="mt-1 text-[10px] text-muted-foreground">T{step}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Cards scroll area */}
      <div className="min-h-0 flex-1 overflow-y-auto scrollbar-thin px-4 py-5 lg:px-6">
        <div className="mx-auto flex max-w-5xl flex-col gap-4">
          <SimulationSummaryCard />
          <CurrentKpisCard />
          <SimulationProgressCard />
          <BankPerformanceCard />
          <CustomerFunnelCard />
          <LossAnalysisCard />
          <ImprovementSimulatorCard />
          <WorldIntelligenceCard />
          <MarketplaceIntelligenceCard />
          <BankIntelligenceCard />
          <ConsumerIntelligenceCard />
          <RecommendationsCard />
          <CustomerFeedbackCard />
          <ScenarioComparisonCard />
          <SimulationHealthCard />
          <div className="h-6" />
        </div>
      </div>
    </div>
  );
}

function HeroStat({ icon: Icon, label, value, color }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string; color: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-muted/40">
        <Icon className={cn('h-4 w-4', color)} />
      </div>
      <div>
        <p className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
        <p className="text-sm font-bold capitalize text-foreground">{value}</p>
      </div>
    </div>
  );
}

import { cn } from '@/lib/utils';
