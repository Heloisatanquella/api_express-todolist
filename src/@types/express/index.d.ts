// eslint-disable-next-line
import * as express from 'express';

declare global {
  namespace Express {
    interface Request {
      userId?: number;
    }
  }
}