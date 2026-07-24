import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopNav } from './TopNav';

interface AppLayoutProps {
  onGenerate?: () => void;
}

export function AppLayout({ onGenerate }: AppLayoutProps) {
  return (
    <div className="relative flex h-screen w-full overflow-hidden bg-background bg-vignette">
      {/* Ambient background layer */}
      <div className="bg-ambient">
        <div className="bg-orb bg-orb-primary" />
        <div className="bg-orb bg-orb-secondary" />
        <div className="bg-orb bg-orb-accent" />
      </div>

      <div className="relative z-10 flex h-full w-full min-w-0">
        <Sidebar />
        <div className="flex h-full min-w-0 flex-1 flex-col">
          <TopNav onGenerate={onGenerate} />
          <main className="min-h-0 flex-1 overflow-hidden">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
