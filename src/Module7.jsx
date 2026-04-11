import { useState } from "react";

const accent = "#FF9900";
const accentDark = "#CC7A00";

function Badge({ text, color }) {
  return (
    <span style={{
      display: "inline-block", background: color + "20", color,
      border: `1px solid ${color}40`, borderRadius: 20,
      fontSize: 10, fontWeight: 700, padding: "2px 9px", textTransform: "uppercase", letterSpacing: 0.4,
    }}>{text}</span>
  );
}
function Callout({ icon, label, text, color = "#FF9900" }) {
  return (
    <div style={{
      background: color + "12", border: `1px solid ${color}35`,
      borderLeft: `3px solid ${color}`, borderRadius: 8,
      padding: "10px 14px", margin: "10px 0 0",
    }}>
      <div style={{ fontWeight: 700, fontSize: 11, color, marginBottom: 4 }}>{icon} {label}</div>
      <div style={{ fontSize: 13, lineHeight: 1.65, color: "#555" }}>{text}</div>
    </div>
  );
}
function H2({ children }) {
  return (
    <div style={{
      fontWeight: 700, fontSize: 14, color: "#1a1a1a",
      margin: "18px 0 8px", borderBottom: "1px solid #e0e0e0", paddingBottom: 6,
    }}>{children}</div>
  );
}
function Body({ children }) {
  return <div style={{ fontSize: 13.5, lineHeight: 1.7, color: "#555", marginTop: 6 }}>{children}</div>;
}
function KV({ rows }) {
  return (
    <div style={{ borderRadius: 8, overflow: "hidden", border: "1px solid #e0e0e0", marginTop: 8 }}>
      {rows.map(([k, v, color], i) => (
        <div key={i} style={{
          display: "grid", gridTemplateColumns: "30% 1fr", gap: 10,
          padding: "8px 12px", alignItems: "start",
          borderBottom: i < rows.length - 1 ? "1px solid #f0f0f0" : "none",
          background: i % 2 === 0 ? "#fafafa" : "white",
        }}>
          <div style={{ fontWeight: 700, fontSize: 12, color: color || "#1a73e8" }}>{k}</div>
          <div style={{ fontSize: 12.5, color: "#555", lineHeight: 1.55 }}>{v}</div>
        </div>
      ))}
    </div>
  );
}
function Table({ rows, cols }) {
  return (
    <div style={{ borderRadius: 8, overflow: "hidden", border: "1px solid #e0e0e0", marginTop: 6 }}>
      {rows.map((row, i) => (
        <div key={i} style={{
          display: "grid", gridTemplateColumns: cols || `repeat(${row.length}, 1fr)`,
          borderBottom: i < rows.length - 1 ? "1px solid #f0f0f0" : "none",
          background: i === 0 ? "#263238" : i % 2 === 0 ? "#fafafa" : "white",
        }}>
          {row.map((cell, j) => (
            <div key={j} style={{
              padding: "8px 10px", fontSize: i === 0 ? 11 : 12,
              fontWeight: i === 0 || j === 0 ? 700 : 400,
              color: i === 0 ? "#FF9900" : j === 0 ? "#333" : "#555",
              borderRight: j < row.length - 1 ? "1px solid #f0f0f0" : "none",
              lineHeight: 1.4,
            }}>{cell}</div>
          ))}
        </div>
      ))}
    </div>
  );
}

const sections = [
  { id: "intro",       emoji: "🗃️", title: "DB Overview",         badge: "Relational vs NoSQL",           badgeColor: "#e65100" },
  { id: "rds",         emoji: "🐬", title: "Amazon RDS",           badge: "Managed Relational DB",         badgeColor: "#0078d4" },
  { id: "aurora",      emoji: "⚡", title: "Amazon Aurora",        badge: "5x MySQL · 3x PostgreSQL",      badgeColor: "#6a1b9a" },
  { id: "dynamodb",    emoji: "🚀", title: "Amazon DynamoDB",      badge: "Serverless NoSQL",              badgeColor: "#d32f2f" },
  { id: "elasticache", emoji: "💾", title: "ElastiCache",          badge: "Redis · Valkey · Memcached",    badgeColor: "#0f9d58" },
  { id: "special",     emoji: "🔬", title: "Purpose-Built DBs",    badge: "DocumentDB · Neptune · DAX",   badgeColor: "#FF9900" },
  { id: "backup",      emoji: "🛡️", title: "AWS Backup",           badge: "Centralised Protection",        badgeColor: "#546e7a" },
  { id: "compare",     emoji: "⚖️", title: "When to Use Which?",   badge: "Decision Guide",                badgeColor: "#1a73e8" },
];

function SectionContent({ id }) {
  switch (id) {

    case "intro": return (
      <div>
        <Body>
          Not all data is the same. A customer loyalty record needs to link to orders.
          A gaming leaderboard needs millisecond reads. A product catalog needs flexible attributes.
          AWS offers purpose-built database services for each scenario.
        </Body>

        <H2>Relational vs NoSQL — The Core Difference</H2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 8 }}>
          <div style={{ background: "#1a1a2e", border: "2px solid #0f9d58", borderRadius: 10, padding: 14 }}>
            <div style={{ fontWeight: 700, fontSize: 12, color: "#4caf50", marginBottom: 10, textAlign: "center" }}>Relational Database (SQL)</div>
            <div style={{ borderRadius: 7, overflow: "hidden", border: "1px solid #4caf5040", marginBottom: 8 }}>
              <div style={{ background: "#0f9d58", display: "grid", gridTemplateColumns: "0.5fr 1.5fr 1fr 1fr", padding: "5px 8px" }}>
                {["ID","Name","Size","Price"].map(h => <div key={h} style={{ fontSize: 9, fontWeight: 700, color: "white" }}>{h}</div>)}
              </div>
              {[["1","Medium Roast","12oz","$13.95"],["2","Single-Origin","12oz","$21.95"],["3","Espresso Blend","8oz","$18.50"]].map((row,i) => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "0.5fr 1.5fr 1fr 1fr", padding: "5px 8px", borderTop: "1px solid #4caf5020", background: i % 2 === 0 ? "rgba(76,175,80,0.08)" : "transparent" }}>
                  {row.map((cell,j) => <div key={j} style={{ fontSize: 9.5, color: j === 0 ? "#4caf50" : "rgba(255,255,255,0.75)" }}>{cell}</div>)}
                </div>
              ))}
            </div>
            <div style={{ fontSize: 10.5, color: "rgba(255,255,255,0.65)", lineHeight: 1.65 }}>
              Fixed schema — every row has same columns<br />
              Tables relate to each other via foreign keys<br />
              Query using SQL (JOIN, WHERE, GROUP BY)<br />
              ACID transactions — data integrity guaranteed<br />
              <span style={{ color: "#ef9a9a" }}>Rigid — hard to change schema later</span>
            </div>
          </div>
          <div style={{ background: "#1a1a2e", border: "2px solid #6a1b9a", borderRadius: 10, padding: 14 }}>
            <div style={{ fontWeight: 700, fontSize: 12, color: "#ce93d8", marginBottom: 10, textAlign: "center" }}>NoSQL Database (Key-Value)</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 5, marginBottom: 8 }}>
              {[
                { key: "1", attrs: { Name: "John Doe", Address: "123 Main St", "Fav drink": "Latte" } },
                { key: "2", attrs: { Name: "Mary Major", Address: "100 Oak Ave", Birthday: "July 5, 1994" } },
                { key: "3", attrs: { Name: "Alex Chen", "Fav drink": "Cold brew", Points: "4200", Premium: "true" } },
              ].map(({ key, attrs }) => (
                <div key={key} style={{ background: "rgba(156,39,176,0.12)", border: "1px solid #9c27b040", borderRadius: 6, padding: "6px 9px" }}>
                  <div style={{ fontSize: 9, color: "#ce93d8", fontWeight: 700, marginBottom: 3 }}>Key: {key}</div>
                  <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                    {Object.entries(attrs).map(([k, v]) => (
                      <span key={k} style={{ fontSize: 8.5, background: "rgba(156,39,176,0.25)", color: "#ce93d8", borderRadius: 3, padding: "1px 5px" }}>{k}: {v}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 10.5, color: "rgba(255,255,255,0.65)", lineHeight: 1.65 }}>
              Flexible schema — each item can have different attributes<br />
              Add/remove attributes at any time<br />
              Scales to millions of requests/second<br />
              Single-digit millisecond performance<br />
              <span style={{ color: "#ef9a9a" }}>No JOINs across tables</span>
            </div>
          </div>
        </div>

        <H2>Coffee Shop — Why Relational DB for Loyalty</H2>
        <div style={{ background: "#f9f9f9", borderRadius: 10, padding: "14px", marginTop: 6, border: "1px solid #e0e0e0" }}>
          <div style={{ fontSize: 13, color: "#555", lineHeight: 1.7, marginBottom: 10 }}>
            The coffee shop needs to track <b>relationships</b> between customers and orders.
            If a customer orders the same drink 5 times, send them a discount.
            This requires linking data across tables using SQL JOINs.
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <div style={{ borderRadius: 8, overflow: "hidden", border: "2px solid #1a73e8", flex: "0 0 auto" }}>
              <div style={{ background: "#1a73e8", padding: "4px 8px", fontSize: 10, fontWeight: 700, color: "white" }}>customers</div>
              {[["1","Alice"],["2","Bob"]].map(([id,name]) => (
                <div key={id} style={{ display: "grid", gridTemplateColumns: "0.5fr 1fr", padding: "4px 8px", borderTop: "1px solid #f0f0f0", fontSize: 10.5 }}>
                  <span style={{ color: "#1a73e8", fontWeight: 700 }}>{id}</span><span style={{ color: "#555" }}>{name}</span>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 18, color: "#888" }}>→</div>
            <div style={{ borderRadius: 8, overflow: "hidden", border: "2px solid #0f9d58", flex: "0 0 auto" }}>
              <div style={{ background: "#0f9d58", padding: "4px 8px", fontSize: 10, fontWeight: 700, color: "white" }}>orders</div>
              {[["1","1","Latte"],["2","1","Latte"],["3","2","Espresso"]].map(([oid,cid,item]) => (
                <div key={oid} style={{ display: "grid", gridTemplateColumns: "0.4fr 0.5fr 1fr", padding: "4px 8px", borderTop: "1px solid #f0f0f0", fontSize: 10 }}>
                  <span style={{ color: "#0f9d58", fontWeight: 700 }}>#{oid}</span>
                  <span style={{ color: "#1a73e8" }}>c:{cid}</span>
                  <span style={{ color: "#555" }}>{item}</span>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 18, color: "#888" }}>→</div>
            <div style={{ background: "#FFF3E0", borderRadius: 8, padding: "10px 12px", border: "2px solid #FF9900", flex: "0 0 auto" }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: "#CC7A00", marginBottom: 4 }}>SQL Result:</div>
              <div style={{ fontSize: 11, color: "#333", lineHeight: 1.7 }}>
                Alice ordered Latte × 2<br />
                <span style={{ color: "#0f9d58", fontWeight: 700 }}>Send 20% off coupon!</span>
              </div>
            </div>
          </div>
        </div>

        <H2>AWS Database Services Overview</H2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 6 }}>
          {[
            { name: "Amazon RDS", icon: "🐬", type: "Relational (SQL)", color: "#0f9d58", use: "Traditional apps, loyalty programs, e-commerce, ERP", engines: "MySQL, PostgreSQL, SQL Server, Oracle, MariaDB" },
            { name: "Amazon Aurora", icon: "⭐", type: "Relational — Cloud-native", color: "#FF9900", use: "High-traffic, gaming, media — needs 5× MySQL performance", engines: "MySQL-compatible, PostgreSQL-compatible" },
            { name: "Amazon DynamoDB", icon: "⚡", type: "NoSQL (Key-Value + Document)", color: "#6a1b9a", use: "Gaming, shopping carts, IoT, real-time — flexible + fast", engines: "DynamoDB (proprietary)" },
            { name: "Amazon ElastiCache", icon: "🚀", type: "In-Memory Cache", color: "#d32f2f", use: "Sessions, leaderboards, caching — microsecond reads", engines: "Redis, Valkey, Memcached" },
          ].map(({ name, icon, type, color, use, engines }) => (
            <div key={name} style={{ border: `1px solid ${color}30`, borderTop: `3px solid ${color}`, borderRadius: 9, padding: "11px 12px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
                <span style={{ fontSize: 20 }}>{icon}</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 12.5, color }}>{name}</div>
                  <div style={{ fontSize: 10, color: "#888" }}>{type}</div>
                </div>
              </div>
              <div style={{ fontSize: 11.5, color: "#555", lineHeight: 1.5, marginBottom: 4 }}>{use}</div>
              <div style={{ fontSize: 10.5, color, fontStyle: "italic" }}>Engines: {engines}</div>
            </div>
          ))}
        </div>

        <Callout icon="🎯" label="Exam Tip"
          text="Relational = SQL, fixed schema, JOINs, ACID (RDS, Aurora). NoSQL = flexible schema, key-value, massive scale (DynamoDB). ElastiCache = cache IN FRONT of DB, not a database itself. Choose based on: do you need JOINs? (yes=RDS/Aurora) Do you need flexible schema + massive scale? (yes=DynamoDB) Do you need microsecond reads? (yes=ElastiCache)." color={accent} />
      </div>
    );

    case "rds": return (
      <div>
        <Body>
          Amazon RDS is a <b>fully managed relational database service</b>. AWS handles OS patching,
          backups, hardware provisioning, and Multi-AZ failover. You focus entirely on your data
          and business logic.
        </Body>

        <H2>What AWS Manages vs You — On-Prem vs EC2 vs RDS</H2>
        <div style={{ background: "#1a1a2e", borderRadius: 12, padding: 14, marginTop: 8, border: "2px solid #0f9d58" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
            {[
              { title: "On-Premises", icon: "🏢", color: "#607d8b",
                you: ["Hardware","Networking","Hypervisor","OS patches","DB software","DB patches","Backups","HA setup","Your data"], aws: [] },
              { title: "DB on EC2", icon: "🖥️", color: "#FF9900",
                you: ["OS patches","DB software","DB patches","Backups","HA setup","Your data"],
                aws: ["Hardware","Networking","Hypervisor"] },
              { title: "Amazon RDS", icon: "🐬", color: "#0f9d58",
                you: ["Your data","DB config","Security rules"],
                aws: ["Hardware","Networking","Hypervisor","OS patches","DB software","DB patches","Backups","HA/Multi-AZ"] },
            ].map(({ title, icon, color, you, aws }) => (
              <div key={title} style={{ background: color + "18", border: `2px solid ${color}40`, borderRadius: 10, padding: 11 }}>
                <div style={{ fontWeight: 700, fontSize: 12, color, marginBottom: 8, textAlign: "center" }}>{icon} {title}</div>
                {aws.length > 0 && (
                  <div style={{ marginBottom: 8 }}>
                    <div style={{ fontSize: 9.5, color: "#4caf50", fontWeight: 700, marginBottom: 4 }}>AWS Manages:</div>
                    {aws.map(item => <div key={item} style={{ fontSize: 10, color: "#4caf50", marginBottom: 2 }}>✅ {item}</div>)}
                  </div>
                )}
                <div>
                  <div style={{ fontSize: 9.5, color, fontWeight: 700, marginBottom: 4 }}>You Manage:</div>
                  {you.map(item => <div key={item} style={{ fontSize: 10, color: "rgba(255,255,255,0.7)", marginBottom: 2 }}>• {item}</div>)}
                </div>
              </div>
            ))}
          </div>
        </div>

        <H2>Multi-AZ — High Availability</H2>
        <div style={{ background: "white", borderRadius: 10, padding: 14, border: "1px solid #e0e0e0", marginTop: 6 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <div>
              <div style={{ fontSize: 13, color: "#555", lineHeight: 1.7, marginBottom: 8 }}>
                RDS Multi-AZ keeps a <b>synchronised standby replica</b> in a different AZ.
                If the primary fails, RDS automatically redirects traffic to the standby.
                Your app uses a single DNS endpoint — the switchover is invisible.
              </div>
              {["Automatic failover — no manual steps", "Standby always in sync (synchronous replication)", "Failover completes in ~1–2 minutes", "Covers: AZ failure, hardware failure, maintenance windows"].map(item => (
                <div key={item} style={{ fontSize: 12, color: "#555", marginBottom: 4, display: "flex", gap: 7 }}>
                  <span style={{ color: "#0f9d58" }}>✅</span>{item}
                </div>
              ))}
            </div>
            <div style={{ background: "#1a1a2e", borderRadius: 10, padding: 12 }}>
              <div style={{ display: "flex", gap: 10, justifyContent: "center", marginBottom: 8 }}>
                {[
                  { az: "AZ-a", role: "PRIMARY", color: "#0f9d58", active: true },
                  { az: "AZ-b", role: "STANDBY", color: "#546e7a", active: false },
                ].map(({ az, role, color, active }) => (
                  <div key={az} style={{ background: color + "20", border: `2px solid ${color}`, borderRadius: 8, padding: "10px 14px", textAlign: "center" }}>
                    <div style={{ fontSize: 9, color: "#888", marginBottom: 3 }}>{az}</div>
                    <div style={{ fontSize: 22, marginBottom: 3 }}>🐬</div>
                    <div style={{ fontSize: 10, fontWeight: 700, color }}>{role}</div>
                    <div style={{ fontSize: 8, color: active ? "#4caf50" : "#888", marginTop: 3 }}>{active ? "🟢 Serving traffic" : "⚪ Syncing only"}</div>
                  </div>
                ))}
              </div>
              <div style={{ textAlign: "center", fontSize: 9, color: "#4caf50", marginBottom: 6 }}>Synchronous replication</div>
              <div style={{ background: "#d32f2f20", borderRadius: 6, padding: "6px 8px", border: "1px solid #d32f2f40", textAlign: "center" }}>
                <div style={{ fontSize: 9.5, color: "#ef9a9a" }}>AZ-a fails → Auto failover → AZ-b becomes PRIMARY in ~2 min</div>
              </div>
            </div>
          </div>
        </div>

        <H2>Amazon RDS — Key Facts</H2>
        <KV rows={[
          ["Supported engines", "MySQL, PostgreSQL, Microsoft SQL Server, Oracle, MariaDB, Amazon Aurora", "#0f9d58"],
          ["Automated backups", "Daily automated backups + transaction logs → point-in-time recovery up to 35 days", "#1a73e8"],
          ["Read Replicas", "Up to 15 read replicas to offload reads from primary. Cross-region possible.", "#FF9900"],
          ["Scaling", "Vertical: change instance type. Storage: auto-scales. Horizontal: add read replicas.", "#6a1b9a"],
          ["Security", "VPC isolation, encryption at rest (KMS), encryption in transit (SSL/TLS), IAM auth.", "#d32f2f"],
          ["Your responsibility", "Configure security groups, set encryption, manage users/passwords, define schema.", "#546e7a"],
        ]} />

        <H2>Real-World Use Cases</H2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginTop: 6 }}>
          {[
            { icon: "☕", title: "Coffee Shop Loyalty", color: "#FF9900", desc: "customers, orders, and points tables linked by foreign keys. SQL JOIN finds who deserves a discount.", engine: "MySQL" },
            { icon: "🛒", title: "E-Commerce Platform", color: "#0f9d58", desc: "Products, inventory, orders, payments. ACID transactions ensure stock is reduced when order placed.", engine: "PostgreSQL + Multi-AZ" },
            { icon: "🏥", title: "Healthcare Records", color: "#1a73e8", desc: "Patients, appointments, prescriptions, doctors. Complex relationships. Strict data integrity.", engine: "Oracle + encryption" },
          ].map(({ icon, title, color, desc, engine }) => (
            <div key={title} style={{ border: `1px solid ${color}25`, borderTop: `3px solid ${color}`, borderRadius: 8, padding: "10px 11px" }}>
              <div style={{ fontSize: 20, marginBottom: 4 }}>{icon}</div>
              <div style={{ fontWeight: 700, fontSize: 12, color, marginBottom: 4 }}>{title}</div>
              <div style={{ fontSize: 11.5, color: "#555", lineHeight: 1.5, marginBottom: 5 }}>{desc}</div>
              <div style={{ fontSize: 10.5, color, fontStyle: "italic" }}>Engine: {engine}</div>
            </div>
          ))}
        </div>

        <Callout icon="🎯" label="Exam Tip"
          text="RDS = managed relational DB. AWS handles: OS patches, backups, Multi-AZ, hardware. You handle: schema, security groups, encryption config. Multi-AZ = high availability (failover ~2min). Read Replicas = performance (scale reads). Lift-and-shift to EC2 = you manage more. RDS = AWS manages more. Aurora = maximum performance." color="#0f9d58" />
      </div>
    );

    case "aurora": return (
      <div>
        <Body>
          Amazon Aurora is AWS's own <b>cloud-native relational database</b>. It looks and behaves
          like MySQL or PostgreSQL (same drivers, same SQL, easy migration), but its underlying
          architecture was rebuilt for the cloud — delivering <b>5× MySQL performance</b> and
          far more resilience.
        </Body>

        <H2>Aurora Architecture — What Makes It Different</H2>
        <div style={{ background: "#1a1a2e", borderRadius: 12, padding: 14, marginTop: 8, border: "2px solid #FF9900" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div style={{ background: "#37474f25", border: "2px solid #607d8b", borderRadius: 10, padding: 11 }}>
              <div style={{ fontWeight: 700, fontSize: 11, color: "#90a4ae", marginBottom: 8, textAlign: "center" }}>Standard MySQL (RDS)</div>
              <div style={{ textAlign: "center", marginBottom: 8 }}>
                <div style={{ display: "inline-block", background: "#607d8b25", border: "1px solid #607d8b", borderRadius: 7, padding: "8px 16px" }}>
                  <div style={{ fontSize: 18 }}>🐬</div>
                  <div style={{ fontSize: 9, color: "#90a4ae" }}>DB Instance</div>
                </div>
                <div style={{ fontSize: 9, color: "#888", margin: "4px 0" }}>↓</div>
                <div style={{ display: "flex", gap: 6, justifyContent: "center" }}>
                  {["AZ-a Storage","AZ-b Replica"].map(s => (
                    <div key={s} style={{ background: "#607d8b20", border: "1px solid #607d8b40", borderRadius: 5, padding: "4px 8px", fontSize: 9, color: "#888" }}>{s}</div>
                  ))}
                </div>
              </div>
              <div style={{ fontSize: 10.5, color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}>
                Storage tied to instance<br />
                Manual resize required<br />
                Up to ~30K IOPS<br />
                2 copies of data (Multi-AZ)
              </div>
            </div>
            <div style={{ background: "#FF990018", border: "2px solid #FF9900", borderRadius: 10, padding: 11 }}>
              <div style={{ fontWeight: 700, fontSize: 11, color: "#FF9900", marginBottom: 8, textAlign: "center" }}>Amazon Aurora</div>
              <div style={{ textAlign: "center", marginBottom: 8 }}>
                <div style={{ display: "flex", gap: 5, justifyContent: "center", marginBottom: 5 }}>
                  {["Primary","Replica 1","Replica 2"].map((r,i) => (
                    <div key={r} style={{ background: i === 0 ? "#FF990030" : "#FF990015", border: `1px solid ${i === 0 ? "#FF9900" : "#FF990050"}`, borderRadius: 6, padding: "5px 7px", textAlign: "center" }}>
                      <div style={{ fontSize: 14 }}>⭐</div>
                      <div style={{ fontSize: 8, color: "#FF9900" }}>{r}</div>
                    </div>
                  ))}
                </div>
                <div style={{ fontSize: 9, color: "#888" }}>All share distributed storage</div>
                <div style={{ display: "flex", gap: 4, justifyContent: "center", marginTop: 5, flexWrap: "wrap" }}>
                  {["AZ-a","AZ-a","AZ-b","AZ-b","AZ-c","AZ-c"].map((az,i) => (
                    <div key={i} style={{ background: "#FF990025", border: "1px solid #FF990050", borderRadius: 3, padding: "2px 5px", fontSize: 8, color: "#FF9900" }}>{az}</div>
                  ))}
                </div>
                <div style={{ fontSize: 8.5, color: "#888", marginTop: 3 }}>6 copies of data across 3 AZs</div>
              </div>
              <div style={{ fontSize: 10.5, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>
                Distributed storage auto-scales<br />
                6 copies across 3 AZs<br />
                Grows to 128TB automatically<br />
                Up to 200K IOPS
              </div>
            </div>
          </div>
        </div>

        <H2>Aurora vs Standard RDS</H2>
        <Table rows={[
          ["Feature","Standard RDS MySQL","Amazon Aurora"],
          ["Performance","Baseline MySQL","5× MySQL, 3× PostgreSQL"],
          ["Storage","Manual resize up to 64TB","Auto-grows to 128TB"],
          ["Replicas","Up to 5 read replicas","Up to 15 Aurora Replicas"],
          ["Copies of data","2 (primary + standby)","6 copies across 3 AZs"],
          ["Failover time","~2 min (Multi-AZ)","~30 sec (Aurora native)"],
          ["Continuous backup","Daily snapshots","Continuous to S3 (35-day PITR)"],
          ["Best for","Standard web apps, moderate load","High-traffic, mission-critical, gaming"],
        ]} cols="1fr 1fr 1fr" />

        <H2>Real-World Aurora Examples</H2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 6 }}>
          {[
            { icon: "🎮", title: "Gaming Platform", color: "#FF9900",
              problem: "2 million concurrent players. Database crushed by simultaneous reads of player stats, leaderboards, inventory.",
              solution: "Aurora with 15 replicas distributes reads. 5× throughput vs MySQL handles the launch spike. ~30sec failover protects uptime.", highlight: "200K IOPS handles game launch" },
            { icon: "📺", title: "Media Content Platform", color: "#6a1b9a",
              problem: "50M video titles — metadata must be queryable in milliseconds for personalised recommendations.",
              solution: "Aurora PostgreSQL. Auto-grew from 10GB to 2TB as catalog expanded. Zero downtime. Continuous S3 backup.", highlight: "Auto-scale 10GB to 2TB" },
          ].map(({ icon, title, color, problem, solution, highlight }) => (
            <div key={title} style={{ border: `1px solid ${color}30`, borderRadius: 10, overflow: "hidden" }}>
              <div style={{ background: color, padding: "8px 12px" }}>
                <div style={{ fontWeight: 700, fontSize: 12, color: "white" }}>{icon} {title}</div>
              </div>
              <div style={{ padding: "10px 12px", background: "white" }}>
                <div style={{ fontWeight: 700, fontSize: 10.5, color: "#d32f2f", marginBottom: 3 }}>Problem:</div>
                <div style={{ fontSize: 11.5, color: "#555", lineHeight: 1.5, marginBottom: 7 }}>{problem}</div>
                <div style={{ fontWeight: 700, fontSize: 10.5, color: "#0f9d58", marginBottom: 3 }}>Solution:</div>
                <div style={{ fontSize: 11.5, color: "#555", lineHeight: 1.5, marginBottom: 6 }}>{solution}</div>
                <div style={{ fontSize: 11, background: color + "15", color, border: `1px solid ${color}30`, borderRadius: 5, padding: "4px 8px", fontWeight: 700 }}>Result: {highlight}</div>
              </div>
            </div>
          ))}
        </div>

        <Callout icon="🎯" label="Exam Tip"
          text="Aurora = cloud-native, MySQL + PostgreSQL compatible. 5× MySQL performance. 6 copies across 3 AZs automatically. Auto-scales storage to 128TB. Up to 15 replicas. ~30 sec failover. Continuous backup to S3. More expensive than standard RDS but about 10% of Oracle cost. Use when: high performance + high availability + high scale all required." color="#FF9900" />
      </div>
    );

    case "dynamodb": return (
      <div>
        <Body>
          Amazon DynamoDB is a <b>fully managed, serverless NoSQL database</b>. No servers to launch,
          no schema to define upfront, no capacity planning. It auto-scales from 1 request to
          146 million requests per second — proven on Amazon Prime Day 2024.
        </Body>

        <H2>RDS vs DynamoDB — Structure Side by Side</H2>
        <div style={{ background: "#1a1a2e", borderRadius: 12, padding: 14, marginTop: 8, border: "2px solid #6a1b9a" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 11, color: "#90caf9", marginBottom: 8, textAlign: "center" }}>RDS — Rigid Schema (SQL)</div>
              <div style={{ borderRadius: 7, overflow: "hidden", border: "1px solid #1a73e840" }}>
                <div style={{ background: "#1a73e8", display: "grid", gridTemplateColumns: "0.4fr 1fr 1fr 1fr", padding: "5px 7px" }}>
                  {["ID","Name","Address","Birthday"].map(h => <div key={h} style={{ fontSize: 8.5, fontWeight: 700, color: "white" }}>{h}</div>)}
                </div>
                {[["1","John","123 Main","1990-03-15"],["2","Mary","100 Oak","1994-07-05"]].map((row,i) => (
                  <div key={i} style={{ display: "grid", gridTemplateColumns: "0.4fr 1fr 1fr 1fr", padding: "4px 7px", borderTop: "1px solid #1a73e820", background: "rgba(26,115,232,0.06)" }}>
                    {row.map((cell,j) => <div key={j} style={{ fontSize: 8.5, color: j === 0 ? "#60a5fa" : "rgba(255,255,255,0.65)" }}>{cell}</div>)}
                  </div>
                ))}
              </div>
              <div style={{ fontSize: 9.5, color: "#ef9a9a", marginTop: 4 }}>All rows must have ALL columns — even if unknown</div>
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 11, color: "#ce93d8", marginBottom: 8, textAlign: "center" }}>DynamoDB — Flexible Schema</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {[
                  { key: "1", attrs: { Name: "John Doe", Address: "123 Main", "Fav drink": "Latte" } },
                  { key: "2", attrs: { Name: "Mary Major", Address: "100 Oak", Birthday: "July 5" } },
                  { key: "3", attrs: { Name: "Alex", "Fav drink": "Cold brew", Points: "4200", Premium: "true" } },
                ].map(({ key, attrs }) => (
                  <div key={key} style={{ background: "rgba(156,39,176,0.12)", border: "1px solid #9c27b040", borderRadius: 6, padding: "5px 8px" }}>
                    <div style={{ fontSize: 8.5, color: "#ce93d8", fontWeight: 700, marginBottom: 2 }}>Key: {key}</div>
                    <div style={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
                      {Object.entries(attrs).map(([k, v]) => (
                        <span key={k} style={{ fontSize: 8, background: "rgba(156,39,176,0.25)", color: "#ce93d8", borderRadius: 3, padding: "1px 4px" }}>{k}: {v}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ fontSize: 9.5, color: "#4caf50", marginTop: 4 }}>Each item can have completely different attributes</div>
            </div>
          </div>
        </div>

        <H2>DynamoDB Key Facts</H2>
        <KV rows={[
          ["Serverless", "No instances to launch. AWS handles all infrastructure. You just create tables and start storing.", "#6a1b9a"],
          ["Performance", "Single-digit millisecond response at ANY scale. Consistent regardless of table size.", "#0f9d58"],
          ["Scale", "No practical limits. Prime Day 2024: 146 million req/sec. Auto-scales with your traffic.", "#d32f2f"],
          ["Schema", "Flexible. Each item can have different attributes. Add/remove attributes anytime without migration.", "#1a73e8"],
          ["Partition key", "Required for every item. Determines which server stores the item (even distribution).", "#FF9900"],
          ["Queries", "Fast by partition key. Sort key enables range queries. No JOINs across tables.", "#546e7a"],
          ["Global Tables", "Replicate across multiple AWS Regions automatically. Active-active globally.", "#0f9d58"],
          ["Availability", "99.999% — data replicated across 3 AZs in a region automatically.", "#6a1b9a"],
        ]} />

        <div style={{ background: "#1a1a2e", borderRadius: 10, padding: "12px 16px", marginTop: 10, border: "2px solid #6a1b9a" }}>
          <div style={{ fontWeight: 700, fontSize: 12, color: "#ce93d8", marginBottom: 8 }}>Prime Day 2024 — Proof of Scale</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
            {[
              { stat: "48 hours", label: "Duration of Prime Day", color: "#FF9900" },
              { stat: "146M req/sec", label: "Peak DynamoDB throughput", color: "#ef5350" },
              { stat: "0 downtime", label: "No maintenance needed", color: "#4caf50" },
            ].map(({ stat, label, color }) => (
              <div key={label} style={{ background: color + "18", border: `1px solid ${color}40`, borderRadius: 8, padding: "10px", textAlign: "center" }}>
                <div style={{ fontSize: 17, fontWeight: 800, color }}>{stat}</div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.6)", marginTop: 3 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        <H2>Real-World DynamoDB Use Cases</H2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 6 }}>
          {[
            { icon: "🎮", title: "Gaming Leaderboard", color: "#6a1b9a",
              why: "Millions of simultaneous score submissions. Single-digit ms updates. Different game modes have different stats — flexible schema handles it.", config: "Partition: gameId | Sort: score (desc)" },
            { icon: "🛒", title: "Shopping Cart", color: "#FF9900",
              why: "Each user's cart is independent. No JOINs needed. Flexible — cart items have varying attributes. Millions of concurrent shoppers.", config: "Partition: userId | Attributes: cart items" },
            { icon: "📱", title: "Mobile App Sessions", color: "#0f9d58",
              why: "Session data per user — no complex relationships. Sub-ms reads. TTL attribute auto-expires old sessions. Schema evolves with app.", config: "Partition: sessionId | TTL: auto-expire" },
            { icon: "🌐", title: "IoT Device Data", color: "#1a73e8",
              why: "Thousands of devices sending readings per second. Different device types have different attributes. Time-series at massive scale.", config: "Partition: deviceId | Sort: timestamp" },
          ].map(({ icon, title, color, why, config }) => (
            <div key={title} style={{ border: `1px solid ${color}25`, borderTop: `3px solid ${color}`, borderRadius: 8, padding: "10px 11px" }}>
              <div style={{ fontWeight: 700, fontSize: 12, color, marginBottom: 4 }}>{icon} {title}</div>
              <div style={{ fontSize: 11.5, color: "#555", lineHeight: 1.5, marginBottom: 6 }}>{why}</div>
              <div style={{ fontSize: 10.5, background: color + "12", color, border: `1px solid ${color}25`, borderRadius: 5, padding: "4px 8px", fontFamily: "monospace" }}>{config}</div>
            </div>
          ))}
        </div>

        <Callout icon="🎯" label="Exam Tip"
          text="DynamoDB = serverless, NoSQL, key-value, single-digit millisecond. No schema upfront. Scales automatically. No SQL, no JOINs. Use when: flexible schema + massive scale + fast reads needed. Global Tables = multi-region active-active. NOT for complex SQL queries with JOINs (use RDS/Aurora for that). Key exam phrases: 'flexible schema', 'single-digit millisecond', 'auto-scale', 'no SQL'." color="#6a1b9a" />
      </div>
    );

    case "elasticache": return (
      <div>
        <Body>
          Amazon ElastiCache puts an <b>in-memory cache layer</b> between your application and database.
          Instead of hitting the database for the same popular data repeatedly,
          the cache serves it from RAM — delivering results in <b>microseconds</b> instead of milliseconds.
        </Body>

        {/* Architecture diagram matching screenshot */}
        <H2>📐 How ElastiCache Fits in Your Architecture</H2>
        <div style={{ background: "#1a1a2e", borderRadius: 12, padding: 16, marginTop: 8, border: "2px solid #0f9d58" }}>
          <div style={{ fontWeight: 700, fontSize: 12, color: "#81C784", marginBottom: 14, textAlign: "center" }}>
            Users → App (EC2) → ElastiCache (fast path) → RDS (slow path only on cache miss)
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
            {/* Users */}
            <div style={{ textAlign: "center" }}>
              <div style={{ background: "#546e7a20", border: "2px solid #90a4ae", borderRadius: 10, padding: "12px 14px" }}>
                <div style={{ fontSize: 26 }}>👥</div>
                <div style={{ fontSize: 11, color: "#90a4ae", fontWeight: 700, marginTop: 4 }}>Users</div>
              </div>
            </div>
            <div style={{ color: "#546e7a", fontSize: 18 }}>→</div>
            {/* App / EC2 */}
            <div style={{ textAlign: "center" }}>
              <div style={{ background: "#FF990025", border: "2px solid #FF9900", borderRadius: 10, padding: "12px 14px" }}>
                <div style={{ fontSize: 26 }}>🖥️</div>
                <div style={{ fontSize: 11, color: "#FF9900", fontWeight: 700, marginTop: 4 }}>Application</div>
                <div style={{ fontSize: 9, color: "#888" }}>Amazon EC2</div>
              </div>
            </div>
            {/* Two arrows from EC2 */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 40, height: 2, background: "#0f9d58", borderTop: "2px dashed #0f9d58" }} />
                <div style={{ fontSize: 8, color: "#0f9d58", fontWeight: 700, minWidth: 80, textAlign: "center" }}>1. Check cache first</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 40, height: 2, background: "#9c27b0" }} />
                <div style={{ fontSize: 8, color: "#9c27b0", fontWeight: 700, minWidth: 80, textAlign: "center" }}>2. Only on miss → DB</div>
              </div>
            </div>
            {/* ElastiCache + RDS stacked */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10, alignItems: "center" }}>
              {/* ElastiCache top - cache hit path */}
              <div style={{ textAlign: "center" }}>
                <div style={{ background: "#0f9d5825", border: "2px dashed #4caf50", borderRadius: 10, padding: "10px 14px" }}>
                  <div style={{ fontSize: 24 }}>⚡</div>
                  <div style={{ fontSize: 11, color: "#4caf50", fontWeight: 700, marginTop: 2 }}>Amazon</div>
                  <div style={{ fontSize: 11, color: "#4caf50", fontWeight: 700 }}>ElastiCache</div>
                  <div style={{ fontSize: 9, color: "#888", marginTop: 2 }}>Redis / Memcached</div>
                  <div style={{ fontSize: 9, color: "#4caf50", fontWeight: 700 }}>~microseconds ⚡</div>
                </div>
                <div style={{ fontSize: 8, color: "#0f9d58", marginTop: 4 }}>→ cache hit: return fast</div>
              </div>
              <div style={{ width: 2, height: 12, background: "#9c27b060" }} />
              {/* RDS bottom - cache miss path */}
              <div style={{ textAlign: "center" }}>
                <div style={{ background: "#9c27b025", border: "2px solid #9c27b0", borderRadius: 10, padding: "10px 14px" }}>
                  <div style={{ fontSize: 24 }}>🗃️</div>
                  <div style={{ fontSize: 11, color: "#ce93d8", fontWeight: 700, marginTop: 2 }}>Amazon</div>
                  <div style={{ fontSize: 11, color: "#ce93d8", fontWeight: 700 }}>RDS</div>
                  <div style={{ fontSize: 9, color: "#888", marginTop: 2 }}>MySQL / PostgreSQL</div>
                  <div style={{ fontSize: 9, color: "#ce93d8", fontWeight: 700 }}>~milliseconds</div>
                </div>
                <div style={{ fontSize: 8, color: "#9c27b0", marginTop: 4 }}>→ fetches, then caches result</div>
              </div>
            </div>
          </div>
          <div style={{ marginTop: 12, background: "rgba(255,255,255,0.05)", borderRadius: 8, padding: "10px 14px", fontSize: 11.5, color: "rgba(255,255,255,0.7)", lineHeight: 1.65 }}>
            <b style={{ color: "#4caf50" }}>Cache HIT:</b> ElastiCache has the data → return in microseconds → never touch RDS<br />
            <b style={{ color: "#9c27b0" }}>Cache MISS:</b> ElastiCache doesn't have it → fetch from RDS → store in cache → future requests are fast
          </div>
        </div>

        {/* ElastiCache = managed service explanation */}
        <H2>🔑 ElastiCache, Redis, and Memcached — How They Relate</H2>
        <div style={{ background: "#1a1a2e", borderRadius: 10, padding: "14px 16px", marginTop: 6, border: "1px solid #0f9d5840" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 12 }}>
            {[
              { icon: "🍽️", title: "ElastiCache", subtitle: "The Restaurant", desc: "The managed AWS service. Handles provisioning, patching, scaling. You choose your 'kitchen' inside it.", color: "#0f9d58" },
              { icon: "👨‍🍳", title: "Redis", subtitle: "Full Kitchen with Many Tools", desc: "Rich data types, persistence, replication, pub/sub, sorted sets. Powerful — more than just a cache.", color: "#d32f2f" },
              { icon: "🍔", title: "Memcached", subtitle: "Fast Snack Counter", desc: "Pure key-value caching. Extremely simple and fast. No persistence, no complex data types.", color: "#FF9900" },
            ].map(({ icon, title, subtitle, desc, color }) => (
              <div key={title} style={{ background: color + "15", border: `1px solid ${color}40`, borderRadius: 9, padding: "10px 11px", textAlign: "center" }}>
                <div style={{ fontSize: 28, marginBottom: 5 }}>{icon}</div>
                <div style={{ fontWeight: 700, fontSize: 12, color, marginBottom: 2 }}>{title}</div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", marginBottom: 6 }}>{subtitle}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", lineHeight: 1.4 }}>{desc}</div>
              </div>
            ))}
          </div>
          <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 8, padding: "9px 12px", fontSize: 12, color: "rgba(255,255,255,0.8)", textAlign: "center" }}>
            <b style={{ color: "#0f9d58" }}>ElastiCache</b> = managed service wrapper &nbsp;|&nbsp;
            <b style={{ color: "#d32f2f" }}>Redis</b> = powerful in-memory data store inside it &nbsp;|&nbsp;
            <b style={{ color: "#FF9900" }}>Memcached</b> = simple fast cache inside it
          </div>
        </div>

        {/* Redis vs Memcached table */}
        <H2>⚖️ Redis vs Memcached — Which Engine?</H2>
        <div style={{ borderRadius: 8, overflow: "hidden", border: "1px solid #e0e0e0", marginTop: 6 }}>
          {[
            ["Feature", "Redis / Valkey", "Memcached"],
            ["Data types", "Rich: strings, lists, sets, sorted sets, hashes, streams", "Simple key-value only"],
            ["Persistence", "✅ Yes — data survives restarts", "❌ No — data lost on restart"],
            ["Replication", "✅ Multi-AZ failover available", "❌ No built-in replication"],
            ["Performance", "Very fast (sub-ms)", "Very fast (sub-ms)"],
            ["Pub/Sub", "✅ Messaging built in", "❌ Not supported"],
            ["Complexity", "More features, slightly more complex", "Simpler setup and management"],
            ["Use for", "Sessions, leaderboards, queues, real-time", "Simple read caching only"],
            ["Choose when", "You need more than caching", "You need pure, simple caching"],
          ].map((row, i) => (
            <div key={i} style={{
              display: "grid", gridTemplateColumns: "1fr 1.4fr 1.4fr",
              borderBottom: i < 8 ? "1px solid #f0f0f0" : "none",
              background: i === 0 ? "#263238" : i % 2 === 0 ? "#fafafa" : "white",
            }}>
              {row.map((cell, j) => (
                <div key={j} style={{
                  padding: "8px 10px", fontSize: i === 0 ? 11 : 12,
                  fontWeight: i === 0 || j === 0 ? 700 : 400,
                  color: i === 0 ? accent : j === 0 ? "#333" : j === 1 ? "#d32f2f" : "#FF9900",
                  borderRight: j < 2 ? "1px solid #f0f0f0" : "none",
                  lineHeight: 1.45,
                }}>{cell}</div>
              ))}
            </div>
          ))}
        </div>

        <H2>🎯 Real-World Examples</H2>
        <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 6 }}>
          {[
            { industry: "🛒 E-Commerce — Product Catalogue", color: "#0f9d58",
              problem: "50,000 users browsing the same top products. Every page view hits RDS 8 times. DB CPU at 95%.",
              solution: "Cache product data in ElastiCache Redis with 1hr TTL. 95% of requests served from cache in <1ms. DB CPU drops to 15%. Page load: 4s → 0.2s." },
            { industry: "🎮 Gaming — Real-Time Leaderboard", color: "#d32f2f",
              problem: "5M players updating scores every second. Leaderboard query from RDS takes 800ms. Players see stale data.",
              solution: "Redis Sorted Sets in ElastiCache. Each score update: O(log n) insert. Leaderboard query: instant. 800ms → 0.3ms. Handles 100K updates/second." },
            { industry: "🔐 Web App — Session Storage", color: "#FF9900",
              problem: "User logs in. Session data (cart, auth token) stored in DB. Every page request = DB hit. 10M sessions = overloaded DB.",
              solution: "Store sessions in ElastiCache. All reads: microsecond RAM lookup. 10× reduction in DB load. Scales to hundreds of millions of sessions." },
          ].map(({ industry, color, problem, solution }) => (
            <div key={industry} style={{ border: `1px solid ${color}25`, borderLeft: `4px solid ${color}`, borderRadius: 9, padding: "11px 14px" }}>
              <div style={{ fontWeight: 700, fontSize: 13, color, marginBottom: 8 }}>{industry}</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                <div style={{ background: "#fce4ec", borderRadius: 7, padding: "8px 10px" }}>
                  <div style={{ fontWeight: 700, fontSize: 10.5, color: "#d32f2f", marginBottom: 3 }}>❌ Problem</div>
                  <div style={{ fontSize: 12, color: "#555", lineHeight: 1.5 }}>{problem}</div>
                </div>
                <div style={{ background: "#e8f5e9", borderRadius: 7, padding: "8px 10px" }}>
                  <div style={{ fontWeight: 700, fontSize: 10.5, color: "#0f9d58", marginBottom: 3 }}>✅ With ElastiCache</div>
                  <div style={{ fontSize: 12, color: "#555", lineHeight: 1.5 }}>{solution}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Callout icon="🎯" label="Exam Tip"
          text="ElastiCache = managed in-memory caching service (the service layer). Redis = feature-rich: persistence, sorted sets, pub/sub, replication (choose for leaderboards, sessions, queues). Memcached = simple pure cache, multi-threaded, no persistence (choose for simple read caching). ElastiCache sits BETWEEN app and database — reduces DB load." color="#0f9d58" />
      </div>
    );

    case "compare": return (
      <div>
        <Body>
          Given a scenario on the exam, you need to pick the right database service.
          Here are the course scenarios plus a complete decision guide.
        </Body>

        <H2>The 4 Questions to Pick the Right Database</H2>
        <div style={{ background: "#263238", borderRadius: 10, padding: "14px", marginTop: 8 }}>
          {[
            { q: "Does your data have relationships needing SQL JOINs?", yes: "RDS or Aurora", no: "Consider DynamoDB", color: "#0f9d58" },
            { q: "Need maximum performance (5× MySQL, 200K IOPS)?", yes: "Amazon Aurora", no: "Standard RDS is fine", color: "#FF9900" },
            { q: "Need flexible schema and auto-scale to millions req/sec?", yes: "Amazon DynamoDB", no: "RDS or Aurora", color: "#6a1b9a" },
            { q: "Same data read repeatedly — need microsecond response?", yes: "Add ElastiCache in front", no: "RDS or DynamoDB alone", color: "#d32f2f" },
          ].map(({ q, yes, no, color }) => (
            <div key={q} style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap", marginBottom: 7 }}>
              <div style={{ flex: "1 1 220px", fontSize: 12.5, color: "rgba(255,255,255,0.85)", background: "rgba(255,255,255,0.06)", borderRadius: 7, padding: "8px 12px" }}>❓ {q}</div>
              <div style={{ display: "flex", gap: 6 }}>
                <div style={{ background: "#0f9d5825", border: "1px solid #4caf5050", borderRadius: 6, padding: "5px 10px", fontSize: 11, color: "#4caf50", fontWeight: 700 }}>YES → {yes}</div>
                <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 6, padding: "5px 10px", fontSize: 11, color: "#888" }}>NO → {no}</div>
              </div>
            </div>
          ))}
        </div>

        <H2>3 Course Scenarios</H2>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 6 }}>
          {[
            { scenario: "Scenario 1: Coffee Shop Loyalty Program", icon: "🏆", color: "#0f9d58",
              desc: "Track customers, their orders, and reward points. When a customer orders the same drink 5 times, send a discount.",
              answer: "Amazon RDS (MySQL or PostgreSQL)",
              reasons: ["Data has relationships — customer table linked to orders table","Need SQL JOINs to correlate purchases per customer","Structured schema — every customer record has same fields","ACID transactions ensure points credited correctly"],
              notThis: "NOT DynamoDB — needs JOINs between tables. NOT ElastiCache — not a primary DB." },
            { scenario: "Scenario 2: E-Commerce Product Catalog", icon: "🛒", color: "#FF9900",
              desc: "Millions of products. Different products have different attributes (clothing: size/color; electronics: voltage/watts). Traffic spikes on sale days.",
              answer: "Amazon DynamoDB",
              reasons: ["Flexible schema — each product type has different attributes","Millions of items, high read throughput needed","No complex JOINs — just get product by ID","Auto-scales instantly for Black Friday spikes"],
              notThis: "NOT RDS — rigid schema doesn't fit varying product attributes. NOT for complex analytics with JOINs." },
            { scenario: "Scenario 3: Caching Popular Coffee Menu", icon: "☕", color: "#d32f2f",
              desc: "Website menu loaded by 50,000 visitors per day. Menu changes once a week. Every visitor triggers the same DB query for the same 20 items.",
              answer: "Amazon ElastiCache (in front of RDS)",
              reasons: ["Same data (menu) queried thousands of times per day","Menu changes rarely — cache stays valid for days","RDS load drops from 50,000 queries to ~100 cache misses","Sub-millisecond response makes site feel instant"],
              notThis: "NOT a replacement for RDS — still need RDS for the actual menu data. ElastiCache = cache layer only." },
          ].map(({ scenario, icon, color, desc, answer, reasons, notThis }) => (
            <div key={scenario} style={{ border: `1px solid ${color}30`, borderRadius: 12, overflow: "hidden" }}>
              <div style={{ background: color, padding: "10px 14px" }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: "white" }}>{icon} {scenario}</div>
              </div>
              <div style={{ padding: "12px 14px", background: "white" }}>
                <div style={{ fontSize: 13, color: "#555", lineHeight: 1.65, marginBottom: 10 }}>{desc}</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  <div>
                    <div style={{ background: color + "15", border: `2px solid ${color}`, borderRadius: 8, padding: "8px 12px", marginBottom: 8 }}>
                      <div style={{ fontWeight: 800, fontSize: 13, color }}>Answer: {answer}</div>
                    </div>
                    {reasons.map(r => <div key={r} style={{ fontSize: 11.5, color: "#555", marginBottom: 3 }}>→ {r}</div>)}
                  </div>
                  <div style={{ background: "#fce4ec", borderRadius: 8, padding: "10px 12px" }}>
                    <div style={{ fontWeight: 700, fontSize: 11, color: "#d32f2f", marginBottom: 5 }}>Why NOT others?</div>
                    <div style={{ fontSize: 11.5, color: "#555", lineHeight: 1.6 }}>{notThis}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <H2>Complete Decision Table</H2>
        <Table rows={[
          ["If you need…","Use this","Key reason"],
          ["Complex SQL JOINs and relationships","Amazon RDS","Relational, SQL, structured schema"],
          ["Maximum SQL performance (5× MySQL)","Amazon Aurora","Cloud-native, 6 copies, auto-scales"],
          ["MySQL / PostgreSQL managed + easy","Amazon RDS","Familiar engines, automated backups"],
          ["Flexible schema + massive auto-scale","Amazon DynamoDB","NoSQL, serverless, auto-scale"],
          ["Gaming leaderboard in milliseconds","DynamoDB + ElastiCache (Redis)","Sub-ms / microsecond reads"],
          ["Session storage (cart, user state)","ElastiCache Redis + DynamoDB","Fast reads, auto-expiry TTL"],
          ["Reduce repeated database queries","ElastiCache (in front of DB)","In-memory cache, microsecond"],
          ["IoT time-series data at scale","Amazon DynamoDB","Partition: deviceId, Sort: timestamp"],
          ["ACID transactions for point-of-sale","Amazon RDS or Aurora","ACID guarantees, data integrity"],
          ["Multi-region active-active app","DynamoDB Global Tables","Multi-region replication"],
          ["Simple fast caching, multi-threaded","ElastiCache Memcached","Pure key-value, no persistence"],
          ["Advanced caching with pub/sub","ElastiCache Redis / Valkey","Sorted sets, persistence, pub/sub"],
        ]} cols="1.5fr 1fr 1.3fr" />

        <H2>All 4 Services — One Final Comparison</H2>
        <Table rows={[
          ["","RDS","Aurora","DynamoDB","ElastiCache"],
          ["Type","Relational SQL","Relational SQL","NoSQL key-value","In-Memory Cache"],
          ["Schema","Fixed/rigid","Fixed/rigid","Flexible","No schema (cache)"],
          ["Scale","Vertical","Auto-scales + replicas","Unlimited auto","Add nodes"],
          ["Performance","~30K IOPS","~200K IOPS","Single-digit ms","Microseconds"],
          ["Availability","Multi-AZ ~2min","6 copies, ~30sec","3 AZs, 99.999%","Multi-AZ replicas"],
          ["Best for","E-commerce, ERP","Gaming, media","IoT, carts, flexible","Caching sessions"],
        ]} cols="1fr 1fr 1fr 1fr 1fr" />

        <Callout icon="🎯" label="Final Exam Tip — 3 Rules"
          text="Rule 1: Need SQL JOINs and relationships → RDS (standard) or Aurora (high performance). Rule 2: Need flexible schema + auto-scale + single-digit ms → DynamoDB. Rule 3: Repeatedly reading same data and need microsecond speed → ElastiCache (IN FRONT of DB, not instead). Exam key phrases: 'structured relational' = RDS/Aurora. 'flexible schema' or 'key-value' = DynamoDB. 'in-memory' or 'caching' or 'reduce DB load' = ElastiCache." color={accent} />
      </div>
    );

    case "special": return (
      <div>
        <Body>
          Beyond RDS, Aurora, and DynamoDB, AWS offers <b>purpose-built databases</b> designed
          for very specific data shapes. No one-size-fits-all — use the right tool for the job.
        </Body>

        {/* Purpose-built overview grid */}
        <H2>🔬 AWS Purpose-Built Databases</H2>
        <div style={{ background: "#263238", borderRadius: 10, padding: "12px 14px", marginTop: 8 }}>
          <div style={{ fontWeight: 700, fontSize: 12, color: accent, marginBottom: 10 }}>
            💡 AWS Principle: Choose the database that fits your data — don't force your data to fit the database.
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
            {[
              { icon: "📄", name: "DocumentDB", color: "#FF9900", type: "Document DB", shape: "JSON documents with dynamic schemas", use: "Content management, user profiles, catalogs" },
              { icon: "🕸️", name: "Neptune", color: "#6a1b9a", type: "Graph DB", shape: "Nodes and edges (relationships)", use: "Social networks, fraud detection, recommendations" },
              { icon: "⏱️", name: "Timestream", color: "#0f9d58", type: "Time-Series DB", shape: "Timestamped data points over time", use: "IoT sensor data, app metrics, financial data" },
              { icon: "📒", name: "Managed Blockchain", color: "#1a73e8", type: "Blockchain", shape: "Immutable distributed ledger", use: "Supply chain tracking, financial compliance" },
              { icon: "💰", name: "Quantum Ledger DB (QLDB)", color: "#d32f2f", type: "Ledger DB", shape: "Append-only, cryptographically verified history", use: "Banking transactions, audit trails" },
              { icon: "⚡", name: "DynamoDB DAX", color: "#546e7a", type: "In-Memory Accelerator", shape: "Microsecond cache on top of DynamoDB", use: "When DynamoDB ms latency is still too slow" },
            ].map(({ icon, name, color, type, shape, use }) => (
              <div key={name} style={{ background: color + "18", border: `1px solid ${color}40`, borderRadius: 8, padding: "10px 10px" }}>
                <div style={{ fontSize: 20, marginBottom: 4 }}>{icon}</div>
                <div style={{ fontWeight: 700, fontSize: 11.5, color, marginBottom: 3 }}>{name}</div>
                <div style={{ fontSize: 9.5, color: "rgba(255,255,255,0.5)", marginBottom: 5 }}>{type}</div>
                <div style={{ fontSize: 10.5, color: "rgba(255,255,255,0.7)", lineHeight: 1.4, marginBottom: 4 }}><b style={{ color }}>Shape:</b> {shape}</div>
                <div style={{ fontSize: 10.5, color: "rgba(255,255,255,0.6)", lineHeight: 1.4 }}><b style={{ color }}>Use:</b> {use}</div>
              </div>
            ))}
          </div>
        </div>

        {/* DocumentDB Deep Dive */}
        <H2>📄 Amazon DocumentDB — Semi-Structured / JSON Data</H2>
        <div style={{ border: "1px solid #FF990030", borderRadius: 10, overflow: "hidden", marginTop: 6 }}>
          <div style={{ background: "#FF9900", padding: "10px 14px", display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 22 }}>📄</span>
            <div>
              <div style={{ fontWeight: 700, fontSize: 13, color: "white" }}>Amazon DocumentDB (with MongoDB compatibility)</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.85)" }}>For data with complex, varied attributes that don't fit neatly into tables</div>
            </div>
          </div>
          <div style={{ padding: "12px 14px", background: "white" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div>
                <div style={{ fontSize: 13, color: "#555", lineHeight: 1.65, marginBottom: 10 }}>
                  DocumentDB stores data as <b>JSON-like documents</b> instead of rows and columns.
                  Each document can have a completely different structure.
                  Compatible with MongoDB — existing MongoDB code works without changes.
                </div>
                <div style={{ background: "#1e1e1e", borderRadius: 8, padding: "10px 12px", fontFamily: "monospace" }}>
                  <div style={{ fontSize: 9, color: "#888", marginBottom: 6 }}>// DocumentDB document example</div>
                  <div style={{ fontSize: 10.5, color: "#4EC9B0" }}>{`{`}</div>
                  <div style={{ fontSize: 10.5, color: "#CE9178", marginLeft: 12 }}>{`"user_id": "u_001",`}</div>
                  <div style={{ fontSize: 10.5, color: "#CE9178", marginLeft: 12 }}>{`"name": "Sarah Kim",`}</div>
                  <div style={{ fontSize: 10.5, color: "#CE9178", marginLeft: 12 }}>{`"preferences": {`}</div>
                  <div style={{ fontSize: 10.5, color: "#CE9178", marginLeft: 24 }}>{`"theme": "dark",`}</div>
                  <div style={{ fontSize: 10.5, color: "#CE9178", marginLeft: 24 }}>{`"language": "en",`}</div>
                  <div style={{ fontSize: 10.5, color: "#CE9178", marginLeft: 24 }}>{`"notifications": ["email","push"]`}</div>
                  <div style={{ fontSize: 10.5, color: "#CE9178", marginLeft: 12 }}>{`},`}</div>
                  <div style={{ fontSize: 10.5, color: "#CE9178", marginLeft: 12 }}>{`"orders": [101, 205, 312],`}</div>
                  <div style={{ fontSize: 10.5, color: "#CE9178", marginLeft: 12 }}>{`"loyalty_tier": "Gold"`}</div>
                  <div style={{ fontSize: 10.5, color: "#4EC9B0" }}>{`}`}</div>
                </div>
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 11, color: "#CC7A00", marginBottom: 6 }}>✅ Key Features</div>
                <KV rows={[
                  ["MongoDB compat.", "Use existing MongoDB drivers, tools, and code with zero changes", "#FF9900"],
                  ["Auto-scale", "Storage grows automatically to 64TB in 10GB increments", "#0f9d58"],
                  ["Read replicas", "Up to 15 replicas for high read throughput", "#1a73e8"],
                  ["Flexible schema", "Iterate rapidly — add/remove fields without schema migrations", "#6a1b9a"],
                ]} />
                <div style={{ marginTop: 10, background: "#FFF3E0", borderRadius: 8, padding: "9px 12px" }}>
                  <div style={{ fontWeight: 700, fontSize: 11, color: "#CC7A00", marginBottom: 4 }}>🎯 Real Example</div>
                  <div style={{ fontSize: 12, color: "#555", lineHeight: 1.55 }}>
                    A streaming platform stores user profiles in DocumentDB.
                    Each user has different watch history, preferences, and subscription details —
                    a rigid RDS table would need dozens of columns, most empty.
                    DocumentDB stores each profile as one rich JSON document. Schema changes take seconds.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Neptune Deep Dive */}
        <H2>🕸️ Amazon Neptune — Graph Database</H2>
        <div style={{ border: "1px solid #6a1b9a30", borderRadius: 10, overflow: "hidden", marginTop: 6 }}>
          <div style={{ background: "#6a1b9a", padding: "10px 14px", display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 22 }}>🕸️</span>
            <div>
              <div style={{ fontWeight: 700, fontSize: 13, color: "white" }}>Amazon Neptune</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.85)" }}>For highly connected data — relationships are the data</div>
            </div>
          </div>
          <div style={{ padding: "12px 14px", background: "white" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div>
                <div style={{ fontSize: 13, color: "#555", lineHeight: 1.65, marginBottom: 8 }}>
                  Neptune stores data as <b>nodes (entities) and edges (relationships)</b>.
                  It answers questions like <em>"Who knows who?"</em> or <em>"What products do people who bought X also buy?"</em>
                  — queries that are painfully slow in relational databases.
                </div>
                {/* Graph diagram */}
                <div style={{ background: "#1a1a2e", borderRadius: 9, padding: "12px", border: "1px solid #9c27b040" }}>
                  <div style={{ fontSize: 10, color: "#ce93d8", fontWeight: 700, marginBottom: 8, textAlign: "center" }}>Social Network Graph</div>
                  <div style={{ position: "relative", height: 100, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ display: "flex", gap: 20, alignItems: "center", flexWrap: "wrap", justifyContent: "center" }}>
                      {[
                        { label: "Alice", connects: ["Bob", "Carol"] },
                        { label: "Bob", connects: [] },
                        { label: "Carol", connects: ["Dave"] },
                        { label: "Dave", connects: [] },
                      ].map(({ label }) => (
                        <div key={label} style={{ background: "#9c27b030", border: "2px solid #9c27b0", borderRadius: "50%", width: 38, height: 38, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9.5, color: "#ce93d8", fontWeight: 700 }}>{label}</div>
                      ))}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginTop: 4 }}>
                    {["Alice → KNOWS → Bob", "Alice → KNOWS → Carol", "Carol → KNOWS → Dave"].map(rel => (
                      <span key={rel} style={{ fontSize: 9, color: "#888", background: "#ffffff10", borderRadius: 10, padding: "2px 8px" }}>{rel}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 11, color: "#6a1b9a", marginBottom: 6 }}>✅ Key Facts</div>
                <KV rows={[
                  ["Data model", "Nodes (entities) + Edges (relationships) + Properties", "#6a1b9a"],
                  ["Performance", "Billions of relationships in milliseconds", "#0f9d58"],
                  ["Auto-scale", "Storage grows to 64TB automatically", "#FF9900"],
                  ["High availability", "Automatic failover + backups", "#1a73e8"],
                ]} />
                <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 5 }}>
                  <div style={{ fontWeight: 700, fontSize: 11, color: "#6a1b9a", marginBottom: 3 }}>🎯 Best Use Cases:</div>
                  {[
                    "Social networks — map connections, mutual friends",
                    "Fraud detection — suspicious connection patterns",
                    "Product recommendations — 'people who bought X...'",
                    "Knowledge graphs — connecting concepts and entities",
                  ].map(u => (
                    <div key={u} style={{ fontSize: 12, color: "#555", paddingLeft: 8, borderLeft: "2px solid #9c27b040" }}>• {u}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* DynamoDB DAX */}
        <H2>⚡ DynamoDB Accelerator (DAX) — Microsecond Caching</H2>
        <div style={{ background: "#f9f9f9", borderRadius: 10, padding: "14px", border: "1px solid #e0e0e0", marginTop: 6 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <div style={{ fontSize: 13, color: "#555", lineHeight: 1.65 }}>
                DAX is a <b>built-in in-memory cache</b> designed specifically for DynamoDB.
                It reduces read latency from single-digit milliseconds to <b>microseconds</b>
                — that's up to 10× faster — with no application code changes.
              </div>
              <div style={{ marginTop: 10, background: "#1a1a2e", borderRadius: 8, padding: "12px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
                  {[
                    { icon: "🖥️", label: "App" },
                    { icon: "→", arrow: true },
                    { icon: "⚡", label: "DAX(μs)" },
                    { icon: "→", arrow: true },
                    { icon: "🚀", label: "DynamoDB(ms)" },
                  ].map(({ icon, label, arrow }, i) => (
                    arrow
                      ? <div key={i} style={{ color: "#546e7a", fontSize: 14 }}>{icon}</div>
                      : <div key={i} style={{ textAlign: "center", background: "#546e7a20", border: "1px solid #546e7a50", borderRadius: 7, padding: "6px 9px" }}>
                          <div style={{ fontSize: 16 }}>{icon}</div>
                          {label.split("").map((l, j) => <div key={j} style={{ fontSize: 9, color: "#90a4ae" }}>{l}</div>)}
                        </div>
                  ))}
                </div>
                <div style={{ marginTop: 8, fontSize: 10.5, color: "rgba(255,255,255,0.6)", textAlign: "center" }}>
                  DAX checks its cache first. Cache hit = microseconds. Cache miss = DynamoDB (ms) then caches result.
                </div>
              </div>
            </div>
            <div>
              <KV rows={[
                ["Latency", "Milliseconds → Microseconds (up to 10× faster)", "#546e7a"],
                ["Code change?", "None — DAX is API-compatible with DynamoDB", "#0f9d58"],
                ["Use when", "DynamoDB reads are a bottleneck. Read-heavy workloads.", "#FF9900"],
                ["NOT for", "Write-heavy workloads — DAX accelerates reads only", "#d32f2f"],
              ]} />
              <div style={{ marginTop: 8, background: "#f5f5f5", borderRadius: 7, padding: "8px 10px" }}>
                <div style={{ fontWeight: 700, fontSize: 11, color: "#546e7a", marginBottom: 3 }}>💡 DAX vs ElastiCache</div>
                <div style={{ fontSize: 12, color: "#555", lineHeight: 1.55 }}>
                  <b>DAX</b> = cache for DynamoDB only. Auto-integrates. API-compatible.<br />
                  <b>ElastiCache</b> = general cache for RDS, custom apps, any data source.
                </div>
              </div>
            </div>
          </div>
        </div>

        <Callout icon="🎯" label="Exam Tip"
          text="DocumentDB = MongoDB-compatible, semi-structured JSON documents. Neptune = graph DB for relationship data (social networks, fraud detection). DAX = microsecond cache for DynamoDB (reads only, no code change). Timestream = time-series data. QLDB = immutable ledger (banking audit trails). AWS principle: purpose-built databases — use the right tool for the data shape." color="#FF9900" />
      </div>
    );

    case "backup": return (
      <div>
        <Body>
          AWS Backup provides a <b>single centralised service</b> to manage backups across all your
          AWS resources — EBS volumes, RDS databases, DynamoDB tables, EFS file systems,
          and even on-premises servers — from one dashboard.
        </Body>

        {/* The problem it solves */}
        <H2>🧩 The Problem AWS Backup Solves</H2>
        <div style={{ background: "#1a1a2e", borderRadius: 12, padding: 16, marginTop: 8, border: "2px solid #546e7a" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div style={{ background: "#d32f2f15", border: "2px solid #d32f2f", borderRadius: 10, padding: 12 }}>
              <div style={{ fontWeight: 700, fontSize: 12, color: "#ef9a9a", marginBottom: 8 }}>❌ Without AWS Backup</div>
              {[
                ["EBS volumes", "Amazon Data Lifecycle Manager (DLM)"],
                ["RDS databases", "RDS automated backups + snapshots"],
                ["DynamoDB tables", "DynamoDB on-demand backups"],
                ["EFS file systems", "EFS lifecycle policies"],
                ["EC2 instances", "AWS Backup or AMIs"],
                ["On-premises servers", "Third-party tools"],
              ].map(([resource, tool]) => (
                <div key={resource} style={{ display: "flex", justifyContent: "space-between", fontSize: 10.5, color: "rgba(255,255,255,0.6)", marginBottom: 4, padding: "3px 0", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                  <span style={{ color: "#ef9a9a" }}>{resource}</span>
                  <span style={{ color: "#888" }}>→ {tool}</span>
                </div>
              ))}
              <div style={{ marginTop: 6, fontSize: 10.5, color: "#d32f2f", fontWeight: 700 }}>6 different backup systems to manage!</div>
            </div>
            <div style={{ background: "#546e7a15", border: "2px solid #90a4ae", borderRadius: 10, padding: 12 }}>
              <div style={{ fontWeight: 700, fontSize: 12, color: "#90a4ae", marginBottom: 8 }}>✅ With AWS Backup</div>
              <div style={{ background: "#546e7a30", border: "1px solid #90a4ae50", borderRadius: 8, padding: 10, textAlign: "center", marginBottom: 8 }}>
                <div style={{ fontSize: 22, marginBottom: 4 }}>🛡️</div>
                <div style={{ fontWeight: 700, fontSize: 11, color: "#90a4ae" }}>AWS Backup</div>
                <div style={{ fontSize: 9, color: "#888" }}>One dashboard, one policy</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {["EBS volumes", "RDS databases", "DynamoDB tables", "EFS file systems", "EC2 instances", "On-premises (via Storage Gateway)"].map(r => (
                  <div key={r} style={{ display: "flex", gap: 6, fontSize: 10.5, color: "rgba(255,255,255,0.7)" }}>
                    <span style={{ color: "#4caf50" }}>✓</span>{r}
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 6, fontSize: 10.5, color: "#4caf50", fontWeight: 700 }}>1 centralised backup system ✅</div>
            </div>
          </div>
        </div>

        <H2>AWS Backup — Key Features</H2>
        <KV rows={[
          ["Centralised", "Single dashboard to monitor, manage, and restore backups across all services and accounts.", "#546e7a"],
          ["Automated schedules", "Set policies once — AWS Backup automatically protects new resources as they're created.", "#0f9d58"],
          ["Cross-region", "Replicate backups to another AWS Region automatically for disaster recovery.", "#1a73e8"],
          ["Encryption", "Backups encrypted at rest and in transit. Integrated with AWS KMS.", "#d32f2f"],
          ["Compliance reports", "Detailed audit logs. Prove backup policies are being followed for regulatory compliance.", "#FF9900"],
          ["On-premises too", "Back up servers outside AWS (via Storage Gateway) — same dashboard.", "#6a1b9a"],
        ]} />

        <H2>🎯 Real-World Example — Healthcare System</H2>
        <div style={{ background: "#e8f5e9", borderRadius: 10, padding: "14px", border: "1px solid #4caf5040", marginTop: 6 }}>
          <div style={{ fontWeight: 700, fontSize: 13, color: "#2e7d32", marginBottom: 8 }}>🏥 Hospital IT — Patient Records Backup Strategy</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 11, color: "#2e7d32", marginBottom: 5 }}>What needs backing up:</div>
              {[
                "RDS (patient records database)",
                "DynamoDB (appointment scheduling)",
                "EBS volumes (imaging server drives)",
                "EFS (shared radiology files)",
                "On-premises servers (legacy systems)",
              ].map(i => <div key={i} style={{ fontSize: 12, color: "#555", marginBottom: 3 }}>📁 {i}</div>)}
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 11, color: "#2e7d32", marginBottom: 5 }}>AWS Backup policy:</div>
              {[
                "Daily backup — all resources — 35-day retention",
                "Weekly cross-region backup to eu-west-1",
                "Encrypted with hospital-managed KMS key",
                "Compliance report generated monthly",
                "New resources protected automatically",
              ].map(i => <div key={i} style={{ fontSize: 12, color: "#555", marginBottom: 3 }}>✅ {i}</div>)}
            </div>
          </div>
          <div style={{ marginTop: 10, background: "#2e7d3215", borderRadius: 7, padding: "8px 12px", fontSize: 12, color: "#2e7d32", fontWeight: 600 }}>
            Result: One IT administrator manages all backup compliance from a single dashboard.
            No more 6 separate tools, no missed resources, no audit failures.
          </div>
        </div>

        <Callout icon="🎯" label="Exam Tip"
          text="AWS Backup = centralised backup management across EBS, EFS, RDS, DynamoDB, EC2, and on-premises. Single dashboard, automated policies, cross-region replication. Eliminates managing separate backup tools for each service. Audit logs for compliance. Key benefit: consistency and reduced complexity." color="#546e7a" />
      </div>
    );

    default: return null;
  }
}

const cheatRows = [
  ["Relational DB","Structured tables, SQL, JOINs, fixed schema, ACID transactions."],
  ["NoSQL DB","Flexible schema, key-value, no JOINs, massive scale, fast."],
  ["Amazon RDS","Managed relational DB. AWS handles OS, patches, backups. You: schema + security."],
  ["RDS Engines","MySQL, PostgreSQL, SQL Server, Oracle, MariaDB, Aurora."],
  ["Multi-AZ","Standby replica in different AZ. Auto failover ~2 min. HA."],
  ["Read Replicas","Offload reads. Up to 15. Cross-region possible."],
  ["Amazon Aurora","Cloud-native MySQL/PostgreSQL. 5x MySQL. 6 copies/3 AZs. 128TB auto. 15 replicas."],
  ["Aurora failover","~30 sec. Continuous backup to S3. Up to 200K IOPS."],
  ["Amazon DynamoDB","Serverless NoSQL. Flexible schema. Single-digit ms. Auto-scales."],
  ["DynamoDB Prime Day","146 million req/sec. Zero maintenance. Zero downtime."],
  ["DynamoDB Global","Multi-region active-active replication."],
  ["Amazon ElastiCache","In-memory cache. NOT a DB. Sits in front of RDS/DynamoDB."],
  ["Redis","Persistence, sorted sets, pub/sub, replication. Advanced."],
  ["Memcached","Simple key-value, multi-threaded, no persistence."],
  ["Cache hit","Found in ElastiCache → returned in <1ms. No DB query."],
  ["Cache miss","Not in cache → query DB → store in cache for next time."],
];

export default function Module7() {
  const [active, setActive] = useState("intro");
  const [showCheat, setShowCheat] = useState(false);
  const sec = sections.find(s => s.id === active);

  return (
    <div style={{ fontFamily: "system-ui, -apple-system, sans-serif", maxWidth: 800, margin: "0 auto", padding: "0.5rem" }}>
      <div style={{ background: "#f5f5f5", border: "1px solid #e0e0e0", borderRadius: 12, padding: "14px 16px", marginBottom: 12, display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 42, height: 42, borderRadius: 10, background: "#0f9d5820", border: "1.5px solid #0f9d5850", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>🗃️</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, fontSize: 15 }}>Module 7 — AWS Databases</div>
          <div style={{ fontSize: 12, color: "#666", marginTop: 2 }}>RDS · Aurora · DynamoDB · ElastiCache · SQL vs NoSQL</div>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          <Badge text="CLF-C02" color={accent} />
          <button onClick={() => setShowCheat(v => !v)} style={{ padding: "4px 10px", fontSize: 11, borderRadius: 16, border: `1px solid ${showCheat ? accent : "#e0e0e0"}`, background: showCheat ? accent + "18" : "white", color: showCheat ? accentDark : "#666", cursor: "pointer", fontWeight: 600 }}>⚡ Cheat Sheet</button>
        </div>
      </div>

      {showCheat && (
        <div style={{ border: "1px solid #e0e0e0", borderRadius: 10, overflow: "hidden", marginBottom: 12 }}>
          <div style={{ background: "#263238", padding: "8px 14px" }}>
            <span style={{ fontWeight: 700, fontSize: 12, color: accent }}>Module 7 Quick-Recall Cheat Sheet</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", background: "white" }}>
            {cheatRows.map(([k, v], i) => (
              <div key={i} style={{ display: "flex", gap: 6, padding: "5px 12px", borderBottom: i < cheatRows.length - 2 ? "1px solid #f0f0f0" : "none", borderRight: i % 2 === 0 ? "1px solid #f0f0f0" : "none", background: Math.floor(i / 2) % 2 === 0 ? "white" : "#fafafa" }}>
                <span style={{ fontWeight: 700, fontSize: 10.5, color: accent, flexShrink: 0, minWidth: 130 }}>{k}</span>
                <span style={{ fontSize: 10.5, color: "#555", lineHeight: 1.4 }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 12 }}>
        {sections.map(s => (
          <button key={s.id} onClick={() => setActive(s.id)} style={{ padding: "6px 12px", fontSize: 11.5, fontWeight: active === s.id ? 700 : 400, borderRadius: 18, border: active === s.id ? `1.5px solid ${s.badgeColor}` : "1px solid #e0e0e0", background: active === s.id ? s.badgeColor + "18" : "white", color: active === s.id ? s.badgeColor : "#666", cursor: "pointer", transition: "all 0.12s" }}>
            {s.emoji} {s.title}
          </button>
        ))}
      </div>

      <div style={{ background: "white", border: "1px solid #e0e0e0", borderRadius: 12, padding: "18px 18px 28px" }}>
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