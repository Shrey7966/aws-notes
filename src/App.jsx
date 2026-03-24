import { useState } from "react";
import Module1 from "./Module1";
import Module2 from "./Module2";
import Module3 from "./Module3";
import Module4 from "./Module4";
import Module5 from "./Module5";

const accent = "#FF9900";

const modules = [
  { id: 1, emoji: "☁️", title: "Module 1", subtitle: "Cloud Computing Foundations", topics: ["Cloud Definition", "Client-Server", "Pay-as-you-go", "6 Benefits", "Global Infra", "Shared Responsibility"], color: "#1a73e8", status: "complete", component: Module1 },
  { id: 2, emoji: "🖥️", title: "Module 2", subtitle: "Compute, Scaling & Messaging", topics: ["Amazon EC2", "Instance Types", "EC2 Pricing", "Auto Scaling", "ELB", "SQS · SNS · EventBridge"], color: "#FF9900", status: "complete", component: Module2 },
  { id: 3, emoji: "📦", title: "Module 3", subtitle: "Serverless, Containers & Compute", topics: ["AWS Lambda", "Containers vs VMs", "ECS & EKS", "AWS Fargate", "Beanstalk", "Outposts"], color: "#0f9d58", status: "complete", component: Module3 },
  { id: 4, emoji: "🌍", title: "Module 4", subtitle: "Global Infrastructure & IaC", topics: ["Regions & AZs", "Region Selection", "High Availability", "CloudFront", "Route 53", "CloudFormation"], color: "#6a1b9a", status: "complete", component: Module4 },
  { id: 5, emoji: "🔒", title: "Module 5", subtitle: "Networking & Security", topics: ["VPC", "Subnets", "Security Groups", "NACLs", "WAF & Shield", "Direct Connect"], color: "#d32f2f", status: "complete", component: Module5 },
  { id: 6, emoji: "💾", title: "Module 6", subtitle: "Storage", topics: ["Amazon S3", "EBS", "EFS", "S3 Classes", "Glacier", "Storage Gateway"], color: "#00838f", status: "up next", component: null },
  { id: 7, emoji: "🗃️", title: "Module 7", subtitle: "Databases", topics: ["RDS", "DynamoDB", "Aurora", "Redshift", "ElastiCache", "DMS"], color: "#e65100", status: "coming", component: null },
  { id: 8, emoji: "💰", title: "Module 8", subtitle: "Pricing, Support & Billing", topics: ["Pricing Models", "Cost Explorer", "Budgets", "Support Plans", "Trusted Advisor", "Free Tier"], color: "#2e7d32", status: "coming", component: null },
];

const completedCount = modules.filter(m => m.status === "complete").length;

function ComingSoon({ mod }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "55vh", padding: "2rem", textAlign: "center" }}>
      <div style={{ fontSize: 64, marginBottom: 16 }}>{mod.emoji}</div>
      <div style={{ fontWeight: 700, fontSize: 22, color: "#1a1a1a", marginBottom: 4 }}>{mod.title}</div>
      <div style={{ fontSize: 15, color: "#555", marginBottom: 20 }}>{mod.subtitle}</div>
      <div style={{ background: mod.color + "10", border: `1.5px solid ${mod.color}30`, borderRadius: 14, padding: "20px 28px", maxWidth: 420 }}>
        <div style={{ fontSize: 32, marginBottom: 8 }}>🚧</div>
        <div style={{ fontWeight: 700, fontSize: 14, color: mod.color, marginBottom: 10 }}>Coming Soon</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center", marginBottom: 14 }}>
          {mod.topics.map(t => (
            <span key={t} style={{ fontSize: 11, background: mod.color + "20", color: mod.color, border: `1px solid ${mod.color}35`, borderRadius: 14, padding: "3px 10px", fontWeight: 600 }}>{t}</span>
          ))}
        </div>
        <div style={{ fontSize: 12, color: "#888", lineHeight: 1.6 }}>
          Paste the next module transcript in Claude to generate these notes!
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [activeModule, setActiveModule] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const mod = modules.find(m => m.id === activeModule);
  const ModuleComponent = mod.component;

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "system-ui, -apple-system, sans-serif", background: "#f0f2f5" }}>
      <div style={{ width: sidebarOpen ? 270 : 58, flexShrink: 0, background: "#0f172a", transition: "width 0.22s ease", display: "flex", flexDirection: "column", position: "sticky", top: 0, height: "100vh", overflowY: "auto", overflowX: "hidden", zIndex: 20 }}>
        <div style={{ padding: sidebarOpen ? "16px 14px 12px" : "16px 10px 12px", borderBottom: "1px solid rgba(255,255,255,0.07)", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 8, background: "#FF9900", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>☁️</div>
          {sidebarOpen && (
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 800, fontSize: 13, color: "#FF9900" }}>AWS CPE Notes</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", marginTop: 1 }}>CLF-C02 Study Guide</div>
            </div>
          )}
          <button onClick={() => setSidebarOpen(v => !v)} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)", cursor: "pointer", fontSize: 12, borderRadius: 6, padding: "4px 7px", flexShrink: 0 }}>{sidebarOpen ? "◀" : "▶"}</button>
        </div>
        {sidebarOpen && (
          <div style={{ padding: "10px 14px 8px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", fontWeight: 600, textTransform: "uppercase" }}>Progress</span>
              <span style={{ fontSize: 10, color: "#FF9900", fontWeight: 700 }}>{completedCount} / {modules.length}</span>
            </div>
            <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: 6, height: 6, overflow: "hidden" }}>
              <div style={{ background: "#FF9900", borderRadius: 6, height: "100%", width: `${(completedCount / modules.length) * 100}%` }} />
            </div>
          </div>
        )}
        <div style={{ flex: 1, padding: "8px 6px", overflowY: "auto" }}>
          {modules.map(m => {
            const isActive = m.id === activeModule;
            const isDone = m.status === "complete";
            return (
              <button key={m.id} onClick={() => setActiveModule(m.id)} style={{ width: "100%", textAlign: "left", padding: sidebarOpen ? "9px 10px" : "10px 0", borderRadius: 8, border: "none", cursor: "pointer", background: isActive ? m.color + "22" : "transparent", marginBottom: 2, display: "flex", alignItems: "center", gap: 10, borderLeft: isActive ? `3px solid ${m.color}` : "3px solid transparent", opacity: isDone ? 1 : 0.55 }}>
                <span style={{ fontSize: 17, flexShrink: 0, textAlign: "center", width: sidebarOpen ? "auto" : "100%" }}>{m.emoji}</span>
                {sidebarOpen && (
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                      <span style={{ fontWeight: 700, fontSize: 12, color: isActive ? m.color : "rgba(255,255,255,0.8)" }}>{m.title}</span>
                      <span style={{ fontSize: 8, padding: "1px 5px", borderRadius: 4, fontWeight: 700, background: isDone ? "#0f9d5825" : "rgba(255,255,255,0.08)", color: isDone ? "#4caf50" : "rgba(255,255,255,0.3)" }}>{isDone ? "✓" : "SOON"}</span>
                    </div>
                    <div style={{ fontSize: 10, marginTop: 1, color: isActive ? "rgba(255,255,255,0.65)" : "rgba(255,255,255,0.3)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{m.subtitle}</div>
                  </div>
                )}
              </button>
            );
          })}
        </div>
        {sidebarOpen && (
          <div style={{ padding: "8px 14px 12px", borderTop: "1px solid rgba(255,255,255,0.05)", fontSize: 9, color: "rgba(255,255,255,0.2)", textAlign: "center", lineHeight: 1.5 }}>
            AWS Cloud Practitioner Essentials<br />Built with Claude · CLF-C02
          </div>
        )}
      </div>

      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
        <div style={{ background: "white", padding: "10px 20px", display: "flex", alignItems: "center", gap: 12, borderBottom: `3px solid ${mod.color}`, boxShadow: "0 1px 4px rgba(0,0,0,0.08)", position: "sticky", top: 0, zIndex: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 8, background: mod.color + "18", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{mod.emoji}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: "#1a1a1a" }}>{mod.title}: {mod.subtitle}</div>
            <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginTop: 3 }}>
              {mod.topics.map(t => (
                <span key={t} style={{ fontSize: 10, background: mod.color + "18", color: mod.color, border: `1px solid ${mod.color}35`, borderRadius: 10, padding: "1px 7px", fontWeight: 600 }}>{t}</span>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
            {activeModule > 1 && <button onClick={() => setActiveModule(v => v - 1)} style={{ background: "white", border: "1px solid #e0e0e0", color: "#555", borderRadius: 8, padding: "5px 12px", cursor: "pointer", fontSize: 12 }}>← Prev</button>}
            {activeModule < modules.length && <button onClick={() => setActiveModule(v => v + 1)} style={{ background: mod.color, border: "none", color: "white", borderRadius: 8, padding: "5px 14px", cursor: "pointer", fontSize: 12, fontWeight: 700 }}>Next →</button>}
          </div>
        </div>
        <div style={{ flex: 1, padding: "16px 20px 48px", overflowY: "auto" }}>
          {ModuleComponent ? <ModuleComponent /> : <ComingSoon mod={mod} />}
        </div>
      </div>
    </div>
  );
}
