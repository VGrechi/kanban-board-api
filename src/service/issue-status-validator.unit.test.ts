import IssueStatusValidator from "./issue-status-validator";
import StatusEnum from "../enums/status-enum";

describe('Issue Status Validator Unit Test Suite', () => {
    it('Unknown Status', () => {
         try{
            IssueStatusValidator.validate('', 'UNKNOWN');
        }catch(e){
            expect(e.message).toBe("Invalid status.");
        }
    });

    it('Valid Status Transiction: TO DO => IN PROGRESS', () => {
        IssueStatusValidator.validate(StatusEnum.TO_DO.toString(), StatusEnum.IN_PROGRESS.toString());
    });

    it('Valid Status Transiction: TO DO => TESTING', () => {
        IssueStatusValidator.validate(StatusEnum.TO_DO.toString(), StatusEnum.TESTING.toString());
    });

    it('Valid Status Transiction: TO DO => DONE', () => {
        IssueStatusValidator.validate(StatusEnum.TO_DO.toString(), StatusEnum.DONE.toString());
    });

    it('Valid Status Transiction: IN_PROGRESS => TESTING', () => {
        IssueStatusValidator.validate(StatusEnum.IN_PROGRESS.toString(), StatusEnum.TESTING.toString());
    });

    it('Valid Status Transiction: IN_PROGRESS => DONE', () => {
        IssueStatusValidator.validate(StatusEnum.IN_PROGRESS.toString(), StatusEnum.DONE.toString());
    });

    it('Valid Status Transiction: TESTING => DONE', () => {
        IssueStatusValidator.validate(StatusEnum.TESTING.toString(), StatusEnum.DONE.toString());
    });

    it('Invalid Status Transiction: IN_PROGRESS => TO DO', () => {
        try{
            IssueStatusValidator.validate(StatusEnum.IN_PROGRESS.toString(), StatusEnum.TO_DO.toString());
        }catch(e){
            expect(e.message).toBe("Invalid status trasition.");
        }
    });

    it('Invalid Status Transiction: TESTING => TO DO', () => {
        try{
            IssueStatusValidator.validate(StatusEnum.TESTING.toString(), StatusEnum.TO_DO.toString());
        }catch(e){
            expect(e.message).toBe("Invalid status trasition.");
        }
    });

    it('Invalid Status Transiction: TESTING => IN PROGRESS', () => {
        try{
            IssueStatusValidator.validate(StatusEnum.TESTING.toString(), StatusEnum.IN_PROGRESS.toString());
        }catch(e){
            expect(e.message).toBe("Invalid status trasition.");
        }
    });

    it('Invalid Status Transiction: DONE => TO DO', () => {
        try{
            IssueStatusValidator.validate(StatusEnum.DONE.toString(), StatusEnum.TO_DO.toString());
        }catch(e){
            expect(e.message).toBe("Invalid status trasition.");
        }
    });

    it('Invalid Status Transiction: DONE => IN PROGRESS', () => {
        try{
            IssueStatusValidator.validate(StatusEnum.DONE.toString(), StatusEnum.IN_PROGRESS.toString());
        }catch(e){
            expect(e.message).toBe("Invalid status trasition.");
        }
    });

    it('Invalid Status Transiction: DONE => TESTING', () => {
        try{
            IssueStatusValidator.validate(StatusEnum.DONE.toString(), StatusEnum.TESTING.toString());
        }catch(e){
            expect(e.message).toBe("Invalid status trasition.");
        }
    });

  
});