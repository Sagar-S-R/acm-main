# 📁 Complete Project Structure Overview

## Full Project Layout

```
acm-main/
│
├── 📂 app/                          # Next.js Frontend
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   ├── aboutus/
│   ├── Developers/
│   ├── events/
│   ├── login/                       # 👈 Future: Will add team-based logins here
│   ├── resources/
│   ├── teams/
│   └── fonts/
│
├── 📂 components/                   # React Components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── Intro.tsx
│   ├── Joinus.tsx
│   ├── Growth.tsx
│   ├── Upcomingevents.tsx
│   ├── PrevEventsDisplay.tsx
│   ├── MemberCard.tsx
│   └── ui/                          # Custom UI Components
│       ├── apple-cards-carousel.tsx
│       ├── hero-parallax.tsx
│       └── infinite-moving-cards.tsx
│
├── 📂 eventsData/                   # Static Event Data
│   ├── chapterOfficerDetils.js
│   ├── membersDetails.js
│   ├── recentEvents/
│   │   └── previousEvents.js
│   └── upComing/
│       └── upComingEvents.js
│
├── 📂 public/                       # Static Assets
│   ├── main-logo.png
│   ├── coreTeam/
│   ├── eventsImages/
│   └── generalImages/
│
├── 📂 backend/                      # ✨ NEW: Express Backend
│   ├── 📂 src/
│   │   ├── 📂 config/
│   │   │   └── database.ts          # MongoDB connection
│   │   │
│   │   ├── 📂 controllers/
│   │   │   ├── authController.ts    # Register, Login, GetMe
│   │   │   └── leaveController.ts   # Leave CRUD operations
│   │   │
│   │   ├── 📂 middleware/
│   │   │   └── auth.ts              # JWT verification
│   │   │
│   │   ├── 📂 models/
│   │   │   ├── User.ts              # User schema
│   │   │   ├── Leave.ts             # Leave schema
│   │   │   └── Team.ts              # Team schema
│   │   │
│   │   ├── 📂 routes/
│   │   │   ├── auth.ts              # /api/auth/*
│   │   │   └── leave.ts             # /api/leaves/*
│   │   │
│   │   └── server.ts                # Main Express app
│   │
│   ├── 📂 dist/                     # Compiled JS (generated)
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env.example
│   ├── .gitignore
│   ├── README.md                    # Backend Documentation
│   └── ACM-RIT-API.postman_collection.json # API Testing
│
├── 📂 hooks/                        # React Hooks
│   └── use-outside-click.ts
│
├── 📂 lib/                          # Utility Functions
│   └── utils.ts
│
├── 📂 utils/                        # More Utilities
│   └── cn.ts
│
├── 📄 package.json                  # Frontend Dependencies
├── 📄 tsconfig.json
├── 📄 tailwind.config.ts
├── 📄 postcss.config.mjs
├── 📄 next.config.ts
├── 📄 components.json
├── 📄 README.md
├── 📄 sample.env
├── 🆕 BACKEND_SETUP.md             # Backend Setup Guide
├── 🆕 setup-backend.sh             # Backend Installation Script
└── 📄 .git/                         # Git Repository
```

## 📊 Technology Stack

### Frontend
- ✅ Next.js 15
- ✅ React 18
- ✅ TypeScript
- ✅ Tailwind CSS
- ✅ Framer Motion (animations)
- ✅ React Icons

### Backend (NEW)
- ✅ Express.js
- ✅ TypeScript
- ✅ MongoDB + Mongoose
- ✅ JWT Authentication
- ✅ bcryptjs (Password hashing)
- ✅ express-validator (Input validation)

### Database
- ✅ MongoDB (local or Atlas)

### Deployment
- Frontend: Vercel (live at acmrit.vercel.app)
- Backend: Ready for deployment (Heroku, Railway, Render, etc.)

## 🎯 6 Teams Structure

Each team will have:
1. ✅ User registration/login
2. ✅ Leave management system
3. ⏳ Dashboard (to be created)
4. ⏳ Member list view
5. ⏳ Leave approval interface

**Teams:**
- Design and Social Media
- Publicity
- Event Management
- Documentation
- Coverage
- Technical

## 🔄 Data Flow

```
Frontend (Next.js)
        ↓
    Login Page (any team)
        ↓
 Backend Auth API
        ↓
 MongoDB User Storage
        ↓
 JWT Token Generated
        ↓
 Team Dashboard
        ↓
 Leave Management API
        ↓
 MongoDB Leave Storage
```

## 📝 API Base URL

- **Development**: `http://localhost:5000`
- **Production**: (To be configured)

## 🚀 Running the Project

### Frontend
```bash
npm run dev    # http://localhost:3000
```

### Backend
```bash
cd backend
npm install
npm run dev    # http://localhost:5000
```

## 📋 Next Phase Tasks

After this setup, you'll need to:

1. **Frontend Dashboard Pages**
   - Create 6 separate dashboard pages (one per team)
   - Design team-specific views
   - Add leave application forms

2. **Frontend Login Integration**
   - Connect frontend login page to backend API
   - Store JWT tokens
   - Redirect to team dashboard

3. **Approval System**
   - Team heads/admins can approve leaves
   - Notifications for leave status changes

4. **Additional Features**
   - Attendance tracking
   - Event management
   - Member profiles
   - Team statistics

---

**Backend Status**: ✅ Phase 1 Complete
**Frontend Status**: ⏳ Awaiting Next Phase Instructions
