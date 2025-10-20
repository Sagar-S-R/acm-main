# ACM RIT Team Management System - Complete Implementation

## 📋 Project Overview

This is a comprehensive full-stack team management system for ACM RIT student chapter with:
- **Express.js backend** with MongoDB database
- **Next.js frontend** with React and Tailwind CSS
- **Role-based access control** for 6 different teams
- **Team-specific dashboards** with CRUD operations
- **File upload support** for design assets
- **Social media integration** for posting across platforms
- **Admin controls** for user management

---

## 🏗️ Architecture

### Backend (`/backend`)
- **Framework**: Express.js with TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT tokens + bcryptjs password hashing
- **Port**: 5000 (configurable via `.env`)

### Frontend (`/app`)
- **Framework**: Next.js 15 with React 18
- **Styling**: Tailwind CSS
- **State Management**: React hooks with localStorage
- **Protected Routes**: Authentication middleware on all dashboard pages

---

## 👥 Teams & Access Levels

### 6 Core Teams

1. **Design and Social Media**
   - Upload & manage design posters
   - Create social media posts
   - Private team gallery
   - Poster approval workflow

2. **Documentation**
   - Manage events (create, edit, delete)
   - Manage resources (tutorials, links, documents)
   - Edit about page sections
   - Track event attendance

3. **Publicity**
   - View all events and resources
   - (Base member permissions)

4. **Event Management**
   - Manage events
   - Organize activities

5. **Coverage**
   - View events and resources
   - (Base member permissions)

6. **Technical**
   - **Admin-level access** to all teams
   - User role management
   - Team statistics
   - System oversight

### Role Hierarchy

- **Member**: Team-specific access
- **Lead**: Team leadership + member operations
- **Admin**: Full system access (Teacher)
- **Technical**: Full system access + approval authority

---

## 🗄️ Database Models

### User
```typescript
- _id: ObjectId
- name: String
- email: String (unique)
- password: String (hashed)
- team: Enum (6 teams)
- isActive: Boolean
- createdAt: Date
- updatedAt: Date
```

### UserRole
```typescript
- userId: String (unique)
- role: Enum (member, lead, admin, technical)
- permissions: String[]
- canAccessTeams: String[] (for admin/technical)
- isActive: Boolean
```

### Event
```typescript
- title: String
- date: Date
- location: String
- description: String
- status: Enum (scheduled, completed)
- createdBy: ObjectId (User reference)
- attendeeCount: Number
```

### Resource
```typescript
- title: String
- category: Enum (Tutorials, Documentation, Tools, Articles, Videos, Other)
- url: String
- description: String
- createdBy: ObjectId
- createdAt: Date
```

### Poster
```typescript
- title: String
- eventName: String
- description: String
- imageUrl: String
- visibility: Enum (private, public)
- designedBy: ObjectId
- isApproved: Boolean
- approvedBy: ObjectId (Admin/Technical)
- createdAt: Date
```

### SocialMediaPost
```typescript
- title: String
- content: String
- platforms: String[] (Instagram, Facebook, LinkedIn, Twitter, YouTube, Telegram, Discord)
- status: Enum (draft, scheduled, posted)
- postedBy: ObjectId
- eventId: ObjectId
- engagement: { likes, comments, shares }
- scheduledFor: Date
- createdAt: Date
```

### AboutPage
```typescript
- sections: [
    {
      name: String (mission, vision, about, team, achievements)
      content: String
      lastUpdatedBy: ObjectId
      lastUpdatedAt: Date
    }
  ]
```

---

## 🔌 API Endpoints

### Authentication (`/api/auth`)
```
POST   /auth/register          - Create new user account
POST   /auth/login             - Login and receive JWT token
GET    /auth/me                - Get current user profile (protected)
```

### Leave Management (`/api/leaves`)
```
POST   /leaves/apply           - Request leave (protected)
GET    /leaves/my-leaves       - View personal leave requests (protected)
GET    /leaves/team-leaves     - View team leave requests (protected)
PUT    /leaves/:leaveId/status - Approve/reject leave (protected, lead only)
```

### Documentation (`/api/documentation`)
```
POST   /documentation/events           - Create event (protected, doc team)
GET    /documentation/events           - List all events (protected)
GET    /documentation/events/:id       - Get event details (protected)
PUT    /documentation/events/:id       - Update event (protected, owner)
DELETE /documentation/events/:id       - Delete event (protected, owner)

POST   /documentation/resources        - Create resource (protected, doc team)
GET    /documentation/resources        - List resources (protected)
DELETE /documentation/resources/:id    - Delete resource (protected, owner)

POST   /documentation/about            - Create/update about section (protected)
GET    /documentation/about            - Get about page (protected)
DELETE /documentation/about/:section   - Delete section (protected)
```

### Design (`/api/design`)
```
POST   /design/posters              - Upload poster (protected, design team)
GET    /design/my-posters           - Get personal posters (protected, design team)
GET    /design/team-gallery         - Get team gallery (protected, design team)
GET    /design/public               - Get approved public posters (public)
PUT    /design/posters/:id          - Update poster (protected, owner)
DELETE /design/posters/:id          - Delete poster (protected, owner)
PUT    /design/posters/:id/approve  - Approve poster (protected, admin/technical)
```

### Social Media (`/api/social-media`)
```
POST   /social-media                    - Create post (protected, social team)
GET    /social-media/my-posts           - Get personal posts (protected, social team)
GET    /social-media/team-posts         - Get team posts (protected, social team)
GET    /social-media/event/:eventId     - Get posts for event (protected)
PUT    /social-media/:postId            - Update post (protected, owner)
PUT    /social-media/:postId/posted     - Mark as posted (protected, owner)
PUT    /social-media/:postId/engagement - Update engagement (protected, owner)
DELETE /social-media/:postId            - Delete post (protected, owner)
```

### Admin (`/api/admin`)
```
POST   /admin/roles/create         - Create user role (protected, admin only)
PUT    /admin/roles/:roleId        - Update user role (protected, admin only)
GET    /admin/users                - List all users (protected, admin only)
GET    /admin/users/:team          - List team members (protected, admin only)
POST   /admin/users/assign-team    - Assign user to team (protected, admin only)
PUT    /admin/users/:id/deactivate - Deactivate user (protected, admin only)
PUT    /admin/users/:id/activate   - Activate user (protected, admin only)
DELETE /admin/users/:id            - Delete user (protected, admin only)
GET    /admin/stats/teams          - Get team statistics (protected, admin only)
```

### Teams (`/api/teams`)
```
GET    /teams                  - Get all teams (protected)
GET    /teams/:name            - Get team details (protected)
GET    /teams/:name/members    - Get team members (protected)
GET    /teams/:name/stats      - Get team statistics (protected)
```

---

## 📱 Frontend Dashboard Pages

### Protected Routes (All require login)

**Main Dashboard**
- `/dashboard` - Main dashboard with user info
- `/dashboard/profile` - User profile page

**Documentation Team**
- `/dashboard/documentation/events` - Manage events
- `/dashboard/documentation/resources` - Manage resources
- `/dashboard/documentation/about` - Manage about page

**Design Team**
- `/dashboard/design/upload` - Upload posters
- `/dashboard/design/gallery` - View personal gallery

**Social Media Team**
- `/dashboard/social-media/create` - Create posts
- `/dashboard/social-media/posts` - View posts

**Admin Panel**
- `/dashboard/admin/users` - Manage users
- `/dashboard/admin/teams` - View team statistics

---

## ⚙️ Setup Instructions

### Backend Setup

1. **Install dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Configure environment**
   Create `.env` file:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/acm-rit
   JWT_SECRET=your_jwt_secret_key_here
   FRONTEND_URL=http://localhost:3000
   ```

3. **Build TypeScript**
   ```bash
   npm run build
   ```

4. **Start server**
   ```bash
   npm start
   # or for development
   npm run dev
   ```

### Frontend Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Build**
   ```bash
   npm run build
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

---

## 🔐 Authentication Flow

1. **Registration**
   - User creates account with name, email, password, team
   - Password hashed with bcryptjs (salt rounds: 10)
   - User stored in MongoDB

2. **Login**
   - User provides email and password
   - Backend validates credentials
   - JWT token generated (30-day expiry)
   - Token stored in localStorage

3. **Protected Routes**
   - Frontend checks for token in localStorage
   - If missing, redirects to `/login`
   - Backend verifies token validity
   - Request rejected if token invalid/expired

---

## 🎯 Feature Highlights

### Documentation Team
- ✅ Create, read, update, delete events
- ✅ Manage resources with categories
- ✅ Edit multiple about page sections
- ✅ Track event attendance

### Design Team
- ✅ Upload poster images (metadata stored)
- ✅ Private team gallery (design team only)
- ✅ Public approval workflow
- ✅ Admin/Technical approval required

### Social Media Team
- ✅ Create posts for multiple platforms
- ✅ Schedule posts for later
- ✅ Track engagement (likes, comments, shares)
- ✅ Link posts to specific events
- ✅ View draft, scheduled, and posted content

### Admin & Technical
- ✅ Full user management
- ✅ Role assignment and modification
- ✅ Team statistics and analytics
- ✅ User activation/deactivation
- ✅ Poster approval authority

---

## 🚀 Deployment

### Frontend (Vercel)
```bash
# Already deployed at acmrit.vercel.app
# Connected to GitHub for auto-deployment
```

### Backend (Local/Cloud)
- Deploy to Heroku, AWS, or similar
- Set environment variables
- Ensure MongoDB connection is accessible
- Update FRONTEND_URL for CORS

---

## 📝 Sample Login Credentials

After creating users via admin panel:
```
Email: user@example.com
Password: (set during user creation)
Team: Documentation/Design and Social Media/etc
Role: member/lead/admin/technical
```

---

## 🛠️ Development Notes

### TypeScript
- Backend uses TypeScript with strict mode
- Frontend uses TypeScript for type safety
- All models fully typed with interfaces

### Error Handling
- Try-catch blocks on all async operations
- Proper HTTP status codes (200, 201, 400, 401, 403, 404, 500)
- User-friendly error messages

### Security
- JWT authentication on all protected endpoints
- Password hashing before storage
- CORS enabled for frontend origin only
- Input validation on all endpoints

### Performance
- Indexed database queries on userId, email
- Pagination-ready for large datasets
- Async operations for file uploads

---

## 📚 Technology Stack

| Layer | Technologies |
|-------|---|
| Frontend | Next.js 15, React 18, TypeScript, Tailwind CSS |
| Backend | Express.js, TypeScript, MongoDB, Mongoose |
| Auth | JWT, bcryptjs |
| Deployment | Vercel (Frontend), Self-hosted/Cloud (Backend) |

---

## ✅ Completed Features

- [x] Backend structure with TypeScript
- [x] MongoDB models for all entities
- [x] User authentication with JWT
- [x] Leave management system
- [x] Role-based access control
- [x] Documentation team APIs
- [x] Design team APIs with approval
- [x] Social media team APIs
- [x] Admin user management
- [x] Team statistics
- [x] Frontend dashboard layout
- [x] Protected routes
- [x] Team-specific pages
- [x] CRUD operations for all features

---

## 🔄 Next Steps

1. **File Upload Integration**
   - Connect to AWS S3 or Cloudinary for poster images
   - Update poster endpoints to handle file streams

2. **Notifications**
   - Email notifications for approvals
   - In-app notification system
   - Approval request alerts

3. **Analytics**
   - Dashboard analytics page
   - Event attendance tracking
   - Social media performance metrics

4. **Enhanced UI**
   - Mobile responsive design
   - Real-time updates with WebSockets
   - Dark mode support

5. **Additional Features**
   - Leave management dashboard
   - Event feedback forms
   - Resource download tracking
   - Poster analytics

---

## 📞 Support

For issues or questions:
1. Check backend logs: `npm run dev`
2. Check frontend console (F12 in browser)
3. Verify MongoDB connection
4. Ensure all environment variables are set
5. Check CORS settings if API calls fail

---

**Last Updated**: 2024
**Status**: Complete - Ready for Production
