import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

interface ComparisonDatum {
  label: string;
  baseline: number;
  improved: number;
}

interface ComparisonChartProps {
  data: ComparisonDatum[];
}

export function ComparisonChart({ data }: ComparisonChartProps) {
  return (
    <div className="h-[280px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 12, left: -8, bottom: 0 }} barGap={6}>
          <defs>
            <linearGradient id="baselineGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#94A3B8" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#CBD5E1" stopOpacity={0.7} />
            </linearGradient>
            <linearGradient id="improvedGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2563EB" stopOpacity={0.95} />
              <stop offset="100%" stopColor="#60A5FA" stopOpacity={0.7} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
          <XAxis dataKey="label" tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
          <Tooltip
            cursor={{ fill: '#2563EB10' }}
            contentStyle={{
              borderRadius: 12,
              border: '1px solid #E2E8F0',
              boxShadow: '0 8px 24px -8px rgba(15,23,42,0.12)',
              fontSize: 12,
            }}
          />
          <Legend
            verticalAlign="top"
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ fontSize: 11, color: '#64748B', paddingBottom: 8 }}
          />
          <Bar dataKey="baseline" name="Baseline" fill="url(#baselineGrad)" radius={[5, 5, 0, 0]} maxBarSize={28} />
          <Bar dataKey="improved" name="Improved" fill="url(#improvedGrad)" radius={[5, 5, 0, 0]} maxBarSize={28} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
