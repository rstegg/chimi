import { PrismaClient } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';

const prisma = new PrismaClient();

export const deleteMeal = async (
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

    const deletedMeal = await prisma.meal.deleteMany({
      where: { id, userId },
    });

    if (!deletedMeal.count) {
      res.status(404).json({ msg: 'Meal plan not found or unauthorized' });
      return;
    }

    res.json({ msg: 'Meal plan deleted' });
    return;
  } catch (error) {
    next(error);
    return;
  }
};
