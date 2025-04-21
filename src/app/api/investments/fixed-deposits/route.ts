import { NextResponse } from 'next/server';

// Mocked data for demo purposes
const mockFixedDeposits = [
  {
    _id: '1',
    bankName: 'Chase Bank',
    amount: 10000,
    interestRate: 3.5,
    startDate: '2023-01-15',
    maturityDate: '2024-01-15',
    currentValue: 10350
  },
  {
    _id: '2',
    bankName: 'Bank of America',
    amount: 5000,
    interestRate: 4.0,
    startDate: '2023-03-10',
    maturityDate: '2024-03-10',
    currentValue: 5150
  },
  {
    _id: '3',
    bankName: 'Wells Fargo',
    amount: 15000,
    interestRate: 3.2,
    startDate: '2023-05-20',
    maturityDate: '2025-05-20',
    currentValue: 15320
  }
];

export async function GET() {
  try {
    // In a real app, this would fetch from the database
    return NextResponse.json({ fixedDeposits: mockFixedDeposits });
  } catch (error) {
    console.error('Error fetching fixed deposits:', error);
    return NextResponse.json({ message: 'Error fetching fixed deposits' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // In a real app, this would save to the database
    const newDeposit = {
      _id: Math.random().toString(36).substring(2, 9),
      ...data,
      currentValue: data.amount * (1 + (data.interestRate / 100))
    };
    
    return NextResponse.json({ 
      message: 'Fixed deposit created successfully', 
      fixedDeposit: newDeposit 
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating fixed deposit:', error);
    return NextResponse.json({ message: 'Error creating fixed deposit' }, { status: 500 });
  }
} 