#!/bin/bash

# Backend Setup Script for ACM-RIT

echo "🚀 Setting up ACM-RIT Backend..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js >= 16"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo ""

# Navigate to backend directory
cd backend || exit 1

echo "📦 Installing dependencies..."
npm install

echo ""
echo "✅ Backend setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Copy .env.example to .env and update values"
echo "2. Make sure MongoDB is running"
echo "3. Run 'npm run dev' to start the server"
echo ""
echo "📚 Documentation: See backend/README.md"
echo "🚀 Development: npm run dev"
echo "🏗️  Production: npm run build && npm start"
