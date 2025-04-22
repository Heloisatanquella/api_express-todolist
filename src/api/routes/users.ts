import { Router, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwtService from "../jwt.service";
import prisma from "../../libs/prisma";
import { User } from "@prisma/client";
import verifyToken from "../middlewares/verify.token";

const saltRounds = 10; //saltos do hash
const userRouter = Router();

//rota para cadastro do usuário
userRouter.post("/", async (req: Request, res: Response) => {
  if ("password" in req.body) {
    const emailHasBeenUsed = await prisma.user.findUnique({
      where: { email: req.body.email },
    });

    if (!emailHasBeenUsed) {
      const hashPassword = await bcrypt.hash(req.body.password, saltRounds); //hash de senha

      const user = await prisma.user.create({
        data: {
          name: req.body.name,
          email: req.body.email,
          password: hashPassword,
        },
      });

      res.status(201).json({ message: "Cadastro efetuado com sucesso!", user });
    } else {
      res.status(409).send("E-mail em uso.");
    }
  } else {
    res.status(400).send("Password é obrigatório.");
  }
});

//rota de login com verificação
userRouter.post("/login", async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({
    where: { email: req.body.email },
  });

  if (!user) {
    res.status(401).send("Usuário não encontrado");
  } else {
    const { password, id } = user as User;
    const validPassword = await bcrypt.compare(req.body.password, password);

    if (!validPassword) {
      res.status(401).send("Senha inválida, tente novamente");
    } else {
      //token para login de usuário
      const token = jwtService.signin({ userId: id });
      res.send({ message: "Login efetuado com sucesso!", token });
    }
  }
});

// define o middleware tornando o token obrigatorio para as seguintes rotas
userRouter.use(verifyToken);

//rota para buscar um usuário pelo id
userRouter.get("/", async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    // tenta encontrar o usuario pelo ID
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      res.status(404).send("Usuário não encontrado");
    }
    res.send(user);
  } catch (error) {
    res.status(500).send("Erro interno do servidor");
  }
});

//rota para atualizar as informações do usuário
userRouter.put("/", async (req: Request, res: Response) => {
  const userId = req.userId;
  const { name } = req.body;

  try {
    //Tenta encontrar e atualizar o usuário
    const user = await prisma.user.update({
      where: { id: userId },
      data: { name },
    });

    res.send({ message: "Usuário atualizado com sucesso! ", user });
  } catch (error) {
    res.status(400).send("Usuário não encontrado");
  }
});

export default userRouter;
