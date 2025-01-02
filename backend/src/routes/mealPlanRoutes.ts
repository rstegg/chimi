import { Router } from 'express';
import { authenticateJWT } from '../middleware/authenticateJWT'; // Custom JWT middleware
import { getMealPlans } from '../handlers/mealplans/getMealPlans';
import { createMealPlan } from '../handlers/mealplans/createMealPlan';
import { updateMealPlan } from '../handlers/mealplans/updateMealPlan';
import { deleteMealPlan } from '../handlers/mealplans/deleteMealPlan';

const router = Router();

router.get('/', authenticateJWT, getMealPlans);
router.post('/', authenticateJWT, createMealPlan);
router.put('/:id', authenticateJWT, updateMealPlan);
router.delete('/:id', authenticateJWT, deleteMealPlan);

export default router;
