# 🌍 CarbonLink

> **A B2B Marketplace Connecting Captured CO₂ Supply with Industrial Utilizers.**

[![Built for Hackout @ DA-IICT](https://img.shields.io/badge/Hackathon-Hackout%20%40%20DA--IICT-brightgreen.svg)](#)
[![Team Codenova](https://img.shields.io/badge/Team-Codenova-blue.svg)](#)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](#)

---

## 📌 Problem Statement

Industries that capture CO₂ — such as **cement plants, steel mills, and power stations** — frequently flare, vent, or pay high fees to permanently sequester surplus captured carbon simply because they lack visibility into downstream demand. 

Conversely, industrial utilizers who consume CO₂ as a core feedstock — including **synthetic fuel manufacturers, building material producers, commercial greenhouses, and algae farms** — struggle with:
1. Discovering available regional CO₂ supply.
2. Verifying purity levels and capture methods.
3. Estimating real-time logistics and total delivered costs.

**CarbonLink** bridges this gap by providing a two-sided marketplace. Emitters list captured CO₂ batches with full spatial and chemical parameters; Utilizers discover, request, or bid on supply; and our built-in engine automatically calculates multimodal logistics and delivered costs.

---

## 🎯 Key Features

- **🔐 Auth & Role-Based Facility Profiles**: Separate interfaces and permissions for **Emitters**, **Utilizers**, and **Admins**. Profiles store spatial coordinates (`latitude`/`longitude`), facility names, and industry types.
- **🌱 CO₂ Supply Listings**: Emitters publish available CO₂ supply specifying volume (tonnes), purity percentage, capture technology (e.g., Post-Combustion, Oxy-Fuel, Direct Air Capture), availability window, and base price/tonne.
- **🔍 Intelligent Search & Filtering**: Utilizers browse listings filtered by purity range, available volume, maximum transport distance, price ceiling, and geolocation.
- **🤝 Requests & Bidding Engine**: Utilizers submit fixed-price purchase orders or competitive bids. Emitters review and accept/reject offers in real time.
- **🚚 Automated Multimodal Logistics & Cost Estimator**: Calculates distance via Haversine / Maps API, intelligently recommends optimal transit modes (**Pipeline**, **Tanker Truck**, **Rail**, or **Ship**), and computes total delivered cost transparently.
- **📊 Transaction Dashboard**: Full status tracking for active listings, pending bids/requests, and confirmed transactions (`confirmed` -> `in_transit` -> `delivered`).
- **📈 ESG Analytics & Reporting** *(Stretch)*: Visualizes aggregated CO₂ traded, total CO₂ diverted from waste streams, and carbon offset statistics for sustainability compliance.

---

## 🏗 System Architecture & Workflow

```mermaid
graph TD
    subgraph Emitter Node
        E[Emitter Facility] -->|1. List CO₂ Batch| L[Active Listings]
    end

    subgraph Utilizer Node
        U[Utilizer Facility] -->|2. Search & Filter| L
        U -->|3. Submit Bid / Purchase Request| R[Requests Queue]
    end

    subgraph CarbonLink Engine
        R -->|4. Trigger Estimation| CE[Logistics & Cost Estimator Engine]
        CE -->|Calculate Distance & Rate| TM[Transport Mode Selector]
        TM -->|Pipeline / Truck / Rail / Ship| TC[Total Delivered Cost Calculation]
    end

    subgraph Transaction Execution
        L -->|5. Accept Offer| T[Transaction Created]
        TC --> T
        T -->|6. Status Tracking| D[Transaction Dashboard]
    end
```

---

## 🧮 Logistics & Cost Estimation Model

Delivered cost is automatically calculated upon request initialization based on geospatial proximity and batch scale:

$$\text{distance\_km} = \text{Haversine}(\text{Emitter Lat/Lng}, \text{Utilizer Lat/Lng})$$

$$\text{Transport Mode} = f(\text{distance\_km}, \text{volume\_tonnes})$$

$$\text{Transport Cost} = \text{distance\_km} \times \text{volume\_tonnes} \times \text{rate\_per\_km\_per\_tonne}[\text{Transport Mode}]$$

$$\text{Total Delivered Cost} = (\text{price\_per\_tonne} \times \text{volume\_tonnes}) + \text{Transport Cost}$$

### 🚛 Mode Recommendation Matrix

| Transport Mode | Distance Range | Volume Scale | Ideal Use Case |
| :--- | :--- | :--- | :--- |
| **Pipeline** | $< 100\text{ km}$ | High ($> 10,000\text{ tonnes}$) | Direct high-throughput industrial clusters |
| **Tanker Truck** | $< 300\text{ km}$ | Low–Medium ($< 1,000\text{ tonnes}$) | Flexible point-to-point delivery for greenhouses/farms |
| **Rail** | $300 - 1000\text{ km}$ | High ($1,000 - 10,000\text{ tonnes}$) | Regional bulk transport across land corridors |
| **Ship / Barge** | $> 1000\text{ km}$ | Ultra High ($> 10,000\text{ tonnes}$) | Inter-coastal & international transport |

---

## 🛠 Tech Stack

| Layer | Technology | Description |
| :--- | :--- | :--- |
| **Frontend** | React.js (Vite), Tailwind CSS | Dynamic responsive user interface with glassmorphism dashboard styling |
| **Backend** | Node.js, Express.js | RESTful API server handling authentication, marketplace logic, and geospatial calculations |
| **Database** | PostgreSQL + PostGIS | Relational store with spatial extensions for spatial distance queries |
| **Auth** | JSON Web Tokens (JWT) | Secure role-based access control (`emitter`, `utilizer`, `admin`) |
| **Logistics** | OpenRouteService / Google Maps API | Precise routing and distance computation |
| **Deployment** | Vercel (Frontend) + Render / Railway (Backend & DB) | Production-ready hosting pipelines |

---

## 🗄 Data Model Schemas

```mermaid
erDiagram
    USER ||--o{ LISTING : "publishes (emitter)"
    USER ||--o{ REQUEST : "submits (utilizer)"
    LISTING ||--o{ REQUEST : "receives"
    LISTING ||--o| TRANSACTION : "results in"
    REQUEST ||--o| TRANSACTION : "generates"

    USER {
        uuid id PK
        string name
        string email
        string password_hash
        enum role "emitter | utilizer | admin"
        string facility_name
        string industry_type
        float latitude
        float longitude
        timestamp created_at
    }

    LISTING {
        uuid id PK
        uuid emitter_id FK
        float volume_tonnes
        float purity_percent
        string capture_method
        float price_per_tonne
        timestamp available_from
        timestamp available_until
        float latitude
        float longitude
        enum status "active | pending | sold | expired"
        timestamp created_at
    }

    REQUEST {
        uuid id PK
        uuid listing_id FK
        uuid utilizer_id FK
        float requested_volume_tonnes
        float offer_price_per_tonne
        enum type "fixed_request | bid"
        enum status "pending | accepted | rejected | expired"
        timestamp created_at
    }

    TRANSACTION {
        uuid id PK
        uuid listing_id FK
        uuid request_id FK
        uuid emitter_id FK
        uuid utilizer_id FK
        float final_price_per_tonne
        float volume_tonnes
        float distance_km
        string transport_mode
        float transport_cost
        float total_delivered_cost
        enum status "confirmed | in_transit | delivered | cancelled"
        timestamp created_at
    }
```

---

## 📡 API Endpoints Specification

### 🔑 Authentication
- `POST /api/auth/register` — Register a new Emitter, Utilizer, or Admin account with facility coordinates.
- `POST /api/auth/login` — Authenticate and receive JWT session token.

### 📦 CO₂ Supply Listings
- `GET /api/listings` — Search & filter listings (`?purity=...&volume=...&max_distance=...&max_price=...`).
- `POST /api/listings` — *(Emitter only)* Create a new CO₂ batch listing.
- `GET /api/listings/:id` — Retrieve detailed listing specifications.
- `PATCH /api/listings/:id` — Update listing status or parameters.
- `DELETE /api/listings/:id` — Cancel/remove listing.

### 💰 Requests & Bids
- `POST /api/listings/:id/requests` — *(Utilizer only)* Submit a purchase request or bid.
- `GET /api/requests` — View incoming or outgoing requests based on role.
- `PATCH /api/requests/:id` — *(Emitter only)* Accept or reject a pending request/bid.

### 🚚 Logistics & Estimation
- `POST /api/estimate` — Estimate transit mode, distance, transport cost, and total delivered price (`{ emitter_id, utilizer_id, volume }`).

### 📊 Transactions & Analytics
- `GET /api/transactions` — List user's active/completed transactions.
- `GET /api/transactions/:id` — Get transaction breakdown.
- `PATCH /api/transactions/:id` — Update transaction shipping status (`confirmed` -> `in_transit` -> `delivered`).
- `GET /api/analytics/summary` — Aggregate platform stats (Total CO₂ diverted, volume traded, carbon footprint mitigated).

---

## 📂 Repository Directory Structure

```
Carbon-Capture-to-Product-Matchmaking-Platform/
├── client/                 # React Frontend App
│   ├── public/             # Static public assets
│   ├── src/
│   │   ├── api/            # Axios API wrappers & endpoints
│   │   ├── components/     # ListingCard, FilterBar, BidModal, CostEstimateWidget, Navbar
│   │   ├── pages/          # Marketplace, ListingDetail, Dashboard, Login, Register
│   │   ├── utils/          # Helpers & formatters
│   │   ├── App.jsx         # Application Routes & Auth Providers
│   │   └── main.jsx        # Entry point
│   ├── package.json
│   └── vite.config.js
├── server/                 # Express Backend API
│   ├── src/
│   │   ├── config/         # Database & environment configuration
│   │   ├── middleware/     # Auth JWT verification & role validation
│   │   ├── models/         # Database models / SQL query abstraction
│   │   ├── routes/         # auth.js, listings.js, requests.js, estimate.js, transactions.js
│   │   ├── services/       # costEstimator.js, geo.js
│   │   └── index.js        # Server entry point
│   ├── package.json
│   └── .env.example
├── db/
│   └── schema.sql          # PostgreSQL schema & PostGIS table setup
└── README.md
```

---

## 🚀 Getting Started & Local Setup

### Prerequisites
- **Node.js** (v18.x or higher)
- **npm** or **yarn**
- **PostgreSQL** (with **PostGIS** extension enabled)

### 1. Repository Setup
```bash
git clone https://github.com/ridhamrangani01/Carbon-Capture-to-Product-Matchmaking-Platform.git
cd Carbon-Capture-to-Product-Matchmaking-Platform
```

### 2. Database Initialization
```bash
# Connect to PostgreSQL and create database
createdb carbonlink_db

# Run schema migrations
psql -d carbonlink_db -f db/schema.sql
```

### 3. Backend Setup
```bash
cd server
npm install

# Create environment configuration file
cp .env.example .env
```

Fill in `.env` variables:
```env
PORT=5000
DATABASE_URL=postgres://user:password@localhost:5432/carbonlink_db
JWT_SECRET=your_super_secret_jwt_key
MAPS_API_KEY=your_google_maps_or_openrouteservice_api_key
```

Start the backend server:
```bash
npm run dev
```

### 4. Frontend Setup
In a separate terminal window:
```bash
cd client
npm install
npm run dev
```
Open your browser at `http://localhost:5173`.

---

## 🔮 Future Scope & Pitch Roadmap

- 📡 **IoT Live Sensor Integration**: Real-time telemetry monitoring CO₂ purity and continuous throughput rate.
- 📜 **Smart Contract Escrow**: Automated crypto/fiat payment release upon verified carrier delivery.
- 🤖 **AI Predictive Matchmaking**: Machine learning algorithms pairing emitters with optimal buyers based on seasonal demand cycles.
- 🌿 **Carbon Credit Integration**: Verification and certification registry linkage (Verra / Gold Standard).
- 🛣 **Multi-Modal Logistics Engine**: Live capacity tracking across regional pipelines, rail corridors, and maritime fleets.

---

## 👥 Team Codenova

Built with ❤️ for **Hackout @ DA-IICT**.

- **Team Name**: Codenova
- **Project**: CarbonLink

---

## 📄 License

Distributed under the MIT License.
