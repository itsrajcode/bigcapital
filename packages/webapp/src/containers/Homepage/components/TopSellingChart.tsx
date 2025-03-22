import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface TopSellingChartProps {
  data: Array<{ name: string; value: number }>;
}

export const TopSellingChart = ({ data }: TopSellingChartProps) => (
  <ResponsiveContainer width="100%" height={400}>
    <BarChart
      data={data}
      layout="horizontal"
      margin={{ top: 20, right: 30, left: 40, bottom: 50 }}
    >
      <defs>
        <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#818CF8" stopOpacity={0.3} />
          <stop offset="100%" stopColor="#818CF8" stopOpacity={0.1} />
        </linearGradient>
      </defs>
      <CartesianGrid
        strokeDasharray="3 3"
        horizontal={true}
        vertical={false}
        stroke="#E5E7EB"
      />
      <XAxis
        dataKey="name"
        type="category"
        axisLine={false}
        tickLine={false}
        interval={0}
        tick={{ fontSize: 12 }}
        angle={-45}
        textAnchor="end"
      />
      <YAxis
        axisLine={false}
        tickLine={false}
        tick={{ fontSize: 12 }}
        tickCount={5}
      />
      <Tooltip
        cursor={{ fill: 'rgba(129, 140, 248, 0.1)' }}
        contentStyle={{
          background: '#fff',
          border: '1px solid #E5E7EB',
          borderRadius: '6px',
          padding: '8px'
        }}
      />
      <Bar
        dataKey="value"
        fill="url(#barGradient)"
        radius={[5, 5, 5, 5]}
        barSize={10}
      />
    </BarChart>
  </ResponsiveContainer>
); 