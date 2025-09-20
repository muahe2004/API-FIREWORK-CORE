import { Router } from 'express';
import { container } from 'tsyringe';
import { ActionController } from '../controllers/actionController';
import { authenticate } from '../middlewares/authMiddleware';

const actionRouter = Router();
const actionController = container.resolve(ActionController);
actionRouter.get('/getbyid/:id', actionController.getActionById.bind(actionController));
actionRouter.post('/create', actionController.createAction.bind(actionController));
actionRouter.post('/update', actionController.updateAction.bind(actionController));
actionRouter.post('/delete', actionController.deleteAction.bind(actionController));
actionRouter.post('/search', actionController.searchAction.bind(actionController));
export default actionRouter;