# Worthy CaratFlow

Full-stack application for finding **similar diamonds** based on the 4Cs (shape, carat, color, clarity) and additional parameters such as polish, symmetry, and fluorescence.  
The project consists of a **Back-end (Node.js/Express + MongoDB)** and **Front-end (React/Vite + Axios)**.

> This README is written for the `worthy-caratflow` repository and covers setup, environment variables, API, database structure, seeding, Docker setup, and troubleshooting.

---

## 🔧 Quick Start

### 1) Requirements
- Node.js ≥ 18
- npm or pnpm
- MongoDB 7.x (local or cloud) **or** Docker + Docker Compose

### 2) Clone and Install
```bash
git clone <repo-url> worthy-caratflow
cd worthy-caratflow

# Install dependencies for both backend and frontend
cd backend && npm i
cd ../frontend && npm i
```

### 3) Environment Variables

Create `.env` files in both `backend/` and `frontend/` folders.

**Example `backend/.env`:**
```env
# HTTP
PORT=3500
NODE_ENV=development

# MongoDB
MONGODB_URI=mongodb://localhost:27017/worthy
MONGODB_DB=worthy

# Timeouts
HTTP_TIMEOUT_MS=10000

# Logging (optional)
LOG_LEVEL=info
```

> ❗ **Important:** The Mongo connection string **must** start with `mongodb://` or `mongodb+srv://`.  
> Error like:  
> `MongoParseError: Invalid scheme, expected connection string to start with "mongodb://" or "mongodb+srv://"`  
> means you’re using an invalid prefix (e.g., `mongo://` or empty).

**Example `frontend/.env`:**
```env
VITE_API_BASE_URL=http://localhost:3500
```

### 4) Run Locally

**Back-end:**
```bash
cd backend
npm run dev
# or
npm start
```
The server will run at `http://localhost:3500` and respond to `/health`.

**Front-end:**
```bash
cd frontend
npm run dev
```
Vite will start a dev server (usually `http://localhost:5173`).

---

## 🧱 Project Structure

```
worthy-caratflow/
├─ backend/
│  ├─ src/
│  │  ├─ index.ts|js               # Express bootstrap
│  │  ├─ routes/
│  │  │  └─ pricingRouter.ts|js    # /api/pricing/*
│  │  ├─ services/
│  │  │  └─ PricingService.ts|js   # Similar diamonds logic
│  │  ├─ db/
│  │  │  ├─ mongoClient.ts|js
│  │  │  └─ seedDiamonds.ts|js     # seeding script
│  │  ├─ middleware/
│  │  │  ├─ validation.ts|js       # Joi/Zod validation
│  │  │  └─ errors.ts|js           # error handler
│  │  ├─ validation/
│  │  │  └─ priceSchema.ts|js
│  │  └─ logger/
│  │     └─ winstonLogging.ts|js
│  ├─ package.json
│  └─ .env
└─ frontend/
   ├─ src/
   │  ├─ App.tsx|jsx
   │  ├─ api/axios.ts
   │  ├─ components/
   │  │  ├─ DiamondForm.tsx
   │  │  └─ DiamondList.tsx
   │  └─ types/
   │     └─ diamond.ts
   ├─ vite.config.ts
   ├─ package.json
   └─ .env
```

---

## 🗄️ Database Model (MongoDB)

Collection: `diamonds`

Example document:
```json
{
  "_id": "6910e3946ff22f378066457f",
  "shape": "Round",
  "carat": 1.2,
  "color": "F",
  "clarity": "VS1",
  "polish": "EX",
  "symmetry": "VG",
  "fluorescence": "N",
  "priceUSD": 8900,
  "image": "https://clemen1992.ru/_si/0/73416575.jpg"
}
```

Recommended indexes:
```javascript
db.diamonds.createIndex({ shape: 1, carat: 1 });
db.diamonds.createIndex({ color: 1, clarity: 1 });
```

---

## 🌱 Seeding Data

Create `backend/seed/diamonds.json` with diamond objects as above.  
You can reuse the same image for simplicity:

```json
[
  {
    "shape": "Round",
    "carat": 1.2,
    "color": "F",
    "clarity": "VS1",
    "polish": "EX",
    "symmetry": "VG",
    "fluorescence": "N",
    "priceUSD": 8900,
    "image": "https://clemen1992.ru/_si/0/73416575.jpg"
  },
  {
    "shape": "Round",
    "carat": 1.18,
    "color": "F",
    "clarity": "VS1",
    "polish": "EX",
    "symmetry": "VG",
    "fluorescence": "N",
    "priceUSD": 8650,
    "image": "https://clemen1992.ru/_si/0/73416575.jpg"
  }
]
```

Example seeding script `backend/src/db/seedDiamonds.ts`:
```ts
import fs from "fs";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI!;
const dbName = process.env.MONGODB_DB || "worthy";

async function main() {
  const data = JSON.parse(fs.readFileSync("seed/diamonds.json", "utf-8"));
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db(dbName);
  const col = db.collection("diamonds");

  await col.deleteMany({});
  await col.insertMany(data);
  console.log(`Seeded ${data.length} diamonds`);
  await client.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
```

Add to `backend/package.json`:
```json
{
  "scripts": {
    "seed:diamonds": "ts-node src/db/seedDiamonds.ts"
  }
}
```

Run seeding:
```bash
cd backend
npm run seed:diamonds
```

---

## 🔌 API

Base path: `/api/pricing`

### POST `/api/pricing/similar`

Finds similar diamonds by the given parameters.

#### Request Body
```json
{
  "shape": "Round",
  "carat": 1.2,
  "color": "F",
  "clarity": "VS1",
  "polish": "EX",
  "symmetry": "VG",
  "fluorescence": "N"
}
```

#### Response `200 OK`
```json
[
  {
    "_id": "6910e3946ff22f378066457f",
    "shape": "Round",
    "carat": 1.2,
    "color": "F",
    "clarity": "VS1",
    "polish": "EX",
    "symmetry": "VG",
    "fluorescence": "N",
    "priceUSD": 8900,
    "image": "https://clemen1992.ru/_si/0/73416575.jpg"
  }
]
```

#### Example `curl`
```bash
curl -X POST http://localhost:3500/api/pricing/similar \
  -H "Content-Type: application/json" \
  -d '{
    "shape": "Round",
    "carat": 1.2,
    "color": "F",
    "clarity": "VS1",
    "polish": "EX",
    "symmetry": "VG",
    "fluorescence": "N"
  }'
```

---

## 🖥️ Frontend Overview

- `DiamondForm` sends a POST request to `/api/pricing/similar` using `axios`.
- `DiamondList` displays diamond cards with images and prices.
- API base URL is set via `VITE_API_BASE_URL`.

Example `src/api/axios.ts`:
```ts
import axios from "axios";
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { "Content-Type": "application/json", Accept: "application/json" }
});
```

---

## 🐳 Docker Setup

Example `docker-compose.yml`:

```yaml
version: "3.9"
services:
  mongo:
    image: mongo:7
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db

  backend:
    build: ./backend
    environment:
      - PORT=3500
      - MONGODB_URI=mongodb://mongo:27017/worthy
      - MONGODB_DB=worthy
      - HTTP_TIMEOUT_MS=10000
    depends_on:
      - mongo
    ports:
      - "3500:3500"

  frontend:
    build: ./frontend
    environment:
      - VITE_API_BASE_URL=http://localhost:3500
    ports:
      - "5173:5173"
    depends_on:
      - backend

volumes:
  mongo_data: {}
```

Run with:
```bash
docker compose up --build
```

---

## 🧪 Testing (Skeleton)

- **Validation tests:** Unit tests for `priceSchema` (Joi/Zod).
- **Service logic:** Unit tests for `PricingService.getSimilar` (range tolerance, filtering).
- **Integration:** Supertest route tests for `/api/pricing/similar` (happy path + validation errors).

---

## 🚨 Troubleshooting

### 1) `MongoParseError: Invalid scheme...`
**Cause:** Wrong MongoDB URI prefix.  
**Fix:**
```env
MONGODB_URI=mongodb://localhost:27017/worthy
# or for Atlas:
MONGODB_URI=mongodb+srv://<user>:<pass>@<cluster>.mongodb.net/worthy
```

### 2) “Images not loading”
- Make sure image URLs are accessible externally (open them in a browser).
- For dev, use a stable test image like `https://clemen1992.ru/_si/0/73416575.jpg`.

### 3) Why `POST` instead of `GET`
Because multiple filter fields are used — it's cleaner to send them in a JSON body.

### 4) CORS issues
Enable CORS in Express:
```ts
import cors from "cors";
app.use(cors({ origin: true, credentials: true }));
```

---

## 📏 Matching Logic

- Strict match by `shape`.
- Tolerance for `carat` (e.g., ±0.05–0.1ct).
- Exact matches for `color`, `clarity`, `polish`, `symmetry`, and `fluorescence` by default.
- Extendable to fuzzy/neighbor tolerance logic if needed.

Configured in `PricingService`.

---

## 📚 License

MIT (or specify another if required).
