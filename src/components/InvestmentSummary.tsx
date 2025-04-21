'use client';

interface InvestmentSummaryProps {
  totalValue: number;
  fixedDepositValue: number;
  propertyValue: number;
  stockValue: number;
}

export default function InvestmentSummary({
  totalValue,
  fixedDepositValue,
  propertyValue,
  stockValue
}: InvestmentSummaryProps) {
  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="p-6">
        <h2 className="text-lg font-medium text-gray-900">Investment Summary</h2>
        <p className="mt-1 text-3xl font-semibold text-gray-900">{formatCurrency(totalValue)}</p>
        <p className="mt-1 text-sm text-gray-500">Total investments value</p>
      </div>
      <div className="border-t border-gray-200 grid grid-cols-3 divide-x divide-gray-200">
        <div className="px-6 py-5 text-sm">
          <dt className="text-gray-500">Fixed Deposits</dt>
          <dd className="mt-1 font-semibold text-gray-900">{formatCurrency(fixedDepositValue)}</dd>
        </div>
        <div className="px-6 py-5 text-sm">
          <dt className="text-gray-500">Properties</dt>
          <dd className="mt-1 font-semibold text-gray-900">{formatCurrency(propertyValue)}</dd>
        </div>
        <div className="px-6 py-5 text-sm">
          <dt className="text-gray-500">Stocks</dt>
          <dd className="mt-1 font-semibold text-gray-900">{formatCurrency(stockValue)}</dd>
        </div>
      </div>
    </div>
  );
} 