import { Router } from 'express';
import { container } from 'tsyringe';
import { ActionController } from '../controllers/actionController';
import { RoleFunctionController } from '../controllers/roleFunctionController';
import { RolePermissionController } from '../controllers/rolePermissionController';
import { authenticate } from '../middlewares/authMiddleware';

const permissionRouter = Router();
const perController = container.resolve(RolePermissionController);
permissionRouter.post('/create', perController.createRolePermission.bind(perController));
permissionRouter.post('/delete', perController.deleteRolePermission.bind(perController));
permissionRouter.get('/get/:roleid/:functionid', perController.getRolePermission.bind(perController));
export default permissionRouter;