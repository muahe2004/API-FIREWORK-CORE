import { Router } from 'express';
import { container } from 'tsyringe';
import { PositionController } from '../controllers/positionController';

const positionRouter = Router();
const positionController = container.resolve(PositionController);
positionRouter.get('/getbyid/:id', positionController.getPositionById.bind(positionController));
positionRouter.get('/dropdown', positionController.getPositionDropdown.bind(positionController));
positionRouter.post('/create', positionController.createPosition.bind(positionController));
positionRouter.post('/update', positionController.updatePosition.bind(positionController));
positionRouter.post('/delete', positionController.deletePosition.bind(positionController));
positionRouter.post('/search', positionController.searchPosition.bind(positionController));
export default positionRouter;
