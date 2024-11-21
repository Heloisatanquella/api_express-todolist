const express = require('express');

const bcrypt  = require("bcrypt");

const saltRounds = 10; //saltos do hash
const { User } = require("../entities/entities"); // Importando as entidades

const userRouter = express.Router()

//rota para buscar um usuário pelo id
userRouter.get("/", async (req, res) => {
    const { id } =  req.params;
        try {
            // tenta encontrar o usuario pelo ID
            const user = await User.findById(id);
            if (!user) {
                return res.status(404).send("Usuário não encontrado");
            }
            return res.send(user);
        } catch (error) {
            return res.status(500).send("Erro interno do servidor");
        }
})

//rota para cadastro do usuário
userRouter.post("/", async (req, res) => {
    const hashPassword = await bcrypt.hash(req.body.password, saltRounds) //hash de senha

    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashPassword
    })
    await user.save()
    return res.send({ message: "Cadastro efetuado com sucesso!", user })
})

//rota de login com verificação
userRouter.post("/login", async (req, res) => {
    const user = await User.findOne().where('email').equals(req.body.email);
    if(!user) {
        return res.status(401).send('Usuário não encontrado')
    }

    const { password } = user;
    const validPassword = await bcrypt.compare(req.body.password, password);

    if (!validPassword) {
        return res.status(401).send('Senha inválida, tente novamente')
    }
    return res.send({ message: "Login efetuado com sucesso!", user });
} )

module.exports = userRouter