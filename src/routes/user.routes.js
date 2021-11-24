import { Router } from 'express';
import AuthController from '../controllers/AuthController.js';
import UserController from '../controllers/UserController.js';

const userRouter = Router();

userRouter.post('/sign-up', UserController.createUser);
userRouter.post('/sign-in', AuthController.authenticate);


export default userRouter;

