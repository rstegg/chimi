import { PrismaClient } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';

const prisma = new PrismaClient();

export const updateMeal = async (
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
    const { name, items, date, details } = req.body;

    const updatedMeal = await prisma.meal.update({
      where: { id },
      data: { name, items, date, details },
    });

    if (!updatedMeal) {
      res.status(404).json({ msg: 'Meal plan not found or unauthorized' });
      return;
    }

    res.json(updatedMeal);
    return;
  } catch (error) {
    next(error);
    return;
  }
};
