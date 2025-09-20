import { Router } from 'express';
import { container } from 'tsyringe';
import { FunctionController } from '../controllers/functionController';
import { authenticate } from '../middlewares/authMiddleware';

const funcRouter = Router();
const funcController = container.resolve(FunctionController);
funcRouter.get('/getbyid/:id', funcController.getFunctionById.bind(funcController));
funcRouter.get('/getbyrole/:id',funcController.getByRole.bind(funcController));
funcRouter.post('/create', funcController.createFUnction.bind(funcController));
funcRouter.post('/update', funcController.updateFunction.bind(funcController));
funcRouter.post('/delete', funcController.deleteFunction.bind(funcController));
funcRouter.post('/search', funcController.searchFunction.bind(funcController));
export default funcRouter;