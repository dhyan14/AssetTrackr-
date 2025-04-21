'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import DashboardHeader from '@/components/DashboardHeader';
import InvestmentSummary from '@/components/InvestmentSummary';
import InvestmentChart from '@/components/InvestmentChart';
import InvestmentList from '@/components/InvestmentList';

// Define interfaces for investment types
interface FixedDeposit {
  _id: string;
  bankName: string;
  amount: number;
  interestRate: number;
  startDate: string;
  maturityDate: string;
  currentValue: number;
}

interface Property {
  _id: string;
  name?: string;
  location: string;
  purchaseDate: string;
  purchasePrice: number;
  currentValue: number;
  propertyType: string;
  area: number;
}

interface Stock {
  _id: string;
  symbol: string;
  companyName: string;
  purchaseDate: string;
  purchasePrice: number;
  quantity: number;
  currentPrice: number;
  currentValue: number;
}

// Interface for investment data state
interface InvestmentData {
  fixedDeposits: FixedDeposit[];
  properties: Property[];
  stocks: Stock[];
}

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [investmentData, setInvestmentData] = useState<InvestmentData>({
    fixedDeposits: [],
    properties: [],
    stocks: []
  });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  useEffect(() => {
    if (status === 'authenticated') {
      Promise.all([
        fetch('/api/investments/fixed-deposits').then(res => res.json()),
        fetch('/api/investments/properties').then(res => res.json()),
        fetch('/api/investments/stocks').then(res => res.json())
      ])
        .then(([fdData, propData, stockData]) => {
          setInvestmentData({
            fixedDeposits: fdData.fixedDeposits || [],
            properties: propData.properties || [],
            stocks: stockData.stocks || []
          });
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching investment data:', error);
          setLoading(false);
        });
    }
  }, [status]);

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Loading...</h2>
          <p className="text-gray-500">Fetching your investment data</p>
        </div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return null; // Will redirect
  }

  // Calculate totals
  const fdTotal = investmentData.fixedDeposits.reduce((sum, fd) => sum + fd.currentValue, 0);
  const propTotal = investmentData.properties.reduce((sum, prop) => sum + prop.currentValue, 0);
  const stockTotal = investmentData.stocks.reduce((sum, stock) => sum + stock.currentValue, 0);
  const grandTotal = fdTotal + propTotal + stockTotal;

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader username={session?.user?.name || 'User'} />
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Investment Summary */}
        <InvestmentSummary 
          totalValue={grandTotal}
          fixedDepositValue={fdTotal}
          propertyValue={propTotal}
          stockValue={stockTotal}
        />
        
        {/* Charts */}
        <div className="mt-8 bg-white p-6 shadow-sm rounded-lg">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Investment Distribution</h2>
          <InvestmentChart 
            fixedDepositValue={fdTotal}
            propertyValue={propTotal}
            stockValue={stockTotal}
          />
        </div>
        
        {/* Investment Lists */}
        <div className="mt-8 grid gap-6 grid-cols-1 lg:grid-cols-3">
          <InvestmentList 
            title="Fixed Deposits"
            type="fixed-deposits"
            items={investmentData.fixedDeposits}
            addNewLink="/dashboard/fixed-deposits/new"
          />
          
          <InvestmentList 
            title="Properties"
            type="properties"
            items={investmentData.properties}
            addNewLink="/dashboard/properties/new"
          />
          
          <InvestmentList 
            title="Stocks"
            type="stocks"
            items={investmentData.stocks}
            addNewLink="/dashboard/stocks/new"
          />
        </div>
      </main>
    </div>
  );
} 