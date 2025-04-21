'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import DashboardHeader from '@/components/DashboardHeader';

export default function AddFixedDeposit() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    bankName: '',
    amount: '',
    interestRate: '',
    startDate: '',
    maturityDate: '',
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
    if (!formData.bankName || !formData.amount || !formData.interestRate || !formData.startDate || !formData.maturityDate) {
      setError('All fields are required');
      return;
    }
    
    // Ensure amount and interest rate are positive numbers
    if (parseFloat(formData.amount) <= 0 || parseFloat(formData.interestRate) <= 0) {
      setError('Amount and interest rate must be positive numbers');
      return;
    }
    
    // Ensure maturity date is after start date
    if (new Date(formData.maturityDate) <= new Date(formData.startDate)) {
      setError('Maturity date must be after start date');
      return;
    }
    
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/investments/fixed-deposits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bankName: formData.bankName,
          amount: parseFloat(formData.amount),
          interestRate: parseFloat(formData.interestRate),
          startDate: formData.startDate,
          maturityDate: formData.maturityDate,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error creating fixed deposit');
      }

      // Redirect to dashboard after successful creation
      router.push('/dashboard');
    } catch (error: any) {
      console.error('Error creating fixed deposit:', error);
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
          <h1 className="text-2xl font-semibold text-gray-900">Add New Fixed Deposit</h1>
          <p className="mt-1 text-sm text-gray-600">
            Enter the details of your fixed deposit investment
          </p>
        </div>
        
        <div className="mt-6 bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
          {error && (
            <div className="mb-4 rounded-md bg-red-50 p-4">
              <div className="text-sm text-red-700">{error}</div>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="bankName" className="block text-sm font-medium text-gray-700">
                Bank Name
              </label>
              <input
                type="text"
                name="bankName"
                id="bankName"
                value={formData.bankName}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                required
              />
            </div>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                  Amount ($)
                </label>
                <input
                  type="number"
                  name="amount"
                  id="amount"
                  min="0"
                  step="0.01"
                  value={formData.amount}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="interestRate" className="block text-sm font-medium text-gray-700">
                  Interest Rate (%)
                </label>
                <input
                  type="number"
                  name="interestRate"
                  id="interestRate"
                  min="0"
                  step="0.01"
                  value={formData.interestRate}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                  Start Date
                </label>
                <input
                  type="date"
                  name="startDate"
                  id="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="maturityDate" className="block text-sm font-medium text-gray-700">
                  Maturity Date
                </label>
                <input
                  type="date"
                  name="maturityDate"
                  id="maturityDate"
                  value={formData.maturityDate}
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
                {loading ? 'Adding...' : 'Add Fixed Deposit'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
} 