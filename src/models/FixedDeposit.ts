import mongoose from 'mongoose';

export interface IFixedDeposit extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  bankName: string;
  amount: number;
  interestRate: number;
  startDate: Date;
  maturityDate: Date;
  currentValue: number;
  createdAt: Date;
  updatedAt: Date;
}

const FixedDepositSchema = new mongoose.Schema<IFixedDeposit>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    bankName: {
      type: String,
      required: [true, 'Please provide the bank name']
    },
    amount: {
      type: Number,
      required: [true, 'Please provide the principal amount']
    },
    interestRate: {
      type: Number,
      required: [true, 'Please provide the interest rate']
    },
    startDate: {
      type: Date,
      required: [true, 'Please provide the start date']
    },
    maturityDate: {
      type: Date,
      required: [true, 'Please provide the maturity date']
    },
    currentValue: {
      type: Number,
      required: [true, 'Please provide the current value']
    }
  },
  { timestamps: true }
);

export default mongoose.models.FixedDeposit || 
  mongoose.model<IFixedDeposit>('FixedDeposit', FixedDepositSchema); 