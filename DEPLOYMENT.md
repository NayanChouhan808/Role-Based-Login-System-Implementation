# Deployment Guide

This guide explains how to deploy your Role-Based Login System to production using Render (backend) and Vercel (frontend).

## Prerequisites

- GitHub repository (already done ✅)
- Render account (free tier available)
- Vercel account (free tier available)
- PostgreSQL database (Render provides free tier)

---

## 🚀 Part 1: Deploy Backend to Render

### Step 1: Create Render Account
1. Go to [https://render.com](https://render.com)
2. Sign up with GitHub
3. Authorize Render to access your repositories

### Step 2: Create PostgreSQL Database

1. Dashboard → **New +** → **PostgreSQL**
2. Fill in:
   - **Name:** `loan-db` (or your choice)
   - **Database:** `loan_db`
   - **User:** `postgres`
   - Keep other defaults
3. Click **Create Database**
4. Copy the **Internal Database URL** (you'll need this)

Example format:
```
postgresql://username:password@host:5432/loan_db
```

### Step 3: Deploy Backend Service

1. Dashboard → **New +** → **Web Service**
2. Choose **GitHub** and connect your repository
3. Fill in:
   - **Name:** `loan-management-backend` (or your choice)
   - **Environment:** `Node`
   - **Build Command:** `cd server && npm install && npm run build`
   - **Start Command:** `cd server && npm start`
4. Click **Advanced** and add **Environment Variables:**
   ```
   PORT=3000
   JWT_SECRET=<generate-a-strong-random-string>
   DATABASE_URL=<paste-your-database-url-here>
   NODE_ENV=production
   ```
   
   **To generate JWT_SECRET**, run in terminal:
   ```bash
   openssl rand -base64 32
   ```

5. Click **Create Web Service**
6. Wait for deployment (5-10 minutes)
7. Copy your backend URL: `https://your-app-name.onrender.com`

### Step 4: Test Backend

```bash
curl https://your-app-name.onrender.com/api/health
# Should return: {"status":"ok","timestamp":"..."}
```

---

## 🌐 Part 2: Deploy Frontend to Vercel

### Step 1: Create Vercel Account
1. Go to [https://vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Authorize Vercel

### Step 2: Deploy Frontend

1. Vercel Dashboard → **Add New** → **Project**
2. Select your GitHub repository
3. Configure:
   - **Framework Preset:** `Vite`
   - **Root Directory:** `client`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

### Step 3: Add Environment Variables

1. Go to **Settings** → **Environment Variables**
2. Add:
   ```
   VITE_API_URL=https://your-app-name.onrender.com/api
   ```
   Replace `your-app-name` with your actual Render backend name

3. Click **Save**
4. **Redeploy** the project (Settings → Redeploy)

### Step 4: Get Your Frontend URL

After deployment completes, Vercel will show your live URL:
```
https://your-project-name.vercel.app
```

---

## 🧪 Test Deployment

1. Open your Vercel frontend URL
2. Try to **Register** or **Login**
3. Should work now! ✅

If you get errors, check:
- Backend is running on Render
- `VITE_API_URL` is correct in Vercel
- Database connection is working

---

## 📊 Environment Variables Summary

### Backend (Render)
```env
PORT=3000
JWT_SECRET=your-random-string-here
DATABASE_URL=postgresql://user:password@host:5432/loan_db
NODE_ENV=production
```

### Frontend (Vercel)
```env
VITE_API_URL=https://your-backend-url.onrender.com/api
```

---

## 🔍 Troubleshooting

### Backend stuck in "Building" state
- Check Render logs: **Logs** tab
- Ensure `npm start` works locally: `cd server && npm run build && npm start`

### "ERR_CONNECTION_REFUSED" on deployed site
- Check `VITE_API_URL` is set correctly in Vercel
- Verify backend URL doesn't have trailing slash
- Restart Vercel deployment after updating env vars

### Database connection errors
- Check `DATABASE_URL` is correct in Render
- Ensure you copied the **Internal Database URL**
- Verify database name and credentials match

### Backend 500 errors
- Check Render logs for error details
- Verify all environment variables are set
- Check database is running: go to database in Render dashboard

---

## 📝 After Deployment

### Update Your README

Add this to your repo README:

```markdown
## 🌐 Live Demo

- **Frontend:** https://your-frontend.vercel.app
- **Backend API:** https://your-backend.onrender.com/api

## Local Development

See [Deployment Guide](./DEPLOYMENT.md) for production setup.
```

### Set Up Custom Domain (Optional)

**Vercel:**
1. Settings → Domains
2. Add your custom domain
3. Update DNS records as shown

**Render:**
1. Environment → Custom Domain
2. Add domain and follow DNS instructions

---

## 🔐 Security Notes

1. **Never commit `.env` files** ✅ (already in .gitignore)
2. **Use strong JWT_SECRET** - Use `openssl rand -base64 32`
3. **Keep database credentials private** - Store only in environment variables
4. **Enable HTTPS** - Both Render and Vercel do this automatically

---

## 📧 Need Help?

- **Render Support:** https://render.com/docs
- **Vercel Support:** https://vercel.com/docs
- **GitHub Issues:** Create an issue in your repository

---

## ✅ Deployment Checklist

- [ ] Backend deployed on Render
- [ ] Database created and connected
- [ ] JWT_SECRET set in Render
- [ ] Backend health check passing
- [ ] Frontend deployed on Vercel
- [ ] VITE_API_URL set in Vercel
- [ ] Frontend can reach backend API
- [ ] Registration/Login working
- [ ] Database persisting user data

**Once all checked, you're live! 🎉**
