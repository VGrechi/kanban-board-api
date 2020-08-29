import { Container, Service } from 'typedi';
import IssueService from '.././issue-service';
import IssueStatusValidator from '.././issue-status-validator';
import IssueDao from '../../dao/issue-dao';
import IssueDaoImpl from '../../dao/issue-dao-impl';
import StatusEnum from '../../enums/status-enum';
import { IIssue } from '../../models/issue';
import { PROJECT } from '../../config/config';

export default class IssueServiceImpl implements IssueService {

    private issueDao: IssueDao;

    constructor(){
        this.issueDao = Container.get<IssueDao>(IssueDaoImpl);
    }
    
    async saveIssue(issue: IIssue): Promise<IIssue> {
        issue.creationDate = new Date();
        issue.status = StatusEnum.TO_DO.toString();

        const lastIssue = await this.issueDao.findLast();
        issue['key'] = this.getNextKey(lastIssue && lastIssue.key); 
        return await this.issueDao.save(issue);
    }

    async updateIssue(key: string, issue: IIssue): Promise<IIssue> {
        let savedIssue = await this.getIssueByKey(key);
        if(!savedIssue) throw Error('Issue not found');

        IssueStatusValidator.validate(savedIssue.status, issue.status);

        if(issue.status == StatusEnum.DONE.toString()){
            issue.completionDate = new Date(); 
        }

        return await this.issueDao.update(issue);
    }

    async getIssue(title?: string, creationDate?: Date, labelName?: string, labelPriority?: string, status?: string): Promise<IIssue[]> {
        if(title){
            return await this.issueDao.findByTitle(title);
        }

        if(labelName){
            return await this.issueDao.findByLabelName(labelName);
        }

        if(labelPriority){
            return await this.issueDao.findByLabelPriority(labelPriority);
        }

        if(creationDate){
            return await this.issueDao.findByCreationDate(creationDate);
        }

        if(status){
            return await this.issueDao.findByStatus(status);
        }
        
        return await this.issueDao.findAll();
    }

    async getIssueByKey(key: string): Promise<IIssue> {
        return await this.issueDao.findByKey(key);
    }

    private getNextKey(key: string | undefined): string {
        if(key){
            const splited = key.split('-');
            const next = Number(splited[1]) + 1;
            return `${PROJECT}-${next}`;
        }else{
            return `${PROJECT}-1`;
        }
    }

}