import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

interface ProgressDatum {
  timestep: number;
  label: string;
  dbWins: number;
  competitorWins: number;
  dropOffs: number;
}

interface ProgressChartProps {
  data: ProgressDatum[];
}

export function ProgressChart({ data }: ProgressChartProps) {
  return (
    <div className="h-[220px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 12, left: -8, bottom: 0 }}>
          <defs>
            <linearGradient id="dbWinsGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2563EB" stopOpacity={0.35} />
              <stop offset="100%" stopColor="#2563EB" stopOpacity={0.02} />
            </linearGradient>
            <linearGradient id="compWinsGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#94A3B8" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#94A3B8" stopOpacity={0.02} />
            </linearGradient>
            <linearGradient id="dropGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#EF4444" stopOpacity={0.28} />
              <stop offset="100%" stopColor="#EF4444" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
          <XAxis dataKey="label" tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{
              borderRadius: 12,
              border: '1px solid #E2E8F0',
              boxShadow: '0 8px 24px -8px rgba(15,23,42,0.12)',
              fontSize: 12,
            }}
            formatter={(v: number, n: string) => [v.toLocaleString(), n === 'dbWins' ? 'DB Wins' : n === 'competitorWins' ? 'Competitor Wins' : 'Drop-offs']}
          />
          <Legend
            verticalAlign="top"
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ fontSize: 11, color: '#64748B', paddingBottom: 8 }}
          />
          <Area type="monotone" dataKey="dbWins" name="DB Wins" stroke="#2563EB" strokeWidth={2} fill="url(#dbWinsGrad)" />
          <Area type="monotone" dataKey="competitorWins" name="Competitor Wins" stroke="#94A3B8" strokeWidth={2} fill="url(#compWinsGrad)" />
          <Area type="monotone" dataKey="dropOffs" name="Drop-offs" stroke="#EF4444" strokeWidth={2} fill="url(#dropGrad)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
