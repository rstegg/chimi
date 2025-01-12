import { PrismaClient } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';

const prisma = new PrismaClient();

export const createMealPlan = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ msg: 'Unauthorized' });
      return;
    }

    const { name, items, date, details } = req.body;

    prisma.mealPlan
      .create({
        data: {
          name,
          items,
          date: new Date(date).toISOString(),
          details,
          userId,
        },
      })
      .then((newMealPlan) => {
        res.status(201).json(newMealPlan);
      });
    return;
  } catch (error) {
    next(error);
    return;
  }
};
