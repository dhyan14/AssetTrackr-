import { NextResponse } from 'next/server';

// Mocked data for demo purposes
const mockStocks = [
  {
    _id: '1',
    symbol: 'AAPL',
    companyName: 'Apple Inc.',
    purchaseDate: '2023-01-20',
    purchasePrice: 150.25,
    quantity: 10,
    currentPrice: 175.50,
    currentValue: 1755.00
  },
  {
    _id: '2',
    symbol: 'MSFT',
    companyName: 'Microsoft Corporation',
    purchaseDate: '2022-11-15',
    purchasePrice: 240.50,
    quantity: 5,
    currentPrice: 290.75,
    currentValue: 1453.75
  },
  {
    _id: '3',
    symbol: 'AMZN',
    companyName: 'Amazon.com, Inc.',
    purchaseDate: '2023-03-05',
    purchasePrice: 95.25,
    quantity: 15,
    currentPrice: 105.50,
    currentValue: 1582.50
  }
];

export async function GET() {
  try {
    // In a real app, this would fetch from the database
    return NextResponse.json({ stocks: mockStocks });
  } catch (error) {
    console.error('Error fetching stocks:', error);
    return NextResponse.json({ message: 'Error fetching stocks' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // In a real app, this would save to the database
    const newStock = {
      _id: Math.random().toString(36).substring(2, 9),
      ...data,
      currentValue: data.quantity * data.currentPrice
    };
    
    return NextResponse.json({ 
      message: 'Stock created successfully', 
      stock: newStock 
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating stock:', error);
    return NextResponse.json({ message: 'Error creating stock' }, { status: 500 });
  }
} 