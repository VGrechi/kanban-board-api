import { ContainerInstance, Service } from 'typedi';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { AppEnvs } from '../config/config';
import UserService from '../service/user-service';
import UserServiceImpl from '../service/impl/user-service-impl';
import { IUser } from '../models/user';

@Service()
export class AuthController {

    private userService: UserService;

    constructor(container: ContainerInstance){
        this.userService = container.get<UserService>(UserServiceImpl);
    }

    async login(req: Request, res: Response, next: NextFunction): Promise<void>{
        this.userService.login(req.body.username, req.body.password)
            .then((user: IUser) => {
                const metadata = user;
                const config = { expiresIn: 300 }
    
                const token = jwt.sign(metadata, AppEnvs.SECRET, config);
    
                const auth = { accessToken: token, ...config }
                res.json(auth);
            })
            .catch(err => next(err));
    }
}