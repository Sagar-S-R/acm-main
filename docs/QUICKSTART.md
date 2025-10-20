# 🚀 Quick Start Guide

## Prerequisites
- Node.js 16+ installed
- MongoDB running locally or MongoDB Atlas connection string
- Git installed

## Backend Setup (5 minutes)

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Create .env file
cat > .env << EOF
PORT=5000
MONGODB_URI=mongodb://localhost:27017/acm-rit
JWT_SECRET=your_secret_key_12345
FRONTEND_URL=http://localhost:3000
EOF

# Build TypeScript
npm run build

# Start server
npm start
# Server runs on http://localhost:5000
```

## Frontend Setup (5 minutes)

```bash
# From root directory
# Install dependencies
npm install

# Build
npm run build

# Start development server
npm run dev
# Frontend runs on http://localhost:3000
```

## Create Your First Admin User

```bash
# 1. Register via frontend at http://localhost:3000/login
# Fill in: Name, Email, Password, Select Team: Technical, Role: admin

# 2. Login with credentials
# 3. Navigate to Dashboard → Admin → Manage Users

# 4. Create additional users for other teams using the admin panel
```

## Quick Test

1. **Create Event (Documentation Team)**
   - Login as doc team member
   - Go to `/dashboard/documentation/events`
   - Click "Create Event"
   - Fill in details and submit

2. **Upload Poster (Design Team)**
   - Login as design team member
   - Go to `/dashboard/design/upload`
   - Upload poster with event name
   - Set visibility to "Private"

3. **Create Social Post (Social Media Team)**
   - Login as social media team member
   - Go to `/dashboard/social-media/create`
   - Write post content
   - Select platforms
   - Click "Create Post"

## API Testing with cURL

```bash
# Register user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "team": "Documentation"
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'

# Use returned token for protected routes
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Troubleshooting

### "Cannot connect to MongoDB"
- Ensure MongoDB is running: `mongod`
- Or update `MONGODB_URI` in `.env` to use MongoDB Atlas

### "CORS error when calling API"
- Make sure `FRONTEND_URL` in backend `.env` matches your frontend URL
- Default: `http://localhost:3000`

### "Port 5000 already in use"
- Change PORT in backend `.env` to another port (e.g., 5001)
- Update frontend API calls accordingly

### "Next.js build fails"
- Clear cache: `rm -rf .next`
- Reinstall: `rm -rf node_modules && npm install`
- Try build again: `npm run build`

## File Structure

```
acm-main/
├── app/                          # Next.js frontend
│   ├── dashboard/               # Protected dashboard pages
│   │   ├── documentation/       # Doc team pages
│   │   ├── design/              # Design team pages
│   │   ├── social-media/        # Social media team pages
│   │   ├── admin/               # Admin pages
│   │   └── profile/             # User profile
│   ├── login/                   # Login page
│   └── page.tsx                 # Home page
│
├── backend/                      # Express.js backend
│   ├── src/
│   │   ├── models/              # MongoDB schemas
│   │   ├── controllers/         # Route handlers
│   │   ├── routes/              # API routes
│   │   ├── middleware/          # Auth, validation
│   │   ├── config/              # Database connection
│   │   └── server.ts            # Express app
│   ├── dist/                    # Compiled JavaScript
│   ├── package.json
│   └── tsconfig.json
│
└── IMPLEMENTATION_GUIDE.md       # Full documentation
```

## Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/acm-rit
JWT_SECRET=your_secret_key_here
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

### Frontend (Next.js auto-detects localhost:5000)
- Backend URL hardcoded as `http://localhost:5000` in API calls
- Change in each component's fetch URL if needed

## Team Access Matrix

| Feature | Doc | Design | Social | Publicity | Coverage | Technical | Admin |
|---------|-----|--------|--------|-----------|----------|-----------|-------|
| Manage Events | ✅ | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ |
| Upload Posters | ❌ | ✅ | ❌ | ❌ | ❌ | ✅ | ✅ |
| Create Posts | ❌ | ✅ | ✅ | ❌ | ❌ | ✅ | ✅ |
| Manage Resources | ✅ | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ |
| Edit About Page | ✅ | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ |
| Manage Users | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ |
| Team Stats | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ |

## Useful Commands

```bash
# Backend
cd backend
npm run dev          # Development with auto-reload
npm run build        # Compile TypeScript
npm start            # Production run

# Frontend
npm run dev          # Development server
npm run build        # Production build
npm run lint         # Check for errors

# MongoDB
mongod               # Start MongoDB service
mongo                # Open MongoDB shell
```

## Default Ports

- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- MongoDB: localhost:27017

## Next Steps

1. ✅ Set up backend and frontend
2. ✅ Create admin user
3. ✅ Create team users
4. ✅ Test each team's features
5. 📤 Deploy to production (Vercel for frontend, Heroku/AWS for backend)

---

For more details, see **IMPLEMENTATION_GUIDE.md**
