import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const AXIS_COLOR = '#94A3B8';
const GRID_COLOR = 'rgba(148, 163, 184, 0.12)';

export function ProgressChart({ data }: { data: { timestep: number; label: string; dbWins: number; competitorWins: number; dropOffs: number; activeConsumers?: number }[] }) {
  return (
    <div className="h-[220px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 12, left: -8, bottom: 0 }}>
          <defs>
            <linearGradient id="dbWinsGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F97316" stopOpacity={0.35} />
              <stop offset="100%" stopColor="#F97316" stopOpacity={0.02} />
            </linearGradient>
            <linearGradient id="compWinsGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22D3EE" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#22D3EE" stopOpacity={0.02} />
            </linearGradient>
            <linearGradient id="dropGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#EF4444" stopOpacity={0.28} />
              <stop offset="100%" stopColor="#EF4444" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={GRID_COLOR} vertical={false} />
          <XAxis dataKey="label" tick={{ fontSize: 11, fill: AXIS_COLOR }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: AXIS_COLOR }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{ borderRadius: 12, border: '1px solid hsl(214 20% 88%)', background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(8px)', fontSize: 12, color: '#1E293B', boxShadow: '0 4px 16px -4px rgba(0,0,0,0.12)' }}
            formatter={(v: number, n: string) => [v.toLocaleString(), n === 'dbWins' ? 'DB Wins' : n === 'competitorWins' ? 'Competitor Wins' : 'Drop-offs']}
          />
          <Legend verticalAlign="top" iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11, color: AXIS_COLOR, paddingBottom: 8 }} />
          <Area type="monotone" dataKey="dbWins" name="DB Wins" stroke="#F97316" strokeWidth={2} fill="url(#dbWinsGrad)" />
          <Area type="monotone" dataKey="competitorWins" name="Competitor Wins" stroke="#22D3EE" strokeWidth={2} fill="url(#compWinsGrad)" />
          <Area type="monotone" dataKey="dropOffs" name="Drop-offs" stroke="#EF4444" strokeWidth={2} fill="url(#dropGrad)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
