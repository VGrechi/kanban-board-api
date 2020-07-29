import IssueService from './issue-service';
import IssueStatusValidator from './issue-status-validator';
import IssueDao from '../dao/issue-dao';
import IssueDaoImpl from '../dao/issue-dao-impl';
import StatusEnum from '../enums/status-enum';
import Issue from '../models/issue';

class IssueServiceImpl implements IssueService {

    private issueDao: IssueDao;

    constructor(){
        this.issueDao = new IssueDaoImpl();
    }
    
    saveIssue(issue: Issue): Issue {
        issue.creationDate = new Date();
        issue.status = StatusEnum.TO_DO.toString();

        const nextKey = this.issueDao.getNextKey();
        issue['key'] = nextKey;
        this.issueDao.save(issue);
        return issue;
    }

    updateIssue(issue: Issue): void {
        let savedIssues = this.getIssue(issue.title);
        IssueStatusValidator.validate(savedIssues[0].status, issue.status);
        if(issue.status == StatusEnum.DONE.toString()){
            issue.completionDate = new Date();
        }

        this.issueDao.update(issue);
    }

    getIssue(title?: string, creationDate?: Date, labelName?: string, labelPriority?: number, status?: string): Issue[] {
        if(title){
            return this.issueDao.findByTitle(title);
        }

        if(labelName){
            return this.issueDao.findByLabelName(labelName);
        }

        if(labelPriority){
            return this.issueDao.findByLabelPriority(labelPriority);
        }

        if(creationDate){
            return this.issueDao.findByCreationDate(creationDate);
        }

        if(status){
            return this.issueDao.findByStatus(status);
        }
        
        return [];
    }

}

export default IssueServiceImpl;