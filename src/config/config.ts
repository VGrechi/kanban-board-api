import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config({  
    path: process.env.NODE_ENV === "test" ? path.resolve(`${__dirname}/../../.env.test`) : path.resolve(`${__dirname}/../../.env`)
}); 

export const AppEnvs = {
    PROJECT: process.env.PROJECT || 'NODE',
    NODE_ENV: process.env.NODE_ENV || 'production',
    SECRET: process.env.SECRET || 'secret',
    isProductionEnv: () => process.env.NODE_ENV == 'production',
}