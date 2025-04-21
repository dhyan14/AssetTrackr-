import { NextResponse } from 'next/server';

// Mocked data for demo purposes
const mockProperties = [
  {
    _id: '1',
    name: 'Downtown Apartment',
    location: '123 Main St, New York',
    purchaseDate: '2022-05-15',
    purchasePrice: 350000,
    currentValue: 380000,
    propertyType: 'Residential',
    area: 1200
  },
  {
    _id: '2',
    name: 'Suburban House',
    location: '456 Oak Ave, Chicago',
    purchaseDate: '2020-10-22',
    purchasePrice: 280000,
    currentValue: 320000,
    propertyType: 'Residential',
    area: 1800
  },
  {
    _id: '3',
    name: 'Commercial Space',
    location: '789 Business Blvd, Los Angeles',
    purchaseDate: '2021-08-05',
    purchasePrice: 450000,
    currentValue: 490000,
    propertyType: 'Commercial',
    area: 2500
  }
];

export async function GET() {
  try {
    // In a real app, this would fetch from the database
    return NextResponse.json({ properties: mockProperties });
  } catch (error) {
    console.error('Error fetching properties:', error);
    return NextResponse.json({ message: 'Error fetching properties' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // In a real app, this would save to the database
    const newProperty = {
      _id: Math.random().toString(36).substring(2, 9),
      ...data,
      currentValue: data.purchasePrice
    };
    
    return NextResponse.json({ 
      message: 'Property created successfully', 
      property: newProperty 
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating property:', error);
    return NextResponse.json({ message: 'Error creating property' }, { status: 500 });
  }
} 