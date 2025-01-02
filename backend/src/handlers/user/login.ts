import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import passport from '../../config/passport';
import { User } from '../../models/user';

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';

export const loginUser = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(
    'local',
    { session: false },
    (err: Error | null, user: User, info: { message?: string }) => {
      if (err) {
        return res
          .status(500)
          .json({ msg: 'Error during authentication', err });
      }

      if (!user) {
        return res
          .status(401)
          .json({ msg: info?.message || 'Authentication failed' });
      }

      // Generate JWT
      const token = jwt.sign(
        { id: user.id, email: user.email, username: user.username },
        JWT_SECRET,
        {
          expiresIn: '24h',
        },
      );

      res.json({ msg: 'Login successful', token });
    },
  )(req, res, next);
};
