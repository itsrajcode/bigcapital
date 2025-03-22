import React from 'react';
import { ComposedChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface IncomeExpenseChartProps {
  data: Array<{ month: string; income: number; expense: number }>;
}

export const IncomeExpenseChart = ({ data }: IncomeExpenseChartProps) => (
  <ResponsiveContainer width="100%" height={300}>
    <ComposedChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
      <defs>
        <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#00CB65" stopOpacity={0.4}/>
          <stop offset="95%" stopColor="#00CB65" stopOpacity={0.1}/>
        </linearGradient>
        <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#1248BA" stopOpacity={0.4}/>
          <stop offset="95%" stopColor="#1248BA" stopOpacity={0.1}/>
        </linearGradient>
      </defs>
      <XAxis 
        dataKey="month" 
        axisLine={false}
        tickLine={false}
        tick={{ fill: '#1E1D2B' }}
      />
      <YAxis 
        axisLine={false}
        tickLine={false}
        tick={{ fill: '#1E1D2B' }}
        tickFormatter={(value) => `₹${value.toLocaleString()}`}
      />
      <Tooltip
        cursor={false}
        content={({ active, payload }) => {
          if (active && payload && payload.length) {
            return (
              <div className="bg-white p-3 shadow-lg rounded-lg border border-gray-100">
                <p className="text-sm text-gray-600">₹{payload[0].value?.toLocaleString()}</p>
              </div>
            );
          }
          return null;
        }}
      />
      <Area
        type="monotone"
        dataKey="income"
        stroke="#00CB65"
        strokeWidth={2}
        fill="url(#incomeGradient)"
        dot={false}
        activeDot={{
          r: 6,
          fill: "#fff",
          stroke: "#00CB65",
          strokeWidth: 2
        }}
      />
      <Area
        type="monotone"
        dataKey="expense"
        stroke="#1248BA"
        strokeWidth={2}
        fill="url(#expenseGradient)"
        dot={false}
        activeDot={{
          r: 6,
          fill: "#fff",
          stroke: "#1248BA",
          strokeWidth: 2
        }}
      />
    </ComposedChart>
  </ResponsiveContainer>
); 