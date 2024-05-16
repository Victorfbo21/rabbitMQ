FROM node:18

WORKDIR /app

# Copia os arquivos package.json e package-lock.json
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install --force

# Copia o restante do código da aplicação
COPY . .

# Gera o cliente Prisma
RUN npx prisma generate

# Executa as migrações do Prisma para garantir que o schema do banco de dados esteja atualizado
RUN npx prisma migrate deploy

# Expõe a porta da aplicação
EXPOSE 3001

# Comando para iniciar a aplicação
CMD ["npm", "start"]
