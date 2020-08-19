import Container, { ContainerInstance, Service } from 'typedi';
import { Request, Response } from 'express';

import { IIssue } from '../models/issue';
import IssueService from '../service/issue-service';
import IssueServiceImpl from '../service/impl/issue-service-impl';

@Service()
export class IssueController {

    private issueService: IssueService;

    constructor(container: ContainerInstance){
        this.issueService = container.get<IssueService>(IssueServiceImpl);
    }

    public async createTask(req: Request, res: Response): Promise<IIssue>{
        try {
            const issue: IIssue = await this.issueService.saveIssue(req.body);
            res.status(201).send(issue);
            return issue;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    public async updateTask(req: Request, res: Response): Promise<IIssue>{
        try{
            let issue = req.body;
            issue = await this.issueService.updateIssue(issue);
            res.status(200).send(issue);
            return issue;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    public async getTasks(req: Request, res: Response): Promise<IIssue[]>{
        try{
            const title = req.query.title as string;
            const creationDate = req.query.creationDate as string;
            const labelName = req.query.labelName as string;
            const labelPriority = req.query.labelPriority as string;
            const status = req.query.status as string;
            const issues = await this.issueService.getIssue(title, new Date(creationDate), labelName, labelPriority, status);
            res.send(issues);
            return issues;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }
}