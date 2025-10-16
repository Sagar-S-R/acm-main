# ACM-RIT Backend API

Express.js backend server for ACM-RIT Student Chapter management system with authentication and leave management.

## Features

- **Team-based Authentication**: Register and login for 6 different teams
- **Leave Management**: Apply, view, and manage leaves for team members
- **JWT Authentication**: Secure token-based authentication
- **MongoDB Integration**: Persistent data storage

## Teams Supported

1. Design and Social Media
2. Publicity
3. Event Management
4. Documentation
5. Coverage
6. Technical

## Installation

```bash
cd backend
npm install
```

## Environment Setup

Create a `.env` file in the backend directory:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/acm-rit
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

## Running the Server

### Development Mode (with auto-reload)
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

## API Endpoints

### Authentication

#### Register
```
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "team": "Technical",
  "usn": "1MS21CS001",
  "phoneNumber": "9876543210"
}
```

#### Login
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "team": "Technical"
  }
}
```

#### Get Current User
```
GET /api/auth/me
Authorization: Bearer <token>
```

### Leave Management

#### Apply Leave
```
POST /api/leaves/apply
Authorization: Bearer <token>
Content-Type: application/json

{
  "leaveType": "Sick Leave",
  "reason": "Medical appointment",
  "startDate": "2024-10-20",
  "endDate": "2024-10-21"
}
```

#### Get My Leaves
```
GET /api/leaves/my-leaves
Authorization: Bearer <token>
```

#### Get Team Leaves
```
GET /api/leaves/team-leaves
Authorization: Bearer <token>
```

#### Update Leave Status (Admin Only)
```
PUT /api/leaves/:leaveId/status
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "Approved",
  "approvedBy": "Team Lead Name"
}
```

## Database Models

### User
- name (String)
- email (String) - unique
- password (String) - hashed with bcryptjs
- team (String) - enum of 6 teams
- usn (String)
- phoneNumber (String)
- profileImage (String)
- isActive (Boolean)
- timestamps

### Leave
- userId (ObjectId - ref: User)
- userName (String)
- team (String)
- leaveType (enum: Sick Leave, Personal Leave, Casual Leave, Other)
- reason (String)
- startDate (Date)
- endDate (Date)
- numberOfDays (Number)
- status (enum: Pending, Approved, Rejected)
- approvedBy (String)
- timestamps

### Team
- name (String) - unique
- description (String)
- head (String)
- members (Array of ObjectIds - ref: User)
- timestamps

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── database.ts       # MongoDB connection
│   ├── controllers/
│   │   ├── authController.ts # Authentication logic
│   │   └── leaveController.ts# Leave management logic
│   ├── middleware/
│   │   └── auth.ts           # JWT verification
│   ├── models/
│   │   ├── User.ts
│   │   ├── Leave.ts
│   │   └── Team.ts
│   ├── routes/
│   │   ├── auth.ts           # Auth endpoints
│   │   └── leave.ts          # Leave endpoints
│   └── server.ts             # Main server file
├── dist/                     # Compiled JavaScript
├── package.json
├── tsconfig.json
└── .env.example
```

## Technologies Used

- **Express.js**: Web framework
- **TypeScript**: For type safety
- **MongoDB**: Database
- **Mongoose**: ODM for MongoDB
- **JWT**: JSON Web Tokens for authentication
- **bcryptjs**: Password hashing
- **express-validator**: Input validation
- **CORS**: Cross-Origin Resource Sharing

## Next Steps

1. ✅ Backend structure created
2. ✅ Authentication system implemented
3. ✅ Leave management system implemented
4. ⏳ Frontend integration (Next.js login pages for each team)
5. ⏳ Team dashboard pages
6. ⏳ Admin features for leave approval

## Notes

- This is Phase 1: Basic setup with login and leave management
- Phase 2 will include specific team-based access controls
- Password reset functionality can be added later
- Email notifications can be implemented for leave status updates
