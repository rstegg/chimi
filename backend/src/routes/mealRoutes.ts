import { Router } from 'express';
import { createMeal } from '../handlers/mealplans/createMeal';
import { deleteMeal } from '../handlers/mealplans/deleteMeal';
import { getMeals } from '../handlers/mealplans/getMeals';
import { updateMeal } from '../handlers/mealplans/updateMeal';
import { authenticateJWT } from '../middleware/authenticateJWT'; // Custom JWT middleware

const router = Router();

router.get('/', authenticateJWT, getMeals);
router.post('/', authenticateJWT, createMeal);
router.put('/:id', authenticateJWT, updateMeal);
router.delete('/:id', authenticateJWT, deleteMeal);

export default router;
