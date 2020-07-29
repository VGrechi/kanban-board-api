import Issue from "../models/issue";

interface IssueDao {

    getNextKey(): string;
    save(issue: Issue): void;
    update(issue: Issue): void;
    findByTitle(title: string): Issue[];
    findByLabelName(labelName: string): Issue[];
    findByLabelPriority(labelPriority: number): Issue[];
    findByCreationDate(creationDate: Date): Issue[];
    findByStatus(status: string): Issue[];

}

export default IssueDao;