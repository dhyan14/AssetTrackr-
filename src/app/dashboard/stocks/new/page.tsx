'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import DashboardHeader from '@/components/DashboardHeader';

export default function AddStock() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    symbol: '',
    companyName: '',
    quantity: '',
    purchasePrice: '',
    currentPrice: '',
    purchaseDate: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.symbol || !formData.companyName || !formData.quantity || !formData.purchasePrice || !formData.currentPrice) {
      setError('All fields except purchase date are required');
      return;
    }
    
    // Ensure quantity and prices are positive numbers
    if (parseInt(formData.quantity) <= 0 || parseFloat(formData.purchasePrice) <= 0 || parseFloat(formData.currentPrice) <= 0) {
      setError('Quantity, purchase price, and current price must be positive numbers');
      return;
    }
    
    setLoading(true);
    setError('');

    try {
      // Calculate current value
      const quantity = parseInt(formData.quantity);
      const currentPrice = parseFloat(formData.currentPrice);
      const currentValue = quantity * currentPrice;
      
      const response = await fetch('/api/investments/stocks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          symbol: formData.symbol.toUpperCase(),
          companyName: formData.companyName,
          quantity: quantity,
          purchasePrice: parseFloat(formData.purchasePrice),
          currentPrice: currentPrice,
          currentValue: currentValue,
          purchaseDate: formData.purchaseDate,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error creating stock');
      }

      // Redirect to dashboard after successful creation
      router.push('/dashboard');
    } catch (error: any) {
      console.error('Error creating stock:', error);
      setError(error.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader username="User" />
      
      <main className="max-w-2xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 sm:px-0">
          <h1 className="text-2xl font-semibold text-gray-900">Add New Stock</h1>
          <p className="mt-1 text-sm text-gray-600">
            Enter the details of your stock investment
          </p>
        </div>
        
        <div className="mt-6 bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
          {error && (
            <div className="mb-4 rounded-md bg-red-50 p-4">
              <div className="text-sm text-red-700">{error}</div>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="symbol" className="block text-sm font-medium text-gray-700">
                  Stock Symbol
                </label>
                <input
                  type="text"
                  name="symbol"
                  id="symbol"
                  value={formData.symbol}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  required
                  placeholder="e.g., AAPL"
                />
              </div>
              
              <div>
                <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
                  Company Name
                </label>
                <input
                  type="text"
                  name="companyName"
                  id="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  required
                  placeholder="e.g., Apple Inc."
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                  Quantity (Shares)
                </label>
                <input
                  type="number"
                  name="quantity"
                  id="quantity"
                  min="1"
                  step="1"
                  value={formData.quantity}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="purchaseDate" className="block text-sm font-medium text-gray-700">
                  Purchase Date
                </label>
                <input
                  type="date"
                  name="purchaseDate"
                  id="purchaseDate"
                  value={formData.purchaseDate}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="purchasePrice" className="block text-sm font-medium text-gray-700">
                  Purchase Price ($)
                </label>
                <input
                  type="number"
                  name="purchasePrice"
                  id="purchasePrice"
                  min="0"
                  step="0.01"
                  value={formData.purchasePrice}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="currentPrice" className="block text-sm font-medium text-gray-700">
                  Current Price ($)
                </label>
                <input
                  type="number"
                  name="currentPrice"
                  id="currentPrice"
                  min="0"
                  step="0.01"
                  value={formData.currentPrice}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  required
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <Link
                href="/dashboard"
                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                {loading ? 'Adding...' : 'Add Stock'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
} 