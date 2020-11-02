import { StringLiteral } from "typescript";

interface AppConstants {
    databaseUri: string;
}

export const AppConstants: AppConstants = {
    databaseUri: process.env.MONGO_URL || ''
}