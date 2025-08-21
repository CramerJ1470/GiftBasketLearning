
# Gift Baskets — Full Stack App (No Stripe)
Stack: React (Vite) + Node/Express + MongoDB + JWT + bcrypt

## Dev
```bash
# Root (optional): install concurrently
npm i -D concurrently

# Install deps
cd server && npm install
cd ../client && npm install

# Start both (from repo root)
npm run dev
# Client: http://localhost:5173
# API:    http://localhost:4000
```

## Environment
- **server/.env** (copy from `.env.example`)
- **client/.env** (copy from `.env.example`)

## Deploy
- Client on Vercel (Root Directory: `client/`)
- API on Render/Railway/… set `CLIENT_URL` to your Vercel domain for CORS

`client/vercel.json` includes SPA rewrites and an optional `/api` proxy.
Edit the API host there *or* set `VITE_API_URL` on Vercel to your backend URL.
