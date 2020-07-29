import Label from './label';

interface Issue {

    key:            string;
    title:          string;
    description:    string;
    creationDate:   Date;
    status:         string;
    completionDate?: Date;
    labels?:         Label[];

}

export default Issue;