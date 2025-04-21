import mongoose from 'mongoose';

declare global {
  var mongoose: { conn: any; promise: any };
}

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/assettrackr';

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts: mongoose.ConnectOptions = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000, // 5 seconds timeout for server selection
      connectTimeoutMS: 10000, // 10 seconds connection timeout
      socketTimeoutMS: 30000, // 30 seconds socket timeout
      family: 4, // Use IPv4, skip trying IPv6
      maxPoolSize: 10, // Maintain up to 10 socket connections
    };

    console.log('Connecting to MongoDB...');
    
    try {
      cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
        console.log('MongoDB connected successfully');
        return mongoose;
      });
    } catch (error) {
      console.error('MongoDB connection error:', error);
      throw error;
    }
  }
  
  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    console.error('Error resolving MongoDB connection:', error);
    // Reset the cached promise so the next request can try again
    cached.promise = null;
    throw error;
  }
}

export default dbConnect; 