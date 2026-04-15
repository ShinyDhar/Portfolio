import { useState, useEffect, useRef } from "react";

const PROJECTS = [
  {
    id: 1,
    title: "AI Policy Working Group & Governance Framework",
    org: "Quest Alliance",
    year: "2024–Present",
    problem: "Quest Alliance deploys AI-powered tools across 6,233 government schools in 9 Indian states — but had no internal governance framework to guide responsible AI use, risking unregulated data collection from children in low-resource settings.",
    solution: "Established and chaired the organization's AI Policy Working Group. Authored internal AI governance guidelines covering data consent, algorithmic fairness, and DPDP 2023 compliance. Built decision frameworks for evaluating new AI deployments against ethical criteria.",
    impact: "Governance framework now guides all AI deployment decisions across 9 states. Created organizational precedent for ethics-first AI adoption in India's education NGO sector.",
    tools: "Policy analysis, DPDP 2023 compliance mapping, stakeholder workshops, governance design",
    tags: ["AI Governance", "Ethics", "Organisation Development"],
    color: "#0d4f4f",
    pattern: "hex",
  },
  {
    id: 2,
    title: "India Public Education AI Governance Framework",
    org: "Independent Research",
    year: "2025–Present",
    problem: "No practitioner-oriented AI governance framework exists specifically for India's public education ecosystem, where NGOs and government agencies deploy AI tools for millions of children without sector-specific ethical guardrails.",
    solution: "Developing a three-part output: a practitioner document for field-level implementers, an NGO diagnostic self-assessment tool, and a policy brief for state education departments. Methodology modelled on UNICEF's EdTech landscape review approach.",
    impact: "Designed to be the first India-specific, practitioner-authored governance resource bridging AI ethics, children's data rights, and on-ground edtech deployment realities.",
    tools: "Desk research, UNICEF methodology adaptation, policy analysis, comparative governance frameworks",
    tags: ["AI Governance", "Ethics", "Policy"],
    color: "#6b1d3a",
    pattern: "layers",
  },
  {
    id: 3,
    title: "AI Governance & Teacher Deskilling — Policy Articles",
    org: "CPPR Abhijnah Magazine",
    year: "2025",
    problem: "India's AI governance discourse is dominated by tech industry and academic voices, lacking ground-level perspectives from education practitioners who see how AI policies (or their absence) affect teachers and children daily.",
    solution: "Authored two policy articles: one analyzing India's emerging AI governance model through a public education lens, and another investigating how EdTech tools systematically deskill teachers by replacing pedagogical judgment with algorithmic recommendations.",
    impact: "Published in CPPR's Abhijnah magazine, contributing a rare practitioner voice to India's national AI policy conversation. Framed teacher deskilling as a governance failure, not just a technology problem.",
    tools: "Policy research, critical analysis, long-form writing",
    tags: ["AI Governance", "Ethics", "Policy"],
    color: "#4a1942",
    pattern: "waves",
  },
  {
    id: 4,
    title: "AI-Powered Hackathon Chatbot — Product Management",
    org: "Quest Alliance",
    year: "2024–Present",
    problem: "Teachers in 6,233 government schools across 5 Indian states lacked scalable tools to conduct student hackathons and assess learning outcomes — while any AI-based solution would need to handle children's data with extreme care.",
    solution: "Product-managing an AI-powered Glific chatbot on WhatsApp that enables teachers to facilitate student hackathons, collects student-produced artifacts (text, images, audio), and uses AI to assess them. Navigating consent architecture, algorithmic fairness, and DPDP 2023 compliance as core product requirements.",
    impact: "Deployed across 5 states reaching thousands of teachers. Surfaced critical governance questions about AI-assessed children's work that directly inform the AI Policy Working Group's guidelines.",
    tools: "Glific, WhatsApp Business API, AI/ML assessment models, product management, DPDP 2023",
    tags: ["Product", "AI Governance", "Ethics", "Data Strategy"],
    color: "#3b1f6e",
    pattern: "nodes",
  },
  {
    id: 5,
    title: "Chatbot ETL Pipeline & Teacher Classification System",
    org: "Quest Alliance",
    year: "2024",
    problem: "Quest Alliance's chatbot interaction data was fragmented across KoboToolbox and BigQuery with no unified view of teacher engagement patterns, making it impossible to distinguish active from dormant users or track engagement trajectories.",
    solution: "Refactored the entire ETL pipeline (KoboToolbox + BigQuery → MySQL). Implemented a six-tier teacher classification system and AEC (Active Engagement Classification) logic with Dormant/Started tiers. Built a DQ timeseries table for longitudinal engagement tracking.",
    impact: "Enabled real-time teacher engagement segmentation across the chatbot ecosystem. Program teams can now identify at-risk teachers and trigger targeted re-engagement interventions.",
    tools: "Python, BigQuery, MySQL, KoboToolbox, SQL, ETL architecture",
    tags: ["Data Engineering", "Data Strategy"],
    color: "#1a4731",
    pattern: "streams",
  },
  {
    id: 6,
    title: "Teacher Training Registry System",
    org: "Quest Alliance",
    year: "2024",
    problem: "Teacher training data across Indian states was fragmented across two separate Kobo forms (TTD and TTF) with no mechanism to track the full training funnel from registration to completion, leaving leadership blind to state-level training gaps.",
    solution: "Built a Google Apps Script system with state-wise sheets, auto-generated training IDs (STATE-FY-NNNN format), and a protected MASTER aggregate view. Bridged the two Kobo forms to create a unified training funnel view.",
    impact: "Unified teacher training tracking across multiple states for the first time. Leadership gained real-time visibility into training completion rates and state-level bottlenecks.",
    tools: "Google Apps Script, Google Sheets, KoboToolbox, data architecture",
    tags: ["Data Engineering", "Data Strategy", "Organisation Development"],
    color: "#2d4a22",
    pattern: "grid",
  },
  {
    id: 7,
    title: "Community Engagement Analytics Pipeline",
    org: "Quest Alliance",
    year: "2024",
    problem: "Quest Alliance's internal Zoho Connect community feed — a key channel for organizational knowledge sharing — generated no structured data on engagement patterns, content quality, or community health.",
    solution: "Built an end-to-end data pipeline: web scraping layer to extract community feed data, Google Sheets as the transformation layer, and Looker Studio as the dashboard visualization layer.",
    impact: "Gave leadership their first quantitative view of internal community health, enabling data-driven decisions about knowledge management and team engagement.",
    tools: "Python, web scraping, Google Sheets, Looker Studio, data pipeline design",
    tags: ["Data Engineering", "Data Strategy"],
    color: "#1a3a2a",
    pattern: "dots",
  },
  {
    id: 8,
    title: "Automated Media Sentiment Analysis Agent",
    org: "Quest Alliance",
    year: "2025",
    problem: "Quest Alliance had no systematic way to monitor how it was perceived in external media, relying on ad-hoc manual searches that missed coverage and provided no sentiment trend data.",
    solution: "Designed an automated agent architecture using Google Apps Script + Claude API + Notion. The system continuously scans for media mentions, classifies sentiment, and maintains a structured Notion database with trend analysis.",
    impact: "Automated media monitoring for organizational leadership. Provided first-ever longitudinal view of external perception, enabling proactive communications strategy.",
    tools: "Google Apps Script, Claude API (Anthropic), Notion API, NLP, sentiment analysis",
    tags: ["Data Science", "AI Governance", "Organisation Development"],
    color: "#1a365d",
    pattern: "pulse",
  },
  {
    id: 9,
    title: "AI Literacy Gender Gaps in Tribal India — Research Paper",
    org: "Quest Alliance × University of Manchester",
    year: "2025",
    problem: "Conventional development assumptions treat digital infrastructure access as an equity lever — more connectivity should mean more equal AI literacy. No research had tested whether this holds across gender and tribal/non-tribal contexts in India.",
    solution: "Designed a mixed-methods study analyzing Quest Alliance's student evaluation data across tribal and connected districts in Odisha. Developed the 'infrastructure-equity inversion' hypothesis as the core theoretical contribution.",
    impact: "Core finding: girls in less-connected tribal districts show higher AI literacy than peers in digitally connected areas — directly challenging infrastructure-as-equity assumptions. Targeting publication in Frontiers in Education and Development in Practice.",
    tools: "STATA, Python, mixed-methods research design, statistical modeling",
    tags: ["Data Science", "Ethics", "AI Governance"],
    color: "#2c1810",
    pattern: "scatter",
  },
  {
    id: 10,
    title: "School Profiling RAG Framework",
    org: "Quest Alliance",
    year: "2024",
    problem: "Comparing schools across multiple performance dimensions (21C skills, wellbeing, gender attitudes, AI literacy) required a robust composite scoring method — but no single weighting approach is universally valid.",
    solution: "Built a Retrieval-Augmented Generation profiling framework using 18 weight derivation methods spanning PCA, Exploratory Factor Analysis, OLS, Ridge Regression, Bootstrap, Random Forest, Gradient Boosting, and Partial Least Squares.",
    impact: "Enabled nuanced, multi-method school profiling that avoids single-methodology bias. Program teams can now design targeted interventions based on robust composite school profiles.",
    tools: "Python, scikit-learn, statsmodels, PCA, EFA, ensemble methods, RAG architecture",
    tags: ["Data Science", "Algorithm"],
    color: "#1a1a4e",
    pattern: "orbits",
  },
  {
    id: 11,
    title: "Life Skills Collaborative — National Dashboard",
    org: "Quest Alliance × Life Skills Collaborative",
    year: "2023",
    problem: "The Life Skills Collaborative (Voices 2023) needed a national-level view of life skills education status across 6 Indian states, but data was scattered across implementing partners with no unified reporting framework.",
    solution: "Designed and implemented a national dashboard consolidating life skills education metrics from multiple implementing partners across 6 states into a single interactive visualization layer.",
    impact: "Provided the first national-level visibility into life skills education for policy stakeholders, enabling cross-state comparison and evidence-based advocacy.",
    tools: "Dashboard design, data modeling, Looker Studio, stakeholder coordination",
    tags: ["Data Strategy", "Product"],
    color: "#4a3728",
    pattern: "bars",
  },
  {
    id: 12,
    title: "NLP-Powered Student Feedback Analytics",
    org: "Masai",
    year: "2021–2022",
    problem: "Manual analysis of thousands of monthly student NPS feedback responses consumed 19+ person-hours per month, delaying actionable insights and leaving systemic student experience issues undetected.",
    solution: "Developed NLP-based analytics tools to automatically categorize feedback themes, detect sentiment patterns, and surface priority issues from unstructured text at scale.",
    impact: "Saved 19+ hours/month in manual analysis. Enabled faster, data-driven student experience interventions that contributed to improved satisfaction scores across 3,500+ students.",
    tools: "Python, NLP, sentiment analysis, text classification",
    tags: ["Data Science", "Algorithm", "Product"],
    color: "#0f2b46",
    pattern: "text",
  },
  {
    id: 13,
    title: "Globethics AI Governance Self-Assessment Tool",
    org: "Globethics Fellowship (Proposed)",
    year: "2026",
    problem: "NGOs deploying AI-powered edtech in government schools lack a practical tool to assess whether their data practices, consent mechanisms, and algorithmic decisions meet both legal (DPDP 2023) and ethical standards for children's data.",
    solution: "Designing a self-assessment diagnostic tool that maps an organization's data flows, consent architecture, algorithmic decision points, and community demographics against DPDP 2023 requirements and a children's rights ethical framework. Includes a community voice protocol for incorporating parent and teacher perspectives.",
    impact: "Pilot-ready with Quest Alliance's 6,233-school network. Designed for adaptation across South Asian edtech contexts. Bridges the gap between legal compliance and lived accountability.",
    tools: "Governance design, DPDP 2023, ethical framework development, diagnostic tool design",
    tags: ["AI Governance", "Ethics", "Policy"],
    color: "#1f3d3d",
    pattern: "shield",
  },
];

const ALL_TAGS = [
  "All",
  "AI Governance",
  "Ethics",
  "Data Science",
  "Data Engineering",
  "Product",
  "Algorithm",
  "Data Strategy",
  "Organisation Development",
  "Policy",
];

const ABOUT_DATA = {
  organizations: [
    { name: "Quest Alliance", role: "Analytics Specialist & AI Governance Lead", period: "2023–Present" },
    { name: "University of Manchester", role: "Research Collaborator", period: "2025–Present" },
    { name: "Life Skills Collaborative", role: "Dashboard & Insights Partner", period: "2023" },
    { name: "CPPR (Centre for Public Policy Research)", role: "Contributing Author", period: "2025" },
    { name: "Vedantu", role: "Senior Manager", period: "2022–2023" },
    { name: "Masai", role: "Senior Operations Manager", period: "2021–2022" },
    { name: "Camp K12", role: "M&E Lead", period: "2020" },
    { name: "Teach for India", role: "Fellow", period: "2018–2020" },
    { name: "PwC SDC", role: "Consultant", period: "2016–2018" },
    { name: "NSDC", role: "Research Partner", period: "2021–2022" },
  ],
  conferences: [
    { title: "Data-Driven Program Evaluation in India's Education Sector", venue: "Indian School of Development Management (ISDM)", year: "2024" },
  ],
  publications: [
    { title: "Infrastructure-Equity Inversion in AI Literacy: Gender Gaps Across Tribal and Connected Districts in Odisha", venue: "Co-authored with University of Manchester — targeting Frontiers in Education / Development in Practice", year: "Forthcoming", status: "Under development" },
    { title: "India's AI Governance Model Through a Public Education Lens", venue: "CPPR Abhijnah Magazine", year: "2025", status: "Published" },
    { title: "Teacher Deskilling via EdTech: A Governance Failure", venue: "CPPR Abhijnah Magazine", year: "2025", status: "Published" },
  ],
  awards: [
    { title: "Teach for India Fellowship", year: "2018–2020" },
    { title: "First Class Distinction — Bachelor of Engineering", year: "2015" },
  ],
};

/* ─── Animated SVG pattern backgrounds per card ─── */
function CardAnimation({ pattern, color }) {
  const lighter = color + "99";
  const animations = {
    hex: (
      <svg width="100%" height="100%" viewBox="0 0 400 260">
        <defs>
          <style>{`
            @keyframes hexFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
            @keyframes hexPulse { 0%,100%{opacity:0.3} 50%{opacity:0.7} }
          `}</style>
        </defs>
        <rect width="400" height="260" fill={color}/>
        {[
          [60,80,20], [140,50,16], [220,120,24], [300,70,18], [100,180,22],
          [250,190,14], [340,160,20], [180,200,16], [50,140,12], [320,40,15]
        ].map(([x,y,r],i) => (
          <polygon key={i} points={hexPoints(x,y,r)} fill="none" stroke="rgba(255,255,255,0.25)"
            strokeWidth="1.5" style={{animation:`hexFloat ${2+i*0.3}s ease-in-out infinite, hexPulse ${3+i*0.2}s ease-in-out infinite`,animationDelay:`${i*0.15}s`}}/>
        ))}
        <text x="200" y="240" textAnchor="middle" fill="rgba(255,255,255,0.08)" fontSize="72" fontFamily="Georgia">GOV</text>
      </svg>
    ),
    nodes: (
      <svg width="100%" height="100%" viewBox="0 0 400 260">
        <defs><style>{`@keyframes nodeGlow{0%,100%{r:4;opacity:0.4}50%{r:7;opacity:0.9}} @keyframes lineDash{0%{stroke-dashoffset:20}100%{stroke-dashoffset:0}}`}</style></defs>
        <rect width="400" height="260" fill={color}/>
        {[[80,60],[200,40],[320,80],[140,140],[260,130],[60,200],[180,210],[340,190],[100,100],[300,200]].map(([x,y],i) => (
          <g key={i}>
            {i<9 && <line x1={x} y1={y} x2={[[200,40],[320,80],[140,140],[260,130],[60,200],[180,210],[340,190],[100,100],[300,200]][i][0]} y2={[[200,40],[320,80],[140,140],[260,130],[60,200],[180,210],[340,190],[100,100],[300,200]][i][1]} stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="4 4" style={{animation:`lineDash 2s linear infinite`,animationDelay:`${i*0.2}s`}}/>}
            <circle cx={x} cy={y} r="4" fill="rgba(255,255,255,0.5)" style={{animation:`nodeGlow ${2+i*0.2}s ease-in-out infinite`,animationDelay:`${i*0.3}s`}}/>
          </g>
        ))}
      </svg>
    ),
    streams: (
      <svg width="100%" height="100%" viewBox="0 0 400 260">
        <defs><style>{`@keyframes streamFlow{0%{stroke-dashoffset:80}100%{stroke-dashoffset:0}}`}</style></defs>
        <rect width="400" height="260" fill={color}/>
        {[40,80,120,160,200].map((y,i) => (
          <path key={i} d={`M0,${y} Q100,${y-20+i*8} 200,${y+10} T400,${y-5}`} fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeDasharray="8 12" style={{animation:`streamFlow ${3+i*0.5}s linear infinite`}}/>
        ))}
        {[30,90,150,210,250].map((y,i) => (
          <path key={`b${i}`} d={`M0,${y+15} Q150,${y+30} 250,${y} T400,${y+20}`} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" strokeDasharray="4 8" style={{animation:`streamFlow ${4+i*0.3}s linear infinite`,animationDelay:`${i*0.5}s`}}/>
        ))}
      </svg>
    ),
    scatter: (
      <svg width="100%" height="100%" viewBox="0 0 400 260">
        <defs><style>{`@keyframes scatterPop{0%,100%{transform:scale(1);opacity:0.4}50%{transform:scale(1.6);opacity:0.8}}`}</style></defs>
        <rect width="400" height="260" fill={color}/>
        {[[50,40,5],[120,80,8],[200,50,6],[280,100,10],[350,60,4],[80,150,7],[160,180,5],[240,160,9],[320,200,6],[60,220,4],[140,120,3],[300,150,5],[380,230,7],[200,220,4],[30,100,6]].map(([x,y,r],i) => (
          <circle key={i} cx={x} cy={y} r={r} fill="rgba(255,255,255,0.3)" style={{animation:`scatterPop ${2+i*0.3}s ease-in-out infinite`,animationDelay:`${i*0.2}s`,transformOrigin:`${x}px ${y}px`}}/>
        ))}
      </svg>
    ),
    waves: (
      <svg width="100%" height="100%" viewBox="0 0 400 260">
        <defs><style>{`@keyframes waveShift{0%{transform:translateX(0)}100%{transform:translateX(-50px)}}`}</style></defs>
        <rect width="400" height="260" fill={color}/>
        {[60,110,160,210].map((y,i) => (
          <path key={i} d={`M-50,${y} Q25,${y-25} 50,${y} T150,${y} T250,${y} T350,${y} T450,${y}`} fill="none" stroke={`rgba(255,255,255,${0.1+i*0.05})`} strokeWidth="2" style={{animation:`waveShift ${4-i*0.5}s linear infinite`}}/>
        ))}
      </svg>
    ),
    pulse: (
      <svg width="100%" height="100%" viewBox="0 0 400 260">
        <defs><style>{`@keyframes ringPulse{0%{r:10;opacity:0.6}100%{r:80;opacity:0}}`}</style></defs>
        <rect width="400" height="260" fill={color}/>
        {[0,1,2].map(i => <circle key={i} cx="200" cy="130" r="10" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" style={{animation:`ringPulse 3s ease-out infinite`,animationDelay:`${i}s`}}/>)}
        <circle cx="200" cy="130" r="6" fill="rgba(255,255,255,0.4)"/>
        {[[120,80],[280,80],[120,180],[280,180]].map(([x,y],i) => (
          <g key={`n${i}`}><line x1="200" y1="130" x2={x} y2={y} stroke="rgba(255,255,255,0.1)" strokeWidth="1"/><circle cx={x} cy={y} r="3" fill="rgba(255,255,255,0.3)"/></g>
        ))}
      </svg>
    ),
    orbits: (
      <svg width="100%" height="100%" viewBox="0 0 400 260">
        <defs><style>{`@keyframes orbit1{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}} @keyframes orbit2{0%{transform:rotate(360deg)}100%{transform:rotate(0deg)}}`}</style></defs>
        <rect width="400" height="260" fill={color}/>
        <g style={{transformOrigin:"200px 130px",animation:"orbit1 8s linear infinite"}}>
          <ellipse cx="200" cy="130" rx="90" ry="40" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" transform="rotate(-20,200,130)"/>
          <circle cx="290" cy="122" r="5" fill="rgba(255,255,255,0.5)"/>
        </g>
        <g style={{transformOrigin:"200px 130px",animation:"orbit2 12s linear infinite"}}>
          <ellipse cx="200" cy="130" rx="120" ry="55" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" transform="rotate(15,200,130)"/>
          <circle cx="80" cy="140" r="4" fill="rgba(255,255,255,0.4)"/>
        </g>
        <circle cx="200" cy="130" r="8" fill="rgba(255,255,255,0.25)"/>
      </svg>
    ),
    grid: (
      <svg width="100%" height="100%" viewBox="0 0 400 260">
        <defs><style>{`@keyframes gridFade{0%,100%{opacity:0.1}50%{opacity:0.4}}`}</style></defs>
        <rect width="400" height="260" fill={color}/>
        {Array.from({length:10}).map((_,i) => <line key={`v${i}`} x1={i*44} y1="0" x2={i*44} y2="260" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>)}
        {Array.from({length:7}).map((_,i) => <line key={`h${i}`} x1="0" y1={i*40} x2="400" y2={i*40} stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>)}
        {[[44,40],[132,80],[220,120],[308,160],[88,200],[176,40],[264,160],[352,80]].map(([x,y],i) => (
          <rect key={i} x={x-18} y={y-16} width="36" height="32" fill="rgba(255,255,255,0.12)" rx="2" style={{animation:`gridFade ${2+i*0.4}s ease-in-out infinite`,animationDelay:`${i*0.3}s`}}/>
        ))}
      </svg>
    ),
    layers: (
      <svg width="100%" height="100%" viewBox="0 0 400 260">
        <defs><style>{`@keyframes layerSlide{0%,100%{transform:translateX(0)}50%{transform:translateX(10px)}}`}</style></defs>
        <rect width="400" height="260" fill={color}/>
        {[0,1,2,3,4].map(i => (
          <rect key={i} x={60+i*15} y={40+i*20} width={280-i*30} height={160-i*20} rx="4" fill="none" stroke={`rgba(255,255,255,${0.08+i*0.04})`} strokeWidth="1.5" style={{animation:`layerSlide ${3+i*0.5}s ease-in-out infinite`,animationDelay:`${i*0.3}s`}}/>
        ))}
      </svg>
    ),
    dots: (
      <svg width="100%" height="100%" viewBox="0 0 400 260">
        <defs><style>{`@keyframes dotBlink{0%,100%{opacity:0.15}50%{opacity:0.5}}`}</style></defs>
        <rect width="400" height="260" fill={color}/>
        {Array.from({length:120}).map((_,i) => {
          const x = (i%12)*36+18; const y = Math.floor(i/12)*28+14;
          return <circle key={i} cx={x} cy={y} r="2" fill="rgba(255,255,255,0.2)" style={{animation:`dotBlink ${1.5+Math.random()*2}s ease-in-out infinite`,animationDelay:`${Math.random()*3}s`}}/>;
        })}
      </svg>
    ),
    bars: (
      <svg width="100%" height="100%" viewBox="0 0 400 260">
        <defs><style>{`@keyframes barGrow{0%,100%{transform:scaleY(0.3)}50%{transform:scaleY(1)}}`}</style></defs>
        <rect width="400" height="260" fill={color}/>
        {[40,80,120,160,200,240,280,320,360].map((x,i) => {
          const h = 40+Math.random()*120;
          return <rect key={i} x={x-12} y={240-h} width="24" height={h} rx="3" fill={`rgba(255,255,255,${0.12+i*0.02})`} style={{animation:`barGrow ${2+i*0.3}s ease-in-out infinite`,animationDelay:`${i*0.2}s`,transformOrigin:`${x}px 240px`}}/>;
        })}
      </svg>
    ),
    text: (
      <svg width="100%" height="100%" viewBox="0 0 400 260">
        <defs><style>{`@keyframes textFade{0%,100%{opacity:0.05}50%{opacity:0.2}}`}</style></defs>
        <rect width="400" height="260" fill={color}/>
        {["sentiment","positive","negative","neutral","feedback","NLP","classify","insight","theme","pattern"].map((w,i) => (
          <text key={i} x={30+(i%5)*75} y={50+Math.floor(i/5)*100+i*12} fill="rgba(255,255,255,0.15)" fontSize={10+i%3*2} fontFamily="monospace" style={{animation:`textFade ${2+i*0.4}s ease-in-out infinite`,animationDelay:`${i*0.3}s`}}>{w}</text>
        ))}
      </svg>
    ),
    shield: (
      <svg width="100%" height="100%" viewBox="0 0 400 260">
        <defs><style>{`@keyframes shieldPulse{0%,100%{transform:scale(1);opacity:0.3}50%{transform:scale(1.05);opacity:0.6}}`}</style></defs>
        <rect width="400" height="260" fill={color}/>
        <path d="M200,40 L280,80 L280,160 Q280,220 200,240 Q120,220 120,160 L120,80 Z" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" style={{animation:"shieldPulse 3s ease-in-out infinite",transformOrigin:"200px 140px"}}/>
        <path d="M200,70 L260,100 L260,155 Q260,200 200,215 Q140,200 140,155 L140,100 Z" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" style={{animation:"shieldPulse 3s ease-in-out infinite 0.5s",transformOrigin:"200px 140px"}}/>
        <text x="200" y="155" textAnchor="middle" fill="rgba(255,255,255,0.15)" fontSize="28" fontFamily="Georgia">✓</text>
      </svg>
    ),
  };
  return <div style={{position:"absolute",inset:0,overflow:"hidden"}}>{animations[pattern] || animations.hex}</div>;
}

function hexPoints(cx,cy,r) {
  return Array.from({length:6}).map((_,i) => {
    const a = Math.PI/3*i - Math.PI/6;
    return `${cx+r*Math.cos(a)},${cy+r*Math.sin(a)}`;
  }).join(" ");
}

/* ─── Main App ─── */
export default function Portfolio() {
  const [page, setPage] = useState("home");
  const [activeTag, setActiveTag] = useState("All");
  const [expandedId, setExpandedId] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const filtered = activeTag === "All" ? PROJECTS : PROJECTS.filter(p => p.tags.includes(activeTag));

  return (
    <div style={{
      minHeight:"100vh",
      background:"#080808",
      color:"#e8e8e8",
      fontFamily:"'Outfit', sans-serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Outfit:wght@300;400;500;600&display=swap');
        * { box-sizing:border-box; margin:0; padding:0; }
        ::-webkit-scrollbar { width:6px; }
        ::-webkit-scrollbar-track { background:#111; }
        ::-webkit-scrollbar-thumb { background:#333; border-radius:3px; }
        a { color:inherit; text-decoration:none; }
      `}</style>

      {/* ─── NAV ─── */}
      <nav style={{
        position:"fixed", top:0, left:0, right:0, zIndex:100,
        display:"flex", justifyContent:"space-between", alignItems:"center",
        padding:"20px 40px",
        background:"linear-gradient(180deg, rgba(8,8,8,0.95) 0%, rgba(8,8,8,0) 100%)",
        backdropFilter:"blur(8px)",
      }}>
        <div style={{
          fontFamily:"'Instrument Serif', serif",
          fontSize:"22px",
          letterSpacing:"-0.5px",
          cursor:"pointer",
        }} onClick={() => { setPage("home"); setExpandedId(null); }}>
          Shiny Dhar
        </div>
        <div style={{display:"flex",gap:"32px",fontSize:"13px",letterSpacing:"1.5px",textTransform:"uppercase",fontWeight:500}}>
          {[["home","Projects"],["about","About Me"],["art","Art"]].map(([key,label]) => (
            <div key={key} onClick={() => { setPage(key); setExpandedId(null); }}
              style={{
                cursor:"pointer",
                color: page===key ? "#fff" : "#888",
                borderBottom: page===key ? "1px solid #fff" : "1px solid transparent",
                paddingBottom:"4px",
                transition:"all 0.3s",
              }}
              onMouseEnter={e => e.target.style.color="#fff"}
              onMouseLeave={e => { if(page!==key) e.target.style.color="#888"; }}
            >{label}</div>
          ))}
        </div>
      </nav>

      <div style={{paddingTop:"80px"}}>
        {page === "home" && <HomePage activeTag={activeTag} setActiveTag={setActiveTag} filtered={filtered} expandedId={expandedId} setExpandedId={setExpandedId}/>}
        {page === "about" && <AboutPage />}
        {page === "art" && <ArtPage />}
      </div>
    </div>
  );
}

/* ─── HOME / PROJECTS PAGE ─── */
function HomePage({ activeTag, setActiveTag, filtered, expandedId, setExpandedId }) {
  return (
    <div style={{padding:"0 40px 80px"}}>
      {/* Hero */}
      <div style={{padding:"60px 0 50px",maxWidth:"720px"}}>
        <h1 style={{
          fontFamily:"'Instrument Serif', serif",
          fontSize:"clamp(36px, 5vw, 56px)",
          fontWeight:400,
          lineHeight:1.15,
          letterSpacing:"-1px",
          marginBottom:"20px",
        }}>
          Building ethical AI<br/>
          <span style={{fontStyle:"italic",color:"#a0aec0"}}>in India's public schools</span>
        </h1>
        <p style={{fontSize:"15px",lineHeight:1.7,color:"#999",maxWidth:"560px",fontWeight:300}}>
          AI governance practitioner, data engineer, and researcher working at the intersection of children's data rights, edtech policy, and responsible AI deployment across 6,233 government schools in India.
        </p>
      </div>

      {/* Tag Filters */}
      <div style={{display:"flex",flexWrap:"wrap",gap:"8px",marginBottom:"40px"}}>
        {ALL_TAGS.map(tag => (
          <button key={tag} onClick={() => setActiveTag(tag)}
            style={{
              padding:"6px 16px",
              borderRadius:"20px",
              border: activeTag===tag ? "1px solid #fff" : "1px solid #333",
              background: activeTag===tag ? "#fff" : "transparent",
              color: activeTag===tag ? "#080808" : "#888",
              fontSize:"12px",
              fontFamily:"'Outfit', sans-serif",
              fontWeight:500,
              cursor:"pointer",
              letterSpacing:"0.5px",
              transition:"all 0.25s",
            }}
          >{tag}</button>
        ))}
      </div>

      {/* Project Grid */}
      <div style={{
        display:"grid",
        gridTemplateColumns:"repeat(auto-fill, minmax(340px, 1fr))",
        gap:"24px",
      }}>
        {filtered.map(project => (
          <ProjectCard key={project.id} project={project} expanded={expandedId===project.id}
            onToggle={() => setExpandedId(expandedId===project.id ? null : project.id)}/>
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{textAlign:"center",padding:"80px 0",color:"#555",fontSize:"14px"}}>
          No projects match this filter.
        </div>
      )}
    </div>
  );
}

/* ─── PROJECT CARD ─── */
function ProjectCard({ project, expanded, onToggle }) {
  return (
    <div onClick={onToggle} style={{
      cursor:"pointer",
      borderRadius:"12px",
      overflow:"hidden",
      border:"1px solid #1a1a1a",
      background:"#111",
      transition:"all 0.35s cubic-bezier(0.4,0,0.2,1)",
      transform: expanded ? "scale(1)" : "scale(1)",
    }}
    onMouseEnter={e => { if(!expanded) e.currentTarget.style.border="1px solid #333"; e.currentTarget.style.transform="translateY(-4px)"; }}
    onMouseLeave={e => { e.currentTarget.style.border="1px solid #1a1a1a"; e.currentTarget.style.transform="translateY(0)"; }}
    >
      {/* Animated Visual */}
      <div style={{position:"relative",width:"100%",height:"220px",overflow:"hidden"}}>
        <CardAnimation pattern={project.pattern} color={project.color}/>
        {/* Year badge */}
        <div style={{
          position:"absolute",top:"12px",right:"12px",
          background:"rgba(0,0,0,0.5)",backdropFilter:"blur(4px)",
          padding:"3px 10px",borderRadius:"12px",fontSize:"11px",color:"#ccc",fontWeight:500,
        }}>{project.year}</div>
      </div>

      {/* Content */}
      <div style={{padding:"20px"}}>
        <div style={{fontSize:"11px",color:"#888",marginBottom:"6px",fontWeight:500,letterSpacing:"0.5px"}}>{project.org}</div>
        <h3 style={{
          fontFamily:"'Instrument Serif', serif",
          fontSize:"18px",
          fontWeight:400,
          lineHeight:1.3,
          marginBottom:"12px",
        }}>{project.title}</h3>

        {/* Tags */}
        <div style={{display:"flex",flexWrap:"wrap",gap:"6px",marginBottom: expanded ? "16px" : "0"}}>
          {project.tags.map(tag => (
            <span key={tag} style={{
              padding:"3px 10px",borderRadius:"12px",
              background:"rgba(255,255,255,0.06)",
              fontSize:"10px",color:"#aaa",fontWeight:500,letterSpacing:"0.3px",
            }}>{tag}</span>
          ))}
        </div>

        {/* Expanded Details */}
        {expanded && (
          <div style={{
            marginTop:"16px",
            paddingTop:"16px",
            borderTop:"1px solid #222",
            animation:"fadeIn 0.3s ease",
          }}>
            <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}`}</style>

            <DetailSection label="Problem" text={project.problem}/>
            <DetailSection label="Solution" text={project.solution}/>
            <DetailSection label="Impact" text={project.impact}/>
            <DetailSection label="Tools & Tech" text={project.tools}/>

            <div style={{marginTop:"14px"}}>
              <span style={{
                display:"inline-block",
                padding:"6px 16px",
                border:"1px solid #333",
                borderRadius:"20px",
                fontSize:"11px",
                color:"#999",
                fontWeight:500,
                cursor:"pointer",
              }}>Link coming soon →</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function DetailSection({ label, text }) {
  return (
    <div style={{marginBottom:"14px"}}>
      <div style={{fontSize:"10px",color:"#666",fontWeight:600,letterSpacing:"1.5px",textTransform:"uppercase",marginBottom:"4px"}}>{label}</div>
      <p style={{fontSize:"13px",lineHeight:1.65,color:"#bbb",fontWeight:300}}>{text}</p>
    </div>
  );
}

/* ─── ABOUT PAGE ─── */
function AboutPage() {
  return (
    <div style={{padding:"0 40px 80px",maxWidth:"900px",margin:"0 auto"}}>
      {/* Hero */}
      <div style={{padding:"60px 0 50px"}}>
        <h1 style={{fontFamily:"'Instrument Serif', serif",fontSize:"clamp(36px,5vw,52px)",fontWeight:400,letterSpacing:"-1px",marginBottom:"20px"}}>
          About Me
        </h1>
        <p style={{fontSize:"15px",lineHeight:1.8,color:"#999",fontWeight:300,maxWidth:"640px"}}>
          Analytics specialist and AI governance practitioner with 10 years across EdTech, social sector data, and AI policy. Currently leading data strategy and AI ethics at Quest Alliance, where I work with 6,233 government schools across India. I build the AI systems and question whether we should — often simultaneously.
        </p>
      </div>

      {/* Organizations */}
      <AboutSection title="Organizations & Partners">
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(260px, 1fr))",gap:"12px"}}>
          {ABOUT_DATA.organizations.map((org,i) => (
            <div key={i} style={{
              padding:"16px 20px",background:"#111",borderRadius:"8px",border:"1px solid #1a1a1a",
              transition:"border 0.2s",
            }}
            onMouseEnter={e => e.currentTarget.style.border="1px solid #333"}
            onMouseLeave={e => e.currentTarget.style.border="1px solid #1a1a1a"}
            >
              <div style={{fontSize:"14px",fontWeight:500,marginBottom:"4px"}}>{org.name}</div>
              <div style={{fontSize:"12px",color:"#888"}}>{org.role}</div>
              <div style={{fontSize:"11px",color:"#555",marginTop:"2px"}}>{org.period}</div>
            </div>
          ))}
        </div>
      </AboutSection>

      {/* Awards */}
      <AboutSection title="Awards & Fellowships">
        {ABOUT_DATA.awards.map((a,i) => (
          <div key={i} style={{padding:"12px 0",borderBottom:"1px solid #1a1a1a",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <span style={{fontSize:"14px",fontWeight:400}}>{a.title}</span>
            <span style={{fontSize:"12px",color:"#666"}}>{a.year}</span>
          </div>
        ))}
      </AboutSection>

      {/* Conferences */}
      <AboutSection title="Conferences & Talks">
        {ABOUT_DATA.conferences.map((c,i) => (
          <div key={i} style={{padding:"12px 0",borderBottom:"1px solid #1a1a1a"}}>
            <div style={{fontSize:"14px",fontWeight:400,marginBottom:"4px"}}>{c.title}</div>
            <div style={{fontSize:"12px",color:"#888"}}>{c.venue} — {c.year}</div>
          </div>
        ))}
      </AboutSection>

      {/* Publications */}
      <AboutSection title="Publications">
        {ABOUT_DATA.publications.map((p,i) => (
          <div key={i} style={{padding:"14px 0",borderBottom:"1px solid #1a1a1a"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:"16px"}}>
              <div>
                <div style={{fontSize:"14px",fontWeight:400,marginBottom:"4px",fontFamily:"'Instrument Serif', serif",fontSize:"16px"}}>{p.title}</div>
                <div style={{fontSize:"12px",color:"#888"}}>{p.venue}</div>
              </div>
              <div style={{flexShrink:0}}>
                <span style={{
                  padding:"3px 10px",borderRadius:"12px",fontSize:"10px",fontWeight:500,
                  background: p.status==="Published" ? "rgba(72,187,120,0.15)" : "rgba(237,187,64,0.15)",
                  color: p.status==="Published" ? "#68d391" : "#ecc94b",
                }}>{p.status}</span>
              </div>
            </div>
          </div>
        ))}
      </AboutSection>

      {/* Contact */}
      <div style={{marginTop:"60px",padding:"40px",background:"#111",borderRadius:"12px",border:"1px solid #1a1a1a",textAlign:"center"}}>
        <div style={{fontFamily:"'Instrument Serif', serif",fontSize:"24px",marginBottom:"12px"}}>Let's connect</div>
        <p style={{fontSize:"13px",color:"#888",marginBottom:"20px",fontWeight:300}}>
          shiny.work2017@gmail.com  ·  +91-8884849582
        </p>
        <div style={{display:"flex",gap:"12px",justifyContent:"center"}}>
          <a href="https://www.linkedin.com/in/shinydhar/" target="_blank" rel="noopener"
            style={{padding:"8px 20px",border:"1px solid #333",borderRadius:"20px",fontSize:"12px",fontWeight:500,letterSpacing:"0.5px",transition:"all 0.2s"}}
            onMouseEnter={e => {e.target.style.background="#fff";e.target.style.color="#080808"}}
            onMouseLeave={e => {e.target.style.background="transparent";e.target.style.color="#e8e8e8"}}
          >LinkedIn</a>
        </div>
      </div>
    </div>
  );
}

function AboutSection({ title, children }) {
  return (
    <div style={{marginBottom:"40px"}}>
      <h2 style={{
        fontFamily:"'Instrument Serif', serif",
        fontSize:"22px",fontWeight:400,
        marginBottom:"20px",paddingBottom:"10px",
        borderBottom:"1px solid #222",
      }}>{title}</h2>
      {children}
    </div>
  );
}

/* ─── ART PAGE ─── */
function ArtPage() {
  return (
    <div style={{padding:"0 40px 80px",maxWidth:"900px",margin:"0 auto"}}>
      <div style={{padding:"60px 0 50px"}}>
        <h1 style={{fontFamily:"'Instrument Serif', serif",fontSize:"clamp(36px,5vw,52px)",fontWeight:400,letterSpacing:"-1px",marginBottom:"20px"}}>
          Art
        </h1>
        <p style={{fontSize:"15px",lineHeight:1.8,color:"#999",fontWeight:300}}>
          This space is being curated. Coming soon.
        </p>
      </div>

      {/* Placeholder grid */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(250px, 1fr))",gap:"16px"}}>
        {[1,2,3,4,5,6].map(i => (
          <div key={i} style={{
            aspectRatio:"1",
            background:`linear-gradient(135deg, hsl(${i*45},15%,12%) 0%, hsl(${i*45+30},10%,8%) 100%)`,
            borderRadius:"12px",
            border:"1px solid #1a1a1a",
            display:"flex",alignItems:"center",justifyContent:"center",
          }}>
            <span style={{fontSize:"12px",color:"#333",fontWeight:500,letterSpacing:"1px"}}>COMING SOON</span>
          </div>
        ))}
      </div>
    </div>
  );
}
