import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const AXIS_COLOR = '#94A3B8';

export function LossAnalysisChart({ data, total }: { data: { reason: string; value: number; color: string }[]; total: number }) {
  return (
    <div className="h-[240px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="reason" cx="50%" cy="50%" innerRadius={54} outerRadius={86} paddingAngle={2} stroke="none">
            {data.map((d, i) => <Cell key={i} fill={d.color} />)}
          </Pie>
          <Tooltip
            contentStyle={{ borderRadius: 12, border: '1px solid rgba(148,163,184,0.15)', background: 'hsl(222 44% 10% / 0.95)', backdropFilter: 'blur(8px)', fontSize: 12, color: '#E2E8F0' }}
            formatter={(v: number, n: string) => [`${v} (${((v / total) * 100).toFixed(1)}%)`, n]}
          />
          <Legend verticalAlign="bottom" iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11, color: AXIS_COLOR, paddingTop: 8 }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
