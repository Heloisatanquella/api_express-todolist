import jwtService from "../services/jwt.service"; //importando a classe com o token
import { Request, Response, NextFunction } from 'express';
// middleware que valida a autorizaçao e faz o decode do token
async function verifyToken(req: Request, res: Response, next: NextFunction) {
    const strToken = req.headers.authorization
    if(!strToken) {
        res.status(403).send('Token não encontrado')
    }
    // eslint-disable-next-line
    const [_, token] = (strToken as string).split(' ');

    if(!token) {
        res.status(403).send('Token inválido')
    }

    try {
        const decode = jwtService.decode(token) as { userId: number }
        req.userId = decode.userId;
        return next();
    } catch (error) {
        console.log(error)
        res.status(401).send('Token inválido')
    }
}

export default verifyToken