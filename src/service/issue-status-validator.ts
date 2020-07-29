import StatusEnum from "../enums/status-enum";

class IssueStatusValidator {

    static validate(status: string, newStatus: string){
        const invalidStatusTransaction: string = "Invalid status trasition.";
        const invalidStatus: string = "Invalid status.";
        
        if(!(newStatus in StatusEnum)){
            throw new Error(invalidStatus);
        }

        switch(status){
            case StatusEnum.TO_DO.toString(): 
                break;
            
            case StatusEnum.IN_PROGRESS.toString(): 
                if(newStatus == StatusEnum.IN_PROGRESS.toString() || newStatus == StatusEnum.TESTING.toString() || newStatus == StatusEnum.DONE.toString()){
                   break;
                } else {
                    throw new Error(invalidStatusTransaction);
                }
        
            case StatusEnum.TESTING.toString():
                if(newStatus == StatusEnum.TESTING.toString() || newStatus == StatusEnum.DONE.toString()){
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