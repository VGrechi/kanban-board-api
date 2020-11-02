import mongoose from 'mongoose';
import { AppConstants } from './envs';

mongoose.connection.on('error',function (err) {  
    console.log('Mongoose default connection error: ' + err);
  });

export const connect = async () => {
    return mongoose.connect(AppConstants.databaseUri, 
    { 
        useNewUrlParser: true,
        useUnifiedTopology: true 
    });
}

export const disconnect = async () => {
    mongoose.disconnect();
}