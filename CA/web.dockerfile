
FROM node:22-alpine as builder
WORKDIR /app


COPY package.json package-lock.json ./
COPY apps/frontend/e-commerce/package.json ./apps/frontend/e-commerce/package.json


RUN npm install -w apps/frontend/e-commerce


COPY . .


RUN npm run build -w apps/frontend/e-commerce

# ---


FROM nginx:alpine
COPY --from=builder /app/apps/frontend/e-commerce/dist /usr/share/nginx/html
COPY apps/frontend/e-commerce/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80