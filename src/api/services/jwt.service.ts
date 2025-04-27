import jwt from "jsonwebtoken";

export type EncodeDataToken = {
  userId: number;
};

const { JWT_SECRET } = process.env

export class JwtService {
  private secret: string;
  constructor() {
    this.secret = JWT_SECRET || "SECRET";
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
