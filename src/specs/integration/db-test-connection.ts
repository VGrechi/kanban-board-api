import mongoose, { Collection } from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

const server = new MongoMemoryServer({ autoStart: false });

export const startTestDatabase = async () => {
    const url = await server.getConnectionString();
    const options = { useNewUrlParser: true, useUnifiedTopology: true };
    return await mongoose.connect(url, options);
}

export const stopTestDatabase = async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await server.stop();
}

export const cleanUpTestDatabase = async () => {
    const collections = mongoose.connection.collections;
   
    for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany({});
    }
}