# Veliora TechWorks Portfolio - Installation Guide

## Prerequisites
- Node.js 18+ installed
- Firebase account
- Git

## Installation Steps

### 1. Clone Repository
```bash
git clone <repository-url>
cd veliora-portfolio
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Firebase

#### Create Firebase Project
1. Go to https://console.firebase.google.com
2. Create new project
3. Enable Firestore Database
4. Go to Project Settings > General
5. Copy Firebase configuration

#### Setup Firestore Rules
In Firebase Console > Firestore Database > Rules:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

### 4. Setup Environment Variables
Create `.env.local` file with your Firebase config:
```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your-firebase-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

### 5. Initialize Admin User
```bash
node scripts/init-admin.js
```

### 6. Start Development Server
```bash
npm run dev
```

### 7. Access Application
- **Website**: http://localhost:3000
- **Admin Login**: http://localhost:3000/login
  - Email: admin@veliora.tech
  - Password: admin123

## Firestore Collections

### users
- email: string
- password: string (hashed)
- role: string
- createdAt: timestamp

### projects
- title: string
- description: string
- category: string
- technologies: array
- liveUrl: string (optional)
- githubUrl: string (optional)
- featured: boolean
- createdAt: timestamp

## Admin Features
1. Login at `/login`
2. Access dashboard via navbar "Dashboard" button
3. Add/delete projects in Projects tab
4. View contact messages
5. Manage site settings

## Project Structure
```
├── app/                    # Next.js 14 App Router
│   ├── admin/             # Admin dashboard
│   ├── api/               # API routes
│   ├── login/             # Login page
│   └── projects/          # Projects page
├── components/            # React components
├── lib/                   # Utilities (Firebase connection)
├── scripts/               # Setup scripts
└── .env.local            # Environment variables
```

## Production Deployment

### 1. Build Application
```bash
npm run build
```

### 2. Environment Variables
Set production environment variables with your Firebase config.

### 3. Deploy
Deploy to Vercel, Netlify, or your preferred platform.

## Troubleshooting

### Firebase Connection Issues
- Check Firebase configuration in .env.local
- Verify Firestore rules allow read/write
- Ensure project ID is correct

### Admin Login Issues
- Run init-admin.js script again
- Check Firebase console for user document
- Verify credentials

### Build Errors
- Clear .next folder: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`

## Support
For issues, contact: hello@veliora.tech