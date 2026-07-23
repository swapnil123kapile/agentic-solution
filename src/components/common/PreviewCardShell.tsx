import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, ChevronsUpDown } from 'lucide-react';
import type { SimulationSectionKey } from '@/types';
import { useAppStore } from '@/store/useAppStore';
import { Card } from '@/components/ui/card';
import { SectionBadge, CardAction, ChevronToggle } from './CardPrimitives';
import { cn } from '@/lib/utils';

interface PreviewCardShellProps {
  sectionKey: SimulationSectionKey;
  number: number;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  defaultOpen?: boolean;
  onRefresh?: () => void;
  children: React.ReactNode;
}

export function PreviewCardShell({
  sectionKey,
  number,
  title,
  icon: Icon,
  defaultOpen = true,
  onRefresh,
  children,
}: PreviewCardShellProps) {
  const currentSection = useAppStore((s) => s.currentSection);
  const isFresh = currentSection === sectionKey;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <Card
        className={cn(
          'overflow-hidden border transition-shadow',
          isFresh ? 'border-primary/40 shadow-glow' : 'border-border shadow-soft hover:shadow-soft-md'
        )}
      >
        {/* Header — clickable to collapse via the chevron area; actions are separate */}
        <div className="flex w-full items-center justify-between gap-3 px-4 py-3.5 lg:px-5">
          <div className="flex min-w-0 items-center gap-3">
            <SectionBadge number={number} />
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/5 text-primary">
              <Icon className="h-[18px] w-[18px]" />
            </div>
            <div className="min-w-0">
              <h3 className="truncate text-sm font-semibold text-foreground">{title}</h3>
              {isFresh && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-1.5 text-[11px] font-medium text-primary"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-dot" />
                  Updated by AI
                </motion.p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1">
            {onRefresh && (
              <CardAction icon={RefreshCw} label="Refresh from backend" variant="accent" onClick={onRefresh} />
            )}
            <CardAction icon={ChevronsUpDown} label="Expand / Collapse" onClick={undefined} />
            <motion.button
              whileTap={{ scale: 0.94 }}
              className="ml-1 hidden text-muted-foreground sm:block"
            >
              <ChevronToggle open={defaultOpen} />
            </motion.button>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {defaultOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="border-t border-border px-4 py-4 lg:px-5">{children}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
}
