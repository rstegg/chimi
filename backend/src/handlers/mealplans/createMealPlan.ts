import { PrismaClient } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';

const prisma = new PrismaClient();

export const createMealPlan = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ msg: 'Unauthorized' });
    }

    const { name, items } = req.body; // `items` can be a JSON array or similar, based on your schema
    prisma.mealPlan
      .create({
        data: {
          name,
          items,
          userId,
        },
      })
      .then((newMealPlan) => {
        res.status(201).json(newMealPlan);
      });
  } catch (error) {
    next(error);
  }
};
