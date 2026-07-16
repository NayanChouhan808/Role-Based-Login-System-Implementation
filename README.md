# Role-Based Login System Implementation

A full-stack loan management system with role-based authentication (Admin, Verifier, User).

## Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL database
- npm or yarn

### Backend Setup

```bash
cd server

# Install dependencies
npm install

# Create .env file (copy from .env.example)
cp .env.example .env

# Update .env with your values
# PORT=3000
# JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
# DATABASE_URL=postgresql://user:password@localhost:5432/loan_db
# NODE_ENV=development

# Start development server
npm run dev
```

Server runs on `http://localhost:3000`

### Frontend Setup

```bash
cd client

# Install dependencies
npm install

# Create .env file (copy from .env.example)
cp .env.example .env

# VITE_API_URL=http://localhost:3000/api

# Start development server
npm run dev
```

Client runs on `http://localhost:5173`

## Environment Variables

### Server (.env)
```env
PORT=3000
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
DATABASE_URL=postgresql://user:password@localhost:5432/loan_db
NODE_ENV=development
```

### Client (.env)
```env
VITE_API_URL=http://localhost:3000/api
```

## 🔧 Troubleshooting

### ❌ "ERR_CONNECTION_REFUSED" Error
**Problem:** Frontend can't connect to backend

**Solutions:**
1. ✅ Ensure backend server is running: `npm run dev` in `/server`
2. ✅ Verify `VITE_API_URL` in client `.env` matches backend URL
3. ✅ Check if port 3000 is available: `lsof -i :3000`
4. ✅ Ensure CORS is enabled in backend

### ❌ "500 Internal Server Error" on Login
**Problem:** Backend returns 500 error

**Solutions:**
1. ✅ Check if `JWT_SECRET` is set in `.env`
2. ✅ Verify database connection in `DATABASE_URL`
3. ✅ Check server console for error messages
4. ✅ Restart server after updating `.env`

### ❌ "Invalid credentials" Error
**Problem:** Login fails with correct credentials

**Solutions:**
1. ✅ Verify user exists in database
2. ✅ Check database connection is working
3. ✅ Review server logs for detailed errors

## 📝 API Endpoints

### Authentication
- `POST /api/auth/login` - Login
- `POST /api/auth/register` - Register

### Loans
- `POST /api/loans` - Create loan
- `GET /api/loans` - Get all loans
- `GET /api/loans/:id` - Get loan details
- `PUT /api/loans/:id/verify` - Verify loan (Verifier)
- `PUT /api/loans/:id/approve` - Approve loan (Admin)
- `PUT /api/loans/:id/reject` - Reject loan

### Users
- `GET /api/user` - Get all users (Admin)
- `POST /api/user/admin` - Create admin
- `POST /api/user/verifier` - Create verifier
- `DELETE /api/user/:id` - Delete user

## 🚀 Tech Stack

**Frontend:** React 19, TypeScript, Vite, Tailwind CSS, Zustand, Axios

**Backend:** Node.js, Express, TypeScript, Prisma, PostgreSQL, JWT

## 📖 Roles & Responsibilities

**👤 User**
- Register & Login
- Apply for loans
- Track application status

**✅ Verifier**
- View pending applications
- Verify/reject applications

**🎯 Admin**
- View verified applications
- Approve/reject loans
- Manage users

## License

ISC
