import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
    username: string;
    password: string;
    roles: string[];
}

const UserSchema: Schema = new Schema(
    {
        username: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        roles: [{
            type: String,
            required: false
        }]
    },
    {
        timestamps: false,
        collection: 'users'
    }
);


UserSchema.methods.toJSON = function castToJSON() {
    const obj = this.toObject()
    delete obj.__v
    return obj
}

export const UserModel = mongoose.model<IUser>('User', UserSchema);