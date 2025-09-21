import { Router } from 'express';
import { container } from 'tsyringe';
import { ProductTypeController } from '../controllers/productTypeController';

const productTypeRouter = Router();
const productTypeController = container.resolve(ProductTypeController);
// productRouter.get('/getbyid/:id', productController.getproductById.bind(productController));
productTypeRouter.get('/dropdown', productTypeController.getProductTypeDropdown.bind(productTypeController));
// productRouter.post('/create', productController.createProduct.bind(productController));
// productRouter.post('/update', productController.updateProduct.bind(productController));
// productRouter.post('/delete', productController.deleteProduct.bind(productController));
// productRouter.post('/search', productController.searchProduct.bind(productController));
export default productTypeRouter;