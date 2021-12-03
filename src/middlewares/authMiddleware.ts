import * as jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import User from '../models/user';

interface JWT {
  username: string;
  iat: number;
  exp: number;
}

const authMiddleware = async (req: Request, res: Response, next: () => void) => {
  if (!process.env.JWT_KEY) {
    return res.status(500).send({ error: 'Bad server configuration: JWT_KEY missing' });
  }

  // We can obtain the session token from the requests cookies, which come with every request
  const { authToken } = req.cookies;

  // if the cookie is not set, return an unauthorized error
  if (!authToken) {
    return res.status(401).end();
  }

  try {
    const token = jwt.verify(authToken, process.env.JWT_KEY) as JWT;

    const user = await User.findOne({ username: token.username });
    if (user) {
      req.currentUser = user;
      return next();
    }
  } catch (e) {
    if (e instanceof jwt.JsonWebTokenError) {
      return res.status(401).end();
    }
  }
  return res.status(400).end();
};

export default authMiddleware;
