import { useState } from "react";
import Module1 from "./Module1";
import Module2 from "./Module2";
import Module3 from "./Module3";

const accent = "#FF9900";

const modules = [
  {
    id: 1,
    emoji: "☁️",
    title: "Module 1",
    subtitle: "Cloud Computing Foundations",
    topics: ["What is Cloud?", "Client-Server", "Pay-as-you-go", "6 Benefits", "Global Infrastructure", "Shared Responsibility"],
    color: "#1a73e8",
    status: "complete",
    component: Module1,
  },
  {
    id: 2,
    emoji: "🖥️",
    title: "Module 2",
    subtitle: "Compute, Scaling & Messaging",
    topics: ["Amazon EC2", "Instance Types", "EC2 Pricing", "Auto Scaling", "ELB", "SQS · SNS · EventBridge"],
    color: "#FF9900",
    status: "complete",
    component: Module2,
  },
  {
    id: 3,
    emoji: "📦",
    title: "Module 3",
    subtitle: "Serverless, Containers & Compute",
    topics: ["AWS Lambda", "Containers vs VMs", "ECS & EKS", "AWS Fargate", "Beanstalk · Batch", "Lightsail · Outposts"],
    color: "#0f9d58",
    status: "complete",
    component: Module3,
  },
  {
    id: 4,
    emoji: "🗄️",
    title: "Module 4",
    subtitle: "Networking & Content Delivery",
    topics: ["VPC", "Subnets", "Security Groups", "Route 53", "CloudFront", "Direct Connect"],
    color: "#6a1b9a",
    status: "coming",
    component: null,
  },
  {
    id: 5,
    emoji: "💾",
    title: "Module 5",
    subtitle: "Storage",
    topics: ["S3", "EBS", "EFS", "Storage Classes", "Glacier", "Storage Gateway"],
    color: "#d32f2f",
    status: "coming",
    component: null,
  },
  {
    id: 6,
    emoji: "🗃️",
    title: "Module 6",
    subtitle: "Databases",
    topics: ["RDS", "DynamoDB", "Aurora", "Redshift", "ElastiCache", "Database Migration"],
    color: "#00838f",
    status: "coming",
    component: null,
  },
  {
    id: 7,
    emoji: "🔐",
    title: "Module 7",
    subtitle: "Security & Compliance",
    topics: ["IAM", "Shield", "WAF", "Macie", "GuardDuty", "Compliance"],
    color: "#c62828",
    status: "coming",
    component: null,
  },
  {
    id: 8,
    emoji: "💰",
    title: "Module 8",
    subtitle: "Pricing & Support",
    topics: ["Pricing Models", "Cost Explorer", "Budgets", "Support Plans", "Trusted Advisor", "Free Tier"],
    color: "#2e7d32",
    status: "coming",
    component: null,
  },
];

function ComingSoon({ mod }) {
  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      minHeight: "60vh", padding: "2rem",
    }}>
      <div style={{ fontSize: 60, marginBottom: 16 }}>{mod.emoji}</div>
      <div style={{ fontWeight: 700, fontSize: 22, color: "var(--color-text-primary)", marginBottom: 6 }}>
        {mod.title}: {mod.subtitle}
      </div>
      <div style={{
        background: mod.color + "15", border: `1.5px solid ${mod.color}40`,
        borderRadius: 12, padding: "16px 28px", marginTop: 20, textAlign: "center",
      }}>
        <div style={{ fontSize: 28, marginBottom: 8 }}>🚧</div>
        <div style={{ fontWeight: 700, fontSize: 15, color: mod.color, marginBottom: 6 }}>Coming Soon</div>
        <div style={{ fontSize: 13, color: "var(--color-text-secondary)", lineHeight: 1.6 }}>
          This module will cover:
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 10, justifyContent: "center" }}>
          {mod.topics.map(t => (
            <span key={t} style={{
              background: mod.color + "20", color: mod.color,
              border: `1px solid ${mod.color}40`, borderRadius: 16,
              fontSize: 11, fontWeight: 600, padding: "3px 10px",
            }}>{t}</span>
          ))}
        </div>
        <div style={{ fontSize: 12, color: "var(--color-text-secondary)", marginTop: 14 }}>
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
    <div style={{
      display: "flex", minHeight: "100vh", fontFamily: "system-ui, -apple-system, sans-serif",
      background: "var(--color-background-tertiary, #f5f5f5)",
    }}>

      {/* ── Sidebar ─────────────────────────────────────────────────────── */}
      <div style={{
        width: sidebarOpen ? 260 : 56, flexShrink: 0,
        background: "#1A1A2E", transition: "width 0.2s ease",
        display: "flex", flexDirection: "column", position: "sticky", top: 0, height: "100vh",
        overflowY: "auto", overflowX: "hidden",
      }}>
        {/* Logo area */}
        <div style={{
          padding: sidebarOpen ? "18px 16px 12px" : "18px 8px 12px",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          display: "flex", alignItems: "center", gap: 10,
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: 8, background: accent + "25",
            border: `1.5px solid ${accent}60`, display: "flex",
            alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0,
          }}>☁️</div>
          {sidebarOpen && (
            <div>
              <div style={{ fontWeight: 700, fontSize: 12, color: "#FF9900" }}>AWS CPE</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)" }}>CLF-C02 Study Guide</div>
            </div>
          )}
          <button onClick={() => setSidebarOpen(v => !v)} style={{
            marginLeft: "auto", background: "none", border: "none",
            color: "rgba(255,255,255,0.4)", cursor: "pointer", fontSize: 16, flexShrink: 0,
            padding: "2px 4px",
          }}>
            {sidebarOpen ? "◀" : "▶"}
          </button>
        </div>

        {/* Progress bar */}
        {sidebarOpen && (
          <div style={{ padding: "10px 16px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
              <span style={{ fontSize: 10, color: "rgba(255,255,255,0.4)" }}>Progress</span>
              <span style={{ fontSize: 10, color: accent, fontWeight: 700 }}>3 / 8 modules</span>
            </div>
            <div style={{ background: "rgba(255,255,255,0.1)", borderRadius: 4, height: 5 }}>
              <div style={{ background: accent, borderRadius: 4, height: 5, width: "37.5%" }} />
            </div>
          </div>
        )}

        {/* Module list */}
        <div style={{ flex: 1, padding: sidebarOpen ? "8px 8px" : "8px 4px" }}>
          {modules.map(m => {
            const isActive = m.id === activeModule;
            const isDone = m.status === "complete";
            return (
              <button key={m.id} onClick={() => setActiveModule(m.id)} style={{
                width: "100%", textAlign: "left",
                padding: sidebarOpen ? "10px 10px" : "10px 8px",
                borderRadius: 8, border: "none", cursor: "pointer",
                background: isActive ? m.color + "30" : "transparent",
                marginBottom: 2, display: "flex", alignItems: "center", gap: 10,
                borderLeft: isActive ? `3px solid ${m.color}` : "3px solid transparent",
                transition: "all 0.12s",
              }}>
                <span style={{ fontSize: 18, flexShrink: 0 }}>{m.emoji}</span>
                {sidebarOpen && (
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                      <span style={{
                        fontWeight: 700, fontSize: 12,
                        color: isActive ? m.color : "rgba(255,255,255,0.8)",
                      }}>{m.title}</span>
                      {isDone ? (
                        <span style={{
                          fontSize: 9, background: "#0f9d5830", color: "#0f9d58",
                          padding: "1px 5px", borderRadius: 4, fontWeight: 700,
                        }}>✓ DONE</span>
                      ) : (
                        <span style={{
                          fontSize: 9, background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.3)",
                          padding: "1px 5px", borderRadius: 4,
                        }}>SOON</span>
                      )}
                    </div>
                    <div style={{
                      fontSize: 10, color: isActive ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.35)",
                      marginTop: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                    }}>{m.subtitle}</div>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Footer */}
        {sidebarOpen && (
          <div style={{
            padding: "10px 16px", borderTop: "1px solid rgba(255,255,255,0.06)",
            fontSize: 10, color: "rgba(255,255,255,0.25)", textAlign: "center",
          }}>
            AWS Cloud Practitioner Essentials
          </div>
        )}
      </div>

      {/* ── Main Content ────────────────────────────────────────────────── */}
      <div style={{ flex: 1, minWidth: 0, overflowY: "auto" }}>
        {/* Top bar */}
        <div style={{
          background: "#1A1A2E", padding: "12px 20px",
          display: "flex", alignItems: "center", gap: 12,
          borderBottom: `3px solid ${mod.color}`,
          position: "sticky", top: 0, zIndex: 10,
        }}>
          <span style={{ fontSize: 22 }}>{mod.emoji}</span>
          <div>
            <div style={{ fontWeight: 700, fontSize: 15, color: "white" }}>{mod.title}: {mod.subtitle}</div>
            <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginTop: 4 }}>
              {mod.topics.map(t => (
                <span key={t} style={{
                  fontSize: 10, background: mod.color + "25", color: mod.color,
                  border: `1px solid ${mod.color}40`, borderRadius: 10, padding: "1px 7px", fontWeight: 600,
                }}>{t}</span>
              ))}
            </div>
          </div>
          <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
            {activeModule > 1 && (
              <button onClick={() => setActiveModule(v => v - 1)} style={{
                background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)",
                color: "white", borderRadius: 8, padding: "5px 12px", cursor: "pointer", fontSize: 12,
              }}>← Prev</button>
            )}
            {activeModule < 8 && (
              <button onClick={() => setActiveModule(v => v + 1)} style={{
                background: mod.color, border: "none",
                color: "white", borderRadius: 8, padding: "5px 12px", cursor: "pointer",
                fontSize: 12, fontWeight: 700,
              }}>Next →</button>
            )}
          </div>
        </div>

        {/* Module content */}
        <div style={{ padding: "16px 16px 40px" }}>
          {ModuleComponent ? <ModuleComponent /> : <ComingSoon mod={mod} />}
        </div>
      </div>
    </div>
  );
}
