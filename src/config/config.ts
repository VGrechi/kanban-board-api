import * as dotenv from "dotenv";

dotenv.config();
dotenv.config({  
    path: process.env.NODE_ENV === "test" ? `${__dirname}/../../.env.test` : `${__dirname}/../../.env`
});

export const PROJECT = process.env.PROJECT;