// 1) If you have an exported type, extend it:
// At the top where your Project type/interface is defined
export type Project = {
  slug: string;
  title: string;
  summary: string;
  tools: string[];
  tags?: string[];
  links?: { label: string; href: string }[];
  date?: string;
  detailLinks?: {
    github?: string;
    tableau?: string;
    kaggle?: string;
    demo?: string;
  };
  sections?: { id: string; title: string; content: string | string[] }[];
  image?: string | StaticImageData;              // backward-compatible
  images?: (string | StaticImageData)[]; 
};


export const projects: Project[] = [
  // NBA
{
  slug: "nba-salary-prediction",
  title: "NBA Salary Prediction",
  date: "May 2025",
  tools: ["Python", "scikit-learn", "PyTorch", "XGBoost", "Pandas", "Matplotlib"],
  tags: ["ML", "DL"],
  image: "/NBA.png",
  images: ["/NBA1.png", "/NBA2.png", "/NBA3.png", "/NBA4.png"],
  detailLinks: {
    github: "https://github.com/edwinjeon/NBA-Salary-Prediction",
    kaggle: "https://www.kaggle.com/ratin21"
  },
  summary:
    "Predicting NBA player salary with ML/DL models trained with years of stats and salary data.",
  sections: [
    {
      id: "overview",
      title: "Overview",
      content: [
        "Objective: Accurately predict 2025–26 NBA player salaries using models trained by players' traditional per-game statistics- points/Assists/Rebounds per game, etc.- and salary data.",
        "Two data scopes: single-season (2024–25) data for smaller linear regression and random forest models; 15 seasons (2010–2025) to feed deep learning models."
      ]
    },
    {
      id: "data",
      title: "Data & Preparation",
      content: [
        'Collected player stats and salary data from <a href="https://www.basketball-reference.com/" target="_blank" class="text-blue-400 hover:underline">Basketball Reference</a>. If there was a need for extra data, scrapped from other sites that provide NBA-related data.',
        "The data prep notebook (inside GitHub link) includes codes handling data scraping, cleaning, joins, type fixes, standardization, and output CSVs ready for modeling."
      ]
    },
    {
      id: "features",
      title: "Feature Selection",
      content: [
        "Reduced multicollinearity using VIF and removed low-signal features. As a result of VIF test with salary as dependent variable, Linear Regression model used a compact set of stats: PTS, AST, REB, STL, BLK, Age.",
        "Random Forest and Deep Learning models consumed entire set of stats with scaling among variables." 
      ]
    },
    {
      id: "models",
      title: "Models & Training",
      content: [
        "Linear Regression baseline trained on 2024–25 data only to minimize multicollinearity.",
        "Random Forest compared against GBM, XGBoost, and Extra Tree models; RF outperformed even before heavy tuning, then improved further with hyperparameters.",
        "Deep Learning model (PyTorch) used a fully-connected network (50 epochs, standard scaling)."
      ]
    },
    {
      id: "evaluation",
      title: "Evaluation & Results",
      content: [
        "Metrics: RMSE (absolute error in dollars) and R² (explained variance).",
        "Linear Regression model — RMSE ≈ $9.24M, R² ≈ 0.526",
        "Random Forest model — RMSE ≈ $4.20M, R² ≈ 0.744",
        "Deep Learning model — RMSE ≈ $4.93M, R² ≈ 0.650 (±0.02 between runs)",
        "Conclusion: Random Forest provides the best overall evaluation scores while remaining relatively interpretable through feature importance."
      ]
    },
    {
      id: "predictions",
      title: "Sample Predictions & Reproducibility",
      content: [
        "Python 3.8+ with pandas, numpy, matplotlib, seaborn, scikit-learn, xgboost, plotly, torch.",
        'Run instructions: download `data/` and `notebooks/` inside <a href="https://github.com/edwinjeon/NBA-Salary-Prediction/" target="_blank" class="text-blue-400 hover:underline">GitHub link</a>, open a notebook based on preferred model (LR/RF/DL), and execute the final Prediction Function cell.',
        "Each notebook includes a prediction function to query by player name; example narrative outputs for Harden, LeBron, and Ty Jerome are shown in the figure.",
      ]
    },
  ]
},

// KPI
{
  slug: "kpi-dashboard",
  title: "KPI Dashboard",
  summary: "Executive KPI dashboard with Products/Customers/HR trends.",
  tools: ["Tableau", "SQL", "Excel"],
  tags: ["Dashboard"],
  image: "/KPI.png",
  images: ["/KPI1.png", "/KPI2.png", "/KPI3.png", "/KPI4.png"],
  links: [
    { label: "Tableau", href: "https://public.tableau.com/app/profile/weongyu.jeon/viz/AdventureWorks_17554251590910/Executive" },
    { label: "Read details →", href: "/projects/kpi-dashboard" },
  ],
  date: "Sep 2025",
  detailLinks: {
    tableau: "https://public.tableau.com/app/profile/weongyu.jeon/viz/AdventureWorks_17554251590910/Executive",
  },
  sections: [
  {
    id: "overview",
    title: "Overview",
    content: [
      "Business-style KPI dashboard built on Microsoft's AdventureWorks database.",
      "The dashboard includes: Executive (overview), Products (merchandising & inventory), Customers (growth & retention), and HR (org efficiency). This project focuses primarily on providing critical data for executives and employees within the company conveniently."
    ]
  },
  {
    id: "dataset-scope",
    title: "Database",
    content: [
      "Source: AdventureWorksDW. Timeframe standardized to the latest complete month (capped at 2012-13 in this build).",
      "Filters: Month selector (current vs prior), Category/Region filters on detail pages; Executive remains deliberately minimal for at-a-glance review."
    ]
  },
  {
    id: "executive",
    title: "Executive Page",
    content: [
      "Top row KPI cards: Revenue, Profit, Orders, Gross Margin %, Customer Count, and AOV.",
      "KPI micro-trends: Sparkline (last 12 months) embedded per card to show context without overwhelming the layout.",
      "Breakdowns: 'Top Categories' (horizontal bars: Revenue, YoY %) and 'Top Regions' (horizontal bars: Revenue, YoY %) for quick mixed insights.",
      "Usability: Most important KPIs for the firm management are conveniently clustered."
    ]
  },
  {
    id: "products",
    title: "Products Page",
    content: [
      "KPIs: Total # of Active Products, New Products This Month, and basic inventory health snapshot.",
      "Category Performance: 3 measures side-by-side per category (Revenue, GM %, Inventory Turnover).",
      "Subcategory Breakdown: Horizontal bar with YoY %; optional sparkline trend per subcategory for volatility.",
      "Usability: Understanding of margin/inventory pressure per product categories."
    ]
  },
  {
    id: "customers",
    title: "Customers Page",
    content: [
      "KPIs: Total Customers (with YoY), Avg Revenue per Customer, and Repeat Purchase Rate.",
      "New vs Returning: Pi chart to snapshot customer divisions.",
      "Regional Segmentation: Regional breakdowns for quick glance.",
      "Usability: Retaining/developing pool of customers to improve sales performance."
    ]
  },
  {
    id: "hr",
    title: "HR Page",
    content: [
      "KPIs: Total Employees, Revenue per Employee, and Avg Order Value per Employee.",
      "Employees by Department: Bar chart; optional YoY headcount tags.",
      "Leaderboard: Highlight top contributors based on performance metrics.",
      "Usability: Evaluating employee performances for potential improvement in financials."
    ]
  },
  {
    id: "implementation",
    title: "Implementation Notes",
    content: [
      "Pipeline: Minimal SQL extracts (month-end grain), with most business math computed in Tableau (table calcs and LODs) to keep the extracts slim.",
      "Dashboard design, KPIs, and calculation formulas could be reused in different cases."
    ]
  },
]
},

// Happiness
{
  slug: "true-factors-of-happiness",
  title: "True Factors of Happiness",
  summary: "Story-telling dashboard exploring the root of happiness.",
  tools: ["Tableau", "SQL", "Excel"],
  tags: ["Visualization"],
  image: "/Happiness.png",
  images: ["/Happiness1.png", "/Happiness2.png", "/Happiness3.png", "/Happiness4.png", "/Happiness5.png", "/Happiness6.png"],
  links: [
    { label: "Tableau", href: "https://public.tableau.com/app/profile/weongyu.jeon/viz/TrueFactorsofHappiness/Page1" },
    { label: "Read details →", href: "/projects/true-factors-of-happiness" },
  ],
  date: "Aug 2025",
  detailLinks: {
    tableau: "https://public.tableau.com/app/profile/weongyu.jeon/viz/TrueFactorsofHappiness/Page1",
    github: "https://github.com/edwinjeon/True-Factors-of-Happiness",
  },
  sections: [
  {
    id: "overview",
    title: "Overview",
    content: [
      "A narrative data visualization project that refutes common beliefs on money as the 'source of happiness'. Project presents various factors better supported by behavioral science and evolutionary psychology.",
      "This visualization insists two points: (1) Refuting common perceptions of high correlation between Money & Happiness, (2) Stating unpopular root of happiness supported by evolutionary psychology."
    ]
  },
  {
    id: "dataset-scope",
    title: "Datasets",
    content: [
      "Primarily utilized cross-national survey data.",
      "European Social Survey 11 (ESS11): provided reliable self-reported data for people's social activeness, various perceptions on life, and life satisfaction.",
      "World Happiness Report 2024 (WHR): large-scale happiness level data of countries worldwide.",
      "World Bank GDP Data: aggregate GDP data for countries worldwide."
    ]
  },
  {
    id: "part1",
    title: "Part 1 — Money & Happiness (Slide 1 & 2)",
    content: [
      "Scatterplot of GDP and Happiness level shows a broad positive association of economical level and happiness; richer countries tend to report higher level of happiness.",
      "However, country time-series data on three countries- US, India, Panama- illustrate that happiness does not necessarily rise along with GDP increase.",
      "Takeaway: money (and GDP) matters up to a point, but the relationship is neither linear nor sufficient to explain full variation of happiness."
    ]
  },
  {
    id: "part2",
    title: "Part 2 — Personal values & Happiness (Slide 3 & 4)",
    content: [
      "Perceived income comfort correlates more strongly with happiness than actual income received.",
      "High education level contributes to more happiness; however, it does not contribute after certain point- just like economical factor (GDP).",
      "Current social role shows students often report high happiness; even individuals who are currently sick/disabled can report high happiness when other psychosocial needs are met.",
      "Overall: psychological perception on status and belonging explains more variance to happiness than raw financial level of a person."
    ]
  },
  {
    id: "part3",
    title: "Part 3 — Evolutionary Roots of Happiness (Slide 5 & 6)",
    content: [
      "Social Behavior: activity/meetings variables (e.g., how often you participate in social activities or meet people) align with higher reported happiness.",
      "Personality & Genetics: cross-country data show a positive association between extraversion and happiness; social energy and approach behaviors are upstream of well-being in many cultures.",
      "Cultural-Psychological Values: variables like trust among people and understanding individual values also associate with higher happiness, consistent with our evolved preferences for safety and cooperative coalitions.",
      "Overall: Extraversion in a personal level and security and individualistic values among society leads to higher happiness, which roots from our evolutionary needs that developed for centuries."
    ]
  },
  {
    id: "findings",
    title: "Key Findings & Summarization",
    content: [
      "1. Happiness rises with wealth at low income levels but saturates quickly; GDP alone is not a reliable predictor within countries over time.",
      "2. Perceived status and income comfort outperform objective income in explaining self-reported happiness level.",
      "3. Behavioral and social variables (activity, meeting frequency) plus individualistic cultural values (trust, respecting individual values) show robust positive relationships with happiness.",
      "4. Happiness or well-being is more related to higher social activity, security, and comfort mind- what evolutionary psychology mainly argues- than raw financial circumstances of a person."
    ]
  },
]
},
];
