import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { AppLayout } from '@/components/layout/AppLayout';
import { SimulationBuilder } from '@/pages/SimulationBuilder';
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
            <Route path="/" element={<SimulationBuilder />} />
            <Route path="/simulations" element={<ComingSoon title="Simulations" description="Your saved and in-progress lending simulations." />} />
            <Route path="/compare" element={<ComingSoon title="Scenario Comparison" description="Compare baseline vs improved lending scenarios side-by-side." />} />
            <Route path="/banks" element={<ComingSoon title="Bank Personas" description="Configure and manage bank personas for your lending world." />} />
            <Route path="/consumers" element={<ComingSoon title="Consumer Personas" description="Define consumer cohorts and behavioral profiles." />} />
            <Route path="/analytics" element={<ComingSoon title="Analytics" />} />
            <Route path="/recommendations" element={<ComingSoon title="Recommendations" />} />
            <Route path="/feedback" element={<ComingSoon title="Customer Feedback" />} />
            <Route path="/settings" element={<ComingSoon title="Settings" />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster position="bottom-right" richColors closeButton />
    </QueryClientProvider>
  );
}
