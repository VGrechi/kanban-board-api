import request from "supertest";
import DBTestManager from "./db-test-manager";
import app from "../../app";
import { IIssue } from "../../models/issue";
import StatusEnum from "../../enums/status-enum";

jest.setTimeout(60 * 1000);

const dbTestManager = new DBTestManager();

describe('Issue Router Integration Test Suite', () => {

    beforeAll(async (done) => {
        await dbTestManager.startTestDatabase();
        done();
    });

    beforeEach(async (done) => {
        await dbTestManager.cleanUpTestDatabase();
        done();
    });

    afterAll(async (done) => {
        await dbTestManager.stopTestDatabase();
        done();
    });

    it("[POST] /issues", async (done) => {
        // Given

        // When
        const data = { 
            title: "Task for test",
            description: "Mock task for test",
            creationDate: new Date(),
            labels: [
                { name: 'Bug', priority: 'BLOCKER' },
            ]
        }
        const postResponse = await request(app).post('/issues')
                            .send(data)
                            .set('Content-Type', 'application/json');
        expect(postResponse.status).toBe(201);
        let issue: IIssue = postResponse.body;

        // Then
        issue = await dbTestManager.findModel('issues', { key: issue.key });
        expect(issue.key).toBe('TEST-1');
        expect(issue.labels?.length).toBe(1);
        expect(issue.labels?.find(l => l.name == 'Bug')).toBeDefined();
       
        done();
    });

    it("[PUT] /issues/{key}", async (done) => {
        // Given
        await dbTestManager.insertModel('issues', { 
            key: 'TEST-1',
            title: "Task for test",
            description: "Mock task for test",
            creationDate: new Date(),
            status: StatusEnum.TO_DO.toString(),
            labels: [
                { name: 'Bug', priority: 'BLOCKER' },
            ]
        });

        let issueModel = await dbTestManager.findModel('issues', { key: 'TEST-1' });

        // When
        const putData = {
            ...issueModel,
            status: StatusEnum.IN_PROGRESS.toString(),
            labels: []
        }
        const putResponse = await request(app).put(`/issues/TEST-1`)
                            .send(putData)
                            .set('Content-Type', 'application/json');
        expect(putResponse.status).toBe(204);

        // Then
        issueModel = await dbTestManager.findModel('issues', { key: 'TEST-1' });
        expect(issueModel.status).toBe(StatusEnum.IN_PROGRESS.toString());
        expect(issueModel.labels?.length).toBe(0);

        done();
    });
    

    it("[GET] /issues?title={title}", async () => {
        // Given
        await dbTestManager.insertModel('issues', { 
            title: "Task for title test",
            description: "Mock task for test",
            creationDate: new Date(),
            labels: []
        });

        // When
        const response = await request(app).get(`/issues?title=Task for title test`);

        // Then
        expect(response.status).toBe(200);
        const issues: IIssue[] = response.body;
        expect(issues.length).toBe(1);
        expect(issues[0].title).toBe('Task for title test');
        expect(issues[0].labels?.length).toBe(0);
    });

    it("[GET] /issues?labelName={labelName}", async () => {
         // Given
         await dbTestManager.insertModel('issues', { 
            title: "Task for title test",
            description: "Mock task for test",
            creationDate: new Date(),
            labels: [
                { name: 'Bug', priority: 'BLOCKER' },
            ]
        });

        // When
        const response = await request(app).get(`/issues?labelName=Bug`);

        // Then
        expect(response.status).toBe(200);
        const issues: IIssue[] = response.body;
        expect(issues.length).toBe(1);
        expect(issues[0].labels?.length).toBe(1);
        expect(issues[0].labels?.find(l => l.name == 'Bug')).toBeDefined();
    });

    
});