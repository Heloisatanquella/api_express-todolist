import jwtService from "../services/jwt.service"; //importando a classe com o token
import { Request, Response, NextFunction } from 'express';

// Extend Express Request type
declare module 'express' {
    interface Request {
        userId?: number;
    }
}

// middleware que valida a autorizaçao e faz o decode do token
function verifyToken(req: Request, res: Response, next: NextFunction): void {
    const strToken = req.headers.authorization;
    if(!strToken) {
        res.status(403).send('Token não encontrado');
        return;
    }
    
    const token = (strToken as string).split(' ')[1] || undefined;

    if(!token) {
        res.status(403).send('Token inválido');
        return;
    }

    try {
        const decode = jwtService.decode(token) as { userId: number };

        if ('userId' in decode && decode.userId) {
            req.userId = decode.userId;
            next();
            return;
        }

        res.status(401).send('Token inválido');
    } catch (error) {
        console.log(error);
        res.status(401).send('Token inválido');
    }
}

export default verifyToken;