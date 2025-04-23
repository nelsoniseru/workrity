import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  console.log('Test setup: Set MONGO_URI to:', uri);
  await mongoose.connect(uri);
  console.log('Test setup: Mongoose connected to:', uri);
  mongoose.connection.on('error', (err) => {
    console.error('Mongoose connection error in tests:', err);
  });
});

afterEach(async () => {
  await mongoose.connection.dropDatabase(); 
});

afterAll(async () => {
  await mongoose.connection.close(true); 
  await mongoServer.stop(); 
  delete process.env.MONGO_URI;
  console.log('Test cleanup: MONGO_URI cleared');
});