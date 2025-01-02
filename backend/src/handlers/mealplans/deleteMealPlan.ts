import { PrismaClient } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';

const prisma = new PrismaClient();

export const deleteMealPlan = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ msg: 'Unauthorized' });
    }

    const { id } = req.params;

    const deletedMealPlan = await prisma.mealPlan.deleteMany({
      where: { id, userId },
    });

    if (!deletedMealPlan.count) {
      return res
        .status(404)
        .json({ msg: 'Meal plan not found or unauthorized' });
    }

    res.json({ msg: 'Meal plan deleted' });
  } catch (error) {
    next(error);
  }
};
