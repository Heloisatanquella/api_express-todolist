const JwtService = require("../jwt.service"); //importando a classe com o token

const jwtService = new JwtService()

// middleware que valida a autorizaçao e faz o decode do token
async function verifyToken(req, res, next) {
    const strToken = req.headers.authorization
    if(!strToken) {
        return res.status(401).send('Token não encontrado')
    }
    const [_, token] = strToken.split(' ');

    if(!token) {
        return res.status(401).send('Token inválido')
    }
    try {
        const decode = jwtService.decode(token)
        req.userId = decode;
    } catch (error) {
        return res.status(401).send('Token inválido')
    }
    return next();
}

module.exports = verifyToken