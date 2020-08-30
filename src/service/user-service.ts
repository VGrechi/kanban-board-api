import { IUser } from "../models/user";

export default interface UserService {

    login(username: string, password: string): Promise<IUser>;
}