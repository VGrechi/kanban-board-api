import { IIssue } from "../models/issue";

export default interface IssueService {

    saveIssue(issue: IIssue): Promise<IIssue>;
    updateIssue(key:string, issue: IIssue): Promise<IIssue>;
    getIssue(title?: string, creationDate?: Date, labelName?: string, labelPriority?: string, status?: string): Promise<IIssue[]>;
    getIssueByKey(key: string): Promise<IIssue>;

}