import { useState } from "react";

const accent = "#FF9900";
const accentDark = "#CC7A00";

// ─── Shared helpers ───────────────────────────────────────────────────────────
function Badge({ text, color }) {
  return (
    <span style={{
      display: "inline-block", background: color + "20", color,
      border: `1px solid ${color}40`, borderRadius: 20,
      fontSize: 10, fontWeight: 700, padding: "2px 9px", textTransform: "uppercase", letterSpacing: 0.4,
    }}>{text}</span>
  );
}
function Callout({ icon, label, text, color = accent }) {
  return (
    <div style={{
      background: color + "12", border: `1px solid ${color}35`,
      borderLeft: `3px solid ${color}`, borderRadius: 8,
      padding: "10px 14px", margin: "10px 0 0",
    }}>
      <div style={{ fontWeight: 700, fontSize: 11, color, marginBottom: 4 }}>{icon} {label}</div>
      <div style={{ fontSize: 13, lineHeight: 1.65, color: "var(--color-text-secondary)" }}>{text}</div>
    </div>
  );
}
function Analogy({ icon, label, text, color = "#546e7a" }) {
  return (
    <div style={{
      background: "var(--color-background-secondary)", borderLeft: `3px solid ${color}`,
      borderRadius: 8, padding: "10px 14px", margin: "10px 0 0",
    }}>
      <div style={{ fontWeight: 700, fontSize: 11, color, marginBottom: 3 }}>{icon} {label}</div>
      <div style={{ fontSize: 13, fontStyle: "italic", lineHeight: 1.65, color: "var(--color-text-secondary)" }}>{text}</div>
    </div>
  );
}
function H2({ children }) {
  return <div style={{ fontWeight: 700, fontSize: 14, color: "var(--color-text-primary)", margin: "16px 0 7px", borderBottom: "1px solid var(--color-border-tertiary)", paddingBottom: 5 }}>{children}</div>;
}
function Body({ children }) {
  return <div style={{ fontSize: 13.5, lineHeight: 1.7, color: "var(--color-text-secondary)", marginTop: 6 }}>{children}</div>;
}
function KV({ rows, c1 = "28%" }) {
  return (
    <div style={{ borderRadius: 8, overflow: "hidden", border: "1px solid var(--color-border-tertiary)", marginTop: 8 }}>
      {rows.map(([k, v, color], i) => (
        <div key={i} style={{
          display: "grid", gridTemplateColumns: `${c1} 1fr`, gap: 10,
          padding: "8px 12px", alignItems: "start",
          borderBottom: i < rows.length - 1 ? "1px solid var(--color-border-tertiary)" : "none",
          background: i % 2 === 0 ? "var(--color-background-secondary)" : "var(--color-background-primary)",
        }}>
          <div style={{ fontWeight: 700, fontSize: 12, color: color || "#1a73e8" }}>{k}</div>
          <div style={{ fontSize: 12.5, color: "var(--color-text-secondary)", lineHeight: 1.55 }} dangerouslySetInnerHTML={{ __html: v }} />
        </div>
      ))}
    </div>
  );
}

// ─── SVG: Global Infrastructure Map ──────────────────────────────────────────
function GlobalInfraDiagram() {
  return (
    <svg width="100%" viewBox="0 0 560 200" style={{ display: "block", margin: "10px 0" }}>
      {/* World map dots — simplified continents */}
      {[[80,80],[100,75],[120,80],[140,85],[90,95],[110,90],[130,90],
        [200,70],[220,65],[240,70],[260,75],[210,85],[230,80],
        [300,90],[320,85],[340,90],[310,100],[330,95],
        [400,75],[420,70],[440,75],[410,85],[430,80],
        [480,100],[500,95],[460,105]].map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r={2.5} fill="var(--color-border-secondary)" opacity="0.6" />
      ))}

      {/* Region clusters */}
      {[
        { x: 110, y: 82, label: "us-east-1", color: "#1a73e8", azs: 6 },
        { x: 225, y: 72, label: "eu-west-1", color: "#0f9d58", azs: 3 },
        { x: 420, y: 76, label: "ap-northeast-1", color: "#FF9900", azs: 3 },
        { x: 315, y: 93, label: "ap-south-1", color: "#6a1b9a", azs: 3 },
      ].map(({ x, y, label, color, azs }) => (
        <g key={label}>
          <circle cx={x} cy={y} r={18} fill={color + "25"} stroke={color} strokeWidth="1.2" />
          <text x={x} y={y + 3} textAnchor="middle" fontSize="8" fontWeight="700" fill={color}>R</text>
          <text x={x} y={y + 28} textAnchor="middle" fontSize="7.5" fill={color}>{label}</text>
          <text x={x} y={y + 37} textAnchor="middle" fontSize="7" fill="var(--color-text-secondary)">{azs} AZs</text>
        </g>
      ))}

      {/* Edge locations */}
      {[[75,60],[155,50],[180,90],[270,60],[350,70],[370,110],[450,55],[510,80],[50,110]].map(([x,y],i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={5} fill="#0f9d5840" stroke="#0f9d58" strokeWidth="1" />
          <text x={x} y={y+3} textAnchor="middle" fontSize="6" fill="#0f9d58">E</text>
        </g>
      ))}

      {/* Dashed CDN lines from regions to edge locations */}
      {[
        [110,82,75,60],[110,82,155,50],[225,72,180,90],[225,72,270,60],
        [420,76,450,55],[420,76,510,80],[315,93,350,70],[315,93,370,110],
      ].map(([x1,y1,x2,y2],i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#0f9d58" strokeWidth="0.7" strokeDasharray="3 2" opacity="0.5" />
      ))}

      {/* Legend */}
      <circle cx={30} cy={155} r={8} fill="#1a73e825" stroke="#1a73e8" strokeWidth="1" />
      <text x={30} y={158} textAnchor="middle" fontSize="7" fontWeight="700" fill="#1a73e8">R</text>
      <text x={44} y={158} fontSize="9" fill="var(--color-text-secondary)">AWS Region (with AZs)</text>

      <circle cx={30} cy={172} r={5} fill="#0f9d5840" stroke="#0f9d58" strokeWidth="1" />
      <text x={30} y={175} textAnchor="middle" fontSize="6" fill="#0f9d58">E</text>
      <text x={44} y={175} fontSize="9" fill="var(--color-text-secondary)">Edge Location (CloudFront CDN)</text>

      <text x={280} y={158} textAnchor="middle" fontSize="9" fontWeight="700" fill="var(--color-text-primary)">AWS Global Infrastructure</text>
      <text x={280} y={170} textAnchor="middle" fontSize="8" fill="var(--color-text-secondary)">30+ Regions · 90+ AZs · 400+ Edge Locations worldwide</text>
    </svg>
  );
}

// ─── SVG: Region Selection 4 Factors ─────────────────────────────────────────
function RegionFactorsDiagram() {
  const factors = [
    { num: "1", label: "Compliance", icon: "⚖️", color: "#d32f2f",
      example: "EU data must stay in EU (GDPR). Finance data in Frankfurt must stay in Germany." },
    { num: "2", label: "Proximity", icon: "📍", color: "#1a73e8",
      example: "Most users in Singapore? Deploy to ap-southeast-1 for lowest latency." },
    { num: "3", label: "Features", icon: "🔬", color: "#FF9900",
      example: "New AI service only in us-east-1? You may need to deploy there first." },
    { num: "4", label: "Pricing", icon: "💰", color: "#0f9d58",
      example: "Same workload can cost 20-30% less in a different Region due to tax/energy." },
  ];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 8 }}>
      {factors.map(f => (
        <div key={f.num} style={{
          border: `1px solid ${f.color}30`, borderTop: `3px solid ${f.color}`,
          borderRadius: 8, padding: "12px", background: f.color + "08",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
            <div style={{
              width: 28, height: 28, borderRadius: "50%", background: f.color,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 12, fontWeight: 700, color: "white", flexShrink: 0,
            }}>{f.num}</div>
            <div style={{ fontWeight: 700, fontSize: 13, color: f.color }}>{f.icon} {f.label}</div>
          </div>
          <div style={{ fontSize: 12, color: "var(--color-text-secondary)", lineHeight: 1.55, fontStyle: "italic" }}>
            📌 {f.example}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── SVG: CloudFront CDN flow ─────────────────────────────────────────────────
function CloudFrontDiagram() {
  return (
    <svg width="100%" viewBox="0 0 540 130" style={{ display: "block", margin: "10px 0" }}>
      {/* User in Tokyo */}
      <circle cx={45} cy={55} r={16} fill="#E3F2FD" stroke="#1a73e8" strokeWidth="1" />
      <text x={45} y={51} textAnchor="middle" fontSize="14">👤</text>
      <text x={45} y={64} textAnchor="middle" fontSize="8" fontWeight="600" fill="#1a73e8">User</text>
      <text x={45} y={73} textAnchor="middle" fontSize="7.5" fill="var(--color-text-secondary)">Tokyo</text>

      {/* Edge Location */}
      <rect x={100} y={30} width={110} height={55} rx="10" fill="#0f9d5818" stroke="#0f9d58" strokeWidth="1.2" />
      <text x={155} y={52} textAnchor="middle" fontSize="14">🗼</text>
      <text x={155} y={66} textAnchor="middle" fontSize="9" fontWeight="700" fill="#0f9d58">Edge Location</text>
      <text x={155} y={77} textAnchor="middle" fontSize="8" fill="var(--color-text-secondary)">Tokyo (cache)</text>

      {/* Origin Server (S3 / EC2) */}
      <rect x={380} y={30} width={120} height={55} rx="10" fill="#FF990018" stroke={accent} strokeWidth="1.2" />
      <text x={440} y={52} textAnchor="middle" fontSize="14">🗄️</text>
      <text x={440} y={66} textAnchor="middle" fontSize="9" fontWeight="700" fill={accent}>Origin Server</text>
      <text x={440} y={77} textAnchor="middle" fontSize="8" fill="var(--color-text-secondary)">S3 / EC2 (us-east-1)</text>

      {/* Request: User → Edge */}
      <line x1={63} y1={52} x2={98} y2={52} stroke="#1a73e8" strokeWidth="1.3" />
      <polygon points="98,48 98,56 104,52" fill="#1a73e8" />
      <text x={80} y={44} textAnchor="middle" fontSize="7.5" fill="#1a73e8">Request</text>

      {/* Cache HIT path */}
      <line x1={212} y1={45} x2={260} y2={45} stroke="#0f9d58" strokeWidth="1.3" strokeDasharray="4 2" />
      <polygon points="98,60 98,68 62,64" fill="#0f9d58" />
      <line x1={98} y1={64} x2={62} y2={64} stroke="#0f9d58" strokeWidth="1.3" />
      <text x={80} y={74} textAnchor="middle" fontSize="7.5" fill="#0f9d58">Cache HIT ✓</text>
      <text x={80} y={83} textAnchor="middle" fontSize="7" fill="#0f9d58">~5ms</text>

      {/* Cache MISS path to origin */}
      <text x={240} y={38} textAnchor="middle" fontSize="8" fill="var(--color-text-secondary)">Cache MISS →</text>
      <line x1={212} y1={45} x2={378} y2={45} stroke="#d32f2f" strokeWidth="1" strokeDasharray="3 2" />
      <polygon points="378,41 378,49 384,45" fill="#d32f2f" />
      <text x={295} y={58} textAnchor="middle" fontSize="7.5" fill="#d32f2f">Fetches from origin</text>
      <text x={295} y={68} textAnchor="middle" fontSize="7" fill="#d32f2f">~150ms (once only)</text>
      <text x={295} y={78} textAnchor="middle" fontSize="7" fill="#0f9d58">Then cached for future users</text>

      {/* Labels at bottom */}
      <text x={270} y={110} textAnchor="middle" fontSize="9" fontWeight="700" fill="var(--color-text-primary)">Amazon CloudFront — Content Delivery Network (CDN)</text>
      <text x={270} y={122} textAnchor="middle" fontSize="8" fill="var(--color-text-secondary)">First request fetches from origin → Edge caches it → All future users in that region get it instantly</text>
    </svg>
  );
}

// ─── SVG: Multi-AZ / Multi-Region ────────────────────────────────────────────
function HADiagram() {
  return (
    <svg width="100%" viewBox="0 0 540 160" style={{ display: "block", margin: "10px 0" }}>
      {/* Region 1 */}
      <rect x={10} y={20} width={230} height={120} rx="10" fill="#1a73e808" stroke="#1a73e8" strokeWidth="1.2" strokeDasharray="5 3" />
      <text x={125} y={38} textAnchor="middle" fontSize="10" fontWeight="700" fill="#1a73e8">Region A (us-east-1) — PRIMARY</text>
      {/* AZ1 */}
      <rect x={22} y={44} width={90} height={80} rx="7" fill="#0f9d5815" stroke="#0f9d58" strokeWidth="1" strokeDasharray="3 2" />
      <text x={67} y={59} textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#0f9d58">AZ-1a</text>
      <rect x={32} y={63} width={65} height={22} rx="4" fill="#0f9d5830" />
      <text x={64} y={78} textAnchor="middle" fontSize="8" fill="#0f9d58">🖥️ App Server</text>
      <rect x={32} y={89} width={65} height={22} rx="4" fill="#0f9d5830" />
      <text x={64} y={104} textAnchor="middle" fontSize="8" fill="#0f9d58">🗄️ Database</text>
      {/* AZ2 */}
      <rect x={126} y={44} width={90} height={80} rx="7" fill="#FF990015" stroke={accent} strokeWidth="1" strokeDasharray="3 2" />
      <text x={171} y={59} textAnchor="middle" fontSize="8.5" fontWeight="700" fill={accent}>AZ-1b</text>
      <rect x={136} y={63} width={65} height={22} rx="4" fill="#FF990030" />
      <text x={168} y={78} textAnchor="middle" fontSize="8" fill={accentDark}>🖥️ App Server</text>
      <rect x={136} y={89} width={65} height={22} rx="4" fill="#FF990030" />
      <text x={168} y={104} textAnchor="middle" fontSize="8" fill={accentDark}>🗄️ DB Replica</text>

      {/* Sync arrow between AZs */}
      <line x1={114} y1={85} x2={134} y2={85} stroke="#546e7a" strokeWidth="1" />
      <text x={124} y={80} textAnchor="middle" fontSize="7" fill="#546e7a">sync</text>

      {/* Failover arrow between Regions */}
      <path d="M 242 80 C 268 60, 282 60, 298 80" fill="none" stroke="#d32f2f" strokeWidth="1.5" strokeDasharray="4 2" />
      <polygon points="298,76 298,84 304,80" fill="#d32f2f" />
      <text x={270} y={55} textAnchor="middle" fontSize="8" fontWeight="700" fill="#d32f2f">Failover</text>
      <text x={270} y={65} textAnchor="middle" fontSize="7.5" fill="#d32f2f">if Region A fails</text>

      {/* Region 2 */}
      <rect x={300} y={20} width={230} height={120} rx="10" fill="#6a1b9a08" stroke="#6a1b9a" strokeWidth="1.2" strokeDasharray="5 3" />
      <text x={415} y={38} textAnchor="middle" fontSize="10" fontWeight="700" fill="#6a1b9a">Region B (us-west-2) — BACKUP</text>
      {/* AZ3 */}
      <rect x={312} y={44} width={90} height={80} rx="7" fill="#6a1b9a15" stroke="#6a1b9a" strokeWidth="1" strokeDasharray="3 2" />
      <text x={357} y={59} textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#6a1b9a">AZ-2a</text>
      <rect x={322} y={63} width={65} height={22} rx="4" fill="#6a1b9a25" />
      <text x={354} y={78} textAnchor="middle" fontSize="8" fill="#6a1b9a">🖥️ App Server</text>
      <rect x={322} y={89} width={65} height={22} rx="4" fill="#6a1b9a25" />
      <text x={354} y={104} textAnchor="middle" fontSize="8" fill="#6a1b9a">🗄️ Database</text>
      {/* AZ4 */}
      <rect x={416} y={44} width={90} height={80} rx="7" fill="#d32f2f15" stroke="#d32f2f" strokeWidth="1" strokeDasharray="3 2" />
      <text x={461} y={59} textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#d32f2f">AZ-2b</text>
      <rect x={426} y={63} width={65} height={22} rx="4" fill="#d32f2f20" />
      <text x={458} y={78} textAnchor="middle" fontSize="8" fill="#d32f2f">🖥️ App Server</text>
      <rect x={426} y={89} width={65} height={22} rx="4" fill="#d32f2f20" />
      <text x={458} y={104} textAnchor="middle" fontSize="8" fill="#d32f2f">🗄️ DB Replica</text>

      <text x={270} y={150} textAnchor="middle" fontSize="8.5" fontWeight="700" fill="var(--color-text-primary)">
        Multi-AZ = High Availability · Multi-Region = Disaster Recovery
      </text>
    </svg>
  );
}

// ─── SVG: CloudFormation IaC ──────────────────────────────────────────────────
function CloudFormationDiagram() {
  return (
    <svg width="100%" viewBox="0 0 540 130" style={{ display: "block", margin: "10px 0" }}>
      {/* Template file */}
      <rect x={10} y={25} width={100} height={85} rx="8" fill="#E3F2FD" stroke="#1a73e8" strokeWidth="1.2" />
      <text x={60} y={50} textAnchor="middle" fontSize="20">📄</text>
      <text x={60} y={67} textAnchor="middle" fontSize="9" fontWeight="700" fill="#1a73e8">template.yaml</text>
      <text x={60} y={79} textAnchor="middle" fontSize="7.5" fill="var(--color-text-secondary)">EC2: t2.micro</text>
      <text x={60} y={89} textAnchor="middle" fontSize="7.5" fill="var(--color-text-secondary)">S3: my-bucket</text>
      <text x={60} y={99} textAnchor="middle" fontSize="7.5" fill="var(--color-text-secondary)">RDS: db.t3</text>

      {/* Arrow to CloudFormation */}
      <line x1={112} y1={68} x2={155} y2={68} stroke="#1a73e8" strokeWidth="1.3" />
      <polygon points="155,64 155,72 161,68" fill="#1a73e8" />

      {/* CloudFormation engine */}
      <rect x={163} y={35} width={110} height={65} rx="10" fill="#FF990020" stroke={accent} strokeWidth="1.5" />
      <text x={218} y={62} textAnchor="middle" fontSize="16">⚙️</text>
      <text x={218} y={78} textAnchor="middle" fontSize="9" fontWeight="700" fill={accent}>CloudFormation</text>
      <text x={218} y={89} textAnchor="middle" fontSize="7.5" fill="var(--color-text-secondary)">Calls AWS APIs</text>

      {/* Arrow to resources */}
      <line x1={275} y1={68} x2={315} y2={68} stroke={accent} strokeWidth="1.3" />
      <polygon points="315,64 315,72 321,68" fill={accent} />

      {/* Resources created */}
      {[
        { y: 28, icon: "🖥️", label: "EC2 Instance", color: "#1a73e8" },
        { y: 68, icon: "🗄️", label: "S3 Bucket", color: "#0f9d58" },
        { y: 108, icon: "💾", label: "RDS Database", color: "#6a1b9a" },
      ].map(({ y, icon, label, color }) => (
        <g key={label}>
          <rect x={323} y={y - 10} width={95} height={28} rx="6" fill={color + "18"} stroke={color} strokeWidth="0.8" />
          <text x={370} y={y + 5} textAnchor="middle" fontSize="9" fontWeight="700" fill={color}>{icon} {label}</text>
          <line x1={315} y1={68} x2={321} y2={y + 4} stroke={color} strokeWidth="0.7" strokeDasharray="2 2" />
        </g>
      ))}

      {/* Multi-region arrow */}
      <text x={445} y={45} textAnchor="middle" fontSize="8.5" fontWeight="700" fill="var(--color-text-primary)">Same template →</text>
      <text x={445} y={57} textAnchor="middle" fontSize="8.5" fontWeight="700" fill="var(--color-text-primary)">Deploy to any</text>
      <text x={445} y={69} textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#0f9d58">Region A ✓</text>
      <text x={445} y={81} textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#FF9900">Region B ✓</text>
      <text x={445} y={93} textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#6a1b9a">Region C ✓</text>
      <text x={445} y={108} textAnchor="middle" fontSize="7.5" fill="var(--color-text-secondary)">Identical every time</text>
      <text x={270} y={125} textAnchor="middle" fontSize="8.5" fontWeight="700" fill="var(--color-text-primary)">AWS CloudFormation — Infrastructure as Code (IaC)</text>
    </svg>
  );
}

// ─── Sections ─────────────────────────────────────────────────────────────────
const sections = [
  { id: "going-global", emoji: "🌍", title: "Going Global", badge: "AWS Expansion", badgeColor: "#1a73e8" },
  { id: "region-selection", emoji: "📍", title: "Choosing a Region", badge: "4 Key Factors", badgeColor: "#d32f2f" },
  { id: "ha-architecture", emoji: "🏗️", title: "High Availability", badge: "Multi-AZ & Multi-Region", badgeColor: "#0f9d58" },
  { id: "edge-cloudfront", emoji: "⚡", title: "Edge Locations & CloudFront", badge: "CDN", badgeColor: "#FF9900" },
  { id: "cloudformation", emoji: "📋", title: "CloudFormation & IaC", badge: "Infrastructure as Code", badgeColor: "#6a1b9a" },
  { id: "cloud-models", emoji: "🏛️", title: "IaaS, PaaS & SaaS", badge: "Cloud Service Models", badgeColor: "#00838f" },
  { id: "interacting", emoji: "🛠️", title: "Interacting with AWS", badge: "Console · CLI · SDK · IaC", badgeColor: "#546e7a" },
];

function SectionContent({ id }) {
  switch (id) {

    case "going-global": return (
      <div>
        <Body>
          AWS operates a truly global infrastructure — letting you deploy your application close to customers
          anywhere in the world in minutes. Understanding how this infrastructure is organized is fundamental
          to designing reliable, fast, and compliant cloud architectures.
        </Body>
        <H2>AWS Global Infrastructure — The Big Picture</H2>
        <GlobalInfraDiagram />
        <KV rows={[
          ["Regions", "30+ geographic areas worldwide. Each is completely independent. Your data never leaves a Region without your permission.", "#1a73e8"],
          ["Availability Zones", "3+ isolated data center clusters per Region, connected by low-latency fiber. Physical separation ensures one failure doesn't affect another.", "#0f9d58"],
          ["Edge Locations", "400+ globally. Cache content close to users. Used by CloudFront CDN, Route 53, Global Accelerator.", "#FF9900"],
        ]} />
        <Analogy icon="☕" label="Coffee Shop Expansion Analogy"
          text="Opening new coffee shop locations in different cities = deploying to AWS Regions. Setting up small coffee carts at airports and markets = AWS Edge Locations. Standardising all recipes with the same training manual = Infrastructure as Code (CloudFormation)."
          color="#0f9d58" />
        <Callout icon="🎯" label="Exam Tip"
          text="Know the 3-layer hierarchy: Regions → Availability Zones → Data Centers. Edge Locations are SEPARATE from Regions — they are CDN delivery points, not compute regions." color={accent} />
      </div>
    );

    case "region-selection": return (
      <div>
        <Body>
          Choosing the right AWS Region (or Regions) is one of the most important architectural decisions.
          AWS has 4 key factors to evaluate — and you must consider them in order of priority.
        </Body>
        <H2>The 4 Factors — In Priority Order</H2>
        <RegionFactorsDiagram />
        <H2>Deep Dive — Each Factor</H2>
        <KV rows={[
          ["① Compliance (First)", "<b>Always check this first.</b> If regulations require data to stay in a specific country, you MUST use that Region regardless of cost or features. Examples: GDPR (EU), financial data in Germany must stay in Frankfurt, healthcare data under HIPAA in the US.", "#d32f2f"],
          ["② Proximity (Second)", "Deploy close to your customers to minimise latency. If most users are in Sydney, use ap-southeast-2. Latency from us-east-1 to Sydney = ~200ms. Latency within ap-southeast-2 = &lt;10ms. Big difference for real-time apps.", "#1a73e8"],
          ["③ Feature Availability (Third)", "Not all Regions have all services. New AWS features roll out to us-east-1 first, then expand globally. Check the AWS Regional Services table before committing to a Region.", "#FF9900"],
          ["④ Pricing (Fourth)", "Identical services can cost 20-30% more/less between Regions due to local taxes, energy costs, and data transfer fees. If compliance and latency are flexible, optimise for cost.", "#0f9d58"],
        ]} c1="22%" />
        <H2>Real-World Scenario</H2>
        <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 4 }}>
          {[
            { scenario: "🏦 German bank app", decision: "Must use eu-central-1 (Frankfurt) — GDPR + financial regulation requires data in Germany. No other factors matter.", color: "#d32f2f" },
            { scenario: "🛒 US startup, all users in Tokyo", decision: "No compliance rules → check proximity → deploy to ap-northeast-1 (Tokyo) for lowest latency.", color: "#1a73e8" },
            { scenario: "🎮 Gaming company, cost-sensitive", decision: "No compliance, global user base → compare pricing across us-east-1 vs us-west-2 → choose cheaper one.", color: "#0f9d58" },
          ].map(({ scenario, decision, color }) => (
            <div key={scenario} style={{ border: `1px solid ${color}30`, borderLeft: `3px solid ${color}`, borderRadius: 8, padding: "10px 12px" }}>
              <div style={{ fontWeight: 700, fontSize: 12, color, marginBottom: 4 }}>{scenario}</div>
              <div style={{ fontSize: 12.5, color: "var(--color-text-secondary)", lineHeight: 1.55 }}>{decision}</div>
            </div>
          ))}
        </div>
        <Callout icon="🎯" label="Exam Tip"
          text="The 4 factors in order: Compliance → Proximity → Features → Pricing. Compliance ALWAYS comes first — if data sovereignty is required, that Region is mandatory regardless of everything else." color={accent} />
      </div>
    );

    case "ha-architecture": return (
      <div>
        <Body>
          A single server or single location is a <b>Single Point of Failure (SPOF)</b>. High-availability
          architectures are designed so that when one component fails, another takes over automatically —
          with zero or near-zero downtime for users.
        </Body>
        <H2>Multi-AZ + Multi-Region Architecture</H2>
        <HADiagram />
        <H2>Three Key Concepts</H2>
        <KV rows={[
          ["High Availability", "System operates continuously without significant downtime. Achieved by running in multiple AZs. If one AZ fails, traffic shifts to another automatically. Users don't notice.", "#1a73e8"],
          ["Fault Tolerance", "System keeps running even if multiple components fail simultaneously. Built-in redundancy at every layer. Goes beyond HA.", "#0f9d58"],
          ["Agility", "Quickly adapt to changing requirements. AWS lets you provision or change infrastructure in minutes, not months.", "#FF9900"],
          ["Elasticity", "Scale resources up or down automatically based on demand. Pay only for what you use at any given moment.", "#6a1b9a"],
        ]} />
        <H2>Multi-AZ vs Multi-Region</H2>
        <div style={{ borderRadius: 8, overflow: "hidden", border: "1px solid var(--color-border-tertiary)", marginTop: 8 }}>
          {[
            ["", "Multi-AZ", "Multi-Region"],
            ["Purpose", "High Availability", "Disaster Recovery"],
            ["Protects against", "Data center / AZ failure", "Entire Region outage"],
            ["Failover speed", "Automatic, seconds", "Minutes (requires config)"],
            ["Cost", "Lower", "Higher"],
            ["Common use case", "Production databases, web apps", "Global apps, business continuity"],
          ].map((row, i) => (
            <div key={i} style={{
              display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
              borderBottom: i < 5 ? "1px solid var(--color-border-tertiary)" : "none",
              background: i === 0 ? "#263238" : i % 2 === 0 ? "var(--color-background-secondary)" : "var(--color-background-primary)",
            }}>
              {row.map((cell, j) => (
                <div key={j} style={{
                  padding: "7px 10px", fontSize: i === 0 ? 11 : 12.5,
                  fontWeight: i === 0 || j === 0 ? 700 : 400,
                  color: i === 0 ? accent : j === 0 ? "var(--color-text-primary)" : "var(--color-text-secondary)",
                  borderRight: j < 2 ? "1px solid var(--color-border-tertiary)" : "none",
                }}>{cell}</div>
              ))}
            </div>
          ))}
        </div>
        <Callout icon="🎯" label="Exam Tip"
          text="Multi-AZ = High Availability (within one Region). Multi-Region = Disaster Recovery (across Regions). Best practice: always deploy across at least 2 AZs. For critical apps: deploy across 2+ Regions with Route 53 failover routing." color={accent} />
      </div>
    );

    case "edge-cloudfront": return (
      <div>
        <Body>
          Edge Locations bring content physically closer to users around the world.
          Instead of every request travelling to your origin server (potentially on another continent),
          cached content is served from the nearest Edge Location — delivering dramatically lower latency.
        </Body>
        <Analogy icon="☕" label="Coffee Cart Analogy"
          text="Instead of every customer driving to your main coffee shop (origin server), you place coffee carts at busy airports and markets (Edge Locations). The cart serves the most popular items (cached content) immediately. Only when someone orders something unusual does the cart fetch it from the main shop — and then caches it for the next person."
          color="#FF9900" />
        <H2>How CloudFront Works</H2>
        <CloudFrontDiagram />
        <H2>Amazon CloudFront</H2>
        <KV rows={[
          ["What it is", "AWS's Content Delivery Network (CDN). Distributes content globally via 400+ Edge Locations.", "#1a73e8"],
          ["What it caches", "Static files (images, CSS, JS), videos, API responses, HTML pages, software downloads.", "#0f9d58"],
          ["Cache HIT", "User requests content already cached at nearest Edge Location → served in &lt;10ms.", "#0f9d58"],
          ["Cache MISS", "Content not cached → CloudFront fetches from origin → caches it → serves future users instantly.", "#FF9900"],
          ["Origin servers", "S3 buckets, EC2 instances, ELB, API Gateway, or any HTTP server.", "#6a1b9a"],
          ["Security", "Integrates with AWS Shield (DDoS), WAF (web firewall), and ACM (SSL certificates).", "#d32f2f"],
        ]} />
        <H2>Other Edge Services</H2>
        <KV rows={[
          ["Amazon Route 53", "DNS service. Converts domain names (example.com) to IP addresses. Supports health checks and failover routing. Lives at Edge Locations globally.", "#1a73e8"],
          ["AWS Global Accelerator", "Routes user traffic through AWS private network instead of public internet. Reduces latency by 60%+ for global apps.", "#0f9d58"],
          ["AWS Outposts", "AWS infrastructure in YOUR data center. For when even CloudFront isn't fast enough — ultra-low latency on-premises.", "#FF9900"],
        ]} />
        <Callout icon="🎯" label="Exam Tip"
          text="CloudFront = CDN, uses Edge Locations, caches content globally. Route 53 = DNS, also at Edge Locations. Edge Locations are NOT the same as Regions or AZs — they are separate CDN delivery points. There are far more Edge Locations (400+) than Regions (30+)." color={accent} />
      </div>
    );

    case "cloudformation": return (
      <div>
        <Body>
          What if you need to create 50 EC2 instances, 10 S3 buckets, 3 load balancers, and 2 databases
          across 3 Regions — consistently, repeatably, without human error? That's what Infrastructure as Code solves.
        </Body>
        <H2>The Problem Without IaC</H2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 6 }}>
          <div style={{ border: "1px solid #d32f2f30", borderRadius: 8, padding: "10px 12px", background: "#d32f2f08" }}>
            <div style={{ fontWeight: 700, fontSize: 12, color: "#d32f2f", marginBottom: 6 }}>❌ Manual Setup</div>
            {["Slow — click through console 100s of times", "Error-prone — miss a checkbox, wrong config", "Not repeatable — can't guarantee identical setups", "Hard to track changes — who changed what?", "Region B setup takes as long as Region A"].map((p, i) => (
              <div key={i} style={{ fontSize: 12, color: "var(--color-text-secondary)", marginBottom: 3 }}>• {p}</div>
            ))}
          </div>
          <div style={{ border: "1px solid #0f9d5830", borderRadius: 8, padding: "10px 12px", background: "#0f9d5808" }}>
            <div style={{ fontWeight: 700, fontSize: 12, color: "#0f9d58", marginBottom: 6 }}>✅ Infrastructure as Code</div>
            {["Fast — one command deploys everything", "Consistent — same result every time", "Repeatable — deploy identical setup in any Region", "Version controlled — track all changes in Git", "Self-documenting — template IS the documentation"].map((p, i) => (
              <div key={i} style={{ fontSize: 12, color: "var(--color-text-secondary)", marginBottom: 3 }}>• {p}</div>
            ))}
          </div>
        </div>
        <H2>AWS CloudFormation — How It Works</H2>
        <CloudFormationDiagram />
        <KV rows={[
          ["What it is", "AWS-native IaC service. Define infrastructure in JSON or YAML templates. CloudFormation creates, updates, and deletes resources automatically.", "#6a1b9a"],
          ["Templates", "Text files (YAML/JSON) that describe all your AWS resources and their configurations. Store in Git for version control.", "#1a73e8"],
          ["Stacks", "A CloudFormation Stack is a collection of AWS resources created from one template. Update the template → CloudFormation updates only what changed.", "#0f9d58"],
          ["Declarative", "You say WHAT you want (an EC2 t2.micro), not HOW to create it. CloudFormation figures out the order and API calls.", "#FF9900"],
          ["Idempotent", "Run the same template 100 times → same result. No duplicate resources. Safe to re-run.", "#d32f2f"],
          ["Multi-Region deploy", "Deploy the same template to us-east-1 and eu-west-1 → identical environments created. Perfect for DR.", "#546e7a"],
        ]} />
        <H2>Real-World Example</H2>
        <div style={{ background: "#1e1e1e", borderRadius: 8, padding: "12px 14px", marginTop: 8, fontFamily: "monospace" }}>
          <div style={{ fontSize: 10, color: "#888", marginBottom: 6 }}>template.yaml — Creates a web server stack</div>
          <div style={{ fontSize: 11.5, color: "#4EC9B0" }}>Resources:</div>
          <div style={{ fontSize: 11.5, color: "#9CDCFE", marginLeft: 12 }}>MyWebServer:</div>
          <div style={{ fontSize: 11.5, color: "#CE9178", marginLeft: 24 }}>Type: AWS::EC2::Instance</div>
          <div style={{ fontSize: 11.5, color: "#9CDCFE", marginLeft: 24 }}>Properties:</div>
          <div style={{ fontSize: 11.5, color: "#CE9178", marginLeft: 36 }}>InstanceType: t2.micro</div>
          <div style={{ fontSize: 11.5, color: "#CE9178", marginLeft: 36 }}>ImageId: ami-0abcdef1234567890</div>
          <div style={{ fontSize: 11, color: "#6A9955", marginTop: 6 }}># One command → CloudFormation creates everything</div>
          <div style={{ fontSize: 11.5, color: "#DCDCAA" }}>aws cloudformation create-stack \</div>
          <div style={{ fontSize: 11.5, color: "#DCDCAA", marginLeft: 12 }}>--stack-name my-web-stack \</div>
          <div style={{ fontSize: 11.5, color: "#DCDCAA", marginLeft: 12 }}>--template-body file://template.yaml</div>
        </div>
        <Callout icon="🎯" label="Exam Tip"
          text="CloudFormation = IaC service, uses templates (YAML/JSON), creates Stacks. Key benefits: consistency, repeatability, less human error, version control. Same template → identical environments across any Region or account." color={accent} />
      </div>
    );

    case "interacting": return (
      <div>
        <Body>
          Every action in AWS — whether you click a button in the Console or run a CLI command —
          ultimately calls an AWS API. There are 4 main ways to interact with these APIs.
        </Body>
        <H2>4 Ways to Interact with AWS</H2>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 6 }}>
          {[
            { name: "AWS Management Console", icon: "🖥️", color: "#1a73e8",
              what: "Browser-based GUI. Visual, point-and-click. Best for beginners and visual exploration.",
              useCases: ["Learning and exploring services", "Billing and cost visualisation", "One-time setups and demos", "Services with rich visual dashboards (QuickSight, Neptune)"],
              limitation: "Not suitable for automation. Human error-prone at scale." },
            { name: "AWS CLI", icon: "💻", color: "#0f9d58",
              what: "Terminal commands to call AWS APIs. Scriptable and automatable.",
              useCases: ["Automation via shell scripts", "CI/CD pipelines", "Bulk operations", "AWS CloudShell (browser terminal, no install needed)"],
              limitation: "Requires learning CLI syntax. Stateless — no drift detection." },
            { name: "AWS SDKs", icon: "🔧", color: "#FF9900",
              what: "Language libraries (Python boto3, Java SDK, etc.) to call AWS APIs from application code.",
              useCases: ["Application code that manages AWS resources", "Lambda functions calling other AWS services", "Custom automation tools"],
              limitation: "Requires programming knowledge. More setup than CLI." },
            { name: "Infrastructure as Code (CloudFormation)", icon: "📋", color: "#6a1b9a",
              what: "Define infrastructure in YAML/JSON templates. CloudFormation calls APIs to build everything.",
              useCases: ["Production infrastructure management", "Multi-Region deployments", "DevOps CI/CD pipelines", "Disaster recovery automation"],
              limitation: "Learning curve for template syntax. Slower feedback loop than CLI." },
          ].map(({ name, icon, color, what, useCases, limitation }) => (
            <div key={name} style={{ border: `1px solid ${color}30`, borderRadius: 10, overflow: "hidden" }}>
              <div style={{ background: color, padding: "9px 14px", display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 18 }}>{icon}</span>
                <span style={{ fontWeight: 700, fontSize: 13, color: "white" }}>{name}</span>
              </div>
              <div style={{ padding: "10px 14px", background: "var(--color-background-primary)" }}>
                <div style={{ fontSize: 13, color: "var(--color-text-secondary)", marginBottom: 8 }}>{what}</div>
                <div style={{ fontWeight: 700, fontSize: 11, color, marginBottom: 4 }}>✅ Best for:</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 8 }}>
                  {useCases.map(u => (
                    <span key={u} style={{ fontSize: 11, background: color + "18", color, border: `1px solid ${color}30`, borderRadius: 12, padding: "2px 8px" }}>{u}</span>
                  ))}
                </div>
                <div style={{ fontSize: 11.5, color: "#d32f2f", fontStyle: "italic" }}>⚠️ {limitation}</div>
              </div>
            </div>
          ))}
        </div>
        <Callout icon="🎯" label="Exam Tip"
          text="All 4 methods call the same AWS APIs underneath. Console = GUI. CLI = terminal. SDK = code. CloudFormation = declarative templates. For production at scale, prefer CLI/SDK/CloudFormation over manual Console clicks — automation = consistency." color={accent} />
      </div>
    );

    case "cloud-models": return (
      <div>
        <Body>
          Cloud computing comes in three service models — <b>IaaS, PaaS, and SaaS</b>. Each one shifts a different amount of responsibility from you to the cloud provider. Think of it as a spectrum: the higher you go, the less infrastructure you manage.
        </Body>

        {/* Pizza analogy visual */}
        <H2>The Pizza Analogy 🍕</H2>
        <div style={{ background: "#FFF8E1", border: "1px solid #FFE082", borderRadius: 10, padding: "12px 14px", marginTop: 8 }}>
          <div style={{ fontSize: 12.5, color: "#5D4037", lineHeight: 1.7 }}>
            Imagine you want pizza tonight. You have 4 options:
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 8, marginTop: 10 }}>
            {[
              { title: "Make at Home", icon: "🏠", sub: "On-Premises", desc: "You buy ingredients, make dough, cook everything yourself. Full control, full effort.", color: "#e65100" },
              { title: "Meal Kit", icon: "📦", sub: "IaaS", desc: "Ingredients delivered, pre-measured. You still cook it. Less shopping, still cooking.", color: "#1565c0" },
              { title: "Takeout", icon: "🛵", sub: "PaaS", desc: "Pizza made for you. You just choose toppings and pick it up. No cooking.", color: "#2e7d32" },
              { title: "Restaurant", icon: "🍽️", sub: "SaaS", desc: "Sit down, order, eat. Someone else does everything — cooking, cleaning, service.", color: "#6a1b9a" },
            ].map(({ title, icon, sub, desc, color }) => (
              <div key={title} style={{ border: `1px solid ${color}30`, borderTop: `3px solid ${color}`, borderRadius: 8, padding: "10px 8px", textAlign: "center", background: color + "08" }}>
                <div style={{ fontSize: 24, marginBottom: 4 }}>{icon}</div>
                <div style={{ fontWeight: 700, fontSize: 11, color, marginBottom: 2 }}>{title}</div>
                <div style={{ fontSize: 10, fontWeight: 700, color: "#888", marginBottom: 5 }}>= {sub}</div>
                <div style={{ fontSize: 10.5, color: "#666", lineHeight: 1.5 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Full model breakdown */}
        <H2>The Three Cloud Service Models</H2>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 6 }}>

          {/* IaaS */}
          <div style={{ border: "1px solid #1565c030", borderRadius: 10, overflow: "hidden" }}>
            <div style={{ background: "#1565c0", padding: "10px 14px", display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 22 }}>🏗️</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, color: "white" }}>IaaS — Infrastructure as a Service</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.75)" }}>You manage: OS, runtime, apps, data. AWS manages: servers, storage, networking hardware.</div>
              </div>
            </div>
            <div style={{ padding: "12px 14px", background: "white" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 11, color: "#1565c0", marginBottom: 5 }}>✅ You control</div>
                  {["Operating system", "Runtime environment", "Middleware", "Your applications", "Your data"].map(i => (
                    <div key={i} style={{ fontSize: 12, color: "#333", marginBottom: 3 }}>• {i}</div>
                  ))}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 11, color: "#888", marginBottom: 5 }}>☁️ AWS manages</div>
                  {["Physical servers", "Storage hardware", "Networking", "Data centers", "Virtualization"].map(i => (
                    <div key={i} style={{ fontSize: 12, color: "#666", marginBottom: 3 }}>• {i}</div>
                  ))}
                </div>
              </div>
              <div style={{ background: "#E3F2FD", borderRadius: 7, padding: "8px 12px" }}>
                <div style={{ fontWeight: 700, fontSize: 11, color: "#1565c0", marginBottom: 4 }}>🌍 Real-World AWS Examples</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                  {[
                    { s: "Amazon EC2", d: "Virtual servers — you manage OS, patches, apps" },
                    { s: "Amazon EBS", d: "Block storage — raw disks you format and manage" },
                    { s: "Amazon VPC", d: "Virtual network — you configure subnets, routing" },
                  ].map(({ s, d }) => (
                    <div key={s} style={{ background: "#1565c018", border: "1px solid #1565c030", borderRadius: 6, padding: "4px 10px" }}>
                      <div style={{ fontWeight: 700, fontSize: 11, color: "#1565c0" }}>{s}</div>
                      <div style={{ fontSize: 10.5, color: "#555" }}>{d}</div>
                    </div>
                  ))}
                </div>
                <div style={{ fontSize: 11.5, color: "#555", marginTop: 8, fontStyle: "italic" }}>
                  💼 <b>Business scenario:</b> A startup launches EC2 instances to run their custom Java application. They install the JDK, configure the web server, and manage their own OS patches. AWS provides the virtual hardware; the team manages everything above it.
                </div>
              </div>
            </div>
          </div>

          {/* PaaS */}
          <div style={{ border: "1px solid #2e7d3230", borderRadius: 10, overflow: "hidden" }}>
            <div style={{ background: "#2e7d32", padding: "10px 14px", display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 22 }}>🚀</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, color: "white" }}>PaaS — Platform as a Service</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.75)" }}>You manage: your application code and data only. AWS manages: OS, runtime, scaling, infrastructure.</div>
              </div>
            </div>
            <div style={{ padding: "12px 14px", background: "white" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 11, color: "#2e7d32", marginBottom: 5 }}>✅ You control</div>
                  {["Your application code", "Your data", "Some configuration"].map(i => (
                    <div key={i} style={{ fontSize: 12, color: "#333", marginBottom: 3 }}>• {i}</div>
                  ))}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 11, color: "#888", marginBottom: 5 }}>☁️ AWS manages</div>
                  {["OS & patches", "Runtime environment", "Scaling & load balancing", "Servers & storage", "Networking"].map(i => (
                    <div key={i} style={{ fontSize: 12, color: "#666", marginBottom: 3 }}>• {i}</div>
                  ))}
                </div>
              </div>
              <div style={{ background: "#E8F5E9", borderRadius: 7, padding: "8px 12px" }}>
                <div style={{ fontWeight: 700, fontSize: 11, color: "#2e7d32", marginBottom: 4 }}>🌍 Real-World AWS Examples</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                  {[
                    { s: "Elastic Beanstalk", d: "Upload code → AWS handles EC2, LB, Auto Scaling" },
                    { s: "AWS Lambda", d: "Write function → AWS handles servers, scaling, runtime" },
                    { s: "Amazon RDS", d: "Use a database → AWS handles OS, patches, backups" },
                  ].map(({ s, d }) => (
                    <div key={s} style={{ background: "#2e7d3218", border: "1px solid #2e7d3230", borderRadius: 6, padding: "4px 10px" }}>
                      <div style={{ fontWeight: 700, fontSize: 11, color: "#2e7d32" }}>{s}</div>
                      <div style={{ fontSize: 10.5, color: "#555" }}>{d}</div>
                    </div>
                  ))}
                </div>
                <div style={{ fontSize: 11.5, color: "#555", marginTop: 8, fontStyle: "italic" }}>
                  💼 <b>Business scenario:</b> A developer deploys a Python web app using Elastic Beanstalk. They just zip their code and upload it. Beanstalk automatically provisions EC2, configures the load balancer, sets up Auto Scaling, and keeps the runtime updated. The developer focuses purely on writing features.
                </div>
              </div>
            </div>
          </div>

          {/* SaaS */}
          <div style={{ border: "1px solid #6a1b9a30", borderRadius: 10, overflow: "hidden" }}>
            <div style={{ background: "#6a1b9a", padding: "10px 14px", display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 22 }}>💻</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, color: "white" }}>SaaS — Software as a Service</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.75)" }}>You manage: your data and usage only. The provider manages absolutely everything else.</div>
              </div>
            </div>
            <div style={{ padding: "12px 14px", background: "white" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 11, color: "#6a1b9a", marginBottom: 5 }}>✅ You control</div>
                  {["Your data & content", "User settings", "Who has access"].map(i => (
                    <div key={i} style={{ fontSize: 12, color: "#333", marginBottom: 3 }}>• {i}</div>
                  ))}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 11, color: "#888", marginBottom: 5 }}>☁️ Provider manages</div>
                  {["Application code", "Servers & storage", "OS & runtime", "Scaling & uptime", "Security patches"].map(i => (
                    <div key={i} style={{ fontSize: 12, color: "#666", marginBottom: 3 }}>• {i}</div>
                  ))}
                </div>
              </div>
              <div style={{ background: "#EDE7F6", borderRadius: 7, padding: "8px 12px" }}>
                <div style={{ fontWeight: 700, fontSize: 11, color: "#6a1b9a", marginBottom: 4 }}>🌍 Real-World Examples</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                  {[
                    { s: "Gmail / Outlook 365", d: "Use email — no servers to manage" },
                    { s: "Salesforce CRM", d: "Use CRM software — no infrastructure" },
                    { s: "Dropbox / Google Drive", d: "Store files — no storage to manage" },
                    { s: "Zoom / Slack", d: "Communicate — no servers to run" },
                    { s: "AWS WorkMail", d: "AWS's own managed email service" },
                  ].map(({ s, d }) => (
                    <div key={s} style={{ background: "#6a1b9a18", border: "1px solid #6a1b9a30", borderRadius: 6, padding: "4px 10px" }}>
                      <div style={{ fontWeight: 700, fontSize: 11, color: "#6a1b9a" }}>{s}</div>
                      <div style={{ fontSize: 10.5, color: "#555" }}>{d}</div>
                    </div>
                  ))}
                </div>
                <div style={{ fontSize: 11.5, color: "#555", marginTop: 8, fontStyle: "italic" }}>
                  💼 <b>Business scenario:</b> A company uses Gmail for email, Salesforce for CRM, and Zoom for meetings. They never think about servers, patches, or scaling — just open a browser and use the software. That's SaaS.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Comparison table */}
        <H2>Side-by-Side Comparison</H2>
        <div style={{ borderRadius: 8, overflow: "hidden", border: "1px solid #e0e0e0", marginTop: 8 }}>
          {[
            ["", "IaaS", "PaaS", "SaaS"],
            ["You manage", "OS + runtime + app + data", "App code + data only", "Data & settings only"],
            ["AWS manages", "Hardware only", "Hardware + OS + runtime", "Everything"],
            ["Flexibility", "Maximum ↑↑↑", "Medium ↑↑", "Minimal ↑"],
            ["Effort required", "High", "Medium", "Low"],
            ["AWS examples", "EC2, EBS, VPC", "Beanstalk, Lambda, RDS", "WorkMail, Chime"],
            ["Real-world examples", "Running custom servers", "Deploying a web app", "Gmail, Salesforce, Zoom"],
            ["Best for", "Full control, custom workloads", "Developers focusing on code", "End users, productivity apps"],
          ].map((row, i) => (
            <div key={i} style={{
              display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr",
              borderBottom: i < 7 ? "1px solid #f0f0f0" : "none",
              background: i === 0 ? "#263238" : i % 2 === 0 ? "#fafafa" : "white",
            }}>
              {row.map((cell, j) => (
                <div key={j} style={{
                  padding: "7px 10px", fontSize: i === 0 ? 11 : 12,
                  fontWeight: i === 0 || j === 0 ? 700 : 400,
                  color: i === 0 ? ["#FF9900","#5BA3F5","#81C784","#CE93D8"][j] || "#FF9900"
                       : j === 0 ? "#333"
                       : j === 1 ? "#1565c0"
                       : j === 2 ? "#2e7d32"
                       : "#6a1b9a",
                  borderRight: j < 3 ? "1px solid #f0f0f0" : "none",
                  lineHeight: 1.45,
                }}>{cell}</div>
              ))}
            </div>
          ))}
        </div>

        <Callout icon="🎯" label="Exam Tip"
          text="IaaS = you manage OS + runtime + app (EC2). PaaS = you manage code only, AWS manages everything below (Elastic Beanstalk, Lambda). SaaS = you just use the software, provider manages everything (Gmail, Salesforce). The key difference: how much YOU manage vs how much the PROVIDER manages." color="#00838f" />
      </div>
    );

    default: return null;
  }
}

// ─── Cheat Sheet ──────────────────────────────────────────────────────────────
const cheatRows = [
  ["Region", "Geographic cluster of AZs. 30+ worldwide. Isolated — data never leaves without permission."],
  ["AZ", "Isolated data centers within a Region. 3+ per Region. Connected by private fiber."],
  ["Edge Location", "400+ CDN delivery points. Separate from Regions. Used by CloudFront, Route 53."],
  ["4 Region factors", "① Compliance ② Proximity ③ Features ④ Pricing — in that priority order"],
  ["Compliance", "MUST check first. Data sovereignty laws can mandate specific Regions (GDPR = EU)."],
  ["Multi-AZ", "High Availability. Survives AZ failure. Automatic failover. Best practice for all production."],
  ["Multi-Region", "Disaster Recovery. Survives entire Region failure. Higher cost, more complex."],
  ["High Availability", "System stays up despite component failures. Multiple AZs = HA."],
  ["Fault Tolerance", "Keeps running even with multiple simultaneous failures. More robust than HA."],
  ["Agility", "Quickly adapt resources to changing needs. AWS provisions in minutes."],
  ["Elasticity", "Auto-scale up/down with demand. Pay only for what you use."],
  ["CloudFront", "CDN — caches content at Edge Locations globally. Low latency for static/dynamic content."],
  ["Cache HIT", "Content already at Edge Location → served instantly (~5ms)."],
  ["Cache MISS", "Edge fetches from origin → caches → serves future requests from cache."],
  ["Route 53", "AWS DNS service. Converts domain names to IPs. Runs at Edge Locations. Supports failover routing."],
  ["CloudFormation", "IaC service. YAML/JSON templates → creates AWS infrastructure automatically."],
  ["Stack", "Collection of AWS resources created from one CloudFormation template."],
  ["IaC benefits", "Consistent, repeatable, version-controlled, automated, less human error."],
  ["Console/CLI/SDK/IaC", "4 ways to call AWS APIs. All call same APIs underneath."],
  ["IaaS", "You manage OS, runtime, app, data. AWS manages hardware. Example: EC2, EBS, VPC."],
  ["PaaS", "You manage code + data only. AWS manages OS, runtime, scaling. Example: Elastic Beanstalk, Lambda, RDS."],
  ["SaaS", "You use the software. Provider manages everything. Example: Gmail, Salesforce, Zoom, Dropbox."],
  ["IaaS vs PaaS", "IaaS = more control, more work. PaaS = less control, less work. Choose based on need."],
  ["SaaS real-world", "Gmail (email), Salesforce (CRM), Zoom (video), Slack (chat) — all SaaS."],
];

export default function Module4() {
  const [active, setActive] = useState("going-global");
  const [showCheat, setShowCheat] = useState(false);
  const sec = sections.find(s => s.id === active);

  return (
    <div style={{ fontFamily: "var(--font-sans, system-ui)", maxWidth: 800, margin: "0 auto", padding: "0.5rem" }}>
      {/* Header */}
      <div style={{
        background: "var(--color-background-secondary, #f5f5f5)",
        border: "1px solid var(--color-border-tertiary, #e0e0e0)", borderRadius: 12,
        padding: "14px 16px", marginBottom: 12,
        display: "flex", alignItems: "center", gap: 12,
      }}>
        <div style={{
          width: 42, height: 42, borderRadius: 10, background: accent + "20",
          border: `1.5px solid ${accent}50`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22,
        }}>🌍</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, fontSize: 15 }}>Module 4 — AWS Global Infrastructure</div>
          <div style={{ fontSize: 12, color: "var(--color-text-secondary, #666)", marginTop: 2 }}>
            Regions · AZs · Edge Locations · CloudFront · Route 53 · CloudFormation
          </div>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          <Badge text="CLF-C02" color={accent} />
          <button onClick={() => setShowCheat(v => !v)} style={{
            padding: "4px 10px", fontSize: 11, borderRadius: 16,
            border: `1px solid ${showCheat ? accent : "#e0e0e0"}`,
            background: showCheat ? accent + "18" : "white",
            color: showCheat ? accentDark : "#666", cursor: "pointer", fontWeight: 600,
          }}>⚡ Cheat Sheet</button>
        </div>
      </div>

      {/* Cheat Sheet */}
      {showCheat && (
        <div style={{ border: "1px solid #e0e0e0", borderRadius: 10, overflow: "hidden", marginBottom: 12 }}>
          <div style={{ background: "#263238", padding: "8px 14px" }}>
            <span style={{ fontWeight: 700, fontSize: 12, color: accent }}>⚡ Module 4 Quick-Recall Cheat Sheet</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", background: "white" }}>
            {cheatRows.map(([k, v], i) => (
              <div key={i} style={{
                display: "flex", gap: 6, padding: "5px 12px",
                borderBottom: i < cheatRows.length - 2 ? "1px solid #f0f0f0" : "none",
                borderRight: i % 2 === 0 ? "1px solid #f0f0f0" : "none",
                background: Math.floor(i / 2) % 2 === 0 ? "white" : "#fafafa",
              }}>
                <span style={{ fontWeight: 700, fontSize: 10.5, color: accent, flexShrink: 0, minWidth: 110 }}>{k}</span>
                <span style={{ fontSize: 10.5, color: "#555", lineHeight: 1.4 }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab Nav */}
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 12 }}>
        {sections.map(s => (
          <button key={s.id} onClick={() => setActive(s.id)} style={{
            padding: "6px 12px", fontSize: 11.5,
            fontWeight: active === s.id ? 700 : 400, borderRadius: 18,
            border: active === s.id ? `1.5px solid ${s.badgeColor}` : "1px solid #e0e0e0",
            background: active === s.id ? s.badgeColor + "18" : "white",
            color: active === s.id ? s.badgeColor : "#666",
            cursor: "pointer", transition: "all 0.12s",
          }}>
            {s.emoji} {s.title}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ background: "white", border: "1px solid #e0e0e0", borderRadius: 12, padding: "18px 18px 24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
          <span style={{ fontSize: 26 }}>{sec.emoji}</span>
          <div>
            <div style={{ fontWeight: 700, fontSize: 16 }}>{sec.title}</div>
            <div style={{ marginTop: 3 }}><Badge text={sec.badge} color={sec.badgeColor} /></div>
          </div>
        </div>
        <SectionContent id={active} />
      </div>
    </div>
  );
}
