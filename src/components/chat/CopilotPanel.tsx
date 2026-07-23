import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { AI_MODELS, modelTagline } from '@/services/aiService';
import type { AIModel } from '@/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { WelcomeCard } from './WelcomeCard';
import { ChatMessageBubble } from './ChatMessageBubble';
import { ChatInput } from './ChatInput';

export function CopilotPanel() {
  const messages = useAppStore((s) => s.messages);
  const model = useAppStore((s) => s.model);
  const setModel = useAppStore((s) => s.setModel);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const hasConversation = messages.length > 1;

  return (
    <div className="flex h-full flex-col bg-background">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border bg-white px-4 py-3">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-blue-600 text-white shadow-glow">
              <Bot className="h-[18px] w-[18px]" />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-success ring-2 ring-white" />
          </div>
          <div>
            <p className="text-sm font-bold text-foreground">Boardroom AI</p>
            <p className="flex items-center gap-1 text-[11px] text-success">
              <span className="h-1.5 w-1.5 rounded-full bg-success" /> Online
            </p>
          </div>
        </div>

        <Select value={model} onValueChange={(v) => setModel(v as AIModel)}>
          <SelectTrigger className="h-9 w-[130px] gap-1 rounded-xl border-border bg-muted/40 text-xs font-medium">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            {AI_MODELS.map((m) => (
              <SelectItem key={m} value={m} className="rounded-lg">
                <div className="flex flex-col">
                  <span className="text-[13px] font-semibold">{m}</span>
                  <span className="text-[10px] text-muted-foreground">{modelTagline(m)}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Scrollable body */}
      <div ref={scrollRef} className="min-h-0 flex-1 overflow-y-auto scrollbar-thin">
        {!hasConversation ? (
          <WelcomeCard />
        ) : (
          <div className="flex flex-col gap-4 px-4 py-4">
            <AnimatePresence initial={false}>
              {messages.map((m) => (
                <ChatMessageBubble key={m.id} message={m} />
              ))}
            </AnimatePresence>
            <div className="h-2" />
          </div>
        )}
      </div>

      <ChatInput />
    </div>
  );
}
