import jwt from "jsonwebtoken";
import { JwtService } from "../../../src/api/services/jwt.service";

jest.mock("jsonwebtoken");

describe("JwtService", () => {
  let jwtService: JwtService;
  const mockSecret = "test-secret";
  const mockToken = "mock-token";
  const mockData = { userId: 1 };

  beforeEach(() => {
    jwtService = new JwtService(mockSecret);
    jest.clearAllMocks();
  });

  describe("signin", () => {
    it("deve gerar um token JWT válido", () => {
      (jwt.sign as jest.Mock).mockReturnValue(mockToken);

      const result = jwtService.signin(mockData);

      expect(jwt.sign).toHaveBeenCalledWith(mockData, mockSecret);
      expect(result).toBe(mockToken);
    });
  });

  describe("decode", () => {
    it("deve decodificar um token JWT válido", () => {
      (jwt.verify as jest.Mock).mockReturnValue(mockData);

      const result = jwtService.decode(mockToken);

      expect(jwt.verify).toHaveBeenCalledWith(mockToken, mockSecret);
      expect(result).toEqual(mockData);
    });

    it("deve lançar um erro quando o token for inválido", () => {
      const error = new Error("Invalid token");
      (jwt.verify as jest.Mock).mockImplementation(() => {
        throw error;
      });

      expect(() => jwtService.decode(mockToken)).toThrow(error);
      expect(jwt.verify).toHaveBeenCalledWith(mockToken, mockSecret);
    });
  });
}); 