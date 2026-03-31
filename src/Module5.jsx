import { useState } from "react";

const accent = "#FF9900";
const accentDark = "#CC7A00";

// ─── Helpers ──────────────────────────────────────────────────────────────────
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
      <div style={{ fontSize: 13, lineHeight: 1.65, color: "var(--color-text-secondary, #555)" }}>{text}</div>
    </div>
  );
}
function Analogy({ icon, label, text, color = "#546e7a" }) {
  return (
    <div style={{
      background: "#f9f9f9", borderLeft: `3px solid ${color}`,
      borderRadius: 8, padding: "10px 14px", margin: "10px 0 0",
    }}>
      <div style={{ fontWeight: 700, fontSize: 11, color, marginBottom: 3 }}>{icon} {label}</div>
      <div style={{ fontSize: 13, fontStyle: "italic", lineHeight: 1.65, color: "#555" }}>{text}</div>
    </div>
  );
}
function H2({ children }) {
  return (
    <div style={{
      fontWeight: 700, fontSize: 14, color: "#1a1a1a",
      margin: "16px 0 7px", borderBottom: "1px solid #e0e0e0", paddingBottom: 5,
    }}>{children}</div>
  );
}
function Body({ children }) {
  return <div style={{ fontSize: 13.5, lineHeight: 1.7, color: "#555", marginTop: 6 }}>{children}</div>;
}
function KV({ rows, c1 = "28%" }) {
  return (
    <div style={{ borderRadius: 8, overflow: "hidden", border: "1px solid #e0e0e0", marginTop: 8 }}>
      {rows.map(([k, v, color], i) => (
        <div key={i} style={{
          display: "grid", gridTemplateColumns: `${c1} 1fr`, gap: 10,
          padding: "8px 12px", alignItems: "start",
          borderBottom: i < rows.length - 1 ? "1px solid #f0f0f0" : "none",
          background: i % 2 === 0 ? "#fafafa" : "white",
        }}>
          <div style={{ fontWeight: 700, fontSize: 12, color: color || "#1a73e8" }}>{k}</div>
          <div style={{ fontSize: 12.5, color: "#555", lineHeight: 1.55 }} dangerouslySetInnerHTML={{ __html: v }} />
        </div>
      ))}
    </div>
  );
}

// ─── SVG: VPC Architecture ────────────────────────────────────────────────────
function VPCDiagram() {
  return (
    <svg width="100%" viewBox="0 0 560 200" style={{ display: "block", margin: "10px 0" }}>
      {/* AWS Cloud outer boundary */}
      <rect x={4} y={4} width={552} height={192} rx="10" fill="#f0f4ff" stroke="#1a73e8" strokeWidth="1" strokeDasharray="6 3" />
      <text x={16} y={20} fontSize="9" fontWeight="700" fill="#1a73e8">AWS Cloud</text>

      {/* Region */}
      <rect x={20} y={26} width={520} height={162} rx="8" fill="#e8f5e9" stroke="#0f9d58" strokeWidth="1" strokeDasharray="4 2" />
      <text x={32} y={40} fontSize="8.5" fontWeight="700" fill="#0f9d58">Region (e.g. us-east-1)</text>

      {/* VPC */}
      <rect x={90} y={48} width={380} height={130} rx="7" fill="#ede7f6" stroke="#6a1b9a" strokeWidth="1.3" />
      <text x={102} y={62} fontSize="9" fontWeight="700" fill="#6a1b9a">Amazon VPC (your isolated network)</text>

      {/* AZ A */}
      <rect x={104} y={68} width={160} height={98} rx="6" fill="#fff8e1" stroke="#FF9900" strokeWidth="1" strokeDasharray="3 2" />
      <text x={184} y={81} textAnchor="middle" fontSize="8" fontWeight="700" fill="#FF9900">Availability Zone A</text>

      {/* Public subnet A */}
      <rect x={114} y={86} width={65} height={38} rx="4" fill="#c8e6c9" stroke="#0f9d58" strokeWidth="0.8" strokeDasharray="2 1" />
      <text x={146} y={100} textAnchor="middle" fontSize="7.5" fontWeight="700" fill="#0f9d58">Public</text>
      <text x={146} y={110} textAnchor="middle" fontSize="7" fill="#0f9d58">EC2 🌐</text>
      <text x={146} y={119} textAnchor="middle" fontSize="7" fill="#555">Web server</text>

      {/* Private subnet A */}
      <rect x={190} y={86} width={65} height={38} rx="4" fill="#bbdefb" stroke="#1a73e8" strokeWidth="0.8" />
      <text x={222} y={100} textAnchor="middle" fontSize="7.5" fontWeight="700" fill="#1a73e8">Private</text>
      <text x={222} y={110} textAnchor="middle" fontSize="7" fill="#1a73e8">🗄️ DB</text>
      <text x={222} y={119} textAnchor="middle" fontSize="7" fill="#555">Database</text>

      {/* AZ B */}
      <rect x={296} y={68} width={160} height={98} rx="6" fill="#fce4ec" stroke="#d32f2f" strokeWidth="1" strokeDasharray="3 2" />
      <text x={376} y={81} textAnchor="middle" fontSize="8" fontWeight="700" fill="#d32f2f">Availability Zone B</text>

      {/* Public subnet B */}
      <rect x={306} y={86} width={65} height={38} rx="4" fill="#c8e6c9" stroke="#0f9d58" strokeWidth="0.8" strokeDasharray="2 1" />
      <text x={338} y={100} textAnchor="middle" fontSize="7.5" fontWeight="700" fill="#0f9d58">Public</text>
      <text x={338} y={110} textAnchor="middle" fontSize="7" fill="#0f9d58">EC2 🌐</text>
      <text x={338} y={119} textAnchor="middle" fontSize="7" fill="#555">Web server</text>

      {/* Private subnet B */}
      <rect x={382} y={86} width={65} height={38} rx="4" fill="#bbdefb" stroke="#1a73e8" strokeWidth="0.8" />
      <text x={414} y={100} textAnchor="middle" fontSize="7.5" fontWeight="700" fill="#1a73e8">Private</text>
      <text x={414} y={110} textAnchor="middle" fontSize="7" fill="#1a73e8">🗄️ DB</text>
      <text x={414} y={119} textAnchor="middle" fontSize="7" fill="#555">Replica</text>

      {/* Internet Gateway */}
      <rect x={34} y={95} width={50} height={28} rx="6" fill="#FF990020" stroke={accent} strokeWidth="1" />
      <text x={59} y={108} textAnchor="middle" fontSize="8" fontWeight="700" fill={accentDark}>Internet</text>
      <text x={59} y={118} textAnchor="middle" fontSize="7.5" fill={accentDark}>Gateway</text>

      {/* Arrow from internet to gateway */}
      <line x1={34} y1={109} x2={16} y2={109} stroke={accent} strokeWidth="1.2" />
      <polygon points="16,105 16,113 10,109" fill={accent} />
      <text x={5} y={96} fontSize="7.5" fill="#555">🌐</text>
      <text x={2} y={106} fontSize="7" fill="#555">Internet</text>

      {/* Arrow from gateway to public subnet */}
      <line x1={84} y1={109} x2={112} y2={109} stroke={accent} strokeWidth="1.2" />
      <polygon points="112,105 112,113 118,109" fill={accent} />

      {/* Private traffic label at bottom */}
      <text x={280} y={178} textAnchor="middle" fontSize="8" fontWeight="700" fill="#6a1b9a">🔒 Private subnets: NO direct internet access — databases, internal services</text>
      <text x={280} y={189} textAnchor="middle" fontSize="8" fill="#0f9d58">🌐 Public subnets (dashed): internet accessible — web servers, load balancers</text>
    </svg>
  );
}

// ─── SVG: Gateway comparison ──────────────────────────────────────────────────
function GatewaysDiagram() {
  return (
    <svg width="100%" viewBox="0 0 560 150" style={{ display: "block", margin: "10px 0" }}>
      {/* Left: Internet Gateway */}
      <rect x={10} y={10} width={240} height={130} rx="8" fill="#e8f5e9" stroke="#0f9d58" strokeWidth="1.2" />
      <text x={130} y={27} textAnchor="middle" fontSize="10" fontWeight="700" fill="#0f9d58">🌐 Internet Gateway</text>
      <text x={130} y={39} textAnchor="middle" fontSize="8" fill="#555">For PUBLIC resources</text>
      {/* Internet → IGW → VPC */}
      <circle cx={40} cy={85} r={14} fill="#E3F2FD" stroke="#1a73e8" strokeWidth="1" />
      <text x={40} y={89} textAnchor="middle" fontSize="11">👤</text>
      <text x={40} y={109} textAnchor="middle" fontSize="8" fill="#555">Any user</text>
      <line x1={56} y1={85} x2={100} y2={85} stroke="#0f9d58" strokeWidth="1.3" />
      <polygon points="100,81 100,89 106,85" fill="#0f9d58" />
      <rect x={108} y={72} width={50} height={26} rx="5" fill="#0f9d5820" stroke="#0f9d58" strokeWidth="0.8" />
      <text x={133} y={87} textAnchor="middle" fontSize="8" fontWeight="700" fill="#0f9d58">IGW</text>
      <line x1={160} y1={85} x2={200} y2={85} stroke="#0f9d58" strokeWidth="1.3" />
      <polygon points="200,81 200,89 206,85" fill="#0f9d58" />
      <rect x={208} y={70} width={34} height={30} rx="5" fill="#c8e6c9" stroke="#0f9d58" strokeWidth="0.8" />
      <text x={225} y={83} textAnchor="middle" fontSize="8" fontWeight="700" fill="#0f9d58">VPC</text>
      <text x={225} y={93} textAnchor="middle" fontSize="7" fill="#555">Public</text>
      <text x={130} y={128} textAnchor="middle" fontSize="8" fill="#0f9d58">Open to everyone on the internet</text>

      {/* Right: Virtual Private Gateway */}
      <rect x={310} y={10} width={240} height={130} rx="8" fill="#fce4ec" stroke="#d32f2f" strokeWidth="1.2" />
      <text x={430} y={27} textAnchor="middle" fontSize="10" fontWeight="700" fill="#d32f2f">🔒 Virtual Private Gateway</text>
      <text x={430} y={39} textAnchor="middle" fontSize="8" fill="#555">For PRIVATE VPN connections</text>
      {/* Corp → VPN → VPG → VPC */}
      <rect x={320} y={65} width={55} height={38} rx="5" fill="#E3F2FD" stroke="#1a73e8" strokeWidth="0.8" />
      <text x={347} y={80} textAnchor="middle" fontSize="7.5" fontWeight="700" fill="#1a73e8">Corporate</text>
      <text x={347} y={90} textAnchor="middle" fontSize="7.5" fill="#1a73e8">Data Center</text>
      <text x={347} y={100} textAnchor="middle" fontSize="9">🏢</text>
      <line x1={377} y1={85} x2={400} y2={85} stroke="#d32f2f" strokeWidth="1.3" strokeDasharray="3 2" />
      <text x={388} y={78} textAnchor="middle" fontSize="7" fill="#d32f2f">VPN</text>
      <rect x={402} y={72} width={46} height={26} rx="5" fill="#ffcdd220" stroke="#d32f2f" strokeWidth="0.8" />
      <text x={425} y={84} textAnchor="middle" fontSize="7.5" fontWeight="700" fill="#d32f2f">VPG 🔒</text>
      <line x1={450} y1={85} x2={488} y2={85} stroke="#d32f2f" strokeWidth="1.3" />
      <polygon points="488,81 488,89 494,85" fill="#d32f2f" />
      <rect x={496} y={70} width={46} height={30} rx="5" fill="#ffcdd2" stroke="#d32f2f" strokeWidth="0.8" />
      <text x={519} y={83} textAnchor="middle" fontSize="8" fontWeight="700" fill="#d32f2f">VPC</text>
      <text x={519} y={93} textAnchor="middle" fontSize="7" fill="#555">Private</text>
      <text x={430} y={128} textAnchor="middle" fontSize="8" fill="#d32f2f">Only approved private networks can enter</text>
    </svg>
  );
}

// ─── SVG: Direct Connect ──────────────────────────────────────────────────────
function DirectConnectDiagram() {
  return (
    <svg width="100%" viewBox="0 0 560 140" style={{ display: "block", margin: "10px 0" }}>
      {/* On-premises */}
      <rect x={10} y={25} width={110} height={90} rx="8" fill="#E3F2FD" stroke="#1a73e8" strokeWidth="1.2" />
      <text x={65} y={42} textAnchor="middle" fontSize="9" fontWeight="700" fill="#1a73e8">Customer</text>
      <text x={65} y={53} textAnchor="middle" fontSize="9" fontWeight="700" fill="#1a73e8">Network</text>
      <text x={65} y={67} textAnchor="middle" fontSize="16">🏢</text>
      <text x={65} y={88} textAnchor="middle" fontSize="8" fill="#555">Clients &amp;</text>
      <text x={65} y={98} textAnchor="middle" fontSize="8" fill="#555">Servers</text>
      <text x={65} y={110} textAnchor="middle" fontSize="8" fill="#1a73e8">Router/Firewall</text>

      {/* VPN path (over internet) */}
      <path d="M 122 55 Q 200 30 260 55" fill="none" stroke="#FF9900" strokeWidth="1.2" strokeDasharray="5 3" />
      <text x={192} y={28} textAnchor="middle" fontSize="8" fill={accent} fontWeight="700">VPN (over internet)</text>
      <text x={192} y={38} textAnchor="middle" fontSize="7.5" fill="#888">Shared bandwidth · variable speed</text>
      <polygon points="260,51 260,59 266,55" fill={accent} />

      {/* Direct Connect path (dedicated fiber) */}
      <line x1={122} y1={95} x2={262} y2={95} stroke="#0f9d58" strokeWidth="3" />
      <polygon points="262,91 262,99 268,95" fill="#0f9d58" />
      <text x={192} y={88} textAnchor="middle" fontSize="8" fill="#0f9d58" fontWeight="700">Direct Connect (dedicated fiber)</text>
      <text x={192} y={110} textAnchor="middle" fontSize="7.5" fill="#0f9d58">Private line · consistent high bandwidth</text>

      {/* Direct Connect location box */}
      <rect x={270} y={65} width={90} height={50} rx="7" fill="#6a1b9a20" stroke="#6a1b9a" strokeWidth="1.2" />
      <text x={315} y={84} textAnchor="middle" fontSize="9" fontWeight="700" fill="#6a1b9a">Direct</text>
      <text x={315} y={95} textAnchor="middle" fontSize="9" fontWeight="700" fill="#6a1b9a">Connect</text>
      <text x={315} y={106} textAnchor="middle" fontSize="7.5" fill="#555">Location (DC)</text>

      {/* Arrow to VPG */}
      <line x1={362} y1={90} x2={400} y2={90} stroke="#6a1b9a" strokeWidth="1.3" />
      <polygon points="400,86 400,94 406,90" fill="#6a1b9a" />

      {/* Virtual private gateway */}
      <rect x={408} y={76} width={50} height={28} rx="6" fill="#d32f2f20" stroke="#d32f2f" strokeWidth="1" />
      <text x={433} y={88} textAnchor="middle" fontSize="8" fontWeight="700" fill="#d32f2f">VPG</text>
      <text x={433} y={98} textAnchor="middle" fontSize="7" fill="#d32f2f">🔒</text>

      {/* AWS VPC */}
      <rect x={464} y={35} width={88} height={100} rx="8" fill="#ede7f6" stroke="#6a1b9a" strokeWidth="1.2" />
      <text x={508} y={52} textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#6a1b9a">Amazon</text>
      <text x={508} y={63} textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#6a1b9a">VPC</text>
      <rect x={474} y={68} width={68} height={24} rx="4" fill="#bbdefb" stroke="#1a73e8" strokeWidth="0.8" />
      <text x={508} y={78} textAnchor="middle" fontSize="7.5" fontWeight="700" fill="#1a73e8">Private Subnet</text>
      <text x={508} y={88} textAnchor="middle" fontSize="7" fill="#555">EC2 instances</text>
      <rect x={474} y={96} width={68} height={24} rx="4" fill="#bbdefb" stroke="#1a73e8" strokeWidth="0.8" />
      <text x={508} y={106} textAnchor="middle" fontSize="7.5" fontWeight="700" fill="#1a73e8">Private Subnet</text>
      <text x={508} y={116} textAnchor="middle" fontSize="7" fill="#555">EC2 instances</text>

      <line x1={460} y1={90} x2={462} y2={90} stroke="#6a1b9a" strokeWidth="1" />

      {/* Legend */}
      <line x1={10} y1={132} x2={35} y2={132} stroke={accent} strokeWidth="1.5" strokeDasharray="4 2" />
      <text x={40} y={135} fontSize="8" fill={accent}>VPN — shared, variable</text>
      <line x1={180} y1={132} x2={205} y2={132} stroke="#0f9d58" strokeWidth="3" />
      <text x={210} y={135} fontSize="8" fill="#0f9d58">Direct Connect — dedicated, consistent</text>
    </svg>
  );
}

// ─── SVG: Full VPC architecture with security groups ─────────────────────────
function FullVPCArchDiagram() {
  return (
    <svg width="100%" viewBox="0 0 560 200" style={{ display: "block", margin: "10px 0" }}>
      {/* Public traffic */}
      <text x={15} y={75} fontSize="9" fontWeight="700" fill="#0f9d58">Public traffic</text>
      <text x={15} y={87} fontSize="9">🌐 Internet</text>
      <line x1={55} y1={83} x2={80} y2={83} stroke="#0f9d58" strokeWidth="1.3" strokeDasharray="3 2" />
      <polygon points="80,79 80,87 86,83" fill="#0f9d58" />

      {/* Private traffic */}
      <text x={15} y={120} fontSize="9" fontWeight="700" fill="#d32f2f">Private traffic</text>
      <text x={15} y={132} fontSize="9">🔒 Corp DC</text>
      <line x1={55} y1={128} x2={80} y2={128} stroke="#d32f2f" strokeWidth="1.3" strokeDasharray="3 2" />
      <polygon points="80,124 80,132 86,128" fill="#d32f2f" />

      {/* VPC boundary */}
      <rect x={90} y={10} width={462} height={182} rx="8" fill="#ede7f620" stroke="#6a1b9a" strokeWidth="1.5" />
      <text x={102} y={26} fontSize="9" fontWeight="700" fill="#6a1b9a">Amazon VPC</text>

      {/* Internet/Virtual private gateway (merged) */}
      <rect x={100} y={65} width={60} height={80} rx="7" fill="#fff9c4" stroke="#FF9900" strokeWidth="1" />
      <text x={130} y={85} textAnchor="middle" fontSize="7.5" fontWeight="700" fill={accentDark}>Internet</text>
      <text x={130} y={95} textAnchor="middle" fontSize="7.5" fontWeight="700" fill={accentDark}>Gateway</text>
      <text x={130} y={108} textAnchor="middle" fontSize="14">🚪</text>
      <line x1={86} y1={83} x2={98} y2={83} stroke="#0f9d58" strokeWidth="1.2" />
      <line x1={86} y1={128} x2={98} y2={115} stroke="#d32f2f" strokeWidth="1.2" />
      <text x={130} y={125} textAnchor="middle" fontSize="7.5" fontWeight="700" fill="#d32f2f">VPG 🔒</text>
      <text x={130} y={137} textAnchor="middle" fontSize="7" fill="#555">VPN/DC</text>

      {/* Security group 1 - ELB */}
      <rect x={172} y={45} width={90} height={102} rx="7" fill="#fce4ec" stroke="#d32f2f" strokeWidth="1" />
      <text x={217} y={61} textAnchor="middle" fontSize="8" fontWeight="700" fill="#d32f2f">Security</text>
      <text x={217} y={71} textAnchor="middle" fontSize="8" fontWeight="700" fill="#d32f2f">Group</text>
      <rect x={182} y={80} width={70} height={50} rx="5" fill="#f8bbd0" stroke="#d32f2f" strokeWidth="0.7" />
      <text x={217} y={98} textAnchor="middle" fontSize="14">⚖️</text>
      <text x={217} y={112} textAnchor="middle" fontSize="7.5" fontWeight="700" fill="#d32f2f">ELB</text>
      <text x={217} y={122} textAnchor="middle" fontSize="7" fill="#555">Load Balancer</text>
      {/* Arrow from gateway to ELB */}
      <line x1={162} y1={97} x2={170} y2={97} stroke={accent} strokeWidth="1.2" />
      <polygon points="170,93 170,101 176,97" fill={accent} />

      {/* Auto scaling group */}
      <rect x={278} y={20} width={150} height={155} rx="7" fill="#fff3e0" stroke={accent} strokeWidth="1" strokeDasharray="4 2" />
      <text x={353} y={36} textAnchor="middle" fontSize="8" fontWeight="700" fill={accentDark}>Auto Scaling Group</text>
      {/* Security group 2 - EC2s */}
      <rect x={286} y={44} width={134} height={118} rx="6" fill="#fce4ec" stroke="#d32f2f" strokeWidth="0.8" />
      <text x={353} y={59} textAnchor="middle" fontSize="8" fontWeight="700" fill="#d32f2f">Security Group</text>
      {[0, 1, 2].map(i => (
        <g key={i}>
          <rect x={296} y={65 + i * 30} width={114} height={22} rx="4" fill="#FF990025" stroke={accent} strokeWidth="0.7" />
          <text x={353} y={80 + i * 30} textAnchor="middle" fontSize="8" fontWeight="700" fill={accentDark}>🖥️ EC2 Instance</text>
        </g>
      ))}
      {/* Arrow from ELB to EC2s */}
      <line x1={264} y1={97} x2={284} y2={97} stroke="#0f9d58" strokeWidth="1.2" />
      <polygon points="284,93 284,101 290,97" fill="#0f9d58" />

      {/* Security group 3 - Database */}
      <rect x={444} y={45} width={98} height={102} rx="7" fill="#e8eaf6" stroke="#3f51b5" strokeWidth="1" />
      <text x={493} y={61} textAnchor="middle" fontSize="8" fontWeight="700" fill="#3f51b5">Security</text>
      <text x={493} y={71} textAnchor="middle" fontSize="8" fontWeight="700" fill="#3f51b5">Group</text>
      <rect x={454} y={80} width={78} height={50} rx="5" fill="#c5cae9" stroke="#3f51b5" strokeWidth="0.7" />
      <text x={493} y={100} textAnchor="middle" fontSize="14">🗄️</text>
      <text x={493} y={116} textAnchor="middle" fontSize="8" fontWeight="700" fill="#3f51b5">Database</text>
      {/* Arrow from EC2 to DB */}
      <line x1={432} y1={97} x2={452} y2={97} stroke="#3f51b5" strokeWidth="1.2" />
      <polygon points="452,93 452,101 458,97" fill="#3f51b5" />

      <text x={290} y={195} textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#6a1b9a">
        Full VPC: Internet Gateway → ELB → EC2 (Auto Scaling) → Database — all protected by Security Groups
      </text>
    </svg>
  );
}

// ─── SVG: Global multi-region architecture ────────────────────────────────────
function GlobalArchDiagram() {
  return (
    <svg width="100%" viewBox="0 0 560 180" style={{ display: "block", margin: "10px 0" }}>
      {/* User */}
      <circle cx={40} cy={90} r={22} fill="#E3F2FD" stroke="#1a73e8" strokeWidth="1" />
      <text x={40} y={86} textAnchor="middle" fontSize="16">👤</text>
      <text x={40} y={100} textAnchor="middle" fontSize="7.5" fontWeight="700" fill="#1a73e8">Users</text>
      <text x={40} y={110} textAnchor="middle" fontSize="7" fill="#555">Anywhere</text>

      {/* Arrow to Route 53 */}
      <line x1={64} y1={90} x2={98} y2={90} stroke="#1a73e8" strokeWidth="1.2" />
      <polygon points="98,86 98,94 104,90" fill="#1a73e8" />
      <text x={80} y={82} textAnchor="middle" fontSize="7" fill="#555">DNS request</text>

      {/* Route 53 */}
      <rect x={106} y={70} width={68} height={40} rx="8" fill="#6a1b9a20" stroke="#6a1b9a" strokeWidth="1.2" />
      <text x={140} y={87} textAnchor="middle" fontSize="14">🛡️</text>
      <text x={140} y={102} textAnchor="middle" fontSize="8" fontWeight="700" fill="#6a1b9a">Route 53</text>

      {/* Arrow to CloudFront */}
      <line x1={176} y1={90} x2={210} y2={90} stroke="#6a1b9a" strokeWidth="1.2" />
      <polygon points="210,86 210,94 216,90" fill="#6a1b9a" />
      <text x={194} y={82} textAnchor="middle" fontSize="7" fill="#555">routes to</text>

      {/* CloudFront with edge locations */}
      <rect x={218} y={48} width={100} height={84} rx="8" fill="#FF990015" stroke={accent} strokeWidth="1.2" strokeDasharray="4 2" />
      <text x={268} y={65} textAnchor="middle" fontSize="8" fontWeight="700" fill={accentDark}>CloudFront</text>
      {["Edge Loc 1", "Edge Loc 2", "Edge Loc 3"].map((e, i) => (
        <g key={i}>
          <rect x={230} y={72 + i * 19} width={76} height={14} rx="3" fill={accent + "25"} stroke={accent} strokeWidth="0.7" />
          <text x={268} y={82 + i * 19} textAnchor="middle" fontSize="7.5" fill={accentDark}>{e}</text>
        </g>
      ))}

      {/* Arrow to Route 53 (2nd - routing) */}
      <line x1={320} y1={90} x2={348} y2={90} stroke={accent} strokeWidth="1.2" />
      <polygon points="348,86 348,94 354,90" fill={accent} />

      {/* Route 53 (latency routing) */}
      <rect x={356} y={70} width={68} height={40} rx="8" fill="#6a1b9a20" stroke="#6a1b9a" strokeWidth="1.2" />
      <text x={390} y={87} textAnchor="middle" fontSize="14">🛡️</text>
      <text x={390} y={100} textAnchor="middle" fontSize="7" fontWeight="700" fill="#6a1b9a">Latency</text>

      {/* Arrows to two regions */}
      <line x1={426} y1={80} x2={456} y2={55} stroke="#0f9d58" strokeWidth="1.2" />
      <polygon points="456,51 460,59 462,51" fill="#0f9d58" />
      <line x1={426} y1={100} x2={456} y2={125} stroke="#d32f2f" strokeWidth="1.2" />
      <polygon points="456,129 460,121 462,129" fill="#d32f2f" />

      {/* Region 1 */}
      <rect x={464} y={18} width={88} height={70} rx="7" fill="#e8f5e9" stroke="#0f9d58" strokeWidth="1.2" />
      <text x={508} y={34} textAnchor="middle" fontSize="8" fontWeight="700" fill="#0f9d58">Region 1</text>
      <text x={508} y={46} textAnchor="middle" fontSize="7" fill="#555">Amazon VPC</text>
      {["AZ 1", "AZ 2", "AZ 3"].map((az, i) => (
        <rect key={i} x={472 + i * 27} y={52} width={24} height={26} rx="3" fill="#0f9d5820" stroke="#0f9d58" strokeWidth="0.7"  />
      ))}
      {["AZ 1", "AZ 2", "AZ 3"].map((az, i) => (
        <text key={i + "t"} x={484 + i * 27} y={69} textAnchor="middle" fontSize="6.5" fill="#0f9d58">{az}</text>
      ))}

      {/* Region 2 */}
      <rect x={464} y={102} width={88} height={70} rx="7" fill="#fce4ec" stroke="#d32f2f" strokeWidth="1.2" />
      <text x={508} y={118} textAnchor="middle" fontSize="8" fontWeight="700" fill="#d32f2f">Region 2</text>
      <text x={508} y={130} textAnchor="middle" fontSize="7" fill="#555">Amazon VPC</text>
      {["AZ 1", "AZ 2", "AZ 3"].map((az, i) => (
        <rect key={i} x={472 + i * 27} y={136} width={24} height={26} rx="3" fill="#d32f2f20" stroke="#d32f2f" strokeWidth="0.7" />
      ))}
      {["AZ 1", "AZ 2", "AZ 3"].map((az, i) => (
        <text key={i + "t"} x={484 + i * 27} y={153} textAnchor="middle" fontSize="6.5" fill="#d32f2f">{az}</text>
      ))}

      <text x={280} y={175} textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#333">
        Global Architecture: Users → Route 53 → CloudFront → Nearest Region (multi-AZ)
      </text>
    </svg>
  );
}

// ─── Section content ──────────────────────────────────────────────────────────
const sections = [
  { id: "vpc-intro", emoji: "🏗️", title: "Amazon VPC", badge: "Virtual Private Cloud", badgeColor: "#6a1b9a" },
  { id: "subnets", emoji: "🔀", title: "Subnets & Access", badge: "Public vs Private", badgeColor: "#0f9d58" },
  { id: "gateways", emoji: "🚪", title: "Internet & VPN Gateways", badge: "Connectivity", badgeColor: "#FF9900" },
  { id: "connections", emoji: "🔌", title: "4 Ways to Connect", badge: "Client VPN · Site-to-Site · PrivateLink · Direct Connect", badgeColor: "#6a1b9a" },
  { id: "direct-connect", emoji: "⚡", title: "AWS Direct Connect", badge: "Dedicated Connection", badgeColor: "#1a73e8" },
  { id: "security-nacl", emoji: "🔒", title: "Security Groups & NACLs", badge: "Packet Flow Deep Dive", badgeColor: "#d32f2f" },
  { id: "extra-gateways", emoji: "🛣️", title: "Additional Gateways", badge: "Transit · NAT · API Gateway", badgeColor: "#FF9900" },
  { id: "vpc-demo", emoji: "🖥️", title: "VPC Build — Step by Step", badge: "Hands-On Demo", badgeColor: "#0f9d58" },
  { id: "route53-dns", emoji: "🌐", title: "Route 53 & DNS", badge: "Global Networking", badgeColor: "#1a73e8" },
  { id: "cloudfront-accelerator", emoji: "🚀", title: "CloudFront & Global Accelerator", badge: "CDN & Edge Performance", badgeColor: "#d32f2f" },
  { id: "global-arch", emoji: "🗺️", title: "Global Architecture", badge: "Everything Together", badgeColor: "#546e7a" },
];

function SectionContent({ id }) {
  switch (id) {

    case "vpc-intro": return (
      <div>
        <Body>
          Amazon VPC (Virtual Private Cloud) is your own <b>private, isolated section of the AWS Cloud</b>.
          Think of it as building your own office building inside AWS — you decide the layout, who gets in,
          which rooms are public, and which are locked away.
        </Body>
        <Analogy icon="☕" label="Coffee Shop Analogy"
          text="A VPC is like the layout of your coffee shop. You decide that customers (public traffic) can come in through the front door and talk to cashiers. But baristas (backend servers, databases) are in a separate private area that customers cannot access directly. The VPC defines those boundaries."
          color="#6a1b9a" />
        <H2>Amazon VPC Architecture</H2>
        <VPCDiagram />
        <H2>What a VPC Gives You</H2>
        <KV rows={[
          ["Isolation", "Your VPC is completely isolated from other AWS customers. No one can access your resources unless you explicitly allow them.", "#6a1b9a"],
          ["IP Address Control", "You define your own private IP address ranges (CIDR blocks). E.g., 10.0.0.0/16 gives you 65,536 IP addresses to assign.", "#1a73e8"],
          ["Subnets", "Divide your VPC into smaller segments. Public subnets face the internet; private subnets are internal only.", "#0f9d58"],
          ["Security", "Control inbound and outbound traffic at both the subnet level (NACLs) and instance level (Security Groups).", "#d32f2f"],
          ["Connectivity", "Connect to the internet (Internet Gateway), corporate networks (VPN / Direct Connect), or other VPCs (VPC Peering).", "#FF9900"],
        ]} />
        <H2>3 Core Benefits</H2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginTop: 6 }}>
          {[
            { icon: "🛡️", title: "Increase Security", desc: "Control who can access your resources. Screen traffic. Restrict instance access.", color: "#d32f2f" },
            { icon: "⏱️", title: "Save Time", desc: "Less time setting up, managing, and validating your virtual network vs on-premises.", color: "#0f9d58" },
            { icon: "🎛️", title: "Control Environment", desc: "Full control over resource placement, connectivity, routing, and security rules.", color: "#1a73e8" },
          ].map(({ icon, title, desc, color }) => (
            <div key={title} style={{ border: `1px solid ${color}30`, borderTop: `3px solid ${color}`, borderRadius: 8, padding: "10px 11px", background: color + "08" }}>
              <div style={{ fontSize: 22, marginBottom: 4 }}>{icon}</div>
              <div style={{ fontWeight: 700, fontSize: 12, color, marginBottom: 4 }}>{title}</div>
              <div style={{ fontSize: 12, color: "#555", lineHeight: 1.5 }}>{desc}</div>
            </div>
          ))}
        </div>
        <Callout icon="🎯" label="Exam Tip"
          text="VPC = your own private network within AWS. You define IP ranges, subnets, routing, and security. Every AWS account gets a default VPC. Resources inside a VPC are isolated from other customers by default." color="#6a1b9a" />
      </div>
    );

    case "subnets": return (
      <div>
        <Body>
          A <b>subnet</b> is a section of your VPC where you group resources based on security or operational needs.
          Think of your VPC as an office building — subnets are the floors. Some floors are open to visitors (public),
          others require a keycard (private).
        </Body>

        <H2>📐 AWS Architecture Diagram — Public & Private Subnets</H2>
        <div style={{ background: "#1a1a2e", borderRadius: 12, padding: 16, marginTop: 8, border: "2px solid #6a1b9a" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <div style={{ background: "#FF9900", borderRadius: 4, padding: "2px 8px", fontSize: 10, fontWeight: 800, color: "white" }}>aws</div>
            <span style={{ color: "rgba(255,255,255,0.8)", fontSize: 11, fontWeight: 700 }}>AWS Cloud</span>
          </div>
          <div style={{ border: "2px solid #9c27b0", borderRadius: 10, padding: 14, background: "rgba(156,39,176,0.08)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
              <span style={{ fontSize: 14 }}>☁️</span>
              <span style={{ color: "#ce93d8", fontSize: 11, fontWeight: 700 }}>Amazon Virtual Private Cloud (VPC) <span style={{ color: "#888", fontWeight: 400 }}>10.0.0.0/16</span></span>
            </div>
            <div style={{ display: "flex", gap: 10, alignItems: "stretch" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4 }}>
                <div style={{ border: "2px solid #9c27b0", borderRadius: 10, padding: "10px 8px", background: "rgba(156,39,176,0.2)", textAlign: "center", minWidth: 70 }}>
                  <div style={{ fontSize: 22, marginBottom: 2 }}>🚪</div>
                  <div style={{ fontSize: 9, color: "#ce93d8", fontWeight: 700, lineHeight: 1.3 }}>Internet<br />gateway</div>
                </div>
                <div style={{ width: 2, height: 20, background: "#9c27b0" }} />
                <div style={{ fontSize: 20 }}>🌐</div>
                <div style={{ fontSize: 9, color: "#888" }}>Internet</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", color: "#9c27b0", fontSize: 18 }}>→</div>
              {[
                { az: "Availability Zone A", subnets: [
                  { label: "Public subnet 1", cidr: "10.0.1.0/24", resources: ["🖥️ EC2", "🖥️ EC2"], dash: true, color: "#4caf50", bg: "rgba(76,175,80,0.15)" },
                  { label: "Private subnet 1", cidr: "10.0.3.0/24", resources: ["🗄️ Database", "🗄️ Database"], dash: false, color: "#00bcd4", bg: "rgba(0,188,212,0.15)" },
                ]},
                { az: "Availability Zone B", subnets: [
                  { label: "Public subnet 2", cidr: "10.0.2.0/24", resources: ["🖥️ EC2", "🖥️ EC2"], dash: true, color: "#4caf50", bg: "rgba(76,175,80,0.15)" },
                  { label: "Private subnet 2", cidr: "10.0.4.0/24", resources: ["🗄️ Database", "🗄️ Database"], dash: false, color: "#00bcd4", bg: "rgba(0,188,212,0.15)" },
                ]},
              ].map(({ az, subnets }) => (
                <div key={az} style={{ flex: 1, border: "1.5px dashed #555", borderRadius: 8, padding: 10 }}>
                  <div style={{ fontSize: 9, color: "#aaa", fontWeight: 700, marginBottom: 8, textAlign: "center" }}>{az}</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {subnets.map(({ label, cidr, resources, dash, color, bg }) => (
                      <div key={label} style={{ border: `2px ${dash ? "dashed" : "solid"} ${color}`, borderRadius: 7, padding: "8px 10px", background: bg }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 4 }}>
                          <span style={{ fontSize: 11 }}>🔒</span>
                          <span style={{ fontSize: 9, fontWeight: 700, color }}>{label}</span>
                        </div>
                        <div style={{ fontSize: 8, color: "#888", marginBottom: 6 }}>{cidr}</div>
                        <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                          {resources.map((r, i) => (
                            <div key={i} style={{ background: "rgba(255,255,255,0.1)", border: `1px solid ${color}50`, borderRadius: 5, padding: "4px 7px", fontSize: 10, color: "rgba(255,255,255,0.85)" }}>{r}</div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 20, marginTop: 12, paddingTop: 10, borderTop: "1px solid rgba(255,255,255,0.1)", flexWrap: "wrap" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 28, height: 0, border: "2px dashed #4caf50" }} />
                <span style={{ fontSize: 10, color: "#4caf50" }}>Public subnet — dashed border = internet accessible</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 28, height: 0, border: "2px solid #00bcd4" }} />
                <span style={{ fontSize: 10, color: "#00bcd4" }}>Private subnet — solid border = no internet</span>
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 10 }}>
          <div style={{ border: "1px solid #4caf5040", borderTop: "3px solid #4caf50", borderRadius: 9, padding: "12px", background: "rgba(76,175,80,0.04)" }}>
            <div style={{ fontWeight: 700, fontSize: 13, color: "#2e7d32", marginBottom: 6 }}>🌐 Public Subnet</div>
            <div style={{ fontSize: 12.5, color: "#555", marginBottom: 8, lineHeight: 1.55 }}>Has a route to the Internet Gateway. Resources here are <b>reachable from the internet</b>.</div>
            <div style={{ fontWeight: 700, fontSize: 11, color: "#2e7d32", marginBottom: 4 }}>✅ Place here:</div>
            {["Web servers (EC2)", "Elastic Load Balancer", "NAT Gateway", "Bastion hosts"].map(u => (
              <div key={u} style={{ fontSize: 11.5, color: "#555", marginBottom: 3 }}>• {u}</div>
            ))}
            <div style={{ fontSize: 11, color: "#4caf50", marginTop: 8, padding: "5px 8px", background: "rgba(76,175,80,0.08)", borderRadius: 5, fontStyle: "italic" }}>
              📐 DASHED border in AWS diagrams = internet accessible
            </div>
          </div>
          <div style={{ border: "1px solid #00bcd440", borderTop: "3px solid #00bcd4", borderRadius: 9, padding: "12px", background: "rgba(0,188,212,0.04)" }}>
            <div style={{ fontWeight: 700, fontSize: 13, color: "#00697a", marginBottom: 6 }}>🔒 Private Subnet</div>
            <div style={{ fontSize: 12.5, color: "#555", marginBottom: 8, lineHeight: 1.55 }}>No route to the Internet Gateway. Resources here are <b>completely isolated from the internet</b>.</div>
            <div style={{ fontWeight: 700, fontSize: 11, color: "#00697a", marginBottom: 4 }}>✅ Place here:</div>
            {["Databases (RDS, Aurora)", "Application servers", "Internal microservices", "Cache (Redis)"].map(u => (
              <div key={u} style={{ fontSize: 11.5, color: "#555", marginBottom: 3 }}>• {u}</div>
            ))}
            <div style={{ fontSize: 11, color: "#00bcd4", marginTop: 8, padding: "5px 8px", background: "rgba(0,188,212,0.08)", borderRadius: 5, fontStyle: "italic" }}>
              📐 SOLID border in AWS diagrams = private, no internet
            </div>
          </div>
        </div>

        <H2>🔢 What is a CIDR Block?</H2>
        <div style={{ background: "#1e1e1e", borderRadius: 10, padding: "16px", marginTop: 6 }}>
          <div style={{ fontSize: 12, color: "#aaa", marginBottom: 12 }}>
            CIDR = <span style={{ color: "#4EC9B0" }}>Classless Inter-Domain Routing</span> — defines your IP address range. Like a postcode that covers a whole neighbourhood.
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <div>
              <div style={{ color: "#4EC9B0", fontWeight: 700, fontSize: 12, marginBottom: 10 }}>How to read: <code style={{ color: "#FF9900" }}>10.0.0.0/16</code></div>
              {[
                ["10.0.0.0", "Starting IP address", "#CE9178"],
                ["/16", "65,536 total IPs — large VPC", "#FF9900"],
                ["/24", "256 IPs — typical subnet", "#9CDCFE"],
                ["/32", "1 single IP address only", "#6A9955"],
              ].map(([part, meaning, color]) => (
                <div key={part} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                  <code style={{ background: "#2d2d2d", color, padding: "3px 10px", borderRadius: 5, fontSize: 12, minWidth: 65, textAlign: "center", display: "block" }}>{part}</code>
                  <span style={{ fontSize: 11.5, color: "rgba(255,255,255,0.6)", lineHeight: 1.4 }}>{meaning}</span>
                </div>
              ))}
              <div style={{ marginTop: 8, background: "#2d2d2d", borderRadius: 6, padding: "8px 10px", fontSize: 11.5, color: "rgba(255,255,255,0.7)" }}>
                💡 <b style={{ color: "#FF9900" }}>Rule:</b> Bigger /number = fewer IPs<br />
                /16 = huge · /24 = subnet · /32 = one IP
              </div>
            </div>
            <div>
              <div style={{ color: "#4EC9B0", fontWeight: 700, fontSize: 12, marginBottom: 10 }}>Real VPC Example</div>
              <div style={{ background: "#2d2d2d", borderRadius: 8, padding: "10px 12px" }}>
                <div style={{ fontSize: 11.5, color: "#CE9178", marginBottom: 8, fontWeight: 700 }}>VPC: <code style={{ color: "#FF9900" }}>10.0.0.0/16</code> = 65,536 IPs</div>
                {[
                  ["10.0.1.0/24", "Public Subnet AZ-a", "#4caf50"],
                  ["10.0.2.0/24", "Public Subnet AZ-b", "#4caf50"],
                  ["10.0.3.0/24", "Private Subnet AZ-a", "#00bcd4"],
                  ["10.0.4.0/24", "Private Subnet AZ-b", "#00bcd4"],
                ].map(([cidr, label, color]) => (
                  <div key={cidr} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                    <code style={{ color, fontSize: 10.5, minWidth: 100 }}>{cidr}</code>
                    <span style={{ fontSize: 10, color: "#888" }}>→</span>
                    <span style={{ fontSize: 10.5, color: "rgba(255,255,255,0.7)" }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <H2>🗺️ What is a Route Table?</H2>
        <div style={{ background: "#f9f9f9", borderRadius: 10, padding: "14px", marginTop: 4, border: "1px solid #e0e0e0" }}>
          <div style={{ fontSize: 13.5, color: "#333", lineHeight: 1.7, marginBottom: 10 }}>
            A route table = the <b style={{ color: "#1a73e8" }}>GPS navigation for your VPC traffic</b>. It tells AWS:<br />
            <em>"When traffic wants to go to <b>this destination</b>, send it <b>that way</b>."</em><br />
            Every subnet must be associated with exactly ONE route table. The route table is what truly makes a subnet public or private.
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 12, color: "#2e7d32", marginBottom: 6, display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ background: "#4caf50", color: "white", borderRadius: 4, padding: "2px 7px", fontSize: 10 }}>PUBLIC</span> Route Table
              </div>
              <div style={{ borderRadius: 8, overflow: "hidden", border: "2px solid #4caf5050" }}>
                <div style={{ background: "#2e7d32", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", padding: "6px 8px" }}>
                  {["Destination", "Target", "Meaning"].map(h => <div key={h} style={{ fontSize: 10, fontWeight: 700, color: "white" }}>{h}</div>)}
                </div>
                {[["10.0.0.0/16", "local", "Stay inside VPC"], ["0.0.0.0/0", "igw-xxx", "→ Internet ✅"]].map((row, i) => (
                  <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", padding: "7px 8px", borderTop: "1px solid #e0e0e0", background: i === 1 ? "#f0fff0" : "white" }}>
                    <code style={{ fontSize: 10.5, color: "#1a73e8" }}>{row[0]}</code>
                    <code style={{ fontSize: 10.5, color: i === 1 ? "#2e7d32" : "#888", fontWeight: i === 1 ? 700 : 400 }}>{row[1]}</code>
                    <span style={{ fontSize: 10.5, color: i === 1 ? "#2e7d32" : "#555", fontWeight: i === 1 ? 700 : 400 }}>{row[2]}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 6, fontSize: 11, color: "#2e7d32", fontWeight: 600, padding: "6px 8px", background: "rgba(76,175,80,0.1)", borderRadius: 5 }}>
                ⭐ <code style={{ background: "#e8f5e9", padding: "0 4px" }}>0.0.0.0/0 → igw</code> = this is what makes a subnet PUBLIC
              </div>
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 12, color: "#00697a", marginBottom: 6, display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ background: "#00bcd4", color: "white", borderRadius: 4, padding: "2px 7px", fontSize: 10 }}>PRIVATE</span> Route Table
              </div>
              <div style={{ borderRadius: 8, overflow: "hidden", border: "2px solid #00bcd450" }}>
                <div style={{ background: "#00697a", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", padding: "6px 8px" }}>
                  {["Destination", "Target", "Meaning"].map(h => <div key={h} style={{ fontSize: 10, fontWeight: 700, color: "white" }}>{h}</div>)}
                </div>
                {[["10.0.0.0/16", "local", "Stay inside VPC"], ["(no other rules)", "—", "Internet blocked ❌"]].map((row, i) => (
                  <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", padding: "7px 8px", borderTop: "1px solid #e0e0e0", background: i === 1 ? "#fff5f5" : "white" }}>
                    <code style={{ fontSize: 10.5, color: "#1a73e8" }}>{row[0]}</code>
                    <code style={{ fontSize: 10.5, color: i === 1 ? "#d32f2f" : "#888", fontWeight: i === 1 ? 700 : 400 }}>{row[1]}</code>
                    <span style={{ fontSize: 10.5, color: i === 1 ? "#d32f2f" : "#555", fontWeight: i === 1 ? 700 : 400 }}>{row[2]}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 6, fontSize: 11, color: "#00697a", fontWeight: 600, padding: "6px 8px", background: "rgba(0,188,212,0.1)", borderRadius: 5 }}>
                ⭐ No IGW route = nothing from internet can get in = PRIVATE
              </div>
            </div>
          </div>
        </div>

        <Callout icon="🎯" label="Exam Tip"
          text="Public subnet = has 0.0.0.0/0 → Internet Gateway in its route table. Private subnet = no such route. CIDR /16 = 65,536 IPs (VPC). /24 = 256 IPs (subnet). Route table = the GPS routing rules. Each subnet has exactly ONE route table. The 0.0.0.0/0 → igw rule is what truly makes a subnet public." color={accent} />
      </div>
    );

    case "gateways": return (
      <div>
        <Body>
          Gateways are the <b>doors in and out of your VPC</b>. The type of door determines who can enter,
          and how traffic travels to get there.
        </Body>

        {/* Screenshot 3 recreated — Internet Gateway flow */}
        <H2>🌐 Internet Gateway — Public Traffic</H2>
        <svg width="100%" viewBox="0 0 500 110" style={{ display: "block", margin: "8px 0", borderRadius: 10, border: "1px solid #e0e0e0", background: "white" }}>
          {/* Client */}
          <rect x={10} y={30} width={60} height={50} rx="6" fill="#f5f5f5" stroke="#ddd" strokeWidth="1" />
          <text x={40} y={52} textAnchor="middle" fontSize="18">💻</text>
          <text x={40} y={70} textAnchor="middle" fontSize="8" fill="#555">Client</text>
          {/* Arrow + Internet */}
          <line x1={72} y1={55} x2={108} y2={55} stroke="#888" strokeWidth="1.2" />
          <text x={90} y={47} textAnchor="middle" fontSize="7.5" fill="#888">Internet</text>
          <polygon points="108,51 108,59 114,55" fill="#888" />
          {/* IGW */}
          <circle cx={130} cy={55} r={18} fill="#E8EAF6" stroke="#3949ab" strokeWidth="1.5" />
          <text x={130} y={60} textAnchor="middle" fontSize="16">🚪</text>
          <text x={130} y={85} textAnchor="middle" fontSize="8" fontWeight="700" fill="#3949ab">Internet</text>
          <text x={130} y={95} textAnchor="middle" fontSize="8" fontWeight="700" fill="#3949ab">gateway</text>
          {/* Arrow to VPC */}
          <line x1={150} y1={55} x2={188} y2={55} stroke="#0f9d58" strokeWidth="1.5" />
          <polygon points="188,51 188,59 194,55" fill="#0f9d58" />
          {/* VPC + subnet */}
          <rect x={196} y={14} width={290} height={82} rx="8" fill="#f9f9f9" stroke="#6a1b9a" strokeWidth="1.2" />
          <text x={210} y={28} fontSize="8" fontWeight="700" fill="#6a1b9a">Amazon VPC</text>
          <rect x={210} y={34} width={265} height={55} rx="6" fill="#E8F5E9" stroke="#0f9d58" strokeWidth="1" strokeDasharray="4 2" />
          <text x={222} y={47} fontSize="7.5" fontWeight="700" fill="#0f9d58">🔒 Public Subnet</text>
          {[240, 295, 350, 405].map((x, i) => (
            <g key={i}>
              <rect x={x} y={52} width={34} height={24} rx="4" fill="#FF990025" stroke="#FF9900" strokeWidth="0.8" />
              <text x={x+17} y={67} textAnchor="middle" fontSize="11">🖥️</text>
            </g>
          ))}
          <text x={340} y={85} textAnchor="middle" fontSize="8" fill="#0f9d58">Amazon EC2 instances</text>
          <text x={340} y={100} textAnchor="middle" fontSize="7.5" fill="#555">A client sends a request through the internet into the VPC via the Internet Gateway.</text>
        </svg>

        {/* Screenshot 4 recreated — Virtual Private Gateway / VPN */}
        <H2>🔒 Virtual Private Gateway — Private/VPN Traffic</H2>
        <svg width="100%" viewBox="0 0 500 130" style={{ display: "block", margin: "8px 0", borderRadius: 10, border: "1px solid #e0e0e0", background: "white" }}>
          {/* Corporate DC */}
          <rect x={10} y={20} width={110} height={90} rx="8" fill="#f5f5f5" stroke="#546e7a" strokeWidth="1.2" />
          <text x={65} y={40} textAnchor="middle" fontSize="9" fontWeight="700" fill="#546e7a">Corporate</text>
          <text x={65} y={52} textAnchor="middle" fontSize="9" fontWeight="700" fill="#546e7a">data center</text>
          <text x={65} y={68} textAnchor="middle" fontSize="16">🏢</text>
          <text x={65} y={88} textAnchor="middle" fontSize="8" fill="#546e7a">Content router</text>
          <text x={65} y={98} textAnchor="middle" fontSize="8" fill="#546e7a">or firewall</text>
          {/* Internet + VPN labels */}
          <text x={155} y={48} textAnchor="middle" fontSize="8" fill="#888">☁️ Internet</text>
          <text x={155} y={75} textAnchor="middle" fontSize="8" fill="#6a1b9a">🔐 VPN</text>
          <text x={155} y={86} textAnchor="middle" fontSize="8" fill="#6a1b9a">connection</text>
          {/* Arrow */}
          <line x1={122} y1={65} x2={190} y2={65} stroke="#6a1b9a" strokeWidth="1.5" strokeDasharray="5 3" />
          <polygon points="190,61 190,69 196,65" fill="#6a1b9a" />
          {/* VPG */}
          <circle cx={215} cy={65} r={20} fill="#EDE7F6" stroke="#6a1b9a" strokeWidth="1.5" />
          <text x={215} y={70} textAnchor="middle" fontSize="18">🔒</text>
          <text x={215} y={94} textAnchor="middle" fontSize="7.5" fontWeight="700" fill="#6a1b9a">Virtual</text>
          <text x={215} y={104} textAnchor="middle" fontSize="7.5" fontWeight="700" fill="#6a1b9a">private gateway</text>
          {/* Arrow to VPC */}
          <line x1={237} y1={65} x2={268} y2={65} stroke="#6a1b9a" strokeWidth="1.5" />
          <polygon points="268,61 268,69 274,65" fill="#6a1b9a" />
          {/* VPC + private subnet */}
          <rect x={276} y={14} width={215} height={102} rx="8" fill="#f9f9f9" stroke="#6a1b9a" strokeWidth="1.2" />
          <text x={290} y={30} fontSize="8" fontWeight="700" fill="#6a1b9a">Amazon VPC</text>
          <rect x={290} y={36} width={190} height={72} rx="6" fill="#E0F2F1" stroke="#00897b" strokeWidth="1" />
          <text x={305} y={50} fontSize="7.5" fontWeight="700" fill="#00897b">🔒 Private Subnet</text>
          {[310, 360, 410].map((x, i) => (
            <g key={i}>
              <rect x={x} y={55} width={28} height={20} rx="3" fill="#00897b20" stroke="#00897b" strokeWidth="0.8" />
              <text x={x+14} y={68} textAnchor="middle" fontSize="11">🗄️</text>
            </g>
          ))}
          <text x={385} y={95} textAnchor="middle" fontSize="7.5" fill="#00897b">Databases</text>
          <text x={250} y={124} textAnchor="middle" fontSize="7.5" fill="#555">VPN travels over internet (encrypted) → Virtual Private Gateway → Private subnet</text>
        </svg>

        <KV rows={[
          ["Internet Gateway (IGW)", "Connects VPC to public internet. Required for public subnets. Like the front door of a coffee shop — anyone can walk in.", "#0f9d58"],
          ["Virtual Private Gateway", "AWS side of a VPN connection. Only approved corporate networks get in. Like a badge-controlled side entrance.", "#6a1b9a"],
          ["NAT Gateway", "Lets private subnet resources call outbound internet (updates, APIs) WITHOUT being reachable from internet inbound.", "#FF9900"],
        ]} />
        <Callout icon="🎯" label="Exam Tip"
          text="Internet Gateway = public internet traffic. Virtual Private Gateway = encrypted VPN from corporate DC to VPC (still travels over internet). VPN uses internet but encrypts the tunnel. Direct Connect = completely bypasses internet with private fiber." color={accent} />
      </div>
    );

    case "direct-connect": return (
      <div>
        <Body>
          AWS Direct Connect establishes a <b>completely private, dedicated fiber connection</b> from your
          corporate data center directly to AWS. No public internet involved — ever. You work with a
          Direct Connect partner who physically connects your network to the AWS Direct Connect location.
        </Body>
        <Analogy icon="✨" label="Magic Doorway Analogy"
          text="Imagine you had a secret magic doorway in your office that led directly into the AWS data center — bypassing all public roads, traffic jams, and shared highways. That's Direct Connect. Your data travels on a private, dedicated highway that only you use. No congestion, no sharing, consistent speed every time."
          color="#1a73e8" />
        <H2>VPN vs Direct Connect — Architecture Comparison</H2>
        <DirectConnectDiagram />
        <H2>Direct Connect Key Facts</H2>
        <KV rows={[
          ["Connection type", "Dedicated private fiber line. Physically runs from your data center to an AWS Direct Connect location.", "#1a73e8"],
          ["Speed", "1 Gbps to 100 Gbps dedicated bandwidth. Consistent performance — no internet congestion.", "#0f9d58"],
          ["Privacy", "Traffic NEVER touches the public internet. Ideal for compliance and regulatory requirements.", "#d32f2f"],
          ["Latency", "Predictable, consistent low latency. No variation from internet congestion.", "#FF9900"],
          ["Setup time", "Weeks to months — requires physical cabling. VPN can be set up in minutes.", "#6a1b9a"],
          ["Cost", "Higher upfront cost. Cheaper per-GB at high volume compared to internet data transfer.", "#546e7a"],
        ]} />
        <H2>Direct Connect + VPN: Best of Both Worlds</H2>
        <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 6 }}>
          {[
            { title: "Direct Connect as Primary + VPN as Failover", color: "#1a73e8", desc: "Direct Connect handles normal high-volume traffic. If the physical line is cut (disaster), VPN automatically takes over as backup. Ensures business continuity." },
            { title: "Multiple Direct Connect Lines", color: "#0f9d58", desc: "Run two Direct Connect connections for redundancy AND increased aggregate bandwidth. If one fails, the other handles traffic. Combined bandwidth = sum of both lines." },
          ].map(({ title, color, desc }) => (
            <div key={title} style={{ border: `1px solid ${color}30`, borderLeft: `3px solid ${color}`, borderRadius: 8, padding: "10px 13px" }}>
              <div style={{ fontWeight: 700, fontSize: 12, color, marginBottom: 4 }}>{title}</div>
              <div style={{ fontSize: 12.5, color: "#555", lineHeight: 1.55 }}>{desc}</div>
            </div>
          ))}
        </div>
        <Callout icon="🎯" label="Exam Tip"
          text="Direct Connect = physical dedicated line, NOT internet, high bandwidth, low latency, compliance-friendly. VPN = encrypted tunnel over internet, cheaper, faster to set up. Common pattern: Direct Connect primary + VPN failover. Also: combine multiple Direct Connect lines for more bandwidth." color={accent} />
      </div>
    );

    case "security-groups": return (
      <div>
        <Body>
          AWS provides two layers of network security inside your VPC:
          <b> Security Groups</b> (at the instance level) and <b>Network ACLs / NACLs</b> (at the subnet level).
          Together they act like two security checkpoints for your traffic.
        </Body>
        <H2>Full VPC Security Architecture</H2>
        <FullVPCArchDiagram />
        <H2>Security Groups</H2>
        <Analogy icon="🏠" label="Bouncer at the Door Analogy"
          text="A Security Group is like a bouncer at the entrance of a VIP room. They check everyone trying to get in (inbound rules) and out (outbound rules). By default, they let nothing in (deny all) but allow everything out. You must explicitly add rules to allow specific traffic."
          color="#d32f2f" />
        <KV rows={[
          ["What it is", "Virtual firewall at the EC2 INSTANCE level. Controls what traffic can reach individual instances.", "#d32f2f"],
          ["Default behaviour", "Deny ALL inbound traffic. Allow ALL outbound traffic.", "#d32f2f"],
          ["Stateful", "If you allow an inbound connection, the response traffic is automatically allowed back out. You don't need a separate outbound rule.", "#0f9d58"],
          ["Rules", "Allow rules only — you cannot create explicit deny rules. Traffic is denied by default if no rule matches.", "#FF9900"],
          ["Example", 'Allow port 80 (HTTP) from 0.0.0.0/0 (everyone). Allow port 443 (HTTPS). Allow port 22 (SSH) only from your office IP.', "#1a73e8"],
        ]} />
        <H2>Network ACLs (NACLs)</H2>
        <Analogy icon="🏙️" label="Customs at the Border Analogy"
          text="NACLs are like customs at an international border — they check every single packet entering OR leaving the entire country (subnet). They can explicitly ALLOW or DENY specific traffic. Unlike a bouncer (Security Group), customs doesn't remember you from your last visit — each packet is checked independently."
          color="#546e7a" />
        <KV rows={[
          ["What it is", "Firewall at the SUBNET level. Controls traffic entering and leaving an entire subnet.", "#546e7a"],
          ["Default behaviour", "Default NACL allows ALL traffic in and out. Custom NACLs deny ALL by default.", "#546e7a"],
          ["Stateless", "Must create both inbound AND outbound rules explicitly. Return traffic is NOT automatically allowed.", "#d32f2f"],
          ["Rules", "Both ALLOW and DENY rules. Rules are evaluated in number order (lowest first). First match wins.", "#FF9900"],
          ["Example", "Deny all traffic from a specific malicious IP range at the subnet level before it even reaches instances.", "#1a73e8"],
        ]} />
        <H2>Security Group vs NACL — Quick Comparison</H2>
        <div style={{ borderRadius: 8, overflow: "hidden", border: "1px solid #e0e0e0", marginTop: 8 }}>
          {[
            ["", "Security Group", "Network ACL (NACL)"],
            ["Level", "Instance (EC2)", "Subnet"],
            ["State", "Stateful (remembers connections)", "Stateless (every packet checked)"],
            ["Rules", "Allow only", "Allow AND Deny"],
            ["Default", "Deny all inbound", "Allow all (default NACL)"],
            ["Rule evaluation", "All rules evaluated", "Rules in number order, first match"],
            ["Best for", "Fine-grained instance control", "Broad subnet-level protection"],
          ].map((row, i) => (
            <div key={i} style={{
              display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
              borderBottom: i < 6 ? "1px solid #f0f0f0" : "none",
              background: i === 0 ? "#263238" : i % 2 === 0 ? "#fafafa" : "white",
            }}>
              {row.map((cell, j) => (
                <div key={j} style={{
                  padding: "7px 10px", fontSize: i === 0 ? 11 : 12,
                  fontWeight: i === 0 || j === 0 ? 700 : 400,
                  color: i === 0 ? ["#FF9900","#ef9a9a","#90caf9"][j] || "#FF9900"
                       : j === 0 ? "#333"
                       : j === 1 ? "#d32f2f"
                       : "#1a73e8",
                  borderRight: j < 2 ? "1px solid #f0f0f0" : "none",
                  lineHeight: 1.45,
                }}>{cell}</div>
              ))}
            </div>
          ))}
        </div>
        <Callout icon="🎯" label="Exam Tip"
          text="Security Groups = stateful, instance-level, allow-only rules. NACLs = stateless, subnet-level, allow AND deny rules. Use both together for layered defence. Security Groups are the first thing to check when an EC2 instance can't be reached." color={accent} />
      </div>
    );

    case "global-arch": return (
      <div>
        <Body>
          Real-world companies don't run a single VPC. They operate across <b>multiple Regions, multiple VPCs,
          and multiple accounts</b> — connected by VPNs, Direct Connect, CloudFront, and Route 53.
          Here's how it all fits together.
        </Body>
        <H2>Global Multi-Region Architecture</H2>
        <GlobalArchDiagram />
        <H2>How Global Traffic Flows</H2>
        <div style={{ display: "flex", flexDirection: "column", gap: 5, marginTop: 6 }}>
          {[
            { step: "1", title: "User makes a request", desc: "User types example.com. Browser sends DNS query.", color: "#1a73e8" },
            { step: "2", title: "Route 53 resolves DNS", desc: "Route 53 receives the query. Uses latency-based routing to determine which Region is closest to the user.", color: "#6a1b9a" },
            { step: "3", title: "Routes to CloudFront edge", desc: "Route 53 directs user to the nearest CloudFront edge location — could be Tokyo, London, São Paulo, etc.", color: "#FF9900" },
            { step: "4", title: "CloudFront serves content", desc: "If content is cached at the edge → served instantly. If not → CloudFront fetches from origin server in the chosen Region.", color: "#0f9d58" },
            { step: "5", title: "Origin serves from multi-AZ VPC", desc: "The origin server lives in a VPC with resources across multiple AZs for high availability. ELB distributes traffic across EC2 instances.", color: "#d32f2f" },
          ].map(({ step, title, desc, color }) => (
            <div key={step} style={{
              display: "flex", gap: 10, alignItems: "flex-start",
              background: "#fafafa", border: "1px solid #f0f0f0", borderRadius: 8, padding: "9px 12px",
            }}>
              <div style={{
                width: 26, height: 26, borderRadius: "50%", background: color,
                color: "white", fontWeight: 700, fontSize: 12, flexShrink: 0,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>{step}</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 12.5, color, marginBottom: 2 }}>{title}</div>
                <div style={{ fontSize: 12.5, color: "#555", lineHeight: 1.5 }}>{desc}</div>
              </div>
            </div>
          ))}
        </div>
        <H2>VPC + VPN Connection — Real Business Scenario</H2>
        <div style={{ border: "1px solid #1a73e830", borderRadius: 9, padding: "12px 14px", marginTop: 4, background: "#E3F2FD" + "30" }}>
          <div style={{ fontWeight: 700, fontSize: 13, color: "#1a73e8", marginBottom: 6 }}>🏦 Financial Services Company</div>
          <div style={{ fontSize: 12.5, color: "#555", lineHeight: 1.65 }}>
            A bank has 5,000 employees working from offices and home. Sensitive customer data lives in AWS
            private subnets. Remote employees connect via <b>VPN → Virtual Private Gateway → VPC private subnets</b>.
            High-volume data transfers between the main data center and AWS use <b>Direct Connect</b> for compliance
            and performance. The customer-facing banking website runs in <b>public subnets behind ELB</b>, served
            globally via <b>CloudFront</b>, with <b>Route 53</b> routing users to the nearest Region.
            Security Groups and NACLs enforce strict access controls at every layer.
          </div>
        </div>
        <Callout icon="🎯" label="Exam Tip"
          text="Route 53 = DNS + latency/failover routing. CloudFront = CDN cache at edge locations. VPC = isolated private network. Multiple VPCs in multiple Regions = global high-availability architecture. VPN + Direct Connect can be combined for redundancy." color={accent} />
      </div>
    );

    case "connections": return (
      <div>
        <Body>
          Companies have offices, data centers, remote workers, and other cloud accounts.
          AWS gives you <b>4 different ways to connect all of them</b> to your VPC — each designed for a different scenario.
          Understanding WHICH to use WHEN is the key.
        </Body>

        {/* The confusion-busting mega comparison */}
        <div style={{ background: "#263238", borderRadius: 10, padding: "12px 14px", marginTop: 8, marginBottom: 14 }}>
          <div style={{ fontWeight: 700, fontSize: 12, color: accent, marginBottom: 10 }}>🧠 The Simple Version — Before diving in</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 6 }}>
            {[
              { icon: "👤", name: "Client VPN", q: "Who uses it?", a: "Individual remote workers", color: "#1a73e8" },
              { icon: "🏢", name: "Site-to-Site VPN", q: "Who uses it?", a: "Whole offices / data centers", color: "#0f9d58" },
              { icon: "🔗", name: "PrivateLink", q: "Who uses it?", a: "VPCs talking to other VPCs/services", color: "#d32f2f" },
              { icon: "⚡", name: "Direct Connect", q: "Who uses it?", a: "High-volume data center traffic", color: "#FF9900" },
            ].map(({ icon, name, q, a, color }) => (
              <div key={name} style={{ background: color + "20", border: `1px solid ${color}40`, borderRadius: 8, padding: "10px 8px", textAlign: "center" }}>
                <div style={{ fontSize: 22, marginBottom: 4 }}>{icon}</div>
                <div style={{ fontWeight: 700, fontSize: 11, color, marginBottom: 6 }}>{name}</div>
                <div style={{ fontSize: 9.5, color: "rgba(255,255,255,0.5)", marginBottom: 2 }}>{q}</div>
                <div style={{ fontSize: 10.5, color: "rgba(255,255,255,0.85)", lineHeight: 1.4 }}>{a}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 1. Client VPN — with screenshot 5 style diagram */}
        <div style={{ border: "1px solid #1a73e830", borderRadius: 10, overflow: "hidden", marginBottom: 10 }}>
          <div style={{ background: "#1a73e8", padding: "10px 14px", display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 22 }}>👤</span>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14, color: "white" }}>1. AWS Client VPN</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.85)" }}>Remote workers → VPC (individual laptops, phones)</div>
            </div>
          </div>
          <div style={{ padding: "12px 14px", background: "white" }}>
            {/* Screenshot 5 style diagram */}
            <svg width="100%" viewBox="0 0 460 100" style={{ display: "block", marginBottom: 10 }}>
              {/* Globe */}
              <circle cx={200} cy={50} r={40} fill="#00838f20" stroke="#00838f" strokeWidth="1.2" />
              <ellipse cx={200} cy={50} rx={15} ry={40} fill="none" stroke="#00838f" strokeWidth="0.7" />
              <line x1={160} y1={50} x2={240} y2={50} stroke="#00838f" strokeWidth="0.7" />
              <text x={200} y={54} textAnchor="middle" fontSize="11" fontWeight="700" fill="#00838f">🌐</text>
              {/* Remote workers around the globe */}
              {[
                { cx: 70, cy: 20, angle: "↘" }, { cx: 310, cy: 20, angle: "↙" }, { cx: 70, cy: 80, angle: "↗" }, { cx: 310, cy: 80, angle: "↖" },
              ].map(({ cx, cy }, i) => (
                <g key={i}>
                  <circle cx={cx} cy={cy} r={15} fill="#1a73e820" stroke="#1a73e8" strokeWidth="1" />
                  <text x={cx} y={cy + 5} textAnchor="middle" fontSize="13">👤</text>
                  <line x1={cx + (cx < 200 ? 14 : -14)} y1={cy} x2={cx < 200 ? 162 : 238} y2={cy < 50 ? 22 : 78} stroke="#1a73e8" strokeWidth="1" strokeDasharray="3 2" />
                </g>
              ))}
              <text x={200} y={93} textAnchor="middle" fontSize="8" fill="#555">Remote workers connect from anywhere via OpenVPN client</text>
              <text x={378} y={30} fontSize="8" fontWeight="700" fill="#1a73e8">VPC</text>
              <rect x={360} y={35} width={90} height={35} rx="6" fill="#1a73e820" stroke="#1a73e8" strokeWidth="1" />
              <text x={405} y={57} textAnchor="middle" fontSize="9" fill="#1a73e8">AWS Resources</text>
              <line x1={325} y1={50} x2={358} y2={50} stroke="#1a73e8" strokeWidth="1.2" />
              <polygon points="358,46 358,54 364,50" fill="#1a73e8" />
            </svg>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              <div style={{ background: "#E3F2FD", borderRadius: 7, padding: "8px 10px" }}>
                <div style={{ fontWeight: 700, fontSize: 11, color: "#1a73e8", marginBottom: 4 }}>✅ What it is</div>
                <div style={{ fontSize: 12, color: "#555", lineHeight: 1.55 }}>A managed VPN service. Remote workers install an OpenVPN app on their laptop and connect. AWS scales it automatically — no hardware needed.</div>
              </div>
              <div style={{ background: "#f5f5f5", borderRadius: 7, padding: "8px 10px" }}>
                <div style={{ fontWeight: 700, fontSize: 11, color: "#1a73e8", marginBottom: 4 }}>💼 Real Scenario</div>
                <div style={{ fontSize: 12, color: "#555", lineHeight: 1.55 }}>Company acquires 500 remote employees. All need immediate access to internal AWS apps. Client VPN = each person installs VPN app, connects securely in minutes.</div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Site-to-Site VPN — with screenshot 6 style diagram */}
        <div style={{ border: "1px solid #0f9d5830", borderRadius: 10, overflow: "hidden", marginBottom: 10 }}>
          <div style={{ background: "#0f9d58", padding: "10px 14px", display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 22 }}>🏢</span>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14, color: "white" }}>2. AWS Site-to-Site VPN</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.85)" }}>Whole offices / data centers → VPC (encrypted tunnel over internet)</div>
            </div>
          </div>
          <div style={{ padding: "12px 14px", background: "white" }}>
            {/* Screenshot 6 style: multiple sites → VPG → VPC */}
            <svg width="100%" viewBox="0 0 480 130" style={{ display: "block", marginBottom: 10 }}>
              {/* Cloud / VPC */}
              <ellipse cx={240} cy={40} rx={70} ry={38} fill="#e8f5e9" stroke="#0f9d58" strokeWidth="1.5" />
              <text x={240} y={32} textAnchor="middle" fontSize="9" fontWeight="700" fill="#0f9d58">VPC</text>
              <text x={240} y={46} textAnchor="middle" fontSize="16">☁️</text>
              <text x={240} y={62} textAnchor="middle" fontSize="8" fill="#0f9d58">Virtual private gateway</text>
              {/* VPN connections label */}
              <text x={240} y={82} textAnchor="middle" fontSize="8" fill="#888">VPN connections</text>
              {/* Three sites at bottom */}
              {[
                { x: 35, label: "Branch\noffice", icon: "🏠", color: "#1565c0" },
                { x: 185, label: "Data\ncenter", icon: "🏢", color: "#0f9d58" },
                { x: 335, label: "Manufacturing\nsite", icon: "🏭", color: "#6a1b9a" },
              ].map(({ x, label, icon, color }) => (
                <g key={label}>
                  <rect x={x} y={90} width={90} height={34} rx="8" fill={color + "25"} stroke={color} strokeWidth="1.2" />
                  <text x={x + 15} y={112} fontSize="16">{icon}</text>
                  {label.split("\n").map((l, i) => (
                    <text key={i} x={x + 50} y={104 + i * 13} textAnchor="middle" fontSize="7.5" fill={color}>{l}</text>
                  ))}
                  {/* VPN lock + line to cloud */}
                  <circle cx={x + 45} cy={82} r={7} fill={color + "30"} stroke={color} strokeWidth="1" />
                  <text x={x + 45} y={86} textAnchor="middle" fontSize="9">🔐</text>
                  <line x1={x + 45} y1={73} x2={240} y2={62} stroke={color} strokeWidth="1" strokeDasharray="3 2" />
                </g>
              ))}
              <text x={240} y={126} textAnchor="middle" fontSize="7.5" fill="#555">One VPG in VPC connects to many sites via encrypted VPN tunnels over internet</text>
            </svg>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              <div style={{ background: "#e8f5e9", borderRadius: 7, padding: "8px 10px" }}>
                <div style={{ fontWeight: 700, fontSize: 11, color: "#0f9d58", marginBottom: 4 }}>✅ Key facts</div>
                <div style={{ fontSize: 12, color: "#555", lineHeight: 1.55 }}>Encrypted tunnel. Travels over public internet. One Virtual Private Gateway connects to many branch offices. Quick to set up. Shared internet bandwidth.</div>
              </div>
              <div style={{ background: "#f5f5f5", borderRadius: 7, padding: "8px 10px" }}>
                <div style={{ fontWeight: 700, fontSize: 11, color: "#0f9d58", marginBottom: 4 }}>💼 Real Scenario</div>
                <div style={{ fontSize: 12, color: "#555", lineHeight: 1.55 }}>Manufacturing company connects 3 sites (factory, HQ, DC) all to AWS. Each site gets its own VPN connection to the same Virtual Private Gateway.</div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. PrivateLink */}
        <div style={{ border: "1px solid #d32f2f30", borderRadius: 10, overflow: "hidden", marginBottom: 10 }}>
          <div style={{ background: "#d32f2f", padding: "10px 14px", display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 22 }}>🔗</span>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14, color: "white" }}>3. AWS PrivateLink</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.85)" }}>VPC → other VPCs / AWS services (no internet, no gateway needed)</div>
            </div>
          </div>
          <div style={{ padding: "12px 14px", background: "white" }}>
            <svg width="100%" viewBox="0 0 460 90" style={{ display: "block", marginBottom: 10 }}>
              {/* Your VPC */}
              <rect x={10} y={20} width={130} height={55} rx="8" fill="#fce4ec" stroke="#d32f2f" strokeWidth="1.2" />
              <text x={75} y={38} textAnchor="middle" fontSize="9" fontWeight="700" fill="#d32f2f">Your VPC</text>
              <text x={75} y={52} textAnchor="middle" fontSize="13">🖥️</text>
              <text x={75} y={66} textAnchor="middle" fontSize="8" fill="#d32f2f">Your app</text>
              {/* PrivateLink tunnel */}
              <rect x={152} y={35} width={130} height={25} rx="12" fill="#d32f2f15" stroke="#d32f2f" strokeWidth="1.2" strokeDasharray="4 2" />
              <text x={217} y={51} textAnchor="middle" fontSize="9" fontWeight="700" fill="#d32f2f">🔗 PrivateLink</text>
              {/* Service VPC */}
              <rect x={295} y={20} width={155} height={55} rx="8" fill="#fce4ec" stroke="#d32f2f" strokeWidth="1.2" />
              <text x={372} y={38} textAnchor="middle" fontSize="9" fontWeight="700" fill="#d32f2f">Service VPC / AWS Service</text>
              <text x={372} y={52} textAnchor="middle" fontSize="13">⚙️</text>
              <text x={372} y={66} textAnchor="middle" fontSize="8" fill="#d32f2f">S3 / RDS / Partner API</text>
              <text x={230} y={84} textAnchor="middle" fontSize="8" fill="#555">Private network path — traffic NEVER touches the public internet</text>
            </svg>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              <div style={{ background: "#fce4ec30", borderRadius: 7, padding: "8px 10px", border: "1px solid #d32f2f20" }}>
                <div style={{ fontWeight: 700, fontSize: 11, color: "#d32f2f", marginBottom: 4 }}>✅ Key facts</div>
                <div style={{ fontSize: 12, color: "#555", lineHeight: 1.55 }}>No internet gateway, no NAT, no public IP needed. Traffic stays on AWS private network. Used to access AWS services (S3, DynamoDB) or other VPCs privately.</div>
              </div>
              <div style={{ background: "#f5f5f5", borderRadius: 7, padding: "8px 10px" }}>
                <div style={{ fontWeight: 700, fontSize: 11, color: "#d32f2f", marginBottom: 4 }}>💼 Real Scenario</div>
                <div style={{ fontSize: 12, color: "#555", lineHeight: 1.55 }}>SaaS vendor exposes their API to customers' VPCs privately. Customers connect without internet exposure. Much simpler than VPN peering.</div>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Direct Connect — with screenshot 7 style diagram */}
        <div style={{ border: "1px solid #FF990030", borderRadius: 10, overflow: "hidden", marginBottom: 10 }}>
          <div style={{ background: "#FF9900", padding: "10px 14px", display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 22 }}>⚡</span>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14, color: "white" }}>4. AWS Direct Connect</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.85)" }}>Data center → VPC (dedicated private fiber — NOT internet)</div>
            </div>
          </div>
          <div style={{ padding: "12px 14px", background: "white" }}>
            {/* Screenshot 7 style diagram */}
            <svg width="100%" viewBox="0 0 500 110" style={{ display: "block", marginBottom: 10 }}>
              {/* Corporate DC */}
              <rect x={5} y={25} width={90} height={60} rx="7" fill="#f5f5f5" stroke="#546e7a" strokeWidth="1" />
              <text x={50} y={43} textAnchor="middle" fontSize="8" fontWeight="700" fill="#546e7a">Corporate</text>
              <text x={50} y={54} textAnchor="middle" fontSize="8" fontWeight="700" fill="#546e7a">data center</text>
              <text x={32} y={68} textAnchor="middle" fontSize="11">🏢</text>
              <text x={68} y={68} textAnchor="middle" fontSize="8" fill="#546e7a">Router</text>
              {/* Arrow to DC location */}
              <line x1={97} y1={55} x2={118} y2={55} stroke="#FF9900" strokeWidth="2" />
              <polygon points="118,51 118,59 124,55" fill="#FF9900" />
              {/* DX Location box */}
              <rect x={126} y={15} width={155} height={80} rx="7" fill="#FFF3E0" stroke="#FF9900" strokeWidth="1.2" strokeDasharray="5 3" />
              <text x={203} y={30} textAnchor="middle" fontSize="8" fontWeight="700" fill="#FF9900">AWS Direct Connect location</text>
              <rect x={135} y={36} width={60} height={45} rx="5" fill="white" stroke="#FF9900" strokeWidth="0.7" strokeDasharray="3 2" />
              <text x={165} y={52} textAnchor="middle" fontSize="7.5" fill="#555">Customer or</text>
              <text x={165} y={62} textAnchor="middle" fontSize="7.5" fill="#555">partner router</text>
              <line x1={197} y1={58} x2={218} y2={58} stroke="#FF9900" strokeWidth="1" />
              <polygon points="218,54 218,62 224,58" fill="#FF9900" />
              <rect x={226} y={36} width={48} height={45} rx="5" fill="white" stroke="#FF9900" strokeWidth="0.7" strokeDasharray="3 2" />
              <text x={250} y={52} textAnchor="middle" fontSize="7" fill="#555">AWS Direct</text>
              <text x={250} y={62} textAnchor="middle" fontSize="7" fill="#555">Connect</text>
              <text x={250} y={72} textAnchor="middle" fontSize="7" fill="#555">endpoint</text>
              {/* Arrow to VPG */}
              <line x1={283} y1={55} x2={308} y2={55} stroke="#FF9900" strokeWidth="2" />
              <polygon points="308,51 308,59 314,55" fill="#FF9900" />
              {/* VPG */}
              <circle cx={328} cy={55} r={16} fill="#EDE7F6" stroke="#6a1b9a" strokeWidth="1.2" />
              <text x={328} y={60} textAnchor="middle" fontSize="13">🔒</text>
              <text x={328} y={80} textAnchor="middle" fontSize="7" fontWeight="700" fill="#6a1b9a">Virtual</text>
              <text x={328} y={89} textAnchor="middle" fontSize="7" fontWeight="700" fill="#6a1b9a">private gateway</text>
              {/* Arrow to VPC */}
              <line x1={346} y1={55} x2={368} y2={55} stroke="#6a1b9a" strokeWidth="1.5" />
              <polygon points="368,51 368,59 374,55" fill="#6a1b9a" />
              {/* AWS VPC */}
              <rect x={376} y={14} width={118} height={92} rx="7" fill="#f9f9f9" stroke="#6a1b9a" strokeWidth="1.2" />
              <text x={435} y={28} textAnchor="middle" fontSize="8" fontWeight="700" fill="#6a1b9a">Amazon VPC</text>
              <rect x={386} y={34} width={98} height={30} rx="5" fill="#E8F5E9" stroke="#0f9d58" strokeWidth="0.8" strokeDasharray="3 2" />
              <text x={435} y={48} textAnchor="middle" fontSize="7.5" fill="#0f9d58">🖥️ EC2 Subnet</text>
              <rect x={386} y={70} width={98} height={28} rx="5" fill="#E0F2F1" stroke="#00897b" strokeWidth="0.8" />
              <text x={435} y={83} textAnchor="middle" fontSize="7.5" fill="#00897b">🗄️ Private Subnet</text>
              <text x={250} y={104} textAnchor="middle" fontSize="7.5" fill="#555">Dedicated private fiber — NEVER touches the public internet</text>
            </svg>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              <div style={{ background: "#FFF3E0", borderRadius: 7, padding: "8px 10px" }}>
                <div style={{ fontWeight: 700, fontSize: 11, color: "#CC7A00", marginBottom: 4 }}>✅ Key facts</div>
                <div style={{ fontSize: 12, color: "#555", lineHeight: 1.55 }}>Physical dedicated fiber. NOT over internet. 1–100 Gbps. Consistent speed. Works with a Direct Connect partner. Takes weeks to set up (physical cabling).</div>
              </div>
              <div style={{ background: "#f5f5f5", borderRadius: 7, padding: "8px 10px" }}>
                <div style={{ fontWeight: 700, fontSize: 11, color: "#CC7A00", marginBottom: 4 }}>💼 Real Scenario</div>
                <div style={{ fontSize: 12, color: "#555", lineHeight: 1.55 }}>Media company transfers 500TB/month of video to AWS. Direct Connect 10Gbps line is far faster and cheaper per GB than internet transfer at that volume.</div>
              </div>
            </div>
          </div>
        </div>

        {/* Master comparison table */}
        <H2>⚖️ All 4 — Side by Side</H2>
        <div style={{ borderRadius: 8, overflow: "hidden", border: "1px solid #e0e0e0", marginTop: 4 }}>
          {[
            ["", "Client VPN 👤", "Site-to-Site VPN 🏢", "PrivateLink 🔗", "Direct Connect ⚡"],
            ["Who connects", "Individual remote workers", "Whole offices / data centers", "VPCs to VPCs/services", "Data centers (high volume)"],
            ["Uses internet?", "Yes (encrypted)", "Yes (encrypted)", "No (private AWS network)", "No (dedicated fiber)"],
            ["Setup time", "Minutes", "Hours", "Hours", "Weeks (physical)"],
            ["Speed", "Variable (internet)", "Variable (internet)", "High (private)", "1–100 Gbps (consistent)"],
            ["Cost", "Per user/hour", "Per connection/hour", "Per endpoint/data", "High upfront + hourly"],
            ["Best for", "WFH employees", "Branch offices, migration", "Accessing services privately", "Large data transfers, compliance"],
          ].map((row, i) => (
            <div key={i} style={{
              display: "grid", gridTemplateColumns: "0.9fr 1fr 1fr 1fr 1fr",
              borderBottom: i < 6 ? "1px solid #f0f0f0" : "none",
              background: i === 0 ? "#263238" : i % 2 === 0 ? "#fafafa" : "white",
            }}>
              {row.map((cell, j) => (
                <div key={j} style={{
                  padding: "6px 9px", fontSize: i === 0 ? 10 : 11.5,
                  fontWeight: i === 0 || j === 0 ? 700 : 400,
                  color: i === 0 ? ["#FF9900","#5BA3F5","#81C784","#ef9a9a","#FFB74D"][j] || "#FF9900"
                       : j === 0 ? "#333" : "#555",
                  borderRight: j < 4 ? "1px solid #f0f0f0" : "none",
                  lineHeight: 1.4,
                }}>{cell}</div>
              ))}
            </div>
          ))}
        </div>

        <Callout icon="🎯" label="Exam Tip — The Most Important Distinctions"
          text="Client VPN = individual remote workers. Site-to-Site VPN = entire offices/DCs, encrypted tunnel over internet. PrivateLink = VPC-to-VPC or VPC-to-service, no internet at all, no gateway needed. Direct Connect = dedicated physical fiber, NOT internet, for huge data volumes. VPN (both types) = uses internet but encrypted. Direct Connect + PrivateLink = never touch the internet." color="#6a1b9a" />
      </div>
    );

    case "security-nacl": return (
      <div>
        <Body>
          Inside your VPC, every packet travels through <b>two independent security checkpoints</b>:
          Network ACLs at the subnet boundary, and Security Groups at the instance level.
          Think of them as two layers of defence — each with different rules and behaviours.
        </Body>

        {/* Full VPC Architecture — matching screenshots 1 and 2 */}
        <H2>🏗️ Full VPC Security Architecture</H2>
        <div style={{ background: "#1a1a2e", borderRadius: 12, padding: 16, marginTop: 8, border: "2px solid #9c27b0" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
            <div style={{ background: "#FF9900", borderRadius: 4, padding: "2px 8px", fontSize: 10, fontWeight: 800, color: "white" }}>aws</div>
            <span style={{ color: "#ce93d8", fontSize: 11, fontWeight: 700 }}>Amazon Virtual Private Cloud (VPC)</span>
          </div>

          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            {/* Traffic source */}
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 11, color: "#4caf50", fontWeight: 700, marginBottom: 6 }}>Public traffic</div>
              <div style={{ fontSize: 9, color: "#888", marginBottom: 4 }}>🌐 Internet</div>
              <div style={{ width: 40, height: 2, background: "#4caf50", margin: "0 auto" }} />
            </div>
            <div style={{ color: "#4caf50", fontSize: 16 }}>→</div>

            {/* Internet Gateway */}
            <div style={{ border: "2px solid #9c27b0", borderRadius: 10, padding: "10px 8px", background: "rgba(156,39,176,0.2)", textAlign: "center" }}>
              <div style={{ fontSize: 20, marginBottom: 2 }}>🚪</div>
              <div style={{ fontSize: 8, color: "#ce93d8", fontWeight: 700, lineHeight: 1.3 }}>Internet<br />gateway</div>
            </div>
            <div style={{ color: "#4caf50", fontSize: 16 }}>→</div>

            {/* ELB Security Group */}
            <div style={{ border: "2px solid #e91e63", borderRadius: 8, padding: 8, background: "rgba(233,30,99,0.1)" }}>
              <div style={{ fontSize: 8, color: "#f48fb1", fontWeight: 700, marginBottom: 6, textAlign: "center" }}>Security group</div>
              <div style={{ border: "1px solid #e91e63", borderRadius: 6, padding: "8px 12px", background: "rgba(233,30,99,0.15)", textAlign: "center" }}>
                <div style={{ fontSize: 16, marginBottom: 2 }}>⚖️</div>
                <div style={{ fontSize: 8, color: "#f48fb1", fontWeight: 700 }}>Elastic Load<br />Balancer</div>
              </div>
            </div>
            <div style={{ color: "#4caf50", fontSize: 16 }}>→</div>

            {/* Auto Scaling + Security Group */}
            <div style={{ border: "2px dashed #FF9900", borderRadius: 8, padding: 8 }}>
              <div style={{ fontSize: 8, color: "#FF9900", fontWeight: 700, marginBottom: 4, textAlign: "center" }}>⚙️ Auto Scaling group</div>
              <div style={{ border: "2px solid #e91e63", borderRadius: 7, padding: 8, background: "rgba(233,30,99,0.1)" }}>
                <div style={{ fontSize: 8, color: "#f48fb1", fontWeight: 700, marginBottom: 6, textAlign: "center" }}>Security group</div>
                <div style={{ display: "flex", gap: 6 }}>
                  {["🖥️", "🖥️", "🖥️"].map((icon, i) => (
                    <div key={i} style={{ border: "1px solid #FF9900", borderRadius: 5, padding: "6px 8px", background: "rgba(255,152,0,0.15)", textAlign: "center" }}>
                      <div style={{ fontSize: 14 }}>{icon}</div>
                      <div style={{ fontSize: 7, color: "#FF9900" }}>EC2</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ color: "#4caf50", fontSize: 16 }}>→</div>

            {/* Database Security Group */}
            <div style={{ border: "2px solid #e91e63", borderRadius: 8, padding: 8, background: "rgba(233,30,99,0.1)" }}>
              <div style={{ fontSize: 8, color: "#f48fb1", fontWeight: 700, marginBottom: 6, textAlign: "center" }}>Security group</div>
              <div style={{ border: "1px solid #e91e63", borderRadius: 6, padding: "8px 12px", background: "rgba(233,30,99,0.15)", textAlign: "center" }}>
                <div style={{ fontSize: 16, marginBottom: 2 }}>🗄️</div>
                <div style={{ fontSize: 8, color: "#f48fb1", fontWeight: 700 }}>Database</div>
              </div>
            </div>
          </div>
          <div style={{ marginTop: 10, fontSize: 9.5, color: "rgba(255,255,255,0.5)", textAlign: "center" }}>
            Public traffic → Internet Gateway → ELB (Security Group) → EC2 instances (Security Group) → Database (Security Group)
          </div>
        </div>

        {/* NACL Diagram — screenshot 9 & 10 style */}
        <H2>🛃 Network ACLs (NACLs) — Subnet-Level Firewall</H2>
        <div style={{ background: "white", borderRadius: 10, padding: 14, border: "1px solid #e0e0e0", marginTop: 6 }}>
          {/* Airport analogy diagram */}
          <div style={{ background: "#e8f4f8", borderRadius: 8, padding: "12px 14px", marginBottom: 12, border: "2px solid #1a73e8" }}>
            <div style={{ fontWeight: 700, fontSize: 12, color: "#1a73e8", marginBottom: 8, textAlign: "center" }}>
              ✈️ NACL = Airport Passport Control (Subnet Traffic Control)
            </div>
            <div style={{ display: "flex", alignItems: "stretch", gap: 0 }}>
              {/* Arrival side */}
              <div style={{ flex: 1, textAlign: "center", padding: "8px 10px", background: "#1a73e815", borderRadius: "8px 0 0 8px", border: "1px solid #1a73e830" }}>
                <div style={{ fontSize: 20, marginBottom: 4 }}>🧑</div>
                <div style={{ fontSize: 11, color: "#1a73e8", fontWeight: 700, marginBottom: 4 }}>"Hey, I want to enter."</div>
                <div style={{ fontSize: 10, color: "#555" }}>Packet arrives at subnet</div>
              </div>
              {/* Passport officer IN */}
              <div style={{ background: "#1a73e8", padding: "8px 12px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 3 }}>
                <div style={{ fontSize: 16 }}>👮</div>
                <div style={{ fontSize: 9, color: "white", fontWeight: 700 }}>IN</div>
                <div style={{ fontSize: 8, color: "rgba(255,255,255,0.8)", textAlign: "center" }}>NACL checks<br />inbound list</div>
              </div>
              {/* Subnet */}
              <div style={{ flex: 1, textAlign: "center", padding: "8px 10px", background: "#FF990015", border: "2px dashed #FF9900" }}>
                <div style={{ fontSize: 10, color: "#FF9900", fontWeight: 700, marginBottom: 4 }}>Subnet</div>
                <div style={{ fontSize: 18 }}>🖥️ 🗄️</div>
                <div style={{ fontSize: 9, color: "#888" }}>Resources inside</div>
              </div>
              {/* Passport officer OUT */}
              <div style={{ background: "#1a73e8", padding: "8px 12px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 3 }}>
                <div style={{ fontSize: 16 }}>👮</div>
                <div style={{ fontSize: 9, color: "white", fontWeight: 700 }}>OUT</div>
                <div style={{ fontSize: 8, color: "rgba(255,255,255,0.8)", textAlign: "center" }}>NACL checks<br />outbound list</div>
              </div>
              {/* Exit side */}
              <div style={{ flex: 1, textAlign: "center", padding: "8px 10px", background: "#1a73e815", borderRadius: "0 8px 8px 0", border: "1px solid #1a73e830" }}>
                <div style={{ fontSize: 20, marginBottom: 4 }}>🧑‍💼</div>
                <div style={{ fontSize: 11, color: "#1a73e8", fontWeight: 700, marginBottom: 4 }}>"Hey, I want to exit."</div>
                <div style={{ fontSize: 10, color: "#555" }}>NACL checks again!</div>
              </div>
            </div>
            <div style={{ marginTop: 8, textAlign: "center", fontSize: 11, color: "#555" }}>
              <b>Default NACL:</b> "By default, all are welcome! By default, all can exit!" — allows everything in AND out.
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <div style={{ background: "#e8f5e9", borderRadius: 7, padding: "10px 12px", border: "1px solid #4caf5040" }}>
              <div style={{ fontWeight: 700, fontSize: 12, color: "#2e7d32", marginBottom: 6 }}>✅ Default NACL</div>
              <div style={{ fontSize: 12, color: "#555", lineHeight: 1.6 }}>
                Allows ALL inbound traffic in.<br />
                Allows ALL outbound traffic out.<br />
                AWS accounts start with this — safe to add rules later.
              </div>
            </div>
            <div style={{ background: "#fce4ec", borderRadius: 7, padding: "10px 12px", border: "1px solid #e91e6340" }}>
              <div style={{ fontWeight: 700, fontSize: 12, color: "#c62828", marginBottom: 6 }}>⚙️ Custom NACL</div>
              <div style={{ fontSize: 12, color: "#555", lineHeight: 1.6 }}>
                Denies ALL inbound and outbound by default.<br />
                You add explicit ALLOW rules (and DENY rules too).<br />
                Rules evaluated in number order — first match wins.
              </div>
            </div>
          </div>
        </div>

        {/* Security Groups — screenshot 6, 7 style */}
        <H2>🚪 Security Groups — Instance-Level Firewall</H2>
        <div style={{ background: "white", borderRadius: 10, padding: 14, border: "1px solid #e0e0e0", marginTop: 6 }}>
          {/* Building analogy */}
          <div style={{ background: "#fce4ec", borderRadius: 8, padding: "12px 14px", marginBottom: 12, border: "2px solid #e91e63" }}>
            <div style={{ fontWeight: 700, fontSize: 12, color: "#c62828", marginBottom: 8, textAlign: "center" }}>
              🏢 Security Group = Building Doorman (Instance Level)
            </div>
            <div style={{ display: "flex", gap: 10, alignItems: "stretch" }}>
              {/* Arrival */}
              <div style={{ flex: 1 }}>
                <div style={{ background: "#ffebee", borderRadius: 7, padding: "8px 10px", height: "100%", border: "1px solid #ef9a9a" }}>
                  <div style={{ textAlign: "center", marginBottom: 6 }}>
                    <div style={{ fontSize: 20 }}>🧑</div>
                    <div style={{ fontSize: 10, color: "#c62828", fontWeight: 700 }}>"Hey, I want to get in."</div>
                  </div>
                  <div style={{ fontSize: 10, color: "#888", textAlign: "center" }}>↓</div>
                  <div style={{ fontSize: 10, color: "#555", textAlign: "center", fontStyle: "italic" }}>Doorman checks list:<br />"Are you approved?"</div>
                </div>
              </div>
              {/* Doorman */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#e91e63", padding: "8px 12px", borderRadius: 8, gap: 4 }}>
                <div style={{ fontSize: 20 }}>🕵️</div>
                <div style={{ fontSize: 9, color: "white", fontWeight: 700, textAlign: "center" }}>Security<br />Group</div>
                <div style={{ fontSize: 8, color: "rgba(255,255,255,0.8)", textAlign: "center" }}>Checks IN.<br />NOT out.</div>
              </div>
              {/* Building/EC2 */}
              <div style={{ flex: 1, border: "2px solid #e91e63", borderRadius: 7, padding: "8px 10px", background: "#fce4ec15", textAlign: "center" }}>
                <div style={{ fontSize: 20, marginBottom: 4 }}>🖥️</div>
                <div style={{ fontSize: 10, color: "#c62828", fontWeight: 700, marginBottom: 4 }}>EC2 Instance</div>
                <div style={{ fontSize: 10, color: "#555" }}>The resources in the subnet</div>
              </div>
              {/* Exit */}
              <div style={{ flex: 1 }}>
                <div style={{ background: "#e8f5e9", borderRadius: 7, padding: "8px 10px", height: "100%", border: "1px solid #a5d6a7" }}>
                  <div style={{ textAlign: "center", marginBottom: 6 }}>
                    <div style={{ fontSize: 20 }}>🧑‍💼</div>
                    <div style={{ fontSize: 10, color: "#2e7d32", fontWeight: 700 }}>"Hey, I'm leaving."</div>
                  </div>
                  <div style={{ fontSize: 10, color: "#888", textAlign: "center" }}>↓</div>
                  <div style={{ fontSize: 10, color: "#2e7d32", textAlign: "center", fontStyle: "italic", fontWeight: 600 }}>"Go right ahead.<br />No need to check!" ✅</div>
                </div>
              </div>
            </div>
            <div style={{ marginTop: 8, textAlign: "center", fontSize: 11, color: "#555" }}>
              <b>Default Security Group:</b> Blocks ALL inbound · Allows ALL outbound.<br />
              With custom rules: Checks list on the way IN, but never re-checks on the way OUT (stateful!).
            </div>
          </div>
        </div>

        {/* Packet journey — screenshot 9 style */}
        <H2>📦 How a Packet Gets Checked (NACL + Security Group Journey)</H2>
        <div style={{ background: "white", borderRadius: 10, padding: 14, border: "1px solid #e0e0e0", marginTop: 6 }}>
          {/* Client → IGW → NACL → Security Group → EC2 */}
          <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap", justifyContent: "center", marginBottom: 12 }}>
            {[
              { icon: "💻", label: "Client", color: "#555" },
              { icon: "→", label: "", color: "#888", isArrow: true },
              { icon: "🌐", label: "Internet", color: "#555" },
              { icon: "→", label: "", color: "#888", isArrow: true },
              { icon: "🚪", label: "Internet Gateway", color: "#9c27b0" },
              { icon: "→", label: "", color: "#888", isArrow: true },
              { icon: "📨", label: "Packet ", color: "#1a73e8" },
              { icon: "→", label: "", color: "#888", isArrow: true },
              { icon: "👮", label: "Network ACL Permission?", color: "#FF9900" },
              { icon: "→", label: "", color: "#888", isArrow: true },
              { icon: "🕵️", label: "Security Group", color: "#e91e63" },
              { icon: "→", label: "", color: "#888", isArrow: true },
              { icon: "🖥️🗄️", label: "EC2 / DB", color: "#0f9d58" },
            ].map(({ icon, label, color, isArrow }, i) => (
              isArrow
                ? <div key={i} style={{ fontSize: 18, color: "#888", margin: "0 2px" }}>→</div>
                : <div key={i} style={{ textAlign: "center", padding: "6px 8px", background: color + "15", border: `1px solid ${color}40`, borderRadius: 7, minWidth: 60 }}>
                    <div style={{ fontSize: 14 }}>{icon}</div>
                    <div style={{ fontSize: 8, color, fontWeight: 700, lineHeight: 1.3, marginTop: 2 }}>
                      {label.split("").map((l, j) => <div key={j}>{l}</div>)}
                    </div>
                  </div>
            ))}
          </div>
          <div style={{ background: "#fff8e1", borderRadius: 7, padding: "8px 12px", border: "1px solid #FF990040", fontSize: 12, color: "#555", lineHeight: 1.65 }}>
            <b style={{ color: "#CC7A00" }}>⚠️ Key point:</b> NACL doesn't care what Security Group allows — it has its own list.
            Security Group doesn't care what NACL allowed — it has its own rules.
            <b> They are completely independent checkpoints.</b>
          </div>
        </div>

        {/* Comparison table */}
        <H2>⚖️ Security Group vs NACL — Side by Side</H2>
        <div style={{ borderRadius: 10, overflow: "hidden", border: "1px solid #e0e0e0", marginTop: 6 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", background: "#263238" }}>
            {["Feature", "Security Group 🚪", "Network ACL 👮"].map((h, j) => (
              <div key={h} style={{ padding: "10px 12px", fontSize: 11, fontWeight: 700, color: ["#FF9900","#ef9a9a","#90caf9"][j] || "#FF9900", borderRight: j < 2 ? "1px solid rgba(255,255,255,0.1)" : "none" }}>{h}</div>
            ))}
          </div>
          {[
            ["Level / Scope", "EC2 instance level", "Subnet boundary level"],
            ["Analogy", "Doorman at building", "Passport control at border"],
            ["State", "✅ Stateful — remembers", "❌ Stateless — no memory"],
            ["Return traffic", "Auto-allowed (no rule needed)", "Must explicitly allow return"],
            ["Default", "Block ALL inbound · Allow ALL outbound", "Allow ALL in and out (default)"],
            ["Rule types", "Allow rules ONLY", "Allow AND Deny rules"],
            ["Rule evaluation", "All rules evaluated together", "Number order — first match wins"],
            ["Best for", "Fine control per instance", "Broad subnet-level protection"],
          ].map((row, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", borderTop: "1px solid #f0f0f0", background: i % 2 === 0 ? "#fafafa" : "white" }}>
              {row.map((cell, j) => (
                <div key={j} style={{
                  padding: "9px 12px", fontSize: 12,
                  fontWeight: j === 0 ? 700 : 400,
                  color: j === 0 ? "#333" : j === 1 ? "#c62828" : "#1565c0",
                  borderRight: j < 2 ? "1px solid #f0f0f0" : "none",
                  lineHeight: 1.45,
                }}>{cell}</div>
              ))}
            </div>
          ))}
        </div>

        {/* Shared Responsibility callout */}
        <div style={{ background: "#E3F2FD", border: "1px solid #1a73e840", borderRadius: 9, padding: "11px 14px", marginTop: 10 }}>
          <div style={{ fontWeight: 700, fontSize: 12, color: "#1565c0", marginBottom: 5 }}>🤝 Shared Responsibility — YOUR job</div>
          <div style={{ fontSize: 12.5, color: "#555", lineHeight: 1.65 }}>
            Security Groups and Network ACLs are <b>customer responsibility</b> in the AWS Shared Responsibility Model.
            AWS manages the physical hardware. <b>You</b> are responsible for:
          </div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 8 }}>
            {["Security Group rules", "NACL rules", "Network traffic protection", "OS/firewall config", "App security", "Data encryption"].map(t => (
              <span key={t} style={{ fontSize: 11, background: "#1a73e815", color: "#1565c0", border: "1px solid #1a73e830", borderRadius: 12, padding: "3px 9px", fontWeight: 600 }}>{t}</span>
            ))}
          </div>
        </div>

        <Callout icon="🎯" label="Exam Tip — Most Tested Networking Concept"
          text="Security Group = STATEFUL (remembers), instance-level, allow-only, return traffic auto-allowed. NACL = STATELESS (no memory), subnet-level, allow AND deny, must explicitly allow return traffic in BOTH directions. Both are independent — NACL doesn't know what Security Group allowed and vice versa." color="#d32f2f" />
      </div>
    );

    case "extra-gateways": return (
      <div>
        <Body>
          Beyond Internet Gateways and Virtual Private Gateways, AWS offers additional gateway services
          for more complex networking needs.
        </Body>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 8 }}>
          {[
            {
              name: "AWS Transit Gateway", icon: "🌐", color: "#6a1b9a",
              what: "A central hub that connects multiple VPCs and on-premises networks together. Instead of creating complex point-to-point connections between every VPC, Transit Gateway acts as a central router — like a hub-and-spoke model.",
              before: "10 VPCs need to talk to each other = 45 individual VPC peering connections to manage",
              after: "10 VPCs connect to ONE Transit Gateway = 10 connections, full mesh connectivity",
              useCase: "Large enterprises with dozens of VPCs across multiple AWS accounts and regions. Global expansion using inter-Region peering.",
            },
            {
              name: "NAT Gateway", icon: "🔄", color: "#0f9d58",
              what: "Lets instances in a PRIVATE subnet initiate outbound internet requests (e.g., downloading updates, calling external APIs) WITHOUT being reachable from the internet. Sits in a public subnet and translates private IPs to public IPs for outbound traffic only.",
              before: "Problem: Private subnet EC2 instances need to download OS updates from the internet",
              after: "Solution: NAT Gateway in public subnet — EC2 can reach internet, but internet cannot reach EC2",
              useCase: "Private database server needs to download security patches. NAT Gateway lets it connect out, while still being unreachable from the internet.",
            },
            {
              name: "Amazon API Gateway", icon: "🚀", color: "#FF9900",
              what: "A fully managed service for creating, publishing, maintaining, monitoring, and securing APIs at any scale. An API defines how software systems communicate. API Gateway lets you expose your backend services (Lambda, EC2, any HTTP endpoint) as a secure, scalable API.",
              before: "Without API Gateway: each backend service needs its own auth, rate limiting, and monitoring",
              after: "With API Gateway: one managed entry point handles auth, throttling, caching, and logging for all your APIs",
              useCase: "A mobile app calls your backend. API Gateway handles authentication, routes requests to the right Lambda function or EC2 service, throttles abuse, and logs everything.",
            },
          ].map(({ name, icon, color, what, before, after, useCase }) => (
            <div key={name} style={{ border: `1px solid ${color}30`, borderRadius: 10, overflow: "hidden" }}>
              <div style={{ background: color, padding: "10px 14px", display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 22 }}>{icon}</span>
                <div style={{ fontWeight: 700, fontSize: 14, color: "white" }}>{name}</div>
              </div>
              <div style={{ padding: "12px 14px", background: "white" }}>
                <div style={{ fontSize: 13, color: "#555", lineHeight: 1.65, marginBottom: 10 }}>{what}</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 8 }}>
                  <div style={{ background: "#ffebee", borderRadius: 7, padding: "8px 10px" }}>
                    <div style={{ fontWeight: 700, fontSize: 10, color: "#d32f2f", marginBottom: 3 }}>❌ WITHOUT</div>
                    <div style={{ fontSize: 11.5, color: "#555", lineHeight: 1.5 }}>{before}</div>
                  </div>
                  <div style={{ background: "#e8f5e9", borderRadius: 7, padding: "8px 10px" }}>
                    <div style={{ fontWeight: 700, fontSize: 10, color: "#0f9d58", marginBottom: 3 }}>✅ WITH</div>
                    <div style={{ fontSize: 11.5, color: "#555", lineHeight: 1.5 }}>{after}</div>
                  </div>
                </div>
                <div style={{ fontSize: 11.5, color: color, fontStyle: "italic" }}>
                  💼 <b>Use case:</b> {useCase}
                </div>
              </div>
            </div>
          ))}
        </div>
        <Callout icon="🎯" label="Exam Tip"
          text="Transit Gateway = central hub connecting many VPCs (hub-and-spoke). NAT Gateway = private subnet instances reach internet outbound only; internet cannot reach them. API Gateway = managed API creation, routing, auth, and scaling for any backend." color={accent} />
      </div>
    );

    case "vpc-demo": return (
      <div>
        <Body>
          Here's exactly how to build a production-ready VPC from scratch in the AWS Console —
          the same steps a Solutions Architect would follow. Each step builds on the last.
        </Body>
        <H2>What We're Building</H2>
        <div style={{ background: "#1e1e1e", borderRadius: 8, padding: "12px 14px", fontFamily: "monospace", fontSize: 11.5, marginTop: 6 }}>
          <div style={{ color: "#6A9955" }}>// Target architecture</div>
          <div style={{ color: "#4EC9B0" }}>VPC: 10.0.0.0/16</div>
          <div style={{ color: "#9CDCFE", marginLeft: 12 }}>├── Private-subnet-1 (10.0.1.0/24) — AZ us-east-1a</div>
          <div style={{ color: "#9CDCFE", marginLeft: 12 }}>├── Private-subnet-2 (10.0.2.0/24) — AZ us-east-1b</div>
          <div style={{ color: "#CE9178", marginLeft: 12 }}>├── Public-subnet-1  (10.0.3.0/24) — AZ us-east-1a  ← internet-facing</div>
          <div style={{ color: "#CE9178", marginLeft: 12 }}>├── Public-subnet-2  (10.0.4.0/24) — AZ us-east-1b  ← internet-facing</div>
          <div style={{ color: "#DCDCAA", marginLeft: 12 }}>├── Internet Gateway (attached to VPC)</div>
          <div style={{ color: "#DCDCAA", marginLeft: 12 }}>└── Route Table: 0.0.0.0/0 → IGW (associated with public subnets)</div>
        </div>

        <H2>Step-by-Step Build Guide</H2>
        <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 4 }}>
          {[
            {
              step: "1", title: "Create the VPC", color: "#6a1b9a",
              actions: [
                "Search for VPC → VPC Dashboard → Create VPC",
                "Resource to create: VPC Only",
                "Name: My VPC",
                "IPv4 CIDR: 10.0.0.0/16",
                "Click Create VPC",
              ],
              note: "CIDR 10.0.0.0/16 gives you 65,536 private IP addresses (10.0.X.X) to distribute across subnets.",
            },
            {
              step: "2", title: "Create Private Subnets (2 AZs)", color: "#1a73e8",
              actions: [
                "Left nav → Subnets → Create subnet",
                "Subnet 1: Name=Private-subnet-1, AZ=us-east-1a, CIDR=10.0.1.0/24",
                "Subnet 2: Name=Private-subnet-2, AZ=us-east-1b, CIDR=10.0.2.0/24",
                "⚠️ DO NOT enable Auto-assign public IPv4 — these must stay private",
              ],
              note: "Private subnets get no public IPs. Resources here (databases, app servers) are unreachable from the internet.",
            },
            {
              step: "3", title: "Create Public Subnets (2 AZs)", color: "#0f9d58",
              actions: [
                "Subnet 3: Name=Public-subnet-1, AZ=us-east-1a, CIDR=10.0.3.0/24",
                "Subnet 4: Name=Public-subnet-2, AZ=us-east-1b, CIDR=10.0.4.0/24",
                "Actions → Edit subnet settings → ✅ Enable auto-assign public IPv4",
                "Save",
              ],
              note: "Enabling auto-assign means every EC2 launched here gets a public IP automatically — needed for web servers.",
            },
            {
              step: "4", title: "Create & Attach Internet Gateway", color: "#FF9900",
              actions: [
                "Left nav → Internet gateways → Create internet gateway",
                "Name: my-ig → Create",
                "Actions → Attach to VPC → Select My VPC → Attach",
              ],
              note: "⚠️ Just attaching the IGW is NOT enough. Subnets are still not public yet — you need the route table next.",
            },
            {
              step: "5", title: "Create Route Table & Add Internet Route", color: "#d32f2f",
              actions: [
                "Left nav → Route tables → Create route table",
                "Name: public-route-table, VPC: My VPC → Create",
                "Routes tab → Edit routes → Add route",
                "Destination: 0.0.0.0/0 (all internet traffic), Target: my-ig (your Internet Gateway)",
                "Save changes",
              ],
              note: "0.0.0.0/0 means 'all traffic not destined for the VPC itself' → send it to the internet via the IGW.",
            },
            {
              step: "6", title: "Associate Route Table with Public Subnets", color: "#546e7a",
              actions: [
                "Subnet associations tab → Edit subnet associations",
                "Select Public-subnet-1 AND Public-subnet-2",
                "Save associations",
              ],
              note: "NOW the public subnets are actually public. Private subnets keep the default route table with no IGW route — they remain isolated.",
            },
          ].map(({ step, title, color, actions, note }) => (
            <div key={step} style={{ border: `1px solid ${color}25`, borderLeft: `3px solid ${color}`, borderRadius: 8, padding: "10px 13px", background: color + "05" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 7 }}>
                <div style={{ width: 24, height: 24, borderRadius: "50%", background: color, color: "white", fontWeight: 700, fontSize: 12, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{step}</div>
                <div style={{ fontWeight: 700, fontSize: 13, color }}>{title}</div>
              </div>
              <div style={{ background: "#1e1e1e", borderRadius: 6, padding: "8px 10px", marginBottom: 7, fontFamily: "monospace" }}>
                {actions.map((a, i) => (
                  <div key={i} style={{ fontSize: 11, color: a.startsWith("⚠️") ? "#F48771" : a.startsWith("✅") ? "#4EC9B0" : "#CE9178", marginBottom: 2 }}>{a}</div>
                ))}
              </div>
              <div style={{ fontSize: 12, color: color, fontStyle: "italic" }}>💡 {note}</div>
            </div>
          ))}
        </div>
        <Callout icon="🎯" label="Key Insight"
          text="A subnet is only truly 'public' when THREE things are done: (1) Internet Gateway attached to VPC, (2) Route table has 0.0.0.0/0 → IGW route, (3) Route table is associated with that subnet. Missing any one step = subnet stays private." color="#0f9d58" />
      </div>
    );

    case "route53-dns": return (
      <div>
        <Body>
          Before your application can be reached by users, they need to translate a human-readable
          domain name (example.com) into a machine-readable IP address (192.0.2.1).
          That's what DNS does — and <b>Amazon Route 53</b> is AWS's managed DNS service.
        </Body>

        <H2>How DNS Works — The Phone Book of the Internet</H2>
        <svg width="100%" viewBox="0 0 520 100" style={{ display: "block", margin: "8px 0" }}>
          {/* User */}
          <rect x={10} y={20} width={80} height={60} rx="8" fill="#E3F2FD" stroke="#1a73e8" strokeWidth="1" />
          <text x={50} y={44} textAnchor="middle" fontSize="18">👤</text>
          <text x={50} y={60} textAnchor="middle" fontSize="8" fontWeight="700" fill="#1a73e8">Customer</text>
          <text x={50} y={70} textAnchor="middle" fontSize="7.5" fill="#555">types anyco.com</text>
          {/* Arrow 1 */}
          <line x1={92} y1={50} x2={136} y2={50} stroke="#1a73e8" strokeWidth="1.2" />
          <polygon points="136,46 136,54 142,50" fill="#1a73e8" />
          <text x={114} y={43} textAnchor="middle" fontSize="7.5" fill="#1a73e8">DNS query</text>
          {/* DNS Resolver */}
          <rect x={144} y={20} width={90} height={60} rx="8" fill="#fff3e0" stroke={accent} strokeWidth="1" />
          <text x={189} y={44} textAnchor="middle" fontSize="18">📡</text>
          <text x={189} y={60} textAnchor="middle" fontSize="8" fontWeight="700" fill={accentDark}>Customer DNS</text>
          <text x={189} y={70} textAnchor="middle" fontSize="7.5" fill="#555">Resolver</text>
          {/* Arrow 2 */}
          <line x1={236} y1={50} x2={280} y2={50} stroke={accent} strokeWidth="1.2" />
          <polygon points="280,46 280,54 286,50" fill={accent} />
          <text x={258} y={43} textAnchor="middle" fontSize="7.5" fill={accentDark}>lookup</text>
          {/* Route 53 */}
          <rect x={288} y={20} width={90} height={60} rx="8" fill="#ede7f6" stroke="#6a1b9a" strokeWidth="1.2" />
          <text x={333} y={44} textAnchor="middle" fontSize="18">🛡️</text>
          <text x={333} y={60} textAnchor="middle" fontSize="8" fontWeight="700" fill="#6a1b9a">Route 53</text>
          <text x={333} y={70} textAnchor="middle" fontSize="7.5" fill="#555">DNS Server</text>
          {/* Arrow back */}
          <line x1={286} y1={60} x2={236} y2={60} stroke="#0f9d58" strokeWidth="1.2" />
          <polygon points="236,56 236,64 230,60" fill="#0f9d58" />
          <text x={258} y={70} textAnchor="middle" fontSize="7.5" fill="#0f9d58">192.0.2.1</text>
          {/* Arrow to destination */}
          <line x1={380} y1={50} x2={420} y2={50} stroke="#0f9d58" strokeWidth="1.2" />
          <polygon points="420,46 420,54 426,50" fill="#0f9d58" />
          {/* Website */}
          <rect x={428} y={20} width={82} height={60} rx="8" fill="#e8f5e9" stroke="#0f9d58" strokeWidth="1" />
          <text x={469} y={44} textAnchor="middle" fontSize="18">🌐</text>
          <text x={469} y={60} textAnchor="middle" fontSize="8" fontWeight="700" fill="#0f9d58">Website</text>
          <text x={469} y={70} textAnchor="middle" fontSize="7.5" fill="#555">192.0.2.1</text>
          {/* Browser arrow back */}
          <line x1={140} y1={62} x2={96} y2={62} stroke="#0f9d58" strokeWidth="1" strokeDasharray="3 2" />
          <polygon points="96,58 96,66 90,62" fill="#0f9d58" />
        </svg>

        <H2>Amazon Route 53 — Full Feature Set</H2>
        <KV rows={[
          ["What it is", "Highly available, scalable cloud DNS service. Translates domain names → IP addresses. Globally distributed.", "#1a73e8"],
          ["Domain registration", "Register new domain names directly in Route 53. Transfer existing domains from other registrars. Manage all domains in one place.", "#6a1b9a"],
          ["Health checks", "Monitor endpoint health. Automatically route traffic away from unhealthy endpoints. Built-in failover.", "#0f9d58"],
          ["DNS records", "A, AAAA, CNAME, MX, TXT, and more. Full DNS record management for your domain.", "#FF9900"],
          ["Integration", "Routes users to EC2 instances, load balancers, CloudFront, S3 static websites — inside or outside AWS.", "#d32f2f"],
        ]} />

        <H2>Route 53 Routing Policies — How Traffic Gets Directed</H2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 6 }}>
          {[
            { policy: "Latency-Based", icon: "⚡", color: "#1a73e8",
              desc: "Routes users to the AWS Region with the lowest network latency for them. User in Tokyo → ap-northeast-1. User in London → eu-west-1.",
              useCase: "Global apps where performance matters most" },
            { policy: "Geolocation", icon: "📍", color: "#0f9d58",
              desc: "Routes based on user's geographic location. Users in EU → eu-west-1 (GDPR compliance). Users in US → us-east-1.",
              useCase: "Compliance, content localisation, regional pricing" },
            { policy: "Geoproximity", icon: "🗺️", color: "#6a1b9a",
              desc: "Routes based on geographic distance AND a configurable bias factor. Shift more traffic to one region by increasing its bias.",
              useCase: "Fine-grained regional traffic control with bias tuning" },
            { policy: "Weighted Round Robin", icon: "⚖️", color: "#FF9900",
              desc: "Splits traffic by percentage. 10% → Region A, 90% → Region B. Perfect for blue/green deployments and canary releases.",
              useCase: "A/B testing, gradual feature rollouts, traffic shifting" },
            { policy: "Failover", icon: "🔄", color: "#d32f2f",
              desc: "Primary endpoint health-checked. If primary fails → Route 53 automatically routes to secondary (DR) endpoint.",
              useCase: "Active-passive disaster recovery setups" },
            { policy: "Simple", icon: "➡️", color: "#546e7a",
              desc: "Basic routing — one record maps to one resource. No health checks, no policies. Good for single-server setups.",
              useCase: "Simple, single-region applications" },
          ].map(({ policy, icon, color, desc, useCase }) => (
            <div key={policy} style={{ border: `1px solid ${color}25`, borderTop: `3px solid ${color}`, borderRadius: 8, padding: "10px 12px", background: color + "06" }}>
              <div style={{ fontWeight: 700, fontSize: 12, color, marginBottom: 5 }}>{icon} {policy}</div>
              <div style={{ fontSize: 12, color: "#555", lineHeight: 1.5, marginBottom: 5 }}>{desc}</div>
              <div style={{ fontSize: 11, color, fontStyle: "italic" }}>🎯 {useCase}</div>
            </div>
          ))}
        </div>
        <Callout icon="🎯" label="Exam Tip"
          text="Route 53 = DNS + routing policies + domain registration + health checks. Key routing policies: Latency-based (performance), Geolocation (compliance/region), Weighted (A/B testing), Failover (DR). Route 53 works with CloudFront and runs at edge locations globally." color="#1a73e8" />
      </div>
    );

    case "cloudfront-accelerator": return (
      <div>
        <Body>
          CloudFront and Global Accelerator both make apps faster — but they work completely differently.
          And both are often confused with Direct Connect and PrivateLink. This section clears all of that up once and for all.
        </Body>

        {/* The BIG confusion-buster */}
        <div style={{ background: "#263238", borderRadius: 10, padding: "12px 14px", marginTop: 8 }}>
          <div style={{ fontWeight: 700, fontSize: 12, color: accent, marginBottom: 10 }}>🚨 The Confusion Buster — All 4 services side by side</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 6 }}>
            {[
              { icon: "🌍", name: "CloudFront", what: "CDN — caches CONTENT", who: "End users on internet", traffic: "Public internet", example: "Website images/videos", color: "#d32f2f" },
              { icon: "🚀", name: "Global Accelerator", what: "Routes CONNECTIONS faster", who: "End users on internet", traffic: "AWS private backbone", example: "Gaming, real-time apps", color: "#6a1b9a" },
              { icon: "⚡", name: "Direct Connect", what: "Physical fiber from DC to AWS", who: "Your corporate data center", traffic: "Dedicated fiber (NOT internet)", example: "Huge data transfers, compliance", color: "#FF9900" },
              { icon: "🔗", name: "PrivateLink", what: "Private VPC-to-VPC/service", who: "Your apps in VPCs", traffic: "AWS private network (NOT internet)", example: "Accessing AWS services privately", color: "#0f9d58" },
            ].map(({ icon, name, what, who, traffic, example, color }) => (
              <div key={name} style={{ background: color + "18", border: `1px solid ${color}40`, borderRadius: 8, padding: "9px 8px" }}>
                <div style={{ fontSize: 22, textAlign: "center", marginBottom: 4 }}>{icon}</div>
                <div style={{ fontWeight: 700, fontSize: 11, color, textAlign: "center", marginBottom: 6 }}>{name}</div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", marginBottom: 1 }}>What it does:</div>
                <div style={{ fontSize: 10.5, color: "rgba(255,255,255,0.85)", marginBottom: 5, lineHeight: 1.4 }}>{what}</div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", marginBottom: 1 }}>Traffic path:</div>
                <div style={{ fontSize: 10.5, color, marginBottom: 5, fontWeight: 600, lineHeight: 1.4 }}>{traffic}</div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", marginBottom: 1 }}>Example:</div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.7)", lineHeight: 1.4 }}>{example}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 10, background: "rgba(255,255,255,0.06)", borderRadius: 7, padding: "8px 12px" }}>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.85)", lineHeight: 1.7 }}>
              <b style={{ color: accent }}>Simple rule to never confuse them again:</b><br />
              <span style={{ color: "#ef9a9a" }}>CloudFront + Global Accelerator</span> = for your <b>end users</b> around the world (internet-facing)<br />
              <span style={{ color: "#FF9900" }}>Direct Connect + PrivateLink</span> = for your <b>corporate network or VPCs</b> (private connectivity)
            </div>
          </div>
        </div>

        {/* CloudFront */}
        <H2>🌍 Amazon CloudFront — CDN</H2>
        <Analogy icon="🚚" label="Delivery Depot Analogy"
          text="CloudFront is a global network of delivery trucks pre-positioned in 400+ cities. Instead of every customer's order shipping from your one central warehouse (origin server), popular items are stored in local depots (edge locations). Customers get their order from the nearby depot in milliseconds — only brand new items travel from the warehouse."
          color="#d32f2f" />

        {/* Screenshot 11 style: Route53 → CloudFront flow */}
        <svg width="100%" viewBox="0 0 500 100" style={{ display: "block", margin: "10px 0", borderRadius: 10, border: "1px solid #e0e0e0", background: "#0f172a" }}>
          {/* User laptop */}
          <rect x={10} y={30} width={65} height={45} rx="6" fill="#1e293b" stroke="#4ade80" strokeWidth="1" />
          <text x={42} y={52} textAnchor="middle" fontSize="18">💻</text>
          <text x={42} y={68} textAnchor="middle" fontSize="7.5" fill="#4ade80">User</text>
          <text x={42} y={78} textAnchor="middle" fontSize="7" fill="#888">anywhere</text>
          {/* Arrow to Route 53 */}
          <line x1={77} y1={53} x2={108} y2={53} stroke="#4ade80" strokeWidth="1.2" />
          <polygon points="108,49 108,57 114,53" fill="#4ade80" />
          <text x={92} y={46} textAnchor="middle" fontSize="7" fill="#888">DNS query</text>
          {/* Route 53 */}
          <rect x={116} y={35} width={66} height={40} rx="6" fill="#6d28d9" stroke="#a78bfa" strokeWidth="1" />
          <text x={149} y={55} textAnchor="middle" fontSize="12">🛡️</text>
          <text x={149} y={67} textAnchor="middle" fontSize="7.5" fontWeight="700" fill="#a78bfa">Route 53</text>
          {/* Arrow */}
          <line x1={184} y1={55} x2={212} y2={55} stroke="#a78bfa" strokeWidth="1.2" />
          <polygon points="212,51 212,59 218,55" fill="#a78bfa" />
          <text x={197} y={47} textAnchor="middle" fontSize="7" fill="#888">routes to</text>
          {/* CloudFront */}
          <rect x={220} y={20} width={100} height={70} rx="8" fill="#1e293b" stroke="#f87171" strokeWidth="1.2" strokeDasharray="4 2" />
          <text x={270} y={38} textAnchor="middle" fontSize="8" fontWeight="700" fill="#f87171">CloudFront</text>
          {["Edge 1", "Edge 2", "Edge 3"].map((e, i) => (
            <rect key={i} x={228} y={43 + i * 15} width={84} height={11} rx="3" fill="#f8717120" stroke="#f87171" strokeWidth="0.7" />
          ))}
          {["Edge 1", "Edge 2", "Edge 3"].map((e, i) => (
            <text key={i+"t"} x={270} y={52 + i * 15} textAnchor="middle" fontSize="7" fill="#f87171">{e}</text>
          ))}
          {/* Arrow to region */}
          <line x1={322} y1={55} x2={350} y2={55} stroke="#f87171" strokeWidth="1.2" />
          <polygon points="350,51 350,59 356,55" fill="#f87171" />
          <text x={337} y={47} textAnchor="middle" fontSize="7" fill="#888">if cache miss</text>
          {/* Origin */}
          <rect x={358} y={20} width={130} height={70} rx="8" fill="#1e293b" stroke="#60a5fa" strokeWidth="1.2" />
          <text x={423} y={38} textAnchor="middle" fontSize="8" fontWeight="700" fill="#60a5fa">Origin Server</text>
          <text x={423} y={52} textAnchor="middle" fontSize="10">🗄️</text>
          <text x={423} y={65} textAnchor="middle" fontSize="7.5" fill="#60a5fa">S3 / EC2 / ELB</text>
          <text x={423} y={78} textAnchor="middle" fontSize="7" fill="#888">your region</text>
          <text x={250} y={96} textAnchor="middle" fontSize="7.5" fill="#888">Route 53 → nearest CloudFront edge → origin (only on first request, then cached)</text>
        </svg>

        <KV rows={[
          ["What it caches", "Images, CSS, JS, videos, HTML pages, API responses — any web content.", "#d32f2f"],
          ["Cache HIT", "Content at edge → served in ~5ms. No trip to origin. User gets it instantly.", "#0f9d58"],
          ["Cache MISS", "Edge fetches from origin ONCE → caches → all future users in that area get it from edge.", "#FF9900"],
          ["NOT for", "Real-time TCP/UDP connections, gaming, VoIP. Use Global Accelerator for those.", "#546e7a"],
        ]} />

        {/* Global Accelerator — big clarification section */}
        <H2>🚀 AWS Global Accelerator — NOT a CDN, NOT Direct Connect</H2>
        <div style={{ background: "#fce4ec", border: "1px solid #d32f2f30", borderRadius: 9, padding: "11px 14px", marginTop: 4, marginBottom: 10 }}>
          <div style={{ fontWeight: 700, fontSize: 12, color: "#d32f2f", marginBottom: 5 }}>⚠️ Common Confusion — Let's fix it right now:</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            {[
              ["Global Accelerator vs CloudFront", "CloudFront caches CONTENT (files, videos). Global Accelerator routes CONNECTIONS (TCP/UDP). Neither caches the other's traffic.", "#d32f2f"],
              ["Global Accelerator vs Direct Connect", "Direct Connect = physical fiber from YOUR data center to AWS. Global Accelerator = faster routing for YOUR USERS' internet traffic. Completely different scenarios.", "#FF9900"],
              ["Global Accelerator vs PrivateLink", "PrivateLink = VPC-to-VPC or VPC-to-service on AWS network. Global Accelerator = users on the internet getting to your app faster via AWS backbone.", "#6a1b9a"],
            ].map(([title, desc, color]) => (
              <div key={title} style={{ border: `1px solid ${color}25`, borderLeft: `3px solid ${color}`, borderRadius: 6, padding: "7px 10px", background: "white" }}>
                <div style={{ fontWeight: 700, fontSize: 11, color, marginBottom: 3 }}>❌ {title}</div>
                <div style={{ fontSize: 12, color: "#555", lineHeight: 1.5 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>

        <Analogy icon="🛣️" label="Express Highway Analogy"
          text="Imagine the internet is a normal road — lots of traffic lights, congestion, slow spots. Global Accelerator gives your users a secret entrance to the AWS private highway at the nearest city. From there, their traffic zooms along AWS's private backbone with no congestion. They arrive at your app faster and more reliably — without touching the congested public internet for most of the journey."
          color="#6a1b9a" />

        {/* Global Accelerator diagram */}
        <svg width="100%" viewBox="0 0 500 110" style={{ display: "block", margin: "10px 0", borderRadius: 10, border: "1px solid #e0e0e0", background: "white" }}>
          {/* User */}
          <circle cx={40} cy={55} r={18} fill="#EDE7F6" stroke="#6a1b9a" strokeWidth="1" />
          <text x={40} y={59} textAnchor="middle" fontSize="16">👤</text>
          <text x={40} y={80} textAnchor="middle" fontSize="7.5" fill="#555">User</text>
          {/* Arrow to edge */}
          <line x1={60} y1={55} x2={95} y2={55} stroke="#6a1b9a" strokeWidth="1.3" />
          <polygon points="95,51 95,59 101,55" fill="#6a1b9a" />
          <text x={77} y={47} textAnchor="middle" fontSize="7.5" fill="#6a1b9a">enters AWS network</text>
          <text x={77} y={58} textAnchor="middle" fontSize="7" fill="#888">at nearest edge</text>
          {/* Edge Location */}
          <rect x={103} y={36} width={80} height={38} rx="7" fill="#EDE7F6" stroke="#6a1b9a" strokeWidth="1.2" />
          <text x={143} y={53} textAnchor="middle" fontSize="12">🗼</text>
          <text x={143} y={66} textAnchor="middle" fontSize="7.5" fontWeight="700" fill="#6a1b9a">Edge Location</text>
          {/* AWS private backbone */}
          <rect x={194} y={44} width={138} height={22} rx="11" fill="#6a1b9a15" stroke="#6a1b9a" strokeWidth="1" />
          <text x={263} y={58} textAnchor="middle" fontSize="9" fontWeight="700" fill="#6a1b9a">AWS Private Backbone 🚀</text>
          <line x1={185} y1={55} x2={192} y2={55} stroke="#6a1b9a" strokeWidth="1.3" />
          <line x1={334} y1={55} x2={342} y2={55} stroke="#6a1b9a" strokeWidth="1.3" />
          <polygon points="342,51 342,59 348,55" fill="#6a1b9a" />
          {/* App endpoint */}
          <rect x={350} y={30} width={140} height={50} rx="8" fill="#EDE7F6" stroke="#6a1b9a" strokeWidth="1.2" />
          <text x={420} y={50} textAnchor="middle" fontSize="9" fontWeight="700" fill="#6a1b9a">Your App</text>
          <text x={420} y={63} textAnchor="middle" fontSize="8" fill="#555">(us-east-1 or</text>
          <text x={420} y={73} textAnchor="middle" fontSize="8" fill="#555">eu-west-1)</text>
          {/* NO caching label */}
          <text x={263} y={38} textAnchor="middle" fontSize="8" fill="#d32f2f" fontWeight="700">No caching! Routes TCP/UDP connections.</text>
          <text x={250} y={100} textAnchor="middle" fontSize="8" fill="#555">Instant failover: if endpoint becomes unhealthy, traffic reroutes in ~30 seconds</text>
        </svg>

        <KV rows={[
          ["What it is", "Routes USER traffic through AWS's private global backbone — NOT the public internet for most of the journey.", "#6a1b9a"],
          ["Does it cache?", "NO. Unlike CloudFront, it does NOT cache anything. It just routes connections faster.", "#d32f2f"],
          ["Does it replace Direct Connect?", "NO. Direct Connect is for YOUR corporate DC to AWS. Global Accelerator is for YOUR USERS (public internet users) to your app.", "#FF9900"],
          ["Health checks", "Monitors your app endpoints. If one Region fails, instantly routes users to the next healthy Region (~30s).", "#0f9d58"],
          ["Best for", "Real-time gaming (low latency), banking apps (reliability), VoIP (stable connections), global APIs (consistent performance).", "#1a73e8"],
        ]} />

        {/* Final clarification mega table */}
        <H2>🎯 The Final Reference Table — Never Confuse These Again</H2>
        <div style={{ borderRadius: 8, overflow: "hidden", border: "1px solid #e0e0e0", marginTop: 6 }}>
          {[
            ["", "CloudFront 🌍", "Global Accelerator 🚀", "Direct Connect ⚡", "PrivateLink 🔗"],
            ["Type", "CDN", "Network accelerator", "Private fiber line", "Private endpoint"],
            ["For whom", "End users on internet", "End users on internet", "Your corporate DC", "Your VPCs/apps"],
            ["Traffic path", "Internet → Edge cache", "Internet → AWS backbone", "Dedicated fiber (no internet)", "AWS private network"],
            ["Caches content?", "✅ Yes (CDN)", "❌ No", "❌ No", "❌ No"],
            ["Use case", "Websites, video, images", "Gaming, VoIP, real-time", "Large data transfers, compliance", "Service-to-service private"],
            ["Setup", "Minutes", "Minutes", "Weeks (physical)", "Hours"],
          ].map((row, i) => (
            <div key={i} style={{
              display: "grid", gridTemplateColumns: "0.8fr 1fr 1fr 1fr 1fr",
              borderBottom: i < 6 ? "1px solid #f0f0f0" : "none",
              background: i === 0 ? "#263238" : i % 2 === 0 ? "#fafafa" : "white",
            }}>
              {row.map((cell, j) => (
                <div key={j} style={{
                  padding: "6px 9px", fontSize: i === 0 ? 10 : 11.5,
                  fontWeight: i === 0 || j === 0 ? 700 : 400,
                  color: i === 0 ? ["#FF9900","#f87171","#c084fc","#FFB74D","#86efac"][j] || "#FF9900"
                       : j === 0 ? "#333" : "#555",
                  borderRight: j < 4 ? "1px solid #f0f0f0" : "none",
                  lineHeight: 1.4,
                }}>{cell}</div>
              ))}
            </div>
          ))}
        </div>

        <Callout icon="🎯" label="Exam Tip — The Most Confused Topic"
          text="CloudFront = CDN, caches content at edge, for websites/media. Global Accelerator = NO caching, routes TCP/UDP through AWS private backbone, for real-time apps. Direct Connect = physical fiber from YOUR data center to AWS (not for end users). PrivateLink = VPC-to-service private connection (not for end users). CloudFront + Global Accelerator = internet-facing (users). Direct Connect + PrivateLink = private connectivity (your network)." color="#d32f2f" />
      </div>
    );

    default: return null;
  }
}

// ─── Cheat sheet ──────────────────────────────────────────────────────────────
const cheatRows = [
  ["VPC", "Your isolated private network in AWS. Define IP ranges, subnets, routing, security."],
  ["CIDR Block", "IP range for your VPC/subnet. 10.0.0.0/16 = 65,536 IPs. 10.0.1.0/24 = 256 IPs."],
  ["Subnet", "Segment of IP addresses in a VPC. Each subnet lives in ONE AZ. Public or private."],
  ["Public Subnet", "Has route to Internet Gateway. Auto-assign public IPs enabled. Web servers, ELB."],
  ["Private Subnet", "No internet route. No public IPs. Databases, app servers, internal services."],
  ["Internet Gateway", "Attached to VPC. Allows public internet traffic in/out. Required for public subnets."],
  ["Route Table", "Rules directing network traffic. Each subnet must be associated with one."],
  ["0.0.0.0/0 route", "All internet traffic → Internet Gateway. This is what makes a subnet actually public."],
  ["Virtual Private Gateway", "AWS-side VPN endpoint. Connects corporate network to VPC over encrypted internet."],
  ["Client VPN", "Managed VPN for remote workers. Elastic, no hardware. Uses OpenVPN client."],
  ["Site-to-Site VPN", "Encrypted office/DC ↔ VPC over internet. One VPG can serve multiple sites."],
  ["AWS PrivateLink", "VPC to VPC/services privately. No internet, no gateway, no public IP needed."],
  ["Direct Connect", "Dedicated private fiber from DC to AWS. NOT internet. 1–100 Gbps. Consistent."],
  ["Security Group", "INSTANCE-level firewall. Stateful. Allow-only rules. Deny all inbound by default."],
  ["NACL", "SUBNET-level firewall. Stateless. Allow AND deny rules. Checks every packet both ways."],
  ["Stateful", "Security Groups — remembers connections. Return traffic auto-allowed, no rule needed."],
  ["Stateless", "NACLs — no memory. Every packet checked independently every time, both directions."],
  ["Transit Gateway", "Hub connecting many VPCs + on-prem networks. Hub-and-spoke model."],
  ["NAT Gateway", "Private subnet → internet outbound only. Internet cannot reach private instances."],
  ["API Gateway", "Managed API creation, auth, throttling, routing. Front door for any backend."],
  ["Route 53", "AWS DNS. Domain→IP. Routing policies: latency, geolocation, weighted, failover."],
  ["Route 53 Policies", "Latency (fastest Region), Geolocation (by country), Weighted (A/B %), Failover (DR)"],
  ["CloudFront", "CDN. Caches at 400+ edge locations globally. Reduces latency for any content."],
  ["Cache HIT/MISS", "HIT = served from edge (~5ms). MISS = edge fetches from origin, then caches for all future requests."],
  ["Global Accelerator", "Routes TCP/UDP via AWS private backbone. Not a CDN. For gaming, finance, VoIP."],
  ["CF vs GA", "CloudFront = caches CONTENT. Global Accelerator = routes CONNECTIONS faster."],
  ["VPC build order", "VPC → Subnets → IGW → Attach IGW → Route Table → 0.0.0.0/0→IGW → Associate subnets"],
];

export default function Module5() {
  const [active, setActive] = useState("vpc-intro");
  const [showCheat, setShowCheat] = useState(false);
  const sec = sections.find(s => s.id === active);

  return (
    <div style={{ fontFamily: "system-ui, -apple-system, sans-serif", maxWidth: 800, margin: "0 auto", padding: "0.5rem" }}>
      {/* Header */}
      <div style={{
        background: "#f5f5f5", border: "1px solid #e0e0e0", borderRadius: 12,
        padding: "14px 16px", marginBottom: 12,
        display: "flex", alignItems: "center", gap: 12,
      }}>
        <div style={{
          width: 42, height: 42, borderRadius: 10, background: "#6a1b9a20",
          border: "1.5px solid #6a1b9a50", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22,
        }}>🔒</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, fontSize: 15 }}>Module 5 — AWS Networking</div>
          <div style={{ fontSize: 12, color: "#666", marginTop: 2 }}>
            VPC · Subnets · Gateways · Direct Connect · Security Groups · Global Architecture
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
            <span style={{ fontWeight: 700, fontSize: 12, color: accent }}>⚡ Module 5 Quick-Recall Cheat Sheet</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", background: "white" }}>
            {cheatRows.map(([k, v], i) => (
              <div key={i} style={{
                display: "flex", gap: 6, padding: "5px 12px",
                borderBottom: i < cheatRows.length - 2 ? "1px solid #f0f0f0" : "none",
                borderRight: i % 2 === 0 ? "1px solid #f0f0f0" : "none",
                background: Math.floor(i / 2) % 2 === 0 ? "white" : "#fafafa",
              }}>
                <span style={{ fontWeight: 700, fontSize: 10.5, color: accent, flexShrink: 0, minWidth: 120 }}>{k}</span>
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