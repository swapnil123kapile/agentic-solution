import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  FolderKanban,
  Users,
  Factory,
  Library,
  LineChart,
  BarChart3,
  FileText,
  Settings,
  LogOut,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  key: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  path: string;
}

const NAV_ITEMS: NavItem[] = [
  { key: 'home', label: 'Home', icon: Home, path: '/' },
  { key: 'pitchbooks', label: 'My PitchBooks', icon: FolderKanban, path: '/pitchbooks' },
  { key: 'clients', label: 'Clients', icon: Users, path: '/clients' },
  { key: 'industries', label: 'Industries', icon: Factory, path: '/industries' },
  { key: 'library', label: 'Content Library', icon: Library, path: '/library' },
  { key: 'market', label: 'Market Data', icon: LineChart, path: '/market-data' },
  { key: 'analytics', label: 'Analytics', icon: BarChart3, path: '/analytics' },
  { key: 'reports', label: 'Reports', icon: FileText, path: '/reports' },
  { key: 'settings', label: 'Settings', icon: Settings, path: '/settings' },
];

export function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <aside className="flex h-full w-[70px] shrink-0 flex-col items-center justify-between bg-sidebar py-4 scrollbar-sidebar">
      <div className="flex flex-col items-center gap-1">
        <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/20">
          <Sparkles className="h-5 w-5" />
        </div>
        <nav className="flex flex-col items-center gap-1">
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
                    'group flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-200',
                    active
                      ? 'bg-primary text-white shadow-glow'
                      : 'text-slate-400 hover:bg-white/10 hover:text-white'
                  )}
                >
                  <Icon className="h-[18px] w-[18px]" />
                </button>
                <AnimatePresence>
                  {hovered === item.key && (
                    <motion.div
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -6 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-12 top-1/2 z-50 -translate-y-1/2 whitespace-nowrap rounded-lg bg-slate-800 px-2.5 py-1.5 text-xs font-medium text-white shadow-lg"
                    >
                      {item.label}
                      <span className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 border-4 border-transparent border-r-slate-800" />
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
        <button className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-400 transition-all hover:bg-danger/15 hover:text-danger">
          <LogOut className="h-[18px] w-[18px]" />
        </button>
        <AnimatePresence>
          {hovered === 'logout' && (
            <motion.div
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -6 }}
              transition={{ duration: 0.15 }}
              className="absolute left-12 top-1/2 z-50 -translate-y-1/2 whitespace-nowrap rounded-lg bg-slate-800 px-2.5 py-1.5 text-xs font-medium text-white shadow-lg"
            >
              Logout
              <span className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 border-4 border-transparent border-r-slate-800" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </aside>
  );
}
