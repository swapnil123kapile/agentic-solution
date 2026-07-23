import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { AppLayout } from '@/components/layout/AppLayout';
import { PitchBookBuilder } from '@/pages/PitchBookBuilder';
import { ComingSoon } from '@/pages/ComingSoon';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false, staleTime: 60_000 },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<PitchBookBuilder />} />
            <Route path="/pitchbooks" element={<ComingSoon title="My PitchBooks" description="Your saved and in-progress pitchbooks will live here." />} />
            <Route path="/clients" element={<ComingSoon title="Clients" description="Manage your advisory client roster." />} />
            <Route path="/industries" element={<ComingSoon title="Industries" description="Industry templates and benchmarks." />} />
            <Route path="/library" element={<ComingSoon title="Content Library" description="Reusable content blocks and slides." />} />
            <Route path="/market-data" element={<ComingSoon title="Market Data" description="Live market data feeds for your pitchbooks." />} />
            <Route path="/analytics" element={<ComingSoon title="Analytics" />} />
            <Route path="/reports" element={<ComingSoon title="Reports" />} />
            <Route path="/settings" element={<ComingSoon title="Settings" />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster position="bottom-right" richColors closeButton />
    </QueryClientProvider>
  );
}
