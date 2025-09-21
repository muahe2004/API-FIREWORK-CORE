import { Router } from 'express';
import { container } from 'tsyringe';
import { ProductController } from '../controllers/productController';

const productRouter = Router();
const productController = container.resolve(ProductController);
// productRouter.get('/getbyid/:id', productController.getproductById.bind(productController));
// productRouter.get('/dropdown', productController.getproductDropdown.bind(productController));
productRouter.post('/create', productController.createProduct.bind(productController));
productRouter.post('/update', productController.updateProduct.bind(productController));
productRouter.post('/delete', productController.deleteProduct.bind(productController));
productRouter.post('/search', productController.searchProduct.bind(productController));
productRouter.get('/check-code', productController.checkProductCode.bind(productController));
export default productRouter;