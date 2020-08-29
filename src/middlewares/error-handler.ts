import { Request, Response, NextFunction } from "express";
import { isProduction } from '../config/config';

export default class ErrorHandler {

    public static errorHandler(err: Error, req: Request, res: Response, next: NextFunction): void {
        let error: any = { 
            message: err.message,
            status: 500,
            path: req.url
        };

        if(!isProduction()) error = { ...error, stack: err.stack} 

        res.status(500);
        res.send(error);
        next();
    }

}