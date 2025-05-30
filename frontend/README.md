# Front End - Vintage Mac Chat

This is the frontend for the Vintage Mac Chat application. It emulates a classic Macintosh chat experience in your browser.

## Prerequisites
- Node.js (v16 or higher recommended)
- The backend API running (see ../api/README.md)

## Setup & Run

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```
   The app will be available at [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal).

3. **Backend:**
   Make sure the backend API is running at [http://localhost:8000](http://localhost:8000) (see the backend README for setup).

## Features
- Retro CRT monitor frame and classic Mac window styling
- Authentic Chicago and Monaco fonts (from `src/assets/fonts/`)
- Real-time chat with a vintage Mac personality (via backend API)

## Font Setup
- The classic Mac fonts (Chicago, Monaco) are included in `src/assets/fonts/` and loaded via CSS.
- No extra steps are needed.

## Notes
- The frontend expects the backend API to be running at `/api/chat` on the same host (proxy or CORS may be needed if running separately).
- For best results, use the app in a desktop browser.

---