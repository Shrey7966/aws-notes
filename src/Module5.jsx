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
        <rect key={i} x={472 + i * 27} y={52} width={24} height={26} rx="3" fill="#0f9d5820" stroke="#0f9d58" strokeWidth="0.7" />
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
          Subnets are <b>segments of IP addresses within your VPC</b>. They let you group resources
          and control whether those resources can be accessed from the internet or only internally.
          Every subnet lives in exactly one Availability Zone.
        </Body>
        <H2>Public vs Private Subnets</H2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 8 }}>
          {[
            {
              type: "🌐 Public Subnet", color: "#0f9d58",
              def: "Has a route to the Internet Gateway. Resources here are reachable from the internet.",
              uses: ["Web servers", "Load balancers (ELB)", "NAT Gateway", "Bastion hosts"],
              diagram: "Drawn with DASHED borders in AWS diagrams",
              example: "Your e-commerce website's frontend EC2 servers serving customer traffic.",
            },
            {
              type: "🔒 Private Subnet", color: "#1a73e8",
              def: "No route to the Internet Gateway. Resources here cannot be reached from the internet.",
              uses: ["Databases (RDS)", "Application servers", "Internal microservices", "Cache layers"],
              diagram: "Drawn with SOLID borders in AWS diagrams",
              example: "Your database storing customer orders — never directly exposed to the internet.",
            },
          ].map(({ type, color, def, uses, diagram, example }) => (
            <div key={type} style={{ border: `1px solid ${color}30`, borderTop: `3px solid ${color}`, borderRadius: 9, padding: "12px", background: color + "08" }}>
              <div style={{ fontWeight: 700, fontSize: 13, color, marginBottom: 6 }}>{type}</div>
              <div style={{ fontSize: 12.5, color: "#555", marginBottom: 8, lineHeight: 1.5 }}>{def}</div>
              <div style={{ fontWeight: 700, fontSize: 11, color, marginBottom: 4 }}>Common resources:</div>
              {uses.map(u => <div key={u} style={{ fontSize: 11.5, color: "#555", marginBottom: 2 }}>• {u}</div>)}
              <div style={{ fontSize: 11, color, marginTop: 6, fontStyle: "italic" }}>📐 {diagram}</div>
              <div style={{ fontSize: 11.5, color: "#555", marginTop: 6, borderTop: "1px solid #f0f0f0", paddingTop: 6 }}>
                <b>Real example:</b> {example}
              </div>
            </div>
          ))}
        </div>
        <H2>How Subnets Map to Availability Zones</H2>
        <Body>
          Each subnet is locked to <b>one AZ</b>. For high availability, you create the same subnet type
          in multiple AZs — e.g., a public subnet in AZ-a AND a public subnet in AZ-b.
          If AZ-a fails, traffic shifts to AZ-b automatically.
        </Body>
        <div style={{ background: "#f5f5f5", borderRadius: 8, padding: "10px 14px", marginTop: 8, fontFamily: "monospace", fontSize: 12 }}>
          <div style={{ color: "#6a1b9a", fontWeight: 700 }}>VPC (10.0.0.0/16)</div>
          <div style={{ marginLeft: 12 }}>
            <span style={{ color: "#0f9d58" }}>├── Public Subnet AZ-a</span> <span style={{ color: "#888" }}>(10.0.1.0/24) → Web servers</span><br />
            <span style={{ color: "#0f9d58" }}>├── Public Subnet AZ-b</span> <span style={{ color: "#888" }}>(10.0.2.0/24) → Web servers</span><br />
            <span style={{ color: "#1a73e8" }}>├── Private Subnet AZ-a</span> <span style={{ color: "#888" }}>(10.0.3.0/24) → Database primary</span><br />
            <span style={{ color: "#1a73e8" }}>└── Private Subnet AZ-b</span> <span style={{ color: "#888" }}>(10.0.4.0/24) → Database replica</span>
          </div>
        </div>
        <Callout icon="🎯" label="Exam Tip"
          text="Public subnet = internet accessible, has Internet Gateway route. Private subnet = no internet access, for databases and internal services. Subnets span ONE AZ only. Deploy across multiple AZs for high availability." color={accent} />
      </div>
    );

    case "gateways": return (
      <div>
        <Body>
          Gateways are the <b>entry and exit points</b> of your VPC. The type of gateway you attach
          determines who can access your VPC and how traffic flows in and out.
        </Body>
        <H2>Internet Gateway vs Virtual Private Gateway</H2>
        <GatewaysDiagram />
        <KV rows={[
          ["Internet Gateway (IGW)", "Connects your VPC to the public internet. Attach to VPC to allow public traffic in/out. Required for any public subnet.", "#0f9d58"],
          ["Virtual Private Gateway (VPG)", "Connects your VPC to a private network (corporate data center) via an encrypted VPN tunnel. Traffic goes over the public internet but is encrypted.", "#d32f2f"],
          ["AWS Direct Connect", "Connects your VPC to your corporate network via a dedicated private fiber line — NOT over the public internet. Faster, more consistent.", "#1a73e8"],
          ["NAT Gateway", "Lets private subnet resources initiate outbound internet requests (e.g., software updates) WITHOUT exposing them to inbound internet traffic.", "#FF9900"],
        ]} />
        <H2>The VPN Deep Dive</H2>
        <Analogy icon="🏢" label="Corporate Building Analogy"
          text="A VPN is like a secure tunnel from your office to a private coffee shop inside a corporate building. You can only enter if you badge in (authentication). Even though you're travelling through public streets (internet) to get there, no one can see inside your encrypted tunnel. But — you still share the road (bandwidth) with everyone else, so traffic jams (congestion) can happen."
          color="#d32f2f" />
        <H2>When to Use Each</H2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 6 }}>
          {[
            { title: "Use VPN when:", color: "#FF9900", items: ["Secure but flexible connection", "Remote employees accessing AWS", "Small-to-medium data transfers", "Quick setup needed", "Cost-sensitive (cheaper than Direct Connect)"] },
            { title: "Use Direct Connect when:", color: "#1a73e8", items: ["Massive data transfers (TB+)", "Consistent high bandwidth needed", "Low latency is critical", "Compliance requires private connectivity", "Application performance is paramount"] },
          ].map(({ title, color, items }) => (
            <div key={title} style={{ border: `1px solid ${color}30`, borderTop: `3px solid ${color}`, borderRadius: 8, padding: "10px 12px" }}>
              <div style={{ fontWeight: 700, fontSize: 12, color, marginBottom: 6 }}>{title}</div>
              {items.map(i => <div key={i} style={{ fontSize: 12, color: "#555", marginBottom: 3 }}>✓ {i}</div>)}
            </div>
          ))}
        </div>
        <Callout icon="🎯" label="Exam Tip"
          text="Internet Gateway = public internet access for your VPC. Virtual Private Gateway = encrypted VPN connection from corporate to VPC (over internet). Direct Connect = dedicated private fiber (not internet). NAT Gateway = lets private resources access internet without being exposed." color={accent} />
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
          Companies have many different types of networks, data centers, branch offices, and remote workers.
          AWS provides <b>4 dedicated connection options</b> to securely connect all of them to your VPC.
        </Body>

        {/* Overview diagram */}
        <div style={{ background: "#f5f5f5", borderRadius: 10, padding: 12, marginTop: 8 }}>
          <svg width="100%" viewBox="0 0 520 130" style={{ display: "block" }}>
            {/* VPC cloud */}
            <rect x={180} y={10} width={160} height={70} rx="10" fill="#ede7f6" stroke="#6a1b9a" strokeWidth="1.3" />
            <text x={260} y={32} textAnchor="middle" fontSize="9" fontWeight="700" fill="#6a1b9a">VPC</text>
            <text x={260} y={48} textAnchor="middle" fontSize="18">☁️</text>
            <text x={260} y={68} textAnchor="middle" fontSize="7.5" fill="#555">Your AWS resources</text>
            {/* 4 sources */}
            {[
              { x: 30, y: 20, icon: "👤", label: "Remote\nWorkers", color: "#1a73e8", cx1: 90, cy1: 40, cx2: 178, cy2: 35 },
              { x: 30, y: 75, icon: "🏢", label: "Branch\nOffice", color: "#0f9d58", cx1: 90, cy1: 90, cx2: 178, cy2: 55 },
              { x: 390, y: 20, icon: "🏭", label: "Data\nCenter", color: "#FF9900", cx1: 430, cy1: 40, cx2: 342, cy2: 35 },
              { x: 390, y: 75, icon: "🔗", label: "Other\nVPCs", color: "#d32f2f", cx1: 430, cy1: 90, cx2: 342, cy2: 55 },
            ].map(({ x, y, icon, label, color, cx1, cy1, cx2, cy2 }, i) => (
              <g key={i}>
                <rect x={x} y={y} width={58} height={42} rx="7" fill={color + "20"} stroke={color} strokeWidth="1" />
                <text x={x + 29} y={y + 16} textAnchor="middle" fontSize="14">{icon}</text>
                {label.split("\n").map((l, j) => (
                  <text key={j} x={x + 29} y={y + 28 + j * 11} textAnchor="middle" fontSize="7.5" fill={color}>{l}</text>
                ))}
                <line x1={cx1} y1={cy1} x2={cx2} y2={cy2} stroke={color} strokeWidth="1.2" strokeDasharray="4 2" />
              </g>
            ))}
            {/* Labels for connections */}
            <text x={135} y={28} textAnchor="middle" fontSize="7.5" fill="#1a73e8">Client VPN</text>
            <text x={135} y={82} textAnchor="middle" fontSize="7.5" fill="#0f9d58">Site-to-Site VPN</text>
            <text x={380} y={28} textAnchor="middle" fontSize="7.5" fill="#FF9900">Direct Connect</text>
            <text x={380} y={82} textAnchor="middle" fontSize="7.5" fill="#d32f2f">PrivateLink</text>
            <text x={260} y={110} textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#333">4 Ways to Connect to Your VPC</text>
          </svg>
        </div>

        <H2>The 4 Connection Options — Deep Dive</H2>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 6 }}>
          {[
            {
              name: "AWS Client VPN", icon: "👤", color: "#1a73e8",
              tag: "Remote Workers → VPC",
              what: "Fully managed, elastic VPN service that lets remote workers securely connect to AWS resources or on-premises networks from anywhere. Uses OpenVPN-based client. Auto-scales based on demand — no hardware to manage.",
              benefits: ["Advanced authentication (MFA, certificates)", "Elastic — scales up/down automatically", "Works with AWS global network"],
              useCase: "A company acquires 500 remote employees who need immediate access to AWS resources. Client VPN lets them all connect securely from their laptops within minutes.",
              best: "Remote employees, work-from-home access, contractor access",
            },
            {
              name: "AWS Site-to-Site VPN", icon: "🏢", color: "#0f9d58",
              tag: "Office/Data Center ↔ VPC",
              what: "Creates a secure, encrypted connection between your corporate data center or branch offices and your AWS VPC. Traffic travels over the public internet but inside an encrypted tunnel. One VPG connects to multiple sites.",
              benefits: ["High availability — automatic failover", "Secure encrypted private sessions", "Accelerates application performance"],
              useCase: "A manufacturing company connects their factory floor systems, data center, and branch offices all to one central VPC. Each site gets its own VPN connection to the Virtual Private Gateway.",
              best: "Application migration, multi-site secure communication, hybrid cloud",
            },
            {
              name: "AWS PrivateLink", icon: "🔗", color: "#d32f2f",
              tag: "VPC → Other VPCs/Services (no internet)",
              what: "Privately connect your VPC to AWS services, other VPCs, or third-party services as if they were in your own VPC. No internet gateway, NAT device, or VPN needed. Controls specific API endpoints reachable from your VPC.",
              benefits: ["No traffic over the public internet", "Simplified management rules", "Secure traffic between VPCs"],
              useCase: "A SaaS company wants to expose their service to customer VPCs privately. PrivateLink lets customers connect directly without routing through the internet or setting up complex VPN connections.",
              best: "VPC-to-VPC connectivity, accessing AWS services privately, SaaS integrations",
            },
            {
              name: "AWS Direct Connect", icon: "⚡", color: "#FF9900",
              tag: "Data Center → VPC (dedicated fiber)",
              what: "Dedicated private fiber connection from your data center to AWS — completely bypassing the public internet. Works through a Direct Connect partner. Traffic: Corporate DC → Partner Router → AWS DX Endpoint → Virtual Private Gateway → VPC.",
              benefits: ["Reduces network costs at high volume", "Increases bandwidth (1–100 Gbps)", "Consistent, predictable performance"],
              useCase: "A media company transfers 500 TB of video footage monthly to AWS for processing. Direct Connect gives them a private 10 Gbps line — far cheaper and faster than internet data transfer at that scale.",
              best: "Large data transfers, compliance, latency-sensitive apps, consistent bandwidth",
            },
          ].map(({ name, icon, color, tag, what, benefits, useCase, best }) => (
            <div key={name} style={{ border: `1px solid ${color}30`, borderRadius: 10, overflow: "hidden" }}>
              <div style={{ background: color, padding: "9px 14px", display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 20 }}>{icon}</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 13, color: "white" }}>{name}</div>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.8)" }}>{tag}</div>
                </div>
              </div>
              <div style={{ padding: "11px 14px", background: "white" }}>
                <div style={{ fontSize: 13, color: "#555", lineHeight: 1.6, marginBottom: 8 }}>{what}</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  <div style={{ background: color + "08", borderRadius: 7, padding: "8px 10px" }}>
                    <div style={{ fontWeight: 700, fontSize: 11, color, marginBottom: 4 }}>✅ Benefits</div>
                    {benefits.map(b => <div key={b} style={{ fontSize: 11.5, color: "#555", marginBottom: 2 }}>• {b}</div>)}
                  </div>
                  <div style={{ background: "#f5f5f5", borderRadius: 7, padding: "8px 10px" }}>
                    <div style={{ fontWeight: 700, fontSize: 11, color, marginBottom: 4 }}>💼 Real Scenario</div>
                    <div style={{ fontSize: 11, color: "#555", lineHeight: 1.5 }}>{useCase}</div>
                  </div>
                </div>
                <div style={{ fontSize: 11, color: color, marginTop: 7, fontStyle: "italic" }}>🎯 Best for: {best}</div>
              </div>
            </div>
          ))}
        </div>

        <H2>Quick Decision Guide</H2>
        <div style={{ borderRadius: 8, overflow: "hidden", border: "1px solid #e0e0e0", marginTop: 4 }}>
          {[
            ["Scenario", "Best Option"],
            ["Remote employees need secure access from home", "AWS Client VPN"],
            ["Connect branch offices to VPC over internet", "AWS Site-to-Site VPN"],
            ["Direct Connect fails — need instant backup", "Site-to-Site VPN as failover"],
            ["VPC needs to access another VPC privately", "AWS PrivateLink"],
            ["Transfer 100TB/month between DC and AWS", "AWS Direct Connect"],
            ["Need both high bandwidth AND backup", "Direct Connect + Site-to-Site VPN fallback"],
          ].map((row, i) => (
            <div key={i} style={{
              display: "grid", gridTemplateColumns: "1fr 1fr",
              borderBottom: i < 6 ? "1px solid #f0f0f0" : "none",
              background: i === 0 ? "#263238" : i % 2 === 0 ? "#fafafa" : "white",
            }}>
              {row.map((cell, j) => (
                <div key={j} style={{
                  padding: "7px 12px", fontSize: i === 0 ? 11 : 12.5,
                  fontWeight: i === 0 ? 700 : j === 1 ? 600 : 400,
                  color: i === 0 ? accent : j === 1 ? "#6a1b9a" : "#333",
                  borderRight: j === 0 ? "1px solid #f0f0f0" : "none",
                }}>{cell}</div>
              ))}
            </div>
          ))}
        </div>

        <Callout icon="🎯" label="Exam Tip"
          text="4 connection types: Client VPN (remote workers), Site-to-Site VPN (offices/DCs over internet), PrivateLink (VPC-to-VPC/services privately), Direct Connect (dedicated fiber). Key distinction: VPN = over internet (encrypted). Direct Connect = NOT internet (dedicated). PrivateLink = no internet, no gateway needed." color="#6a1b9a" />
      </div>
    );

    case "security-nacl": return (
      <div>
        <Body>
          Inside your VPC, every packet of data travels through <b>two security checkpoints</b>:
          Network ACLs at the subnet boundary and Security Groups at the instance level.
          Understanding how they differ — especially <b>stateful vs stateless</b> — is critical for the exam.
        </Body>

        {/* Packet journey diagram */}
        <H2>The Packet Journey — Instance A to Instance B</H2>
        <div style={{ background: "#f9f9f9", borderRadius: 10, padding: 12, marginTop: 6 }}>
          <svg width="100%" viewBox="0 0 560 160" style={{ display: "block" }}>
            {/* Subnet 1 */}
            <rect x={10} y={20} width={240} height={125} rx="8" fill="#fff8e1" stroke="#FF9900" strokeWidth="1" strokeDasharray="4 2" />
            <text x={130} y={36} textAnchor="middle" fontSize="9" fontWeight="700" fill="#FF9900">Subnet 1</text>
            {/* NACL subnet 1 */}
            <rect x={20} y={44} width={42} height={90} rx="5" fill="#fff3e0" stroke="#FF9900" strokeWidth="1" />
            <text x={41} y={62} textAnchor="middle" fontSize="7" fontWeight="700" fill="#FF9900">NACL</text>
            <text x={41} y={73} textAnchor="middle" fontSize="7" fill="#FF9900">Subnet</text>
            <text x={41} y={83} textAnchor="middle" fontSize="7" fill="#FF9900">boundary</text>
            <text x={41} y={100} textAnchor="middle" fontSize="9">🛃</text>
            <text x={41} y={116} textAnchor="middle" fontSize="7" fill="#555">Stateless</text>
            <text x={41} y={125} textAnchor="middle" fontSize="7" fill="#d32f2f">checks both</text>
            <text x={41} y={134} textAnchor="middle" fontSize="7" fill="#d32f2f">directions</text>
            {/* Security group instance A */}
            <rect x={72} y={44} width={60} height={90} rx="5" fill="#fce4ec" stroke="#d32f2f" strokeWidth="1" />
            <text x={102} y={62} textAnchor="middle" fontSize="7" fontWeight="700" fill="#d32f2f">Security</text>
            <text x={102} y={72} textAnchor="middle" fontSize="7" fontWeight="700" fill="#d32f2f">Group</text>
            <text x={102} y={82} textAnchor="middle" fontSize="7" fill="#d32f2f">Instance A</text>
            <text x={102} y={96} textAnchor="middle" fontSize="9">🚪</text>
            <text x={102} y={113} textAnchor="middle" fontSize="7" fill="#555">Stateful</text>
            <text x={102} y={122} textAnchor="middle" fontSize="7" fill="#0f9d58">auto-allows</text>
            <text x={102} y={131} textAnchor="middle" fontSize="7" fill="#0f9d58">return traffic</text>
            {/* Instance A */}
            <rect x={142} y={65} width={95} height={50} rx="7" fill="#c8e6c9" stroke="#0f9d58" strokeWidth="1" />
            <text x={189} y={84} textAnchor="middle" fontSize="13">🖥️</text>
            <text x={189} y={98} textAnchor="middle" fontSize="8" fontWeight="700" fill="#0f9d58">Instance A</text>
            <text x={189} y={108} textAnchor="middle" fontSize="7" fill="#555">Subnet 1</text>

            {/* Arrow between subnets */}
            <line x1={252} y1={90} x2={308} y2={90} stroke="#1a73e8" strokeWidth="2" />
            <polygon points="308,86 308,94 314,90" fill="#1a73e8" />
            <text x={280} y={82} textAnchor="middle" fontSize="8" fontWeight="700" fill="#1a73e8">packet</text>
            <text x={280} y={103} textAnchor="middle" fontSize="7" fill="#1a73e8">→ travels →</text>

            {/* Subnet 2 */}
            <rect x={310} y={20} width={240} height={125} rx="8" fill="#e8eaf6" stroke="#3f51b5" strokeWidth="1" strokeDasharray="4 2" />
            <text x={430} y={36} textAnchor="middle" fontSize="9" fontWeight="700" fill="#3f51b5">Subnet 2</text>
            {/* NACL subnet 2 */}
            <rect x={318} y={44} width={42} height={90} rx="5" fill="#e8eaf6" stroke="#3f51b5" strokeWidth="1" />
            <text x={339} y={62} textAnchor="middle" fontSize="7" fontWeight="700" fill="#3f51b5">NACL</text>
            <text x={339} y={73} textAnchor="middle" fontSize="7" fill="#3f51b5">Subnet</text>
            <text x={339} y={83} textAnchor="middle" fontSize="7" fill="#3f51b5">boundary</text>
            <text x={339} y={100} textAnchor="middle" fontSize="9">🛃</text>
            <text x={339} y={116} textAnchor="middle" fontSize="7" fill="#555">Stateless</text>
            <text x={339} y={125} textAnchor="middle" fontSize="7" fill="#d32f2f">checks both</text>
            <text x={339} y={134} textAnchor="middle" fontSize="7" fill="#d32f2f">directions</text>
            {/* Security group instance B */}
            <rect x={368} y={44} width={60} height={90} rx="5" fill="#fce4ec" stroke="#d32f2f" strokeWidth="1" />
            <text x={398} y={62} textAnchor="middle" fontSize="7" fontWeight="700" fill="#d32f2f">Security</text>
            <text x={398} y={72} textAnchor="middle" fontSize="7" fontWeight="700" fill="#d32f2f">Group</text>
            <text x={398} y={82} textAnchor="middle" fontSize="7" fill="#d32f2f">Instance B</text>
            <text x={398} y={96} textAnchor="middle" fontSize="9">🚪</text>
            <text x={398} y={113} textAnchor="middle" fontSize="7" fill="#555">Stateful</text>
            <text x={398} y={122} textAnchor="middle" fontSize="7" fill="#0f9d58">auto-allows</text>
            <text x={398} y={131} textAnchor="middle" fontSize="7" fill="#0f9d58">return traffic</text>
            {/* Instance B */}
            <rect x={436} y={65} width={100} height={50} rx="7" fill="#bbdefb" stroke="#1a73e8" strokeWidth="1" />
            <text x={486} y={84} textAnchor="middle" fontSize="13">🖥️</text>
            <text x={486} y={98} textAnchor="middle" fontSize="8" fontWeight="700" fill="#1a73e8">Instance B</text>
            <text x={486} y={108} textAnchor="middle" fontSize="7" fill="#555">Subnet 2</text>

            {/* Journey labels at bottom */}
            <text x={280} y={155} textAnchor="middle" fontSize="8" fill="#555">
              Packet path: Instance A SG → Subnet 1 NACL → Subnet 2 NACL → Instance B SG → Instance B
            </text>
          </svg>
        </div>

        <H2>The Full Packet Round-Trip — Step by Step</H2>
        <div style={{ display: "flex", flexDirection: "column", gap: 4, marginTop: 6 }}>
          {[
            { dir: "→", step: "1. Instance A SG — Outbound", detail: "Security Group checks outbound rules. By default all outbound is ALLOWED. Packet leaves Instance A.", color: "#d32f2f", ok: true },
            { dir: "→", step: "2. Subnet 1 NACL — Outbound", detail: "NACL checks outbound rules. Stateless — must have explicit allow rule. If allowed, packet exits Subnet 1.", color: "#FF9900", ok: true },
            { dir: "→", step: "3. Subnet 2 NACL — Inbound", detail: "NACL checks inbound rules. Stateless — checks again. Separate rule from outbound. Must be explicitly allowed.", color: "#FF9900", ok: true },
            { dir: "→", step: "4. Instance B SG — Inbound", detail: "Security Group checks inbound rules. If sender is approved, packet is accepted. Instance B processes the request.", color: "#d32f2f", ok: true },
            { dir: "←", step: "5. Return: Instance B SG — Outbound", detail: "Stateful — SG remembers the original inbound request. Return traffic AUTOMATICALLY allowed. No rule check needed.", color: "#0f9d58", ok: true },
            { dir: "←", step: "6. Return: Subnet 2 NACL — Outbound", detail: "Stateless — NACL does NOT remember. Must check outbound rules again. Explicit allow rule required for return traffic.", color: "#FF9900", ok: true },
            { dir: "←", step: "7. Return: Subnet 1 NACL — Inbound", detail: "Stateless — checks inbound rules again. Must have explicit allow rule for return traffic ports.", color: "#FF9900", ok: true },
            { dir: "←", step: "8. Return: Instance A SG — Inbound", detail: "Stateful — SG remembers sending the request. Return traffic AUTOMATICALLY allowed back in. Packet delivered.", color: "#0f9d58", ok: true },
          ].map(({ dir, step, detail, color }) => (
            <div key={step} style={{
              display: "flex", gap: 10, alignItems: "flex-start",
              border: `1px solid ${color}25`, borderLeft: `3px solid ${color}`,
              borderRadius: 7, padding: "7px 11px", background: color + "05",
            }}>
              <div style={{
                width: 22, height: 22, borderRadius: "50%", background: color,
                color: "white", fontWeight: 700, fontSize: 11, flexShrink: 0,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>{dir}</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 12, color, marginBottom: 2 }}>{step}</div>
                <div style={{ fontSize: 12, color: "#555", lineHeight: 1.5 }}>{detail}</div>
              </div>
            </div>
          ))}
        </div>

        <H2>Security Group vs NACL — The Core Difference</H2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 6 }}>
          <div style={{ border: "1px solid #d32f2f30", borderTop: "3px solid #d32f2f", borderRadius: 8, padding: "12px" }}>
            <div style={{ fontWeight: 700, fontSize: 13, color: "#d32f2f", marginBottom: 8 }}>🚪 Security Group</div>
            <Analogy icon="🏢" label="Doorman analogy"
              text="Like a doorman at a building. Checks who comes in. Doesn't check who leaves — everyone can go out. REMEMBERS who entered, so lets them back in without checking again."
              color="#d32f2f" />
            <div style={{ marginTop: 8 }}>
              {[
                ["Level", "EC2 instance"],
                ["State", "✅ Stateful — remembers connections"],
                ["Rules", "Allow only (no explicit deny)"],
                ["Inbound default", "❌ Deny ALL"],
                ["Outbound default", "✅ Allow ALL"],
                ["Return traffic", "Auto-allowed (no rule needed)"],
              ].map(([k, v]) => (
                <div key={k} style={{ display: "flex", gap: 8, padding: "3px 0", borderBottom: "1px solid #f5f5f5", fontSize: 12 }}>
                  <span style={{ fontWeight: 700, color: "#d32f2f", minWidth: 110 }}>{k}:</span>
                  <span style={{ color: "#555" }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ border: "1px solid #FF990030", borderTop: "3px solid #FF9900", borderRadius: 8, padding: "12px" }}>
            <div style={{ fontWeight: 700, fontSize: 13, color: accentDark, marginBottom: 8 }}>🛃 Network ACL (NACL)</div>
            <Analogy icon="✈️" label="Passport control analogy"
              text="Like passport control at a border. Checks EVERYONE entering AND leaving. Has a strict list of who can pass. DOES NOT remember previous visits — checks you every single time."
              color="#FF9900" />
            <div style={{ marginTop: 8 }}>
              {[
                ["Level", "Subnet boundary"],
                ["State", "❌ Stateless — no memory"],
                ["Rules", "Allow AND Deny rules"],
                ["Inbound default", "✅ Allow ALL (default NACL)"],
                ["Outbound default", "✅ Allow ALL (default NACL)"],
                ["Return traffic", "Must explicitly allow — NOT automatic"],
              ].map(([k, v]) => (
                <div key={k} style={{ display: "flex", gap: 8, padding: "3px 0", borderBottom: "1px solid #f5f5f5", fontSize: 12 }}>
                  <span style={{ fontWeight: 700, color: accentDark, minWidth: 110 }}>{k}:</span>
                  <span style={{ color: "#555" }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Callout icon="🎯" label="Exam Tip — The Most Tested Concept"
          text="Stateful (Security Group) = remembers connections, return traffic auto-allowed. Stateless (NACL) = checks EVERY packet in both directions, must explicitly allow return traffic. Both evaluate INDEPENDENTLY — NACL doesn't care what Security Group allowed. This is the #1 networking question on the exam." color="#d32f2f" />
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
          Once Route 53 resolves your domain, users need the content delivered fast.
          <b> Amazon CloudFront</b> and <b>AWS Global Accelerator</b> are the two edge services
          that make your application fast and reliable for users worldwide.
        </Body>

        <H2>Amazon CloudFront — CDN Deep Dive</H2>
        <Analogy icon="🚚" label="Delivery Truck Network Analogy"
          text="CloudFront is like a global network of delivery trucks pre-positioned in every city. Instead of all orders shipping from one central warehouse (your origin server), copies of your goods are stored in local depots (edge locations) near customers. Most customers get their order from the local depot in seconds — only new or unusual items need to travel from the central warehouse."
          color="#d32f2f" />
        <div style={{ marginTop: 10 }}>
          <KV rows={[
            ["What it is", "Content Delivery Network (CDN). Stores copies of content at 400+ edge locations globally. Delivers with low latency.", "#d32f2f"],
            ["What it caches", "Static: images, CSS, JS, videos, software downloads. Dynamic: API responses, personalised content.", "#1a73e8"],
            ["Cache HIT", "Content already at edge → served instantly (~5ms). No round-trip to origin needed.", "#0f9d58"],
            ["Cache MISS", "Edge fetches from origin once → caches it → all future users in that area get it from cache.", "#FF9900"],
            ["Security", "Integrates with AWS Shield (DDoS), WAF (firewall), and ACM (SSL/TLS certificates). HTTPS by default.", "#6a1b9a"],
            ["Origin types", "S3 buckets, EC2 instances, ELB, API Gateway, any HTTP server, even non-AWS origins.", "#546e7a"],
          ]} />
        </div>

        <H2>CloudFront Real-World Use Cases</H2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginTop: 6 }}>
          {[
            { icon: "🎬", title: "Streaming Video", color: "#d32f2f",
              company: "Online workout platform",
              story: "Uses CloudFront to buffer-free stream HD videos to thousands of simultaneous users during peak exercise hours. Edge locations pre-cache popular videos nearest to users' cities." },
            { icon: "🛒", title: "E-Commerce", color: "#0f9d58",
              company: "Online retail store",
              story: "Delivers product images and web pages instantly during busy shopping seasons. Faster load times reduce abandoned carts and increase conversions." },
            { icon: "📱", title: "Mobile App", color: "#1a73e8",
              company: "Travel navigation app",
              story: "Delivers map tiles and images instantly to phones worldwide. Travellers navigate new cities without frustrating delays even on slower mobile networks." },
          ].map(({ icon, title, color, company, story }) => (
            <div key={title} style={{ border: `1px solid ${color}25`, borderTop: `3px solid ${color}`, borderRadius: 8, padding: "10px 12px" }}>
              <div style={{ fontSize: 22, marginBottom: 4 }}>{icon}</div>
              <div style={{ fontWeight: 700, fontSize: 12, color, marginBottom: 3 }}>{title}</div>
              <div style={{ fontSize: 10.5, fontWeight: 700, color: "#888", marginBottom: 5 }}>📌 {company}</div>
              <div style={{ fontSize: 12, color: "#555", lineHeight: 1.5 }}>{story}</div>
            </div>
          ))}
        </div>

        <H2>AWS Global Accelerator</H2>
        <Analogy icon="🛣️" label="Express Lane Analogy"
          text="Global Accelerator is like creating private express lanes on the internet highway just for your application. Regular traffic fights through congestion on public roads (internet). Your users get routed onto the AWS private global network immediately — less hops, less congestion, faster and more consistent performance."
          color="#6a1b9a" />
        <div style={{ marginTop: 10 }}>
          <KV rows={[
            ["What it is", "Routes application traffic through the AWS global private network — bypassing the public internet for most of the journey.", "#6a1b9a"],
            ["How it works", "Users connect to the nearest AWS edge location. Traffic then travels on AWS's private backbone to your application endpoint.", "#1a73e8"],
            ["vs CloudFront", "CloudFront = caches CONTENT at edge. Global Accelerator = routes CONNECTIONS (TCP/UDP) faster via AWS network. Different use cases.", "#FF9900"],
            ["Health checks", "Monitors endpoints. Instant failover (within ~30 seconds) if an endpoint becomes unhealthy. No DNS TTL delays.", "#0f9d58"],
            ["Use cases", "Real-time gaming (low latency), financial apps (reliability), VoIP (consistent throughput), anything needing stable TCP/UDP.", "#d32f2f"],
          ]} />
        </div>

        <H2>CloudFront vs Route 53 vs Global Accelerator — When to Use Each</H2>
        <div style={{ borderRadius: 8, overflow: "hidden", border: "1px solid #e0e0e0", marginTop: 6 }}>
          {[
            ["Service", "Type", "Best For", "Not For"],
            ["Route 53", "DNS", "Domain resolution, routing policies, health checks, failover", "Content caching or acceleration"],
            ["CloudFront", "CDN", "Caching static/dynamic content, video streaming, websites", "Real-time TCP/UDP apps needing low latency"],
            ["Global Accelerator", "Network routing", "Real-time apps (gaming, finance, VoIP), instant failover", "Static content delivery (use CloudFront instead)"],
          ].map((row, i) => (
            <div key={i} style={{
              display: "grid", gridTemplateColumns: "1fr 0.7fr 1.5fr 1.3fr",
              borderBottom: i < 3 ? "1px solid #f0f0f0" : "none",
              background: i === 0 ? "#263238" : i % 2 === 0 ? "#fafafa" : "white",
            }}>
              {row.map((cell, j) => (
                <div key={j} style={{
                  padding: "7px 10px", fontSize: i === 0 ? 10.5 : 12,
                  fontWeight: i === 0 || j === 0 ? 700 : 400,
                  color: i === 0 ? accent : j === 0 ? ["#1a73e8","#d32f2f","#6a1b9a"][i - 1] || "#333" : "#555",
                  borderRight: j < 3 ? "1px solid #f0f0f0" : "none",
                  lineHeight: 1.45,
                }}>{cell}</div>
              ))}
            </div>
          ))}
        </div>
        <Callout icon="🎯" label="Exam Tip"
          text="CloudFront = CDN, caches content, reduces load on origin, works for websites/video/images. Global Accelerator = network routing via AWS private backbone, no caching, for TCP/UDP real-time apps. Route 53 = DNS resolution and traffic routing policies. All three use AWS edge locations but do different jobs." color="#d32f2f" />
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
