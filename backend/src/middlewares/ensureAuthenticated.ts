import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../config/auth';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticaded(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authReader = request.headers.authorization;

  if (!authReader) {
    throw new Error('JWT token is missing');
  }
  // Bearer aaaaaaa
  const [, token] = authReader.split(' ');
  try {
    const decoded = verify(token, authConfig.jwt.secret);
    const { sub } = decoded as TokenPayload;
    request.user = {
      id: sub,
    };
    return next();
  } catch (error) {
    throw new Error('Invalid JWT token');
  }
}
