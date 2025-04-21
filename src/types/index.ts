// User type
export interface User {
  id: string;
  name: string;
  email: string;
}

// Investment types
export interface FixedDeposit {
  _id: string;
  bankName: string;
  amount: number;
  interestRate: number;
  startDate: string;
  maturityDate: string;
  currentValue: number;
}

export interface Property {
  _id: string;
  name?: string;
  location: string;
  purchaseDate: string;
  purchasePrice: number;
  currentValue: number;
  propertyType: string;
  area: number;
}

export interface Stock {
  _id: string;
  symbol: string;
  companyName: string;
  purchaseDate: string;
  purchasePrice: number;
  quantity: number;
  currentPrice: number;
  currentValue: number;
}

// Investment data state
export interface InvestmentData {
  fixedDeposits: FixedDeposit[];
  properties: Property[];
  stocks: Stock[];
}

// Common investment item for lists
export interface InvestmentItem {
  _id: string;
  currentValue: number;
  [key: string]: any;
}

// Investment type union
export type InvestmentType = 'fixed-deposits' | 'properties' | 'stocks'; 