import { PrismaClient } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';

const prisma = new PrismaClient();

enum MealType {
  Breakfast = 'Breakfast',
  Lunch = 'Lunch',
  Dinner = 'Dinner',
}

function isValidMealType(mealType: string): boolean {
  return Object.values(MealType).includes(mealType as MealType);
}

export const createMeal = (
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

    const { name, items, date, details, mealType } = req.body;

    if (!isValidMealType(mealType)) {
      res.status(400).json({ msg: 'Invalid MealType' });
      return;
    }

    prisma.meal
      .create({
        data: {
          name,
          items,
          date,
          details,
          mealType,
          userId,
        },
      })
      .then((newMeal) => {
        res.status(201).json(newMeal);
      });
    return;
  } catch (error) {
    next(error);
    return;
  }
};
