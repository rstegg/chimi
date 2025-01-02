import { PrismaClient } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';

const prisma = new PrismaClient();

export const updateMealPlan = async (
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
    const { name, items } = req.body;

    const updatedMealPlan = await prisma.mealPlan.updateMany({
      where: { id, userId },
      data: { name, items },
    });

    if (!updatedMealPlan.count) {
      return res
        .status(404)
        .json({ msg: 'Meal plan not found or unauthorized' });
    }

    res.json({ msg: 'Meal plan updated' });
  } catch (error) {
    next(error);
  }
};
