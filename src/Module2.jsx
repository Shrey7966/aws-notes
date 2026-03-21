import { useState } from "react";

const accent = "#FF9900";
const accentDark = "#CC7A00";

// ─── tiny helpers ────────────────────────────────────────────────────────────
function Badge({ text, color }) {
  return (
    <span style={{
      display: "inline-block", background: color + "20", color,
      border: `1px solid ${color}40`, borderRadius: 20,
      fontSize: 10, fontWeight: 600, padding: "2px 9px",
      letterSpacing: 0.3, textTransform: "uppercase",
    }}>{text}</span>
  );
}
function SectionTag({ children, color }) {
  return (
    <span style={{
      fontSize: 9, fontWeight: 700, color,
      background: color + "18", border: `1px solid ${color}30`,
      borderRadius: 4, padding: "1px 6px", textTransform: "uppercase",
      letterSpacing: 0.5,
    }}>{children}</span>
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
      background: "var(--color-background-secondary)",
      borderLeft: `3px solid ${color}`,
      borderRadius: 8, padding: "9px 13px", margin: "10px 0 0",
    }}>
      <div style={{ fontWeight: 700, fontSize: 11, color, marginBottom: 3 }}>{icon} {label}</div>
      <div style={{ fontSize: 13, fontStyle: "italic", lineHeight: 1.6, color: "var(--color-text-secondary)" }}>{text}</div>
    </div>
  );
}
function BodyText({ children }) {
  return <div style={{ fontSize: 13.5, lineHeight: 1.65, color: "var(--color-text-secondary)", marginTop: 8 }}>{children}</div>;
}
function H2({ children }) {
  return <div style={{ fontWeight: 600, fontSize: 13, color: "var(--color-text-primary)", margin: "14px 0 6px" }}>{children}</div>;
}
function Bullets({ items, color = accent }) {
  return (
    <div>
      {items.map((it, i) => (
        <div key={i} style={{ display: "flex", gap: 7, fontSize: 13, lineHeight: 1.55, color: "var(--color-text-secondary)", marginBottom: 4 }}>
          <span style={{ color, fontWeight: 700, flexShrink: 0 }}>→</span>
          <span dangerouslySetInnerHTML={{ __html: it }} />
        </div>
      ))}
    </div>
  );
}

// ─── EC2 Pricing Cards ───────────────────────────────────────────────────────
const pricingData = [
  { name: "On-Demand", icon: "⏱️", color: "#1a73e8", savings: "Full price", commitment: "None",
    best: "Testing, unpredictable workloads",
    desc: "Pay only per hour or second while instance runs. No upfront payment, no contracts. Perfect for getting started or short-term needs." },
  { name: "Savings Plans", icon: "📅", color: "#0f9d58", savings: "Up to 72%", commitment: "1 or 3 years",
    best: "Predictable compute (EC2, Fargate, Lambda)",
    desc: "Commit to a $/hour spend for 1–3 years. Works across instance families, sizes, OS, and Regions. Most flexible discount option." },
  { name: "Reserved Instances", icon: "🔖", color: "#FF9900", savings: "Up to 75%", commitment: "1 or 3 years",
    best: "Steady-state, predictable workloads",
    desc: "Commit to specific instance type in a Region. 3 payment options: All Upfront, Partial Upfront, No Upfront. Best for known, stable workloads." },
  { name: "Spot Instances", icon: "⚡", color: "#d32f2f", savings: "Up to 90%", commitment: "None — interruptible",
    best: "Fault-tolerant, batch, flexible jobs",
    desc: "Bid on unused AWS capacity. AWS can reclaim with 2-minute warning. Huge savings but workload must tolerate interruptions." },
  { name: "Dedicated Hosts", icon: "🏠", color: "#6a1b9a", savings: "Most expensive", commitment: "On-demand or reserved",
    best: "Compliance, BYOL, licensing",
    desc: "Entire physical server reserved for you. Full control over instance placement. Ideal for security-sensitive or bring-your-own-license workloads." },
  { name: "Dedicated Instances", icon: "🔒", color: "#546e7a", savings: "Premium vs On-Demand", commitment: "None",
    best: "Physical isolation without full host control",
    desc: "Hardware dedicated to your account but AWS chooses which physical server. Isolation from other AWS accounts without the complexity of Dedicated Hosts." },
];

function PricingCards() {
  const [sel, setSel] = useState(null);
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
        {pricingData.map((p, i) => (
          <div key={i}
            onClick={() => setSel(sel === i ? null : i)}
            style={{
              border: sel === i ? `2px solid ${p.color}` : "1px solid var(--color-border-tertiary)",
              borderTop: `3px solid ${p.color}`,
              borderRadius: 8, padding: "10px 11px", cursor: "pointer",
              background: sel === i ? p.color + "10" : "var(--color-background-secondary)",
              transition: "all 0.15s",
            }}>
            <div style={{ fontSize: 18, marginBottom: 3 }}>{p.icon}</div>
            <div style={{ fontWeight: 700, fontSize: 12, color: p.color, marginBottom: 2 }}>{p.name}</div>
            <div style={{ fontSize: 11, color: "var(--color-text-secondary)" }}>Save: <b style={{ color: p.color }}>{p.savings}</b></div>
            <div style={{ fontSize: 10, color: "var(--color-text-secondary)", marginTop: 2 }}>{p.commitment}</div>
          </div>
        ))}
      </div>
      {sel !== null && (
        <div style={{
          marginTop: 8, background: "var(--color-background-primary)",
          border: `1px solid ${pricingData[sel].color}40`, borderRadius: 8,
          padding: "12px 14px",
        }}>
          <div style={{ fontWeight: 700, fontSize: 13, color: pricingData[sel].color, marginBottom: 4 }}>
            {pricingData[sel].icon} {pricingData[sel].name}
          </div>
          <div style={{ fontSize: 12.5, color: "var(--color-text-secondary)", lineHeight: 1.6, marginBottom: 6 }}>
            {pricingData[sel].desc}
          </div>
          <div style={{ fontSize: 11.5, color: "var(--color-text-primary)" }}>
            <b>Best for:</b> <span style={{ color: pricingData[sel].color }}>{pricingData[sel].best}</span>
          </div>
        </div>
      )}
      <div style={{ fontSize: 11, color: "var(--color-text-secondary)", marginTop: 6, textAlign: "center" }}>
        Tap any card to expand details
      </div>
    </div>
  );
}

// ─── Instance Families ───────────────────────────────────────────────────────
const instanceFamilies = [
  { family: "General Purpose", tag: "t, m", icon: "⚖️", color: "#1a73e8",
    best: "Web servers, code repos, dev/test environments",
    detail: "Balanced CPU, memory, and networking. Best starting point if usage is unknown." },
  { family: "Compute Optimized", tag: "c", icon: "🖥️", color: "#0f9d58",
    best: "Gaming servers, HPC, ML inference, scientific modelling",
    detail: "High-performance processors. More vCPU per dollar. Ideal for CPU-bound tasks." },
  { family: "Memory Optimized", tag: "r, x", icon: "🧠", color: "#FF9900",
    best: "Large in-memory databases, real-time analytics, big data",
    detail: "Large RAM relative to CPU. Fast performance for workloads processing huge datasets in memory." },
  { family: "Accelerated Computing", tag: "p, g, inf", icon: "🚀", color: "#d32f2f",
    best: "GPU rendering, ML training, floating-point calculations",
    detail: "Hardware accelerators (GPUs, FPGAs) for tasks impossible to do efficiently in CPU-only software." },
  { family: "Storage Optimized", tag: "i, d, h", icon: "💾", color: "#6a1b9a",
    best: "Data warehouses, distributed file systems, OLTP",
    detail: "High I/O performance for locally stored data. Low-latency random reads/writes at massive scale." },
];

function InstanceFamilyTable() {
  return (
    <div style={{ borderRadius: 8, overflow: "hidden", border: "1px solid var(--color-border-tertiary)" }}>
      {instanceFamilies.map((f, i) => (
        <div key={i} style={{
          display: "grid", gridTemplateColumns: "26px 110px 1fr",
          gap: 10, padding: "9px 12px", alignItems: "start",
          borderBottom: i < instanceFamilies.length - 1 ? "1px solid var(--color-border-tertiary)" : "none",
          background: i % 2 === 0 ? "var(--color-background-secondary)" : "var(--color-background-primary)",
        }}>
          <span style={{ fontSize: 17 }}>{f.icon}</span>
          <div>
            <div style={{ fontWeight: 600, fontSize: 12, color: f.color }}>{f.family}</div>
            <div style={{ fontSize: 10, color: "var(--color-text-secondary)", marginTop: 1 }}>Types: {f.tag}</div>
          </div>
          <div>
            <div style={{ fontSize: 12, color: "var(--color-text-primary)", marginBottom: 2 }}>{f.detail}</div>
            <SectionTag color={f.color}>Best for: {f.best}</SectionTag>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Auto Scaling visual ─────────────────────────────────────────────────────
function AutoScalingViz() {
  const [desired, setDesired] = useState(4);
  const min = 2, max = 8;
  return (
    <div style={{ border: "1px solid var(--color-border-tertiary)", borderRadius: 10, padding: "14px 16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <div style={{ fontWeight: 600, fontSize: 13 }}>Auto Scaling Group — Live Simulator</div>
        <Badge text="EC2 Auto Scaling" color={accent} />
      </div>
      <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12 }}>
        <span style={{ fontSize: 12, color: "var(--color-text-secondary)", minWidth: 80 }}>Demand slider</span>
        <input type="range" min={min} max={max} value={desired}
          onChange={e => setDesired(+e.target.value)} style={{ flex: 1 }} />
        <span style={{ fontSize: 12, fontWeight: 700, color: accent, minWidth: 60 }}>{desired} instances</span>
      </div>
      {/* Nested box diagram */}
      <div style={{
        background: "#e3f2fd22", border: "1.5px dashed #1a73e8",
        borderRadius: 10, padding: 10, position: "relative",
      }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: "#1a73e8", marginBottom: 6 }}>Auto Scaling Group</div>
        <div style={{
          background: "#fff3e022", border: "1.5px dashed #FF9900",
          borderRadius: 8, padding: 8, marginBottom: 6,
        }}>
          <div style={{ fontSize: 9, fontWeight: 700, color: "#FF9900", marginBottom: 4 }}>DESIRED ({desired})</div>
          <div style={{
            background: "#e8f5e922", border: "1.5px dashed #0f9d58",
            borderRadius: 6, padding: 6,
          }}>
            <div style={{ fontSize: 9, fontWeight: 700, color: "#0f9d58", marginBottom: 4 }}>MINIMUM ({min})</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
              {Array.from({ length: max }).map((_, i) => (
                <div key={i} style={{
                  width: 30, height: 30, borderRadius: 5,
                  background: i < desired ? (i < min ? "#0f9d58" : "#FF9900") : "#e0e0e0",
                  border: `1.5px solid ${i < desired ? (i < min ? "#0f9d58" : "#CC7A00") : "#bdbdbd"}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 14, transition: "all 0.3s",
                }}>
                  {i < desired ? "🖥️" : ""}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, fontSize: 10 }}>
          <span>🟢 Min ({min}) always running</span>
          <span>🟡 Desired ({desired}) scaled to demand</span>
          <span>⬜ Max ({max}) cap</span>
        </div>
      </div>
      <div style={{ fontSize: 12, color: "var(--color-text-secondary)", marginTop: 8, lineHeight: 1.5 }}>
        <b>How it works:</b> CloudWatch monitors metrics → triggers scaling policy → EC2 Auto Scaling adds/removes instances automatically.
        You define <b>Minimum</b> (always-on floor), <b>Desired</b> (target), and <b>Maximum</b> (cost-control ceiling).
      </div>
    </div>
  );
}

// ─── ELB Routing visual ──────────────────────────────────────────────────────
const elbRouting = [
  { name: "Round Robin", icon: "🔄", desc: "Sends requests to each server in turn, cycling through them equally. Simple and effective when all servers are identical." },
  { name: "Least Connections", icon: "📊", desc: "Routes to the server with fewest active connections. Best when requests vary in length and you want even load." },
  { name: "IP Hash", icon: "📍", desc: "Same client IP always hits the same server. Useful for session stickiness — user always returns to their session." },
  { name: "Least Response Time", icon: "⏱️", desc: "Routes to the server that responds fastest. Minimises latency and gives best user experience." },
];

function ELBRouting() {
  const [sel, setSel] = useState(0);
  return (
    <div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
        {elbRouting.map((r, i) => (
          <button key={i} onClick={() => setSel(i)} style={{
            padding: "5px 11px", fontSize: 11.5, borderRadius: 20,
            border: sel === i ? `1.5px solid ${accent}` : "1px solid var(--color-border-tertiary)",
            background: sel === i ? accent + "18" : "var(--color-background-secondary)",
            color: sel === i ? accentDark : "var(--color-text-secondary)",
            cursor: "pointer", fontWeight: sel === i ? 700 : 400,
          }}>{r.icon} {r.name}</button>
        ))}
      </div>
      <div style={{
        background: "var(--color-background-secondary)",
        border: `1px solid ${accent}30`, borderRadius: 8, padding: "11px 13px",
      }}>
        <div style={{ fontWeight: 700, fontSize: 13, color: accent, marginBottom: 5 }}>
          {elbRouting[sel].icon} {elbRouting[sel].name}
        </div>
        <div style={{ fontSize: 13, color: "var(--color-text-secondary)", lineHeight: 1.6 }}>
          {elbRouting[sel].desc}
        </div>
      </div>
    </div>
  );
}

// ─── Monolith vs Microservices ───────────────────────────────────────────────
function ArchDiagram({ type }) {
  const services = ["Orders", "Inventory", "Payments", "Shipping"];
  const colors = { Orders: "#1a73e8", Inventory: "#0f9d58", Payments: "#FF9900", Shipping: "#6a1b9a" };
  const icons = { Orders: "🛒", Inventory: "📋", Payments: "💳", Shipping: "🚚" };

  if (type === "mono") {
    return (
      <div style={{
        border: "2px solid #0f9d58", borderRadius: 12, padding: 12,
        background: "var(--color-background-secondary)",
      }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: "#0f9d58", marginBottom: 8, textAlign: "center" }}>
          SINGLE MONOLITHIC SERVICE
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 7 }}>
          {services.map(s => (
            <div key={s} style={{
              border: "1px dashed #1a73e8", borderRadius: 7, padding: "7px 9px",
              background: "#e3f2fd22", display: "flex", alignItems: "center", gap: 6,
            }}>
              <span style={{ fontSize: 15 }}>{icons[s]}</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: colors[s] }}>{s}</span>
            </div>
          ))}
        </div>
        <div style={{ fontSize: 11, color: "#d32f2f", textAlign: "center", marginTop: 8 }}>
          ⚠️ One component fails → entire app goes down
        </div>
      </div>
    );
  }
  return (
    <div style={{ background: "var(--color-background-secondary)", borderRadius: 12, padding: 12 }}>
      <div style={{ fontSize: 10, fontWeight: 700, color: "#0f9d58", marginBottom: 8, textAlign: "center" }}>
        MICROSERVICES — MULTIPLE INDEPENDENT SERVICES
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 7 }}>
        {services.map(s => (
          <div key={s} style={{
            border: `1.5px solid ${colors[s]}50`, borderRadius: 7, padding: "7px 9px",
            background: colors[s] + "12", display: "flex", alignItems: "center", gap: 6,
          }}>
            <span style={{ fontSize: 15 }}>{icons[s]}</span>
            <span style={{ fontSize: 12, fontWeight: 600, color: colors[s] }}>{s}</span>
          </div>
        ))}
      </div>
      <div style={{ fontSize: 11, color: "#0f9d58", textAlign: "center", marginTop: 8 }}>
        ✅ One service fails → others keep running independently
      </div>
    </div>
  );
}

// ─── Messaging services comparison ──────────────────────────────────────────
const messagingServices = [
  {
    name: "Amazon SQS", icon: "📬", color: "#FF9900",
    type: "Queue (Pull model)",
    analogy: "An order board at the coffee shop. Cashier posts the order; barista picks it up when ready. Orders don't get lost even if the barista is busy.",
    keyPoints: [
      "Messages stored in queue until consumer processes them",
      "Consumer pulls messages at its own pace",
      "Messages are deleted after processing",
      "Decouples sender and receiver — neither needs to be available at the same time",
      "Scales automatically to any message volume",
    ],
    useCase: "Customer support ticketing, order processing pipelines, batch job queues",
  },
  {
    name: "Amazon SNS", icon: "📢", color: "#1a73e8",
    type: "Pub/Sub (Push model)",
    analogy: "A barista shouting 'One Rudy's Rhubarb Refresher, ready!' — message is broadcast instantly to everyone subscribed to that topic.",
    keyPoints: [
      "Publisher sends to a topic; all subscribers receive immediately",
      "Subscribers: Lambda functions, SQS queues, HTTP endpoints, email, SMS, mobile push",
      "Fan-out: one message → many receivers simultaneously",
      "No message storage — it's fire-and-forget",
      "Great for real-time notifications",
    ],
    useCase: "Order ready notifications, system alerts, fan-out to multiple systems at once",
  },
  {
    name: "Amazon EventBridge", icon: "🌉", color: "#6a1b9a",
    type: "Event Bus (Serverless)",
    analogy: "A smart traffic controller at a busy intersection — it receives events from any source, filters them by rules, and routes each event to exactly the right destination.",
    keyPoints: [
      "Serverless event bus connecting AWS services, SaaS apps, and custom apps",
      "Route events based on rules: filter, transform, and deliver",
      "Can handle massive event volumes during peaks",
      "If a target fails, EventBridge stores and retries the event",
      "No infrastructure to manage",
    ],
    useCase: "Food delivery order routing (payment → restaurant → inventory → delivery), CI/CD pipelines, audit logging",
  },
];

function MessagingTabs() {
  const [sel, setSel] = useState(0);
  const svc = messagingServices[sel];
  return (
    <div>
      <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
        {messagingServices.map((s, i) => (
          <button key={i} onClick={() => setSel(i)} style={{
            flex: 1, padding: "7px 8px", fontSize: 12, borderRadius: 8,
            border: sel === i ? `1.5px solid ${s.color}` : "1px solid var(--color-border-tertiary)",
            background: sel === i ? s.color + "18" : "var(--color-background-secondary)",
            color: sel === i ? s.color : "var(--color-text-secondary)",
            cursor: "pointer", fontWeight: sel === i ? 700 : 400,
          }}>{s.icon} {s.name.replace("Amazon ", "")}</button>
        ))}
      </div>
      <div style={{
        border: `1px solid ${svc.color}30`, borderRadius: 10,
        overflow: "hidden",
      }}>
        <div style={{ background: svc.color, padding: "10px 14px", display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 24 }}>{svc.icon}</span>
          <div>
            <div style={{ fontWeight: 700, fontSize: 14, color: "white" }}>{svc.name}</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.8)" }}>{svc.type}</div>
          </div>
        </div>
        <div style={{ padding: "12px 14px", background: "var(--color-background-primary)" }}>
          <Analogy icon="☕" label="Analogy" text={svc.analogy} color={svc.color} />
          <H2>Key Points</H2>
          <Bullets items={svc.keyPoints} color={svc.color} />
          <Callout icon="💼" label="Real-World Use Case" text={svc.useCase} color={svc.color} />
        </div>
      </div>
    </div>
  );
}

// ─── Provision Methods ───────────────────────────────────────────────────────
const provisionMethods = [
  { name: "AWS Management Console", icon: "🖱️", color: "#1a73e8",
    desc: "Browser-based GUI. Point-and-click interface to manage all AWS services.",
    pros: ["Visual — great for learning and exploration", "Easy billing & cost monitoring", "Good for non-technical tasks"],
    cons: ["Slow for repetitive tasks", "Human error-prone (checkbox missing, typo)", "Not automatable"],
    bestFor: "Learning, testing, one-time setups, billing review" },
  { name: "AWS CLI", icon: "💻", color: "#0f9d58",
    desc: "Command-line tool to invoke AWS APIs via terminal text commands.",
    pros: ["Automatable via scripts", "Faster than console for bulk operations", "Available in AWS CloudShell (no install)"],
    cons: ["Requires learning CLI syntax", "Less visual feedback"],
    bestFor: "Scripting, automation, DevOps workflows" },
  { name: "AWS SDK", icon: "🔧", color: "#FF9900",
    desc: "Language-specific libraries (Python, Java, JS, etc.) to call AWS APIs from code.",
    pros: ["Fully automatable in your application code", "Programmatic resource management", "Supports Python, Java, JS, .NET, Go, Ruby, PHP"],
    cons: ["Requires programming knowledge", "More setup needed"],
    bestFor: "Application code that needs to interact with AWS (e.g., upload file to S3 programmatically)" },
];

function ProvisionMethods() {
  const [sel, setSel] = useState(0);
  const m = provisionMethods[sel];
  return (
    <div>
      <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
        {provisionMethods.map((p, i) => (
          <button key={i} onClick={() => setSel(i)} style={{
            flex: 1, padding: "6px 8px", fontSize: 11, borderRadius: 8,
            border: sel === i ? `1.5px solid ${p.color}` : "1px solid var(--color-border-tertiary)",
            background: sel === i ? p.color + "18" : "var(--color-background-secondary)",
            color: sel === i ? p.color : "var(--color-text-secondary)",
            cursor: "pointer", fontWeight: sel === i ? 700 : 400, textAlign: "center",
          }}>{p.icon}<br />{p.name.replace("AWS ", "")}</button>
        ))}
      </div>
      <div style={{
        border: `1px solid ${m.color}30`, borderRadius: 10, overflow: "hidden",
      }}>
        <div style={{ background: m.color, padding: "9px 14px", display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 22 }}>{m.icon}</span>
          <div>
            <div style={{ fontWeight: 700, fontSize: 13, color: "white" }}>{m.name}</div>
            <div style={{ fontSize: 10.5, color: "rgba(255,255,255,0.85)" }}>{m.desc}</div>
          </div>
        </div>
        <div style={{ padding: "12px 14px", background: "var(--color-background-primary)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
            <div style={{ background: "#e8f5e922", borderRadius: 8, padding: "9px 11px" }}>
              <div style={{ fontWeight: 700, fontSize: 11, color: "#0f9d58", marginBottom: 5 }}>✅ Pros</div>
              {m.pros.map((p, i) => <div key={i} style={{ fontSize: 12, color: "var(--color-text-secondary)", marginBottom: 3 }}>• {p}</div>)}
            </div>
            <div style={{ background: "#ffebee22", borderRadius: 8, padding: "9px 11px" }}>
              <div style={{ fontWeight: 700, fontSize: 11, color: "#d32f2f", marginBottom: 5 }}>⚠️ Cons</div>
              {m.cons.map((c, i) => <div key={i} style={{ fontSize: 12, color: "var(--color-text-secondary)", marginBottom: 3 }}>• {c}</div>)}
            </div>
          </div>
          <Callout icon="🎯" label="Best For" text={m.bestFor} color={m.color} />
        </div>
      </div>
      <Callout icon="🔑" label="Key Insight" text="All three methods (Console, CLI, SDK) ultimately call the same AWS APIs behind the scenes. They're just different interfaces to the same underlying service." color={accent} />
    </div>
  );
}

// ─── Sections ────────────────────────────────────────────────────────────────
const sections = [
  { id: "ec2-intro", emoji: "🖥️", title: "Amazon EC2 Basics", badge: "Compute", badgeColor: "#1a73e8" },
  { id: "ec2-types", emoji: "⚙️", title: "EC2 Instance Types", badge: "Instance Families", badgeColor: "#0f9d58" },
  { id: "ec2-pricing", emoji: "💳", title: "EC2 Pricing Models", badge: "6 Options", badgeColor: "#FF9900" },
  { id: "ec2-scaling", emoji: "📈", title: "Scaling & Elasticity", badge: "Auto Scaling", badgeColor: "#6a1b9a" },
  { id: "elb", emoji: "⚖️", title: "Elastic Load Balancing", badge: "ELB", badgeColor: "#d32f2f" },
  { id: "decoupling", emoji: "🔗", title: "Decoupling & Microservices", badge: "Architecture", badgeColor: "#546e7a" },
  { id: "messaging", emoji: "📬", title: "SQS, SNS & EventBridge", badge: "Messaging", badgeColor: "#FF9900" },
  { id: "provisioning", emoji: "🛠️", title: "Provisioning AWS Resources", badge: "Console/CLI/SDK", badgeColor: "#1a73e8" },
];

function SectionContent({ id }) {
  switch (id) {
    case "ec2-intro": return (
      <div>
        <H2>What is Amazon EC2?</H2>
        <BodyText>
          EC2 stands for <b>Elastic Compute Cloud</b>. It gives you virtual servers (called <b>instances</b>) in the cloud.
          Instead of buying and managing physical servers, you rent virtual compute capacity on-demand — and pay only while the instance is running.
        </BodyText>
        <Analogy icon="☕" label="Coffee Shop Analogy"
          text="EC2 instances are like baristas — they do the actual work (processing orders/requests). AWS owns and maintains the entire coffee shop building (the physical server). You just hire and fire baristas (launch and terminate instances) as demand changes." />
        <H2>Key EC2 Concepts</H2>
        <div style={{ borderRadius: 8, overflow: "hidden", border: "1px solid var(--color-border-tertiary)" }}>
          {[
            ["Virtual Machine (VM)", "EC2 instances are VMs — software-based computers that run on shared physical hardware."],
            ["Multi-Tenancy", "Multiple VMs share the same physical host machine. AWS's hypervisor keeps each VM fully isolated."],
            ["Hypervisor", "Software managing the physical host, allocating resources and ensuring isolation between VMs. AWS manages this — you don't."],
            ["AMI (Amazon Machine Image)", "Template for your instance — includes the OS and pre-installed software. Think of it as a 'snapshot' you use to launch identical servers."],
            ["Resizable", "Start small, grow as needed. You can change CPU and memory (vertical scaling) at any time."],
            ["Key Pair", "Two-part security key for logging in: AWS keeps the public key in your instance; you keep the private key."],
            ["User Data", "Bootstrap script that runs when your instance first launches. Used to install software, configure settings automatically."],
          ].map(([term, desc], i) => (
            <div key={i} style={{
              display: "grid", gridTemplateColumns: "140px 1fr", gap: 10, padding: "8px 12px",
              borderBottom: i < 6 ? "1px solid var(--color-border-tertiary)" : "none",
              background: i % 2 === 0 ? "var(--color-background-secondary)" : "var(--color-background-primary)",
            }}>
              <div style={{ fontWeight: 600, fontSize: 12, color: "#1a73e8" }}>{term}</div>
              <div style={{ fontSize: 12.5, color: "var(--color-text-secondary)", lineHeight: 1.5 }}>{desc}</div>
            </div>
          ))}
        </div>
        <H2>EC2 Launch Configuration — Step by Step</H2>
        <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          {[
            ["1", "Name your instance", "Label it so you can find it later in the console."],
            ["2", "Choose an AMI", "Pick OS + pre-installed software template. E.g. Amazon Linux for web servers."],
            ["3", "Choose instance type", "How much CPU and RAM? t2.micro = 1 vCPU, 1 GB RAM (Free Tier eligible)."],
            ["4", "Configure key pair", "For SSH login. Public key goes into the instance; you keep the private key."],
            ["5", "Network settings", "Allow HTTP/HTTPS? Public or private? Security group rules."],
            ["6", "Storage", "Attach EBS volume. Default 8 GB gp3 for most web servers."],
            ["7", "User Data (optional)", "Paste a startup script — e.g. install and start Nginx web server automatically."],
          ].map(([num, step, detail]) => (
            <div key={num} style={{
              display: "flex", gap: 10, alignItems: "flex-start",
              background: "var(--color-background-secondary)",
              border: "1px solid var(--color-border-tertiary)", borderRadius: 7, padding: "7px 10px",
            }}>
              <div style={{
                width: 22, height: 22, borderRadius: "50%", background: accent,
                color: "white", fontSize: 11, fontWeight: 700,
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>{num}</div>
              <div>
                <div style={{ fontWeight: 600, fontSize: 12, color: "var(--color-text-primary)" }}>{step}</div>
                <div style={{ fontSize: 12, color: "var(--color-text-secondary)" }}>{detail}</div>
              </div>
            </div>
          ))}
        </div>
        <Callout icon="🎯" label="Exam Tip"
          text="You only pay for EC2 instances while they are RUNNING. Stopped instances = no compute charges (but you still pay for attached EBS storage). Terminated = completely deleted, no charges." />
      </div>
    );

    case "ec2-types": return (
      <div>
        <BodyText>
          EC2 instances come in <b>5 families</b>, each optimised for a different type of workload.
          Think of it like coffee machines — you need the right machine for each type of drink.
        </BodyText>
        <Analogy icon="☕" label="Coffee Machine Analogy"
          text="A high-powered espresso machine (Compute Optimized) for espresso shots. A simple drip machine (General Purpose) for everyday coffee. A cold-brew tower (Memory Optimized) for slow, heavy processes. Choose the right machine for the job to avoid waste." />
        <H2>EC2 Instance Families</H2>
        <InstanceFamilyTable />
        <H2>Choosing Instance Size</H2>
        <BodyText>
          Within each family, instances come in multiple sizes (nano, micro, small, medium, large, xlarge, 2xlarge...).
          Bigger = more power = more cost. Start small, measure, then resize if needed. The cloud lets you pivot any time.
        </BodyText>
        <Callout icon="🎯" label="Exam Tip"
          text="For the exam, know the 5 families and a use case for each. General Purpose = balanced. Compute Optimized = gaming/HPC. Memory Optimized = large datasets in RAM. Accelerated = GPU/ML. Storage Optimized = high I/O." />
      </div>
    );

    case "ec2-pricing": return (
      <div>
        <BodyText>AWS offers 6 EC2 pricing models to fit every workload and budget. Tap each card to learn more.</BodyText>
        <PricingCards />
        <H2>Dedicated Host vs Dedicated Instance — What's the Difference?</H2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 4 }}>
          {[
            { title: "Dedicated Host", color: "#6a1b9a", icon: "🏠",
              points: ["Entire physical server reserved for YOU", "Full control: which server, instance placement, resource allocation", "Best for: BYOL (Bring Your Own License), compliance", "Most expensive dedicated option"] },
            { title: "Dedicated Instance", color: "#546e7a", icon: "🔒",
              points: ["Hardware dedicated to your AWS account only", "AWS decides which physical server it runs on", "Physical isolation from OTHER customers", "More flexible & cheaper than Dedicated Host"] },
          ].map(({ title, color, icon, points }) => (
            <div key={title} style={{
              border: `1px solid ${color}40`, borderTop: `3px solid ${color}`,
              borderRadius: 8, padding: "10px 12px",
            }}>
              <div style={{ fontWeight: 700, fontSize: 13, color, marginBottom: 7 }}>{icon} {title}</div>
              {points.map((p, i) => <div key={i} style={{ fontSize: 12, color: "var(--color-text-secondary)", marginBottom: 3 }}>• {p}</div>)}
            </div>
          ))}
        </div>
        <Callout icon="🎯" label="Exam Tip"
          text="Spot Instances = up to 90% off but CAN BE INTERRUPTED (2-min warning). Reserved = up to 75% off, predictable workloads. Savings Plans = up to 72% off, most flexible across families and Regions." />
      </div>
    );

    case "ec2-scaling": return (
      <div>
        <H2>Scalability vs Elasticity</H2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 4 }}>
          {[
            { title: "Scalability", icon: "📐", color: "#1a73e8",
              def: "The ability of a system to handle increased load by adding resources.",
              detail: "Long-term capacity planning. Scale UP (bigger machines) or OUT (more machines)." },
            { title: "Elasticity", icon: "🪢", color: "#0f9d58",
              def: "The ability to automatically scale resources up or down in response to real-time demand.",
              detail: "Dynamic and automatic. Scale OUT during high demand, scale IN when quiet. Optimises cost at every moment." },
          ].map(({ title, icon, color, def, detail }) => (
            <div key={title} style={{
              border: `1px solid ${color}30`, borderTop: `3px solid ${color}`,
              borderRadius: 8, padding: "10px 12px",
            }}>
              <div style={{ fontWeight: 700, fontSize: 13, color, marginBottom: 5 }}>{icon} {title}</div>
              <div style={{ fontSize: 12.5, fontWeight: 600, color: "var(--color-text-primary)", marginBottom: 4 }}>{def}</div>
              <div style={{ fontSize: 12, color: "var(--color-text-secondary)", lineHeight: 1.5 }}>{detail}</div>
            </div>
          ))}
        </div>
        <H2>Scale Up vs Scale Out</H2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 4 }}>
          <div style={{ border: "1px solid var(--color-border-tertiary)", borderRadius: 8, padding: "10px 12px", background: "var(--color-background-secondary)" }}>
            <div style={{ fontWeight: 700, fontSize: 12, color: "#1a73e8", marginBottom: 4 }}>⬆️ Scale Up (Vertical)</div>
            <div style={{ fontSize: 12, color: "var(--color-text-secondary)", lineHeight: 1.5 }}>Add more power to existing machines. More CPU, more RAM on the same instance. Useful when one process needs more horsepower.</div>
          </div>
          <div style={{ border: "1px solid var(--color-border-tertiary)", borderRadius: 8, padding: "10px 12px", background: "var(--color-background-secondary)" }}>
            <div style={{ fontWeight: 700, fontSize: 12, color: "#0f9d58", marginBottom: 4 }}>➡️ Scale Out (Horizontal)</div>
            <div style={{ fontSize: 12, color: "var(--color-text-secondary)", lineHeight: 1.5 }}>Add more instances to the pool. More machines working in parallel. Better for distributed systems and handling spikes.</div>
          </div>
        </div>
        <H2>Amazon EC2 Auto Scaling — Live Simulator</H2>
        <AutoScalingViz />
        <Callout icon="🎯" label="Exam Tip"
          text="Auto Scaling uses CloudWatch metrics to trigger scaling. The 3 key settings are: Minimum (floor — always running), Desired (target — what you want right now), Maximum (ceiling — cost control cap). EC2 Auto Scaling = elasticity in action." />
      </div>
    );

    case "elb": return (
      <div>
        <H2>What is Elastic Load Balancing?</H2>
        <BodyText>
          A <b>load balancer</b> sits in front of your EC2 instances and distributes incoming traffic evenly across them.
          <b> ELB (Elastic Load Balancing)</b> is AWS's managed load balancer — it automatically scales with traffic, handles failover,
          and decouples your architecture so frontend and backend tiers scale independently.
        </BodyText>
        <Analogy icon="☕" label="Coffee Shop Analogy"
          text="A host at the entrance counts the queue at each cashier. New customers are directed to the shortest line. If one cashier is overwhelmed, the host redirects new customers elsewhere. That's exactly what ELB does for your EC2 instances." />
        <H2>ELB Benefits</H2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginTop: 4 }}>
          {[
            { icon: "🔀", title: "Efficient Traffic Distribution", desc: "Evenly distributes requests across all healthy EC2 instances. Prevents any single server from being overloaded." },
            { icon: "📈", title: "Automatic Scaling", desc: "ELB scales itself with traffic. As backend instances are added/removed by Auto Scaling, ELB adjusts routing automatically." },
            { icon: "🛠️", title: "Simplified Management", desc: "Decouples frontend and backend tiers. Handles maintenance, updates, and failover to reduce operational overhead." },
          ].map(({ icon, title, desc }) => (
            <div key={title} style={{
              border: "1px solid var(--color-border-tertiary)", borderTop: `3px solid ${accent}`,
              borderRadius: 8, padding: "10px 11px", background: "var(--color-background-secondary)",
            }}>
              <div style={{ fontSize: 20, marginBottom: 5 }}>{icon}</div>
              <div style={{ fontWeight: 700, fontSize: 12, color: accent, marginBottom: 4 }}>{title}</div>
              <div style={{ fontSize: 12, color: "var(--color-text-secondary)", lineHeight: 1.5 }}>{desc}</div>
            </div>
          ))}
        </div>
        <H2>ELB Routing Methods</H2>
        <ELBRouting />
        <H2>How ELB + Auto Scaling Work Together</H2>
        <BodyText>
          1. Frontend instances send all requests to a <b>single ELB URL</b> — they don't need to know about individual backend instances.<br />
          2. When backend Auto Scaling launches a new EC2 instance, it <b>registers itself with ELB</b>.<br />
          3. ELB starts routing traffic to it <b>automatically</b>.<br />
          4. Frontend sees nothing change. Architecture is fully <b>decoupled</b>.
        </BodyText>
        <Callout icon="🎯" label="Exam Tip"
          text="ELB decouples architecture: each tier (frontend/backend) scales independently. ELB is Regional — it's a single URL for the whole tier. It also works for internal traffic (between tiers), not just external (internet-facing)." />
      </div>
    );

    case "decoupling": return (
      <div>
        <H2>Monolithic vs Microservices Architecture</H2>
        <BodyText>
          Modern applications are built from multiple components. <b>How tightly those components are connected</b> determines
          how resilient and scalable your system is.
        </BodyText>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 10 }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: 12, color: "#d32f2f", marginBottom: 6 }}>❌ Monolithic (Tightly Coupled)</div>
            <ArchDiagram type="mono" />
            <div style={{ fontSize: 12, color: "var(--color-text-secondary)", marginTop: 6, lineHeight: 1.5 }}>
              All components bundled together. One failure can bring down the entire application. Hard to scale individual parts.
            </div>
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 12, color: "#0f9d58", marginBottom: 6 }}>✅ Microservices (Loosely Coupled)</div>
            <ArchDiagram type="micro" />
            <div style={{ fontSize: 12, color: "var(--color-text-secondary)", marginTop: 6, lineHeight: 1.5 }}>
              Each service is independent. One failure is isolated. Each service can scale, deploy, and update independently.
            </div>
          </div>
        </div>
        <H2>Tight Coupling vs Loose Coupling</H2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 4 }}>
          <div style={{ border: "1px solid #d32f2f40", borderRadius: 8, padding: "10px 12px" }}>
            <div style={{ fontWeight: 700, fontSize: 12, color: "#d32f2f", marginBottom: 5 }}>🔴 Tightly Coupled</div>
            <div style={{ fontSize: 12, color: "var(--color-text-secondary)", lineHeight: 1.5 }}>
              App A sends directly to App B. If B fails → A sees errors too. If B slows down → A slows down. Chain reaction failures.
            </div>
          </div>
          <div style={{ border: "1px solid #0f9d5840", borderRadius: 8, padding: "10px 12px" }}>
            <div style={{ fontWeight: 700, fontSize: 12, color: "#0f9d58", marginBottom: 5 }}>🟢 Loosely Coupled (with Queue)</div>
            <div style={{ fontSize: 12, color: "var(--color-text-secondary)", lineHeight: 1.5 }}>
              App A sends to a queue. App B reads from the queue at its own pace. B fails → messages wait in queue. A never knows.
            </div>
          </div>
        </div>
        <Callout icon="☕" label="Coffee Shop Analogy"
          text="Cashier writes order on paper and puts it on the order board (queue). Barista picks it up when ready. If barista is busy, order waits — it doesn't disappear. Cashier can keep taking new orders without waiting. That's loose coupling." color="#0f9d58" />
        <Callout icon="🎯" label="Exam Tip"
          text="AWS recommends loosely coupled architectures. Key pattern: use SQS queues or SNS topics BETWEEN components instead of direct calls. This prevents cascading failures and enables independent scaling." />
      </div>
    );

    case "messaging": return (
      <div>
        <BodyText>
          AWS provides three key services for building loosely coupled, event-driven, message-based architectures.
          Select each service to explore how it works.
        </BodyText>
        <MessagingTabs />
        <H2>Quick Comparison</H2>
        <div style={{ borderRadius: 8, overflow: "hidden", border: "1px solid var(--color-border-tertiary)", marginTop: 4 }}>
          {[
            ["", "SQS", "SNS", "EventBridge"],
            ["Model", "Queue (pull)", "Pub/Sub (push)", "Event bus (route)"],
            ["Message stored?", "✅ Yes, until processed", "❌ Fire-and-forget", "✅ Retry on failure"],
            ["Receivers", "One consumer per message", "All subscribers receive", "Filtered routing by rules"],
            ["Best for", "Decoupling services, batch", "Fan-out notifications", "Complex event routing"],
          ].map((row, i) => (
            <div key={i} style={{
              display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr",
              borderBottom: i < 4 ? "1px solid var(--color-border-tertiary)" : "none",
              background: i === 0 ? "var(--color-background-secondary)" : i % 2 === 0 ? "var(--color-background-secondary)" : "var(--color-background-primary)",
            }}>
              {row.map((cell, j) => (
                <div key={j} style={{
                  padding: "7px 10px", fontSize: i === 0 ? 11 : 12,
                  fontWeight: i === 0 || j === 0 ? 700 : 400,
                  color: i === 0 ? accent : j === 0 ? "var(--color-text-primary)" : "var(--color-text-secondary)",
                  borderRight: j < 3 ? "1px solid var(--color-border-tertiary)" : "none",
                }}>{cell}</div>
              ))}
            </div>
          ))}
        </div>
        <Callout icon="🎯" label="Exam Tip"
          text="SQS = store messages in a queue, consumer pulls when ready (decoupling). SNS = push notifications immediately to many subscribers (fan-out). EventBridge = intelligent event routing with rules and filters (event-driven architecture)." />
      </div>
    );

    case "provisioning": return (
      <div>
        <BodyText>
          Everything in AWS is an API call. There are three main ways to interact with those APIs:
          the visual Console, the command-line CLI, and the code-based SDK.
        </BodyText>
        <H2>The Three Ways to Provision AWS Resources</H2>
        <ProvisionMethods />
        <H2>Savings Plans vs Reserved Instances — Additional Pricing Detail</H2>
        <div style={{ borderRadius: 8, overflow: "hidden", border: "1px solid var(--color-border-tertiary)", marginTop: 4 }}>
          {[
            { title: "Savings Plans", color: "#0f9d58",
              detail: "Commit to a $/hr spend level for 1–3 years. Works across EC2, Fargate, Lambda. No need to specify instance type. Most flexible. Payment options: All Upfront, Partial, No Upfront." },
            { title: "Capacity Reservations", color: "#1a73e8",
              detail: "Reserve EC2 capacity in a specific AZ. Billed at On-Demand rate whether used or not. Critical for workloads that MUST have capacity available." },
            { title: "Reserved Instance Flexibility", color: "#FF9900",
              detail: "RI discounts apply across instance sizes within same family and across multiple AZs in a Region. AWS automatically applies the best discount." },
          ].map(({ title, color, detail }, i) => (
            <div key={i} style={{
              display: "grid", gridTemplateColumns: "140px 1fr", gap: 10, padding: "9px 12px",
              borderBottom: i < 2 ? "1px solid var(--color-border-tertiary)" : "none",
              background: i % 2 === 0 ? "var(--color-background-secondary)" : "var(--color-background-primary)",
            }}>
              <div style={{ fontWeight: 700, fontSize: 12, color }}>{title}</div>
              <div style={{ fontSize: 12, color: "var(--color-text-secondary)", lineHeight: 1.55 }}>{detail}</div>
            </div>
          ))}
        </div>
        <Callout icon="🎯" label="Exam Tip"
          text="For the exam: ALL AWS interactions are API calls. Console = GUI for the API. CLI = text commands for the API. SDK = code for the API. Behind the scenes, all three do the same thing." />
      </div>
    );

    default: return null;
  }
}

// ─── Cheat Sheet ─────────────────────────────────────────────────────────────
const cheatRows = [
  ["EC2", "Elastic Compute Cloud — virtual servers in the cloud"],
  ["AMI", "Amazon Machine Image — OS + software template to launch instances from"],
  ["Multi-Tenancy", "Multiple VMs share physical hardware; hypervisor ensures isolation"],
  ["Instance Families", "5 types: General Purpose, Compute, Memory, Accelerated, Storage Optimised"],
  ["On-Demand", "Full price, no commitment, start/stop any time"],
  ["Reserved Instances", "Up to 75% off — 1 or 3 year commit, specific instance type"],
  ["Savings Plans", "Up to 72% off — 1 or 3 year $/hr commit, flexible across families/Regions"],
  ["Spot Instances", "Up to 90% off — interruptible, 2-min warning, batch/fault-tolerant workloads"],
  ["Dedicated Host", "Entire physical server; full control; BYOL/compliance needs"],
  ["Auto Scaling", "Automatically add/remove EC2 instances based on demand (CloudWatch metrics)"],
  ["Scale Up (Vertical)", "Bigger instance — more CPU/RAM on the same machine"],
  ["Scale Out (Horizontal)", "More instances — add machines to handle more parallel requests"],
  ["ELB", "Elastic Load Balancing — distributes traffic across EC2 instances; managed by AWS"],
  ["ELB Decoupling", "Frontend uses one ELB URL; ELB routes to backend — tiers scale independently"],
  ["Monolithic", "Tightly coupled — one failure can cascade through entire app"],
  ["Microservices", "Loosely coupled — each service independent; failure isolated"],
  ["SQS", "Queue service — store messages until consumer ready; decoupling; pull model"],
  ["SNS", "Pub/Sub — push messages instantly to all subscribers; fan-out; notifications"],
  ["EventBridge", "Serverless event bus — route events from any source to any target with rules"],
  ["Console/CLI/SDK", "3 ways to call AWS APIs — visual GUI, terminal commands, or code"],
];

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function Module2() {
  const [active, setActive] = useState("ec2-intro");
  const [showCheat, setShowCheat] = useState(false);
  const sec = sections.find(s => s.id === active);

  return (
    <div style={{ fontFamily: "var(--font-sans)", maxWidth: 760, margin: "0 auto", padding: "1rem 0.5rem" }}>
      {/* Header */}
      <div style={{
        background: "var(--color-background-secondary)",
        border: "1px solid var(--color-border-tertiary)", borderRadius: 12,
        padding: "14px 16px", marginBottom: 12,
        display: "flex", alignItems: "center", gap: 12,
      }}>
        <div style={{
          width: 42, height: 42, borderRadius: 10,
          background: accent + "20", border: `1.5px solid ${accent}50`,
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: 21,
        }}>🖥️</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, fontSize: 15 }}>AWS Cloud Practitioner — Module 2</div>
          <div style={{ fontSize: 12, color: "var(--color-text-secondary)", marginTop: 1 }}>
            EC2 · Pricing · Auto Scaling · ELB · Messaging · {sections.length} Topics
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

      {/* Cheat Sheet Panel */}
      {showCheat && (
        <div style={{
          border: "1px solid var(--color-border-tertiary)", borderRadius: 10,
          overflow: "hidden", marginBottom: 12,
        }}>
          <div style={{ background: "#263238", padding: "8px 14px" }}>
            <span style={{ fontWeight: 700, fontSize: 12, color: accent }}>⚡ Module 2 Quick-Recall Cheat Sheet</span>
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
        background: "var(--color-background-primary)",
        border: "1px solid var(--color-border-tertiary)", borderRadius: 12,
        padding: "16px 16px 20px",
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