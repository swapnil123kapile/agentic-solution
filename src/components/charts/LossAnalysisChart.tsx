import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface LossDatum {
  reason: string;
  value: number;
  color: string;
}

interface LossAnalysisChartProps {
  data: LossDatum[];
  total: number;
}

export function LossAnalysisChart({ data, total }: LossAnalysisChartProps) {
  return (
    <div className="h-[240px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="reason"
            cx="50%"
            cy="50%"
            innerRadius={54}
            outerRadius={86}
            paddingAngle={2}
            stroke="none"
          >
            {data.map((d, i) => (
              <Cell key={i} fill={d.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              borderRadius: 12,
              border: '1px solid #E2E8F0',
              boxShadow: '0 8px 24px -8px rgba(15,23,42,0.12)',
              fontSize: 12,
            }}
            formatter={(v: number, n: string) => [`${v} (${((v / total) * 100).toFixed(1)}%)`, n]}
          />
          <Legend
            verticalAlign="bottom"
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ fontSize: 11, color: '#64748B', paddingTop: 8 }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
