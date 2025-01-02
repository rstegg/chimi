import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';

export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract Bearer token

  if (!token) {
    return res.status(401).json({ msg: 'Unauthorized' });
  }

  jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
    if (err) {
      return res.status(403).json({ msg: 'Forbidden', error: err.message });
    }

    if (
      typeof decodedToken === 'object' &&
      decodedToken !== null &&
      'id' in decodedToken &&
      'email' in decodedToken &&
      'username' in decodedToken
    ) {
      const { id, email, username } = decodedToken as JwtPayload & {
        id: string;
        email: string;
        username: string;
      };

      // Attach the user object to the request
      req.user = { id, email, username };
      next();
    } else {
      return res.status(403).json({ msg: 'Invalid token payload' });
    }
  });
};
