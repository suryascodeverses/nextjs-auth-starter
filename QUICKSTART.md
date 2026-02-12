# Quick Start Guide

Get your Next.js auth frontend running in 2 minutes!

## ⚡ Super Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Copy environment file
cp .env.example .env.local

# 3. Start development server
npm run dev
```

Visit: **http://localhost:3000**

## 🎮 Try It Out

### With Dummy Data (Default)

The app works immediately without any backend!

1. **Register**: Go to `/register`
   - Name: Test User
   - Email: test@example.com
   - Password: password123

2. **Login**: Go to `/login`
   - Email: test@example.com
   - Password: password123

3. **Dashboard**: You'll see your protected dashboard!

### Current Mode Indicator

The home page shows:
- 🟨 **Dummy Data** = No backend needed
- 🟩 **Live Server** = Connected to real backend

## 🔄 Switch to Real Backend

Edit `.env.local`:

```env
# Change this from true to false
NEXT_PUBLIC_USE_DUMMY_DATA=false

# Set your backend URL
NEXT_PUBLIC_API_URL=http://localhost:5000/backend_api
```

**Restart the dev server** to apply changes.

## 📋 Backend API Requirements

Your backend needs these endpoints:

### POST /backend_api/auth/register
```json
Request: { "name": "string", "email": "string", "password": "string" }
Response: { "success": true, "user": { "id": "...", "name": "...", "email": "..." } }
```

### POST /backend_api/auth/login
```json
Request: { "email": "string", "password": "string" }
Response: { "success": true, "token": "jwt-token", "user": { ... } }
```

### GET /backend_api/auth/me
```
Headers: Authorization: Bearer <token>
Response: { "user": { "id": "...", "name": "...", "email": "..." } }
```

### POST /backend_api/auth/logout
```
Headers: Authorization: Bearer <token>
Response: { "success": true }
```

## 🎯 Project Structure

```
app/
├── page.tsx          → Home page with mode indicator
├── login/            → Login page
├── register/         → Register page
└── dashboard/        → Protected dashboard

lib/
└── api.ts            → All API calls + dummy data logic
```

## 🔧 Key Files

### `.env.local` - Configuration
Controls whether to use dummy data or real API

### `lib/api.ts` - API Service
All authentication logic is here:
- `apiService.register()`
- `apiService.login()`
- `apiService.logout()`
- `apiService.getCurrentUser()`

## 💡 Development Tips

### Using Dummy Data
- Perfect for frontend development
- No backend needed
- Data stored in browser localStorage
- Reset by clearing browser storage

### Connecting to Backend
1. Make sure backend is running
2. Update `.env.local`
3. Restart dev server
4. Check browser console for errors

## 🐛 Common Issues

**"API URL not set"**
→ Create `.env.local` from `.env.example`

**"CORS error"**
→ Enable CORS on your backend for `http://localhost:3000`

**"Token invalid"**
→ Clear localStorage and login again

**"Page not found"**
→ Make sure dev server is running on port 3000

## 📱 Pages

- **/** - Home with API status
- **/login** - Login form
- **/register** - Registration form
- **/dashboard** - Protected page (login required)

## 🎨 Customization

### Change colors
Edit `tailwind.config.ts`

### Modify API endpoints
Edit `lib/api.ts`

### Add new pages
Create in `app/` directory

## 🚀 What's Included

✅ Modern UI with Tailwind CSS
✅ Dark mode (automatic)
✅ Responsive design
✅ Form validation
✅ Error handling
✅ Loading states
✅ TypeScript
✅ Dummy data support
✅ Token-based auth

## 📖 Full Documentation

See `README.md` for complete documentation including:
- Detailed API integration guide
- Security best practices
- Deployment instructions
- Advanced customization

## 🎯 Next Steps

1. ✅ Get it running (you're here!)
2. Test with dummy data
3. Build your backend API
4. Connect to real backend
5. Deploy to production

---

**Need help?** Check the full README.md or open an issue!

**Happy coding! 🎉**
