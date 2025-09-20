import { Router } from 'express';
import { container } from 'tsyringe';
import { ActionController } from '../controllers/actionController';
import { RoleFunctionController } from '../controllers/roleFunctionController';
import { UserRoleController } from '../controllers/userRoleController';
import { authenticate } from '../middlewares/authMiddleware';

const userRoleRouter = Router();
const urController = container.resolve(UserRoleController);
userRoleRouter.post('/create', urController.createUserRole.bind(urController));
userRoleRouter.post('/delete', urController.deleteUserRole.bind(urController));
userRoleRouter.get('/get/:roleid/:functionid', urController.getUserRole.bind(urController)); 
export default userRoleRouter;