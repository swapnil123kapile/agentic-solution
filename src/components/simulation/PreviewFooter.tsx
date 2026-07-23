import { motion } from 'framer-motion';
import { Play, Save, GitCompareArrows, FileDown, FileText } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

export function PreviewFooter() {
  const runSimulation = useAppStore((s) => s.runSimulation);
  const simulationRunning = useAppStore((s) => s.simulationRunning);
  const status = useAppStore((s) => s.simulation.summary.status);
  const disabled = simulationRunning;

  const handleSave = () => toast.success('Simulation saved', { description: 'Current scenario state stored to your workspace.' });
  const handleCompare = () => toast.info('Opening comparison', { description: 'Baseline vs Improved scenario loaded.' });
  const handleCsv = () => toast.success('CSV export started', { description: 'Downloading simulation results as CSV.' });
  const handlePdf = () => toast.success('PDF export started', { description: 'Rendering executive report to PDF.' });

  return (
    <div className="border-t border-border bg-white/95 px-4 py-3 backdrop-blur lg:px-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className={cn('h-2 w-2 rounded-full', status === 'completed' ? 'bg-success' : status === 'running' ? 'bg-warning animate-pulse-dot' : 'bg-muted-foreground/40')} />
          {status === 'completed' ? 'Simulation ready' : status === 'running' ? 'Simulation running…' : 'Idle'}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleSave} className="gap-2 rounded-xl">
            <Save className="h-4 w-4" /> Save
          </Button>
          <Button variant="outline" size="sm" onClick={handleCompare} className="gap-2 rounded-xl">
            <GitCompareArrows className="h-4 w-4" /> Compare
          </Button>
          <Button variant="outline" size="sm" onClick={handleCsv} className="gap-2 rounded-xl">
            <FileDown className="h-4 w-4" /> CSV
          </Button>
          <Button variant="outline" size="sm" onClick={handlePdf} className="gap-2 rounded-xl">
            <FileText className="h-4 w-4" /> PDF
          </Button>
          <Button size="sm" disabled={disabled} onClick={runSimulation} className={cn('gap-2 rounded-xl', disabled && 'opacity-70')}>
            {simulationRunning ? (
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                className="inline-block h-4 w-4 rounded-full border-2 border-white/40 border-t-white"
              />
            ) : (
              <Play className="h-4 w-4" />
            )}
            {simulationRunning ? 'Running…' : 'Generate Simulation'}
          </Button>
        </div>
      </div>
    </div>
  );
}
