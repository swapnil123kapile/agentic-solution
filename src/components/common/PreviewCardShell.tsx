import { motion, AnimatePresence } from 'framer-motion';
import { Pencil, RefreshCw, ChevronsUpDown } from 'lucide-react';
import type { PitchBookSectionKey } from '@/types';
import { useAppStore } from '@/store/useAppStore';
import { Card } from '@/components/ui/card';
import { SectionBadge, CardAction, ChevronToggle } from './CardPrimitives';
import { cn } from '@/lib/utils';

interface PreviewCardShellProps {
  sectionKey: PitchBookSectionKey;
  number: number;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  generated: boolean;
  defaultOpen?: boolean;
  onEdit?: () => void;
  children: React.ReactNode;
}

export function PreviewCardShell({
  sectionKey,
  number,
  title,
  icon: Icon,
  generated,
  defaultOpen = true,
  onEdit,
  children,
}: PreviewCardShellProps) {
  const collapsed = useAppStore((s) => s.collapseState[sectionKey]);
  const toggleCollapse = useAppStore((s) => s.toggleCollapse);
  const regenerateSection = useAppStore((s) => s.regenerateSection);
  const currentSection = useAppStore((s) => s.currentSection);
  const open = defaultOpen && !collapsed;
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
        {/* Header — clickable to collapse */}
        <button
          onClick={() => toggleCollapse(sectionKey)}
          className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left transition hover:bg-muted/40 lg:px-5"
        >
          <div className="flex min-w-0 items-center gap-3">
            <SectionBadge number={number} />
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/5 text-primary">
              <Icon className="h-[18px] w-[18px]" />
            </div>
            <div className="min-w-0">
              <h3 className="truncate text-sm font-semibold text-foreground">{title}</h3>
              <p className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                {generated ? (
                  <>
                    <span className="h-1.5 w-1.5 rounded-full bg-success" />
                    AI-generated
                  </>
                ) : (
                  <>
                    <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40" />
                    Pending
                  </>
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <CardAction icon={Pencil} label="Edit" variant="accent" onClick={onEdit} />
            <CardAction
              icon={RefreshCw}
              label="Regenerate"
              variant="accent"
              onClick={() => regenerateSection(sectionKey)}
            />
            <CardAction icon={ChevronsUpDown} label="Expand / Collapse" onClick={() => toggleCollapse(sectionKey)} />
            <span className="ml-1 hidden sm:block">
              <ChevronToggle open={open} />
            </span>
          </div>
        </button>

        <AnimatePresence initial={false}>
          {open && (
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
