'use client';

import Link from 'next/link';

interface InvestmentItem {
  _id: string;
  [key: string]: any;
}

interface InvestmentListProps {
  title: string;
  type: string;
  items: InvestmentItem[];
  addNewLink: string;
}

export default function InvestmentList({ title, type, items, addNewLink }: InvestmentListProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  const getItemName = (item: InvestmentItem) => {
    switch (type) {
      case 'fixed-deposits':
        return item.bankName;
      case 'properties':
        return item.name || item.location;
      case 'stocks':
        return `${item.symbol} - ${item.companyName}`;
      default:
        return 'Investment';
    }
  };

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-gray-900">{title}</h2>
        <Link href={addNewLink} className="btn-primary text-xs px-2 py-1">
          + Add New
        </Link>
      </div>
      
      {items.length === 0 ? (
        <div className="text-center py-4 text-gray-500">
          No {title.toLowerCase()} found. Add one to get started.
        </div>
      ) : (
        <ul className="divide-y divide-gray-200">
          {items.map((item) => (
            <li key={item._id} className="py-3">
              <Link href={`/dashboard/${type}/${item._id}`} className="block hover:bg-gray-50">
                <div className="flex justify-between">
                  <p className="text-sm font-medium text-gray-900">{getItemName(item)}</p>
                  <p className="text-sm font-semibold text-gray-900">{formatCurrency(item.currentValue)}</p>
                </div>
                {type === 'fixed-deposits' && (
                  <div className="mt-1">
                    <p className="text-xs text-gray-500">
                      {item.interestRate}% - Matures: {new Date(item.maturityDate).toLocaleDateString()}
                    </p>
                  </div>
                )}
                {type === 'properties' && (
                  <div className="mt-1">
                    <p className="text-xs text-gray-500">
                      {item.propertyType} - {item.area} sq.ft
                    </p>
                  </div>
                )}
                {type === 'stocks' && (
                  <div className="mt-1">
                    <p className="text-xs text-gray-500">
                      {item.quantity} shares @ {formatCurrency(item.currentPrice)}
                    </p>
                  </div>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
} 