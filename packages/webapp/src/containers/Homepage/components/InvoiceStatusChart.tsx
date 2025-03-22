import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface InvoiceStatusChartProps {
  data: Array<{ name: string; value: number; color: string }>;
}

export const InvoiceStatusChart = ({ data }: InvoiceStatusChartProps) => (
  <ResponsiveContainer width="100%" height={300}>
    <PieChart>
      <Pie
        data={data}
        innerRadius={60}
        outerRadius={120}
        paddingAngle={2}
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Pie>
    </PieChart>
  </ResponsiveContainer>
); 