import StatusEnum from "../enums/status-enum";

class IssueStatusValidator {

    static validate(status: string, newStatus: string){
        const invalidStatusTransaction: string = "Invalid status trasition.";
        const invalidStatus: string = "Invalid status.";
        
        if(!(newStatus in StatusEnum)){
            throw new Error(invalidStatus);
        }

        switch(status){
            case StatusEnum.TO_DO: 
                break;
            
            case StatusEnum.IN_PROGRESS: 
                if(newStatus == StatusEnum.IN_PROGRESS || newStatus == StatusEnum.TESTING || newStatus == StatusEnum.DONE){
                   break;
                } else {
                    throw new Error(invalidStatusTransaction);
                }
        
            case StatusEnum.TESTING:
                if(newStatus == StatusEnum.TESTING || newStatus == StatusEnum.DONE){
                    break;
                } else {
                    throw new Error(invalidStatusTransaction);
                }

            default: 
                throw new Error(invalidStatusTransaction);
        }
    }
}

export default IssueStatusValidator;