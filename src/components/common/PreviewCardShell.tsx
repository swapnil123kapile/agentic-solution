import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw } from 'lucide-react';
import type { SimulationSectionKey } from '@/types';
import { useAppStore } from '@/store/useAppStore';
import { SectionBadge, CardAction } from './CardPrimitives';
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
  const [open, setOpenState] = useToggle(defaultOpen);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <div
        className={cn(
          'overflow-hidden rounded-2xl border transition-shadow',
          isFresh ? 'border-primary/40 shadow-glow' : 'border-border bg-card/50 shadow-soft hover:shadow-soft-md'
        )}
      >
        <div className="flex w-full items-center justify-between gap-3 px-4 py-3.5 lg:px-5">
          <div className="flex min-w-0 items-center gap-3">
            <SectionBadge number={number} />
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/15">
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
            {onRefresh && <CardAction icon={RefreshCw} label="Refresh from backend" variant="accent" onClick={onRefresh} />}
            <button
              onClick={() => setOpenState(!open)}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-white/5 hover:text-foreground"
            >
              <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none">
                  <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.span>
            </button>
          </div>
        </div>

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
      </div>
    </motion.div>
  );
}

import { useState } from 'react';
function useToggle(initial: boolean): [boolean, (v: boolean) => void] {
  const [open, setOpen] = useState(initial);
  return [open, setOpen];
}
