import request from "supertest";
import app from '../app';
import { mocked } from 'ts-jest/utils'

jest.mock('../service/issue-service-impl');
import IssueServiceImpl from '../service/issue-service-impl';

describe('Issue Router Unit Test Suite', () => {
    const issueMock = {
        key: 'TEST-001',
        title: "Task for test - Update",
        description: "Mock task for test",
        creationDate: new Date(),
        status: 'TO DO'
    };

    const issuesMock = [ issueMock ];

    beforeAll(() => {
        const mockedGetIssue = mocked(IssueServiceImpl.prototype.getIssue, true);
        mockedGetIssue.mockReturnValue(issuesMock);

        const mockedSaveIssue = mocked(IssueServiceImpl.prototype.saveIssue, true);
        mockedSaveIssue.mockReturnValue(issueMock);
    });
    
    it("[GET] /issues", async () => {
        const response = await request(app).get('/issues');
    
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(1);
    });

    it("[POST] /issues", async () => {
        const data = {
            key: '1',
            title: "Task for test - Creation",
            description: "Mock task for test"
        }
        const response = await request(app).post('/issues')
                            .send(data)
                            .set('Content-Type', 'application/json');

        expect(response.status).toBe(201);
    });

    it("[PUT] /issues/:key", async () => {
        const data = {
            key: '1',
            title: "Task for test - Update",
            description: "Mock task for test"
        }
        const response = await request(app).put(`/issues/${data.key}`)
                            .send(data)
                            .set('Content-Type', 'application/json');

        expect(response.status).toBe(204);
    });
});

