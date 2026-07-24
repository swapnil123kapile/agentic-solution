import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const AXIS_COLOR = '#94A3B8';
const GRID_COLOR = 'rgba(148, 163, 184, 0.12)';

export function ComparisonChart({ data }: { data: { label: string; baseline: number; improved: number }[] }) {
  return (
    <div className="h-[280px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 12, left: -8, bottom: 0 }} barGap={6}>
          <defs>
            <linearGradient id="baselineGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#64748B" stopOpacity={0.85} />
              <stop offset="100%" stopColor="#94A3B8" stopOpacity={0.5} />
            </linearGradient>
            <linearGradient id="improvedGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F97316" stopOpacity={0.95} />
              <stop offset="100%" stopColor="#FB923C" stopOpacity={0.6} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={GRID_COLOR} vertical={false} />
          <XAxis dataKey="label" tick={{ fontSize: 11, fill: AXIS_COLOR }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: AXIS_COLOR }} axisLine={false} tickLine={false} />
          <Tooltip
            cursor={{ fill: 'rgba(249, 115, 22, 0.06)' }}
            contentStyle={{ borderRadius: 12, border: '1px solid hsl(214 20% 88%)', background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(8px)', fontSize: 12, color: '#1E293B', boxShadow: '0 4px 16px -4px rgba(0,0,0,0.12)' }}
          />
          <Legend verticalAlign="top" iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11, color: AXIS_COLOR, paddingBottom: 8 }} />
          <Bar dataKey="baseline" name="Baseline" fill="url(#baselineGrad)" radius={[5, 5, 0, 0]} maxBarSize={28} />
          <Bar dataKey="improved" name="Improved" fill="url(#improvedGrad)" radius={[5, 5, 0, 0]} maxBarSize={28} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
