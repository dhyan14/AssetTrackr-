import mongoose from 'mongoose';

export interface IProperty extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  name: string;
  location: string;
  purchaseDate: Date;
  purchasePrice: number;
  currentValue: number;
  propertyType: string;
  area: number;
  createdAt: Date;
  updatedAt: Date;
}

const PropertySchema = new mongoose.Schema<IProperty>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    name: {
      type: String,
      required: [true, 'Please provide a name for the property']
    },
    location: {
      type: String,
      required: [true, 'Please provide the property location']
    },
    purchaseDate: {
      type: Date,
      required: [true, 'Please provide the purchase date']
    },
    purchasePrice: {
      type: Number,
      required: [true, 'Please provide the purchase price']
    },
    currentValue: {
      type: Number,
      required: [true, 'Please provide the current value']
    },
    propertyType: {
      type: String,
      required: [true, 'Please provide the property type'],
      enum: ['Residential', 'Commercial', 'Land', 'Other']
    },
    area: {
      type: Number,
      required: [true, 'Please provide the property area']
    }
  },
  { timestamps: true }
);

export default mongoose.models.Property ||
  mongoose.model<IProperty>('Property', PropertySchema); 