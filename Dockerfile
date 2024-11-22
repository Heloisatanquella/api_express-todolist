# Etapa 1: Builder para instalar dependências e gerar o Prisma Client
FROM node:18 AS builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY prisma ./prisma
RUN npx prisma generate

# Etapa 2: Container final para rodar a aplicação
FROM node:18
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY . .
EXPOSE 3000
CMD ["node", "src/index.js"]
