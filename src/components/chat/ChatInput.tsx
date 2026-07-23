import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { Paperclip, Mic, Send, Sparkles } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { cn } from '@/lib/utils';

export function ChatInput() {
  const [value, setValue] = useState('');
  const sendPrompt = useAppStore((s) => s.sendPrompt);
  const loading = useAppStore((s) => s.loading);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
  }, [value]);

  const submit = () => {
    if (!value.trim() || loading) return;
    sendPrompt(value);
    setValue('');
  };

  const onKey = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  return (
    <div className="border-t border-border bg-white px-4 py-3">
      <div
        className={cn(
          'flex items-end gap-2 rounded-2xl border bg-muted/30 p-2 transition',
          'focus-within:border-primary/50 focus-within:bg-white focus-within:ring-4 focus-within:ring-primary/10',
          'border-border'
        )}
      >
        <button className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-muted-foreground transition hover:bg-muted hover:text-foreground">
          <Paperclip className="h-[18px] w-[18px]" />
        </button>
        <textarea
          ref={textareaRef}
          rows={1}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKey}
          placeholder="Ask about your simulation…"
          className="max-h-[120px] flex-1 resize-none bg-transparent py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none scrollbar-thin"
        />
        <button className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-muted-foreground transition hover:bg-muted hover:text-foreground">
          <Mic className="h-[18px] w-[18px]" />
        </button>
        <button
          onClick={submit}
          disabled={!value.trim() || loading}
          className={cn(
            'flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition',
            value.trim() && !loading ? 'bg-primary text-white shadow-glow hover:bg-primary/90' : 'bg-muted text-muted-foreground cursor-not-allowed'
          )}
        >
          {loading ? <Sparkles className="h-[18px] w-[18px] animate-pulse" /> : <Send className="h-[18px] w-[18px]" />}
        </button>
      </div>
      <p className="mt-1.5 text-center text-[10px] text-muted-foreground">
        AI analysis is illustrative. Verify figures before client delivery.
      </p>
    </div>
  );
}
