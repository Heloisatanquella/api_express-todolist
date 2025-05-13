import { Request, Response, NextFunction } from 'express';
import { JwtService } from '../services/jwt.service';

// Extend Express Request type
declare module 'express' {
    interface Request {
        userId: number;
    }
}

// middleware que valida a autorizaçao e faz o decode do token
export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Token not provided' });
    }

    const jwtService = new JwtService();
    const decoded = await jwtService.decode(token);
    req.userId = decoded.userId;

    return next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export default verifyToken;