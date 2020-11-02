import express from 'express';

import Security from './middlewares/security';
import helmet from 'helmet';

import IssueRouter from './routes/issue-router';
import AuthRouter from './routes/auth-router';

import ErrorHandler from './middlewares/error-handler';

class Application {

    public app: express.Application;

    constructor(){
        this.app =  express();
        this.setMiddlewaresBefore();
        this.setRoutes();
        this.setMiddlewaresAfter();
    }

    setMiddlewaresBefore(){
        this.app.use(express.json());
        this.app.use(helmet());
        //this.app.use(Security.checkAuth);
    }
    
    setRoutes(){
        this.app.use('/auth', AuthRouter);
        this.app.use('/issues', IssueRouter);
    }
    
    setMiddlewaresAfter(){
        this.app.use(ErrorHandler.errorHandler);
    }

}

export default new Application().app;