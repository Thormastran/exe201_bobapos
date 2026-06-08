# EXE201 Backend

NestJS API for the EXE201 frontend. It connects to local MongoDB, including the same MongoDB instance you inspect with MongoDB Compass.

## Setup

```bash
cd backend
cp .env.example .env
npm install
npm run start:dev
```

Default API URL:

```text
http://localhost:4000/api
```

MongoDB Compass connection string:

```text
mongodb://127.0.0.1:27017/exe201
```

The app seeds sample tenants, contracts, licenses, and employees when the database is empty.

Default admin login:

```text
Email: admin@teaflow.io
Password: Admin@123456
```

Authentication endpoints:

```text
POST /api/auth/login
POST /api/auth/register
GET  /api/auth/me
POST /api/auth/logout
```

Protected endpoints require:

```text
Authorization: Bearer <accessToken>
```

## Connect Frontend

The frontend should use:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000/api
```

Then restart the Next.js dev server.
