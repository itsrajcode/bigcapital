import React from 'react';

interface TopSellingItem {
  name: string;
  value: number;
  icon?: string;
}

interface TopSellingItemsChartProps {
  data: TopSellingItem[];
}

export const TopSellingItemsChart: React.FC<TopSellingItemsChartProps> = ({ data }) => {
  // Find the maximum value to calculate percentages
  const maxValue = Math.max(...data.map(item => item.value));

  return (
    <div className="top-selling-items">
      <h2 className="chart-title">Top 10 Selling Items</h2>
      <div className="chart-container">
        {data.map((item, index) => (
          <div key={index} className="chart-row">
            <div className="item-info">
              <span className="item-icon">{getItemIcon(item.name)}</span>
              <span className="item-name">{item.name}</span>
            </div>
            <div className="bar-container">
              <div 
                className="bar" 
                style={{ 
                  width: `${(item.value / maxValue) * 100}%`,
                }}
              >
                <span className="value">{item.value}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Helper function to get emoji icons based on item name
const getItemIcon = (name: string): string => {
  const iconMap: { [key: string]: string } = {
    'Macbook Pro (13inch)': '',
    'Kids Wear frock': '',
    'Power Bank': '',
    'Iphone 16 pro Ultra': '',
    "Men's Professional Suit": '',
    "Sheesham TV's Stand": '',
    'LG Microwave': '',
    'Boat Rocker Head Set': '',
    'Samsung s39 pro Ultra': '',
    'Bosch Washing Machine': ''
  };

  return iconMap[name] || '📦';
}; 