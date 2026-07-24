import { motion } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import {
  Search,
  Bell,
  ChevronDown,
  LayoutGrid,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Clock,
  Gauge,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SCENARIOS, type ScenarioName } from '@/types';
import { cn } from '@/lib/utils';

interface TopNavProps {
  onGenerate?: () => void;
}

export function TopNav({ onGenerate }: TopNavProps) {
  const selectedScenario = useAppStore((s) => s.selectedScenario);
  const setScenario = useAppStore((s) => s.setScenario);
  const runSimulation = useAppStore((s) => s.runSimulation);
  const simulationRunning = useAppStore((s) => s.simulationRunning);
  const timestep = useAppStore((s) => s.selectedTimestep);
  const total = useAppStore((s) => s.simulation.summary.totalTimesteps);
  const status = useAppStore((s) => s.simulation.summary.status);
  const isPlaying = useAppStore((s) => s.isPlaying);
  const togglePlay = useAppStore((s) => s.togglePlay);
  const stepForward = useAppStore((s) => s.stepForward);
  const stepBackward = useAppStore((s) => s.stepBackward);

  const handleGenerate = () => {
    runSimulation();
    onGenerate?.();
  };

  const statusColor =
    status === 'running' ? 'bg-warning' : status === 'completed' ? 'bg-success' : 'bg-muted-foreground';

  return (
    <header className="flex h-[72px] shrink-0 items-center justify-between border-b border-border glass-nav px-4 lg:px-6">
      {/* Left: logo + name */}
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-orange-600 text-white shadow-glow">
          <LayoutGrid className="h-5 w-5" />
        </div>
        <div className="hidden flex-col leading-tight sm:flex">
          <span className="text-[15px] font-bold tracking-tight text-foreground">
            Boardroom <span className="gradient-text">AI</span>
          </span>
          <span className="text-[11px] font-medium text-muted-foreground">Advisory Platform</span>
        </div>
      </div>

      {/* Center: search */}
      <div className="mx-2 hidden flex-1 justify-center md:flex lg:mx-6">
        <div className="relative w-full max-w-xl">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            placeholder="Search simulations, banks, consumers, scenarios…"
            className="h-10 w-full rounded-xl border border-border bg-muted/40 pl-10 pr-16 text-sm text-foreground placeholder:text-muted-foreground outline-none transition focus:border-primary/50 focus:bg-card focus:ring-4 focus:ring-primary/10"
          />
          <kbd className="absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-md border border-border bg-card px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground lg:inline-block">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-2">
        {/* Scenario selector */}
        <Select value={selectedScenario} onValueChange={(v) => setScenario(v as ScenarioName)}>
          <SelectTrigger className="hidden h-10 w-[150px] gap-2 rounded-xl border-border bg-muted/40 text-sm font-medium lg:flex">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            {SCENARIOS.map((s) => (
              <SelectItem key={s} value={s} className="rounded-lg">
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Replay controls */}
        <div className="hidden h-10 items-center gap-1 rounded-xl border border-border bg-muted/30 px-2 xl:flex">
          <button
            onClick={stepBackward}
            disabled={timestep <= 1}
            className="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-black/5 hover:text-foreground disabled:opacity-30"
          >
            <SkipBack className="h-4 w-4" />
          </button>
          <button
            onClick={togglePlay}
            className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/15 text-primary transition hover:bg-primary/25"
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </button>
          <button
            onClick={stepForward}
            disabled={timestep >= total}
            className="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-black/5 hover:text-foreground disabled:opacity-30"
          >
            <SkipForward className="h-4 w-4" />
          </button>
          <div className="ml-1 flex items-center gap-1.5 border-l border-border pl-2">
            <Clock className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-xs font-bold text-foreground">{timestep}</span>
            <span className="text-xs text-muted-foreground">/{total}</span>
            <span className={cn('ml-1 h-2 w-2 rounded-full', statusColor, status === 'running' && 'animate-pulse-dot')} />
          </div>
        </div>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="relative flex h-10 w-10 items-center justify-center rounded-xl text-muted-foreground transition hover:bg-black/5 hover:text-foreground">
              <Bell className="h-[18px] w-[18px]" />
              <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-danger ring-2 ring-background" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-72 rounded-xl p-0">
            <DropdownMenuLabel className="px-4 py-3 text-sm font-semibold">Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {[
              { t: 'Simulation completed — Baseline', d: '2 min ago', c: 'bg-success' },
              { t: 'Price war detected at T7', d: '12 min ago', c: 'bg-warning' },
              { t: 'New marketplace ranking change', d: '1 hr ago', c: 'bg-primary' },
            ].map((n) => (
              <DropdownMenuItem key={n.t} className="flex items-start gap-3 px-4 py-3 text-sm">
                <span className={cn('mt-1.5 h-2 w-2 shrink-0 rounded-full', n.c)} />
                <div className="flex flex-col">
                  <span className="font-medium text-foreground">{n.t}</span>
                  <span className="text-xs text-muted-foreground">{n.d}</span>
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Generate */}
        <Button
          onClick={handleGenerate}
          disabled={simulationRunning}
          className={cn('hidden h-10 gap-2 rounded-xl px-4 text-sm font-semibold sm:flex', simulationRunning && 'opacity-70')}
        >
          {simulationRunning ? (
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
              className="inline-block h-4 w-4 rounded-full border-2 border-white/40 border-t-white"
            />
          ) : (
            <Gauge className="h-4 w-4" />
          )}
          {simulationRunning ? 'Running…' : 'Run Simulation'}
        </Button>

        {/* Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 rounded-xl p-1 pr-2 transition hover:bg-black/5">
              <Avatar className="h-8 w-8 ring-2 ring-primary/20">
                <AvatarFallback className="bg-primary text-xs font-bold text-white">SS</AvatarFallback>
              </Avatar>
              <ChevronDown className="hidden h-4 w-4 text-muted-foreground sm:block" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 rounded-xl">
            <div className="flex items-center gap-3 px-3 py-3">
              <Avatar className="h-10 w-10 ring-2 ring-primary/20">
                <AvatarFallback className="bg-primary text-sm font-bold text-white">SS</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-semibold">Swapnil Sable</span>
                <span className="text-xs text-muted-foreground">Advisory Lead</span>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-sm">Profile</DropdownMenuItem>
            <DropdownMenuItem className="text-sm">My Simulations</DropdownMenuItem>
            <DropdownMenuItem className="text-sm">Workspace Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-sm">Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
