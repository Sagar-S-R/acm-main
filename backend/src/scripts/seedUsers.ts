import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';
import dotenv from 'dotenv';
import User from '../models/User';
import UserRole from '../models/UserRole';
import Team from '../models/Team';

dotenv.config();

const SAMPLE_USERS = [
  {
    username: 'design_user',
    name: 'Design Team Member',
    email: 'design@acmrit.com',
    password: 'password123',
    team: 'Design and Social Media',
  },
  {
    username: 'publicity_user',
    name: 'Publicity Team Member',
    email: 'publicity@acmrit.com',
    password: 'password123',
    team: 'Publicity',
  },
  {
    username: 'events_user',
    name: 'Event Management Member',
    email: 'events@acmrit.com',
    password: 'password123',
    team: 'Event Management',
  },
  {
    username: 'docs_user',
    name: 'Documentation Team Member',
    email: 'docs@acmrit.com',
    password: 'password123',
    team: 'Documentation',
  },
  {
    username: 'coverage_user',
    name: 'Coverage Team Member',
    email: 'coverage@acmrit.com',
    password: 'password123',
    team: 'Coverage',
  },
  {
    username: 'technical_user',
    name: 'Technical Team Member',
    email: 'technical@acmrit.com',
    password: 'password123',
    team: 'Technical',
  },
];

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/acm-rit');
    console.log('✓ Connected to MongoDB');

    // Clear existing users
    await User.deleteMany({});
    console.log('✓ Cleared existing users');

    // Create Team entries (if not exists)
    const TEAM_NAMES = [
      'Design and Social Media',
      'Publicity',
      'Event Management',
      'Documentation',
      'Coverage',
      'Technical',
    ];
    await Promise.all(TEAM_NAMES.map(async (name) => {
      await Team.updateOne({ name }, { name }, { upsert: true });
    }));

    // Create new users
    const createdUsers = await User.create(SAMPLE_USERS);

    // Create corresponding roles for the seeded users
    await Promise.all(createdUsers.map(async (u) => {
      await UserRole.updateOne(
        { userId: u._id.toString() },
        {
          userId: u._id.toString(),
          userName: u.name,
          team: u.team,
          role: u.team === 'Technical' ? 'technical' : 'member',
          canAccessTeams: u.team === 'Technical' ? TEAM_NAMES : [u.team],
        },
        { upsert: true }
      );
    }));
    console.log(`✓ Created ${createdUsers.length} sample users\n`);

    // Display credentials
    console.log('='.repeat(70));
    console.log('SAMPLE LOGIN CREDENTIALS FOR ALL TEAMS');
    console.log('='.repeat(70));
    createdUsers.forEach((user) => {
      console.log(`\n📋 Team: ${user.team}`);
      console.log(`   Username: ${user.username}`);
      console.log(`   Email: ${user.email}`);
      console.log(`   Password: password123`);
    });
    console.log('\n' + '='.repeat(70));
    console.log('All users created successfully! 🎉');
    console.log('='.repeat(70));

    process.exit(0);
  } catch (error) {
    console.error('Error seeding users:', error);
    process.exit(1);
  }
};

seedUsers();
