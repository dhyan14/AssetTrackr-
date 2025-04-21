import mongoose from 'mongoose';

export interface IStock extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  symbol: string;
  companyName: string;
  purchaseDate: Date;
  purchasePrice: number;
  quantity: number;
  currentPrice: number;
  currentValue: number;
  createdAt: Date;
  updatedAt: Date;
}

const StockSchema = new mongoose.Schema<IStock>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    symbol: {
      type: String,
      required: [true, 'Please provide the stock symbol'],
      uppercase: true
    },
    companyName: {
      type: String,
      required: [true, 'Please provide the company name']
    },
    purchaseDate: {
      type: Date,
      required: [true, 'Please provide the purchase date']
    },
    purchasePrice: {
      type: Number,
      required: [true, 'Please provide the purchase price']
    },
    quantity: {
      type: Number,
      required: [true, 'Please provide the quantity']
    },
    currentPrice: {
      type: Number,
      required: [true, 'Please provide the current price']
    },
    currentValue: {
      type: Number,
      required: [true, 'Please provide the current value']
    }
  },
  { timestamps: true }
);

// Calculate current value before saving
StockSchema.pre('save', function(next) {
  this.currentValue = this.currentPrice * this.quantity;
  next();
});

export default mongoose.models.Stock ||
  mongoose.model<IStock>('Stock', StockSchema); 