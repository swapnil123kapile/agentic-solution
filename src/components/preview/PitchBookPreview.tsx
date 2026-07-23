import { motion } from 'framer-motion';
import { Sparkles, ChevronsDownUp, ChevronsUpDown } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { Button } from '@/components/ui/button';
import {
  ExecutiveSummaryCard,
  ClientSnapshotCard,
  IndustryOverviewCard,
  KeyTrendsCard,
  CompetitiveLandscapeCard,
} from '@/components/cards/CardsOneToFive';
import {
  GrowthOpportunitiesCard,
  RecentMACard,
  PotentialTargetsCard,
  StrategicRecommendationsCard,
  NextStepsCard,
} from '@/components/cards/CardsSixToTen';

export function PitchBookPreview() {
  const collapseAll = useAppStore((s) => s.collapseAll);
  const collapseState = useAppStore((s) => s.collapseState);
  const allCollapsed = Object.values(collapseState).every(Boolean);

  return (
    <div className="flex h-full flex-col bg-background">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border bg-white px-4 py-4 lg:px-6">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/15">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-foreground">PitchBook Preview</h1>
            <p className="text-[13px] text-muted-foreground">Live preview of your AI generated advisory pitchbook.</p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => collapseAll(!allCollapsed)}
          className="gap-2 rounded-xl"
        >
          {allCollapsed ? <ChevronsUpDown className="h-4 w-4" /> : <ChevronsDownUp className="h-4 w-4" />}
          {allCollapsed ? 'Expand All' : 'Collapse All'}
        </Button>
      </div>

      {/* Cards scroll area */}
      <div className="min-h-0 flex-1 overflow-y-auto scrollbar-thin px-4 py-5 lg:px-6">
        <div className="mx-auto flex max-w-4xl flex-col gap-4">
          <motion.div layout className="flex flex-col gap-4">
            <ExecutiveSummaryCard />
            <ClientSnapshotCard />
            <IndustryOverviewCard />
            <KeyTrendsCard />
            <CompetitiveLandscapeCard />
            <GrowthOpportunitiesCard />
            <RecentMACard />
            <PotentialTargetsCard />
            <StrategicRecommendationsCard />
            <NextStepsCard />
          </motion.div>
          <div className="h-6" />
        </div>
      </div>
    </div>
  );
}
