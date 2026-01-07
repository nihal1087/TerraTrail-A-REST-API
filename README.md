# 🌍 TerraTrail API 🧭

Welcome to **TerraTrail API** 🚀  
TerraTrail is a lightweight **Node.js REST API** that serves data about some of the world’s most unique, mysterious, and geographically fascinating destinations — including natural wonders, restricted zones, and culturally significant sites.

This project is intentionally built **without frameworks** (no Express, no Fastify) using Node.js’ native `http` module to deeply understand how backend systems work under the hood.

🔗 **Live API**: https://terratrail.onrender.com

---

## Overview 📸

TerraTrail focuses on **backend fundamentals**:
- HTTP request handling
- Routing logic
- Query & path parameter parsing
- Manual CORS handling
- Production deployment

---

## Learning Objectives 🏁

- Understand HTTP at a low level
- Build a REST API without frameworks
- Handle routing manually
- Work with query & path parameters
- Implement proper status codes
- Deploy a Node.js backend to production

---

## Tech Stack 🛠️

- Node.js (ES Modules)
- Native `http` module
- JavaScript (ES2022+)
- Render (Deployment)

---

## Project Structure 📁

```
terratrail/
├── server.js
├── database/
│   └── db.js
├── data/
│   └── data.js
├── utils/
│   ├── sendJSONResponse.js
│   ├── getDataByQueryParams.js
│   └── getDataByPathParams.js
├── package.json
└── README.md
```

---

## Getting Started 🚦

```
git clone https://github.com/your-username/terratrail.git
cd terratrail
npm install
npm start
```

Server runs at:
```
http://localhost:8001
```

---

## API Endpoints 📡

### Get all destinations
```
GET /api
```

### Filter with query params
```
GET /api?continent=asia
GET /api?country=india
GET /api?is_open_to_public=true
```

### Path params
```
GET /api/continent/:continent
GET /api/country/:country
```

---

## Deployment ☁️

Deployed on Render using:
- Build command: `npm install`
- Start command: `npm start`
- Dynamic port binding via `process.env.PORT`

Live:
https://terratrail.onrender.com

---
### ⭐ If you like this project, consider giving the repository a star!

 

