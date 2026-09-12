    # FinWise AI – Personalized & Responsible Banking Assistant

> **DA-IICT HackOut Hackathon Prototype**  
> *"Customer benefit first, bank revenue second."*

FinWise AI is a complete, modular, and fully functional Python prototype that redefines retail banking by putting customer financial wellbeing at the center of AI-driven recommendations.

---

## 🌟 Key Highlights

1. **Responsible AI Recommendation Engine:** Analyzes income, EMI obligations, savings ratios, cash flow, and life-stage signals to recommend financial products.
2. **Ethical Debt Suppression Safeguard:** Automatically **BLOCKS** aggressive loans and credit card recommendations if a customer exhibits financial stress (e.g. missed EMIs, declining balance, elevated debt ratio).
3. **Isolation Forest Anomaly & Fraud Detector:** Scans transactions in real-time to flag suspicious transfers and offers 1-click `Mark Genuine` / `Block` mitigation tools.
4. **Multilingual Vernacular AI Assistant:** Instant response engine supporting **English, ગુજરાતી (Gujarati), and हिन्दी (Hindi)** without requiring external paid LLM APIs.
5. **Empathetic Stress Interventions:** Replaces punitive warning banners with supportive budgeting tools, EMI restructuring options, and zero-penalty savings plans.
6. **DPDP Act Privacy & Consent Center:** Transparent user toggles for personalized recommendations, fraud monitoring, and wellness insights.
7. **Transparent AI Decision Audit Trail:** Immutable logging of model decisions, confidence scores, input feature JSON, and explanations.

---

## 🏛️ System Architecture

```
finwise_ai/
│
├── app.py                      # Main Streamlit App launcher & navigation routing
├── requirements.txt            # Essential Python dependencies
├── README.md                   # Hackathon Documentation & Setup Guide
├── .env.example                # Environment variables template
│
├── database/
│   ├── db.py                   # SQLite connection & SQLAlchemy session manager
│   ├── models.py               # ORM Database Schema (customers, transactions, alerts, logs, etc.)
│   └── seed_data.py            # Synthetic Indian banking data generator (6 demo profiles, 500+ txs)
│
├── ai/
│   ├── recommendation_engine.py# Hybrid rule + ML recommender with debt suppression
│   ├── fraud_detector.py       # Isolation Forest anomaly detection
│   ├── stress_detector.py      # Empathetic financial stress signal analyzer
│   ├── segmentation.py         # KMeans customer clustering (Young Saver, Investor, Stressed, etc.)
│   ├── financial_health.py     # 0-100 Financial Health score engine & Plotly gauge
│   └── chatbot.py              # Multilingual Vernacular NLP engine (En / Gu / Hi)
│
├── services/
│   ├── customer_service.py     # Customer profile synthesis & consent management
│   ├── transaction_service.py  # Transaction aggregations & cash flow analytics
│   └── analytics_service.py    # Bank admin macro analytics (DPDP compliant)
│
├── ui/
│   ├── dashboard.py            # Customer Dashboard (KPIs, Gauges, Pie/Bar Charts)
│   ├── chatbot_ui.py          # Vernacular Assistant Chat UI with Quick Prompts
│   ├── recommendation_ui.py   # Explainable AI Recommendation Cards
│   ├── loan_ui.py              # Responsible Loan Journey & Interactive EMI Calculator
│   ├── fraud_ui.py             # Isolation Forest Anomaly Monitor & Mitigation UI
│   ├── stress_ui.py            # Financial Health & Empathetic Stress UI
│   ├── privacy_ui.py           # DPDP Act Privacy & Consent Center UI
│   ├── kyc_ui.py              # 4-step Digital Onboarding & KYC Demo Wizard
│   ├── audit_ui.py            # AI Decision Audit Log Table Viewer
│   ├── admin_ui.py            # Bank Executive Admin Analytics Dashboard
│   ├── architecture_ui.py     # System Architecture Diagram
│   ├── ml_approach_ui.py       # AI/ML Model Methodology Explanation
│   ├── ethical_ui.py          # Responsible AI Principles & 10 Safeguards
│   └── judge_demo_ui.py       # ⚡ One-Click Hackathon Presentation Demo Mode
│
└── utils/
    ├── calculations.py         # Standard EMI math, debt-to-income & savings ratios
    ├── translations.py         # i18n translation dictionary for En / Gu / Hi
    └── helpers.py              # Indian Rupee formatting (₹), date helpers, styling
```

---

## 👥 Demo Customer Personas

The application includes 6 realistic synthetic Indian customer profiles:

1. **Ridham Patel** (24, SE, ₹65k salary) → *Healthy / Saver Persona* → Recommended: Fixed Deposit / Savings Booster.
2. **Dhyey Shah** (29, Business Owner, ₹90k income) → *High Spending Professional* → Recommended: Mutual Fund / Wealth Plan.
3. **Pranshu Mehta** (35, Salaried Employee, ₹1.1L salary, ₹35k EMI, Missed EMI) → *High Financial Stress* → **LOANS BLOCKED**. Recommended: EMI Restructuring & Budget Support.
4. **Ananya Sharma** (22, Fresher, ₹35k salary) → *Young Saver* → Recommended: Recurring Deposit & Credit Building.
5. **Rajesh Verma** (42, Senior Manager, ₹1.6L salary) → *Stable Family Investor* → Recommended: Family Health Insurance & Mutual Funds.
6. **Priya Nair** (31, Product Manager, ₹1.2L salary) → *Fraud Anomaly Scenario Candidate* → Triggers Isolation Forest alert for suspicious ₹48,500 transfer at 2:30 AM.

---

## 🧠 AI / ML Models Summary

| Model / Feature | Algorithm | Purpose | Key Output |
|---|---|---|---|
| **Product Recommendation** | Hybrid Rule + Behavioral ML | Personalized product discovery with ethical debt suppression | Top product, confidence %, green reasons, risks |
| **Anomaly Detection** | Isolation Forest (`scikit-learn`) | Unsupervised transaction fraud detection | Anomaly score, flagged transactions, 1-click action |
| **Customer Segmentation** | KMeans Clustering (`scikit-learn`) | Behavioral customer persona grouping | Segment name, description, cluster reasoning |
| **Financial Health Score** | Multi-factor Scoring Algorithm | 0-100 overall financial wellbeing metric | Gauge chart, status (Excellent / Good / At Risk) |
| **Stress Signal Detector** | Heuristic Trend & Signal Engine | Detects early cash flow strain without punitive action | Stress score (0-100), signals, empathetic message |
| **Vernacular Assistant** | Multilingual Pattern & Intent Matcher | Instant vernacular banking support | English, Gujarati, Hindi answers |

---

## ⚙️ Installation & Running Locally

### 1. Prerequisites
- Python 3.9+
- Virtualenv (recommended)

### 2. Setup Commands

```bash
# Navigate to project root
cd finwise_ai

# Create virtual environment
python3 -m venv venv

# Activate virtual environment
# On Mac/Linux:
source venv/bin/activate
# On Windows:
# venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

### 3. Launch Streamlit Application

```bash
streamlit run app.py
```

Open your browser at `http://localhost:8501`.

---

## ⚡ Hackathon Presentation Demo Flow

For live judging, navigate to **`⚡ Hackathon Judge Demo`** in the sidebar:
1. **Click Scenario 1 (Ridham Patel):** View healthy financial health gauge (88/100) and Fixed Deposit recommendation.
2. **Click Scenario 3 (Pranshu Mehta):** Observe **Ethical Safeguard in Action**—loans are blocked due to missed EMI, and EMI restructuring tools are offered.
3. **Click Scenario 4 (Priya Nair):** Demonstrate **Isolation Forest Fraud Detection**—review the flagged ₹48,500 transfer and click `Mark as Genuine` or `Block Card`.
4. **Switch Language to Gujarati (ગુજરાતી) or Hindi (हिन्दी):** Observe all UI labels and chatbot responses instantly adapt.
5. **Open Vernacular Assistant:** Click quick prompt `"મારું financial health બતાવો"` or `"મને loan જોઈએ છે"`.
