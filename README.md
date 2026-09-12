# UpCarb. — Carbon2Product Platform

> *"Turn captured carbon into valuable products."*

**Carbon2Product** is a climate-tech web application connecting carbon emitters / carbon capture facilities with industrial chemical synthesizers, building material manufacturers, algae cultivators, and researchers. It transforms captured $\text{CO}_2$ from a waste issue into valuable circular resources (E-Methanol, e-SAF jet fuels, concrete mineralization, precipitated calcium carbonate, algae biomass, and polycarbonates).

---

## 🌟 Key Features

1. **Deterministic 8-Vector Matchmaking Engine:** Calculates $0-100\%$ compatibility score based on CO₂ Purity (25%), Volume Intake Scale (20%), Physical State (10%), Temperature Window (10%), Operating Pressure (10%), Transport Logistics (10%), Technology Readiness Level (10%), and Supply Availability (5%).
2. **Premium Climate-Tech Landing Page (`/`):** Hero section with interactive animated carbon flow network, 4-step workflow, real-time sample match card, product pathways grid, interactive impact calculator, and trust metrics.
3. **Role-Based Portals & Dashboards:**
   - **Emitter Dashboard (`/dashboard/emitter`):** Manage carbon sources, track monthly volume off-take, inspect top product matches.
   - **Utilizer Dashboard (`/dashboard/utilizer`):** Browse CO₂ supply streams, inspect technical compatibility radar, send contact off-take proposals.
   - **Researcher Dashboard (`/dashboard/researcher`):** Side-by-side pathway comparison matrix across TRLs, conversion ratios, and energy intensity.
   - **Admin Console (`/admin` & `/admin/users`):** Platform user management, carbon source audit, and system governance.
4. **Searchable Marketplace (`/marketplace`):** Multi-filtering by physical state (Gas, Liquid, Supercritical), capture technology, location, and CO₂ purity.
5. **Interactive Impact Calculator (`/impact`):** Dynamic carbon offset calculations (annual CO₂ offset, equivalent passenger cars removed, tree planting equivalent, and annual product revenue potential).
6. **Match Details & Radar Chart (`/matches/[id]`):** Interactive 8-axis Recharts radar chart, pros/cons breakdown, and contact proposal modal.

---

## 🔑 Demo User Credentials

| Role | Email | Password | Organization |
|---|---|---|---|
| **Carbon Emitter** | `emitter@carbon2product.com` | `Password123!` | Reliance Industrial Energy Hub |
| **CO₂ Utilizer** | `utilizer@carbon2product.com` | `Password123!` | Gujarat Methanol & Circular Chemicals |
| **Researcher** | `researcher@carbon2product.com` | `Password123!` | IIT Decarbonization R&D Lab |
| **Platform Admin** | `admin@carbon2product.com` | `Password123!` | Carbon2Product Governance |

---

## 📐 Deterministic Matchmaking Algorithm

Overall Match Score ($0-100\%$) is calculated dynamically using weighted multi-criteria vectors:

$$\text{Score} = 0.25 S_{\text{purity}} + 0.20 S_{\text{quantity}} + 0.10 S_{\text{state}} + 0.10 S_{\text{temp}} + 0.10 S_{\text{pressure}} + 0.10 S_{\text{logistics}} + 0.10 S_{\text{trl}} + 0.05 S_{\text{availability}}$$

### Score Classifications
- **90 – 100%:** `EXCELLENT MATCH` (Immediate pipeline/iso-tanker off-take)
- **75 – 89%:** `STRONG MATCH` (Minor conditioning or booster compression required)
- **60 – 74% font-mono:** `POTENTIAL MATCH` (Requires thermal/purity polishing)
- **40 – 59%:** `WEAK MATCH` (Significant phase or scale mismatch)
- **0 – 39%:** `POOR MATCH` (Incompatible specifications)

---

## 🛠️ Technology Stack

- **Framework:** Next.js 15+ (App Router), React 18/19, TypeScript
- **Styling:** Tailwind CSS, Custom Glassmorphism, CSS Flow Animations
- **Icons & Motion:** Lucide React, Framer Motion
- **Data Visualization:** Recharts (Radar, Bar, Pie charts)
- **Database & ORM:** SQLite / PostgreSQL with Prisma ORM
- **Validation & Auth:** Zod, React Hook Form, Bcryptjs password hashing

---

## ⚡ Quick Start & Running Locally

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Database & Push Schema
```bash
# Push Prisma Schema to SQLite database
npx prisma db push
```

### 3. Seed Database with Realistic Demo Data
```bash
# Run seed script (10 Carbon Sources, 8 Utilization Pathways, Matches, Demo Accounts)
npx prisma db seed
```

### 4. Start Next.js Development Server
```bash
npm run dev
```

Open your browser at `http://localhost:3000`.

### 5. Production Build & Check
```bash
npm run build
```
