import { PrismaClient } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';

const prisma = new PrismaClient();

// Get all meal plans for the authenticated user
export const getMeals = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const userId = req.user?.id; // Assuming `req.user` is populated via authentication middleware
    if (!userId) {
      res.status(401).json({ msg: 'Unauthorized' });
      return;
    }

    const meals = await prisma.meal.findMany({
      where: { userId },
    });

    res.json(meals);
    return;
  } catch (error) {
    next(error);
    return;
  }
};
