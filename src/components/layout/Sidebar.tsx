import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Repeat,
  Globe,
  Store,
  Building2,
  Users,
  Lightbulb,
  TrendingDown,
  BarChart3,
  FileText,
  Settings,
  LogOut,
  BrainCircuit,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  key: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  path: string;
}

const NAV_ITEMS: NavItem[] = [
  { key: 'overview', label: 'Overview', icon: LayoutDashboard, path: '/' },
  { key: 'replay', label: 'Simulation Replay', icon: Repeat, path: '/replay' },
  { key: 'world', label: 'World News', icon: Globe, path: '/world' },
  { key: 'marketplace', label: 'Marketplace', icon: Store, path: '/marketplace' },
  { key: 'banks', label: 'Banks', icon: Building2, path: '/banks' },
  { key: 'consumers', label: 'Consumers', icon: Users, path: '/consumers' },
  { key: 'recommendations', label: 'Recommendations', icon: Lightbulb, path: '/recommendations' },
  { key: 'losses', label: 'Loss Analysis', icon: TrendingDown, path: '/losses' },
  { key: 'analytics', label: 'Analytics', icon: BarChart3, path: '/analytics' },
  { key: 'reports', label: 'Reports', icon: FileText, path: '/reports' },
  { key: 'settings', label: 'Settings', icon: Settings, path: '/settings' },
];

export function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <aside className="flex h-full w-[80px] shrink-0 flex-col items-center justify-between border-r border-border bg-sidebar py-4">
      <div className="flex flex-col items-center gap-1">
        <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-orange-600 text-white shadow-glow ring-1 ring-white/10">
          <BrainCircuit className="h-5 w-5" />
        </div>
        <nav className="flex flex-col items-center gap-1.5">
          {NAV_ITEMS.map((item) => {
            const active = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <div
                key={item.key}
                className="relative"
                onMouseEnter={() => setHovered(item.key)}
                onMouseLeave={() => setHovered(null)}
              >
                <button
                  onClick={() => navigate(item.path)}
                  className={cn(
                    'group flex h-11 w-11 items-center justify-center rounded-xl transition-all duration-200',
                    active
                      ? 'bg-gradient-to-br from-primary/90 to-orange-600/90 text-white shadow-glow'
                      : 'text-sidebar-foreground hover:bg-white/5 hover:text-white'
                  )}
                >
                  <Icon className="h-[19px] w-[19px]" />
                  {active && (
                    <motion.span
                      layoutId="sidebar-active"
                      className="absolute -left-4 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-primary"
                    />
                  )}
                </button>
                <AnimatePresence>
                  {hovered === item.key && (
                    <motion.div
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -6 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-[52px] top-1/2 z-50 -translate-y-1/2 whitespace-nowrap rounded-lg bg-popover px-2.5 py-1.5 text-xs font-medium text-popover-foreground shadow-soft-md ring-1 ring-border"
                    >
                      {item.label}
                      <span className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 border-4 border-transparent border-r-popover" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>
      </div>

      <div
        className="relative"
        onMouseEnter={() => setHovered('logout')}
        onMouseLeave={() => setHovered(null)}
      >
        <button className="flex h-11 w-11 items-center justify-center rounded-xl text-sidebar-foreground transition-all hover:bg-danger/15 hover:text-danger">
          <LogOut className="h-[19px] w-[19px]" />
        </button>
        <AnimatePresence>
          {hovered === 'logout' && (
            <motion.div
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -6 }}
              transition={{ duration: 0.15 }}
              className="absolute left-[52px] top-1/2 z-50 -translate-y-1/2 whitespace-nowrap rounded-lg bg-popover px-2.5 py-1.5 text-xs font-medium text-popover-foreground shadow-soft-md ring-1 ring-border"
            >
              Logout
              <span className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 border-4 border-transparent border-r-popover" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </aside>
  );
}
