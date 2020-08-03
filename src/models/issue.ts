import mongoose, { Schema, Document } from 'mongoose';

export interface IIssue extends Document {
    key:            string;
    title:          string;
    description:    string;
    //creationDate:   Date;
    //status:         string;
    //completionDate?: Date;
}

const IssueSchema: Schema = new Schema({
    key: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    }
});

export default mongoose.model<Issue>('Issue', IssueSchema);