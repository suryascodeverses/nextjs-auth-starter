# Next.js Authentication Starter (Frontend Only)

A frontend-focused Next.js 15 authentication starter with TypeScript and Tailwind CSS. This project is designed to work with a backend API while providing dummy data support for development without a backend server.

## 🎯 Key Features

- ✨ **Next.js 15** with App Router
- 🔐 **Complete Authentication Pages**
  - User registration
  - User login
  - Protected dashboard
- 🔄 **Dual Mode Operation**
  - **Dummy Data Mode**: Works without backend (localStorage)
  - **API Mode**: Connects to your backend server
- 🎨 **Tailwind CSS** for styling
- 🌙 **Dark mode** support (automatic)
- 📱 **Responsive design**
- 🎯 **TypeScript** for type safety
- 🚀 **Modern UI/UX** with smooth transitions

## 📦 Project Structure

```
nextjs-auth-starter/
├── app/
│   ├── login/
│   │   └── page.tsx           # Login page
│   ├── register/
│   │   └── page.tsx           # Registration page
│   ├── dashboard/
│   │   └── page.tsx           # Protected dashboard page
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Home page
│   └── globals.css            # Global styles with Tailwind
├── lib/
│   └── api.ts                 # API service with dummy data toggle
├── public/                    # Static assets
├── .env.example               # Environment variables template
├── .env.local                 # Your local environment config
├── .gitignore                 # Git ignore rules
├── package.json               # Dependencies and scripts
├── tsconfig.json              # TypeScript configuration
├── tailwind.config.ts         # Tailwind CSS configuration
└── README.md                  # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm, yarn, or pnpm package manager

### Installation

1. **Install dependencies**

```bash
npm install
# or
yarn install
# or
pnpm install
```

2. **Configure environment variables**

Copy the `.env.example` file to `.env.local`:

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5000/backend_api

# Use dummy data (true) or real API (false)
NEXT_PUBLIC_USE_DUMMY_DATA=true
```

3. **Run the development server**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000)

## 🔄 Switching Between Dummy Data and Real API

### Using Dummy Data (No Backend Required)

Set in `.env.local`:

```env
NEXT_PUBLIC_USE_DUMMY_DATA=true
```

**Features:**

- ✅ Full authentication flow works
- ✅ Data stored in browser localStorage
- ✅ Simulates network delays
- ✅ Perfect for frontend development
- ⚠️ Data resets when localStorage is cleared

### Using Real Backend API

Set in `.env.local`:

```env
NEXT_PUBLIC_USE_DUMMY_DATA=false
NEXT_PUBLIC_API_URL=http://your-backend-url/backend_api
```

**Required Backend Endpoints:**

Your backend should provide these endpoints:

```
POST /backend_api/auth/register
Body: { name: string, email: string, password: string }
Response: { success: boolean, user: { id, name, email }, error?: string }

POST /backend_api/auth/login
Body: { email: string, password: string }
Response: { success: boolean, user: { id, name, email }, token: string, error?: string }

POST /backend_api/auth/logout
Headers: Authorization: Bearer <token>
Response: { success: boolean }

GET /backend_api/auth/me
Headers: Authorization: Bearer <token>
Response: { user: { id, name, email } }
```

## 📖 Usage Guide

### Registration Flow

1. Navigate to `/register`
2. Fill in name, email, and password
3. Submit the form
4. **Dummy Mode**: User stored in localStorage
5. **API Mode**: User created in backend database
6. Redirected to login page

### Login Flow

1. Navigate to `/login`
2. Enter email and password
3. Submit the form
4. **Dummy Mode**: Credentials checked against localStorage
5. **API Mode**: Credentials sent to backend
6. On success, JWT token stored in localStorage
7. Redirected to dashboard

### Dashboard Access

1. Protected route - requires authentication
2. Automatically checks for valid token
3. Redirects to login if not authenticated
4. Displays user information
5. Shows mock statistics and activity
6. Logout button available

## 🎨 Customization

### Changing API Endpoints

Edit `lib/api.ts` to modify the endpoint paths:

```typescript
// Change from /auth/login to /user/login
const response = await fetch(`${API_URL}/user/login`, {
  // ...
});
```

### Styling

All styling is done with Tailwind CSS:

- Modify colors in `tailwind.config.ts`
- Update global styles in `app/globals.css`
- Change component styles using Tailwind utility classes

### Adding New Fields

To add fields to user registration:

1. Update the form in `app/register/page.tsx`
2. Update the API call in `lib/api.ts`
3. Update the User interface in `lib/api.ts`

```typescript
export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string; // Add new field
}
```

## 🔐 Authentication Flow

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│  User registers → API call → Response               │
│                                                     │
│  User logs in → API call → JWT token received      │
│                                                     │
│  Token stored in localStorage                       │
│                                                     │
│  Protected routes check token                       │
│                                                     │
│  API requests include token in Authorization header │
│                                                     │
│  User logs out → Token removed from localStorage    │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 📱 Pages Overview

### Home Page (`/`)

- Landing page with navigation
- Shows API mode indicator
- Links to login and register

### Login Page (`/login`)

- Email and password form
- Form validation
- Error handling
- Remember me option
- Link to register

### Register Page (`/register`)

- Name, email, password fields
- Password confirmation
- Client-side validation
- Link to login

### Dashboard (`/dashboard`)

- Protected route
- User welcome message
- Statistics cards (dummy data)
- Recent activity feed (dummy data)
- Logout functionality

## 🔧 API Service (`lib/api.ts`)

The `apiService` object provides these methods:

```typescript
// Register a new user
await apiService.register(name, email, password);

// Login a user
await apiService.login(email, password);

// Logout current user
await apiService.logout();

// Get current user
await apiService.getCurrentUser();

// Check if user is authenticated
apiService.isAuthenticated();

// Get stored user data
apiService.getStoredUser();
```

## 🌐 Environment Variables

| Variable                     | Description            | Example                             |
| ---------------------------- | ---------------------- | ----------------------------------- |
| `NEXT_PUBLIC_API_URL`        | Backend API base URL   | `http://localhost:5000/backend_api` |
| `NEXT_PUBLIC_USE_DUMMY_DATA` | Toggle dummy data mode | `true` or `false`                   |

## 🛠️ Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Run linter
npm run lint
```

## 🎯 Backend Integration Checklist

When you're ready to connect to a real backend:

- [ ] Set up your backend API server
- [ ] Implement the required authentication endpoints
- [ ] Update `NEXT_PUBLIC_API_URL` in `.env.local`
- [ ] Set `NEXT_PUBLIC_USE_DUMMY_DATA=false`
- [ ] Test registration flow
- [ ] Test login flow
- [ ] Test token validation
- [ ] Test logout flow
- [ ] Configure CORS on your backend
- [ ] Set up proper error handling

## 🔒 Security Considerations

### Current Implementation (Development)

- ✅ Client-side validation
- ✅ Password confirmation
- ✅ Token-based authentication
- ✅ Protected routes

### Production Requirements

- ⚠️ Use HTTPS only
- ⚠️ Implement CSRF protection
- ⚠️ Add rate limiting
- ⚠️ Secure token storage (httpOnly cookies recommended)
- ⚠️ Implement refresh tokens
- ⚠️ Add input sanitization
- ⚠️ Enable Content Security Policy
- ⚠️ Regular security audits

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables:
   - `NEXT_PUBLIC_API_URL`: Your backend API URL
   - `NEXT_PUBLIC_USE_DUMMY_DATA`: Set to `false`
4. Deploy!

### Other Platforms

Works on any platform that supports Next.js:

- Netlify
- Railway
- Render
- AWS Amplify
- Google Cloud
- Azure

**Important**: Always set environment variables in your deployment platform.

## 🤝 Contributing

Contributions are welcome! Feel free to:

- Report bugs
- Suggest new features
- Submit pull requests

## 📄 License

MIT License - feel free to use this starter for your projects!
