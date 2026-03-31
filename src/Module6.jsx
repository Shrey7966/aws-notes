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
  { id: "other-storage", emoji: "🌐", title: "EFS, FSx & More", badge: "File Storage + Hybrid", badgeColor: "#546e7a" },
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
    case "other-storage": return (
      <div>
        <Body>
          Beyond EBS and S3, AWS offers file storage services for shared access, and hybrid services
          that bridge on-premises and cloud storage.
        </Body>

        <H2>📁 Amazon EFS — Elastic File System</H2>
        <div style={{ border: "1px solid #0f9d5830", borderRadius: 10, overflow: "hidden", marginTop: 6 }}>
          <div style={{ background: "#0f9d58", padding: "10px 14px", display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 22 }}>📁</span>
            <div style={{ fontWeight: 700, fontSize: 14, color: "white" }}>Amazon EFS — Elastic File System</div>
          </div>
          <div style={{ padding: "12px 14px", background: "white" }}>
            <div style={{ fontSize: 13, color: "#555", lineHeight: 1.65, marginBottom: 10 }}>
              A <b>fully managed NFS (Network File System)</b> that can be mounted by multiple EC2 instances simultaneously.
              Unlike EBS (one volume, one instance), EFS can be shared across dozens of instances, even across AZs.
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <KV rows={[
                ["Type", "Network file system (NFS)", "#0f9d58"],
                ["Access", "Multiple EC2 instances simultaneously", "#0f9d58"],
                ["Scaling", "Grows/shrinks automatically as you add/remove files", "#1a73e8"],
                ["Compatibility", "Linux/Unix. NFS protocol. No Windows.", "#FF9900"],
                ["Use cases", "Content management, shared app data, home directories", "#6a1b9a"],
              ]} />
              <div style={{ background: "#e8f5e9", borderRadius: 8, padding: "10px 12px" }}>
                <div style={{ fontWeight: 700, fontSize: 11, color: "#0f9d58", marginBottom: 6 }}>💡 EBS vs EFS</div>
                <div style={{ fontSize: 12, color: "#555", lineHeight: 1.65 }}>
                  <b>EBS:</b> One volume → One EC2 instance. Like a USB drive attached to your laptop.<br /><br />
                  <b>EFS:</b> One file system → Many EC2 instances. Like a shared network drive that everyone in the office connects to.
                </div>
              </div>
            </div>
          </div>
        </div>

        <H2>🪟 Amazon FSx — Managed File Storage for Popular File Systems</H2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 6 }}>
          {[
            { name: "FSx for Windows File Server", icon: "🪟", color: "#0078d4", desc: "Fully managed Windows file system. SMB protocol. Active Directory integration. Perfect for Windows workloads migrating to AWS.", use: "Windows apps, SQL Server, home directories" },
            { name: "FSx for Lustre", icon: "⚡", color: "#FF9900", desc: "High-performance file system for compute-intensive workloads. Sub-millisecond latency. Integrates with S3.", use: "Machine learning, HPC, video processing, financial simulations" },
          ].map(({ name, icon, color, desc, use }) => (
            <div key={name} style={{ border: `1px solid ${color}30`, borderTop: `3px solid ${color}`, borderRadius: 9, padding: "12px" }}>
              <div style={{ fontSize: 22, marginBottom: 4 }}>{icon}</div>
              <div style={{ fontWeight: 700, fontSize: 12, color, marginBottom: 5 }}>{name}</div>
              <div style={{ fontSize: 12, color: "#555", lineHeight: 1.55, marginBottom: 6 }}>{desc}</div>
              <div style={{ fontSize: 11, color, fontStyle: "italic" }}>🎯 {use}</div>
            </div>
          ))}
        </div>

        <H2>🔗 AWS Storage Gateway — Hybrid Cloud Bridge</H2>
        <div style={{ border: "1px solid #546e7a30", borderRadius: 10, overflow: "hidden", marginTop: 6 }}>
          <div style={{ background: "#546e7a", padding: "10px 14px" }}>
            <div style={{ fontWeight: 700, fontSize: 13, color: "white" }}>🏢 AWS Storage Gateway</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.8)" }}>Gives on-premises apps access to virtually unlimited cloud storage</div>
          </div>
          <div style={{ padding: "12px 14px", background: "white" }}>
            <div style={{ fontSize: 13, color: "#555", lineHeight: 1.65, marginBottom: 10 }}>
              A hybrid service that connects your <b>on-premises data center</b> to AWS storage.
              Your local apps use familiar protocols (NFS, SMB, iSCSI) — but data is stored in the cloud.
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
              {[
                { type: "S3 File Gateway", icon: "🪣", desc: "On-prem apps access S3 using NFS/SMB. Files cached locally for low-latency access.", color: "#FF9900" },
                { type: "Volume Gateway", icon: "💾", desc: "Block storage volumes for on-prem apps, backed by S3. Supports cached/stored modes.", color: "#0f9d58" },
                { type: "Tape Gateway", icon: "📼", desc: "Replace physical tape backups with virtual tapes stored in S3 Glacier. Seamless migration.", color: "#6a1b9a" },
              ].map(({ type, icon, desc, color }) => (
                <div key={type} style={{ border: `1px solid ${color}30`, borderTop: `3px solid ${color}`, borderRadius: 8, padding: "10px" }}>
                  <div style={{ fontSize: 18, marginBottom: 4 }}>{icon}</div>
                  <div style={{ fontWeight: 700, fontSize: 11, color, marginBottom: 4 }}>{type}</div>
                  <div style={{ fontSize: 11, color: "#555", lineHeight: 1.5 }}>{desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <H2>📊 Complete Storage Comparison</H2>
        <div style={{ borderRadius: 8, overflow: "hidden", border: "1px solid #e0e0e0", marginTop: 6 }}>
          {[
            ["Service", "Type", "Access pattern", "Key differentiator"],
            ["Instance Store", "Block", "One EC2 only", "Fastest, but temporary — lost on stop"],
            ["Amazon EBS", "Block", "One EC2 only", "Persistent block storage, IOPS tunable"],
            ["Amazon S3", "Object", "Global, any app", "Unlimited scale, 11-nines durability"],
            ["Amazon EFS", "File (NFS)", "Many EC2s at once", "Shared, auto-scales, Linux only"],
            ["Amazon FSx Windows", "File (SMB)", "Many servers", "Windows-native, AD integration"],
            ["Amazon FSx Lustre", "File (Lustre)", "HPC clusters", "Sub-ms latency, integrates with S3"],
            ["Storage Gateway", "Hybrid", "On-premises apps", "Bridge: on-prem access to cloud storage"],
          ].map((row, i) => (
            <div key={i} style={{
              display: "grid", gridTemplateColumns: "1fr 0.7fr 1fr 1.5fr",
              borderBottom: i < 7 ? "1px solid #f0f0f0" : "none",
              background: i === 0 ? "#263238" : i % 2 === 0 ? "#fafafa" : "white",
            }}>
              {row.map((cell, j) => (
                <div key={j} style={{
                  padding: "7px 10px", fontSize: i === 0 ? 11 : 12,
                  fontWeight: i === 0 || j === 0 ? 700 : 400,
                  color: i === 0 ? accent : j === 0 ? "#0f9d58" : "#555",
                  borderRight: j < 3 ? "1px solid #f0f0f0" : "none",
                }}>{cell}</div>
              ))}
            </div>
          ))}
        </div>

        <Callout icon="🎯" label="Exam Tip"
          text="EFS = shared NFS for MULTIPLE Linux EC2 instances simultaneously, auto-scales. EBS = one EC2 only. FSx for Windows = SMB protocol, Windows workloads. FSx for Lustre = high-performance HPC. Storage Gateway = hybrid cloud bridge — on-premises apps access S3/EBS through familiar protocols." color="#546e7a" />
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
