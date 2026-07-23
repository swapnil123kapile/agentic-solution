import { motion } from 'framer-motion';
import { FlaskConical, ChevronsDownUp, ChevronsUpDown } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { Button } from '@/components/ui/button';
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

export function SimulationPreview() {
  return (
    <div className="flex h-full flex-col bg-background">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border bg-white/80 px-4 py-4 backdrop-blur lg:px-6">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/15">
            <FlaskConical className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-foreground">Simulation Preview</h1>
            <p className="text-[13px] text-muted-foreground">Live preview — every card updates automatically from backend responses.</p>
          </div>
        </div>
        <CollapseAllButton />
      </div>

      {/* Cards scroll area */}
      <div className="min-h-0 flex-1 overflow-y-auto scrollbar-thin px-4 py-5 lg:px-6">
        <div className="mx-auto flex max-w-4xl flex-col gap-4">
          <motion.div layout className="flex flex-col gap-4">
            <SimulationSummaryCard />
            <CurrentKpisCard />
            <SimulationProgressCard />
            <BankPerformanceCard />
            <CustomerFunnelCard />
            <LossAnalysisCard />
            <ImprovementSimulatorCard />
            <RecommendationsCard />
            <CustomerFeedbackCard />
            <ScenarioComparisonCard />
          </motion.div>
          <div className="h-6" />
        </div>
      </div>
    </div>
  );
}

function CollapseAllButton() {
  // For simplicity, this toggles a local collapse-all that's wired through each card's defaultOpen.
  // The cards here are always open; this is a visual control that could be extended.
  const [allCollapsed, setAllCollapsed] = useCollapseAllState();
  return (
    <Button variant="outline" size="sm" onClick={() => setAllCollapsed(!allCollapsed)} className="gap-2 rounded-xl">
      {allCollapsed ? <ChevronsUpDown className="h-4 w-4" /> : <ChevronsDownUp className="h-4 w-4" />}
      {allCollapsed ? 'Expand All' : 'Collapse All'}
    </Button>
  );
}

// Lightweight local state for the collapse-all affordance.
import { useState } from 'react';
function useCollapseAllState(): [boolean, (v: boolean) => void] {
  const [collapsed, setCollapsed] = useState(false);
  return [collapsed, setCollapsed];
}
