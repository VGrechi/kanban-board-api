import express from 'express';
import IssueService from '../service/issue-service';
import IssueServiceImpl from '../service/issue-service-impl';

class IssueRouter {

    public router: express.Router;
    private issueService: IssueService;

    constructor(){
        this.router = express.Router();
        this.issueService = new IssueServiceImpl();

        this.router.get('/', (req, res) => {
            const title = req.query.title as string;
            const creationDate = req.query.creationDate as string;
            const labelName = req.query.labelName as string;
            const labelPriority = req.query.labelPriority as string;
            const status = req.query.status as string;
            const issues = this.issueService.getIssue(title, new Date(creationDate), labelName, Number.parseInt(labelPriority), status);
            res.send(issues);
        })

        this.router.post('/', (req, res) => {
            let issue = req.body;
            issue = this.issueService.saveIssue(issue);
            res.status(201).send(issue);
        })

        this.router.put('/:key', (req, res) => {
            let issue = req.body;
            issue = this.issueService.updateIssue(issue);
            res.status(204).send(issue);
        })
    }
}

export default new IssueRouter().router;