import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PanelRightClose, PanelRightOpen, Sparkles } from 'lucide-react';
import { PitchBookPreview } from '@/components/preview/PitchBookPreview';
import { PreviewFooter } from '@/components/preview/PreviewFooter';
import { CopilotPanel } from '@/components/chat/CopilotPanel';
import { useAppStore } from '@/store/useAppStore';

export function PitchBookBuilder() {
  const sendPrompt = useAppStore((s) => s.sendPrompt);
  const loading = useAppStore((s) => s.loading);
  const [copilotOpen, setCopilotOpen] = useState(true);

  const handleGenerate = () => sendPrompt('Generate Full PitchBook');

  return (
    <div className="flex h-full min-h-0 w-full">
      {/* LEFT — 70% preview */}
      <div className="flex min-h-0 flex-1 flex-col" style={{ flexBasis: '70%' }}>
        <div className="min-h-0 flex-1 overflow-hidden">
          <PitchBookPreview />
        </div>
        <PreviewFooter />
      </div>

      {/* Divider */}
      <div className="hidden w-px shrink-0 bg-border lg:block" />

      {/* RIGHT — 30% copilot */}
      <AnimatePresence initial={false}>
        {copilotOpen && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: '30%', opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="hidden min-h-0 shrink-0 overflow-hidden border-l-0 lg:block"
            style={{ flexBasis: '30%' }}
          >
            <CopilotPanel />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button for copilot panel (desktop) */}
      <button
        onClick={() => setCopilotOpen((v) => !v)}
        className="fixed right-0 top-1/2 z-30 hidden -translate-y-1/2 items-center gap-1 rounded-l-xl border border-r-0 border-border bg-white px-2 py-3 text-muted-foreground shadow-soft-md transition hover:text-primary lg:flex"
        title={copilotOpen ? 'Hide Copilot' : 'Show Copilot'}
      >
        {copilotOpen ? <PanelRightClose className="h-4 w-4" /> : <PanelRightOpen className="h-4 w-4" />}
      </button>

      {/* Mobile floating generate button */}
      <button
        onClick={handleGenerate}
        disabled={loading}
        className="fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-glow transition hover:bg-primary/90 lg:hidden"
        title="Generate PitchBook"
      >
        {loading ? (
          <motion.span
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
            className="inline-block h-5 w-5 rounded-full border-2 border-white/40 border-t-white"
          />
        ) : (
          <Sparkles className="h-5 w-5" />
        )}
      </button>
    </div>
  );
}
