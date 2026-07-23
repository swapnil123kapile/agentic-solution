import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import {
  Search,
  Bell,
  Settings,
  Sparkles,
  ChevronDown,
  Check,
  Menu,
} from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface TopNavProps {
  onGenerate?: () => void;
}

export function TopNav({ onGenerate }: TopNavProps) {
  const setPitchbookGenerated = useAppStore((s) => s.setPitchbookGenerated);
  const loading = useAppStore((s) => s.loading);
  const [search, setSearch] = useState('');

  const handleGenerate = () => {
    if (loading) return;
    setPitchbookGenerated(false);
    onGenerate?.();
  };

  return (
    <header className="flex h-[72px] shrink-0 items-center justify-between border-b border-border bg-white px-4 lg:px-6">
      {/* Left: logo + name */}
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white shadow-glow">
          <Sparkles className="h-5 w-5" />
        </div>
        <div className="hidden flex-col leading-tight sm:flex">
          <span className="text-[15px] font-bold tracking-tight text-foreground">
            PitchBook <span className="text-primary">Advisory</span>
          </span>
          <span className="text-[11px] font-medium text-muted-foreground">AI Assistant</span>
        </div>
      </div>

      {/* Center: search */}
      <div className="mx-2 hidden flex-1 justify-center md:flex lg:mx-6">
        <div className="relative w-full max-w-xl">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search clients, pitchbooks, industries…"
            className="h-10 w-full rounded-xl border border-border bg-muted/50 pl-10 pr-16 text-sm text-foreground placeholder:text-muted-foreground outline-none transition focus:border-primary/50 focus:bg-white focus:ring-4 focus:ring-primary/10"
          />
          <kbd className="absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-md border border-border bg-white px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground lg:inline-block">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right: actions */}
      <div className="flex items-center gap-2">
        <Button
          onClick={handleGenerate}
          disabled={loading}
          className={cn(
            'hidden h-10 gap-2 rounded-xl px-4 text-sm font-semibold sm:flex',
            loading && 'opacity-70'
          )}
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

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="relative flex h-10 w-10 items-center justify-center rounded-xl text-muted-foreground transition hover:bg-muted hover:text-foreground">
              <Bell className="h-[18px] w-[18px]" />
              <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-danger ring-2 ring-white" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-72 rounded-xl p-0">
            <DropdownMenuLabel className="px-4 py-3 text-sm font-semibold">
              Notifications
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {[
              { t: 'PitchBook draft saved', d: '2 min ago', c: 'bg-success' },
              { t: 'AI completed Industry Overview', d: '12 min ago', c: 'bg-primary' },
              { t: 'Client ABC National Bank updated', d: '1 hr ago', c: 'bg-warning' },
            ].map((n) => (
              <DropdownMenuItem
                key={n.t}
                className="flex items-start gap-3 px-4 py-3 text-sm"
              >
                <span className={cn('mt-1.5 h-2 w-2 shrink-0 rounded-full', n.c)} />
                <div className="flex flex-col">
                  <span className="font-medium text-foreground">{n.t}</span>
                  <span className="text-xs text-muted-foreground">{n.d}</span>
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Settings */}
        <button className="hidden h-10 w-10 items-center justify-center rounded-xl text-muted-foreground transition hover:bg-muted hover:text-foreground sm:flex">
          <Settings className="h-[18px] w-[18px]" />
        </button>

        {/* User profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 rounded-xl p-1 pr-2 transition hover:bg-muted">
              <Avatar className="h-8 w-8 ring-2 ring-primary/20">
                <AvatarFallback className="bg-primary text-xs font-bold text-white">
                  RS
                </AvatarFallback>
              </Avatar>
              <ChevronDown className="hidden h-4 w-4 text-muted-foreground sm:block" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 rounded-xl">
            <div className="flex items-center gap-3 px-3 py-3">
              <Avatar className="h-10 w-10 ring-2 ring-primary/20">
                <AvatarFallback className="bg-primary text-sm font-bold text-white">
                  RS
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-semibold">Rahul Sharma</span>
                <span className="text-xs text-muted-foreground">Senior Advisor</span>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-sm">Profile</DropdownMenuItem>
            <DropdownMenuItem className="text-sm">My Workspace</DropdownMenuItem>
            <DropdownMenuItem className="text-sm">Billing &amp; Plan</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex items-center justify-between text-sm">
              Sign out <Menu className="h-4 w-4" />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
