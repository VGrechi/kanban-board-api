import express from 'express';

import IssueRouter from './routes/issue-router';

import DBConnection from './config/db-connection';

class Application {

    public app: express.Application;

    constructor(){
        this.app =  express();
        this.setMiddlewares();
        this.setRoutes();
        this.setDBConnection();
    }

    setMiddlewares(){
        this.app.use(express.json());
    }

    setRoutes(){
        this.app.use('/issues', IssueRouter);
    }

    setDBConnection(){
        new DBConnection();
    }
}

export default new Application().app;