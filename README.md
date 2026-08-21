# Rafi Portfolio 2.0

Interactive personal portfolio built with **React 19**, **Vite**, **Firebase**, and **Three.js**.

## Features

- Single-page application with animated section transitions
- Real-time Chat Room powered by Firebase Authentication & Firestore
- Contact form with Web3Forms email delivery + Firestore persistence
- WebGL animated background (ColorBends shader)
- Animated preloader with multi-language greetings
- Project showcase with themed modal details
- Responsive glassmorphism design

## Tech Stack

| Layer      | Technologies                                    |
|------------|------------------------------------------------|
| Frontend   | React 19, Vite 8, TailwindCSS 4, Framer Motion |
| Backend    | Firebase Authentication, Cloud Firestore        |
| Email      | Web3Forms API                                   |
| 3D/WebGL   | Three.js                                        |
| Functions  | Firebase Cloud Functions (Nodemailer)            |

## Project Structure

```
src/
├── components/
│   ├── layout/          # Navbar, Footer, PersistentBackground
│   ├── sections/        # HeroSection, ToolsSection, ProjectsSection, etc.
│   ├── features/        # ChatRoom, ContactForm (hook), ProjectModal
│   └── ui/              # ColorBends (WebGL), Preloader
├── services/            # contactService, chatService (Firebase data layer)
├── constants/           # App-wide constants (nav items, collection names, etc.)
├── data/                # Static portfolio content (projects, experience, tools)
├── lib/                 # Firebase initialization & auth helpers
├── styles/              # Global CSS & design tokens
└── assets/              # CVs (PDF)
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
npm install
```

### Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

Required variables:

| Variable                           | Description                        |
|------------------------------------|------------------------------------|
| `VITE_FIREBASE_API_KEY`            | Firebase Web API key               |
| `VITE_FIREBASE_AUTH_DOMAIN`        | Firebase Auth domain               |
| `VITE_FIREBASE_PROJECT_ID`         | Firebase project ID                |
| `VITE_FIREBASE_STORAGE_BUCKET`     | Firebase Storage bucket            |
| `VITE_FIREBASE_MESSAGING_SENDER_ID`| Firebase Messaging sender ID       |
| `VITE_FIREBASE_APP_ID`            | Firebase app ID                    |
| `VITE_MEASUREMENT_ID`             | Google Analytics measurement ID    |
| `VITE_WEB3FORMS_ACCESS_KEY`       | Web3Forms access key               |

> **Note:** All `VITE_*` variables are bundled into the frontend and are publicly visible. Firebase client config is designed to be public — security is enforced by Firestore Security Rules, not by hiding the config.

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Firebase Setup

1. Deploy Firestore security rules:
   ```bash
   firebase deploy --only firestore:rules
   ```

2. Deploy Cloud Functions (for email notifications):
   ```bash
   cd functions && npm install && cd ..
   firebase deploy --only functions
   ```

   Cloud Functions require `EMAIL_USER` and `EMAIL_PASSWORD` environment variables set in Firebase.

## Security

- **Firestore Rules** enforce field validation and access control for `contacts` and `messages` collections
- Contact form includes honeypot field for bot prevention and client-side cooldown
- Error messages are user-friendly; internal details are not exposed to the UI
- All external links use `rel="noopener noreferrer"`
- No `dangerouslySetInnerHTML` usage

## License

All rights reserved.
