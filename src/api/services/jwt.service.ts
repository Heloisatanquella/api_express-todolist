import jwt from "jsonwebtoken";

export type EncodeDataToken = {
  userId: number;
};

// Geração do token de acesso
export class JwtService {
  private secret: string;
  constructor() {
    this.secret = "SECRET";
  }

  signin(data: EncodeDataToken) {
    return jwt.sign(data, this.secret);
  }

  decode(token: string) {
    try {
      return jwt.verify(token, this.secret) as EncodeDataToken;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export default new JwtService();
