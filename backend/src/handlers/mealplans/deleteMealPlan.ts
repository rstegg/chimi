import { PrismaClient } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';

const prisma = new PrismaClient();

export const deleteMealPlan = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ msg: 'Unauthorized' });
      return;
    }

    const { id } = req.params;

    const deletedMealPlan = await prisma.mealPlan.deleteMany({
      where: { id, userId },
    });

    if (!deletedMealPlan.count) {
      res
        .status(404)
        .json({ msg: 'Meal plan not found or unauthorized' });
      return;
    }

    res.json({ msg: 'Meal plan deleted' });
    return;
  } catch (error) {
    next(error);
    return;
  }
};
