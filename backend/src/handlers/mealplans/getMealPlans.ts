import { PrismaClient } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';

const prisma = new PrismaClient();

// Get all meal plans for the authenticated user
export const getMealPlans = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user?.id; // Assuming `req.user` is populated via authentication middleware
    if (!userId) {
      return res.status(401).json({ msg: 'Unauthorized' });
    }

    const mealPlans = await prisma.mealPlan.findMany({
      where: { userId },
    });

    res.json(mealPlans);
  } catch (error) {
    next(error);
  }
};
