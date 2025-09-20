import { Router } from 'express';
import { container } from 'tsyringe';
import { UserController } from '../controllers/userController';

const userRouter = Router();
const userController = container.resolve(UserController);
userRouter.post('/login', userController.authenticate.bind(userController)); 
userRouter.get('/getbyid/:id', userController.getUserById.bind(userController));
userRouter.get('/authorize/:token', userController.authorize.bind(userController));
userRouter.get('/get-features-user/:id', userController.getFunctionsByUser.bind(userController));
userRouter.post('/lock-user', userController.lockUser.bind(userController));
userRouter.post('/create', userController.createUser.bind(userController));
userRouter.post('/update', userController.updateUser.bind(userController));
userRouter.post('/delete', userController.deleteUser.bind(userController));
userRouter.post('/search', userController.searchUser.bind(userController));
userRouter.post('/change-password', userController.changePassword.bind(userController));
userRouter.post('/reset-password', userController.resetPassword.bind(userController));
userRouter.post('/reset-password-by-admin', userController.resetPasswordByAdmin.bind(userController));
export default userRouter;