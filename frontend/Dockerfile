# ---- development stage ----
FROM node:20-alpine AS dev
WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host"]

# -------- BUILD STAGE --------
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build


# -------- RUN STAGE --------
FROM node:20-alpine

WORKDIR /app

RUN npm install -g serve

# IMPORTANT: ensure dist exists
COPY --from=builder /app/dist /app/dist

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]