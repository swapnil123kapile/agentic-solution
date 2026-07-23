import { motion } from 'framer-motion';
import { Construction } from 'lucide-react';

interface ComingSoonProps {
  title: string;
  description?: string;
}

export function ComingSoon({ title, description }: ComingSoonProps) {
  return (
    <div className="flex h-full items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md rounded-2xl border border-border bg-white p-8 text-center shadow-soft"
      >
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Construction className="h-7 w-7" />
        </div>
        <h1 className="text-lg font-bold text-foreground">{title}</h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          {description ?? 'This workspace is under construction. The PitchBook Builder is where the action is.'}
        </p>
      </motion.div>
    </div>
  );
}
