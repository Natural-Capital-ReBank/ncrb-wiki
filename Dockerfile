# syntax=docker/dockerfile:1

# ── Stage 1: build ────────────────────────────────────────────────────────────
FROM node:24-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# ── Stage 2: serve ────────────────────────────────────────────────────────────
FROM node:24-alpine AS runner
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/build        ./build
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000
# --host 0.0.0.0 is required — Docusaurus serve binds to localhost by default,
# which makes it unreachable outside the container.
CMD ["npx", "docusaurus", "serve", "--host", "0.0.0.0", "--port", "3000"]
