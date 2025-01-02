import userRoutes from './userRoutes';
import mealPlanRoutes from './mealPlanRoutes';
import { Router } from 'express';

const router = Router();

router.use('/users', userRoutes);
router.use('/mealplans', mealPlanRoutes);

export default router;
