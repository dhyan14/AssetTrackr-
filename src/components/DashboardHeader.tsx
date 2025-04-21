'use client';

import Link from 'next/link';
import { signOut } from 'next-auth/react';

interface DashboardHeaderProps {
  username: string;
}

export default function DashboardHeader({ username }: DashboardHeaderProps) {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/dashboard" className="text-primary-600 font-bold text-xl">
              AssetTrackr
            </Link>
            <nav className="ml-6 flex space-x-8">
              <Link href="/dashboard" className="text-gray-900 font-medium">
                Dashboard
              </Link>
              <Link href="/dashboard/fixed-deposits" className="text-gray-500 hover:text-gray-700">
                Fixed Deposits
              </Link>
              <Link href="/dashboard/properties" className="text-gray-500 hover:text-gray-700">
                Properties
              </Link>
              <Link href="/dashboard/stocks" className="text-gray-500 hover:text-gray-700">
                Stocks
              </Link>
            </nav>
          </div>
          
          <div className="flex items-center">
            <span className="mr-4">{username}</span>
            <button 
              onClick={() => signOut({ callbackUrl: '/' })}
              className="btn-secondary"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    </header>
  );
} 