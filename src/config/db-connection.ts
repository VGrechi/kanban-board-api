import mongoose from 'mongoose';

mongoose.connection.on('error',function (err) {  
    console.log('Mongoose default connection error: ' + err);
  });

export const connect = async () => {
    return mongoose.connect('mongodb://localhost:27017/kanbanboard', 
    { 
        useNewUrlParser: true,
        useUnifiedTopology: true 
    });
}

export const disconnect = async () => {
    mongoose.disconnect();
}