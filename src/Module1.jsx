import { useState } from "react";

const accent = "#FF9900";
const accentDark = "#CC7A00";

const sections = [
  {
    id: "intro",
    emoji: "☁️",
    title: "What is Cloud Computing?",
    badge: "Core Definition",
    badgeColor: "#1a73e8",
    content: [
      {
        type: "analogy",
        icon: "💡",
        label: "Layman Analogy",
        text: "Think of cloud computing like electricity from the grid. You don't build your own power plant — you just plug in and pay for what you use. AWS is the power company; your apps are the appliances.",
      },
      {
        type: "definition",
        icon: "📖",
        label: "Official Definition",
        text: "Cloud computing is the on-demand delivery of IT resources over the internet with pay-as-you-go pricing.",
      },
      {
        type: "breakdown",
        icon: "🔍",
        label: "Breaking It Down",
        items: [
          { term: "On-demand", desc: "Use resources whenever you need them — no pre-approval, no waiting weeks for hardware." },
          { term: "IT resources", desc: "Compute, storage, databases, networking, AI, analytics, and more — all available as a service." },
          { term: "Over the internet", desc: "Access everything remotely via your browser from anywhere in the world." },
          { term: "Pay-as-you-go", desc: "You pay only for what you consume. Stop using it → stop paying. No contracts, no sales reps." },
        ],
      },
    ],
  },
  {
    id: "clientserver",
    emoji: "☕",
    title: "Client-Server Model",
    badge: "Foundational Concept",
    badgeColor: "#0f9d58",
    content: [
      {
        type: "analogy",
        icon: "☕",
        label: "Coffee Shop Analogy",
        text: "You (the customer / client) walk up to the barista (the server) and request a coffee. The barista validates your request (Did you pay? Can we make it?), then fulfills it. In AWS, the barista is a virtual server (like an EC2 instance).",
      },
      {
        type: "keypoints",
        icon: "✅",
        label: "Key Points",
        items: [
          "Client makes a request → Server validates → Server returns a response",
          "In AWS, servers are virtual — no physical machines you need to manage",
          "Requests can be for anything: data, computation, file storage, video streaming",
        ],
      },
    ],
  },
  {
    id: "payasyougo",
    emoji: "💳",
    title: "Pay-As-You-Go Pricing",
    badge: "AWS Key Principle",
    badgeColor: "#FF9900",
    content: [
      {
        type: "analogy",
        icon: "👩‍💼",
        label: "Staffing Analogy",
        text: "Like a coffee shop that only pays baristas for hours worked — not for time spent waiting around. You don't pay AWS when your resources sit idle.",
      },
      {
        type: "comparison",
        icon: "⚖️",
        label: "On-Premises vs AWS",
        rows: [
          { left: "Buy servers upfront (big investment)", right: "No upfront costs — start small" },
          { left: "Fixed costs even when idle", right: "Variable cost — only pay for usage" },
          { left: "Takes weeks/months to scale", right: "Scale up or down in minutes" },
          { left: "Guessing capacity = waste or shortage", right: "Provision exactly what you need, when you need it" },
        ],
      },
      {
        type: "callout",
        icon: "🔑",
        label: "Exam Tip",
        text: "When you deprovision (delete) AWS resources, you STOP PAYING IMMEDIATELY. This is a common exam question framing.",
      },
    ],
  },
  {
    id: "benefits",
    emoji: "🚀",
    title: "6 Benefits of AWS Cloud",
    badge: "Must Know for Exam",
    badgeColor: "#d32f2f",
    content: [
      {
        type: "benefitsGrid",
        items: [
          {
            num: "1",
            title: "Trade fixed for variable expense",
            icon: "💰",
            desc: "No huge upfront data center investment. Your AWS bill varies month to month based on actual usage. Start small, grow as needed.",
          },
          {
            num: "2",
            title: "Economies of scale",
            icon: "📦",
            desc: "AWS buys hardware in massive quantities → lower prices → passes savings to you. The more AWS grows, the cheaper it gets for everyone.",
          },
          {
            num: "3",
            title: "Stop guessing capacity",
            icon: "🎯",
            desc: "Don't over-buy (wasted hardware) or under-buy (degraded experience). Scale up/down automatically based on real demand.",
          },
          {
            num: "4",
            title: "Increase speed & agility",
            icon: "⚡",
            desc: "Spin up a test environment in minutes, run experiments, delete if it doesn't work. Focus on innovation, not provisioning.",
          },
          {
            num: "5",
            title: "Stop maintaining data centers",
            icon: "🏗️",
            desc: "No more racking, stacking, and powering servers. AWS handles the physical infrastructure. You focus on your customers.",
          },
          {
            num: "6",
            title: "Go global in minutes",
            icon: "🌍",
            desc: "Deploy your app to AWS Regions worldwide instantly. What used to take months/years (opening foreign data centers) now takes minutes.",
          },
        ],
      },
    ],
  },
  {
    id: "infrastructure",
    emoji: "🌐",
    title: "AWS Global Infrastructure",
    badge: "Architecture",
    badgeColor: "#6a1b9a",
    content: [
      {
        type: "analogy",
        icon: "☕",
        label: "Coffee Shop Chain Analogy",
        text: "If one coffee shop location floods, customers go to the next location down the street. Business keeps running. AWS works the same way — if one location goes down, traffic shifts to another.",
      },
      {
        type: "hierarchy",
        icon: "🏛️",
        label: "Infrastructure Hierarchy",
        levels: [
          {
            label: "Region",
            color: "#1a73e8",
            desc: "A geographic area (e.g., US-East, AP-Southeast, EU-West). Each Region is completely independent. Choose a Region to deploy your app.",
          },
          {
            label: "Availability Zone (AZ)",
            color: "#0f9d58",
            desc: "One or more discrete data centers within a Region. A Region has 3+ AZs. AZs are far apart (disaster isolation) but close enough for low-latency connections.",
          },
          {
            label: "Data Center",
            color: "#FF9900",
            desc: "Physical building with servers, storage, redundant power, networking, and security. Multiple data centers form one AZ.",
          },
        ],
      },
      {
        type: "definitions",
        icon: "📘",
        label: "Key Terms",
        items: [
          { term: "High Availability", desc: "System stays accessible with minimal downtime even if one component fails. Another takes over seamlessly." },
          { term: "Fault Tolerance", desc: "System keeps running even if MULTIPLE components fail. Resilience is built into every layer." },
          { term: "Failover", desc: "Automatically switching traffic from a failing Region/AZ to a healthy one." },
        ],
      },
      {
        type: "diagram",
        icon: "🗺️",
        label: "Visual: Region → AZ → Data Centers",
        svg: true,
      },
      {
        type: "callout",
        icon: "🔑",
        label: "Exam Tip",
        text: "A Region contains 3+ AZs. An AZ contains 1+ data centers. Run across multiple AZs for high availability. Run across multiple Regions for disaster recovery.",
      },
    ],
  },
  {
    id: "sharedresponsibility",
    emoji: "🔐",
    title: "Shared Responsibility Model",
    badge: "Security — Critical for Exam",
    badgeColor: "#d32f2f",
    content: [
      {
        type: "analogy",
        icon: "🏠",
        label: "House Analogy",
        text: "The builder (AWS) constructs solid walls and installs quality locks. YOU (the homeowner / customer) must actually lock the doors and secure your valuables. Both sides share responsibility for safety.",
      },
      {
        type: "sharedModel",
        icon: "🔐",
        label: "Who Is Responsible for What?",
        layers: [
          {
            owner: "AWS Responsibility",
            label: "Security OF the Cloud",
            color: "#FF9900",
            items: ["Physical hardware and data centers", "Global network infrastructure", "Virtualization / hypervisor layer", "Software for compute, storage, database, networking"],
          },
          {
            owner: "Shared (varies by service)",
            label: "Varies by Service",
            color: "#1a73e8",
            items: ["OS, network, firewall configuration", "Platform and application management", "Network traffic protection", "Server-side encryption"],
          },
          {
            owner: "Customer Responsibility",
            label: "Security IN the Cloud",
            color: "#0f9d58",
            items: ["Customer data", "Client-side data encryption", "Identity and access management (IAM)", "Application-level security"],
          },
        ],
      },
      {
        type: "callout",
        icon: "🔑",
        label: "Exam Tip — The Golden Rule",
        text: "AWS = Security OF the cloud (infrastructure). Customer = Security IN the cloud (your data, apps, and access). This distinction appears on almost every certification exam.",
      },
    ],
  },
  {
    id: "history",
    emoji: "📅",
    title: "AWS History & Origin",
    badge: "Background Knowledge",
    badgeColor: "#546e7a",
    content: [
      {
        type: "timeline",
        icon: "📅",
        label: "AWS Timeline",
        events: [
          { year: "Early 2000s", text: "Amazon.com was an ecommerce site. IT team built scalable internal tools to handle growth." },
          { year: "2003", text: "Amazon employees realized their infrastructure knowledge was valuable to other companies." },
          { year: "Nov 2004", text: "First AWS public service launched: Amazon Simple Queue Service (SQS)." },
          { year: "2006", text: "Amazon S3 (storage) and Amazon EC2 (compute) launched — the foundation of AWS." },
          { year: "Present", text: "AWS powers millions of customers worldwide: startups, enterprises, governments, nonprofits." },
        ],
      },
    ],
  },
];

function Badge({ text, color }) {
  return (
    <span style={{
      display: "inline-block",
      background: color + "20",
      color: color,
      border: `1px solid ${color}40`,
      borderRadius: 20,
      fontSize: 11,
      fontWeight: 600,
      padding: "2px 10px",
      letterSpacing: 0.3,
      textTransform: "uppercase",
    }}>{text}</span>
  );
}

function Callout({ icon, label, text }) {
  return (
    <div style={{
      background: "#FF990015",
      border: "1px solid #FF990040",
      borderLeft: `3px solid ${accent}`,
      borderRadius: 8,
      padding: "10px 14px",
      margin: "12px 0 0",
    }}>
      <div style={{ fontWeight: 600, fontSize: 12, color: accent, marginBottom: 4 }}>{icon} {label}</div>
      <div style={{ fontSize: 13.5, color: "var(--color-text-primary)", lineHeight: 1.6 }}>{text}</div>
    </div>
  );
}

function Analogy({ icon, label, text }) {
  return (
    <div style={{
      background: "var(--color-background-secondary)",
      border: "1px solid var(--color-border-tertiary)",
      borderRadius: 8,
      padding: "10px 14px",
      margin: "12px 0 0",
    }}>
      <div style={{ fontWeight: 600, fontSize: 12, color: "var(--color-text-secondary)", marginBottom: 4 }}>{icon} {label}</div>
      <div style={{ fontSize: 13.5, lineHeight: 1.6 }}>{text}</div>
    </div>
  );
}

function Comparison({ rows }) {
  return (
    <div style={{ margin: "12px 0 0", borderRadius: 8, overflow: "hidden", border: "1px solid var(--color-border-tertiary)" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
        <div style={{ background: "#d32f2f15", padding: "8px 12px", fontWeight: 600, fontSize: 12, color: "#d32f2f" }}>🏢 On-Premises</div>
        <div style={{ background: "#FF990015", padding: "8px 12px", fontWeight: 600, fontSize: 12, color: accent }}>☁️ AWS Cloud</div>
      </div>
      {rows.map((r, i) => (
        <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderTop: "1px solid var(--color-border-tertiary)" }}>
          <div style={{ padding: "8px 12px", fontSize: 13, color: "var(--color-text-secondary)", lineHeight: 1.5 }}>{r.left}</div>
          <div style={{ padding: "8px 12px", fontSize: 13, lineHeight: 1.5, borderLeft: "1px solid var(--color-border-tertiary)" }}>{r.right}</div>
        </div>
      ))}
    </div>
  );
}

function BenefitsGrid({ items }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, margin: "12px 0 0" }}>
      {items.map((item) => (
        <div key={item.num} style={{
          background: "var(--color-background-secondary)",
          border: "1px solid var(--color-border-tertiary)",
          borderTop: `2px solid ${accent}`,
          borderRadius: 8,
          padding: "12px",
        }}>
          <div style={{ fontSize: 20, marginBottom: 4 }}>{item.icon}</div>
          <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 4, lineHeight: 1.3 }}>{item.title}</div>
          <div style={{ fontSize: 12.5, color: "var(--color-text-secondary)", lineHeight: 1.55 }}>{item.desc}</div>
        </div>
      ))}
    </div>
  );
}

function Hierarchy({ levels }) {
  return (
    <div style={{ margin: "12px 0 0" }}>
      {levels.map((lvl, i) => (
        <div key={i} style={{ display: "flex", gap: 10, marginBottom: 8 }}>
          <div style={{ width: 3, background: lvl.color, borderRadius: 2, flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600, fontSize: 13, color: lvl.color, marginBottom: 2 }}>{lvl.label}</div>
            <div style={{ fontSize: 13, color: "var(--color-text-secondary)", lineHeight: 1.5 }}>{lvl.desc}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function Definitions({ items }) {
  return (
    <div style={{ margin: "12px 0 0" }}>
      {items.map((item, i) => (
        <div key={i} style={{
          display: "flex", gap: 10, marginBottom: 8,
          background: "var(--color-background-secondary)",
          border: "1px solid var(--color-border-tertiary)",
          borderRadius: 8, padding: "10px 12px",
        }}>
          <div style={{ fontWeight: 600, fontSize: 13, color: "var(--color-text-primary)", minWidth: 130 }}>{item.term}</div>
          <div style={{ fontSize: 13, color: "var(--color-text-secondary)", lineHeight: 1.5 }}>{item.desc}</div>
        </div>
      ))}
    </div>
  );
}

function SharedModel({ layers }) {
  return (
    <div style={{ margin: "12px 0 0" }}>
      {layers.map((layer, i) => (
        <div key={i} style={{
          border: `1px solid ${layer.color}40`,
          borderLeft: `3px solid ${layer.color}`,
          borderRadius: 8,
          marginBottom: 8,
          overflow: "hidden",
        }}>
          <div style={{
            background: layer.color + "18",
            padding: "8px 12px",
            display: "flex", justifyContent: "space-between", alignItems: "center",
          }}>
            <span style={{ fontWeight: 600, fontSize: 13, color: layer.color }}>{layer.owner}</span>
            <Badge text={layer.label} color={layer.color} />
          </div>
          <div style={{ padding: "8px 12px" }}>
            {layer.items.map((item, j) => (
              <div key={j} style={{ fontSize: 13, color: "var(--color-text-secondary)", padding: "2px 0", display: "flex", gap: 8, alignItems: "flex-start" }}>
                <span style={{ color: layer.color, fontWeight: 700, flexShrink: 0 }}>•</span>
                {item}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function Timeline({ events }) {
  return (
    <div style={{ margin: "12px 0 0", position: "relative", paddingLeft: 20 }}>
      <div style={{ position: "absolute", left: 6, top: 0, bottom: 0, width: 2, background: "var(--color-border-tertiary)", borderRadius: 1 }} />
      {events.map((e, i) => (
        <div key={i} style={{ position: "relative", marginBottom: 14 }}>
          <div style={{
            position: "absolute", left: -20, top: 3,
            width: 12, height: 12, borderRadius: "50%",
            background: accent, border: "2px solid var(--color-background-primary)",
          }} />
          <div style={{ fontWeight: 600, fontSize: 12, color: accent, marginBottom: 2 }}>{e.year}</div>
          <div style={{ fontSize: 13, color: "var(--color-text-secondary)", lineHeight: 1.5 }}>{e.text}</div>
        </div>
      ))}
    </div>
  );
}

function KeyPoints({ items }) {
  return (
    <div style={{ margin: "12px 0 0" }}>
      {items.map((item, i) => (
        <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, fontSize: 13.5, lineHeight: 1.55 }}>
          <span style={{ color: accent, fontWeight: 700, flexShrink: 0 }}>→</span>
          {item}
        </div>
      ))}
    </div>
  );
}

function Breakdown({ items }) {
  return (
    <div style={{ margin: "12px 0 0", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
      {items.map((item, i) => (
        <div key={i} style={{
          background: "var(--color-background-secondary)",
          border: "1px solid var(--color-border-tertiary)",
          borderRadius: 8, padding: "10px 12px",
        }}>
          <div style={{ fontWeight: 600, fontSize: 13, color: accent, marginBottom: 3 }}>{item.term}</div>
          <div style={{ fontSize: 12.5, color: "var(--color-text-secondary)", lineHeight: 1.5 }}>{item.desc}</div>
        </div>
      ))}
    </div>
  );
}

function RegionDiagramSVG() {
  return (
    <svg width="100%" viewBox="0 0 520 220" style={{ margin: "8px 0", display: "block" }}>
      <defs>
        <marker id="arrow2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path d="M2 1L8 5L2 9" fill="none" stroke="#FF9900" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </marker>
      </defs>
      {/* Region outer */}
      <rect x="10" y="10" width="500" height="200" rx="14" fill="none" stroke="#1a73e8" strokeWidth="1.5" strokeDasharray="6 3" opacity="0.5" />
      <text x="260" y="28" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1a73e8" opacity="0.8">REGION (e.g. us-east-1)</text>
      {/* AZ1 */}
      <rect x="25" y="38" width="140" height="160" rx="10" fill="#0f9d5808" stroke="#0f9d58" strokeWidth="1" strokeDasharray="4 2" />
      <text x="95" y="56" textAnchor="middle" fontSize="10" fontWeight="600" fill="#0f9d58">AZ-01</text>
      <rect x="35" y="63" width="52" height="36" rx="6" fill="#0f9d5820" stroke="#0f9d58" strokeWidth="0.8" />
      <text x="61" y="85" textAnchor="middle" fontSize="10" fill="#0f9d58">DC-01</text>
      <rect x="103" y="63" width="52" height="36" rx="6" fill="#0f9d5820" stroke="#0f9d58" strokeWidth="0.8" />
      <text x="129" y="85" textAnchor="middle" fontSize="10" fill="#0f9d58">DC-02</text>
      <text x="95" y="120" textAnchor="middle" fontSize="9.5" fill="var(--color-text-secondary)">Redundant power</text>
      <text x="95" y="133" textAnchor="middle" fontSize="9.5" fill="var(--color-text-secondary)">&amp; networking</text>
      {/* AZ2 */}
      <rect x="190" y="38" width="140" height="160" rx="10" fill="#FF990008" stroke="#FF9900" strokeWidth="1" strokeDasharray="4 2" />
      <text x="260" y="56" textAnchor="middle" fontSize="10" fontWeight="600" fill="#FF9900">AZ-02</text>
      <rect x="200" y="63" width="52" height="36" rx="6" fill="#FF990020" stroke="#FF9900" strokeWidth="0.8" />
      <text x="226" y="85" textAnchor="middle" fontSize="10" fill="#CC7A00">DC-03</text>
      <rect x="268" y="63" width="52" height="36" rx="6" fill="#FF990020" stroke="#FF9900" strokeWidth="0.8" />
      <text x="294" y="85" textAnchor="middle" fontSize="10" fill="#CC7A00">DC-04</text>
      {/* AZ3 */}
      <rect x="355" y="38" width="140" height="160" rx="10" fill="#6a1b9a08" stroke="#6a1b9a" strokeWidth="1" strokeDasharray="4 2" />
      <text x="425" y="56" textAnchor="middle" fontSize="10" fontWeight="600" fill="#6a1b9a">AZ-03</text>
      <rect x="365" y="63" width="52" height="36" rx="6" fill="#6a1b9a20" stroke="#6a1b9a" strokeWidth="0.8" />
      <text x="391" y="85" textAnchor="middle" fontSize="10" fill="#6a1b9a">DC-07</text>
      <rect x="433" y="63" width="52" height="36" rx="6" fill="#6a1b9a20" stroke="#6a1b9a" strokeWidth="0.8" />
      <text x="459" y="85" textAnchor="middle" fontSize="10" fill="#6a1b9a">DC-08</text>
      {/* Connections between AZs */}
      <line x1="165" y1="120" x2="190" y2="120" stroke="#FF9900" strokeWidth="1" strokeDasharray="3 2" opacity="0.6" markerEnd="url(#arrow2)" />
      <line x1="330" y1="120" x2="355" y2="120" stroke="#FF9900" strokeWidth="1" strokeDasharray="3 2" opacity="0.6" markerEnd="url(#arrow2)" />
      {/* Labels */}
      <text x="95" y="148" textAnchor="middle" fontSize="9" fill="var(--color-text-secondary)">Separate facility</text>
      <text x="260" y="148" textAnchor="middle" fontSize="9" fill="var(--color-text-secondary)">Miles apart</text>
      <text x="425" y="148" textAnchor="middle" fontSize="9" fill="var(--color-text-secondary)">Isolated failures</text>
    </svg>
  );
}

function SectionBlock({ block }) {
  switch (block.type) {
    case "analogy": return <Analogy icon={block.icon} label={block.label} text={block.text} />;
    case "definition": return (
      <div style={{
        background: "var(--color-background-info)",
        border: "1px solid var(--color-border-info)",
        borderRadius: 8,
        padding: "10px 14px",
        margin: "12px 0 0",
      }}>
        <div style={{ fontWeight: 600, fontSize: 12, color: "var(--color-text-info)", marginBottom: 4 }}>{block.icon} {block.label}</div>
        <div style={{ fontSize: 14, fontWeight: 500, color: "var(--color-text-primary)", lineHeight: 1.6 }}>{block.text}</div>
      </div>
    );
    case "breakdown": return (
      <div style={{ margin: "12px 0 0" }}>
        <div style={{ fontWeight: 600, fontSize: 12, color: "var(--color-text-secondary)", marginBottom: 6 }}>{block.icon} {block.label}</div>
        <Breakdown items={block.items} />
      </div>
    );
    case "keypoints": return (
      <div style={{ margin: "12px 0 0" }}>
        <div style={{ fontWeight: 600, fontSize: 12, color: "var(--color-text-secondary)", marginBottom: 4 }}>{block.icon} {block.label}</div>
        <KeyPoints items={block.items} />
      </div>
    );
    case "comparison": return (
      <div style={{ margin: "12px 0 0" }}>
        <div style={{ fontWeight: 600, fontSize: 12, color: "var(--color-text-secondary)", marginBottom: 6 }}>{block.icon} {block.label}</div>
        <Comparison rows={block.rows} />
      </div>
    );
    case "callout": return <Callout icon={block.icon} label={block.label} text={block.text} />;
    case "benefitsGrid": return <BenefitsGrid items={block.items} />;
    case "hierarchy": return (
      <div style={{ margin: "12px 0 0" }}>
        <div style={{ fontWeight: 600, fontSize: 12, color: "var(--color-text-secondary)", marginBottom: 6 }}>{block.icon} {block.label}</div>
        <Hierarchy levels={block.levels} />
      </div>
    );
    case "definitions": return (
      <div style={{ margin: "12px 0 0" }}>
        <div style={{ fontWeight: 600, fontSize: 12, color: "var(--color-text-secondary)", marginBottom: 4 }}>{block.icon} {block.label}</div>
        <Definitions items={block.items} />
      </div>
    );
    case "diagram": return (
      <div style={{ margin: "12px 0 0" }}>
        <div style={{ fontWeight: 600, fontSize: 12, color: "var(--color-text-secondary)", marginBottom: 4 }}>{block.icon} {block.label}</div>
        <div style={{ border: "1px solid var(--color-border-tertiary)", borderRadius: 10, overflow: "hidden", padding: "6px 0" }}>
          <RegionDiagramSVG />
        </div>
      </div>
    );
    case "sharedModel": return (
      <div style={{ margin: "12px 0 0" }}>
        <div style={{ fontWeight: 600, fontSize: 12, color: "var(--color-text-secondary)", marginBottom: 6 }}>{block.icon} {block.label}</div>
        <SharedModel layers={block.layers} />
      </div>
    );
    case "timeline": return (
      <div style={{ margin: "12px 0 0" }}>
        <div style={{ fontWeight: 600, fontSize: 12, color: "var(--color-text-secondary)", marginBottom: 8 }}>{block.icon} {block.label}</div>
        <Timeline events={block.events} />
      </div>
    );
    default: return null;
  }
}

export default function Module1() {
  const [active, setActive] = useState("intro");
  const section = sections.find(s => s.id === active);

  return (
    <div style={{ fontFamily: "var(--font-sans)", maxWidth: 720, margin: "0 auto", padding: "1rem 0.5rem" }}>
      {/* Header */}
      <div style={{
        background: "var(--color-background-secondary)",
        border: "1px solid var(--color-border-tertiary)",
        borderRadius: 12,
        padding: "16px 18px",
        marginBottom: 16,
        display: "flex",
        alignItems: "center",
        gap: 14,
      }}>
        <div style={{
          width: 44, height: 44, borderRadius: 10,
          background: accent + "20",
          border: `1.5px solid ${accent}50`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 22,
        }}>☁️</div>
        <div>
          <div style={{ fontWeight: 600, fontSize: 15, color: "var(--color-text-primary)" }}>AWS Cloud Practitioner — Module 1</div>
          <div style={{ fontSize: 12.5, color: "var(--color-text-secondary)", marginTop: 2 }}>Cloud Computing Foundations · {sections.length} Topics</div>
        </div>
        <div style={{ marginLeft: "auto", textAlign: "right" }}>
          <Badge text="CLF-C02" color={accent} />
        </div>
      </div>

      {/* Nav tabs */}
      <div style={{
        display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14,
      }}>
        {sections.map(s => (
          <button
            key={s.id}
            onClick={() => setActive(s.id)}
            style={{
              padding: "6px 12px",
              fontSize: 12.5,
              fontWeight: active === s.id ? 600 : 400,
              borderRadius: 20,
              border: active === s.id ? `1.5px solid ${accent}` : "1px solid var(--color-border-tertiary)",
              background: active === s.id ? accent + "18" : "var(--color-background-primary)",
              color: active === s.id ? accentDark : "var(--color-text-secondary)",
              cursor: "pointer",
              transition: "all 0.15s",
            }}
          >
            {s.emoji} {s.title.split(" ").slice(0, 3).join(" ")}
          </button>
        ))}
      </div>

      {/* Active section */}
      <div style={{
        background: "var(--color-background-primary)",
        border: "1px solid var(--color-border-tertiary)",
        borderRadius: 12,
        padding: "18px 18px 20px",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
          <span style={{ fontSize: 24 }}>{section.emoji}</span>
          <div>
            <div style={{ fontWeight: 600, fontSize: 16, color: "var(--color-text-primary)" }}>{section.title}</div>
            <div style={{ marginTop: 3 }}>
              <Badge text={section.badge} color={section.badgeColor} />
            </div>
          </div>
        </div>

        {section.content.map((block, i) => (
          <SectionBlock key={i} block={block} />
        ))}
      </div>

      {/* Quick recall footer */}
      <div style={{
        marginTop: 14,
        background: "var(--color-background-secondary)",
        border: "1px solid var(--color-border-tertiary)",
        borderRadius: 10,
        padding: "12px 16px",
      }}>
        <div style={{ fontWeight: 600, fontSize: 12, color: "var(--color-text-secondary)", marginBottom: 8 }}>⚡ Quick Recall — Module 1 Cheat Sheet</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px 16px" }}>
          {[
            ["Cloud definition", "On-demand IT resources via internet, pay-as-you-go"],
            ["Client-server", "Client requests → Server validates → Returns response"],
            ["Pay-as-you-go", "Pay only for resources consumed; stop → stop paying"],
            ["6 Benefits", "Variable cost, economies of scale, no guessing, speed, no DC mgmt, global"],
            ["Region", "Geographic cluster of AZs (e.g., us-east-1)"],
            ["AZ", "Isolated location(s) within a Region; 3+ per Region"],
            ["High availability", "Minimal downtime; another component picks up if one fails"],
            ["Shared model", "AWS = Security OF cloud; Customer = Security IN cloud"],
          ].map(([k, v], i) => (
            <div key={i} style={{ fontSize: 12, padding: "3px 0", borderBottom: "1px solid var(--color-border-tertiary)", display: "flex", gap: 6 }}>
              <span style={{ fontWeight: 600, color: accent, flexShrink: 0 }}>{k}:</span>
              <span style={{ color: "var(--color-text-secondary)" }}>{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}