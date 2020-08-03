import mongoose from 'mongoose';
import IssueModel from '../models/issue';

class DBConnection {
    
    constructor() {
        mongoose.connect('mongodb://localhost:27017/kanbanboard', { useNewUrlParser: true }, () => console.log('COnectado ao mongoDB'));
    }
}

export default DBConnection;