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
            <Route path="/replay" element={<SimulationBuilder />} />
            <Route path="/world" element={<ComingSoon title="World News" description="Latest world events, economic news, interest rates, inflation, and public sentiment affecting the lending marketplace." />} />
            <Route path="/marketplace" element={<ComingSoon title="Marketplace Intelligence" description="Top ranked banks, marketplace trends, visibility changes, and ranking recommendations." />} />
            <Route path="/banks" element={<ComingSoon title="Bank Intelligence" description="Each bank's offers, interest rates, loan products, marketing campaigns, and competitor comparison." />} />
            <Route path="/consumers" element={<ComingSoon title="Consumer Intelligence" description="Customer journeys, funnel stages, selected banks, approval status, and loan details." />} />
            <Route path="/recommendations" element={<ComingSoon title="AI Recommendations" description="Priority-ranked recommendations with impact, complexity, and implementation status." />} />
            <Route path="/losses" element={<ComingSoon title="Loss Analysis" description="Why customers were lost — competitor rates, SCHUFA rejections, approval delays, UX, and documentation." />} />
            <Route path="/analytics" element={<ComingSoon title="Analytics" description="Deep-dive analytics across the entire simulation." />} />
            <Route path="/reports" element={<ComingSoon title="Reports" description="Download CSV, PDF, and PowerPoint executive summaries." />} />
            <Route path="/settings" element={<ComingSoon title="Settings" />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster position="bottom-right" theme="dark" richColors closeButton />
    </QueryClientProvider>
  );
}
