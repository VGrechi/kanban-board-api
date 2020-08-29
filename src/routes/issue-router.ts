import express from 'express';
import Container from 'typedi';
import { IssueController } from '../controller/issue-controller';

class IssueRouter {

    public router: express.Router;
    private issueController: IssueController;

    constructor() {
        this.router = express.Router();
        this.issueController = Container.get(IssueController);

        this.router.post('/', (req, res, next) => this.issueController.createTask(req, res, next))
        this.router.put('/:key', (req, res, next) => this.issueController.updateTask(req, res, next))
        this.router.get('/', (req, res, next) => this.issueController.getTasks(req, res, next))
        this.router.get('/:key', (req, res, next) => this.issueController.getTaskbyId(req, res, next))
    }
}

export default new IssueRouter().router;