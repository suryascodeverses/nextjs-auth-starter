#!/bin/bash

# Next.js Authentication Starter - Project Structure Generator
# This script creates all directories and empty files for the project

set -e  # Exit on error

PROJECT_NAME="nextjs-auth-starter"

echo "🚀 Creating Next.js Authentication Starter structure..."
echo ""

# Create project root
mkdir -p "$PROJECT_NAME"
cd "$PROJECT_NAME"

# Create directory structure
echo "📁 Creating directories..."
mkdir -p app/login
mkdir -p app/register
mkdir -p app/dashboard
mkdir -p lib
mkdir -p public

# Create root config files
echo "📄 Creating configuration files..."
touch package.json
touch tsconfig.json
touch tailwind.config.ts
touch postcss.config.js
touch next.config.ts
touch .gitignore
touch .eslintrc.json
touch .env.example
touch .env.local

# Create documentation files
echo "📚 Creating documentation files..."
touch README.md
touch QUICKSTART.md
touch API-INTEGRATION.md

# Create app files
echo "🎨 Creating app files..."
touch app/layout.tsx
touch app/page.tsx
touch app/globals.css

# Create page files
touch app/login/page.tsx
touch app/register/page.tsx
touch app/dashboard/page.tsx

# Create lib files
echo "🔧 Creating library files..."
touch lib/api.ts

echo ""
echo "✅ Project structure created successfully!"
echo ""
echo "📂 Structure:"
echo "$PROJECT_NAME/"
echo "├── app/"
echo "│   ├── dashboard/"
echo "│   │   └── page.tsx"
echo "│   ├── login/"
echo "│   │   └── page.tsx"
echo "│   ├── register/"
echo "│   │   └── page.tsx"
echo "│   ├── layout.tsx"
echo "│   ├── page.tsx"
echo "│   └── globals.css"
echo "├── lib/"
echo "│   └── api.ts"
echo "├── public/"
echo "├── .env.example"
echo "├── .env.local"
echo "├── .eslintrc.json"
echo "├── .gitignore"
echo "├── API-INTEGRATION.md"
echo "├── next.config.ts"
echo "├── package.json"
echo "├── postcss.config.js"
echo "├── QUICKSTART.md"
echo "├── README.md"
echo "├── tailwind.config.ts"
echo "└── tsconfig.json"
echo ""
echo "🎉 Done! Now you can add content to each file."
echo ""