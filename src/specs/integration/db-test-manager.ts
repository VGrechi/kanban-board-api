import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongoClient } from 'mongodb';
import { connect, disconnect } from '../../config/db-connection';
import { AppConstants } from '../../config/envs';


export default class DBTestManager {

    private COLLECTIONS: String[] = ['issues'];

    private db: any;
    private connection: any;

    constructor(){
         this.db = null;
         this.connection = {};
    }

    async startTestDatabase(){
        const options = { useNewUrlParser: true, useUnifiedTopology: true };
        this.connection = await MongoClient.connect(AppConstants.databaseUri, options);
        this.db = this.connection.db();
    }

    async stopTestDatabase(){
        await this.connection.close();
    }

    async cleanUpTestDatabase() {
        await connect();
        await Promise.all(this.COLLECTIONS.map(async c => await this.db.collection(c).deleteMany({})));
        await disconnect();
    }

    async insertModel(collection: string, model: any){
        await connect();
        await this.db.collection(collection).insertOne(model);
        await disconnect();
    }

    async findModel(collection: string, filter: any): Promise<any>{
        await connect();
        const model = await this.db.collection(collection).findOne(filter);
        await disconnect();
        return model;
    }
}