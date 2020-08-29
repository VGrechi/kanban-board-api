import express from 'express';

import ErrorHandler from './middlewares/error-handler';

import IssueRouter from './routes/issue-router';

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
    }
    
    setMiddlewaresAfter(){
        this.app.use(ErrorHandler.errorHandler);
    }

    setRoutes(){
        this.app.use('/issues', IssueRouter);
    }
}

export default new Application().app;