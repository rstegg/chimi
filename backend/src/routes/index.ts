import { Router } from 'express';
import mealRoutes from './mealRoutes';
import userRoutes from './userRoutes';

const router = Router();

router.use('/users', userRoutes);
router.use('/mealplans', mealRoutes);

export default router;
