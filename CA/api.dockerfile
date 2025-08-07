#Imagen para utilizar. Es la mas liviana de Node
FROM node:22-alpine

# Set the working directory
WORKDIR /app

# 1. Copiar solo los archivos necesarios para la instalación (optimización de caché de Docker)
COPY package.json package-lock.json ./

COPY apps/backend/package.json ./apps/backend/package.json

# Opción 2: Si tus workspaces son rutas (como en tu caso)
RUN npm install -w apps/backend


# 3. Copiar el resto del código (ahora sí todo)
COPY . .

# 4. Build de 'domain' y 'backend' (si es necesario)
RUN npm run build --workspace=backend

EXPOSE 3000

# 5. Comando para ejecutar el backend (ajusta según tu proyecto)
CMD ["node", "--loader", "ts-node/esm", "apps/backend/src/main.ts"]



