import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { SUGGESTED_PROMPTS } from '@/services/aiService';
import { useAppStore } from '@/store/useAppStore';
import { cn } from '@/lib/utils';

const PROMPT_ICONS: Record<string, string> = {
  'Summarize Simulation': '📊',
  'Explain Customer Losses': '📉',
  'Compare Scenarios': '⚖️',
  'Improve Win Rate': '📈',
  'Suggest Improvements': '💡',
  'Analyze Funnel': '🔽',
  'Review Feedback': '💬',
  'Generate Executive Report': '📄',
};

export function WelcomeCard() {
  const sendPrompt = useAppStore((s) => s.sendPrompt);
  const loading = useAppStore((s) => s.loading);

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="px-4 pb-3 pt-4">
      <div className="rounded-2xl border border-border bg-gradient-to-br from-white to-primary/5 p-4 shadow-soft">
        <div className="mb-3 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-blue-600 text-white shadow-glow">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-bold text-foreground">Hi Swapnil</p>
            <p className="text-[12px] text-muted-foreground">I can help analyze your lending simulation.</p>
          </div>
        </div>
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Suggested prompts</p>
        <div className="grid grid-cols-1 gap-2">
          {SUGGESTED_PROMPTS.map((p) => (
            <motion.button
              key={p}
              whileHover={{ x: 2 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
              onClick={() => sendPrompt(p)}
              className={cn(
                'flex items-center gap-2.5 rounded-xl border border-border bg-white px-3 py-2 text-left text-[13px] font-medium text-foreground transition',
                'hover:border-primary/40 hover:bg-primary/5 disabled:cursor-not-allowed disabled:opacity-60'
              )}
            >
              <span className="text-base">{PROMPT_ICONS[p] ?? '💬'}</span>
              {p}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
