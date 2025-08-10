# Fase 1: Construcción (builder)
FROM node:22-alpine as builder
WORKDIR /app

# 1. Copiar archivos raíz y del frontend
COPY package.json package-lock.json ./
COPY apps/frontend/e-commerce/package.json ./apps/frontend/e-commerce/package.json

# 2. Instalar dependencias del workspace frontend (usa la ruta exacta)
RUN npm install -w apps/frontend/e-commerce

# 3. Copiar TODO el código (incluyendo backend si es necesario)
COPY . .

# 4. Construir el frontend (usando la ruta exacta del workspace)
RUN npm run build -w apps/frontend/e-commerce

# ---

# Fase 2: Servir la app (production)
FROM nginx:alpine
COPY --from=builder /app/apps/frontend/e-commerce/dist /usr/share/nginx/html
COPY apps/frontend/e-commerce/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80