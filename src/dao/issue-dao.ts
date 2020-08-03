import { IIssue } from "../models/issue";

interface IssueDao {

    getNextKey(): string;
    save(issue: IIssue): Promise<IIssue>;
    update(issue: IIssue): Promise<IIssue>;
    findByTitle(title: string): Promise<IIssue[]>;
    findByLabelName(labelName: string): Promise<IIssue[]>;
    findByLabelPriority(labelPriority: number): Promise<IIssue[]>;
    findByCreationDate(creationDate: Date): Promise<IIssue[]>;
    findByStatus(status: string): Promise<IIssue[]>;

}

export default IssueDao;