const express = require('express');

const bcrypt  = require("bcrypt");

const saltRounds = 10; //saltos do hash
const JwtService = require("../jwt.service"); //importando a classe com o token
const verifyToken = require('../middlewares/verify.token');
const { PrismaClient } = require('@prisma/client');

const userRouter = express.Router()
const prisma = new PrismaClient()
const jwtService = new JwtService()

//rota para cadastro do usuário
userRouter.post("/", async (req, res) => {
    const hashPassword = await bcrypt.hash(req.body.password, saltRounds) //hash de senha

    const user = await prisma.user.create({ data: {
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    } })

    return res.send({ message: "Cadastro efetuado com sucesso!", user })
})

//rota de login com verificação
userRouter.post("/login", async (req, res) => {
    const user = await prisma.user.findUnique({ where: { email: req.body.email } })

    if(!user) {
        return res.status(401).send('Usuário não encontrado')
    }

    const { password } = user;
    const validPassword = await bcrypt.compare(req.body.password, password);

    if (!validPassword) {
        return res.status(401).send('Senha inválida, tente novamente')
    }
    //token para login di usuário
    const token = jwtService.signin(user.id)
    return res.send({ message: "Login efetuado com sucesso!", token });
} )

// define o middleware tornando o token obrigatorio para as seguintes rotas
userRouter.use(verifyToken);
//rota para buscar um usuário pelo id
userRouter.get("/", async (req, res) => {
        try {
            const userId = req.userId;
            // tenta encontrar o usuario pelo ID
            const user = await prisma.user.findUnique({ where: { id: userId } })
            if (!user) {
                return res.status(404).send("Usuário não encontrado");
            }
            return res.send(user);
        } catch (error) {
            return res.status(500).send("Erro interno do servidor");
        }
})

//rota para atualizar as informações do usuário
userRouter.put("/", async (req, res) => {
    const userId = req.userId
    const { name } = req.body;

    try {
        //Tenta encontrar e atualizar o usuário
        const user = await prisma.user.update({ where: { id: userId }, data: { name } });

        return res.send({ message: "Usuário atualizado com sucesso1 ", user});
    } catch (error) {
        return res.status(400).send("Usuário não encontrado")

    }
})

module.exports = userRouter