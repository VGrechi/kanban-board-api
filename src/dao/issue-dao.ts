import { IIssue } from "../models/issue";

interface IssueDao {

    save(issue: IIssue): Promise<IIssue>;
    update(issue: IIssue): Promise<IIssue>;
    findByKey(key: string): Promise<IIssue>;
    findByTitle(title: string): Promise<IIssue[]>;
    findByLabelName(labelName: string): Promise<IIssue[]>;
    findByLabelPriority(labelPriority: string): Promise<IIssue[]>;
    findByCreationDate(creationDate: Date): Promise<IIssue[]>;
    findByStatus(status: string): Promise<IIssue[]>;
    findLast(): Promise<IIssue>;
    findAll(): Promise<IIssue[]>;

}

export default IssueDao;