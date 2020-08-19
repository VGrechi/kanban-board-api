import request from "supertest";
import { startTestDatabase, stopTestDatabase, cleanUpTestDatabase } from "./db-test-connection";
import app from "../../app";
import { IIssue } from "../../models/issue";

describe('Issue Router Integration Test Suite', () => {

    beforeAll(async () => await startTestDatabase());

    beforeEach(async (done) => {
        await cleanUpTestDatabase();
        done();
    });

    afterAll(async (done) => {
        await stopTestDatabase();
        done();
    });

    it("[POST] /issues", async () => {
        const data = { 
            title: "Task for test",
            description: "Mock task for test",
            creationDate: new Date(),
            labels: [
                { name: 'Bug', priority: 'BLOCKER' },
            ]
        }
        let response = await request(app).post('/issues')
                            .send(data)
                            .set('Content-Type', 'application/json');
        expect(response.status).toBe(201);

        response = await request(app).get(`/issues?title=${data.title}`);
        expect(response.status).toBe(200);
        const issues: IIssue[] = response.body;
        console.table(issues);
        expect(issues.length).toBe(1);
        expect(issues[0].key).toBe('TEST-1');
        expect(issues[0].labels?.length).toBe(1);
        expect(issues[0].labels?.find(l => l.name == 'Bug')).toBeDefined();
    });

    /* it("[PUT] /issues/:key", async () => {
        const data = {
            key: 'TEST-1',
            title: "Teste",
            description: "Mock task for test",
            status: StatusEnum.IN_PROGRESS.toString()
        }
        let response = await request(app).put(`/issues/${data.key}`)
                            .send(data)
                            .set('Content-Type', 'application/json');
        expect(response.status).toBe(204);

        response = await request(app).get(`/issues?title=${data.title}`);
        expect(response.status).toBe(200);
    
        const issues: IIssue[] = response.body;
        expect(issues.length).toBe(1);
        expect(issues[0].key).toBe('TEST-1');
        expect(issues[0].labels).toBeUndefined();
    });

    it("[GET] /issues?title={title}", async () => {
        const response = await request(app).get(`/issues?title=Teste`);
        expect(response.status).toBe(200);
        const issues: IIssue[] = response.body;
        expect(issues.length).toBe(1);
        expect(issues[0].key).toBe('TEST-1');
        expect(issues[0].labels?.length).toBe(3);
        expect(issues[0].labels?.find(l => l.color == 'red')).toBeDefined();
        expect(issues[0].labels?.find(l => l.color == 'yellow')).toBeDefined();
        expect(issues[0].labels?.find(l => l.color == 'green')).toBeDefined();
    });

    it("[GET] /issues?labelName={labelName}", async () => {
        const response = await request(app).get(`/issues?labelName=blocker`);
        expect(response.status).toBe(200);
        const issues: IIssue[] = response.body;
        expect(issues.length).toBe(1);
        expect(issues[0].key).toBe('TEST-1');
        expect(issues[0].labels?.length).toBe(3);
        expect(issues[0].labels?.find(l => l.color == 'red')).toBeDefined();
        expect(issues[0].labels?.find(l => l.color == 'yellow')).toBeDefined();
        expect(issues[0].labels?.find(l => l.color == 'green')).toBeDefined();
    }); */

    
});