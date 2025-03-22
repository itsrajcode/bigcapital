import React from 'react';


interface DataSummaryTableProps {
  title: string;
  columns: Array<{
    key: string;
    label: string;
    format?: (value: any) => string;
  }>;
  data: Array<Record<string, any>>;
}

export const DataSummaryTable: React.FC<DataSummaryTableProps> = ({
  title,
  columns,
  data,
}) => {
  return (
    <div className="data-summary-table">
      <h3 className="table-title">{title}</h3>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.key}>{column.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                {columns.map((column) => (
                  <td key={column.key}>
                    {column.format ? column.format(row[column.key]) : row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}; 