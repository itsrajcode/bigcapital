import mongoose from 'mongoose';
import { Db } from 'mongodb';
// Import config as a CommonJS module
const config = require('@/config');

export default async (): Promise<Db> => {
  try {
    // MongoDB connection options
    const options = { 
      useNewUrlParser: true, 
      useCreateIndex: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000 // Timeout after 5s
    };

    // Attempt to connect to MongoDB
    const connection = await mongoose.connect(config.mongoDb.databaseURL, options);
    
    // Log successful connection
    console.log('MongoDB connected successfully');
    
    // Set up connection error handlers
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });
    
    mongoose.connection.on('disconnected', () => {
      console.warn('MongoDB disconnected. Attempting to reconnect...');
    });
    
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('MongoDB connection closed due to app termination');
      process.exit(0);
    });
    
    return connection.connection.db as unknown as Db;
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw error; // Rethrow to allow handling by caller
  }
};
