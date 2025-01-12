import { PrismaClient } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';

const prisma = new PrismaClient();

export const updateMealPlan = async (
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

    const updatedMealPlan = await prisma.mealPlan.update({
      where: { id },
      data: { name, items, date: new Date(date).toISOString(), details },
    });

    if (!updatedMealPlan) {
      res.status(404).json({ msg: 'Meal plan not found or unauthorized' });
      return;
    }

    res.json(updatedMealPlan);
    return;
  } catch (error) {
    next(error);
    return;
  }
};
