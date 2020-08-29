import Container, { ContainerInstance, Service } from 'typedi';
import { Request, Response, NextFunction } from 'express';

import { IIssue } from '../models/issue';
import IssueService from '../service/issue-service';
import IssueServiceImpl from '../service/impl/issue-service-impl';

@Service()
export class IssueController {

    private issueService: IssueService;

    constructor(container: ContainerInstance){
        this.issueService = container.get<IssueService>(IssueServiceImpl);
    }

    public async createTask(req: Request, res: Response, next: NextFunction): Promise<void>{ 
        this.issueService.saveIssue(req.body)
            .then((issue: IIssue) => res.status(201).send(issue))
            .catch(err => next(err));
    }

    public async updateTask(req: Request, res: Response, next: NextFunction): Promise<void> {
        let key = req.params.key;
        let issue = req.body;
        this.issueService.updateIssue(key, issue)
            .then(() => res.status(204).send())
            .catch(err => next(err));
    }

    public async getTasks(req: Request, res: Response, next: NextFunction): Promise<void> {
        let title = req.query.title as string;
        let creationDate = req.query.creationDate ? new Date(req.query.creationDate as string) : undefined;
        let labelName = req.query.labelName as string;
        let labelPriority = req.query.labelPriority as string;
        let status = req.query.status as string;
        this.issueService.getIssue(title, creationDate, labelName, labelPriority, status)
            .then((issues: IIssue[]) => res.status(200).send(issues))
            .catch(err => next(err));
        
    }

    public async getTaskbyId(req: Request, res: Response, next: NextFunction): Promise<void> {
        this.issueService.getIssueByKey(req.params.key)
            .then((issue: IIssue) => res.status(200).send(issue))
            .catch(err => next(err));
    }
}