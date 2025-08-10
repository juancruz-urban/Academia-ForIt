#Imagen para utilizar. Es la mas liviana de Node
FROM node:22-alpine


WORKDIR /app


COPY package.json package-lock.json ./

COPY apps/backend/package.json ./apps/backend/package.json


RUN npm install -w apps/backend



COPY . .


RUN npm run build --workspace=backend

EXPOSE 3000


CMD ["node", "--loader", "ts-node/esm", "apps/backend/src/main.ts"]



