import jwt from 'jsonwebtoken';

// Geração do token de acesso
export class JwtService{
    private secret: string;
    constructor(){
        this.secret = "SECRET"
    }

    signin(data: object){
        const token = jwt.sign(data, this.secret)
        return token
    }

    decode(token: string){
        try {
            const decode = jwt.verify(token, this.secret) as object
            return decode;
        } catch (error) {
            console.log(error)
            throw error
        }
    }

}

export default new JwtService()