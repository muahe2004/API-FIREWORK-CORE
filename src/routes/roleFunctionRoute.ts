import { Router } from 'express';
import { container } from 'tsyringe';
import { ActionController } from '../controllers/actionController';
import { RoleFunctionController } from '../controllers/roleFunctionController';
import { authenticate } from '../middlewares/authMiddleware';

const roleFunctionRouter = Router();
const rfController = container.resolve(RoleFunctionController);
roleFunctionRouter.post('/create', rfController.createRoleFunction.bind(rfController));
roleFunctionRouter.post('/delete', rfController.deleteRoleFunction.bind(rfController));
export default roleFunctionRouter;