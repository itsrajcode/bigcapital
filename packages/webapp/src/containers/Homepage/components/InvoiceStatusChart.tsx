import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, TooltipProps } from 'recharts';

interface InvoiceStatusChartProps {
  data: Array<{ name: string; value: number; color: string }>;
}

// Define the tooltip item type
interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: {
      name: string;
      value: number;
      color: string;
    }
  }>;
}

// Custom tooltip component to show data when hovering
const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="custom-tooltip">
        <p className="tooltip-label">{`${data.name}: ${data.value}`}</p>
      </div>
    );
  }
  return null;
};

// Interface for the Pie chart label props
interface PieLabelProps {
  cx?: number;
  cy?: number;
  midAngle?: number;
  innerRadius?: number;
  outerRadius?: number;
  percent?: number;
  index?: number;
  name?: string;
  value?: number;
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
        nameKey="name"
        label={(props: PieLabelProps) => props.value ? `${props.value}` : ''}
        labelLine={false}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Pie>
      <Tooltip content={<CustomTooltip />} />
    </PieChart>
  </ResponsiveContainer>
); 