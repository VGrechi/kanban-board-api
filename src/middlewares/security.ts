import { Request, Response, NextFunction } from 'express';
import jwt, { VerifyErrors } from 'jsonwebtoken';

import { AppEnvs } from '../config/config';

export default class Security {

    public static checkAuth(req: Request, res: Response, next: NextFunction): void {
        if(req.url != '/auth'){
            let token: string = req.headers['authorization'] as string;
    
            if (token) {
                token = token.replace('Bearer ', '');
        
                jwt.verify(token, AppEnvs.SECRET, (err: VerifyErrors | null, decoded: object | undefined) => {
                    if (err) res.status(401).send();
                    req.cookies = decoded;
                });
            } else {
                res.status(401).send();
            }
        }

        
        next();
    }
}