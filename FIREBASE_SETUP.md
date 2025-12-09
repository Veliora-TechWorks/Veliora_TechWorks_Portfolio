# Firebase Firestore Setup

## Step 1: Deploy Firestore Rules

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project: `velioratechworksportfolio`
3. Click **Firestore Database** in left menu
4. Click **Rules** tab
5. Replace with these rules:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

6. Click **Publish**

## Step 2: Add Environment Variables to Vercel

1. Go to Vercel → Your Project → Settings → Environment Variables
2. Add these (from your `.env.local`):

```
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyCZ8AVtS0YuQO0uSsPRBWWo214rjYPG-FE
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=velioratechworksportfolio.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=velioratechworksportfolio
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=velioratechworksportfolio.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=229673415898
NEXT_PUBLIC_FIREBASE_APP_ID=1:229673415898:web:6a61b2023c83944a3921e3
```

3. Click **Save**

## Step 3: Deploy

```bash
git add .
git commit -m "Add Firebase Firestore storage"
git push
```

## ✅ Done!

Your data will now persist permanently in Firebase Firestore!

## Test

1. Add a project in admin dashboard
2. Refresh the page
3. Project should still be there ✅
