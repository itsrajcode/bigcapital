// @ts-nocheck
import React, { useEffect, useState } from 'react';
import AccountsReceivableSection from './AccountsReceivableSection';
import AccountsPayableSection from './AccountsPayableSection';
import FinancialAccountingSection from './FinancialAccountingSection';
import ProductsServicesSection from './ProductsServicesSection';
import '@/style/pages/HomePage/HomePage.scss';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Area,
  ComposedChart,
  BarChart,
  Bar,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { IncomeExpenseChart } from './components/IncomeExpenseChart';
import { TopSellingChart } from './components/TopSellingChart';
import { InvoiceStatusChart } from './components/InvoiceStatusChart';
import { TopSellingItemsChart } from './components/TopSellingItemsChart';
import { UnpaidInvoicesTable } from './components/UnpaidInvoicesTable';
import { DataSummaryTable } from './components/DataSummaryTable';
import { useQuery } from 'react-query';
import { useDashboardAnalytics } from '@/services/dashboard';
import { Spinner, Button, MenuItem, Menu, Popover, Position, Dialog, Classes, FormGroup, InputGroup } from '@blueprintjs/core';
import { useCurrentOrganization } from '@/hooks/state';

// Date range options
const DATE_RANGES = [
  { label: 'Last 3 Months', value: 3 },
  { label: 'Last 6 Months', value: 6 },
  { label: 'Last 12 Months', value: 12 },
  { label: 'Year to Date', value: 'ytd' },
  { label: 'Custom...', value: 'custom' }
];

function HomepageContent() {
  // Date range state
  const [selectedDateRange, setSelectedDateRange] = useState(DATE_RANGES[1]); // Default to 6 months
  const [isCustomDatePickerOpen, setIsCustomDatePickerOpen] = useState(false);
  const [customDateRange, setCustomDateRange] = useState({
    fromDate: '',
    toDate: '',
  });
  
  // Function to get date range parameters based on selection
  const getDateRangeParams = (range) => {
    const today = new Date();
    let fromDate;
    
    if (range.value === 'custom' && customDateRange.fromDate && customDateRange.toDate) {
      return {
        from_date: customDateRange.fromDate,
        to_date: customDateRange.toDate
      };
    } else if (range.value === 'ytd') {
      // Year to date
      fromDate = new Date(today.getFullYear(), 0, 1);
    } else if (typeof range.value === 'number') {
      // Last X months
      fromDate = new Date();
      fromDate.setMonth(today.getMonth() - range.value);
    } else {
      // Default to 6 months if custom or other
      fromDate = new Date();
      fromDate.setMonth(today.getMonth() - 6);
    }
    
    return {
      from_date: fromDate.toISOString().split('T')[0],
      to_date: today.toISOString().split('T')[0]
    };
  };

  // Construct query parameters based on selected date range
  const dateParams = getDateRangeParams(selectedDateRange);
  
  // Fetch analytics data with date parameters
  const { data, isLoading, error, refetch } = useDashboardAnalytics({
    params: dateParams
  });
  
  const organization = useCurrentOrganization();
  const baseCurrency = organization?.base_currency || 'USD';
  
  // Date range selection handler
  const handleDateRangeChange = (range) => {
    if (range.value === 'custom') {
      setIsCustomDatePickerOpen(true);
    } else {
      setSelectedDateRange(range);
    }
  };
  
  // Custom date range handlers
  const handleCustomDateApply = () => {
    if (customDateRange.fromDate && customDateRange.toDate) {
      setSelectedDateRange({
        ...selectedDateRange,
        label: `${customDateRange.fromDate} to ${customDateRange.toDate}`,
        value: 'custom'
      });
      setIsCustomDatePickerOpen(false);
    }
  };
  
  const handleCustomDateCancel = () => {
    setIsCustomDatePickerOpen(false);
  };
  
  const handleFromDateChange = (e) => {
    setCustomDateRange({
      ...customDateRange,
      fromDate: e.target.value
    });
  };
  
  const handleToDateChange = (e) => {
    setCustomDateRange({
      ...customDateRange,
      toDate: e.target.value
    });
  };
  
  // Add detailed logging to see the exact API response
  console.log('[HomepageContent] Full API Response:', data);
  console.log('[HomepageContent] Response Type:', typeof data);
  console.log('[HomepageContent] Response Keys:', data ? Object.keys(data) : 'No data');
  
  // Extract the actual data from the response
  const analyticsData = data?.analytics_dashboard_data || data;
  console.log('[HomepageContent] Analytics Data:', analyticsData);

  if (isLoading) {
    return (
      <div className="homepage__loading">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="homepage__error">
        Error loading dashboard data: {error.message}
      </div>
    );
  }

  if (!analyticsData) {
    return (
      <div className="homepage__error">
        No dashboard data available
      </div>
    );
  }

  // Format the data for charts and tables
  const incomeData = analyticsData?.income_expense_overview || [];

  // Calculate totals for the header
  const totalIncome = incomeData.reduce((sum, item) => sum + item.income, 0);
  const totalExpense = incomeData.reduce((sum, item) => sum + item.expense, 0);

  // Format top selling items data
  const topSellingItemsData = (analyticsData?.top_selling_items || []).map(item => ({
    name: item.name,
    value: item.quantity
  }));

  // Format invoice status data with colors
  const statusColors = {
    'draft': '#7B61FF',
    'paid': '#00CB65',
    'unpaid': '#1248BA',
    'partially-paid': '#FFA500',
    'overdue': '#FF0000',
    'delivered': '#E1E1E1'
  };

  const invoiceStatusData = (analyticsData?.invoice_statuses || []).map(status => ({
    name: status.status,
    value: parseInt(status.count),
    color: statusColors[status.status] || '#E1E1E1'
  }));

  // Format unpaid invoices data
  const unpaidInvoicesData = (analyticsData?.top_unpaid_invoices || []).map(invoice => ({
    customer: invoice.customer_name,
    value: invoice.due_amount.toLocaleString('en-IN'),
    overdue: getOverdueDays(invoice.due_date)
  }));

  // Format cash and bank balances data
  const cashBankBalancesData = (analyticsData?.cash_and_bank_balances || []).map(account => ({
    account: account.account_name,
    value: (account.balance || 0).toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })
  }));

  // const recentActivitiesData = [
  //   { type: 'updated', user: 'You', reference: 'INV08/077', details: 'for 1001.0 with cash in hand.', time: '11:40pm' },
  //   { type: 'generated', user: 'You', reference: 'Instamojo payment link', customer: 'Aman Verma', amount: '257.64', time: '10:14am' },
  //   { type: 'requested', user: 'Aman Gupta', details: 'to release the INV/211 for project "UI/UX Design for mobile App"', time: 'Yesterday' },
  //   { type: 'added', user: 'You', reference: 'INV/211', customer: 'customer', amount: '0.00', time: '1d ago' },
  //   { type: 'added', user: 'You', reference: 'INV/211', customer: 'customer', amount: '0.00', time: '1d ago' },
  // ];

  // Date range menu component
  const DateRangeMenu = (
    <Menu>
      {DATE_RANGES.map((range) => (
        <MenuItem 
          key={range.value} 
          text={range.label} 
          active={selectedDateRange.value === range.value}
          onClick={() => handleDateRangeChange(range)}
        />
      ))}
    </Menu>
  );

  return (
    <div className="homepage__analytics" style={{ backgroundColor: '#f8f7f7' }}>
      <div className="dashboard__main-content">
        {/* Left column */}
        <div className="dashboard__left-column">
          {/* Income and Expense Overview */}
          <div className="analytics__overview">
            <div className="overview__header">
              <h2 className="overview__title">Income and Expense Overview</h2>
              <Popover content={DateRangeMenu} position={Position.BOTTOM}>
                <Button 
                  className="overview__period-selector" 
                  rightIcon="caret-down"
                  small={true}
                >
                  {selectedDateRange.label}
                </Button>
              </Popover>
            </div>

            <div className="overview__stats">
              <div className="stats__income">
                <div className="stats__icon">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M7 3V11M7 3L4 6M7 3L10 6"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <span>Income: {baseCurrency} {totalIncome.toLocaleString('en-IN')}</span>
              </div>
              <div className="stats__expense">
                <div className="stats__icon">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M7 11V3M7 11L4 8M7 11L10 8"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <span>Expense: {baseCurrency} {totalExpense.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div style={{ width: '100%', height: 300 }}>
              <IncomeExpenseChart data={incomeData} />
            </div>
          </div>

          {/* Top 10 Selling Items */}
          <div className="chart__container">
            <TopSellingItemsChart data={topSellingItemsData} />
          </div>
        </div>

        {/* Right column */}
        <div className="dashboard__right-column">
          {/* Invoices By Status */}
          <div className="analytics__invoices">
            <h2 className="invoices__title">Invoices By Status</h2>
            <div className="invoices__chart-container">
              <div className="chart__wrapper">
                <InvoiceStatusChart data={invoiceStatusData} />
              </div>
              <div className="chart__legend">
                {invoiceStatusData.map((entry, index) => (
                  <div key={index} className="legend__item">
                    <span
                      className="legend__marker"
                      style={{ backgroundColor: entry.color }}
                    />
                    <span className="legend__label">{entry.name}</span>
                    <span className="legend__value">
                      {entry.value.toString().padStart(2, '0')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tables section - full width */}
      <div className="analytics__tables">
        <DataSummaryTable
          title="Top 5 Unpaid Invoices"
          columns={[
            { key: 'customer', label: 'Customer' },
            { key: 'value', label: `Value(${baseCurrency})` },
            { key: 'overdue', label: 'Overdue' }
          ]}
          data={unpaidInvoicesData}
        />

        <DataSummaryTable
          title="Cash and Bank Balances"
          columns={[
            { key: 'account', label: 'Account' },
            { 
              key: 'value', 
              label: `Value(${baseCurrency})`,
              render: (value) => (
                <span className={parseFloat(value.replace(/,/g, '')) < 0 ? 'negative-value' : ''}>
                  {value}
                </span>
              )
            }
          ]}
          data={cashBankBalancesData}
        />
      </div>
      
      {/* Custom Date Range Dialog */}
      <Dialog
        isOpen={isCustomDatePickerOpen}
        onClose={handleCustomDateCancel}
        title="Custom Date Range"
        className="custom-date-dialog"
      >
        <div className={Classes.DIALOG_BODY}>
          <FormGroup
            label="From Date"
            labelFor="from-date"
          >
            <InputGroup
              id="from-date"
              type="date"
              value={customDateRange.fromDate}
              onChange={handleFromDateChange}
            />
          </FormGroup>
          <FormGroup
            label="To Date"
            labelFor="to-date"
          >
            <InputGroup
              id="to-date"
              type="date"
              value={customDateRange.toDate}
              onChange={handleToDateChange}
            />
          </FormGroup>
        </div>
        <div className={Classes.DIALOG_FOOTER}>
          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            <Button onClick={handleCustomDateCancel}>Cancel</Button>
            <Button 
              intent="primary" 
              onClick={handleCustomDateApply}
              disabled={!customDateRange.fromDate || !customDateRange.toDate}
            >
              Apply
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

// Helper function to calculate overdue days/months/years
function getOverdueDays(dueDate) {
  const now = new Date();
  const due = new Date(dueDate);
  const diffTime = Math.abs(now - due);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays < 30) {
    return `${diffDays}ds`;
  } else if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    return `${months}mths`;
  } else {
    const years = Math.floor(diffDays / 365);
    return `${years}${years === 1 ? 'yr' : 'yrs'}`;
  }
}

export default HomepageContent;
