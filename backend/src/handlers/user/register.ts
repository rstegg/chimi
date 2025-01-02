import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export const registerUser = (req: Request, res: Response) => {
  const { username, password, email } = req.body;

  // Input validation
  if (!username || !password || !email) {
    res.status(400).json({ msg: 'All fields are required' });
  }

  // Hash the password
  bcrypt
    .hash(password, 10)
    .then((hashedPassword) => {
      // Create the user in the database
      return prisma.user.create({
        data: {
          username,
          passwordHash: hashedPassword,
          email,
        },
      });
    })
    .then((user) => {
      // Respond with the created user (excluding sensitive data)
      res
        .status(201)
        .json({ id: user.id, username: user.username, email: user.email });
    })
    .catch((error) => {
      // Handle unique constraint violations (Prisma-specific)
      if (error.code === 'P2002') {
        res.status(400).json({ msg: 'Email or username already exists' });
      } else {
        res
          .status(500)
          .json({ msg: 'Internal server error', error: error.message });
      }
    });
};
