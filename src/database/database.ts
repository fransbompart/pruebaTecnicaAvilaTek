import mongoose from 'mongoose';

export class Database {
  static initialiseConnection = async () => {
    const dbUrl = process.env.MONGODB_URL;
    if (!dbUrl) 
      throw new Error('No database URL');
    await mongoose.connect(dbUrl);
    console.log('Database connected');  
  };
}