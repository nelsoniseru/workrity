import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is not defined');
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (error: any) {
    throw new Error(`Failed to connect to MongoDB: ${error.message}`);
  }
};

export default connectDB;