import { IIssue } from "../models/issue";

export default interface IssueService {

    saveIssue(issue: IIssue): Promise<IIssue>;
    updateIssue(issue: IIssue): Promise<IIssue>;
    getIssue(title?: string, creationDate?: Date, labelName?: string, labelPriority?: string, status?: string): Promise<IIssue[]>;
    
}