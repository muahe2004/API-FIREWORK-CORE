import { Router } from 'express';
import { container } from 'tsyringe';
import { DepartmentController } from '../controllers/departmentController';

const departmentRouter = Router();
const departmentController = container.resolve(DepartmentController);
departmentRouter.get('/getbyid/:id', departmentController.getDepartmentById.bind(departmentController));
departmentRouter.get('/dropdown', departmentController.getDepartmentDropdown.bind(departmentController));
departmentRouter.post('/create', departmentController.createDepartment.bind(departmentController));
departmentRouter.post('/update', departmentController.updateDepartment.bind(departmentController));
departmentRouter.post('/delete', departmentController.deleteDepartment.bind(departmentController));
departmentRouter.post('/search', departmentController.searchDepartment.bind(departmentController));
export default departmentRouter;
