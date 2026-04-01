import { useState } from "react";

const accent = "#FF9900";
const accentDark = "#CC7A00";

// ─── Helpers ────────────────────────────────────────────────────────────────
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

// ─── Section definitions ────────────────────────────────────────────────────
const sections = [
  { id: "intro", emoji: "🗄️", title: "Storage Overview", badge: "Block · Object · File", badgeColor: "#1a73e8" },
  { id: "instance-store", emoji: "⚡", title: "EC2 Instance Store", badge: "Temporary Storage", badgeColor: "#d32f2f" },
  { id: "ebs", emoji: "💾", title: "Amazon EBS", badge: "Persistent Block Storage", badgeColor: "#0f9d58" },
  { id: "snapshots", emoji: "📸", title: "EBS Snapshots", badge: "Backup & Lifecycle", badgeColor: "#6a1b9a" },
  { id: "s3", emoji: "🪣", title: "Amazon S3", badge: "Object Storage", badgeColor: "#FF9900" },
  { id: "s3-classes", emoji: "📊", title: "S3 Storage Classes", badge: "9 Classes + Lifecycle", badgeColor: "#1a73e8" },
  { id: "s3-security", emoji: "🔐", title: "S3 Security", badge: "Policies · Encryption · Access", badgeColor: "#d32f2f" },
  { id: "efs", emoji: "📁", title: "Amazon EFS", badge: "Shared File Storage", badgeColor: "#0f9d58" },
  { id: "fsx", emoji: "🪟", title: "Amazon FSx", badge: "4 File Systems", badgeColor: "#0078d4" },
  { id: "gateway", emoji: "🌉", title: "Storage Gateway", badge: "Hybrid Cloud Bridge", badgeColor: "#546e7a" },
  { id: "disaster", emoji: "🛡️", title: "Elastic Disaster Recovery", badge: "DR & Business Continuity", badgeColor: "#d32f2f" },
  { id: "compare", emoji: "⚖️", title: "When to Use Which?", badge: "Real-World Decision Guide", badgeColor: "#FF9900" },
];

function SectionContent({ id }) {
  switch (id) {

    // ── STORAGE OVERVIEW ─────────────────────────────────────────────────────
    case "intro": return (
      <div>
        <Body>
          Not all data is the same — and AWS gives you the right storage type for each job.
          A video file, a database row, and a shared training manual all need different storage.
          AWS organizes storage into <b>three main categories</b>.
        </Body>

        {/* Coffee shop analogy */}
        <div style={{ background: "#263238", borderRadius: 10, padding: "14px 16px", marginTop: 10 }}>
          <div style={{ fontWeight: 700, fontSize: 12, color: accent, marginBottom: 10 }}>☕ Coffee Shop Analogy — Organizing the Shop</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
            {[
              { icon: "📦", item: "Airtight containers\nfor coffee beans", analog: "Block Storage\n(fast, updatable)", color: "#0f9d58", desc: "For apps needing fast, frequent updates" },
              { icon: "🗄️", item: "Filing cabinet\nfor paperwork", analog: "Object Storage\n(whole files)", color: "#FF9900", desc: "For documents, images, videos" },
              { icon: "🔒", item: "Locked safe\nfor recipes", analog: "File Storage\n(shared access)", color: "#6a1b9a", desc: "For shared team documents" },
            ].map(({ icon, item, analog, color, desc }) => (
              <div key={icon} style={{ background: color + "18", border: `1px solid ${color}35`, borderRadius: 9, padding: "10px 10px", textAlign: "center" }}>
                <div style={{ fontSize: 26, marginBottom: 6 }}>{icon}</div>
                <div style={{ fontSize: 10.5, color: "rgba(255,255,255,0.7)", lineHeight: 1.4, marginBottom: 6 }}>{item.split("\n").map((l, i) => <div key={i}>{l}</div>)}</div>
                <div style={{ fontWeight: 700, fontSize: 11, color, marginBottom: 4 }}>{analog.split("\n").map((l, i) => <div key={i}>{l}</div>)}</div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.5)" }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>

        <H2>The 3 Storage Categories</H2>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 6 }}>
          {[
            {
              type: "🧱 Block Storage", color: "#0f9d58",
              what: "Breaks data into small blocks. Only the changed block gets rewritten — not the whole file. Like a hard drive.",
              why: "Fast, low-latency. Perfect for databases, OS volumes, apps needing frequent small updates.",
              services: ["Amazon EC2 Instance Store (temporary)", "Amazon EBS (persistent)"],
              analogy: "Like editing one sentence in a Word doc — only that paragraph changes, not the whole file.",
            },
            {
              type: "🪣 Object Storage", color: "#FF9900",
              what: "Data stored as complete objects (file + metadata + unique ID). Updating means rewriting the whole object.",
              why: "Unlimited scale. Great for files that don't change constantly — images, videos, backups, logs.",
              services: ["Amazon S3"],
              analogy: "Like replacing a photo in an album — you swap the whole photo, not patch individual pixels.",
            },
            {
              type: "📁 File Storage", color: "#6a1b9a",
              what: "Hierarchical file system (folders/files). Multiple users and apps can access the same data simultaneously over a network.",
              why: "Shared access. Compatible with most systems without code changes.",
              services: ["Amazon EFS (Linux/NFS)", "Amazon FSx (Windows/Lustre/NetApp)"],
              analogy: "Like a shared Google Drive — multiple team members access and edit the same folder simultaneously.",
            },
          ].map(({ type, color, what, why, services, analogy }) => (
            <div key={type} style={{ border: `1px solid ${color}30`, borderLeft: `4px solid ${color}`, borderRadius: 9, padding: "12px 14px", background: color + "05" }}>
              <div style={{ fontWeight: 700, fontSize: 14, color, marginBottom: 6 }}>{type}</div>
              <div style={{ fontSize: 12.5, color: "#555", lineHeight: 1.6, marginBottom: 6 }}>{what}</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 11, color, marginBottom: 3 }}>✅ Best for:</div>
                  <div style={{ fontSize: 12, color: "#555", lineHeight: 1.5 }}>{why}</div>
                  <div style={{ marginTop: 6 }}>
                    {services.map(s => <div key={s} style={{ display: "inline-block", fontSize: 10.5, background: color + "18", color, border: `1px solid ${color}30`, borderRadius: 10, padding: "2px 8px", margin: "2px 4px 2px 0", fontWeight: 600 }}>{s}</div>)}
                  </div>
                </div>
                <div style={{ background: color + "10", borderRadius: 7, padding: "8px 10px" }}>
                  <div style={{ fontWeight: 700, fontSize: 10.5, color, marginBottom: 3 }}>💡 Analogy:</div>
                  <div style={{ fontSize: 11.5, color: "#555", fontStyle: "italic", lineHeight: 1.5 }}>{analogy}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* AWS Storage services overview table */}
        <H2>All AWS Storage Services at a Glance</H2>
        <div style={{ borderRadius: 8, overflow: "hidden", border: "1px solid #e0e0e0", marginTop: 6 }}>
          {[
            ["Service", "Type", "Persistence", "Use Case"],
            ["EC2 Instance Store", "Block", "❌ Temporary", "Buffers, caches, scratch data"],
            ["Amazon EBS", "Block", "✅ Persistent", "Databases, OS volumes, app data"],
            ["Amazon S3", "Object", "✅ Persistent", "Files, backups, media, websites"],
            ["Amazon EFS", "File", "✅ Persistent", "Shared access, Linux workloads"],
            ["Amazon FSx", "File", "✅ Persistent", "Windows, HPC, NetApp workloads"],
            ["AWS Storage Gateway", "Hybrid", "✅ Persistent", "On-premises access to cloud storage"],
          ].map((row, i) => (
            <div key={i} style={{
              display: "grid", gridTemplateColumns: "1fr 0.7fr 0.8fr 1.5fr",
              borderBottom: i < 6 ? "1px solid #f0f0f0" : "none",
              background: i === 0 ? "#263238" : i % 2 === 0 ? "#fafafa" : "white",
            }}>
              {row.map((cell, j) => (
                <div key={j} style={{
                  padding: "8px 10px", fontSize: i === 0 ? 11 : 12.5,
                  fontWeight: i === 0 || j === 0 ? 700 : 400,
                  color: i === 0 ? accent : j === 0 ? "#0f9d58" : "#555",
                  borderRight: j < 3 ? "1px solid #f0f0f0" : "none",
                }}>{cell}</div>
              ))}
            </div>
          ))}
        </div>

        <Callout icon="🎯" label="Exam Tip"
          text="Block storage = fast, updatable (EC2 Instance Store + EBS). Object storage = whole-file replacement, unlimited scale (S3). File storage = hierarchical, shared access (EFS, FSx). Key differentiator: EBS is for EC2 only; S3 is accessible from anywhere. Instance Store = temporary; EBS = persistent." color={accent} />
      </div>
    );

    // ── INSTANCE STORE ────────────────────────────────────────────────────────
    case "instance-store": return (
      <div>
        <Body>
          When you launch an EC2 instance, certain instance types come with <b>physically attached storage</b>
          called an Instance Store. It's blazing fast — but there's a critical catch that trips up
          everyone the first time they hear it.
        </Body>

        {/* The critical diagram — matching screenshot */}
        <H2>⚠️ The Critical Behaviour — What Happens When You Stop an Instance</H2>
        <div style={{ background: "#1a1a2e", borderRadius: 12, padding: 16, marginTop: 8, border: "2px solid #d32f2f" }}>
          <div style={{ fontWeight: 700, fontSize: 12, color: "#ef9a9a", marginBottom: 12, textAlign: "center" }}>
            Instance Store Data is LOST when EC2 stops or terminates
          </div>

          {/* Step-by-step lifecycle diagram */}
          <div style={{ display: "flex", alignItems: "center", gap: 6, justifyContent: "center", flexWrap: "wrap" }}>
            {/* Running state */}
            <div style={{ textAlign: "center" }}>
              <div style={{ background: "#0f9d5825", border: "2px solid #4caf50", borderRadius: 10, padding: "12px 14px", marginBottom: 4 }}>
                <div style={{ fontSize: 11, color: "#4caf50", fontWeight: 700, marginBottom: 6 }}>🟢 EC2 Running</div>
                <div style={{ display: "flex", gap: 6, justifyContent: "center" }}>
                  <div style={{ background: "#FF990020", border: "1px solid #FF9900", borderRadius: 6, padding: "6px 8px", textAlign: "center" }}>
                    <div style={{ fontSize: 12 }}>🖥️</div>
                    <div style={{ fontSize: 8, color: "#FF9900" }}>EC2</div>
                  </div>
                  <div style={{ background: "#d32f2f25", border: "2px solid #d32f2f", borderRadius: 6, padding: "6px 8px", textAlign: "center" }}>
                    <div style={{ fontSize: 12 }}>💾</div>
                    <div style={{ fontSize: 8, color: "#ef9a9a" }}>Instance</div>
                    <div style={{ fontSize: 8, color: "#ef9a9a" }}>Store</div>
                    <div style={{ fontSize: 7, color: "#888", marginTop: 2 }}>Data ✅</div>
                  </div>
                </div>
              </div>
              <div style={{ fontSize: 9, color: "#4caf50" }}>Data safe while running</div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 4, alignItems: "center" }}>
              <div style={{ fontSize: 14, color: "#d32f2f" }}>→</div>
              <div style={{ fontSize: 8, color: "#888", textAlign: "center" }}>STOP or<br />TERMINATE</div>
              <div style={{ fontSize: 14, color: "#d32f2f" }}>→</div>
            </div>

            {/* Stopped/new host state */}
            <div style={{ textAlign: "center" }}>
              <div style={{ background: "#d32f2f15", border: "2px solid #d32f2f", borderRadius: 10, padding: "12px 14px", marginBottom: 4 }}>
                <div style={{ fontSize: 11, color: "#ef9a9a", fontWeight: 700, marginBottom: 6 }}>🔴 EC2 Stopped</div>
                <div style={{ display: "flex", gap: 6, justifyContent: "center" }}>
                  <div style={{ background: "#FF990020", border: "1px solid #FF9900", borderRadius: 6, padding: "6px 8px", textAlign: "center" }}>
                    <div style={{ fontSize: 12 }}>🖥️</div>
                    <div style={{ fontSize: 8, color: "#FF9900" }}>EC2</div>
                    <div style={{ fontSize: 7, color: "#888" }}>new host</div>
                  </div>
                  <div style={{ background: "#d32f2f10", border: "2px dashed #d32f2f", borderRadius: 6, padding: "6px 8px", textAlign: "center", opacity: 0.6 }}>
                    <div style={{ fontSize: 12 }}>💾</div>
                    <div style={{ fontSize: 8, color: "#ef9a9a" }}>Instance</div>
                    <div style={{ fontSize: 8, color: "#ef9a9a" }}>Store</div>
                    <div style={{ fontSize: 7, color: "#d32f2f", marginTop: 2, fontWeight: 700 }}>GONE ❌</div>
                  </div>
                </div>
              </div>
              <div style={{ fontSize: 9, color: "#d32f2f" }}>Instance may restart on NEW host</div>
            </div>
          </div>

          <div style={{ marginTop: 12, background: "#d32f2f20", borderRadius: 8, padding: "10px 12px", textAlign: "center" }}>
            <div style={{ fontSize: 12, color: "#ef9a9a", lineHeight: 1.65 }}>
              <b>Why?</b> Instance Store is physically attached to ONE host machine.<br />
              When EC2 stops, AWS may restart it on a <b>different physical host</b> — where your old storage doesn't exist.
            </div>
          </div>
        </div>

        <H2>What is Instance Store?</H2>
        <KV rows={[
          ["What it is", "Block storage physically attached to the EC2 host computer. Comes with certain instance types automatically.", "#d32f2f"],
          ["Speed", "Extremely fast — no network hop. Locally attached NVMe SSDs in some instance types.", "#0f9d58"],
          ["Persistence", "❌ NONE. Data is lost when EC2 stops, terminates, or hardware fails. Ephemeral = temporary.", "#d32f2f"],
          ["Cost", "Included in the EC2 instance price — no extra charge.", "#FF9900"],
          ["Management", "Automatically available. No provisioning needed.", "#1a73e8"],
        ]} />

        <H2>✅ When TO Use Instance Store</H2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 6 }}>
          {[
            { title: "Buffers & Caches", icon: "⚡", desc: "Temporarily store data being processed. If lost, the app just re-fetches from the real source.", color: "#0f9d58" },
            { title: "Scratch Space", icon: "📝", desc: "Heavy calculations that generate intermediate data. Results are what matter, not the working data.", color: "#1a73e8" },
            { title: "Temporary Files", icon: "🗑️", desc: "Log files being streamed before shipping to S3. Session data. In-memory caching.", color: "#FF9900" },
            { title: "High I/O Workloads", icon: "🚀", desc: "When you need maximum disk speed and can tolerate loss. Big Data processing jobs.", color: "#6a1b9a" },
          ].map(({ title, icon, desc, color }) => (
            <div key={title} style={{ border: `1px solid ${color}30`, borderRadius: 8, padding: "10px 12px", background: color + "06" }}>
              <div style={{ fontWeight: 700, fontSize: 12, color, marginBottom: 4 }}>{icon} {title}</div>
              <div style={{ fontSize: 12, color: "#555", lineHeight: 1.5 }}>{desc}</div>
            </div>
          ))}
        </div>

        <H2>❌ When NOT TO Use Instance Store</H2>
        <div style={{ background: "#fce4ec", borderRadius: 8, padding: "12px 14px", marginTop: 4, border: "1px solid #d32f2f30" }}>
          {[
            "Database storage (PostgreSQL, MySQL, MongoDB) — use EBS instead",
            "Application data that needs to survive restarts",
            "User uploads or any customer-facing data",
            "Anything you cannot afford to lose",
          ].map(item => (
            <div key={item} style={{ display: "flex", gap: 8, fontSize: 12.5, color: "#555", marginBottom: 5 }}>
              <span style={{ color: "#d32f2f", fontWeight: 700 }}>❌</span> {item}
            </div>
          ))}
        </div>

        <Callout icon="🎯" label="Exam Tip"
          text="Instance Store = physically attached, blazing fast, TEMPORARY (data lost on stop/terminate). NOT for databases or persistent data. Auto-included with certain instance types. Use case: buffers, caches, scratch data, temp files. Key word to recognise on exam: 'ephemeral' = Instance Store." color="#d32f2f" />
      </div>
    );

    // ── EBS ──────────────────────────────────────────────────────────────────
    case "ebs": return (
      <div>
        <Body>
          Amazon EBS (Elastic Block Store) is the persistent version of Instance Store.
          It's a <b>virtual hard drive</b> that attaches to your EC2 instance — but it lives separately
          from the physical host, so your data survives stops, restarts, and even instance termination.
        </Body>

        {/* EBS vs Instance Store comparison diagram */}
        <H2>📐 Instance Store vs EBS — The Key Difference</H2>
        <div style={{ background: "#1a1a2e", borderRadius: 12, padding: 16, marginTop: 8, border: "2px solid #0f9d58" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {/* Instance Store */}
            <div style={{ background: "#d32f2f15", border: "2px solid #d32f2f", borderRadius: 10, padding: 12 }}>
              <div style={{ fontWeight: 700, fontSize: 12, color: "#ef9a9a", marginBottom: 10, textAlign: "center" }}>⚡ EC2 Instance Store</div>
              <div style={{ background: "#1e293b", borderRadius: 8, padding: 10, textAlign: "center", marginBottom: 8 }}>
                <div style={{ fontSize: 9, color: "#888", marginBottom: 6 }}>AWS Host Machine</div>
                <div style={{ border: "1px solid #555", borderRadius: 6, padding: 8, display: "inline-block" }}>
                  <div style={{ fontSize: 9, color: "#aaa", marginBottom: 4 }}>Hypervisor</div>
                  <div style={{ background: "#d32f2f20", border: "2px solid #d32f2f", borderRadius: 5, padding: "6px 12px" }}>
                    <div style={{ fontSize: 11 }}>🖥️</div>
                    <div style={{ fontSize: 8, color: "#ef9a9a" }}>EC2 Instance</div>
                  </div>
                  <div style={{ background: "#d32f2f30", border: "1px dashed #d32f2f", borderRadius: 5, padding: "4px 8px", marginTop: 5 }}>
                    <div style={{ fontSize: 9 }}>💾</div>
                    <div style={{ fontSize: 7, color: "#ef9a9a" }}>Instance Store</div>
                    <div style={{ fontSize: 7, color: "#888" }}>Physically attached</div>
                  </div>
                </div>
              </div>
              <div style={{ fontSize: 11, color: "#ef9a9a", textAlign: "center", fontWeight: 700 }}>Stop EC2 = data GONE ❌</div>
            </div>

            {/* EBS */}
            <div style={{ background: "#0f9d5815", border: "2px solid #4caf50", borderRadius: 10, padding: 12 }}>
              <div style={{ fontWeight: 700, fontSize: 12, color: "#4caf50", marginBottom: 10, textAlign: "center" }}>💾 Amazon EBS Volume</div>
              <div style={{ background: "#1e293b", borderRadius: 8, padding: 10, textAlign: "center", marginBottom: 8 }}>
                <div style={{ display: "flex", gap: 8, alignItems: "center", justifyContent: "center" }}>
                  <div style={{ border: "1px solid #555", borderRadius: 6, padding: 8 }}>
                    <div style={{ fontSize: 9, color: "#aaa", marginBottom: 4 }}>AWS Host</div>
                    <div style={{ background: "#0f9d5820", border: "2px solid #4caf50", borderRadius: 5, padding: "6px 12px" }}>
                      <div style={{ fontSize: 11 }}>🖥️</div>
                      <div style={{ fontSize: 8, color: "#4caf50" }}>EC2 Instance</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                    <div style={{ width: 30, height: 2, background: "#4caf50" }} />
                    <div style={{ fontSize: 8, color: "#4caf50" }}>network</div>
                    <div style={{ width: 30, height: 2, background: "#4caf50" }} />
                  </div>
                  <div style={{ background: "#4caf5025", border: "2px solid #4caf50", borderRadius: 6, padding: "8px 10px", textAlign: "center" }}>
                    <div style={{ fontSize: 14 }}>💾</div>
                    <div style={{ fontSize: 8, color: "#4caf50", fontWeight: 700 }}>EBS Volume</div>
                    <div style={{ fontSize: 7, color: "#888", marginTop: 2 }}>Separate from host</div>
                  </div>
                </div>
              </div>
              <div style={{ fontSize: 11, color: "#4caf50", textAlign: "center", fontWeight: 700 }}>Stop EC2 = data PERSISTS ✅</div>
            </div>
          </div>
        </div>

        <H2>Amazon EBS — Key Facts</H2>
        <KV rows={[
          ["What it is", "Virtual hard drive that attaches to EC2 over the network. Separate from the physical host — data survives stops.", "#0f9d58"],
          ["Persistence", "✅ Data persists when EC2 stops/starts. Data is ONLY lost when you manually delete the volume.", "#0f9d58"],
          ["Attachment", "Attaches to ONE EC2 instance at a time (by default). Multi-attach available for some volume types.", "#1a73e8"],
          ["Sizing", "You define size (1 GB – 64 TB), type, and IOPS when provisioning. Can be resized while in use.", "#FF9900"],
          ["Availability Zone", "EBS volumes are in a specific AZ. Must be in the SAME AZ as the EC2 it attaches to.", "#6a1b9a"],
          ["Performance", "Measured in IOPS (Input/Output per Second). Different volume types optimise for different workloads.", "#d32f2f"],
          ["Encryption", "Can encrypt volumes using AWS KMS. Encryption is transparent to the instance.", "#546e7a"],
        ]} />

        <H2>EBS Volume Types</H2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 6 }}>
          {[
            { type: "gp3 / gp2", name: "General Purpose SSD", color: "#0f9d58", use: "Most workloads, system boot volumes, low-latency apps", perf: "Up to 16,000 IOPS" },
            { type: "io2 / io1", name: "Provisioned IOPS SSD", color: "#d32f2f", use: "Critical databases, high-performance apps needing consistent IOPS", perf: "Up to 256,000 IOPS" },
            { type: "st1", name: "Throughput HDD", color: "#1a73e8", use: "Big Data, data warehouses, log processing — sequential reads", perf: "Up to 500 MB/s" },
            { type: "sc1", name: "Cold HDD", color: "#546e7a", use: "Infrequently accessed data, lowest cost option", perf: "Up to 250 MB/s" },
          ].map(({ type, name, color, use, perf }) => (
            <div key={type} style={{ border: `1px solid ${color}30`, borderTop: `3px solid ${color}`, borderRadius: 8, padding: "10px 12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                <code style={{ background: color + "18", color, padding: "2px 7px", borderRadius: 4, fontSize: 11, fontWeight: 700 }}>{type}</code>
                <span style={{ fontSize: 10.5, color: "#888" }}>{perf}</span>
              </div>
              <div style={{ fontWeight: 700, fontSize: 12, color, marginBottom: 4 }}>{name}</div>
              <div style={{ fontSize: 12, color: "#555", lineHeight: 1.5 }}>{use}</div>
            </div>
          ))}
        </div>

        <H2>Real-World Use Cases</H2>
        <div style={{ display: "flex", flexDirection: "column", gap: 5, marginTop: 4 }}>
          {[
            { scenario: "🏦 Banking app database", solution: "EBS io2 — high IOPS, consistent performance, mission-critical", color: "#d32f2f" },
            { scenario: "🌐 Web server OS volume", solution: "EBS gp3 — general purpose, cost-effective boot volume", color: "#0f9d58" },
            { scenario: "📊 Data warehouse analytics", solution: "EBS st1 — high throughput for large sequential reads", color: "#1a73e8" },
            { scenario: "🗄️ Cold backup archives", solution: "EBS sc1 — lowest cost for rarely accessed data", color: "#546e7a" },
          ].map(({ scenario, solution, color }) => (
            <div key={scenario} style={{ display: "flex", gap: 10, alignItems: "flex-start", border: `1px solid ${color}20`, borderLeft: `3px solid ${color}`, borderRadius: 7, padding: "8px 12px" }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#333", flex: 1 }}>{scenario}</span>
              <span style={{ fontSize: 12.5, color, fontWeight: 600, flex: 1 }}>→ {solution}</span>
            </div>
          ))}
        </div>

        <Callout icon="🎯" label="Exam Tip"
          text="EBS = persistent block storage for EC2. Survives stops/restarts. IOPS = performance metric. EBS volumes stay in ONE AZ — must match EC2 AZ. gp3 = general purpose (default). io2 = highest performance databases. EBS is NOT accessible without an EC2 — it's like a hard drive, not a network service." color="#0f9d58" />
      </div>
    );

    // ── SNAPSHOTS ────────────────────────────────────────────────────────────
    case "snapshots": return (
      <div>
        <Body>
          What if your EBS volume fails, or you accidentally delete data? That's where <b>EBS Snapshots</b> come in.
          They're point-in-time backups — like a photograph of your volume at a specific moment.
        </Body>

        {/* Weekly calendar snapshot diagram — matching screenshot */}
        <H2>📸 How EBS Snapshots Work — Incremental Backups</H2>
        <div style={{ background: "#1a1a2e", borderRadius: 12, padding: 16, marginTop: 8, border: "2px solid #6a1b9a" }}>
          <div style={{ fontWeight: 700, fontSize: 12, color: "#ce93d8", marginBottom: 12, textAlign: "center" }}>
            Incremental Backups — Only Changed Data is Copied
          </div>

          {/* Day-by-day visual */}
          <div style={{ display: "flex", gap: 6, alignItems: "flex-end", justifyContent: "center", flexWrap: "wrap" }}>
            {[
              { day: "Mon", snaps: 4, note: "FULL backup\n4 blocks", color: "#ef5350", isFirst: true },
              { day: "Tue", snaps: 1, note: "1 block\nchanged", color: "#42a5f5", isFirst: false },
              { day: "Wed", snaps: 2, note: "2 blocks\nchanged", color: "#66bb6a", isFirst: false },
              { day: "Thu", snaps: 1, note: "1 block\nchanged", color: "#ffa726", isFirst: false },
              { day: "Fri", snaps: 3, note: "3 blocks\nchanged", color: "#ab47bc", isFirst: false },
              { day: "Sat", snaps: 1, note: "1 block\nchanged", color: "#26c6da", isFirst: false },
            ].map(({ day, snaps, note, color, isFirst }) => (
              <div key={day} style={{ textAlign: "center", minWidth: 70 }}>
                {/* Stack of icons */}
                <div style={{ display: "flex", flexDirection: "column-reverse", alignItems: "center", gap: 3, marginBottom: 6, minHeight: 100, justifyContent: "flex-end" }}>
                  {Array.from({ length: snaps }).map((_, i) => (
                    <div key={i} style={{
                      background: color + "30", border: `1.5px solid ${color}`,
                      borderRadius: 5, padding: "4px 10px", width: 56,
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <span style={{ fontSize: 12 }}>🖼️</span>
                    </div>
                  ))}
                </div>
                <div style={{ background: color + "25", border: `2px solid ${color}`, borderRadius: 8, padding: "6px 4px" }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color }}>{day}</div>
                  {note.split("\n").map((l, i) => (
                    <div key={i} style={{ fontSize: 9, color: "rgba(255,255,255,0.6)", lineHeight: 1.3 }}>{l}</div>
                  ))}
                  {isFirst && <div style={{ fontSize: 8, color, fontWeight: 700, marginTop: 2 }}>FULL</div>}
                  {!isFirst && <div style={{ fontSize: 8, color: "#888", marginTop: 2 }}>incremental</div>}
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 12, background: "rgba(255,255,255,0.06)", borderRadius: 8, padding: "10px 14px" }}>
            <div style={{ fontSize: 11.5, color: "rgba(255,255,255,0.75)", lineHeight: 1.7 }}>
              <b style={{ color: "#ce93d8" }}>Monday:</b> First snapshot copies ALL data (full backup).<br />
              <b style={{ color: "#ce93d8" }}>Tue–Sat:</b> Each snapshot only copies WHAT CHANGED since the last one.<br />
              <b style={{ color: accent }}>Result:</b> Faster backups + lower storage costs + same restore capability.
            </div>
          </div>
        </div>

        <H2>EBS Snapshots — Key Facts</H2>
        <KV rows={[
          ["What they are", "Point-in-time backups of EBS volumes. Stored durably in S3 across multiple AZs.", "#6a1b9a"],
          ["Incremental", "First snapshot = full copy. Subsequent = only changed blocks. Faster + cheaper over time.", "#0f9d58"],
          ["Use cases", "Disaster recovery, data migration, volume resizing, sharing data across AWS accounts, region-to-region copy.", "#1a73e8"],
          ["Restore", "Create a new EBS volume from any snapshot. The new volume is an exact copy of the original at snapshot time.", "#FF9900"],
          ["Cross-region", "Copy snapshots to other AWS Regions for disaster recovery and global deployments.", "#d32f2f"],
          ["Your responsibility", "You manage snapshot scheduling, retention, and cost. AWS doesn't auto-snapshot — you must set it up.", "#546e7a"],
        ]} />

        <H2>Amazon Data Lifecycle Manager (DLM) — Automating Snapshots</H2>
        <div style={{ background: "#f9f9f9", borderRadius: 10, padding: "14px", marginTop: 6, border: "1px solid #e0e0e0" }}>
          <div style={{ fontSize: 13, color: "#555", lineHeight: 1.7, marginBottom: 12 }}>
            Instead of manually clicking "Create Snapshot" every Monday, you set up a <b>policy</b> and Data Lifecycle Manager automates everything.
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {[
              ["1", "Create policy", "Define which EBS volumes to back up (e.g., all volumes tagged 'production')", "#6a1b9a"],
              ["2", "Set schedule", "Daily at 2am, weekly on Sundays, monthly — whatever your org needs", "#1a73e8"],
              ["3", "Set retention", "Keep last 7 days, or last 4 weeks, then auto-delete old snapshots", "#0f9d58"],
              ["4", "Apply tags", "Tag snapshots for tracking, cross-region copy, fast restore", "#FF9900"],
              ["5", "Automation runs", "DLM creates, tracks, and deletes snapshots automatically. No manual work.", "#d32f2f"],
            ].map(([step, title, desc, color]) => (
              <div key={step} style={{ display: "flex", gap: 10, alignItems: "flex-start", border: `1px solid ${color}20`, borderLeft: `3px solid ${color}`, borderRadius: 7, padding: "8px 12px" }}>
                <div style={{ width: 22, height: 22, borderRadius: "50%", background: color, color: "white", fontWeight: 700, fontSize: 11, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{step}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 12, color, marginBottom: 2 }}>{title}</div>
                  <div style={{ fontSize: 12, color: "#555" }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <H2>⚖️ Shared Responsibility — Snapshots</H2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 6 }}>
          <div style={{ background: "#e3f2fd", borderRadius: 8, padding: "10px 12px", border: "1px solid #1a73e840" }}>
            <div style={{ fontWeight: 700, fontSize: 12, color: "#1565c0", marginBottom: 6 }}>☁️ AWS Manages</div>
            {["Durable storage of snapshot data (in S3)", "Replication across multiple AZs", "Snapshot infrastructure uptime"].map(i => <div key={i} style={{ fontSize: 12, color: "#555", marginBottom: 3 }}>✅ {i}</div>)}
          </div>
          <div style={{ background: "#fff3e0", borderRadius: 8, padding: "10px 12px", border: "1px solid #FF990040" }}>
            <div style={{ fontWeight: 700, fontSize: 12, color: "#CC7A00", marginBottom: 6 }}>👤 You Manage</div>
            {["Scheduling snapshot creation", "Setting retention policies", "Encrypting sensitive snapshot data", "Monitoring and controlling snapshot costs", "Testing restore procedures"].map(i => <div key={i} style={{ fontSize: 12, color: "#555", marginBottom: 3 }}>⚠️ {i}</div>)}
          </div>
        </div>

        <Callout icon="🎯" label="Exam Tip"
          text="EBS Snapshots = incremental point-in-time backups stored in S3. First = full, subsequent = changes only. Use Data Lifecycle Manager to automate. Snapshots are YOUR responsibility — AWS doesn't auto-create them. Key uses: disaster recovery, cross-region migration, volume cloning." color="#6a1b9a" />
      </div>
    );

    // ── S3 ───────────────────────────────────────────────────────────────────
    case "s3": return (
      <div>
        <Body>
          Amazon S3 (Simple Storage Service) is one of AWS's most fundamental and versatile services.
          It stores data as <b>objects</b> in <b>buckets</b> — think of a bucket as a folder
          and each file inside it as an object.
        </Body>

        {/* S3 Object anatomy — matching screenshot diagram */}
        <H2>🔑 What is an S3 Object?</H2>
        <div style={{ background: "#1a1a2e", borderRadius: 12, padding: 16, marginTop: 8, border: "2px solid #FF9900" }}>
          <div style={{ display: "flex", gap: 14, alignItems: "stretch", flexWrap: "wrap" }}>
            {/* Object box */}
            <div style={{ flex: "1 1 200px", background: "#FF990015", border: "2px solid #FF9900", borderRadius: 10, padding: 12 }}>
              <div style={{ fontWeight: 700, fontSize: 12, color: accent, marginBottom: 10, textAlign: "center" }}>📦 S3 Object</div>
              {[
                { part: "Data", icon: "📄", desc: "The actual file content (image, video, document, code...)", color: "#4caf50" },
                { part: "Key", icon: "🔑", desc: "The unique name/path of the object in the bucket", color: "#2196f3" },
                { part: "Metadata", icon: "📋", desc: "Data about the data — creation date, size, storage class, custom tags", color: "#9c27b0" },
                { part: "Version ID", icon: "🏷️", desc: "Unique ID if versioning is enabled", color: "#FF9900" },
              ].map(({ part, icon, desc, color }) => (
                <div key={part} style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 8, background: color + "15", borderRadius: 6, padding: "6px 8px" }}>
                  <span style={{ fontSize: 14 }}>{icon}</span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 11, color }}>{part}</div>
                    <div style={{ fontSize: 10.5, color: "rgba(255,255,255,0.6)", lineHeight: 1.4 }}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bucket + structure */}
            <div style={{ flex: "1 1 200px" }}>
              <div style={{ background: "#0f9d5815", border: "2px solid #4caf50", borderRadius: 10, padding: 12, marginBottom: 8 }}>
                <div style={{ fontWeight: 700, fontSize: 12, color: "#4caf50", marginBottom: 8, textAlign: "center" }}>🪣 S3 Bucket</div>
                <div style={{ fontSize: 10.5, color: "rgba(255,255,255,0.7)", lineHeight: 1.6, marginBottom: 8 }}>
                  Container for objects. <b style={{ color: "#4caf50" }}>Globally unique name</b> required. Lives in ONE Region. Can hold unlimited objects.
                </div>
                {/* Bucket tree */}
                <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 6, padding: "8px 10px", fontFamily: "monospace", fontSize: 10.5 }}>
                  <div style={{ color: "#4caf50" }}>my-company-bucket/</div>
                  <div style={{ color: "#aaa", marginLeft: 12 }}>├── images/</div>
                  <div style={{ color: "#2196f3", marginLeft: 24 }}>│   ├── logo.png</div>
                  <div style={{ color: "#2196f3", marginLeft: 24 }}>│   └── banner.jpg</div>
                  <div style={{ color: "#aaa", marginLeft: 12 }}>├── docs/</div>
                  <div style={{ color: "#2196f3", marginLeft: 24 }}>│   └── report.pdf</div>
                  <div style={{ color: "#aaa", marginLeft: 12 }}>└── videos/</div>
                  <div style={{ color: "#2196f3", marginLeft: 24 }}>    └── promo.mp4</div>
                </div>
              </div>

              {/* Key stats */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                {[
                  { stat: "5 TB", label: "Max object size", color: "#FF9900" },
                  { stat: "∞", label: "Max bucket size", color: "#4caf50" },
                  { stat: "11 9s", label: "Durability", color: "#2196f3" },
                  { stat: "99.99%", label: "Availability", color: "#9c27b0" },
                ].map(({ stat, label, color }) => (
                  <div key={label} style={{ background: color + "20", border: `1px solid ${color}40`, borderRadius: 7, padding: "7px 8px", textAlign: "center" }}>
                    <div style={{ fontSize: 16, fontWeight: 800, color }}>{stat}</div>
                    <div style={{ fontSize: 9.5, color: "rgba(255,255,255,0.6)", marginTop: 2 }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <H2>S3 Key Concepts</H2>
        <KV rows={[
          ["11 nines durability", "99.999999999% — your object has 0.000000001% chance of being lost per year. AWS redundantly stores across 3+ AZs.", "#0f9d58"],
          ["Private by default", "Everything in S3 is PRIVATE by default. You must explicitly grant access. No accidental public exposure.", "#d32f2f"],
          ["Versioning", "Keep all versions of every object. Protects against accidental deletion. Can restore any previous version.", "#6a1b9a"],
          ["Flat structure", "No real folders — just objects with a key path like 'images/logo.png'. AWS console simulates folders for usability.", "#1a73e8"],
          ["Managed service", "AWS handles scaling, redundancy, hardware. You focus on your data. No capacity planning needed.", "#FF9900"],
          ["Global namespace", "Bucket names must be globally unique across ALL AWS accounts worldwide.", "#546e7a"],
        ]} />

        <H2>Real-World Use Cases</H2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginTop: 6 }}>
          {[
            { icon: "🛒", title: "E-commerce Images", desc: "Product photos, thumbnails, category banners stored in S3. CloudFront delivers them globally.", color: "#FF9900" },
            { icon: "💾", title: "Application Backups", desc: "Daily database backups, logs, configuration exports. Versioning prevents accidental deletion.", color: "#0f9d58" },
            { icon: "🎬", title: "Video/Media Files", desc: "Training videos, marketing content, podcast episodes stored and served from S3.", color: "#1a73e8" },
            { icon: "🌐", title: "Static Websites", desc: "Serve HTML, CSS, JS files directly from S3. Cost-effective for simple sites.", color: "#d32f2f" },
            { icon: "📊", title: "Data Lakes", desc: "Raw data from IoT, clickstreams, logs. Athena and Redshift query S3 data directly.", color: "#6a1b9a" },
            { icon: "📜", title: "Compliance Archives", desc: "Legal documents, audit logs, financial records. Lifecycle policies auto-move to cheaper tiers.", color: "#546e7a" },
          ].map(({ icon, title, desc, color }) => (
            <div key={title} style={{ border: `1px solid ${color}25`, borderTop: `3px solid ${color}`, borderRadius: 8, padding: "10px 11px" }}>
              <div style={{ fontSize: 20, marginBottom: 4 }}>{icon}</div>
              <div style={{ fontWeight: 700, fontSize: 12, color, marginBottom: 4 }}>{title}</div>
              <div style={{ fontSize: 11.5, color: "#555", lineHeight: 1.5 }}>{desc}</div>
            </div>
          ))}
        </div>

        <Callout icon="🎯" label="Exam Tip"
          text="S3 = object storage, not block storage. Objects stored in buckets. Max object = 5TB, no bucket size limit. 11 nines durability. Private by default — must explicitly share. Versioning protects against deletion. S3 is a regional service but bucket names are globally unique. Use cases: backups, static websites, data lakes, media files." color={accent} />
      </div>
    );

    // ── S3 STORAGE CLASSES ────────────────────────────────────────────────────
    case "s3-classes": return (
      <div>
        <Body>
          Not all data needs the same access speed or availability. S3 has <b>9 storage classes</b> — each
          optimised for different access patterns and costs. Choosing the right class can save you
          significant money without sacrificing performance where it matters.
        </Body>

        {/* The access spectrum diagram */}
        <div style={{ background: "#263238", borderRadius: 10, padding: "12px 14px", marginTop: 8 }}>
          <div style={{ fontWeight: 700, fontSize: 12, color: accent, marginBottom: 8 }}>📊 The Access vs Cost Spectrum</div>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <div style={{ fontSize: 10, color: "#888", flexShrink: 0 }}>Frequent\naccess</div>
            <div style={{ flex: 1, height: 10, borderRadius: 6, background: "linear-gradient(to right, #4caf50, #FF9900, #9c27b0, #3f51b5)" }} />
            <div style={{ fontSize: 10, color: "#888", flexShrink: 0, textAlign: "right" }}>Rare\naccess</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 3 }}>
            <div style={{ fontSize: 10, color: "#888", flexShrink: 0 }}>Higher\ncost</div>
            <div style={{ flex: 1, height: 10, borderRadius: 6, background: "linear-gradient(to right, #d32f2f40, #FF990040, #0f9d5840)" }} />
            <div style={{ fontSize: 10, color: "#888", flexShrink: 0, textAlign: "right" }}>Lower\ncost</div>
          </div>
        </div>

        <H2>All 9 S3 Storage Classes</H2>
        <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 6 }}>
          {[
            {
              name: "S3 Standard", icon: "⭐", color: "#4caf50",
              access: "Frequent", retrieval: "Milliseconds", redundancy: "3+ AZs",
              use: "General purpose. Dynamic websites, mobile apps, content distribution, big data analytics.",
              analogy: "Your everyday checking account — easy access, full service.",
              cost: "Highest storage cost",
            },
            {
              name: "S3 Intelligent-Tiering", icon: "🧠", color: "#2196f3",
              access: "Unknown/Changing", retrieval: "Milliseconds", redundancy: "3+ AZs",
              use: "Data with unpredictable access patterns. Auto-moves data between tiers. Perfect for data lakes.",
              analogy: "Smart thermostat that adjusts itself — you don't manage it.",
              cost: "Pays small monitoring fee per object",
            },
            {
              name: "S3 Standard-IA", icon: "📁", color: "#FF9900",
              access: "Infrequent", retrieval: "Milliseconds", redundancy: "3+ AZs",
              use: "Backups, disaster recovery files. Fast access when needed, but accessed rarely.",
              analogy: "Savings account — still fast to withdraw, but you pay a fee per withdrawal.",
              cost: "Lower storage, per-GB retrieval fee",
            },
            {
              name: "S3 One Zone-IA", icon: "1️⃣", color: "#FF5722",
              access: "Infrequent", retrieval: "Milliseconds", redundancy: "1 AZ only",
              use: "Secondary backups or easily re-creatable data. Acceptable to lose if AZ fails.",
              analogy: "Savings account at a single branch — cheaper, slight risk.",
              cost: "20% cheaper than Standard-IA",
            },
            {
              name: "S3 Express One Zone", icon: "🚀", color: "#e91e63",
              access: "Very frequent", retrieval: "Single-digit ms", redundancy: "1 AZ only",
              use: "Latency-sensitive apps. Up to 10x faster than Standard, 80% lower request costs.",
              analogy: "Express checkout lane — premium speed, single location.",
              cost: "Higher than Standard but much faster",
            },
            {
              name: "S3 Glacier Instant Retrieval", icon: "🧊", color: "#9c27b0",
              access: "Rare (quarterly)", retrieval: "Milliseconds", redundancy: "3+ AZs",
              use: "Medical images, news media archives, genomics data. Cheap but instant when needed.",
              analogy: "Deep freezer that opens instantly — great for emergencies.",
              cost: "68% cheaper than Standard-IA",
            },
            {
              name: "S3 Glacier Flexible Retrieval", icon: "❄️", color: "#673ab7",
              access: "Rare (1–2x/year)", retrieval: "1–12 hours", redundancy: "3+ AZs",
              use: "Backup, disaster recovery. Expedited = 1–5 min. Standard = 3–5 hrs. Bulk = 5–12 hrs.",
              analogy: "Storage unit — cheaper to rent, takes time to retrieve things.",
              cost: "Very low. Pay extra for faster retrieval.",
            },
            {
              name: "S3 Glacier Deep Archive", icon: "🏔️", color: "#3f51b5",
              access: "Once/twice a year", retrieval: "Up to 12 hours", redundancy: "3+ AZs",
              use: "7–10+ year compliance archives. Financial, healthcare, government. Cheapest AWS storage.",
              analogy: "Off-site vault — almost free to store, takes half a day to retrieve.",
              cost: "Lowest cost — ~$0.00099/GB",
            },
            {
              name: "S3 Outposts", icon: "🏢", color: "#546e7a",
              access: "On-premises", retrieval: "Local", redundancy: "On-prem hardware",
              use: "Data residency requirements. Keep data in your own facility using S3 APIs.",
              analogy: "Bringing the cloud to your building — same tools, local storage.",
              cost: "AWS Outposts hardware required",
            },
          ].map(({ name, icon, color, access, retrieval, redundancy, use, analogy, cost }) => (
            <div key={name} style={{ border: `1px solid ${color}30`, borderLeft: `4px solid ${color}`, borderRadius: 9, padding: "10px 12px", background: color + "04" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, flexWrap: "wrap" }}>
                <span style={{ fontSize: 16 }}>{icon}</span>
                <span style={{ fontWeight: 700, fontSize: 13, color }}>{name}</span>
                <div style={{ display: "flex", gap: 5, marginLeft: "auto", flexWrap: "wrap" }}>
                  {[["Access", access, color], ["Retrieval", retrieval, "#888"], ["Redundancy", redundancy, "#666"]].map(([k, v, c]) => (
                    <span key={k} style={{ fontSize: 9.5, background: "#f5f5f5", border: "1px solid #e0e0e0", borderRadius: 10, padding: "2px 7px", color: c }}>{k}: {v}</span>
                  ))}
                </div>
              </div>
              <div style={{ fontSize: 12.5, color: "#555", lineHeight: 1.55, marginBottom: 5 }}>{use}</div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <div style={{ fontSize: 11.5, color, fontStyle: "italic" }}>💡 {analogy}</div>
                <div style={{ fontSize: 11, color: "#888", marginLeft: "auto" }}>💰 {cost}</div>
              </div>
            </div>
          ))}
        </div>

        <H2>S3 Lifecycle Policies — Automate Class Transitions</H2>
        <div style={{ background: "#f9f9f9", borderRadius: 10, padding: "14px", marginTop: 6, border: "1px solid #e0e0e0" }}>
          <div style={{ fontSize: 13, color: "#555", lineHeight: 1.7, marginBottom: 10 }}>
            Instead of manually moving objects between classes, you define <b>rules</b> that run automatically.
          </div>
          <div style={{ background: "#1e1e1e", borderRadius: 8, padding: "12px 14px", fontFamily: "monospace" }}>
            <div style={{ color: "#6A9955", fontSize: 11 }}>// Example Lifecycle Policy — Social Media Posts</div>
            <div style={{ color: "#4EC9B0", fontSize: 11.5, marginTop: 6 }}>Day 0:</div>
            <div style={{ color: "#CE9178", fontSize: 11.5, marginLeft: 12 }}>Upload → S3 Standard (frequent access)</div>
            <div style={{ color: "#4EC9B0", fontSize: 11.5, marginTop: 4 }}>After 30 days:</div>
            <div style={{ color: "#CE9178", fontSize: 11.5, marginLeft: 12 }}>Transition → S3 Standard-IA (access drops off)</div>
            <div style={{ color: "#4EC9B0", fontSize: 11.5, marginTop: 4 }}>After 1 year:</div>
            <div style={{ color: "#CE9178", fontSize: 11.5, marginLeft: 12 }}>Transition → S3 Glacier Deep Archive (long-term)</div>
            <div style={{ color: "#4EC9B0", fontSize: 11.5, marginTop: 4 }}>After 7 years:</div>
            <div style={{ color: "#d32f2f", fontSize: 11.5, marginLeft: 12 }}>Expire → Delete permanently</div>
          </div>
        </div>

        <Callout icon="🎯" label="Exam Tip"
          text="Know the 3 Glacier tiers: Instant (ms, quarterly access), Flexible (1-12hrs, 1-2x/year), Deep Archive (12hrs, cheapest). Standard-IA vs One Zone-IA: One Zone is 20% cheaper but stored in only 1 AZ. Intelligent-Tiering = auto moves for unpredictable patterns. Use Lifecycle policies to automate class transitions. Deep Archive = cheapest, 7-10yr compliance." color={accent} />
      </div>
    );

    // ── S3 SECURITY ───────────────────────────────────────────────────────────
    case "s3-security": return (
      <div>
        <Body>
          S3 is <b>private by default</b>. Nothing is publicly accessible until you explicitly allow it.
          AWS provides multiple layers of security to control exactly who can access what.
        </Body>

        <H2>🔐 S3 Security — 3 Layers</H2>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 6 }}>
          {[
            {
              layer: "1. Bucket Policies", icon: "📜", color: "#d32f2f",
              what: "JSON policies attached directly to the S3 bucket. Define which AWS accounts, users, roles can do what actions on the bucket and its objects.",
              example: '{"Effect": "Allow", "Principal": {"AWS": "arn:aws:iam::123456:user/alice"}, "Action": "s3:GetObject", "Resource": "arn:aws:s3:::my-bucket/*"}',
              useCase: "Grant another AWS account access to upload. Make specific objects public. Restrict access by IP.",
            },
            {
              layer: "2. Identity-Based Policies (IAM)", icon: "👤", color: "#1a73e8",
              what: "Policies attached to IAM users, groups, or roles — not to the S3 bucket itself. Control what S3 actions the identity can perform.",
              example: "Attach an IAM policy to a developer role allowing s3:GetObject and s3:PutObject on specific buckets.",
              useCase: "Control which team members or applications can access which buckets.",
            },
            {
              layer: "3. Encryption", icon: "🔑", color: "#0f9d58",
              what: "S3 offers encryption both at rest (data stored in S3) and in transit (data moving to/from S3).",
              example: "Enable SSE-S3 (AWS managed keys), SSE-KMS (your own KMS keys), or SSE-C (customer-provided keys).",
              useCase: "Healthcare, financial, and government data that must be encrypted for compliance.",
            },
          ].map(({ layer, icon, color, what, example, useCase }) => (
            <div key={layer} style={{ border: `1px solid ${color}30`, borderRadius: 10, overflow: "hidden" }}>
              <div style={{ background: color, padding: "9px 14px", display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 20 }}>{icon}</span>
                <div style={{ fontWeight: 700, fontSize: 13, color: "white" }}>{layer}</div>
              </div>
              <div style={{ padding: "12px 14px", background: "white" }}>
                <div style={{ fontSize: 13, color: "#555", lineHeight: 1.6, marginBottom: 8 }}>{what}</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  <div style={{ background: "#1e1e1e", borderRadius: 7, padding: "8px 10px" }}>
                    <div style={{ fontSize: 10, color: "#888", marginBottom: 3 }}>Example</div>
                    <div style={{ fontSize: 10.5, color: "#CE9178", fontFamily: "monospace", lineHeight: 1.5 }}>{example}</div>
                  </div>
                  <div style={{ background: color + "08", borderRadius: 7, padding: "8px 10px" }}>
                    <div style={{ fontSize: 10, color, fontWeight: 700, marginBottom: 3 }}>Use case</div>
                    <div style={{ fontSize: 11.5, color: "#555", lineHeight: 1.5 }}>{useCase}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <H2>Additional Security Features</H2>
        <KV rows={[
          ["Block Public Access", "Global setting to prevent ANY public access even if bucket policy allows it. On by default. Turn off deliberately only.", "#d32f2f"],
          ["Presigned URLs", "Temporary access URLs with expiry time. Share private objects without changing bucket policy. E.g., download link valid for 1 hour.", "#6a1b9a"],
          ["S3 Access Points", "Create named endpoints with their own access policies. Simplify managing access for large shared datasets.", "#1a73e8"],
          ["S3 Audit Logs", "Track every request made to your bucket — who accessed what, when, from where. Essential for compliance.", "#FF9900"],
          ["MFA Delete", "Require MFA authentication to permanently delete objects or change versioning settings. Prevents accidental/malicious deletion.", "#0f9d58"],
          ["Versioning", "Keep all versions of every object. Even if someone deletes an object, the previous version is preserved and recoverable.", "#546e7a"],
        ]} />

        <H2>⚖️ Shared Responsibility — S3 Security</H2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 6 }}>
          <div style={{ background: "#e3f2fd", borderRadius: 8, padding: "10px 12px", border: "1px solid #1a73e840" }}>
            <div style={{ fontWeight: 700, fontSize: 12, color: "#1565c0", marginBottom: 6 }}>☁️ AWS Manages (Security OF S3)</div>
            {["Physical security of data centers", "Infrastructure and hardware", "S3 service availability (99.99%)", "Replication across AZs", "Default encryption at rest"].map(i => <div key={i} style={{ fontSize: 12, color: "#555", marginBottom: 3 }}>✅ {i}</div>)}
          </div>
          <div style={{ background: "#fff3e0", borderRadius: 8, padding: "10px 12px", border: "1px solid #FF990040" }}>
            <div style={{ fontWeight: 700, fontSize: 12, color: "#CC7A00", marginBottom: 6 }}>👤 You Manage (Security IN S3)</div>
            {["Bucket policies and IAM permissions", "Turning on/off public access", "Enabling encryption with your keys", "Managing data access controls", "Lifecycle policies and versioning", "Auditing who accessed what"].map(i => <div key={i} style={{ fontSize: 12, color: "#555", marginBottom: 3 }}>⚠️ {i}</div>)}
          </div>
        </div>

        <Callout icon="🎯" label="Exam Tip"
          text="S3 is PRIVATE by default — nothing is public until you change it. Block Public Access overrides bucket policies. Bucket policies = attached to bucket (resource-based). IAM policies = attached to users/roles (identity-based). Both can grant/deny S3 access. Encryption: at-rest (stored data) vs in-transit (data moving). Presigned URLs = temporary access without changing permissions." color="#d32f2f" />
      </div>
    );

    // ── OTHER STORAGE ─────────────────────────────────────────────────────────
    case "efs": return (
      <div>
        <Body>
          Amazon EFS (Elastic File System) is a <b>fully managed, shared file system</b> that multiple
          EC2 instances can access simultaneously — across multiple Availability Zones in a Region.
          Think of it as a network drive that your entire team can connect to at the same time.
        </Body>

        {/* EFS vs EBS Architecture Diagram */}
        <H2>📐 EFS vs EBS — The Critical Difference</H2>
        <div style={{ background: "#1a1a2e", borderRadius: 12, padding: 16, marginTop: 8, border: "2px solid #0f9d58" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            {/* EBS - one to one */}
            <div style={{ background: "#d32f2f15", border: "2px solid #d32f2f", borderRadius: 10, padding: 12 }}>
              <div style={{ fontWeight: 700, fontSize: 12, color: "#ef9a9a", marginBottom: 8, textAlign: "center" }}>💾 EBS — One Volume, ONE Instance</div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                <div style={{ display: "flex", gap: 10 }}>
                  {["🖥️ EC2-A", "🖥️ EC2-B", "🖥️ EC2-C"].map((ec2, i) => (
                    <div key={i} style={{ background: "#FF990020", border: "1px solid #FF9900", borderRadius: 6, padding: "6px 8px", textAlign: "center", opacity: i === 0 ? 1 : 0.4 }}>
                      <div style={{ fontSize: 11 }}>{ec2.split(" ")[0]}</div>
                      <div style={{ fontSize: 8, color: "#FF9900" }}>{ec2.split(" ")[1]}</div>
                    </div>
                  ))}
                </div>
                <div style={{ fontSize: 14, color: "#d32f2f" }}>↕</div>
                <div style={{ background: "#d32f2f25", border: "2px solid #d32f2f", borderRadius: 7, padding: "8px 16px", textAlign: "center" }}>
                  <div style={{ fontSize: 14 }}>💾</div>
                  <div style={{ fontSize: 9, color: "#ef9a9a", fontWeight: 700 }}>EBS Volume</div>
                  <div style={{ fontSize: 8, color: "#888" }}>Attached to EC2-A only</div>
                </div>
              </div>
              <div style={{ fontSize: 10.5, color: "#ef9a9a", textAlign: "center", marginTop: 8 }}>EC2-B and EC2-C cannot access this EBS</div>
            </div>

            {/* EFS - many to one */}
            <div style={{ background: "#0f9d5815", border: "2px solid #4caf50", borderRadius: 10, padding: 12 }}>
              <div style={{ fontWeight: 700, fontSize: 12, color: "#4caf50", marginBottom: 8, textAlign: "center" }}>📁 EFS — One File System, MANY Instances</div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                <div style={{ display: "flex", gap: 10 }}>
                  {["🖥️ EC2-A", "🖥️ EC2-B", "🖥️ EC2-C"].map((ec2, i) => (
                    <div key={i} style={{ background: "#FF990020", border: "1px solid #FF9900", borderRadius: 6, padding: "6px 8px", textAlign: "center" }}>
                      <div style={{ fontSize: 11 }}>{ec2.split(" ")[0]}</div>
                      <div style={{ fontSize: 8, color: "#FF9900" }}>{ec2.split(" ")[1]}</div>
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 20, fontSize: 14, color: "#4caf50" }}>↓ ↓ ↓</div>
                <div style={{ background: "#4caf5025", border: "2px solid #4caf50", borderRadius: 7, padding: "8px 20px", textAlign: "center" }}>
                  <div style={{ fontSize: 14 }}>📁</div>
                  <div style={{ fontSize: 9, color: "#4caf50", fontWeight: 700 }}>EFS File System</div>
                  <div style={{ fontSize: 8, color: "#888" }}>All 3 EC2s read/write simultaneously</div>
                </div>
              </div>
              <div style={{ fontSize: 10.5, color: "#4caf50", textAlign: "center", marginTop: 8 }}>All EC2 instances share the same data ✅</div>
            </div>
          </div>
          <div style={{ marginTop: 10, background: "rgba(255,255,255,0.06)", borderRadius: 8, padding: "10px 14px", fontSize: 12, color: "rgba(255,255,255,0.75)", lineHeight: 1.65, textAlign: "center" }}>
            <b style={{ color: "#4caf50" }}>Simple rule:</b> EBS = USB drive per laptop. EFS = shared Google Drive for the whole team.
          </div>
        </div>

        <H2>Amazon EFS — Key Facts</H2>
        <KV rows={[
          ["What it is", "Managed NFS (Network File System). Multiple EC2 instances can mount and read/write simultaneously.", "#0f9d58"],
          ["Multi-AZ", "Automatically replicates across multiple AZs. Survives AZ failures — high availability built in.", "#1a73e8"],
          ["Auto-scaling", "Grows and shrinks automatically. No capacity planning. Scales to petabytes.", "#FF9900"],
          ["Compatibility", "Linux/Unix ONLY. Uses NFS protocol. Does NOT support Windows workloads.", "#d32f2f"],
          ["Concurrent access", "Thousands of NFS connections simultaneously. All see the same data in real time.", "#6a1b9a"],
          ["Storage classes", "Standard, Standard-IA, One Zone, One Zone-IA, Archive. Auto-lifecycle policies.", "#546e7a"],
        ]} />

        <H2>🎯 Real-World Example — Automotive Repair Chain</H2>
        <div style={{ background: "#e8f5e9", borderRadius: 10, padding: "14px", marginTop: 6, border: "1px solid #4caf5040" }}>
          <div style={{ fontWeight: 700, fontSize: 13, color: "#2e7d32", marginBottom: 8 }}>🔧 Problem: 50 mechanic shops need to share repair manuals, diagnostic videos, and technical diagrams in real time</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 11, color: "#d32f2f", marginBottom: 5 }}>❌ Without EFS:</div>
              {["Each shop has its own file server", "Updates don't sync automatically", "Video uploaded in Texas not visible in California", "Mechanics working on old versions of manuals"].map(p => <div key={p} style={{ fontSize: 12, color: "#555", marginBottom: 3 }}>• {p}</div>)}
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 11, color: "#0f9d58", marginBottom: 5 }}>✅ With EFS:</div>
              {["One shared EFS file system", "Any EC2 in any AZ mounts it simultaneously", "Upload new repair video → instantly visible to all 50 shops", "Auto-scales as media library grows"].map(p => <div key={p} style={{ fontSize: 12, color: "#555", marginBottom: 3 }}>• {p}</div>)}
            </div>
          </div>
          <div style={{ marginTop: 10, background: "#2e7d3215", borderRadius: 7, padding: "8px 12px", fontSize: 12, color: "#2e7d32", fontWeight: 600 }}>
            Result: All 50 locations always have access to the same, up-to-date repair knowledge base. Real-time. Zero manual sync.
          </div>
        </div>

        <H2>EFS Storage Classes & Lifecycle</H2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginTop: 6 }}>
          {[
            { cls: "EFS Standard", icon: "⭐", cost: "Highest", access: "Frequent", redundancy: "Multi-AZ", color: "#0f9d58", use: "Active shared data, CMS, dev environments" },
            { cls: "EFS Standard-IA", icon: "📦", cost: "Lower", access: "Infrequent (quarterly)", redundancy: "Multi-AZ", color: "#FF9900", use: "Older project files, infrequent audit data" },
            { cls: "EFS Archive", icon: "🏔️", cost: "Lowest (50% cheaper than IA)", access: "Rarely (few times/year)", redundancy: "Multi-AZ", color: "#6a1b9a", use: "Cold data, compliance archives, historical logs" },
          ].map(({ cls, icon, cost, access, redundancy, color, use }) => (
            <div key={cls} style={{ border: `1px solid ${color}30`, borderTop: `3px solid ${color}`, borderRadius: 8, padding: "10px 11px" }}>
              <div style={{ fontSize: 18, marginBottom: 4 }}>{icon}</div>
              <div style={{ fontWeight: 700, fontSize: 11.5, color, marginBottom: 6 }}>{cls}</div>
              {[["Access", access], ["Redundancy", redundancy], ["Cost", cost], ["Best for", use]].map(([k, v]) => (
                <div key={k} style={{ fontSize: 11, color: "#555", marginBottom: 2 }}><b style={{ color }}>{k}:</b> {v}</div>
              ))}
            </div>
          ))}
        </div>

        <Callout icon="🎯" label="Exam Tip"
          text="EFS = shared NFS, multiple EC2s simultaneously, Linux ONLY, multi-AZ by default, auto-scales. EBS = single EC2, any OS, manually sized. Use EFS when multiple servers need the SAME data at the same time. Key phrase: 'thousands of concurrent NFS connections'." color="#0f9d58" />
      </div>
    );

    case "fsx": return (
      <div>
        <Body>
          Amazon FSx provides <b>fully managed file systems</b> for specific protocols and workloads.
          While EFS covers Linux/NFS, FSx handles Windows, Lustre, OpenZFS, and NetApp ONTAP.
          Choose FSx when you need a specific, industry-standard file system — not generic NFS.
        </Body>

        {/* FSx 4 options overview */}
        <H2>📐 FSx Architecture — 4 File System Types</H2>
        <div style={{ background: "#1a1a2e", borderRadius: 12, padding: 14, marginTop: 8, border: "2px solid #0078d4" }}>
          <div style={{ fontWeight: 700, fontSize: 12, color: "#60a5fa", marginBottom: 10, textAlign: "center" }}>
            Amazon FSx — Pick the File System Your App Already Knows
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {[
              { name: "FSx for Windows File Server", icon: "🪟", protocol: "SMB", color: "#0078d4", badge: "Windows workloads",
                what: "Fully managed Windows file system. Same as Windows Server but in the cloud. Full AD integration.",
                realWorld: "Migration of on-prem Windows file servers. SQL Server storage. VDI (Virtual Desktop Infrastructure).",
                analogy: "Exactly like a \\fileserver on your corporate Windows network — just hosted on AWS." },
              { name: "FSx for Lustre", icon: "⚡", protocol: "Lustre", color: "#FF9900", badge: "HPC & ML",
                what: "High-performance parallel file system. Sub-millisecond latency. Integrates natively with S3.",
                realWorld: "Training ML models (reads training data from S3). Genome sequencing. Financial risk simulations. Video rendering pipelines.",
                analogy: "Formula 1 race car for storage — absurdly fast, built for maximum performance." },
              { name: "FSx for NetApp ONTAP", icon: "🗃️", protocol: "NFS, SMB, iSCSI", color: "#00897b", badge: "Enterprise migration",
                what: "Cloud version of NetApp ONTAP. Supports NFS, SMB, AND iSCSI simultaneously. Data deduplication, compression, snapshots.",
                realWorld: "Enterprises running NetApp on-prem who want to move to AWS without rewriting apps. Multi-protocol access for mixed environments.",
                analogy: "Bring your existing enterprise storage system to the cloud — same interface, no relearning." },
              { name: "FSx for OpenZFS", icon: "🔵", protocol: "NFS", color: "#6a1b9a", badge: "Linux + macOS",
                what: "OpenZFS in the cloud. Consistent sub-millisecond latency. ZFS snapshots and cloning. NFS v3–v4.2.",
                realWorld: "Dev/test environments (cheap clones for each developer). Content management. Data analytics workloads on Linux.",
                analogy: "Supercharged Linux file system with instant cloning — great for dev teams." },
            ].map(({ name, icon, protocol, color, badge, what, realWorld, analogy }) => (
              <div key={name} style={{ background: color + "18", border: `2px solid ${color}50`, borderRadius: 10, padding: 11 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 7 }}>
                  <span style={{ fontSize: 20 }}>{icon}</span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 11.5, color }}>{name}</div>
                    <div style={{ fontSize: 9.5, color: "rgba(255,255,255,0.55)" }}>Protocol: {protocol}</div>
                  </div>
                </div>
                <div style={{ fontSize: 11.5, color: "rgba(255,255,255,0.75)", lineHeight: 1.5, marginBottom: 6 }}>{what}</div>
                <div style={{ fontSize: 10.5, color, fontWeight: 600, marginBottom: 4 }}>🎯 Real use: {realWorld}</div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", fontStyle: "italic" }}>💡 {analogy}</div>
              </div>
            ))}
          </div>
        </div>

        <H2>FSx vs EFS — Which to Pick?</H2>
        <div style={{ borderRadius: 8, overflow: "hidden", border: "1px solid #e0e0e0", marginTop: 6 }}>
          {[
            ["Scenario", "Best Choice", "Why"],
            ["Your app runs on Linux and needs shared storage", "Amazon EFS", "Native NFS, auto-scales, multi-AZ"],
            ["Migrating Windows file server to AWS", "FSx for Windows", "SMB protocol, Active Directory, Windows-native"],
            ["Training a machine learning model reading from S3", "FSx for Lustre", "Sub-ms latency, S3 native integration, parallel I/O"],
            ["Enterprise NetApp migration to cloud", "FSx for NetApp ONTAP", "Same ONTAP interface, NFS + SMB + iSCSI"],
            ["Dev team needs isolated test environments quickly", "FSx for OpenZFS", "Instant clones, fast provisioning, NFS"],
            ["HPC genomics workload needing massive throughput", "FSx for Lustre", "Millions of IOPS, parallel distributed reads"],
          ].map((row, i) => (
            <div key={i} style={{
              display: "grid", gridTemplateColumns: "1.5fr 1fr 1.5fr",
              borderBottom: i < 6 ? "1px solid #f0f0f0" : "none",
              background: i === 0 ? "#263238" : i % 2 === 0 ? "#fafafa" : "white",
            }}>
              {row.map((cell, j) => (
                <div key={j} style={{
                  padding: "8px 10px", fontSize: i === 0 ? 11 : 12,
                  fontWeight: i === 0 || j === 0 ? 700 : j === 1 ? 600 : 400,
                  color: i === 0 ? accent : j === 1 ? "#0078d4" : "#555",
                  borderRight: j < 2 ? "1px solid #f0f0f0" : "none",
                  lineHeight: 1.4,
                }}>{cell}</div>
              ))}
            </div>
          ))}
        </div>

        <Callout icon="🎯" label="Exam Tip"
          text="EFS = Linux/NFS generic shared storage. FSx for Windows = SMB, AD integration, Windows ONLY. FSx for Lustre = HPC/ML, fastest throughput, S3 integration. FSx for NetApp ONTAP = multi-protocol enterprise migration. FSx for OpenZFS = Linux NFS with ZFS features. Key differentiator: FSx = specific file system protocol; EFS = generic Linux NFS." color="#0078d4" />
      </div>
    );

    case "gateway": return (
      <div>
        <Body>
          AWS Storage Gateway is a <b>hybrid cloud service</b> — it bridges your existing on-premises
          data center to AWS cloud storage. Your local apps keep working exactly as before,
          but their data is backed up or stored in the cloud.
        </Body>

        {/* Architecture diagram */}
        <H2>📐 How Storage Gateway Works</H2>
        <div style={{ background: "#1a1a2e", borderRadius: 12, padding: 16, marginTop: 8, border: "2px solid #546e7a" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap", justifyContent: "center" }}>
            {/* On-premises side */}
            <div style={{ background: "#37474f25", border: "2px solid #607d8b", borderRadius: 10, padding: 12, textAlign: "center", minWidth: 140 }}>
              <div style={{ fontSize: 9, color: "#90a4ae", fontWeight: 700, marginBottom: 8 }}>ON-PREMISES</div>
              {["🖥️ Your App", "📄 Your Files", "📼 Backup Software"].map((item, i) => (
                <div key={i} style={{ background: "rgba(255,255,255,0.08)", borderRadius: 5, padding: "5px 8px", fontSize: 11, color: "rgba(255,255,255,0.8)", marginBottom: 5 }}>{item}</div>
              ))}
              <div style={{ fontSize: 9, color: "#90a4ae", marginTop: 4 }}>Uses NFS / SMB / iSCSI<br />— familiar protocols</div>
            </div>

            {/* Bridge/Gateway */}
            <div style={{ textAlign: "center" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, marginBottom: 6 }}>
                <div style={{ width: 50, height: 2, background: "#607d8b" }} />
                <div style={{ fontSize: 9, color: "#90a4ae" }}>internet</div>
                <div style={{ width: 50, height: 2, background: "#607d8b" }} />
              </div>
              <div style={{ background: "#546e7a", borderRadius: 12, padding: "12px 16px", textAlign: "center" }}>
                <div style={{ fontSize: 24, marginBottom: 4 }}>🌉</div>
                <div style={{ fontSize: 11, fontWeight: 700, color: "white" }}>Storage</div>
                <div style={{ fontSize: 11, fontWeight: 700, color: "white" }}>Gateway</div>
                <div style={{ fontSize: 9, color: "rgba(255,255,255,0.7)", marginTop: 4 }}>Virtual appliance</div>
                <div style={{ fontSize: 9, color: "rgba(255,255,255,0.7)" }}>in your DC</div>
              </div>
            </div>

            {/* AWS Cloud side */}
            <div style={{ background: "#1e3a5f25", border: "2px solid #1a73e8", borderRadius: 10, padding: 12, textAlign: "center", minWidth: 160 }}>
              <div style={{ fontSize: 9, color: "#60a5fa", fontWeight: 700, marginBottom: 8 }}>AWS CLOUD</div>
              {[
                { icon: "🪣", label: "Amazon S3", sub: "File & Tape Gateway" },
                { icon: "💾", label: "Amazon EBS", sub: "Volume Gateway snapshots" },
                { icon: "🧊", label: "S3 Glacier", sub: "Long-term archives" },
              ].map(({ icon, label, sub }) => (
                <div key={label} style={{ background: "#1a73e820", border: "1px solid #1a73e840", borderRadius: 6, padding: "5px 8px", marginBottom: 5 }}>
                  <div style={{ fontSize: 12 }}>{icon}</div>
                  <div style={{ fontSize: 10, color: "#60a5fa", fontWeight: 700 }}>{label}</div>
                  <div style={{ fontSize: 8, color: "#888" }}>{sub}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ marginTop: 10, textAlign: "center", fontSize: 11, color: "rgba(255,255,255,0.6)" }}>
            Your apps see familiar local storage → Gateway transparently syncs everything to AWS
          </div>
        </div>

        <H2>The 3 Gateway Types — Deep Dive</H2>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 6 }}>

          {/* S3 File Gateway */}
          <div style={{ border: "1px solid #FF990030", borderRadius: 10, overflow: "hidden" }}>
            <div style={{ background: "#FF9900", padding: "10px 14px", display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 22 }}>🪣</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: 13, color: "white" }}>1. S3 File Gateway</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.85)" }}>On-premises NFS/SMB → stores files in S3</div>
              </div>
            </div>
            <div style={{ padding: "12px 14px", background: "white" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <div>
                  <div style={{ fontSize: 13, color: "#555", lineHeight: 1.6, marginBottom: 8 }}>
                    Your apps write files using NFS or SMB — but they land in S3. Recently accessed files are cached locally for low-latency access. Appears as a standard file server to your systems.
                  </div>
                  <div style={{ fontWeight: 700, fontSize: 11, color: "#CC7A00", marginBottom: 4 }}>How it works:</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                    {["App writes file → Gateway caches locally", "Gateway uploads to S3 in background", "Old files evicted from cache, remain in S3", "Any AWS service can access files in S3"].map((s, i) => (
                      <div key={i} style={{ display: "flex", gap: 6, fontSize: 11.5, color: "#555" }}>
                        <span style={{ color: "#FF9900", fontWeight: 700 }}>{i+1}.</span>{s}
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ background: "#FFF3E0", borderRadius: 8, padding: "10px 12px" }}>
                  <div style={{ fontWeight: 700, fontSize: 11, color: "#CC7A00", marginBottom: 6 }}>🏭 Real Example</div>
                  <div style={{ fontSize: 12, color: "#555", lineHeight: 1.6 }}>
                    A manufacturing company has 20TB of engineering drawings on their on-premises file server.
                    They deploy S3 File Gateway — engineers still save files normally to <code>\fileserver\drawings</code>,
                    but everything lands in S3. They save 70% on storage costs vs on-prem hardware,
                    and any AWS workload (Lambda, Athena) can now process the drawings directly.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Volume Gateway */}
          <div style={{ border: "1px solid #0f9d5830", borderRadius: 10, overflow: "hidden" }}>
            <div style={{ background: "#0f9d58", padding: "10px 14px", display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 22 }}>💾</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: 13, color: "white" }}>2. Volume Gateway</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.85)" }}>Block storage volumes (iSCSI) → backed up as EBS snapshots</div>
              </div>
            </div>
            <div style={{ padding: "12px 14px", background: "white" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <div>
                  <div style={{ fontSize: 13, color: "#555", lineHeight: 1.6, marginBottom: 8 }}>
                    Creates iSCSI block volumes that on-premises servers mount like local disks. Data is backed up to AWS as EBS snapshots. Two modes: Cached (primary in S3, local cache) and Stored (primary local, backup to AWS).
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                    {[
                      { mode: "Cached Mode", icon: "☁️", desc: "Data primarily in S3. Hot data cached locally.", color: "#0f9d58" },
                      { mode: "Stored Mode", icon: "🖥️", desc: "Full data locally. Async backup to S3.", color: "#1a73e8" },
                    ].map(({ mode, icon, desc, color }) => (
                      <div key={mode} style={{ background: color + "10", border: `1px solid ${color}30`, borderRadius: 7, padding: "8px 9px" }}>
                        <div style={{ fontWeight: 700, fontSize: 10.5, color, marginBottom: 3 }}>{icon} {mode}</div>
                        <div style={{ fontSize: 10.5, color: "#555", lineHeight: 1.4 }}>{desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ background: "#e8f5e9", borderRadius: 8, padding: "10px 12px" }}>
                  <div style={{ fontWeight: 700, fontSize: 11, color: "#0f9d58", marginBottom: 6 }}>🏦 Real Example</div>
                  <div style={{ fontSize: 12, color: "#555", lineHeight: 1.6 }}>
                    A regional bank runs Oracle on-premises on iSCSI SAN storage.
                    They deploy Volume Gateway — Oracle still sees local iSCSI disks (no app changes needed),
                    but EBS snapshots are created hourly to AWS. When disaster strikes,
                    they can restore the entire database volume from AWS in minutes.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tape Gateway */}
          <div style={{ border: "1px solid #6a1b9a30", borderRadius: 10, overflow: "hidden" }}>
            <div style={{ background: "#6a1b9a", padding: "10px 14px", display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 22 }}>📼</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: 13, color: "white" }}>3. Tape Gateway</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.85)" }}>Virtual tape library → replaces physical tape drives → stored in S3/Glacier</div>
              </div>
            </div>
            <div style={{ padding: "12px 14px", background: "white" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <div>
                  <div style={{ fontSize: 13, color: "#555", lineHeight: 1.6, marginBottom: 8 }}>
                    If your company uses physical tape drives for backups, Tape Gateway replaces them with <b>virtual tapes</b> stored in S3. Your existing backup software (Veeam, Commvault, Veritas) talks to it exactly as if it were real tape hardware.
                  </div>
                  <div style={{ background: "#EDE7F6", borderRadius: 7, padding: "8px 10px" }}>
                    <div style={{ fontSize: 11, color: "#6a1b9a", fontWeight: 700, marginBottom: 4 }}>Physical tape problems solved:</div>
                    {["Tapes degrade over time", "Physical storage cost", "Slow retrieval (find the tape, load it)", "Lost/damaged tapes = data loss"].map(p => (
                      <div key={p} style={{ fontSize: 11, color: "#555", marginBottom: 2 }}>❌ {p} → ✅ Virtual tape in S3</div>
                    ))}
                  </div>
                </div>
                <div style={{ background: "#EDE7F6", borderRadius: 8, padding: "10px 12px" }}>
                  <div style={{ fontWeight: 700, fontSize: 11, color: "#6a1b9a", marginBottom: 6 }}>🏛️ Real Example</div>
                  <div style={{ fontSize: 12, color: "#555", lineHeight: 1.6 }}>
                    A law firm has 10 years of client files backed up to LTO-7 physical tapes stored in an offsite vault.
                    They deploy Tape Gateway — their Veeam software now writes to virtual tapes instead.
                    Virtual tapes go to S3 (active) or Glacier (archive). Monthly tape storage bill drops from $8,000 to $400.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Callout icon="🎯" label="Exam Tip"
          text="Storage Gateway = hybrid cloud bridge. 3 types: S3 File Gateway (files → S3 via NFS/SMB), Volume Gateway (block storage → EBS snapshots, iSCSI), Tape Gateway (virtual tapes → S3/Glacier, replaces physical tape). Use when: you want cloud storage benefits WITHOUT changing existing on-premises apps." color="#546e7a" />
      </div>
    );

    case "disaster": return (
      <div>
        <Body>
          AWS Elastic Disaster Recovery (AWS DRS) continuously replicates your servers to AWS
          so that when disaster strikes — hardware failure, ransomware, data center flood —
          you can recover in <b>minutes, not days</b>.
        </Body>

        {/* DR Architecture diagram */}
        <H2>📐 How Elastic Disaster Recovery Works</H2>
        <div style={{ background: "#1a1a2e", borderRadius: 12, padding: 16, marginTop: 8, border: "2px solid #d32f2f" }}>
          <div style={{ display: "flex", gap: 14, alignItems: "center", justifyContent: "center", flexWrap: "wrap" }}>
            {/* Primary site */}
            <div style={{ background: "#37474f25", border: "2px solid #607d8b", borderRadius: 10, padding: 12, textAlign: "center" }}>
              <div style={{ fontSize: 9, color: "#90a4ae", fontWeight: 700, marginBottom: 8 }}>PRIMARY SITE (On-prem or cloud)</div>
              {["🖥️ Web Server", "🗄️ Database Server", "⚙️ App Server"].map(s => (
                <div key={s} style={{ background: "rgba(255,255,255,0.08)", borderRadius: 5, padding: "5px 10px", fontSize: 11, color: "rgba(255,255,255,0.8)", marginBottom: 5 }}>{s}</div>
              ))}
              <div style={{ fontSize: 9, color: "#90a4ae", marginTop: 6 }}>Physical, virtual, or cloud</div>
            </div>

            {/* Replication arrow */}
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 10, color: "#4caf50", fontWeight: 700, marginBottom: 4 }}>Continuous</div>
              <div style={{ fontSize: 10, color: "#4caf50", marginBottom: 4 }}>block-level</div>
              <div style={{ fontSize: 16, color: "#4caf50" }}>→→→</div>
              <div style={{ fontSize: 10, color: "#4caf50", marginTop: 4 }}>replication</div>
              <div style={{ fontSize: 8, color: "#888", marginTop: 2 }}>(near zero RPO)</div>
            </div>

            {/* AWS staging */}
            <div style={{ background: "#1e3a5f25", border: "2px solid #1a73e8", borderRadius: 10, padding: 12, textAlign: "center" }}>
              <div style={{ fontSize: 9, color: "#60a5fa", fontWeight: 700, marginBottom: 8 }}>AWS (Staging — low cost)</div>
              <div style={{ background: "#1a73e820", borderRadius: 7, padding: "8px 10px", marginBottom: 6 }}>
                <div style={{ fontSize: 14 }}>🪣</div>
                <div style={{ fontSize: 10, color: "#60a5fa" }}>Replication Servers</div>
                <div style={{ fontSize: 8, color: "#888" }}>Continuously updated</div>
              </div>
              <div style={{ background: "#1a73e820", borderRadius: 7, padding: "8px 10px" }}>
                <div style={{ fontSize: 14 }}>💾</div>
                <div style={{ fontSize: 10, color: "#60a5fa" }}>EBS Snapshots</div>
                <div style={{ fontSize: 8, color: "#888" }}>All your server data</div>
              </div>
              <div style={{ fontSize: 9, color: "#90a4ae", marginTop: 6 }}>Pay only for staging,<br />not full-size recovery instances</div>
            </div>

            {/* Disaster arrow */}
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 12, color: "#d32f2f", fontWeight: 700 }}>⚡ DISASTER</div>
              <div style={{ fontSize: 14, color: "#d32f2f" }}>→</div>
              <div style={{ fontSize: 9, color: "#888" }}>Launch recovery</div>
              <div style={{ fontSize: 9, color: "#4caf50", fontWeight: 700 }}>minutes!</div>
            </div>

            {/* Recovery */}
            <div style={{ background: "#0f9d5815", border: "2px solid #4caf50", borderRadius: 10, padding: 12, textAlign: "center" }}>
              <div style={{ fontSize: 9, color: "#4caf50", fontWeight: 700, marginBottom: 8 }}>RECOVERY (Full-size EC2s)</div>
              {["🖥️ Recovered Web", "🗄️ Recovered DB", "⚙️ Recovered App"].map(s => (
                <div key={s} style={{ background: "#4caf5020", border: "1px solid #4caf5040", borderRadius: 5, padding: "5px 10px", fontSize: 11, color: "rgba(255,255,255,0.8)", marginBottom: 5 }}>{s}</div>
              ))}
              <div style={{ fontSize: 9, color: "#4caf50", marginTop: 6 }}>Exact copy of primary<br />RTO: minutes ✅</div>
            </div>
          </div>
          <div style={{ marginTop: 12, background: "rgba(255,255,255,0.06)", borderRadius: 8, padding: "10px 14px", fontSize: 11.5, color: "rgba(255,255,255,0.7)", lineHeight: 1.65, textAlign: "center" }}>
            <b style={{ color: "#4caf50" }}>RPO</b> (Recovery Point Objective) = seconds to minutes — data loss is minimal.<br />
            <b style={{ color: "#4caf50" }}>RTO</b> (Recovery Time Objective) = minutes — how fast you're back online.
          </div>
        </div>

        <H2>Key Terms — RPO and RTO</H2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 6 }}>
          <div style={{ border: "1px solid #1a73e830", borderTop: "3px solid #1a73e8", borderRadius: 8, padding: "12px" }}>
            <div style={{ fontWeight: 700, fontSize: 13, color: "#1a73e8", marginBottom: 6 }}>⏱️ RPO — Recovery Point Objective</div>
            <div style={{ fontSize: 12.5, color: "#555", lineHeight: 1.6 }}>
              <b>How much data can you afford to lose?</b><br />
              If disaster happens at 3pm and RPO = 1 hour, you can lose at most the last hour of data (restore from 2pm backup).<br /><br />
              AWS DRS achieves <b>seconds-to-minutes RPO</b> with continuous replication.
            </div>
          </div>
          <div style={{ border: "1px solid #0f9d5830", borderTop: "3px solid #0f9d58", borderRadius: 8, padding: "12px" }}>
            <div style={{ fontWeight: 700, fontSize: 13, color: "#0f9d58", marginBottom: 6 }}>⏱️ RTO — Recovery Time Objective</div>
            <div style={{ fontSize: 12.5, color: "#555", lineHeight: 1.6 }}>
              <b>How quickly can you be back online?</b><br />
              If RTO = 4 hours, your systems must be back up within 4 hours of disaster.<br /><br />
              AWS DRS achieves <b>minutes RTO</b> — launch full-size EC2s from staging.
            </div>
          </div>
        </div>

        <H2>🎯 Real-World Examples</H2>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 6 }}>
          {[
            { industry: "🏥 Healthcare — Hospital Systems", color: "#d32f2f",
              problem: "Patient records on on-premises servers. Ransomware attack encrypts all hospital data at 2am. ICU can't access patient charts.",
              solution: "AWS DRS continuously replicates hospital servers to AWS. Within 15 minutes of attack, IT recovers all servers to pre-attack state. Doctors access patient records again. No ransom paid.",
              rpo: "~5 minutes", rto: "~15 minutes" },
            { industry: "🏦 Financial Services — Regional Bank", color: "#1a73e8",
              problem: "Core banking transaction servers go down due to data center flooding. Thousands of ATMs offline. Customers can't access funds.",
              solution: "Bank failover to AWS recovery instances in 10 minutes. Transaction processing restored. ATMs back online. Regulatory compliance maintained through continuous replication.",
              rpo: "~1 minute", rto: "~10 minutes" },
            { industry: "🏭 Manufacturing — Global Factory", color: "#FF9900",
              problem: "Production planning ERP system goes down during peak season. Factory floor halts. Supply chain disrupted. Every hour offline = $500K lost.",
              solution: "AWS DRS launches recovery ERP servers in 20 minutes. Factory operations resume. Non-disruptive DR testing done monthly to validate recovery procedures.",
              rpo: "~2 minutes", rto: "~20 minutes" },
          ].map(({ industry, color, problem, solution, rpo, rto }) => (
            <div key={industry} style={{ border: `1px solid ${color}30`, borderLeft: `4px solid ${color}`, borderRadius: 9, padding: "12px 14px" }}>
              <div style={{ fontWeight: 700, fontSize: 13, color, marginBottom: 8 }}>{industry}</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 8 }}>
                <div style={{ background: "#fce4ec", borderRadius: 7, padding: "8px 10px" }}>
                  <div style={{ fontWeight: 700, fontSize: 10.5, color: "#d32f2f", marginBottom: 3 }}>❌ The Disaster</div>
                  <div style={{ fontSize: 12, color: "#555", lineHeight: 1.5 }}>{problem}</div>
                </div>
                <div style={{ background: "#e8f5e9", borderRadius: 7, padding: "8px 10px" }}>
                  <div style={{ fontWeight: 700, fontSize: 10.5, color: "#0f9d58", marginBottom: 3 }}>✅ AWS DRS Recovery</div>
                  <div style={{ fontSize: 12, color: "#555", lineHeight: 1.5 }}>{solution}</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <span style={{ fontSize: 11, background: color + "15", color, border: `1px solid ${color}30`, borderRadius: 10, padding: "3px 10px", fontWeight: 700 }}>RPO: {rpo}</span>
                <span style={{ fontSize: 11, background: "#0f9d5815", color: "#0f9d58", border: "1px solid #0f9d5830", borderRadius: 10, padding: "3px 10px", fontWeight: 700 }}>RTO: {rto}</span>
              </div>
            </div>
          ))}
        </div>

        <H2>Benefits vs Traditional DR</H2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 6 }}>
          <div style={{ background: "#fce4ec", borderRadius: 8, padding: "10px 12px", border: "1px solid #d32f2f30" }}>
            <div style={{ fontWeight: 700, fontSize: 12, color: "#d32f2f", marginBottom: 6 }}>❌ Traditional DR (secondary DC)</div>
            {["Build and maintain a second data center", "Pay for hardware 24/7 even if never used", "Manual failover takes hours or days", "Expensive quarterly DR tests", "Limited to fixed capacity at secondary site"].map(p => <div key={p} style={{ fontSize: 12, color: "#555", marginBottom: 3 }}>• {p}</div>)}
          </div>
          <div style={{ background: "#e8f5e9", borderRadius: 8, padding: "10px 12px", border: "1px solid #0f9d5830" }}>
            <div style={{ fontWeight: 700, fontSize: 12, color: "#0f9d58", marginBottom: 6 }}>✅ AWS Elastic DR</div>
            {["No secondary data center needed", "Pay only for low-cost staging (not full servers)", "Automated failover in minutes", "Non-disruptive testing anytime", "Scale recovery instances up/down as needed"].map(p => <div key={p} style={{ fontSize: 12, color: "#555", marginBottom: 3 }}>• {p}</div>)}
          </div>
        </div>

        <Callout icon="🎯" label="Exam Tip"
          text="Elastic Disaster Recovery = continuous block-level replication of physical/virtual/cloud servers to AWS. RPO = seconds/minutes (how much data loss). RTO = minutes (how fast back online). Key benefit: eliminate expensive secondary data centers. Non-disruptive testing. Use cases: healthcare, financial, manufacturing — any business-critical system." color="#d32f2f" />
      </div>
    );

    case "compare": return (
      <div>
        <Body>
          This is the hardest part of Module 6 — knowing WHICH storage service to use WHEN.
          Here are the <b>real-world scenarios from the course</b>, plus a complete decision guide.
        </Body>

        {/* Three coffee shop scenarios */}
        <H2>☕ Cloud in Real Life — 3 Scenarios</H2>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 6 }}>
          {[
            {
              scenario: "Scenario 1: Coffee Shop Website",
              color: "#FF9900", icon: "🌐",
              description: "The coffee shop hosts a website with HTML, CSS, JavaScript, product images, and promotional videos. Traffic spikes on weekends.",
              question: "Which storage service?",
              answer: "Amazon S3",
              why: [
                "Static files (HTML, CSS, images, videos) = objects → S3 is perfect",
                "S3 auto-scales with any traffic spike — no configuration needed",
                "Enable S3 static website hosting → instant website",
                "Pay only for storage used + data transferred out",
                "CloudFront CDN on top → global fast delivery",
              ],
              notThis: "NOT EBS (no EC2 needed). NOT EFS (not shared file access). NOT Instance Store (not persistent).",
            },
            {
              scenario: "Scenario 2: Fitness App — Database Bottleneck",
              color: "#0f9d58", icon: "🏋️",
              description: "A fitness app lets members book classes. The database (running on EC2) is struggling with read/write performance. Popular classes fill up in seconds.",
              question: "Which storage + optimization?",
              answer: "Amazon EBS (io2 Provisioned IOPS SSD)",
              why: [
                "Database running on EC2 needs block-level storage — only EBS provides this",
                "Current volume type (gp2/gp3) not performant enough for high-IOPS workload",
                "Migrate to io2 Provisioned IOPS SSD — highest performance for databases",
                "Consistent low-latency reads/writes — critical for booking class spots",
                "EBS volume can be resized and re-typed without stopping the instance",
              ],
              notThis: "NOT S3 (object storage, not designed for rapid continuous rewrite operations databases require). NOT EFS (shared file system, not block-level DB storage).",
            },
            {
              scenario: "Scenario 3: Automotive Repair Chain",
              color: "#6a1b9a", icon: "🔧",
              description: "50 mechanic shops across the country need simultaneous real-time access to the same HD repair videos, technical diagrams, and diagnostic manuals from multiple devices.",
              question: "Which storage service?",
              answer: "Amazon EFS",
              why: [
                "Multiple locations accessing THE SAME files simultaneously → needs shared file system",
                "EFS supports thousands of concurrent NFS connections across multiple EC2s",
                "Scales to petabytes automatically as media library grows",
                "Multi-AZ redundancy — data survives AZ failure",
                "Low-latency performance for large media file access",
              ],
              notThis: "NOT S3 (object storage — not real-time shared file system access). NOT EBS (single instance only — can't share across 50 locations). NOT Instance Store (temporary).",
            },
          ].map(({ scenario, color, icon, description, question, answer, why, notThis }) => (
            <div key={scenario} style={{ border: `1px solid ${color}30`, borderRadius: 12, overflow: "hidden" }}>
              <div style={{ background: color, padding: "10px 14px" }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: "white" }}>{icon} {scenario}</div>
              </div>
              <div style={{ padding: "12px 14px", background: "white" }}>
                <div style={{ fontSize: 13, color: "#555", lineHeight: 1.65, marginBottom: 10 }}>{description}</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 12, color, marginBottom: 5 }}>❓ {question}</div>
                    <div style={{ background: color + "18", border: `2px solid ${color}`, borderRadius: 8, padding: "8px 12px", marginBottom: 8 }}>
                      <div style={{ fontWeight: 800, fontSize: 14, color }}>✅ {answer}</div>
                    </div>
                    <div style={{ fontWeight: 700, fontSize: 11, color, marginBottom: 4 }}>Why:</div>
                    {why.map(r => <div key={r} style={{ fontSize: 11.5, color: "#555", marginBottom: 3 }}>→ {r}</div>)}
                  </div>
                  <div style={{ background: "#fce4ec", borderRadius: 8, padding: "10px 12px" }}>
                    <div style={{ fontWeight: 700, fontSize: 11, color: "#d32f2f", marginBottom: 5 }}>❌ Why not others?</div>
                    <div style={{ fontSize: 11.5, color: "#555", lineHeight: 1.6 }}>{notThis}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Master decision table */}
        <H2>🎯 Complete Decision Guide</H2>
        <div style={{ borderRadius: 8, overflow: "hidden", border: "1px solid #e0e0e0", marginTop: 6 }}>
          {[
            ["If you need…", "Use this", "Key reason"],
            ["Fast temporary storage for EC2 processing", "Instance Store", "Physically attached, fastest possible, but temporary"],
            ["Persistent disk for EC2 database", "EBS (io2/gp3)", "Block storage, survives stops, high IOPS"],
            ["Back up EBS volumes automatically", "EBS Snapshots + DLM", "Incremental, stored in S3, automated via DLM"],
            ["Store files/images/videos/backups at any scale", "Amazon S3", "Object storage, unlimited, 11-9s durability"],
            ["Host a static website cheaply", "Amazon S3", "Static website hosting feature, no server needed"],
            ["Archive data for 7+ years (compliance)", "S3 Glacier Deep Archive", "Cheapest storage, 12hr retrieval, compliance-ready"],
            ["Shared file system for multiple Linux EC2s", "Amazon EFS", "NFS, multi-AZ, auto-scales, concurrent access"],
            ["Windows file server in AWS", "FSx for Windows", "SMB, Active Directory, Windows-native"],
            ["HPC / ML training workloads needing speed", "FSx for Lustre", "Sub-ms latency, S3 integration, parallel I/O"],
            ["On-premises apps access cloud storage", "Storage Gateway", "Hybrid bridge, existing protocols unchanged"],
            ["Replace physical tape backups with cloud", "Storage Gateway (Tape)", "Virtual tapes in S3/Glacier, works with existing software"],
            ["Disaster recovery (minutes RTO/RPO)", "Elastic Disaster Recovery", "Continuous replication, launch recovery in minutes"],
          ].map((row, i) => (
            <div key={i} style={{
              display: "grid", gridTemplateColumns: "1.5fr 1fr 1.5fr",
              borderBottom: i < 12 ? "1px solid #f0f0f0" : "none",
              background: i === 0 ? "#263238" : i % 2 === 0 ? "#fafafa" : "white",
            }}>
              {row.map((cell, j) => (
                <div key={j} style={{
                  padding: "8px 10px", fontSize: i === 0 ? 11 : 12,
                  fontWeight: i === 0 || j === 1 ? 700 : 400,
                  color: i === 0 ? accent : j === 1 ? "#0f9d58" : j === 0 ? "#333" : "#555",
                  borderRight: j < 2 ? "1px solid #f0f0f0" : "none",
                  lineHeight: 1.45,
                }}>{cell}</div>
              ))}
            </div>
          ))}
        </div>

        {/* S3 vs EBS vs EFS summary */}
        <H2>📊 S3 vs EBS vs EFS — The Big Three Compared</H2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginTop: 6 }}>
          {[
            { service: "Amazon S3", icon: "🪣", color: "#FF9900", type: "Object Storage",
              access: "Any app, any device, internet", scale: "Unlimited (auto)", protocol: "HTTP/HTTPS",
              analogy: "Google Drive — store anything, access from anywhere",
              bestFor: ["Images, videos, documents", "Backups and archives", "Static websites", "Data lakes", "Any file that doesn't need real-time byte-level editing"] },
            { service: "Amazon EBS", icon: "💾", color: "#0f9d58", type: "Block Storage",
              access: "ONE EC2 instance only", scale: "Up to 64TB (manual resize)", protocol: "Internal to EC2",
              analogy: "Hard drive in your laptop — fast, local, one user",
              bestFor: ["Databases (MySQL, PostgreSQL)", "OS boot volumes", "App requiring frequent small writes", "Low-latency transactional workloads"] },
            { service: "Amazon EFS", icon: "📁", color: "#1a73e8", type: "File Storage (NFS)",
              access: "MANY EC2 instances simultaneously", scale: "Petabytes (auto)", protocol: "NFS (Linux only)",
              analogy: "Shared network drive — whole team accesses same files",
              bestFor: ["Shared content repositories", "Multiple web servers same files", "Dev environments with shared code", "Media processing pipelines"] },
          ].map(({ service, icon, color, type, access, scale, protocol, analogy, bestFor }) => (
            <div key={service} style={{ border: `1px solid ${color}30`, borderTop: `3px solid ${color}`, borderRadius: 9, padding: "12px" }}>
              <div style={{ fontSize: 24, marginBottom: 6 }}>{icon}</div>
              <div style={{ fontWeight: 700, fontSize: 13, color, marginBottom: 3 }}>{service}</div>
              <div style={{ fontSize: 10.5, color: "#888", marginBottom: 8 }}>{type}</div>
              {[["Access", access], ["Scale", scale], ["Protocol", protocol]].map(([k, v]) => (
                <div key={k} style={{ fontSize: 11, color: "#555", marginBottom: 3 }}><b style={{ color }}>{k}:</b> {v}</div>
              ))}
              <div style={{ fontSize: 11, fontStyle: "italic", color: color, margin: "6px 0", padding: "5px 7px", background: color + "10", borderRadius: 5 }}>💡 {analogy}</div>
              <div style={{ fontWeight: 700, fontSize: 10.5, color, marginBottom: 3 }}>Best for:</div>
              {bestFor.map(b => <div key={b} style={{ fontSize: 10.5, color: "#555", marginBottom: 2 }}>• {b}</div>)}
            </div>
          ))}
        </div>

        <Callout icon="🎯" label="Final Exam Tip — The Three Rules"
          text="Rule 1: If data is accessed by ONE EC2 instance and needs block-level access → EBS. Rule 2: If data is accessed by MULTIPLE EC2 instances simultaneously → EFS. Rule 3: If data is files/objects accessed from anywhere (not just EC2) → S3. Everything else: Instance Store (temp), FSx (specific file systems), Storage Gateway (hybrid), Elastic DR (disaster recovery)." color={accent} />
      </div>
    );

    default: return null;
  }
}


// ─── Cheat Sheet ──────────────────────────────────────────────────────────────
const cheatRows = [
  ["Block Storage", "Breaks data into blocks. Fast, updatable. EC2 Instance Store + EBS."],
  ["Object Storage", "Whole objects. Unlimited scale. S3 — replace whole object on update."],
  ["File Storage", "Hierarchical, shared. EFS (Linux), FSx (Windows/HPC)."],
  ["Instance Store", "Temporary. Physically attached. LOST on stop/terminate. Buffers, caches."],
  ["EBS", "Persistent block storage. Survives EC2 stop. Attached to ONE instance. IOPS tunable."],
  ["EBS Snapshots", "Incremental backups. First = full, subsequent = changes only. Stored in S3."],
  ["Data Lifecycle Mgr", "Automates EBS snapshot creation, retention, deletion. Policy-based."],
  ["S3", "Object storage. Buckets + objects. Unlimited scale. 11 nines durability. Private by default."],
  ["S3 Object", "Data + Key (unique name) + Metadata. Max 5TB per object."],
  ["S3 Standard", "Frequent access. General purpose. Highest cost."],
  ["S3 Intelligent-Tiering", "Unknown access patterns. Auto-moves between tiers."],
  ["S3 Standard-IA", "Infrequent access. Fast retrieval. Per-GB retrieval fee."],
  ["S3 One Zone-IA", "Single AZ only. 20% cheaper. Risk: AZ loss = data loss."],
  ["S3 Glacier Instant", "Rare access (quarterly). Millisecond retrieval. 68% cheaper than IA."],
  ["S3 Glacier Flexible", "1-2x/year. 1 min–12 hr retrieval. Bulk = no extra cost."],
  ["S3 Glacier Deep Archive", "Cheapest. 12hr retrieval. 7-10yr compliance archives."],
  ["S3 Lifecycle", "Rules to auto-transition or expire objects between storage classes."],
  ["S3 Bucket Policy", "JSON policy on bucket. Controls who can access."],
  ["S3 Private by default", "Nothing is public until you explicitly allow it. Block Public Access overrides all."],
  ["EFS", "Shared NFS. Multiple EC2s simultaneously. Linux only. Auto-scales."],
  ["FSx Windows", "Managed SMB file system. Windows apps, Active Directory."],
  ["FSx Lustre", "High performance. HPC, ML. Sub-ms latency. S3 integration."],
  ["Storage Gateway", "Hybrid bridge. On-prem apps access cloud storage via NFS/SMB/iSCSI."],
];

export default function Module6() {
  const [active, setActive] = useState("intro");
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
          width: 42, height: 42, borderRadius: 10, background: "#00838f20",
          border: "1.5px solid #00838f50", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22,
        }}>💾</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, fontSize: 15 }}>Module 6 — AWS Storage</div>
          <div style={{ fontSize: 12, color: "#666", marginTop: 2 }}>
            EBS · S3 · EFS · FSx · Snapshots · Storage Classes · Security
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
            <span style={{ fontWeight: 700, fontSize: 12, color: accent }}>⚡ Module 6 Quick-Recall Cheat Sheet</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", background: "white" }}>
            {cheatRows.map(([k, v], i) => (
              <div key={i} style={{
                display: "flex", gap: 6, padding: "5px 12px",
                borderBottom: i < cheatRows.length - 2 ? "1px solid #f0f0f0" : "none",
                borderRight: i % 2 === 0 ? "1px solid #f0f0f0" : "none",
                background: Math.floor(i / 2) % 2 === 0 ? "white" : "#fafafa",
              }}>
                <span style={{ fontWeight: 700, fontSize: 10.5, color: accent, flexShrink: 0, minWidth: 130 }}>{k}</span>
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