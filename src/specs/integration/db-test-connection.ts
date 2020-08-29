import mongoose, { Collection, Mongoose, Connection } from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongoClient } from 'mongodb';


export default class DBTestConnection {

    private COLLECTIONS: String[] = ['issues', 'labels'];

    private server: MongoMemoryServer;
    private db: any;
    private connection: any;

    constructor(){
        this.server = new MongoMemoryServer({ 
            instance: {
                port: 27017,
                dbName: 'kanbanboard-test-db'
            }
         });
         this.db = null;
         this.connection = null;
    }

    async startTestDatabase(){
        const url = await server.getConnectionString();
        const options = { useNewUrlParser: true, useUnifiedTopology: true };
        this.connection = await MongoClient.connect(url, options);
        this.db = this.connection.db(await this.server.getDbName());
    }

    async stopTestDatabase(){
        await this.connection.close();
        await this.server.stop();
    }

    async cleanUpTestDatabase() {
        await Promise.all(this.COLLECTIONS.map(c => this.db.collection(c).deleteMany({})));
    }
}






const server = new MongoMemoryServer({ 
    instance: {
        port: 27017,
        dbName: 'kanbanboard-test-db'
    }
 });

export const startTestDatabase = async () => {
    const url = await server.getConnectionString();
    const options = { useNewUrlParser: true, useUnifiedTopology: true };
    return await mongoose.connect(url, options);
}

export const stopTestDatabase = async () => {
    await mongoose.connection.close();
    await server.stop();
}

export const cleanUpTestDatabase = async () => {
    /* const db = await mongoose.connection.db(server.getDbName());
    console.log(collections); */
   
    /* for (const key in collections) {
        const collection = collections[key];
        await collection.;

        const response = await collection.find({});
        console.log(await response, collection.length);
    } */
}