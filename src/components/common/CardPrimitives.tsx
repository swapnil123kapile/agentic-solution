import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SectionBadgeProps {
  number: number;
  className?: string;
}

export function SectionBadge({ number, className }: SectionBadgeProps) {
  return (
    <span
      className={cn(
        'flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-xs font-bold text-primary ring-1 ring-primary/20',
        className
      )}
    >
      {number}
    </span>
  );
}

interface CardActionProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  onClick?: (e: React.MouseEvent) => void;
  variant?: 'default' | 'accent' | 'danger';
  disabled?: boolean;
}

export function CardAction({ icon: Icon, label, onClick, variant = 'default', disabled }: CardActionProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.94 }}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.(e);
      }}
      disabled={disabled}
      aria-label={label}
      title={label}
      className={cn(
        'flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-all',
        'hover:bg-black/5 hover:text-foreground',
        variant === 'accent' && 'hover:bg-primary/10 hover:text-primary',
        variant === 'danger' && 'hover:bg-danger/10 hover:text-danger',
        disabled && 'cursor-not-allowed opacity-40 hover:bg-transparent hover:text-muted-foreground'
      )}
    >
      <Icon className="h-4 w-4" />
    </motion.button>
  );
}

interface EmptyStateProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  hint?: string;
}

export function EmptyState({ icon: Icon, label, hint }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 px-6 py-10 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
        <Icon className="h-6 w-6" />
      </div>
      <p className="text-sm font-medium text-muted-foreground">{label}</p>
      {hint && <p className="max-w-xs text-xs text-muted-foreground/80">{hint}</p>}
    </div>
  );
}
