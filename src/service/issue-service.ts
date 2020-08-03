import IssueRouter from "../routes/issue-router";

import Issue from '../dto/issue';
import Label from '../dto/label';

interface IssueService {

    saveIssue(issue: Issue): Issue;
    updateIssue(issue: Issue): void;
    getIssue(title?: string, creationDate?: Date, labelName?: string, labelPriority?: number, status?: string): Issue[];
    
}

export default IssueService;