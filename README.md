# Manas Mitra

This is a Next.js application for cognitive wellness support and memory-focused training.

## What changed

This branch adds a MySQL-backed backend using Prisma and JWT authentication.

## Local setup

1. Create a MySQL database:

```sql
CREATE DATABASE manasmitra;
```

2. Copy `.env.example` to `.env` and update values:

```bash
cp .env.example .env
```

3. Install dependencies:

```bash
npm install
```

4. Run Prisma migrations:

```bash
npx prisma migrate dev --name init
```

5. Start the app:

```bash
npm run dev
```

Open http://localhost:3000

## API endpoints

- `POST /api/auth/signup`
- `POST /api/auth/signin`
- `POST /api/auth/logout`
- `GET /api/auth/me`
- `GET /api/game-results`
- `POST /api/game-results`
- `GET /api/progress`
- `PUT /api/progress`

## AWS deployment

### Option 1: ECR + ECS Fargate + RDS MySQL

Use:
- Amazon RDS MySQL
- Amazon ECR for the Next.js image
- ECS Fargate for the application
- Secrets Manager for `DATABASE_URL` and `JWT_SECRET`
- Application Load Balancer for HTTPS

### Recommended production stack

```text
Browser -> ALB -> ECS Fargate (Next.js) -> RDS MySQL
```

### Docker example

```dockerfile
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL
RUN npx prisma generate && npm run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
COPY --from=build /app/public ./public
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/prisma ./prisma
EXPOSE 3000
CMD ["node", "server.js"]
```

### AWS env vars

```env
NODE_ENV=production
DATABASE_URL=mysql://user:password@host:3306/manasmitra
JWT_SECRET=very-long-random-secret
```

### Deployment steps

1. Create an RDS MySQL instance.
2. Create ECR repository.
3. Build Docker image.
4. Push to ECR.
5. Create ECS cluster and Fargate service.
6. Add database and JWT secrets.
7. Run Prisma migrations in a one-off task.
8. Connect through ALB with HTTPS certificate.

## Security

- Store secrets in AWS Secrets Manager.
- Keep the database in a private subnet.
- Use only HTTP-only secure cookies.
- Never expose `DATABASE_URL` to the browser.
- Use HTTPS in production.
