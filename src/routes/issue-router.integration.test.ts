import request from "supertest";
import app from '../app';
import Issue from "../models/issue";
import StatusEnum from "../enums/status-enum";

describe('Issue Router Integration Test Suite', () => {

    it("[GET] /issues?title={title}", async () => {
        const response = await request(app).get(`/issues?title=Teste`);
        expect(response.status).toBe(200);
        const issues: Issue[] = response.body;
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
        const issues: Issue[] = response.body;
        expect(issues.length).toBe(1);
        expect(issues[0].key).toBe('TEST-1');
        expect(issues[0].labels?.length).toBe(3);
        expect(issues[0].labels?.find(l => l.color == 'red')).toBeDefined();
        expect(issues[0].labels?.find(l => l.color == 'yellow')).toBeDefined();
        expect(issues[0].labels?.find(l => l.color == 'green')).toBeDefined();
    });

    it("[POST] /issues", async () => {
        const data = {
            title: "Test - Creation",
            description: "Mock task for test",
            labels: [
                { color: 'red', name: 'blocker', priority: 1 },
            ]
        }
        let response = await request(app).post('/issues')
                            .send(data)
                            .set('Content-Type', 'application/json');
        expect(response.status).toBe(201);

        response = await request(app).get(`/issues?title=${data.title}`);
        expect(response.status).toBe(200);
        const issues: Issue[] = response.body;
        expect(issues.length).toBe(1);
        expect(issues[0].key).toBe('TEST-2');
        expect(issues[0].labels?.length).toBe(1);
        expect(issues[0].labels?.find(l => l.color == 'red')).toBeDefined();
    });

    it("[PUT] /issues/:key", async () => {
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
    
        const issues: Issue[] = response.body;
        expect(issues.length).toBe(1);
        expect(issues[0].key).toBe('TEST-1');
        expect(issues[0].labels).toBeUndefined();
    });
});