import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface BankPerformanceDatum {
  bank: string;
  winRate: number;
  offers: number;
  approvalRate: number;
}

interface BankPerformanceChartProps {
  data: BankPerformanceDatum[];
}

export function BankPerformanceChart({ data }: BankPerformanceChartProps) {
  return (
    <div className="h-[260px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 12, left: -8, bottom: 0 }} barGap={4}>
          <defs>
            <linearGradient id="winRateGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2563EB" stopOpacity={0.95} />
              <stop offset="100%" stopColor="#60A5FA" stopOpacity={0.7} />
            </linearGradient>
            <linearGradient id="approvalGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10B981" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#34D399" stopOpacity={0.6} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
          <XAxis
            dataKey="bank"
            tick={{ fontSize: 11, fill: '#64748B' }}
            axisLine={false}
            tickLine={false}
            interval={0}
            angle={-12}
            textAnchor="end"
            height={50}
          />
          <YAxis tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} unit="%" />
          <Tooltip
            cursor={{ fill: '#2563EB10' }}
            contentStyle={{
              borderRadius: 12,
              border: '1px solid #E2E8F0',
              boxShadow: '0 8px 24px -8px rgba(15,23,42,0.12)',
              fontSize: 12,
            }}
            formatter={(v: number, n: string) => [
              n === 'winRate' ? `${v}%` : v.toLocaleString(),
              n === 'winRate' ? 'Win Rate' : n === 'offers' ? 'Offers' : 'Approval Rate',
            ]}
          />
          <Bar dataKey="winRate" fill="url(#winRateGrad)" radius={[5, 5, 0, 0]} maxBarSize={26} />
          <Bar dataKey="approvalRate" fill="url(#approvalGrad)" radius={[5, 5, 0, 0]} maxBarSize={26} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
