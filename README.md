# Fake News & Deepfake Detection (TruthGuard AI)

**Detect Fake News, Deepfakes & AI Manipulation Instantly**

AI-powered platform that detects fake news, manipulated images, deepfake videos, and AI-generated text using machine learning and computer vision to enhance digital content authenticity and trustworthiness.

TruthGuard AI is a startup-grade cyber intelligence SaaS platform built with a modern full-stack architecture and premium futuristic UI.

![TruthGuard AI](https://img.shields.io/badge/AI-Cyber%20Intelligence-6366f1)
![Next.js](https://img.shields.io/badge/Next.js-16-black)
![FastAPI](https://img.shields.io/badge/FastAPI-Python-009688)

## Features

- **Fake News Detection** — BERT/RoBERTa NLP analysis with credibility scoring, bias detection, and suspicious sentence highlighting
- **AI Image Detection** — CNN/ViT analysis with heatmap overlays, metadata inspection, and GAN artifact detection
- **Deepfake Video Detection** — FaceForensics++/XceptionNet temporal analysis with timeline markers and audio waveform
- **AI Text Detection** — GPT detector with perplexity, burstiness, and sentence-level highlights
- **Live Webcam Deepfake Detector** — Real-time facial analysis
- **Reports System** — Scan history and downloadable reports
- **Admin Panel** — User management, analytics, and threat monitoring
- **AI Assistant Chatbot** — Built-in cyber intelligence guide
- **Multi-language Support** — 50+ languages in settings

## Tech Stack

| Layer | Technologies |
|-------|-------------|
| Frontend | Next.js 16, React 19, TypeScript, Tailwind CSS 4, Framer Motion, Recharts, Shadcn-style UI |
| Backend | Node.js, Express.js, MongoDB, JWT |
| AI Service | Python FastAPI, PyTorch, HuggingFace Transformers, OpenCV |
| Auth | Clerk (Google OAuth, JWT) |
| Deployment | Vercel, Render, AWS, Docker |

## Project Structure

```
truthguard-ai/
├── frontend/          # Next.js web application
├── backend/           # Express.js REST API
├── ai-service/        # Python FastAPI ML microservice
├── docker-compose.yml # Full stack orchestration
└── package.json       # Monorepo scripts
```

## Quick Start

### Prerequisites

- Node.js 20+
- Python 3.11+
- MongoDB (optional — app works without DB)
- Clerk account for authentication

### 1. Install Dependencies

```bash
npm run install:all
cd ai-service && pip install -r requirements.txt
```

### 2. Configure Environment

```bash
# Frontend
cp frontend/.env.example frontend/.env.local
# Add your Clerk keys from https://dashboard.clerk.com

# Backend
cp backend/.env.example backend/.env
```

### 3. Run Development Servers

```bash
# All services (requires concurrently)
npm run dev

# Or individually:
cd frontend && npm run dev      # http://localhost:3000
cd backend && npm run dev       # http://localhost:4000
cd ai-service && uvicorn main:app --reload --port 8000
```

### 4. Docker (Optional)

```bash
docker-compose up --build
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page with hero, features, stats, FAQ |
| `/sign-in`, `/sign-up` | Clerk authentication |
| `/dashboard` | Cyber intelligence dashboard |
| `/dashboard/detect/news` | Fake news detector |
| `/dashboard/detect/image` | AI image detector |
| `/dashboard/detect/video` | Deepfake video detector |
| `/dashboard/detect/text` | AI text detector |
| `/dashboard/webcam` | Live webcam deepfake detector |
| `/dashboard/reports` | Scan history & PDF reports |
| `/dashboard/admin` | Admin panel |
| `/about`, `/pricing`, `/contact`, `/blog`, `/research`, `/api-docs` | Marketing pages |

## AI Models

| Module | Models |
|--------|--------|
| Fake News | BERT, RoBERTa, DistilBERT |
| AI Images | CNN, Vision Transformer, EfficientNet |
| Deepfakes | FaceForensics++, XceptionNet, MesoNet |
| AI Text | GPT Detector, Perplexity Scoring |

## API Endpoints

```
POST /api/detect/fake-news   { url?, content? }
POST /api/detect/image       multipart/form-data
POST /api/detect/video       multipart/form-data or { url }
POST /api/detect/text        { content }
GET  /api/scans
GET  /api/stats
GET  /api/reports/:scanId
```

## Clerk Setup

1. Create a free account at [clerk.com](https://clerk.com)
2. Create a new application
3. Enable Google OAuth in Social Connections
4. Copy API keys to `frontend/.env.local`
5. Set redirect URLs: `http://localhost:3000/sign-in`, `http://localhost:3000/sign-up`

## Deployment

- **Frontend**: Deploy to [Vercel](https://vercel.com) — set env vars from `.env.example`
- **Backend**: Deploy to [Render](https://render.com) or AWS ECS
- **AI Service**: Deploy to Render or AWS with GPU instance for production models
- **Database**: MongoDB Atlas for production

## License

MIT © 2026 TruthGuard AI
