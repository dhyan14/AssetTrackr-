'use client';

import { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

interface InvestmentChartProps {
  fixedDepositValue: number;
  propertyValue: number;
  stockValue: number;
}

export default function InvestmentChart({
  fixedDepositValue,
  propertyValue,
  stockValue
}: InvestmentChartProps) {
  const [chartData, setChartData] = useState({
    labels: ['Fixed Deposits', 'Properties', 'Stocks'],
    datasets: [
      {
        data: [fixedDepositValue, propertyValue, stockValue],
        backgroundColor: [
          'rgba(54, 162, 235, 0.6)', // blue for fixed deposits
          'rgba(75, 192, 192, 0.6)', // teal for properties
          'rgba(255, 99, 132, 0.6)', // red for stocks
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  });

  // Update chart data when props change
  useEffect(() => {
    setChartData({
      ...chartData,
      datasets: [
        {
          ...chartData.datasets[0],
          data: [fixedDepositValue, propertyValue, stockValue],
        },
      ],
    });
  }, [fixedDepositValue, propertyValue, stockValue]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const value = context.raw;
            const total = fixedDepositValue + propertyValue + stockValue;
            const percentage = total ? Math.round((value / total) * 100) : 0;
            
            return `${context.label}: $${value.toLocaleString()} (${percentage}%)`;
          }
        }
      }
    },
  };

  return (
    <div className="max-w-md mx-auto">
      <Pie data={chartData} options={options} />
    </div>
  );
} 