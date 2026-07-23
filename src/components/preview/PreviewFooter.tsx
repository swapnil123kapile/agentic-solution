import { motion } from 'framer-motion';
import { Sparkles, Save, FileText, Presentation, Share2 } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

export function PreviewFooter() {
  const loading = useAppStore((s) => s.loading);
  const setPitchbookGenerated = useAppStore((s) => s.setPitchbookGenerated);
  const pitchbookGenerated = useAppStore((s) => s.pitchbookGenerated);
  const sendPrompt = useAppStore((s) => s.sendPrompt);
  const disabled = !pitchbookGenerated;

  const handleGenerate = () => {
    sendPrompt('Generate Full PitchBook');
  };

  const handleSave = () => toast.success('Draft saved', { description: 'PitchBook draft stored to your workspace.' });
  const handlePdf = () => toast.success('PDF export started', { description: 'Your pitchbook is being rendered to PDF.' });
  const handlePpt = () => toast.success('PowerPoint export started', { description: 'Your pitchbook is being rendered to .pptx.' });
  const handleShare = () => toast.success('Share link copied', { description: 'A read-only link has been copied to your clipboard.' });

  return (
    <div className="border-t border-border bg-white/95 px-4 py-3 backdrop-blur lg:px-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className={cn('h-2 w-2 rounded-full', pitchbookGenerated ? 'bg-success' : 'bg-muted-foreground/40')} />
          {pitchbookGenerated ? 'PitchBook ready' : 'Generate to enable exports'}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" disabled={disabled} onClick={handleSave} className="gap-2 rounded-xl">
            <Save className="h-4 w-4" /> Save Draft
          </Button>
          <Button variant="outline" size="sm" disabled={disabled} onClick={handlePdf} className="gap-2 rounded-xl">
            <FileText className="h-4 w-4" /> PDF
          </Button>
          <Button variant="outline" size="sm" disabled={disabled} onClick={handlePpt} className="gap-2 rounded-xl">
            <Presentation className="h-4 w-4" /> PPT
          </Button>
          <Button variant="outline" size="sm" disabled={disabled} onClick={handleShare} className="gap-2 rounded-xl">
            <Share2 className="h-4 w-4" /> Share
          </Button>
          <Button
            size="sm"
            disabled={loading}
            onClick={handleGenerate}
            className={cn('gap-2 rounded-xl', loading && 'opacity-70')}
          >
            {loading ? (
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                className="inline-block h-4 w-4 rounded-full border-2 border-white/40 border-t-white"
              />
            ) : (
              <Sparkles className="h-4 w-4" />
            )}
            {loading ? 'Generating…' : 'Generate PitchBook'}
          </Button>
        </div>
      </div>
    </div>
  );
}
