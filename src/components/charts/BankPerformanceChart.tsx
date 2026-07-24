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

const AXIS_COLOR = '#64748B';
const GRID_COLOR = 'rgba(148, 163, 184, 0.12)';

export function BankPerformanceChart({ data }: { data: BankPerformanceDatum[] }) {
  return (
    <div className="h-[260px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 12, left: -8, bottom: 0 }} barGap={4}>
          <defs>
            <linearGradient id="winRateGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F97316" stopOpacity={0.95} />
              <stop offset="100%" stopColor="#FB923C" stopOpacity={0.6} />
            </linearGradient>
            <linearGradient id="approvalGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22D3EE" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#0EA5E9" stopOpacity={0.5} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={GRID_COLOR} vertical={false} />
          <XAxis dataKey="bank" tick={{ fontSize: 11, fill: AXIS_COLOR }} axisLine={false} tickLine={false} interval={0} angle={-12} textAnchor="end" height={50} />
          <YAxis tick={{ fontSize: 11, fill: AXIS_COLOR }} axisLine={false} tickLine={false} unit="%" />
          <Tooltip
            cursor={{ fill: 'rgba(249, 115, 22, 0.06)' }}
            contentStyle={{ borderRadius: 12, border: '1px solid rgba(148,163,184,0.15)', background: 'hsl(222 44% 10% / 0.95)', backdropFilter: 'blur(8px)', fontSize: 12, color: '#E2E8F0' }}
            formatter={(v: number, n: string) => [n === 'winRate' ? `${v}%` : v.toLocaleString(), n === 'winRate' ? 'Win Rate' : 'Approval Rate']}
          />
          <Bar dataKey="winRate" fill="url(#winRateGrad)" radius={[5, 5, 0, 0]} maxBarSize={26} />
          <Bar dataKey="approvalRate" fill="url(#approvalGrad)" radius={[5, 5, 0, 0]} maxBarSize={26} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
