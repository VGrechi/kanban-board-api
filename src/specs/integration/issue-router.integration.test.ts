import request from "supertest";
import DBTestConnection, { startTestDatabase, stopTestDatabase, cleanUpTestDatabase } from "./db-test-connection";
import app from "../../app";
import { IIssue } from "../../models/issue";
import { doesNotMatch } from "assert";
import StatusEnum from "../../enums/status-enum";

jest.setTimeout(60 * 1000);

const dbTestConnection = new DBTestConnection();



describe('Issue Router Integration Test Suite', () => {

    beforeAll(async () => await dbTestConnection.startTestDatabase());

    beforeEach(async (done) => {
        await dbTestConnection.cleanUpTestDatabase();
        done();
    });

    afterAll(async (done) => {
        await dbTestConnection.stopTestDatabase();
        done();
    });

    /* it("[POST] /issues", async (done) => {
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

        response = await request(app).get(`/issues/TEST-1`);
        expect(response.status).toBe(200);
        const issues: IIssue[] = response.body;
   
        expect(issues.length).toBe(1);
        expect(issues[0].key).toBe('TEST-1');
        expect(issues[0].labels?.length).toBe(1);
        expect(issues[0].labels?.find(l => l.name == 'Bug')).toBeDefined();
        done();
    }); */

    it("[PUT] /issues/:key", async (done) => {
        const postData = { 
            title: "Task for test",
            description: "Mock task for test",
            creationDate: new Date(),
            labels: [
                { name: 'Bug', priority: 'BLOCKER' },
            ]
        }
        let response = await request(app).post('/issues')
                            .send(postData)
                            .set('Content-Type', 'application/json');
        expect(response.status).toBe(201);

        const putData = {
            ...postData,
            status: StatusEnum.IN_PROGRESS.toString(),
            labels: []
        }
        response = await request(app).put(`/issues/TEST-1`)
                            .send(putData)
                            .set('Content-Type', 'application/json');
        expect(response.status).toBe(200);

        response = await request(app).get(`/issues/TEST-1`);
        expect(response.status).toBe(200);
    
        const issues: IIssue[] = response.body;
    
        expect(issues.length).toBe(1);
        expect(issues[0].key).toBe('TEST-1');
        expect(issues[0].labels).toBeUndefined();
        done();
    });
    /* 

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