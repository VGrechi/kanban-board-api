import mongoose, { Schema, Document } from "mongoose";
import PriorityEnum from "../enums/priority-enum.ts";

export interface IIssue extends Document {
    key?: string;
    title: string;
    description: string;
    creationDate: Date;
    status: string;
    completionDate?: Date;
    labels?: ILabel[];
}

export interface ILabel extends Document {
    name: string,
    priority: PriorityEnum
}

const LabelSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        priority: {
            type: PriorityEnum,
            required: true
        }
    }
);

const IssueSchema: Schema = new Schema(
    {
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
        },
        creationDate: {
            type: Date,
            required: true
        },
        status: {
            type: String,
            required: true
        },
        completionDate: {
            type: Date,
            required: false
        },
        labels: [LabelSchema]
    },
    {
        timestamps: false,
        collection: 'issues'
    }
);

LabelSchema.methods.toJSON = function castToJSON() {
    const obj = this.toObject()
    delete obj.__v
    return obj
}

IssueSchema.methods.toJSON = function castToJSON() {
    const obj = this.toObject()
    delete obj.__v
    return obj
}

export const LabelModel = mongoose.model<ILabel>('Label', LabelSchema);
export const IssueModel = mongoose.model<IIssue>('Issue', IssueSchema);