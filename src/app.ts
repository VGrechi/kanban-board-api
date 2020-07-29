import express from 'express';

import IssueRouter from './routes/issue-router';

class Application {

    public app: express.Application;

    constructor(){
        this.app =  express();
        this.setMiddlewares();
        this.setRoutes();
    }

    setMiddlewares(){
        this.app.use(express.json());
    }

    setRoutes(){
        this.app.use('/issues', IssueRouter);
    }
}

export default new Application().app;