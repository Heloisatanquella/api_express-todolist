const jwt = require('jsonwebtoken');

// Geração do token de acesso
class JwtService{
    constructor(){
        this.secret = "SECRET"
    }

    signin(data){
        const token = jwt.sign({data}, this.secret)
        return token
    }

    decode(token){
        try {
            const decode = jwt.verify(token, this.secret)
            return decode.data
        } catch (error) {
            console.log(error)
            throw error
        }
    }

}

module.exports = JwtService