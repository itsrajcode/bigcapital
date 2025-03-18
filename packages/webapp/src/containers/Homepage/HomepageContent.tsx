// @ts-nocheck
import React from 'react';
import AccountsReceivableSection from './AccountsReceivableSection';
import AccountsPayableSection from './AccountsPayableSection';
import FinancialAccountingSection from './FinancialAccountingSection';
import ProductsServicesSection from './ProductsServicesSection';
import '@/style/pages/HomePage/HomePage.scss';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Area, ComposedChart, BarChart, Bar, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';

function HomepageContent() {
  const incomeData = [
    { month: 'Jan', income: 120000, expense: 90000 },
    { month: 'Feb', income: 78060, expense: 95000 },
    { month: 'Mar', income: 135000, expense: 85000 },
    { month: 'Apr', income: 110000, expense: 130000 },
    { month: 'May', income: 180000, expense: 100000 },
    { month: 'Jun', income: 190000, expense: 85000 },
  ];

  // Calculate totals for the header
  const totalIncome = incomeData.reduce((sum, item) => sum + item.income, 0);
  const totalExpense = incomeData.reduce((sum, item) => sum + item.expense, 0);

  const topSellingData = [
    { name: 'Macbook Pro', value: 400 },
    { name: 'Earcots', value: 370 },
    { name: 'Powerbank', value: 340 },
    { name: 'iPhone 15pro', value: 300 },
    { name: 'Glass Bottle', value: 290 },
    { name: 'Samsung Flip', value: 246 },
    { name: 'Books', value: 230 },
    { name: 'Oraie Speaker', value: 210 },
    { name: 'Sugar', value: 200 },
    { name: 'Dell LED', value: 150 },
  ];

  const invoiceStatusData = [
    { name: 'Unpaid', value: 13, color: '#1248BA' },
    { name: 'Paid', value: 9, color: '#00CB65' },
    { name: 'Draft', value: 4, color: '#7B61FF' },
    { name: 'Returned', value: 1, color: '#E1E1E1' }
  ];

  return (
    <div className="homepage__analytics">
      <div className="analytics__overview">
        <div className="overview__header">
          <h2 className="overview__title">Income and Expense Overview</h2>
          <button className="overview__period-selector">
            Last 6 Months
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <div className="overview__stats">
          <div className="stats__income">
            <div className="stats__icon">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 3V11M7 3L4 6M7 3L10 6" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <span>Income: INR {totalIncome.toLocaleString()}</span>
          </div>
          <div className="stats__expense">
            <div className="stats__icon">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 11V3M7 11L4 8M7 11L10 8" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <span>Expense: INR {totalExpense.toLocaleString()}</span>
          </div>
        </div>

        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <ComposedChart data={incomeData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
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
                        <p className="text-sm text-gray-600">₹{payload[0].value.toLocaleString()}</p>
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
        </div>

        <div style={{ width: '100%', height: 400, marginTop: '2rem' }}>
          <ResponsiveContainer>
            <BarChart
              data={topSellingData}
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
        </div>
      </div>

      <div className="analytics__invoices">
        <h2 className="invoices__title">Invoices By Status</h2>
        <div className="invoices__chart-container">
          <div className="chart__wrapper">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={invoiceStatusData}
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {invoiceStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="chart__legend">
            {invoiceStatusData.map((entry, index) => (
              <div key={index} className="legend__item">
                <span className="legend__marker" style={{ backgroundColor: entry.color }} />
                <span className="legend__label">{entry.name}</span>
                <span className="legend__value">{entry.value.toString().padStart(2, '0')}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomepageContent;
