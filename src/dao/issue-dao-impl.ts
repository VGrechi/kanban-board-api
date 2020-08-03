import mongoose, { Mongoose } from 'mongoose';


import IssueDao from "./issue-dao";
import IssueModel, { IIssue } from "../models/issue";

import { PROJECT } from '../config/config';
import StatusEnum from "../enums/status-enum";

class IssueDaoImpl implements IssueDao {

    //private issueModel: Issue;

    /* constructor() {
        this.issueModel = mongoose.model<Issue>('Issue');
    } */

   /*  private issueList: Issue[] = [{
        key: `${PROJECT}-1`,
        title: 'Teste',
        description: '',
        creationDate: new Date(),
        status: StatusEnum.TO_DO.toString(),
        labels: [
            { color: 'red', name: 'blocker', priority: 1 },
            { color: 'yellow', name: 'major', priority: 2 },
            { color: 'green', name: 'minor', priority: 3 },
        ]
    }]; */

    getNextKey(): string {
        this.issueList.sort((a, b) => {
            if(a.key < b.key) return 1;
            else return -1;
        });
        let id: number = Number.parseInt(this.issueList[0].key.split("-")[1]);
        return `${PROJECT}-${id + 1}`;
    }

    save(issue: IIssue): Promise<IIssue> {
        //this.issueList.push(issue);
        IssueModel.create({
            key: `${PROJECT}-1`,
            title: 'Teste',
            description: ''
        });
    }

    update(issue: Issue): void {
        let index = this.issueList.findIndex(i => i.key == issue.key);
        this.issueList[index] = issue;
    }

    findByTitle(title: string): Issue[] {
        const issues = this.issueList.filter(i => i.title == title);
        return issues as Issue[];
    }

    findByLabelName(labelName: string): Issue[] {
        const issues = this.issueList.filter(i => {
            return i.labels?.find(l => l.name == labelName) != undefined
        });
        return issues as Issue[];
    }

    findByLabelPriority(labelPriority: number): Issue[] {
        const issues = this.issueList.filter(i => {
            return i.labels?.find(l => l.priority == labelPriority) != undefined
        });
        return issues as Issue[];
    }

    findByCreationDate(creationDate: Date): Issue[] {
        const issues = this.issueList.filter(i => i.creationDate >= creationDate);
        return issues as Issue[];
    }
 
    findByStatus(status: string): Issue[] {
        const issues = this.issueList.filter(i => i.status == status);
        return issues as Issue[];
    }

}

export default IssueDaoImpl;