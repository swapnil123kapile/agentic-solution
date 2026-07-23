import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopNav } from './TopNav';

interface AppLayoutProps {
  onGenerate?: () => void;
}

export function AppLayout({ onGenerate }: AppLayoutProps) {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <Sidebar />
      <div className="flex h-full min-w-0 flex-1 flex-col">
        <TopNav onGenerate={onGenerate} />
        <main className="min-h-0 flex-1 overflow-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
