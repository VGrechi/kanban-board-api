import express from 'express';
import Container from 'typedi';
import { IssueController } from '../controller/issue-controller';

class IssueRouter {

    public router: express.Router;
    private issueController: IssueController;

    constructor() {
        this.router = express.Router();
        this.issueController = Container.get(IssueController);

        this.router.post('/', (req, res) => this.issueController.createTask(req, res))
        this.router.put('/:key', (req, res) => this.issueController.updateTask(req, res))
        this.router.get('/', (req, res) => this.issueController.getTasks(req, res))
    }
}

export default new IssueRouter().router;