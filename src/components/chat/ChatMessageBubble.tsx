import { memo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { motion } from 'framer-motion';
import { Sparkles, User } from 'lucide-react';
import type { ChatMessage } from '@/types';
import { cn } from '@/lib/utils';

interface ChatMessageBubbleProps {
  message: ChatMessage;
}

function ChatMessageBubbleBase({ message }: ChatMessageBubbleProps) {
  const isUser = message.role === 'user';

  if (isUser) {
    return (
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex items-start justify-end gap-2.5">
        <div className="max-w-[80%] rounded-2xl rounded-tr-md bg-gradient-to-br from-primary to-orange-600 px-3.5 py-2.5 text-sm leading-relaxed text-white shadow-glow">
          {message.content}
        </div>
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/20">
          <User className="h-4 w-4" />
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex items-start gap-2.5">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-orange-600 text-white shadow-glow">
        <Sparkles className="h-4 w-4" />
      </div>
      <div className="max-w-[88%] min-w-0">
        <div className={cn('rounded-2xl rounded-tl-md border bg-card/60 px-3.5 py-2.5 shadow-soft', message.streaming && 'border-primary/30')}>
          {message.content ? (
            <div className="prose-chat">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.content}</ReactMarkdown>
              {message.streaming && <span className="ml-0.5 inline-block h-3.5 w-1.5 translate-y-0.5 animate-pulse bg-primary" />}
            </div>
          ) : (
            <StreamingDots />
          )}
        </div>
      </div>
    </motion.div>
  );
}

function StreamingDots() {
  return (
    <div className="flex items-center gap-1 py-1">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-primary"
          animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
          transition={{ repeat: Infinity, duration: 1, delay: i * 0.18, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

export const ChatMessageBubble = memo(ChatMessageBubbleBase);
