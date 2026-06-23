# syntax=docker/dockerfile:1

# ---------- build stage ----------
FROM node:20-alpine AS build
ARG VITE_API_BASE_URL=/api
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# ---------- runtime stage ----------
FROM nginx:1.27-alpine
# nginx:alpine auto-runs envsubst on *.template files in /etc/nginx/templates at boot
COPY nginx.conf /etc/nginx/templates/default.conf.template
COPY --from=build /app/dist /usr/share/nginx/html
ENV BACKEND_HOST=backend
ENV BACKEND_PORT=3000
EXPOSE 80
