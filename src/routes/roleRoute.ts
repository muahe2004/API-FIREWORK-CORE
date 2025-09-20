import { Router } from 'express';
import { container } from 'tsyringe';
import { RoleController } from '../controllers/roleController';
import { authenticate } from '../middlewares/authMiddleware';

const roleRouter = Router();
const roleController = container.resolve(RoleController);
roleRouter.get('/getbyid/:id', roleController.getRoleById.bind(roleController));
roleRouter.get('/getbyuserid/:id', roleController.getRoleByUserId.bind(roleController));
roleRouter.post('/create', roleController.createRole.bind(roleController));
roleRouter.post('/update', roleController.updateRole.bind(roleController));
roleRouter.post('/delete', roleController.deleteRole.bind(roleController));
roleRouter.post('/search', roleController.searchRole.bind(roleController));
export default roleRouter;