import request from "supertest";
import DBTestConnection from "./db-test-connection";
import app from "../../app";
import { IIssue } from "../../models/issue";
import StatusEnum from "../../enums/status-enum";

jest.setTimeout(60 * 1000);

const dbTestConnection = new DBTestConnection();

describe('Issue Router Integration Test Suite', () => {

    beforeAll(async (done) => {
        await dbTestConnection.startTestDatabase();
        done();
    });

    beforeEach(async (done) => {
        await dbTestConnection.cleanUpTestDatabase();
        done();
    });

    afterAll(async (done) => {
        await dbTestConnection.stopTestDatabase();
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
        const getResponse = await request(app).get(`/issues/${issue.key}`);
        expect(getResponse.status).toBe(200);
        issue = getResponse.body;   
        expect(issue.key).toBe('TEST-1');
        expect(issue.labels?.length).toBe(1);
        expect(issue.labels?.find(l => l.name == 'Bug')).toBeDefined();
        done();
    });

    it("[PUT] /issues/{key}", async (done) => {
        // Given
        const postData = { 
            title: "Task for test",
            description: "Mock task for test",
            creationDate: new Date(),
            labels: [
                { name: 'Bug', priority: 'BLOCKER' },
            ]
        }
        const postResponse = await request(app).post('/issues')
                            .send(postData)
                            .set('Content-Type', 'application/json');
        expect(postResponse.status).toBe(201);
        let issue: IIssue = postResponse.body;

        // When
        const putData = {
            ...issue,
            status: StatusEnum.IN_PROGRESS.toString(),
            labels: []
        }
        const putResponse = await request(app).put(`/issues/${issue.key}`)
                            .send(putData)
                            .set('Content-Type', 'application/json');
        expect(putResponse.status).toBe(204);

        // Then
        const getGesponse = await request(app).get(`/issues/${issue.key}`);
        expect(getGesponse.status).toBe(200);
    
        issue = getGesponse.body;
    
        expect(issue.status).toBe(StatusEnum.IN_PROGRESS.toString());
        expect(issue.labels?.length).toBe(0);
        done();
    });
    

    it("[GET] /issues?title={title}", async () => {
        // Given
        await dbTestConnection.insertModel('issues', { 
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
         await dbTestConnection.insertModel('issues', { 
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