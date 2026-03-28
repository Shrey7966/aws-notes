import { useState } from "react";

const accent = "#FF9900";
const accentDark = "#CC7A00";

// ─── Tiny helpers ────────────────────────────────────────────────────────────
function Badge({ text, color }) {
  return (
    <span style={{
      display: "inline-block", background: color + "20", color,
      border: `1px solid ${color}40`, borderRadius: 20,
      fontSize: 10, fontWeight: 600, padding: "2px 9px", textTransform: "uppercase",
    }}>{text}</span>
  );
}
function Callout({ icon, label, text, color = accent }) {
  return (
    <div style={{
      background: color + "12", border: `1px solid ${color}35`,
      borderLeft: `3px solid ${color}`, borderRadius: 8,
      padding: "9px 13px", margin: "10px 0 0",
    }}>
      <div style={{ fontWeight: 700, fontSize: 11, color, marginBottom: 3 }}>{icon} {label}</div>
      <div style={{ fontSize: 13, lineHeight: 1.6, color: "var(--color-text-secondary)" }}>{text}</div>
    </div>
  );
}
function Analogy({ icon, label, text, color = "#546e7a" }) {
  return (
    <div style={{
      background: "var(--color-background-secondary)", borderLeft: `3px solid ${color}`,
      borderRadius: 8, padding: "9px 13px", margin: "10px 0 0",
    }}>
      <div style={{ fontWeight: 700, fontSize: 11, color, marginBottom: 3 }}>{icon} {label}</div>
      <div style={{ fontSize: 13, fontStyle: "italic", lineHeight: 1.6, color: "var(--color-text-secondary)" }}>{text}</div>
    </div>
  );
}
function H2({ children }) {
  return <div style={{ fontWeight: 600, fontSize: 13, color: "var(--color-text-primary)", margin: "14px 0 6px" }}>{children}</div>;
}
function BodyText({ children }) {
  return <div style={{ fontSize: 13.5, lineHeight: 1.65, color: "var(--color-text-secondary)", marginTop: 6 }}>{children}</div>;
}
function Bullets({ items, color = accent }) {
  return (
    <div>{items.map((it, i) => (
      <div key={i} style={{ display: "flex", gap: 7, fontSize: 13, lineHeight: 1.55, color: "var(--color-text-secondary)", marginBottom: 4 }}>
        <span style={{ color, fontWeight: 700, flexShrink: 0 }}>→</span>
        <span dangerouslySetInnerHTML={{ __html: it }} />
      </div>
    ))}</div>
  );
}
function KVTable({ rows, col1 = "30%", c1color = "#1a73e8" }) {
  return (
    <div style={{ borderRadius: 8, overflow: "hidden", border: "1px solid var(--color-border-tertiary)" }}>
      {rows.map(([k, v], i) => (
        <div key={i} style={{
          display: "grid", gridTemplateColumns: `${col1} 1fr`, gap: 10,
          padding: "8px 12px", alignItems: "start",
          borderBottom: i < rows.length - 1 ? "1px solid var(--color-border-tertiary)" : "none",
          background: i % 2 === 0 ? "var(--color-background-secondary)" : "var(--color-background-primary)",
        }}>
          <div style={{ fontWeight: 600, fontSize: 12, color: c1color }}>{k}</div>
          <div style={{ fontSize: 12.5, color: "var(--color-text-secondary)", lineHeight: 1.5 }} dangerouslySetInnerHTML={{ __html: v }} />
        </div>
      ))}
    </div>
  );
}

// ─── SVG Illustrations ────────────────────────────────────────────────────────

// Container vs VM Diagram
function ContainerVsVMDiagram() {
  return (
    <svg width="100%" viewBox="0 0 520 200" style={{ display: "block", margin: "10px 0" }}>
      {/* VM Side */}
      <text x="120" y="18" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--color-text-primary)">Virtual Machines</text>
      {/* VM boxes */}
      {[0, 1, 2].map(i => (
        <g key={i}>
          <rect x={10 + i * 78} y={25} width={70} height={22} rx="4" fill="#E3F2FD" stroke="#1a73e8" strokeWidth="0.8" />
          <text x={45 + i * 78} y={40} textAnchor="middle" fontSize="9" fontWeight="600" fill="#1a73e8">App {i + 1}</text>
          <rect x={10 + i * 78} y={48} width={70} height={30} rx="3" fill="#B3E5FC" stroke="#0288d1" strokeWidth="0.7" />
          <text x={45 + i * 78} y={60} textAnchor="middle" fontSize="8" fill="#0277bd">Guest OS</text>
          <text x={45 + i * 78} y={71} textAnchor="middle" fontSize="7.5" fill="#0277bd">(full)</text>
        </g>
      ))}
      <rect x={10} y={80} width={228} height={18} rx="3" fill="#006064" />
      <text x={124} y={92} textAnchor="middle" fontSize="9" fontWeight="600" fill="white">Hypervisor</text>
      <rect x={10} y={100} width={228} height={18} rx="3" fill="#004D40" />
      <text x={124} y={112} textAnchor="middle" fontSize="9" fontWeight="600" fill="white">Server</text>
      {/* Labels */}
      <text x={124} y={132} textAnchor="middle" fontSize="9" fill="#d32f2f">❌ Each VM carries its own full OS</text>
      <text x={124} y={145} textAnchor="middle" fontSize="8.5" fill="var(--color-text-secondary)">Heavier · Slower start · More RAM</text>

      {/* Container Side */}
      <text x={395} y={18} textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--color-text-primary)">Containers</text>
      {[0, 1, 2].map(i => (
        <g key={i}>
          <rect x={270 + i * 84} y={25} width={76} height={20} rx="4" fill="#E8F5E9" stroke="#0f9d58" strokeWidth="0.8" />
          <text x={308 + i * 84} y={39} textAnchor="middle" fontSize="9" fontWeight="600" fill="#0f9d58">App {i + 1}</text>
        </g>
      ))}
      {/* Shared layers */}
      <rect x={270} y={47} width={240} height={18} rx="3" fill="#1565C0" />
      <text x={390} y={59} textAnchor="middle" fontSize="9" fontWeight="600" fill="white">Containerization Platform (Docker)</text>
      <rect x={270} y={67} width={240} height={18} rx="3" fill="#006064" />
      <text x={390} y={79} textAnchor="middle" fontSize="9" fontWeight="600" fill="white">Operating System (shared)</text>
      <rect x={270} y={87} width={240} height={18} rx="3" fill="#004D40" />
      <text x={390} y={99} textAnchor="middle" fontSize="9" fontWeight="600" fill="white">Server</text>
      <text x={390} y={122} textAnchor="middle" fontSize="9" fill="#0f9d58">✅ All containers share host OS</text>
      <text x={390} y={135} textAnchor="middle" fontSize="8.5" fill="var(--color-text-secondary)">Lighter · Faster start · Efficient</text>

      {/* VS divider */}
      <line x1="248" y1="20" x2="248" y2="155" stroke="var(--color-border-tertiary)" strokeWidth="1" strokeDasharray="4 2" />
      <rect x={228} y={80} width={40} height={22} rx="11" fill={accent} />
      <text x={248} y={95} textAnchor="middle" fontSize="10" fontWeight="700" fill="white">VS</text>
    </svg>
  );
}

// Lambda How It Works (4-step flow)
function LambdaFlowDiagram() {
  const steps = [
    { num: "1", label: "Upload code\nto Lambda", icon: "📤", color: "#1a73e8" },
    { num: "2", label: "Set trigger\n(event source)", icon: "⚡", color: "#FF9900" },
    { num: "3", label: "Run code\nwhen triggered", icon: "▶️", color: "#0f9d58" },
    { num: "4", label: "Pay only for\ncompute used", icon: "💰", color: "#6a1b9a" },
  ];
  return (
    <svg width="100%" viewBox="0 0 520 100" style={{ display: "block", margin: "8px 0" }}>
      {steps.map((s, i) => {
        const x = 20 + i * 125;
        return (
          <g key={i}>
            <rect x={x} y={12} width={105} height={72} rx="10" fill={s.color + "18"} stroke={s.color} strokeWidth="1" />
            <text x={x + 52} y={35} textAnchor="middle" fontSize="20">{s.icon}</text>
            <text x={x + 52} y={55} textAnchor="middle" fontSize="8" fontWeight="700" fill={s.color}>{s.label.split("\n")[0]}</text>
            <text x={x + 52} y={66} textAnchor="middle" fontSize="8" fontWeight="700" fill={s.color}>{s.label.split("\n")[1]}</text>
            <circle cx={x + 14} cy={20} r={9} fill={s.color} />
            <text x={x + 14} y={24} textAnchor="middle" fontSize="9" fontWeight="700" fill="white">{s.num}</text>
            {i < steps.length - 1 && (
              <g>
                <line x1={x + 107} y1={48} x2={x + 121} y2={48} stroke={accent} strokeWidth="1.5" />
                <polygon points={`${x + 121},44 ${x + 121},52 ${x + 127},48`} fill={accent} />
              </g>
            )}
          </g>
        );
      })}
    </svg>
  );
}

// Container deployment consistency
function DeploymentConsistencyDiagram() {
  return (
    <svg width="100%" viewBox="0 0 500 100" style={{ display: "block", margin: "8px 0" }}>
      {/* Source */}
      <rect x={10} y={25} width={70} height={55} rx="8" fill="#E3F2FD" stroke="#1a73e8" strokeWidth="1" />
      <text x={45} y={48} textAnchor="middle" fontSize="18">💻</text>
      <text x={45} y={65} textAnchor="middle" fontSize="9" fontWeight="600" fill="#1a73e8">Source</text>
      <text x={45} y={75} textAnchor="middle" fontSize="9" fill="#1a73e8">Code</text>
      {/* Build arrow */}
      <line x1={82} y1={52} x2={115} y2={52} stroke="#0f9d58" strokeWidth="1.5" strokeDasharray="4 2" />
      <polygon points="115,48 115,56 121,52" fill="#0f9d58" />
      <text x={100} y={44} textAnchor="middle" fontSize="8" fill="#0f9d58">Build</text>
      {/* Container image */}
      {[0, 1, 2].map(i => {
        const envs = ["QA", "Staging", "Production"];
        const colors = ["#0f9d58", "#FF9900", "#1a73e8"];
        const x = 128 + i * 120;
        return (
          <g key={i}>
            <rect x={x} y={20} width={100} height={65} rx="8" fill={colors[i] + "15"} stroke={colors[i]} strokeWidth="1.2" />
            <text x={x + 50} y={45} textAnchor="middle" fontSize="20">📦</text>
            <text x={x + 50} y={62} textAnchor="middle" fontSize="10" fontWeight="700" fill={colors[i]}>{envs[i]}</text>
            <text x={x + 50} y={75} textAnchor="middle" fontSize="8" fill={colors[i]}>✓ Same image</text>
            {i < 2 && (
              <g>
                <line x1={x + 102} y1={52} x2={x + 118} y2={52} stroke="var(--color-border-tertiary)" strokeWidth="1" />
                <polygon points={`${x + 118},48 ${x + 118},56 ${x + 122},52`} fill="var(--color-text-secondary)" />
              </g>
            )}
          </g>
        );
      })}
    </svg>
  );
}

// Container orchestration scale diagram
function OrchestrationScaleDiagram() {
  return (
    <svg width="100%" viewBox="0 0 500 130" style={{ display: "block", margin: "8px 0" }}>
      {/* Before */}
      <text x={100} y={15} textAnchor="middle" fontSize="10" fontWeight="700" fill="var(--color-text-primary)">One host, few containers</text>
      <rect x={20} y={22} width={160} height={90} rx="8" fill="#E3F2FD" stroke="#1a73e8" strokeWidth="1" strokeDasharray="4 2" />
      {["App 1", "App 2", "App 3"].map((a, i) => (
        <rect key={i} x={32 + i * 46} y={32} width={38} height={22} rx="4" fill={["#1a73e8", "#0f9d58", "#FF9900"][i] + "60"} stroke={["#1a73e8", "#0f9d58", "#FF9900"][i]} strokeWidth="0.8" />
      ))}
      {["App 1", "App 2", "App 3"].map((a, i) => (
        <text key={i} x={51 + i * 46} y={47} textAnchor="middle" fontSize="8" fill="var(--color-text-primary)">{a}</text>
      ))}
      <rect x={32} y={58} width={136} height={14} rx="3" fill="#1565C0" />
      <text x={100} y={68} textAnchor="middle" fontSize="8" fill="white">Containerization platform</text>
      <rect x={32} y={74} width={136} height={12} rx="3" fill="#006064" />
      <text x={100} y={83} textAnchor="middle" fontSize="8" fill="white">Operating system</text>
      <rect x={32} y={88} width={136} height={12} rx="3" fill="#004D40" />
      <text x={100} y={97} textAnchor="middle" fontSize="8" fill="white">Server</text>

      {/* Arrow */}
      <text x={220} y={70} textAnchor="middle" fontSize="22" fill={accent}>→</text>
      <text x={220} y={88} textAnchor="middle" fontSize="8" fill="var(--color-text-secondary)">Scale up</text>

      {/* After */}
      <text x={380} y={15} textAnchor="middle" fontSize="10" fontWeight="700" fill="var(--color-text-primary)">Many hosts, hundreds of containers</text>
      {[[250, 22], [315, 22], [380, 22], [250, 72], [315, 72], [380, 72], [445, 22], [445, 72]].map(([x, y], i) => (
        <g key={i}>
          <rect x={x} y={y} width={58} height={40} rx="5" fill={i % 2 === 0 ? "#E3F2FD" : "#E8F5E9"} stroke={i % 2 === 0 ? "#1a73e8" : "#0f9d58"} strokeWidth="0.8" />
          <rect x={x + 4} y={y + 4} width={50} height={10} rx="2" fill={i % 2 === 0 ? "#1a73e8" : "#0f9d58"} opacity="0.7" />
          <rect x={x + 4} y={y + 16} width={50} height={10} rx="2" fill="#FF9900" opacity="0.5" />
          <rect x={x + 4} y={y + 28} width={50} height={8} rx="2" fill="#6a1b9a" opacity="0.4" />
        </g>
      ))}
      <text x={380} y={122} textAnchor="middle" fontSize="8" fill="#d32f2f">⚠️ Manual management becomes impossible → Need Orchestration</text>
    </svg>
  );
}

// Managed service spectrum
function ManagedSpectrumDiagram() {
  return (
    <svg width="100%" viewBox="0 0 520 130" style={{ display: "block", margin: "8px 0" }}>
      {/* Arrow */}
      <defs>
        <linearGradient id="specGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#1a73e8" />
          <stop offset="50%" stopColor="#FF9900" />
          <stop offset="100%" stopColor="#0f9d58" />
        </linearGradient>
      </defs>
      <rect x={20} y={55} width={480} height={14} rx="7" fill="url(#specGrad)" opacity="0.7" />
      <polygon points="500,48 500,76 516,62" fill="#0f9d58" />
      <polygon points="20,48 20,76 4,62" fill="#1a73e8" />

      {/* Labels below */}
      <text x={90} y={82} textAnchor="middle" fontSize="10" fontWeight="700" fill="#1a73e8">Unmanaged</text>
      <text x={90} y={93} textAnchor="middle" fontSize="8.5" fill="var(--color-text-secondary)">EC2</text>
      <text x={260} y={82} textAnchor="middle" fontSize="10" fontWeight="700" fill="#FF9900">Managed</text>
      <text x={260} y={93} textAnchor="middle" fontSize="8.5" fill="var(--color-text-secondary)">ECS / EKS</text>
      <text x={440} y={82} textAnchor="middle" fontSize="10" fontWeight="700" fill="#0f9d58">Fully-Managed</text>
      <text x={440} y={93} textAnchor="middle" fontSize="8.5" fill="var(--color-text-secondary)">Lambda / Fargate</text>

      {/* Arrows pointing to the spectrum */}
      {[90, 260, 440].map((x, i) => (
        <line key={i} x1={x} y1={70} x2={x} y2={53} stroke={["#1a73e8", "#FF9900", "#0f9d58"][i]} strokeWidth="1.5" />
      ))}

      {/* Customer responsibility arrow */}
      <text x={10} y={120} fontSize="8.5" fill="var(--color-text-secondary)">← More customer responsibility</text>
      <text x={390} y={120} fontSize="8.5" fill="var(--color-text-secondary)">Less customer responsibility →</text>

      {/* Labels above */}
      <text x={90} y={44} textAnchor="middle" fontSize="8" fill="#1a73e8">You manage OS,</text>
      <text x={90} y={54} textAnchor="middle" fontSize="8" fill="#1a73e8">patching, scaling</text>
      <text x={260} y={44} textAnchor="middle" fontSize="8" fill="#FF9900">AWS manages</text>
      <text x={260} y={54} textAnchor="middle" fontSize="8" fill="#FF9900">orchestration</text>
      <text x={440} y={44} textAnchor="middle" fontSize="8" fill="#0f9d58">AWS manages</text>
      <text x={440} y={54} textAnchor="middle" fontSize="8" fill="#0f9d58">everything</text>
    </svg>
  );
}

// ECS/EKS architecture diagram
function ContainerArchDiagram() {
  return (
    <svg width="100%" viewBox="0 0 520 160" style={{ display: "block", margin: "8px 0" }}>
      {/* ECR */}
      <rect x={10} y={55} width={90} height={55} rx="8" fill="#FF990018" stroke={accent} strokeWidth="1.2" />
      <text x={55} y={78} textAnchor="middle" fontSize="16">🗄️</text>
      <text x={55} y={93} textAnchor="middle" fontSize="9" fontWeight="700" fill={accent}>Amazon ECR</text>
      <text x={55} y={103} textAnchor="middle" fontSize="7.5" fill="var(--color-text-secondary)">Image Registry</text>

      {/* Arrow to orchestrator */}
      <line x1={102} y1={82} x2={148} y2={82} stroke={accent} strokeWidth="1.3" />
      <polygon points="148,78 148,86 154,82" fill={accent} />
      <text x={125} y={73} textAnchor="middle" fontSize="7.5" fill="var(--color-text-secondary)">pull image</text>

      {/* Orchestration box */}
      <rect x={155} y={30} width={190} height={105} rx="10" fill="#1a73e818" stroke="#1a73e8" strokeWidth="1.2" />
      <text x={250} y={50} textAnchor="middle" fontSize="9" fontWeight="700" fill="#1a73e8">ORCHESTRATION</text>
      {/* ECS */}
      <rect x={168} y={56} width={75} height={32} rx="6" fill="#1a73e830" stroke="#1a73e8" strokeWidth="0.8" />
      <text x={205} y={70} textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#1a73e8">Amazon ECS</text>
      <text x={205} y={81} textAnchor="middle" fontSize="7.5" fill="#1a73e8">AWS-native</text>
      {/* EKS */}
      <rect x={257} y={56} width={75} height={32} rx="6" fill="#6a1b9a30" stroke="#6a1b9a" strokeWidth="0.8" />
      <text x={294} y={70} textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#6a1b9a">Amazon EKS</text>
      <text x={294} y={81} textAnchor="middle" fontSize="7.5" fill="#6a1b9a">Kubernetes</text>
      {/* OR label */}
      <text x={250} y={107} textAnchor="middle" fontSize="8" fill="var(--color-text-secondary)">Choose one based on your needs</text>

      {/* Arrow to compute */}
      <line x1={347} y1={82} x2={387} y2={82} stroke="#0f9d58" strokeWidth="1.3" />
      <polygon points="387,78 387,86 393,82" fill="#0f9d58" />
      <text x={367} y={73} textAnchor="middle" fontSize="7.5" fill="var(--color-text-secondary)">deploy on</text>

      {/* Compute box */}
      <rect x={394} y={30} width={116} height={105} rx="10" fill="#0f9d5818" stroke="#0f9d58" strokeWidth="1.2" />
      <text x={452} y={50} textAnchor="middle" fontSize="9" fontWeight="700" fill="#0f9d58">COMPUTE</text>
      {/* EC2 */}
      <rect x={406} y={56} width={92} height={28} rx="6" fill="#0f9d5830" stroke="#0f9d58" strokeWidth="0.8" />
      <text x={452} y={70} textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#0f9d58">Amazon EC2</text>
      <text x={452} y={80} textAnchor="middle" fontSize="7.5" fill="#0f9d58">You manage VMs</text>
      {/* Fargate */}
      <rect x={406} y={90} width={92} height={28} rx="6" fill="#d32f2f30" stroke="#d32f2f" strokeWidth="0.8" />
      <text x={452} y={103} textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#d32f2f">AWS Fargate</text>
      <text x={452} y={113} textAnchor="middle" fontSize="7.5" fill="#d32f2f">Serverless</text>
      <text x={250} y={148} textAnchor="middle" fontSize="8" fill="var(--color-text-secondary)">ECR → ECS or EKS → EC2 or Fargate</text>
    </svg>
  );
}

// Additional compute services grid
function AdditionalServicesGrid() {
  const services = [
    { name: "Elastic Beanstalk", icon: "🌱", color: "#0f9d58",
      tag: "PaaS", tagline: "Deploy without managing infrastructure",
      desc: "Upload your code → Beanstalk provisions EC2, ELB, Auto Scaling, networking automatically. You keep full visibility and control.",
      best: "Web apps, REST APIs, mobile backends, microservices" },
    { name: "AWS Batch", icon: "⚙️", color: "#1a73e8",
      tag: "Batch Compute", tagline: "Run heavy workloads without managing servers",
      desc: "Submit batch jobs → Batch schedules, provisions, and scales EC2 automatically. No idle servers.",
      best: "Scientific computing, ML training, genomics, financial risk analysis" },
    { name: "Amazon Lightsail", icon: "💡", color: "#FF9900",
      tag: "Simplified VPS", tagline: "Predictable monthly pricing for simple apps",
      desc: "Virtual servers, storage, databases, and networking in one simple console. No AWS complexity.",
      best: "Blogs, small websites, dev/test environments, basic web apps" },
    { name: "AWS Outposts", icon: "🏢", color: "#6a1b9a",
      tag: "Hybrid Cloud", tagline: "AWS infrastructure in YOUR data center",
      desc: "AWS-managed physical rack delivered to your premises. Run AWS services locally for low-latency or data residency needs.",
      best: "Low-latency apps, data residency/compliance, hybrid cloud, legacy modernization" },
  ];
  const [sel, setSel] = useState(null);
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        {services.map((s, i) => (
          <div key={i} onClick={() => setSel(sel === i ? null : i)} style={{
            border: sel === i ? `2px solid ${s.color}` : "1px solid var(--color-border-tertiary)",
            borderTop: `3px solid ${s.color}`, borderRadius: 8, padding: "10px 12px",
            cursor: "pointer", background: sel === i ? s.color + "10" : "var(--color-background-secondary)",
            transition: "all 0.15s",
          }}>
            <div style={{ fontSize: 20, marginBottom: 4 }}>{s.icon}</div>
            <div style={{ fontWeight: 700, fontSize: 12, color: s.color }}>{s.name}</div>
            <div style={{ fontSize: 10, color: "var(--color-text-secondary)", marginTop: 2 }}>{s.tagline}</div>
            <span style={{ fontSize: 9, background: s.color + "20", color: s.color, padding: "1px 6px", borderRadius: 4, marginTop: 4, display: "inline-block" }}>{s.tag}</span>
          </div>
        ))}
      </div>
      {sel !== null && (
        <div style={{
          marginTop: 8, border: `1px solid ${services[sel].color}40`, borderRadius: 8,
          padding: "12px 14px", background: "var(--color-background-primary)",
        }}>
          <div style={{ fontWeight: 700, fontSize: 13, color: services[sel].color, marginBottom: 6 }}>
            {services[sel].icon} {services[sel].name}
          </div>
          <div style={{ fontSize: 13, color: "var(--color-text-secondary)", lineHeight: 1.6, marginBottom: 6 }}>{services[sel].desc}</div>
          <div style={{ fontSize: 12 }}><b>Best for:</b> <span style={{ color: services[sel].color }}>{services[sel].best}</span></div>
        </div>
      )}
      <div style={{ fontSize: 11, color: "var(--color-text-secondary)", marginTop: 5, textAlign: "center" }}>Tap any card to expand</div>
    </div>
  );
}

// ─── Sections ─────────────────────────────────────────────────────────────────
const sections = [
  { id: "serverless", emoji: "⚡", title: "Serverless Computing", badge: "Key Concept", badgeColor: "#0f9d58" },
  { id: "lambda", emoji: "λ", title: "AWS Lambda", badge: "Serverless FaaS", badgeColor: "#FF9900" },
  { id: "containers", emoji: "📦", title: "Containers vs VMs", badge: "Compute", badgeColor: "#1a73e8" },
  { id: "orchestration", emoji: "🎼", title: "ECS, EKS & ECR", badge: "Container Orchestration", badgeColor: "#6a1b9a" },
  { id: "fargate", emoji: "🚀", title: "AWS Fargate", badge: "Serverless Containers", badgeColor: "#d32f2f" },
  { id: "additional", emoji: "🛠️", title: "Additional Compute Services", badge: "Beanstalk · Batch · Lightsail · Outposts", badgeColor: "#546e7a" },
  { id: "managed", emoji: "📊", title: "Managed vs Unmanaged", badge: "Responsibility Spectrum", badgeColor: "#1a73e8" },
];

function SectionContent({ id }) {
  switch (id) {

    case "serverless": return (
      <div>
        <H2>What Does "Serverless" Mean?</H2>
        <BodyText>
          Serverless doesn't mean there are no servers — it means <b>YOU don't manage any servers</b>.
          AWS provisions, scales, patches, and maintains all the infrastructure automatically.
          You just write and deploy code.
        </BodyText>
        <H2>The Spectrum: Unmanaged → Managed → Fully-Managed</H2>
        <ManagedSpectrumDiagram />
        <KVTable rows={[
          ["Unmanaged (EC2)", "AWS manages physical hardware. <b>You</b> manage: OS, patches, security, scaling, networking."],
          ["Managed (ECS/EKS)", "AWS manages orchestration. <b>You</b> still manage: underlying EC2 fleet, OS patches, capacity."],
          ["Fully-Managed (Lambda, Fargate)", "AWS manages everything. <b>You</b> only manage: your code and application logic."],
        ]} />
        <Callout icon="🎯" label="Exam Tip"
          text="Serverless = no server management. Lambda and Fargate are AWS's two main serverless compute options. As you move from EC2 → ECS → Lambda, your responsibility decreases and AWS's responsibility increases." />
      </div>
    );

    case "lambda": return (
      <div>
        <H2>What is AWS Lambda?</H2>
        <BodyText>
          Lambda is a <b>serverless, event-driven compute service</b> (Function as a Service / FaaS).
          You upload code, set a trigger, and Lambda runs your function automatically — scaling from
          zero to thousands of concurrent executions without you managing any servers.
        </BodyText>
        <Analogy icon="🦀" label="The Crab Classifier Analogy"
          text="You want to classify crab species from photos. Instead of provisioning servers to run the classifier 24/7, you create a Lambda function. When a user uploads a photo (trigger), Lambda runs your classification code instantly, scales to handle 10,000 uploads at once if needed, then scales back to zero. You pay only for the milliseconds your code runs."
          color="#0f9d58" />
        <H2>How Lambda Works — 4 Steps</H2>
        <LambdaFlowDiagram />
        <H2>Key Lambda Facts</H2>
        <KVTable rows={[
          ["Max execution time", "<b>15 minutes</b> per function invocation. Not suitable for long-running processes."],
          ["Triggers (event sources)", "S3 uploads, SQS messages, API Gateway, DynamoDB streams, SNS topics, CloudWatch Events, and more."],
          ["Supported runtimes", "Java, Python, Node.js, Go, Ruby, .NET, and custom runtimes via Lambda Layers."],
          ["Scaling", "Automatic and instant. From 0 to thousands of concurrent executions. No capacity planning."],
          ["Pricing", "Pay per <b>number of requests</b> + <b>duration</b> (GB-seconds). Zero charge when function isn't running."],
          ["Managed environment", "AWS handles patching, security, availability, and scaling. You only manage your function code."],
          ["AWS integrations", "Natively integrates with 200+ AWS services. Build complete apps without managing any servers."],
        ]} />
        <H2>Lambda Use Cases (Real-World)</H2>
        <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 4 }}>
          {[
            { icon: "🖼️", title: "Image Processing (Social Media)", color: "#1a73e8",
              desc: "User uploads photo → S3 trigger → Lambda resizes into multiple resolutions, applies filters, saves to storage. Scales with every upload automatically." },
            { icon: "📰", title: "Personalized Content (News Aggregator)", color: "#0f9d58",
              desc: "User opens app → API Gateway trigger → Lambda fetches articles, runs personalization logic, returns tailored feed. Only runs when users interact." },
            { icon: "🎮", title: "Real-Time Event Handling (Gaming)", color: "#FF9900",
              desc: "Player scores a point → Lambda triggered → updates leaderboard, game state, and player data in real-time. Handles thousands of events simultaneously." },
          ].map(({ icon, title, color, desc }) => (
            <div key={title} style={{
              border: `1px solid ${color}30`, borderLeft: `3px solid ${color}`,
              borderRadius: 8, padding: "9px 12px", background: color + "08",
            }}>
              <div style={{ fontWeight: 700, fontSize: 12, color, marginBottom: 4 }}>{icon} {title}</div>
              <div style={{ fontSize: 12, color: "var(--color-text-secondary)", lineHeight: 1.5 }}>{desc}</div>
            </div>
          ))}
        </div>
        <Callout icon="🎯" label="Exam Tip"
          text="Lambda = event-driven, serverless, max 15 min, pay per use. Key triggers: S3, SQS, API Gateway, DynamoDB Streams. Lambda + SQS is a classic exam pattern for decoupled, event-driven architectures." />
      </div>
    );

    case "containers": return (
      <div>
        <H2>The Problem Containers Solve</H2>
        <BodyText>
          <b>"It works on my machine!"</b> — the most frustrating phrase in software development.
          Containers fix this by packaging <b>everything your app needs</b> into one portable unit
          that runs identically everywhere: your laptop, a test server, or AWS production.
        </BodyText>

        {/* What's inside a container */}
        <H2>🍱 What's Inside a Container?</H2>
        <div style={{ background: "#263238", borderRadius: 10, padding: "12px 14px", marginTop: 6 }}>
          <div style={{ fontSize: 12.5, color: "rgba(255,255,255,0.75)", marginBottom: 10, lineHeight: 1.6 }}>
            Think of it like a <b style={{ color: accent }}>packed lunch box</b> — everything you need for the meal is inside. No searching around for extra ingredients.
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {[
              { icon: "🍔", label: "Code", color: "#1a73e8", desc: "Your actual application code" },
              { icon: "⚙️", label: "Runtime", color: "#0f9d58", desc: "Node.js, Python, Java — the engine" },
              { icon: "📦", label: "Dependencies", color: "#FF9900", desc: "Libraries, packages, frameworks" },
              { icon: "🔧", label: "Config", color: "#6a1b9a", desc: "Env variables, settings, files" },
            ].map(({ icon, label, color, desc }) => (
              <div key={label} style={{ background: color + "20", border: `1px solid ${color}35`, borderRadius: 8, padding: "9px 11px", display: "flex", gap: 9 }}>
                <span style={{ fontSize: 20 }}>{icon}</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 12, color }}>{label}</div>
                  <div style={{ fontSize: 11.5, color: "rgba(255,255,255,0.7)", marginTop: 2 }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 10, textAlign: "center", fontSize: 12.5, color: accent, fontWeight: 700 }}>
            👉 All bundled together so it runs the same anywhere
          </div>
        </div>

        {/* VM vs Container - the big idea */}
        <H2>🆚 Containers vs Virtual Machines — The Big Idea</H2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 6 }}>
          {/* VMs */}
          <div style={{ border: "1px solid #d32f2f30", borderTop: "3px solid #d32f2f", borderRadius: 9, overflow: "hidden" }}>
            <div style={{ background: "#d32f2f", padding: "9px 12px" }}>
              <div style={{ fontWeight: 700, fontSize: 13, color: "white" }}>🖥️ Virtual Machines</div>
              <div style={{ fontSize: 10.5, color: "rgba(255,255,255,0.8)" }}>Each app = its own full computer</div>
            </div>
            <div style={{ padding: "10px 12px", background: "white" }}>
              <div style={{ background: "#fce4ec", borderRadius: 7, padding: "8px 10px", marginBottom: 8, fontSize: 12.5, fontStyle: "italic", color: "#555" }}>
                🧠 Like running multiple full laptops inside one big machine. Each laptop has its own OS, RAM, everything.
              </div>
              <div style={{ fontWeight: 700, fontSize: 11, color: "#d32f2f", marginBottom: 5 }}>Each VM has:</div>
              {["Its own complete Operating System", "Its own allocated RAM & CPU", "Minutes to start (booting OS)", "Heavy resource footprint"].map(p => (
                <div key={p} style={{ fontSize: 12, color: "#555", marginBottom: 3 }}>• {p}</div>
              ))}
              <div style={{ marginTop: 8 }}>
                <div style={{ fontWeight: 700, fontSize: 11, color: "#0f9d58", marginBottom: 4 }}>✅ When VMs win:</div>
                {["Strong security isolation (banking)", "Need different OS (Linux + Windows)", "Legacy apps needing full OS access", "Full kernel/driver control"].map(p => (
                  <div key={p} style={{ fontSize: 11.5, color: "#555", marginBottom: 2 }}>• {p}</div>
                ))}
              </div>
            </div>
          </div>
          {/* Containers */}
          <div style={{ border: "1px solid #0f9d5830", borderTop: "3px solid #0f9d58", borderRadius: 9, overflow: "hidden" }}>
            <div style={{ background: "#0f9d58", padding: "9px 12px" }}>
              <div style={{ fontWeight: 700, fontSize: 13, color: "white" }}>📦 Containers</div>
              <div style={{ fontSize: 10.5, color: "rgba(255,255,255,0.8)" }}>Apps share the OS, just isolated</div>
            </div>
            <div style={{ padding: "10px 12px", background: "white" }}>
              <div style={{ background: "#e8f5e9", borderRadius: 7, padding: "8px 10px", marginBottom: 8, fontSize: 12.5, fontStyle: "italic", color: "#555" }}>
                🧠 Like multiple apps on one phone — not multiple phones. They share the phone OS but can't see each other's data.
              </div>
              <div style={{ fontWeight: 700, fontSize: 11, color: "#0f9d58", marginBottom: 5 }}>Each container has:</div>
              {["Just your app + its dependencies", "Shared host OS kernel", "Seconds to start (no OS boot)", "Lightweight resource footprint"].map(p => (
                <div key={p} style={{ fontSize: 12, color: "#555", marginBottom: 3 }}>• {p}</div>
              ))}
              <div style={{ marginTop: 8 }}>
                <div style={{ fontWeight: 700, fontSize: 11, color: "#0f9d58", marginBottom: 4 }}>✅ When Containers win:</div>
                {["Speed & scalability", "Microservices architecture", "Consistent deployments anywhere", "Cost-efficient at scale"].map(p => (
                  <div key={p} style={{ fontSize: 11.5, color: "#555", marginBottom: 2 }}>• {p}</div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Side-by-side comparison table */}
        <H2>⚖️ Feature Comparison</H2>
        <div style={{ borderRadius: 8, overflow: "hidden", border: "1px solid #e0e0e0", marginTop: 4 }}>
          {[
            ["Feature", "Virtual Machines 🖥️", "Containers 📦"],
            ["OS", "Each has full OS", "Share host OS kernel"],
            ["Start speed", "Minutes (OS boot)", "Seconds (no OS)"],
            ["Size", "GB — heavy", "MB — lightweight"],
            ["Isolation", "Strong (separate OS)", "Process-level (shared kernel)"],
            ["Use case", "Full systems, legacy apps", "Microservices, fast deploys"],
            ["AWS service", "Amazon EC2", "ECS, EKS (with Fargate)"],
          ].map((row, i) => (
            <div key={i} style={{
              display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
              borderBottom: i < 6 ? "1px solid #f0f0f0" : "none",
              background: i === 0 ? "#263238" : i % 2 === 0 ? "#fafafa" : "white",
            }}>
              {row.map((cell, j) => (
                <div key={j} style={{
                  padding: "7px 10px", fontSize: i === 0 ? 11 : 12.5,
                  fontWeight: i === 0 || j === 0 ? 700 : 400,
                  color: i === 0 ? ["#FF9900", "#ef9a9a", "#a5d6a7"][j] || accent
                       : j === 0 ? "#333"
                       : j === 1 ? "#d32f2f"
                       : "#0f9d58",
                  borderRight: j < 2 ? "1px solid #f0f0f0" : "none",
                }}>{cell}</div>
              ))}
            </div>
          ))}
        </div>

        {/* Real-world scenario */}
        <H2>🎯 Real-World Example — 3 Apps</H2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 4 }}>
          <div style={{ border: "1px solid #d32f2f30", borderRadius: 8, padding: "11px 13px" }}>
            <div style={{ fontWeight: 700, fontSize: 12, color: "#d32f2f", marginBottom: 8 }}>❌ With VMs — lots of duplication</div>
            {[
              ["App 1", "Full OS (3GB)"],
              ["App 2", "Full OS (3GB)"],
              ["App 3", "Full OS (3GB)"],
            ].map(([app, os]) => (
              <div key={app} style={{ background: "#fce4ec", borderRadius: 6, padding: "6px 10px", marginBottom: 5, display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: "#d32f2f" }}>{app}</span>
                <span style={{ fontSize: 11.5, color: "#888" }}>{os}</span>
              </div>
            ))}
            <div style={{ fontSize: 11.5, color: "#d32f2f", marginTop: 6, textAlign: "center" }}>Total: ~9GB just for OS 😬</div>
          </div>
          <div style={{ border: "1px solid #0f9d5830", borderRadius: 8, padding: "11px 13px" }}>
            <div style={{ fontWeight: 700, fontSize: 12, color: "#0f9d58", marginBottom: 8 }}>✅ With Containers — shared OS</div>
            <div style={{ background: "#e8f5e9", borderRadius: 6, padding: "7px 10px", marginBottom: 5, textAlign: "center" }}>
              <div style={{ fontSize: 11, color: "#888" }}>Shared Host OS</div>
            </div>
            {["App 1 (100MB)", "App 2 (80MB)", "App 3 (120MB)"].map(app => (
              <div key={app} style={{ background: "#0f9d5818", border: "1px solid #0f9d5830", borderRadius: 6, padding: "6px 10px", marginBottom: 4, fontSize: 12, color: "#0f9d58", fontWeight: 600 }}>{app}</div>
            ))}
            <div style={{ fontSize: 11.5, color: "#0f9d58", marginTop: 5, textAlign: "center" }}>~300MB total. Much more efficient! 🚀</div>
          </div>
        </div>

        {/* Why companies love containers */}
        <H2>🔥 Why Companies Love Containers</H2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 7, marginTop: 4 }}>
          {[
            { icon: "🌍", text: "Deploy anywhere", sub: "Laptop, cloud, any server" },
            { icon: "⚡", text: "Faster scaling", sub: "Seconds, not minutes" },
            { icon: "🎯", text: "Consistent behavior", sub: "No 'works on my machine'" },
            { icon: "🧩", text: "Microservices-ready", sub: "Each service in own container" },
            { icon: "💰", text: "Cost efficient", sub: "More apps per server" },
            { icon: "🔄", text: "Easy CI/CD", sub: "Build once, deploy everywhere" },
          ].map(({ icon, text, sub }) => (
            <div key={text} style={{ border: "1px solid #0f9d5820", borderRadius: 8, padding: "9px 10px", textAlign: "center", background: "#0f9d5806" }}>
              <div style={{ fontSize: 22, marginBottom: 3 }}>{icon}</div>
              <div style={{ fontWeight: 700, fontSize: 11.5, color: "#0f9d58" }}>{text}</div>
              <div style={{ fontSize: 10.5, color: "#888", marginTop: 2 }}>{sub}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#263238", borderRadius: 9, padding: "10px 14px", marginTop: 10 }}>
          <div style={{ fontWeight: 700, fontSize: 12, color: accent, marginBottom: 6 }}>🧠 One-line takeaway</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.85)", textAlign: "center" }}>
              <span style={{ color: "#ef9a9a" }}>VM</span> = full computer per app
            </div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.85)", textAlign: "center" }}>
              <span style={{ color: "#a5d6a7" }}>Container</span> = just the app, sharing the system
            </div>
          </div>
        </div>

        <Callout icon="🎯" label="Exam Tip"
          text="Containers = code + runtime + dependencies + config in one portable image. Lighter/faster than VMs because they share the host OS. VMs still win for strong isolation (different OS, legacy apps, compliance). Docker = most common container platform." />
      </div>
    );

    case "orchestration": return (
      <div>
        <BodyText>
          ECR, ECS, and EKS are all about <b>running and managing containers on AWS</b>.
          ECR stores them, ECS/EKS run them. Once you understand what each one is, they click immediately.
        </BodyText>

        {/* Big picture flow */}
        <div style={{ background: "#263238", borderRadius: 10, padding: "12px 14px", marginTop: 8 }}>
          <div style={{ fontWeight: 700, fontSize: 12, color: accent, marginBottom: 8 }}>🔗 The Typical Flow</div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, justifyContent: "center", flexWrap: "wrap" }}>
            {[
              { step: "1", label: "Build app", icon: "💻", color: "#546e7a" },
              { step: "→", label: "", icon: "", color: "transparent" },
              { step: "2", label: "Docker image", icon: "🐋", color: "#1a73e8" },
              { step: "→", label: "", icon: "", color: "transparent" },
              { step: "3", label: "Push to ECR", icon: "📦", color: "#0f9d58" },
              { step: "→", label: "", icon: "", color: "transparent" },
              { step: "4", label: "ECS or EKS deploys", icon: "🚀", color: "#FF9900" },
              { step: "→", label: "", icon: "", color: "transparent" },
              { step: "5", label: "App is live!", icon: "✅", color: "#6a1b9a" },
            ].map(({ step, label, icon, color }, i) => (
              step === "→"
                ? <div key={i} style={{ fontSize: 20, color: "rgba(255,255,255,0.4)" }}>→</div>
                : <div key={i} style={{ background: color + "30", border: `1px solid ${color}60`, borderRadius: 8, padding: "8px 10px", textAlign: "center", minWidth: 80 }}>
                    <div style={{ fontSize: 20 }}>{icon}</div>
                    <div style={{ fontSize: 10, color, fontWeight: 700, marginTop: 3 }}>Step {step}</div>
                    <div style={{ fontSize: 10, color: "rgba(255,255,255,0.7)", marginTop: 1 }}>{label}</div>
                  </div>
            ))}
          </div>
        </div>

        {/* Three services */}
        <H2>The Three AWS Container Services</H2>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 6 }}>

          {/* ECR */}
          <div style={{ border: "1px solid #0f9d5830", borderRadius: 10, overflow: "hidden" }}>
            <div style={{ background: "#0f9d58", padding: "10px 14px", display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 24 }}>📦</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, color: "white" }}>ECR — Elastic Container Registry</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.85)" }}>Where your container images are stored</div>
              </div>
            </div>
            <div style={{ padding: "12px 14px", background: "white" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 11, color: "#0f9d58", marginBottom: 5 }}>🧠 Think of it as...</div>
                  <div style={{ background: "#e8f5e9", borderRadius: 7, padding: "8px 10px", fontSize: 12.5, fontStyle: "italic", color: "#555", lineHeight: 1.6 }}>
                    Docker Hub — but the AWS version. A private library where you push your container images. ECS and EKS pull from it when deploying.
                  </div>
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 11, color: "#0f9d58", marginBottom: 5 }}>🎯 How it works</div>
                  <div style={{ fontSize: 12, color: "#555", lineHeight: 1.7 }}>
                    <code style={{ background: "#f0f0f0", padding: "1px 5px", borderRadius: 3, fontSize: 11 }}>docker build -t myapp .</code><br />
                    <code style={{ background: "#f0f0f0", padding: "1px 5px", borderRadius: 3, fontSize: 11 }}>docker push ecr.../myapp:latest</code><br />
                    <span style={{ color: "#0f9d58" }}>→ ECS/EKS pulls from ECR to deploy</span>
                  </div>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6, marginTop: 8 }}>
                {[["Role", "Image storage"], ["Like", "Private Docker Hub"], ["Used by", "ECS + EKS"]].map(([k, v]) => (
                  <div key={k} style={{ background: "#e8f5e9", borderRadius: 6, padding: "6px 8px", textAlign: "center" }}>
                    <div style={{ fontSize: 10, color: "#888", marginBottom: 2 }}>{k}</div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: "#0f9d58" }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ECS */}
          <div style={{ border: "1px solid #FF990030", borderRadius: 10, overflow: "hidden" }}>
            <div style={{ background: "#FF9900", padding: "10px 14px", display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 24 }}>🚀</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, color: "white" }}>ECS — Elastic Container Service</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.85)" }}>AWS-native way to run containers — easy mode</div>
              </div>
            </div>
            <div style={{ padding: "12px 14px", background: "white" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 11, color: "#CC7A00", marginBottom: 5 }}>🧠 Think of it as...</div>
                  <div style={{ background: "#FFF3E0", borderRadius: 7, padding: "8px 10px", fontSize: 12.5, fontStyle: "italic", color: "#555", lineHeight: 1.6 }}>
                    AWS-managed system that runs, scales, and manages your containers. Tell it "run 3 copies of my app" — it handles the rest.
                  </div>
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 11, color: "#CC7A00", marginBottom: 5 }}>🎯 Real Example</div>
                  <div style={{ fontSize: 12, color: "#555", lineHeight: 1.65 }}>
                    Run 3 copies of your web app container.<br />
                    Traffic spike? Auto scales to 10.<br />
                    Container crashes? ECS restarts it.<br />
                    <span style={{ color: "#CC7A00", fontWeight: 600 }}>You just manage the containers.</span>
                  </div>
                </div>
              </div>
              <div style={{ marginTop: 8 }}>
                <div style={{ fontWeight: 700, fontSize: 11, color: "#CC7A00", marginBottom: 4 }}>Two ways to run ECS:</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                  <div style={{ background: "#FFF3E0", borderRadius: 7, padding: "8px 10px" }}>
                    <div style={{ fontWeight: 700, fontSize: 11.5, color: "#CC7A00" }}>ECS + EC2 🖥️</div>
                    <div style={{ fontSize: 11.5, color: "#555", lineHeight: 1.5, marginTop: 3 }}>You manage EC2 fleet. ECS manages containers on top. Full infrastructure control.</div>
                  </div>
                  <div style={{ background: "#e8f5e9", borderRadius: 7, padding: "8px 10px" }}>
                    <div style={{ fontWeight: 700, fontSize: 11.5, color: "#0f9d58" }}>ECS + Fargate 🚀</div>
                    <div style={{ fontSize: 11.5, color: "#555", lineHeight: 1.5, marginTop: 3 }}>Serverless — no EC2 to manage. AWS handles servers. You only care about containers.</div>
                  </div>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6, marginTop: 8 }}>
                {[["Type", "AWS-native"], ["Complexity", "Easy"], ["Best for", "Simplicity"]].map(([k, v]) => (
                  <div key={k} style={{ background: "#FFF3E0", borderRadius: 6, padding: "6px 8px", textAlign: "center" }}>
                    <div style={{ fontSize: 10, color: "#888", marginBottom: 2 }}>{k}</div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: "#CC7A00" }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* EKS */}
          <div style={{ border: "1px solid #6a1b9a30", borderRadius: 10, overflow: "hidden" }}>
            <div style={{ background: "#6a1b9a", padding: "10px 14px", display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 24 }}>☸️</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, color: "white" }}>EKS — Elastic Kubernetes Service</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.85)" }}>Kubernetes on AWS — powerful mode</div>
              </div>
            </div>
            <div style={{ padding: "12px 14px", background: "white" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 11, color: "#6a1b9a", marginBottom: 5 }}>🧠 Think of it as...</div>
                  <div style={{ background: "#EDE7F6", borderRadius: 7, padding: "8px 10px", fontSize: 12.5, fontStyle: "italic", color: "#555", lineHeight: 1.6 }}>
                    Same idea as ECS — runs containers on AWS. But uses <b>Kubernetes</b>, the industry-standard open-source system. More powerful but more complex to set up.
                  </div>
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 11, color: "#6a1b9a", marginBottom: 5 }}>🎯 When to use EKS</div>
                  <div style={{ fontSize: 12, color: "#555", lineHeight: 1.65 }}>
                    • Your company already uses Kubernetes<br />
                    • You need multi-cloud portability<br />
                    • Large-scale, complex container workloads<br />
                    • Maximum control and flexibility<br />
                    <span style={{ color: "#6a1b9a", fontWeight: 600 }}>More setup — but industry standard.</span>
                  </div>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6, marginTop: 8 }}>
                {[["Type", "Kubernetes"], ["Complexity", "Higher"], ["Best for", "Flexibility"]].map(([k, v]) => (
                  <div key={k} style={{ background: "#EDE7F6", borderRadius: 6, padding: "6px 8px", textAlign: "center" }}>
                    <div style={{ fontSize: 10, color: "#888", marginBottom: 2 }}>{k}</div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: "#6a1b9a" }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ECS vs EKS comparison */}
        <H2>🥊 ECS vs EKS — Which to Choose?</H2>
        <div style={{ borderRadius: 8, overflow: "hidden", border: "1px solid #e0e0e0", marginTop: 4 }}>
          {[
            ["Feature", "ECS 🚀", "EKS ☸️"],
            ["Type", "AWS-native", "Managed Kubernetes"],
            ["Complexity", "Easy — less setup", "Complex — K8s knowledge needed"],
            ["Control", "Less (AWS manages more)", "More (full K8s API)"],
            ["Standard", "AWS-specific", "Kubernetes (portable)"],
            ["Best for", "Simplicity, AWS teams", "K8s expertise, multi-cloud"],
            ["Both support", "EC2 (manage VMs) OR Fargate (serverless)", "EC2 (manage VMs) OR Fargate (serverless)"],
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
                  color: i === 0 ? ["#FF9900", "#FFB74D", "#CE93D8"][j] || accent
                       : j === 0 ? "#333"
                       : j === 1 ? "#CC7A00"
                       : "#6a1b9a",
                  borderRight: j < 2 ? "1px solid #f0f0f0" : "none",
                  lineHeight: 1.4,
                }}>{cell}</div>
              ))}
            </div>
          ))}
        </div>

        {/* Summary */}
        <div style={{ background: "#263238", borderRadius: 10, padding: "12px 14px", marginTop: 10 }}>
          <div style={{ fontWeight: 700, fontSize: 12, color: accent, marginBottom: 8 }}>🎯 Final One-Line Summary</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
            {[
              { icon: "📦", service: "ECR", desc: "Stores container images", color: "#0f9d58" },
              { icon: "🚀", service: "ECS", desc: "Runs containers (easy mode)", color: "#FF9900" },
              { icon: "☸️", service: "EKS", desc: "Runs containers (Kubernetes mode)", color: "#6a1b9a" },
            ].map(({ icon, service, desc, color }) => (
              <div key={service} style={{ background: color + "20", borderRadius: 8, padding: "10px", textAlign: "center" }}>
                <div style={{ fontSize: 26, marginBottom: 4 }}>{icon}</div>
                <div style={{ fontWeight: 700, fontSize: 13, color }}>{service}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", marginTop: 3 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>

        <Callout icon="🎯" label="Exam Tip"
          text="ECR = image registry (like Docker Hub). ECS = AWS-native orchestration, simpler. EKS = managed Kubernetes, more powerful. Both ECS and EKS support EC2 launch type (you manage VMs) AND Fargate launch type (serverless). Know the 2×2 matrix: ECS+EC2, ECS+Fargate, EKS+EC2, EKS+Fargate." />
      </div>
    );

    case "fargate": return (
      <div>
        <H2>What is AWS Fargate?</H2>
        <BodyText>
          Fargate is a <b>serverless compute engine for containers</b>. It works with both ECS and EKS.
          Unlike ECS/EKS which are orchestration services, Fargate is a <b>hosting platform</b> —
          it runs your containers without you managing any EC2 instances.
        </BodyText>
        <Analogy icon="🚀" label="The Key Insight"
          text="ECS/EKS are like a restaurant manager who decides what goes where and when. EC2 is like owning and maintaining the kitchen equipment yourself. Fargate is like a fully-equipped catering service — you just say what food you want made and it handles everything else. You never see the kitchen."
          color="#d32f2f" />
        <H2>Fargate vs EC2 as Container Compute</H2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 6 }}>
          {[
            { title: "ECS/EKS + EC2", color: "#1a73e8", icon: "🖥️",
              pros: ["Full control over instance type", "Can use Spot Instances (save up to 90%)", "Better for large, stable workloads"],
              cons: ["Must manage EC2 fleet", "Manual patching and scaling of VMs", "More operational overhead"] },
            { title: "ECS/EKS + Fargate", color: "#d32f2f", icon: "⚡",
              pros: ["No server management", "AWS handles patching, capacity, scaling", "Pay only for container resources used"],
              cons: ["Less control over underlying infrastructure", "Can be more expensive for always-on workloads", "No Spot pricing (Fargate Spot available separately)"] },
          ].map(({ title, color, icon, pros, cons }) => (
            <div key={title} style={{ border: `1px solid ${color}30`, borderTop: `3px solid ${color}`, borderRadius: 8, padding: "10px 12px" }}>
              <div style={{ fontWeight: 700, fontSize: 12, color, marginBottom: 8 }}>{icon} {title}</div>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#0f9d58", marginBottom: 4 }}>✅ Pros</div>
              {pros.map((p, i) => <div key={i} style={{ fontSize: 11, color: "var(--color-text-secondary)", marginBottom: 2 }}>• {p}</div>)}
              <div style={{ fontSize: 11, fontWeight: 700, color: "#d32f2f", marginBottom: 4, marginTop: 6 }}>⚠️ Cons</div>
              {cons.map((c, i) => <div key={i} style={{ fontSize: 11, color: "var(--color-text-secondary)", marginBottom: 2 }}>• {c}</div>)}
            </div>
          ))}
        </div>
        <H2>The 4 Combinations</H2>
        <KVTable rows={[
          ["ECS + EC2", "AWS-native orchestration on VMs you manage. Full control, more work."],
          ["ECS + Fargate", "AWS-native orchestration, serverless compute. Simpler, less control."],
          ["EKS + EC2", "Kubernetes on VMs you manage. Maximum power, most complex."],
          ["EKS + Fargate", "Kubernetes, serverless. K8s flexibility without VM management."],
        ]} />
        <Callout icon="🎯" label="Exam Tip"
          text="Fargate = serverless container hosting. You don't provision or manage servers. Pay only for the resources your containers use. Works with BOTH ECS and EKS. Choose Fargate when you want to avoid managing EC2 instances entirely." />
      </div>
    );

    case "additional": return (
      <div>
        <BodyText>
          Beyond EC2, Lambda, and containers, AWS offers 4 purpose-built compute services.
          Each one is designed to eliminate a specific type of complexity. Once you understand
          the analogy for each, they're impossible to confuse.
        </BodyText>

        {/* Quick summary bar */}
        <div style={{ background: "#263238", borderRadius: 10, padding: "11px 14px", marginTop: 8 }}>
          <div style={{ fontWeight: 700, fontSize: 12, color: accent, marginBottom: 8 }}>🎯 Super Simple Summary — Before We Dive In</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 6 }}>
            {[
              { icon: "🌱", name: "Beanstalk", line: '"Deploy my app"', color: "#0f9d58" },
              { icon: "⚙️", name: "Batch", line: '"Run jobs at scale"', color: "#1a73e8" },
              { icon: "💡", name: "Lightsail", line: '"Easy servers"', color: "#FF9900" },
              { icon: "🏢", name: "Outposts", line: '"Cloud at home"', color: "#6a1b9a" },
            ].map(({ icon, name, line, color }) => (
              <div key={name} style={{ background: color + "25", border: `1px solid ${color}40`, borderRadius: 8, padding: "9px", textAlign: "center" }}>
                <div style={{ fontSize: 24, marginBottom: 3 }}>{icon}</div>
                <div style={{ fontWeight: 700, fontSize: 12, color }}>{name}</div>
                <div style={{ fontSize: 10.5, color: "rgba(255,255,255,0.7)", marginTop: 3 }}>{line}</div>
              </div>
            ))}
          </div>
        </div>

        <H2>Deep Dive — Each Service</H2>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 6 }}>

          {/* Elastic Beanstalk */}
          <div style={{ border: "1px solid #0f9d5830", borderRadius: 10, overflow: "hidden" }}>
            <div style={{ background: "#0f9d58", padding: "10px 14px", display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 24 }}>🌱</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, color: "white" }}>Elastic Beanstalk</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.85)" }}>Just give me your code — I'll handle everything else</div>
              </div>
            </div>
            <div style={{ padding: "12px 14px", background: "white" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 11, color: "#0f9d58", marginBottom: 5 }}>🧠 Analogy</div>
                  <div style={{ background: "#e8f5e9", borderRadius: 7, padding: "8px 10px", fontSize: 12.5, fontStyle: "italic", color: "#555", lineHeight: 1.6 }}>
                    Like ordering food delivery instead of cooking 🍔<br />
                    You don't care about the kitchen — just the result. Tell AWS "here's my app" and it builds the entire restaurant for you.
                  </div>
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 11, color: "#0f9d58", marginBottom: 5 }}>🎯 Real Example</div>
                  <div style={{ fontSize: 12, color: "#555", lineHeight: 1.7 }}>
                    You built a Node.js app:<br />
                    <span style={{ color: "#0f9d58" }}>Upload to Beanstalk →</span><br />
                    AWS automatically creates:<br />
                    • EC2 instances 🖥️<br />
                    • Load balancer ⚖️<br />
                    • Auto scaling 📈<br />
                    • Networking 🌐<br />
                    <b>Done. You just write code.</b>
                  </div>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6, marginTop: 8 }}>
                {[
                  ["Under the hood", "Still uses EC2"],
                  ["You manage", "Code + config only"],
                  ["Supports", "Java, Node, Python, Go, Docker..."],
                ].map(([k, v]) => (
                  <div key={k} style={{ background: "#e8f5e9", borderRadius: 6, padding: "6px 8px" }}>
                    <div style={{ fontSize: 10, color: "#888", marginBottom: 2 }}>{k}</div>
                    <div style={{ fontSize: 11.5, fontWeight: 700, color: "#0f9d58" }}>{v}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 8, fontSize: 12, color: "#555", fontStyle: "italic", borderTop: "1px solid #f0f0f0", paddingTop: 7 }}>
                ⚠️ Not serverless — EC2 still runs under the hood. Beanstalk just automates the provisioning and setup so you don't have to do it manually.
              </div>
            </div>
          </div>

          {/* AWS Batch */}
          <div style={{ border: "1px solid #1a73e830", borderRadius: 10, overflow: "hidden" }}>
            <div style={{ background: "#1a73e8", padding: "10px 14px", display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 24 }}>⚙️</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, color: "white" }}>AWS Batch</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.85)" }}>Run a lot of jobs automatically at any scale</div>
              </div>
            </div>
            <div style={{ padding: "12px 14px", background: "white" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 11, color: "#1a73e8", marginBottom: 5 }}>🧠 Analogy</div>
                  <div style={{ background: "#E3F2FD", borderRadius: 7, padding: "8px 10px", fontSize: 12.5, fontStyle: "italic", color: "#555", lineHeight: 1.6 }}>
                    Like a factory assembly line 🏭<br />
                    You send a pile of work. The factory processes it all in bulk — automatically spinning up machines as needed, then shutting them down when done.
                  </div>
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 11, color: "#1a73e8", marginBottom: 5 }}>🎯 Real Examples</div>
                  <div style={{ fontSize: 12, color: "#555", lineHeight: 1.7 }}>
                    You submit a job (or millions of jobs):<br />
                    • Process 1 million images 🖼️<br />
                    • Run data analysis overnight 📊<br />
                    • Scientific simulations 🔬<br />
                    • Render video frames 🎬<br />
                    <span style={{ color: "#1a73e8", fontWeight: 600 }}>AWS spins up EC2, runs everything, shuts down.</span>
                  </div>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6, marginTop: 8 }}>
                {[
                  ["Best for", "Background / batch jobs"],
                  ["NOT for", "Real-time / interactive"],
                  ["Manages", "Scheduling + EC2 fleet"],
                ].map(([k, v]) => (
                  <div key={k} style={{ background: "#E3F2FD", borderRadius: 6, padding: "6px 8px" }}>
                    <div style={{ fontSize: 10, color: "#888", marginBottom: 2 }}>{k}</div>
                    <div style={{ fontSize: 11.5, fontWeight: 700, color: "#1a73e8" }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Amazon Lightsail */}
          <div style={{ border: "1px solid #FF990030", borderRadius: 10, overflow: "hidden" }}>
            <div style={{ background: "#FF9900", padding: "10px 14px", display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 24 }}>💡</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, color: "white" }}>Amazon Lightsail</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.85)" }}>Simple AWS for beginners — predictable pricing</div>
              </div>
            </div>
            <div style={{ padding: "12px 14px", background: "white" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 11, color: "#CC7A00", marginBottom: 5 }}>🧠 Analogy</div>
                  <div style={{ background: "#FFF3E0", borderRadius: 7, padding: "8px 10px", fontSize: 12.5, fontStyle: "italic", color: "#555", lineHeight: 1.6 }}>
                    Like buying a prebuilt PC instead of building one 🖥️<br />
                    Less flexible, but everything is already configured. Great when you just want it to work without deep technical knowledge.
                  </div>
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 11, color: "#CC7A00", marginBottom: 5 }}>🎯 Real Examples</div>
                  <div style={{ fontSize: 12, color: "#555", lineHeight: 1.7 }}>
                    Simple, predictable use cases:<br />
                    • Launch a WordPress site 📝<br />
                    • Small personal app or portfolio 💼<br />
                    • Simple backend API 🔧<br />
                    • Small business website 🏪<br />
                    <span style={{ color: "#CC7A00", fontWeight: 600 }}>Fixed monthly pricing (~$3.50–$160/mo)</span>
                  </div>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6, marginTop: 8 }}>
                {[
                  ["Think of it as", "EC2 + simplified UI"],
                  ["Pricing", "Fixed monthly rates"],
                  ["Best for", "Beginners, simple apps"],
                ].map(([k, v]) => (
                  <div key={k} style={{ background: "#FFF3E0", borderRadius: 6, padding: "6px 8px" }}>
                    <div style={{ fontSize: 10, color: "#888", marginBottom: 2 }}>{k}</div>
                    <div style={{ fontSize: 11.5, fontWeight: 700, color: "#CC7A00" }}>{v}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 8, fontSize: 12, color: "#555", fontStyle: "italic", borderTop: "1px solid #f0f0f0", paddingTop: 7 }}>
                💡 Think of it as "DigitalOcean on AWS" or "AWS for developers who want simple". Less powerful than EC2 but far easier to get started with.
              </div>
            </div>
          </div>

          {/* AWS Outposts */}
          <div style={{ border: "1px solid #6a1b9a30", borderRadius: 10, overflow: "hidden" }}>
            <div style={{ background: "#6a1b9a", padding: "10px 14px", display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 24 }}>🏢</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, color: "white" }}>AWS Outposts</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.85)" }}>AWS in your own data center — bring the cloud to you</div>
              </div>
            </div>
            <div style={{ padding: "12px 14px", background: "white" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 11, color: "#6a1b9a", marginBottom: 5 }}>🧠 Analogy</div>
                  <div style={{ background: "#EDE7F6", borderRadius: 7, padding: "8px 10px", fontSize: 12.5, fontStyle: "italic", color: "#555", lineHeight: 1.6 }}>
                    Like bringing the cloud into your office ☁️ → 🏢<br />
                    AWS physically ships and installs servers in YOUR building. You still use the same AWS services, tools, and console — just running locally.
                  </div>
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 11, color: "#6a1b9a", marginBottom: 5 }}>🎯 Real Examples</div>
                  <div style={{ fontSize: 12, color: "#555", lineHeight: 1.7 }}>
                    When data <b>cannot leave</b> your building:<br />
                    • 🏦 Bank: financial regulations require on-prem<br />
                    • 🏭 Factory: ultra-low latency machine control<br />
                    • 🏥 Hospital: patient data residency laws<br />
                    • 🏛️ Government: classified data requirements<br />
                    <span style={{ color: "#6a1b9a", fontWeight: 600 }}>Same AWS tools — different location.</span>
                  </div>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6, marginTop: 8 }}>
                {[
                  ["Type", "Hybrid cloud"],
                  ["Managed by", "AWS (remotely)"],
                  ["Best for", "Compliance + latency"],
                ].map(([k, v]) => (
                  <div key={k} style={{ background: "#EDE7F6", borderRadius: 6, padding: "6px 8px" }}>
                    <div style={{ fontSize: 10, color: "#888", marginBottom: 2 }}>{k}</div>
                    <div style={{ fontSize: 11.5, fontWeight: 700, color: "#6a1b9a" }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Decision tree */}
        <H2>🧩 Decision Tree — Which Service to Use?</H2>
        <div style={{ display: "flex", flexDirection: "column", gap: 5, marginTop: 4 }}>
          {[
            { trigger: "I want to deploy a web app without managing servers", answer: "→ Elastic Beanstalk", color: "#0f9d58" },
            { trigger: "I need to process millions of jobs/images/records overnight", answer: "→ AWS Batch", color: "#1a73e8" },
            { trigger: "I want the simplest way to host a small website/app", answer: "→ Amazon Lightsail", color: "#FF9900" },
            { trigger: "My data legally cannot leave my building", answer: "→ AWS Outposts", color: "#6a1b9a" },
            { trigger: "I need maximum control over my infrastructure", answer: "→ Amazon EC2", color: "#d32f2f" },
            { trigger: "I want zero infrastructure management for my function", answer: "→ AWS Lambda", color: "#546e7a" },
          ].map(({ trigger, answer, color }) => (
            <div key={trigger} style={{
              display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap",
              border: `1px solid ${color}20`, borderLeft: `3px solid ${color}`,
              borderRadius: 7, padding: "8px 12px", background: color + "05",
            }}>
              <span style={{ fontSize: 12.5, color: "#555", flex: 1, minWidth: 200 }}>{trigger}</span>
              <span style={{ fontSize: 12.5, fontWeight: 700, color, flexShrink: 0 }}>{answer}</span>
            </div>
          ))}
        </div>

        {/* Quick comparison table */}
        <H2>⚖️ Quick Comparison</H2>
        <div style={{ borderRadius: 8, overflow: "hidden", border: "1px solid #e0e0e0", marginTop: 4 }}>
          {[
            ["Service", "What it's for", "You manage", "Avoid when"],
            ["🌱 Beanstalk", "Deploy apps easily", "Code + config", "Need full infrastructure control"],
            ["⚙️ Batch", "Run large background jobs", "Job code + logic", "Need real-time / interactive apps"],
            ["💡 Lightsail", "Simple VPS, fixed pricing", "Your app", "Need advanced AWS features"],
            ["🏢 Outposts", "AWS in your data center", "Physical space + power", "Data can go to cloud normally"],
          ].map((row, i) => (
            <div key={i} style={{
              display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr",
              borderBottom: i < 4 ? "1px solid #f0f0f0" : "none",
              background: i === 0 ? "#263238" : i % 2 === 0 ? "#fafafa" : "white",
            }}>
              {row.map((cell, j) => (
                <div key={j} style={{
                  padding: "7px 10px", fontSize: i === 0 ? 11 : 12,
                  fontWeight: i === 0 || j === 0 ? 700 : 400,
                  color: i === 0 ? accent
                       : j === 0 ? ["#0f9d58","#1a73e8","#CC7A00","#6a1b9a"][i-1] || "#333"
                       : "#555",
                  borderRight: j < 3 ? "1px solid #f0f0f0" : "none",
                  lineHeight: 1.4,
                }}>{cell}</div>
              ))}
            </div>
          ))}
        </div>

        <Callout icon="🎯" label="Exam Tip"
          text="Beanstalk = deploy code, AWS creates EC2+LB+scaling (not serverless, still EC2 under hood). Batch = batch/parallel jobs at scale, not real-time. Lightsail = simplified EC2 with fixed pricing, for beginners. Outposts = physical AWS hardware IN your data center, hybrid cloud for compliance and latency." />
      </div>
    );

    case "managed": return (
      <div>
        <H2>The Full Spectrum of AWS Compute</H2>
        <ManagedSpectrumDiagram />
        <H2>Choosing the Right Compute Service</H2>
        <div style={{ borderRadius: 8, overflow: "hidden", border: "1px solid var(--color-border-tertiary)" }}>
          {[
            ["Service", "Type", "You Manage", "AWS Manages", "Best For"],
            ["EC2", "Unmanaged", "OS, patches, scaling, networking", "Physical hardware, hypervisor", "Full control, custom environments"],
            ["Elastic Beanstalk", "Managed PaaS", "Your code, config", "EC2, LB, scaling, networking setup", "Web apps, quick deployments"],
            ["ECS/EKS + EC2", "Managed", "EC2 fleet, OS", "Container orchestration", "Containerized apps with control"],
            ["ECS/EKS + Fargate", "Fully-Managed", "Container code", "Servers, scaling, patching", "Serverless containers"],
            ["Lambda", "Fully-Managed", "Function code only", "Everything else", "Event-driven, short-running code"],
            ["Lightsail", "Managed", "Your app", "VPS, networking, pricing", "Simple apps, fixed budget"],
            ["Batch", "Managed", "Batch job code", "Scheduling, EC2 fleet", "Batch/parallel processing"],
            ["Outposts", "Managed (on-prem)", "Physical space, power", "Hardware, AWS software", "Hybrid, compliance, low-latency"],
          ].map((row, i) => (
            <div key={i} style={{
              display: "grid", gridTemplateColumns: "1fr 0.8fr 1fr 1fr 1.2fr",
              borderBottom: i < 8 ? "1px solid var(--color-border-tertiary)" : "none",
              background: i === 0 ? "#263238" : i % 2 === 0 ? "var(--color-background-secondary)" : "var(--color-background-primary)",
            }}>
              {row.map((cell, j) => (
                <div key={j} style={{
                  padding: "6px 8px", fontSize: i === 0 ? 10 : 11,
                  fontWeight: i === 0 || j === 0 ? 700 : 400,
                  color: i === 0 ? accent : j === 0 ? "var(--color-text-primary)" : "var(--color-text-secondary)",
                  borderRight: j < 4 ? "1px solid var(--color-border-tertiary)" : "none",
                  lineHeight: 1.4,
                }}>{cell}</div>
              ))}
            </div>
          ))}
        </div>
        <Callout icon="🎯" label="Exam Decision Tree"
          text="Short event-driven code? → Lambda. Containerized app, no server management? → Fargate. Containerized app, need control? → ECS/EKS + EC2. Traditional web app? → Elastic Beanstalk. Simple/budget app? → Lightsail. Heavy parallel jobs? → Batch. On-premises AWS? → Outposts." />
      </div>
    );

    default: return null;
  }
}

// ─── Cheat Sheet ─────────────────────────────────────────────────────────────
const cheatRows = [
  ["Serverless", "No server management. AWS handles infrastructure. You focus on code."],
  ["Lambda", "FaaS — event-driven, max 15 min, pay per ms, auto-scales to 0. Supports Java, Python, Node.js, etc."],
  ["Lambda triggers", "S3, SQS, API Gateway, DynamoDB Streams, SNS, CloudWatch Events"],
  ["Container", "Packages code + runtime + dependencies + config. Runs identically anywhere."],
  ["Container vs VM", "Container: shares host OS, lighter, faster start. VM: full guest OS per VM, heavier."],
  ["Docker", "Most common containerization platform. Build container images."],
  ["ECR", "Elastic Container Registry — private Docker image storage on AWS"],
  ["ECS", "AWS-native container orchestration. Simpler, AWS-specific."],
  ["EKS", "Managed Kubernetes on AWS. Open-source, flexible, complex."],
  ["Fargate", "Serverless container hosting. Works with ECS and EKS. No EC2 management."],
  ["ECS+EC2", "You manage EC2 fleet. ECS manages containers on top."],
  ["ECS+Fargate", "No server management. AWS manages everything. Serverless containers."],
  ["Elastic Beanstalk", "PaaS — upload code, Beanstalk provisions EC2+LB+Auto Scaling. Still uses EC2."],
  ["AWS Batch", "Fully managed batch computing. Auto-schedules, provisions, and scales EC2 for jobs."],
  ["Lightsail", "Simplified VPS with predictable monthly pricing. For simple apps and beginners."],
  ["Outposts", "AWS rack in YOUR data center. Hybrid cloud. For compliance/latency/data residency."],
];

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function Module3() {
  const [active, setActive] = useState("serverless");
  const [showCheat, setShowCheat] = useState(false);
  const sec = sections.find(s => s.id === active);

  return (
    <div style={{ fontFamily: "var(--font-sans)", maxWidth: 760, margin: "0 auto", padding: "1rem 0.5rem" }}>
      {/* Header */}
      <div style={{
        background: "var(--color-background-secondary)", border: "1px solid var(--color-border-tertiary)",
        borderRadius: 12, padding: "14px 16px", marginBottom: 12,
        display: "flex", alignItems: "center", gap: 12,
      }}>
        <div style={{
          width: 42, height: 42, borderRadius: 10, background: accent + "20",
          border: `1.5px solid ${accent}50`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 21,
        }}>📦</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, fontSize: 15 }}>AWS Cloud Practitioner — Module 3</div>
          <div style={{ fontSize: 12, color: "var(--color-text-secondary)", marginTop: 1 }}>
            Lambda · Containers · ECS · EKS · Fargate · Additional Compute · {sections.length} Topics
          </div>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          <Badge text="CLF-C02" color={accent} />
          <button onClick={() => setShowCheat(v => !v)} style={{
            padding: "4px 10px", fontSize: 11, borderRadius: 16,
            border: `1px solid ${showCheat ? accent : "var(--color-border-tertiary)"}`,
            background: showCheat ? accent + "18" : "var(--color-background-primary)",
            color: showCheat ? accentDark : "var(--color-text-secondary)", cursor: "pointer", fontWeight: 600,
          }}>⚡ Cheat Sheet</button>
        </div>
      </div>

      {/* Cheat Sheet */}
      {showCheat && (
        <div style={{ border: "1px solid var(--color-border-tertiary)", borderRadius: 10, overflow: "hidden", marginBottom: 12 }}>
          <div style={{ background: "#263238", padding: "8px 14px" }}>
            <span style={{ fontWeight: 700, fontSize: 12, color: accent }}>⚡ Module 3 Quick-Recall Cheat Sheet</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", background: "var(--color-background-primary)" }}>
            {cheatRows.map(([k, v], i) => (
              <div key={i} style={{
                display: "flex", gap: 6, padding: "5px 12px",
                borderBottom: i < cheatRows.length - 2 ? "1px solid var(--color-border-tertiary)" : "none",
                borderRight: i % 2 === 0 ? "1px solid var(--color-border-tertiary)" : "none",
                background: Math.floor(i / 2) % 2 === 0 ? "var(--color-background-primary)" : "var(--color-background-secondary)",
              }}>
                <span style={{ fontWeight: 700, fontSize: 10.5, color: accent, flexShrink: 0, minWidth: 100 }}>{k}</span>
                <span style={{ fontSize: 10.5, color: "var(--color-text-secondary)", lineHeight: 1.4 }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab Nav */}
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 12 }}>
        {sections.map(s => (
          <button key={s.id} onClick={() => setActive(s.id)} style={{
            padding: "5px 11px", fontSize: 11.5,
            fontWeight: active === s.id ? 700 : 400, borderRadius: 18,
            border: active === s.id ? `1.5px solid ${s.badgeColor}` : "1px solid var(--color-border-tertiary)",
            background: active === s.id ? s.badgeColor + "18" : "var(--color-background-primary)",
            color: active === s.id ? s.badgeColor : "var(--color-text-secondary)",
            cursor: "pointer", transition: "all 0.12s",
          }}>
            {s.emoji} {s.title.split(" ").slice(0, 3).join(" ")}
          </button>
        ))}
      </div>

      {/* Active Section */}
      <div style={{
        background: "var(--color-background-primary)", border: "1px solid var(--color-border-tertiary)",
        borderRadius: 12, padding: "16px 16px 20px",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <span style={{ fontSize: 24 }}>{sec.emoji}</span>
          <div>
            <div style={{ fontWeight: 700, fontSize: 15 }}>{sec.title}</div>
            <div style={{ marginTop: 3 }}><Badge text={sec.badge} color={sec.badgeColor} /></div>
          </div>
        </div>
        <SectionContent id={active} />
      </div>
    </div>
  );
}