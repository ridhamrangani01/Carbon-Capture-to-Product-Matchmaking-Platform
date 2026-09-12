export interface StepTabItem {
  id: number;
  short: string;
  stepNum: string;
  label: string;
  title: string;
  desc: string;
  bullets: { title: string; text: string }[];
  formats: string[];
  documents: { name: string; status: string; statusColor: string }[];
  compareHighlight?: { label: string; valA: string; valB: string };
  matchedItems?: { title: string; sub: string; score: string; badgeColor: string }[];
  outputStats?: { label: string; value: string; color?: string }[];
}

export interface SupplierItem {
  id: string;
  name: string;
  isRecommended?: boolean;
  pricePerUnit: string;
  co2PerUnit: string;
  totalCo2: string;
  co2PerCurrency: string;
  highlightText?: string;
}

export interface MethodologyCardItem {
  id: string;
  number: string;
  title: string;
  description: string;
  iconName: string;
}

export interface CoverageRowItem {
  scope: string;
  category: string;
  source: string;
  status: "SUPPORTED" | "INDICATIVE" | "PLANNED" | "OUTSIDE_SCOPE";
  statusLabel: string;
}

export interface FaqItem {
  id: string;
  q: string;
  a: string;
}

export const HOW_IT_WORKS_DATA = {
  hero: {
    title: "How It Works",
    subtitle:
      "The path to full insight into your CO₂e emissions and carbon off-take value is UpCarb. Our AI converts 100% activity-based carbon data for your entire facility from supplier invoices in minutes.",
    videoUrl: "https://www.youtube.com/embed/Lw9vAAAINAc?rel=0&loop=1&playlist=Lw9vAAAINAc&controls=1&modestbranding=1",
    videoTitle: "End-to-End 100% Automated Carbon Footprint Calculation",
  },
  stepsSection: {
    title: "From procurement document to Scope 3 data — step by step.",
    subtitle:
      "How UpCarb. converts your invoices and quotations into supplier benchmarks and audit-ready Scope 3.",
    tabs: [
      {
        id: 0,
        short: "01",
        stepNum: "01",
        label: "Document Ingestion",
        title: "Upload invoices, CSVs, quotations, and BOMs",
        desc: "Upload the documents your procurement team already generates. Invoices unlock compliance data. Quotations unlock forward-looking exposure. BOMs unlock product-level footprints.",
        bullets: [
          {
            title: "Invoices & delivery notes",
            text: "Actual CO₂e post-purchase · for compliance reporting",
          },
          {
            title: "Quotations & offers",
            text: "Indicative CO₂e before commitment · for procurement planning",
          },
          {
            title: "Bills of Materials (BOMs)",
            text: "Product-level footprint · for construction & manufacturing",
          },
        ],
        formats: ["PDF", "JPG / PNG", "XLSX", "CSV", "XML / EDI"],
        documents: [
          { name: "Rechnung_Stahl_März2026.pdf", status: "✓ invoice processed", statusColor: "text-[#22c55e]" },
          { name: "Angebot_Beton_Lieferant_A.pdf", status: "✓ quotation · indicative", statusColor: "text-amber-400" },
          { name: "Angebot_Beton_Lieferant_B.pdf", status: "✓ quotation · indicative", statusColor: "text-amber-400" },
        ],
        compareHighlight: {
          label: "Quotation comparison:",
          valA: "Supplier A 4.8 t CO₂e",
          valB: "Supplier B 6.2 t CO₂e",
        },
      },
      {
        id: 1,
        short: "02",
        stepNum: "02",
        label: "AI Extraction & Matching",
        title: "AI matches to best available factor",
        desc: "Every extracted line item is classified automatically and matched to the most specific emission factor available — from manufacturer PCF, EPDs, or recognized background databases.",
        bullets: [
          {
            title: "Deterministic 8-vector matching",
            text: "Considers purity, pressure, flow rate, geography, and transport distance",
          },
          {
            title: "Geography-specific ecoinvent factors",
            text: "Grid-specific factors mapped per country and region",
          },
          {
            title: "Audit trail logging",
            text: "Every factor version, source tier, and confidence score is recorded",
          },
        ],
        formats: ["GHG Protocol Tier 1", "Tier 2 Activity", "Tier 3 Hybrid PCF"],
        documents: [],
        matchedItems: [
          {
            title: "Industrial CO₂ Stream (Gas Purity 98.4%)",
            sub: "Matched: ecoinvent 3.10 · High Purity Industrial Gas",
            score: "99.2% Match",
            badgeColor: "bg-[#22c55e]/20 text-[#22c55e]",
          },
          {
            title: "Synthetic E-Methanol Chemical Off-Take",
            sub: "Matched: Manufacturer EPD #EN15804-2026",
            score: "96.5% Match",
            badgeColor: "bg-blue-500/20 text-blue-400",
          },
        ],
      },
      {
        id: 2,
        short: "03",
        stepNum: "03",
        label: "Structured Output",
        title: "Intelligence — backward and forward",
        desc: "Instant compliance reports generated from past invoices alongside forward-looking carbon exposure forecasts from supplier quotations.",
        bullets: [
          {
            title: "Compliance reports from invoices",
            text: "Audit-ready Scope 1, 2 & 3 reporting for CSRD & EU CBAM",
          },
          {
            title: "Indicative exposure from quotes",
            text: "Compare supplier bids before committing capital",
          },
          {
            title: "Commercial off-take benchmarks",
            text: "Actionable economic insights for carbon monetization",
          },
        ],
        formats: ["Audit CSV", "PDF Executive Summary", "REST API JSON"],
        documents: [],
        outputStats: [
          { label: "TOTAL SCOPE 3", value: "14,280 tCO₂e", color: "text-white" },
          { label: "OFF-TAKE VALUE", value: "₹6,48,50,000", color: "text-[#22c55e]" },
          { label: "CONFIDENCE SCORE", value: "98.4% Verified", color: "text-emerald-400" },
        ],
      },
    ] as StepTabItem[],
  },
  procurementSection: {
    badge: "PROCUREMENT INTELLIGENCE",
    title: "Make procurement decisions on CO₂e — not just price.",
    subtitle:
      "Upload competing supplier quotes and immediately see CO₂e per unit and total exposure and its potential cost differences — before your procurement team makes a decision. Carbon becomes a factor in every bid evaluation.",
    bullets: [
      "Negotiate with suppliers using CO₂e per unit as a commercial lever",
      "See carbon exposure per tender before committing",
      "Full audit trail — quotation CO₂e replaced by actuals when invoice is received",
    ],
    footnote:
      "Values are indicative — based on quotation data and ecoinvent 3.10. Confirmed on invoice delivery.",
    tenderTitle: "Concrete supply tender — Q2 2026",
    bidsReceived: "3 bids received",
    suppliers: [
      {
        id: "s1",
        name: "Maier Beton GmbH",
        isRecommended: true,
        pricePerUnit: "₹9,850/m³",
        co2PerUnit: "0.31 t CO₂e/m³",
        totalCo2: "18.6 t",
        co2PerCurrency: "3.15 kg/₹",
        highlightText: "lowest CO₂e · recommended",
      },
      {
        id: "s2",
        name: "Huber & Söhne AG",
        pricePerUnit: "₹9,420/m³",
        co2PerUnit: "0.41 t CO₂e/m³",
        totalCo2: "24.6 t",
        co2PerCurrency: "4.35 kg/₹",
      },
      {
        id: "s3",
        name: "Zement Nord KG",
        pricePerUnit: "₹9,100/m³",
        co2PerUnit: "0.49 t CO₂e/m³",
        totalCo2: "29.4 t",
        co2PerCurrency: "5.38 kg/₹",
      },
    ] as SupplierItem[],
    decisionInsight: {
      compareText: "Choosing Maier vs. Zement Nord:",
      savedCo2: "10.8 t CO₂e",
      extraCost: "₹750/t more",
      carbonAdvantage: "36.7% CO₂ reduction",
      costNote: "Carbon cost of cheaper option: +₹5,400 per 100 m³ at current ETS.",
    },
  },
  methodologySection: {
    title: "The science behind the number.",
    subtitle:
      "Every supplier CO₂e figure is traceable — from source document to emission factor to calculation — logged per line for audit.",
    cards: [
      {
        id: "m1",
        number: "01",
        title: "Best available factor — always",
        description:
          "For every line item, UpCarb. calculates all emission factors and selects the most efficient one available (from manufacturer PCF, EPD, activity-based data or spend-based). The source and tier are transparent per calculation.",
        iconName: "Layers",
      },
      {
        id: "m2",
        number: "02",
        title: "Geography-specific matching",
        description:
          "Emission factors vary significantly by country and region. UpCarb. applies geography-specific ecoinvent datasets where available — and logs the location assumption when it must approximate. Every factor version is recorded for audit.",
        iconName: "MapPin",
      },
      {
        id: "m3",
        number: "03",
        title: "EPD integration for construction",
        description:
          "When Environmental Product Declarations (EN 15804) are available, UpCarb. uses them as product-specific factors — replacing ecoinvent with verified, product-level data. Relevant for LEED, BREEAM, and EU Taxonomy alignment.",
        iconName: "Building2",
      },
      {
        id: "m4",
        number: "04",
        title: "Automated vendor consolidation",
        description:
          "AI identifies duplicate suppliers, name variations, typos, and entity changes across your supplier base. Clean vendor data is a prerequisite for meaningful emissions analysis — UpCarb. handles it automatically.",
        iconName: "Network",
      },
    ] as MethodologyCardItem[],
  },
  standardsSection: {
    label: "BUILT ON RECOGNISED STANDARDS",
    standards: [
      "GHG Protocol Corporate Standard",
      "ISO 14044 LCA",
      "PCAF Global Standard",
      "ESRS E1",
      "GLEC v3 (transport)",
      "EPD EN 15804",
      "ecoinvent database",
    ],
  },
  coverageSection: {
    title: "What UpCarb. covers for industrial and manufacturing.",
    subtitle:
      "Coverage scales with your document types. Invoices cover all GHG Scopes. Quotations unlock forward planning.",
    metricValue: "90%+",
    metricTitle: "line-item processing rate",
    metricDesc:
      "Of all line items extracted from uploaded documents, over 90% are matched to an emission factor without manual intervention. Items below confidence threshold are flagged for review — not silently dropped or estimated.",
    rows: [
      {
        scope: "Scope 3 · Cat. 1",
        category: "Purchased goods & services",
        source: "Invoices · quotations",
        status: "SUPPORTED",
        statusLabel: "FULL COVERAGE",
      },
      {
        scope: "Scope 3 · Cat. 4",
        category: "Upstream transport",
        source: "Transport invoices",
        status: "SUPPORTED",
        statusLabel: "FULL COVERAGE",
      },
      {
        scope: "Scope 1",
        category: "Direct emissions · fuel combustion",
        source: "Fuel invoices",
        status: "SUPPORTED",
        statusLabel: "FULL COVERAGE",
      },
      {
        scope: "Scope 2",
        category: "Purchased electricity & heat",
        source: "Energy supplier invoices",
        status: "SUPPORTED",
        statusLabel: "FULL COVERAGE",
      },
      {
        scope: "Quotations & BOMs",
        category: "Pre-purchase · indicative CO₂e",
        source: "Offers · BOMs · tenders",
        status: "INDICATIVE",
        statusLabel: "SUPPORTED (INDICATIVE)",
      },
      {
        scope: "Construction · EPD",
        category: "Product-specific factors EN 15804",
        source: "Manufacturer EPDs",
        status: "INDICATIVE",
        statusLabel: "SUPPORTED (INDICATIVE)",
      },
      {
        scope: "Scope 3 · Cat. 7",
        category: "Employee commuting",
        source: "HR / mobility data",
        status: "PLANNED",
        statusLabel: "PLANNED",
      },
      {
        scope: "Scope 3 · Cat. 11–15",
        category: "Downstream use & end-of-life",
        source: "Requires product-level modelling",
        status: "OUTSIDE_SCOPE",
        statusLabel: "OUTSIDE SCOPE",
      },
    ] as CoverageRowItem[],
    footnote:
      "Downstream categories (Cat. 11-15) require product-level modelling rather than document extraction.",
  },
  ctaSection: {
    title: "Try UpCarb. with your own document. Right now.",
    subtitle:
      "No credit card required — upload an invoice or quotation and see the result in seconds.",
    primaryButtonText: "Sign up for free",
    secondaryButtonText: "Schedule a Demo",
  },
  faqSection: {
    title: "Frequently asked questions",
    subtitle: "Get answers to common questions about UpCarb. and climate intelligence.",
    faqs: [
      {
        id: "f1",
        q: "How does UpCarb. process my documents?",
        a: "UpCarb. uses advanced optical character recognition (OCR) and NLP classifiers specifically trained on industrial supply chain documents, invoices, bills of materials, and quotations to extract line items with line-level precision.",
      },
      {
        id: "f2",
        q: "What emission factors does UpCarb. use?",
        a: "UpCarb. integrates ecoinvent 3.10, GHG Protocol databases, verified manufacturer EPDs (EN 15804), and regional energy grid emission factors to select the highest-tier matching factor available.",
      },
      {
        id: "f3",
        q: "Can UpCarb. process quotations before a purchase?",
        a: "Yes! By uploading supplier quotations and tenders, UpCarb. calculates indicative CO₂e exposure before you commit commercial contracts, allowing carbon intensity to become a core procurement KPI.",
      },
      {
        id: "f4",
        q: "How does UpCarb. handle low-confidence matches?",
        a: "When a line item match falls below our 85% confidence threshold, UpCarb. flags it for human review with recommended candidate factors, rather than silently guessing or dropping the entry.",
      },
      {
        id: "f5",
        q: "Can results be traced back to the source document?",
        a: "Every calculation includes a full cryptographic audit trail linking the result to the specific source document line item, extracted values, factor tier, and timestamp.",
      },
      {
        id: "f6",
        q: "Can UpCarb. integrate with existing ERP or invoicing systems?",
        a: "Yes. In addition to manual file uploads, UpCarb. provides robust REST APIs and webhooks to connect directly with SAP, Oracle, Xero, QuickBooks, and custom ERP pipelines.",
      },
      {
        id: "f7",
        q: "How quickly can results be generated?",
        a: "Extracted line items and initial emission matching are processed in real-time — typically under 15 seconds for a standard multi-page facility document.",
      },
      {
        id: "f8",
        q: "Can different stakeholders receive different reports?",
        a: "Yes. You can export tailored executive board summaries, granular Scope 3 CSV audit sheets, or regulatory CBAM / ESRS E1 XML declarations from the same processed dataset.",
      },
    ] as FaqItem[],
  },
};
