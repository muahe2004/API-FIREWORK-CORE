import { Router } from 'express';
import userRouter from './userRouter';
import funcRouter from './functionRoute';
import actionRouter from './actionRoute';
import roleRouter from './roleRoute';
import roleFunctionRouter from './roleFunctionRoute';
import permissionRouter from './permissionRoute';
import userRoleRouter from './userRoleRoute';
import branchRouter from './branchRouter';
import departmentRouter from './departmentRouter';
import positionRouter from './positionRouter';
import productRouter from './productRouter';
import productTypeRouter from "./productTypeRouter";

const router = Router();
router.use('/users', userRouter);
router.use('/function', funcRouter);
router.use('/action', actionRouter);
router.use('/role', roleRouter);
router.use('/role-function/',roleFunctionRouter);
router.use('/permission', permissionRouter);
router.use('/user-role/', userRoleRouter);
router.use('/branchs', branchRouter);
router.use('/departments', departmentRouter);
router.use('/positions', positionRouter);
router.use('/products', productRouter);
router.use('/product-types', productTypeRouter);

export default router;
