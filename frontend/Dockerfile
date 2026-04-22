# ---- base ----
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm install

# ---- development stage ----
FROM base AS dev
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host"]

# ---- build stage ----
FROM base AS builder
COPY . .
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL
RUN npm run build

# ---- production stage ----
FROM node:20-alpine AS prod
WORKDIR /app
RUN npm install -g serve
COPY --from=builder /app/dist ./dist
EXPOSE 5173
CMD ["serve", "-s", "dist", "-l", "5173"]