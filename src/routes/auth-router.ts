import express from 'express';
import Container from 'typedi';
import { AuthController } from '../controller/auth-controller';

class AuthRouter {

    public router: express.Router;
    private authController: AuthController;

    constructor() {
        this.router = express.Router();
        this.authController = Container.get(AuthController);

        this.router.post('/', this.authController.login)
    }
}

export default new AuthRouter().router;