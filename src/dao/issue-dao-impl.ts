import { connect, disconnect } from '../config/db-connection';
import IssueDao from "./issue-dao";
import { IssueModel, IIssue } from "../models/issue";

class IssueDaoImpl implements IssueDao {

    async save(issue: IIssue): Promise<IIssue> {
        await connect();
        issue = await IssueModel.create(issue);
        disconnect();
        return issue;
    }

    async update(issue: IIssue): Promise<IIssue> {
        await connect();
        issue = await IssueModel.updateOne({ 'key': issue.key }, issue);
        disconnect();
        return issue;
    }

    async findByKey(key: string): Promise<IIssue> {
        await connect();
        const issues = await IssueModel.find({ 'key': key }).limit(1);
        disconnect();
        return issues[0];
    }

    async findByTitle(title: string): Promise<IIssue[]> {
        await connect();
        const issues = await IssueModel.find({ 'title': title });
        disconnect();
        return issues;
    }

    async findByLabelName(labelName: string): Promise<IIssue[]> {
        await connect();
        const issues = await IssueModel.find({ 'labels.name': labelName });
        disconnect();
        return issues;
    }

    async findByLabelPriority(labelPriority: string): Promise<IIssue[]> {
        await connect();
        const issues = await IssueModel.find({ 'labels.priority': labelPriority });
        disconnect();
        return issues;
    }

    async findByCreationDate(creationDate: Date): Promise<IIssue[]> {
        await connect();
        const issues = await IssueModel.find({ 'creationDate': creationDate });
        disconnect();
        return issues;
    }
 
    async findByStatus(status: string): Promise<IIssue[]> {
        await connect();
        const issues = await IssueModel.find({ 'status': status });
        disconnect();
        return issues;
    }

    async findLast(): Promise<IIssue> {
        await connect();
        const lastIssue = await IssueModel.find({}).sort({ 'key': -1 }).limit(1);
        disconnect();
        return lastIssue[0];
    }

    async findAll(): Promise<IIssue[]> {
        await connect();
        const lastIssues= await IssueModel.find({}).sort({ 'key': 1 });
        disconnect();
        return lastIssues;
    }

}

export default IssueDaoImpl;