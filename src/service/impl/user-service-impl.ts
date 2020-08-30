import UserService from "../user-service";


import { IUser } from "../../models/user";
import { Service } from "typedi";

@Service()
export default class UserServiceImpl implements UserService {

    async login(username: string, password: string): Promise<IUser> {
        if(username == 'victor' && password == '123'){
            const user = {
                username: 'victor',
                password: '123',
                roles: ['ADMIN']
            }
            return Promise.resolve(user as IUser);
        } else {
            return Promise.reject();
        }
    }

}