import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config({  
    path: process.env.NODE_ENV === "test" ? path.resolve(`${__dirname}/../../.env.test`) : path.resolve(`${__dirname}/../../.env`)
}); 

export const PROJECT = process.env.PROJECT; 