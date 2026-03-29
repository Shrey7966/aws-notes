import { useState } from "react";

const QUESTIONS = [
  // ── MODULE 1: Cloud Foundations ─────────────────────────────────────────────
  {
    id: 1, module: "Module 1", difficulty: "Easy",
    topic: "Cloud Definition",
    q: "What is the definition of cloud computing according to AWS?",
    options: [
      "Storing files on a USB drive connected to the internet",
      "On-demand delivery of IT resources over the internet with pay-as-you-go pricing",
      "A network of physical servers owned exclusively by one company",
      "Software installed locally on your computer via the internet",
    ],
    answer: 1,
    why: "Cloud computing = on-demand IT resources over the internet with pay-as-you-go. You don't own hardware — you rent capacity from AWS. This is the foundational AWS definition.",
  },
  {
    id: 2, module: "Module 1", difficulty: "Easy",
    topic: "Client-Server Model",
    q: "In the AWS coffee shop analogy, what does the CUSTOMER represent?",
    options: [
      "An AWS data center",
      "An Amazon EC2 instance",
      "A client making a request",
      "A load balancer",
    ],
    answer: 2,
    why: "The customer = the client making a request. The cashier = the server (EC2) that processes it. This models how client-server computing works in the cloud.",
  },
  {
    id: 3, module: "Module 1", difficulty: "Medium",
    topic: "6 Benefits of Cloud",
    q: "A startup wants to test their new app globally without upfront hardware investment. Which cloud benefit does this best describe?",
    options: [
      "Stop guessing capacity",
      "Trade capital expense for variable expense",
      "Go global in minutes",
      "Benefit from massive economies of scale",
    ],
    answer: 1,
    why: "Trading CapEx (capital expenditure — buying hardware upfront) for variable expense means you only pay for what you use. No upfront investment needed. 'Go global in minutes' is close but that's about geographic reach, not investment model.",
  },
  {
    id: 4, module: "Module 1", difficulty: "Medium",
    topic: "Shared Responsibility Model",
    q: "Under the AWS Shared Responsibility Model, which of the following is the CUSTOMER's responsibility?",
    options: [
      "Physical security of data centers",
      "Hardware maintenance and replacement",
      "Patching the hypervisor",
      "Configuring security groups and encrypting customer data",
    ],
    answer: 3,
    why: "AWS is responsible FOR the cloud (hardware, hypervisor, physical security). Customers are responsible IN the cloud — including security groups, IAM, encryption, and OS patching on EC2. Security groups are always the customer's job.",
  },
  {
    id: 5, module: "Module 1", difficulty: "Hard",
    topic: "Shared Responsibility Model",
    q: "A company uses Amazon RDS (managed database). Who is responsible for patching the database engine?",
    options: [
      "The customer — they manage all database patching",
      "AWS — because RDS is a managed service, AWS handles the DB engine patching",
      "A third-party vendor selected by the customer",
      "Both AWS and the customer share this equally",
    ],
    answer: 1,
    why: "For managed services like RDS, AWS takes on more responsibility — including patching the database engine and OS. The customer is still responsible for their data, who can access it, and DB-level security settings. This is a key exam distinction: EC2 = you patch OS. RDS = AWS patches OS + DB engine.",
  },
  {
    id: 6, module: "Module 1", difficulty: "Medium",
    topic: "Global Infrastructure",
    q: "What is the relationship between AWS Availability Zones and AWS Regions?",
    options: [
      "Each Availability Zone contains multiple Regions",
      "Availability Zones and Regions are the same thing",
      "Each Region contains multiple Availability Zones",
      "Availability Zones are only used for backup purposes",
    ],
    answer: 2,
    why: "Hierarchy: Region → Availability Zones → Data Centers. A Region (e.g., us-east-1) has 3+ AZs. Each AZ has one or more data centers. AZs within a Region are physically separate but connected by low-latency fiber.",
  },
  {
    id: 7, module: "Module 1", difficulty: "Hard",
    topic: "Pay-as-you-go",
    q: "A company runs a website with heavy traffic on weekdays and almost none on weekends. What is the PRIMARY cloud advantage here?",
    options: [
      "Go global in minutes",
      "Massive economies of scale",
      "Stop spending money running and maintaining data centers",
      "Stop guessing capacity — scale resources to match actual demand",
    ],
    answer: 3,
    why: "'Stop guessing capacity' means you no longer over-provision or under-provision. You auto-scale up on weekdays and down on weekends, paying only for what you use. With physical hardware you'd need to buy for peak demand and pay for it 24/7.",
  },

  // ── MODULE 2: EC2, Scaling & Messaging ─────────────────────────────────────
  {
    id: 8, module: "Module 2", difficulty: "Easy",
    topic: "Amazon EC2",
    q: "What does EC2 stand for and what does it provide?",
    options: [
      "Elastic Container Cloud — provides managed Docker containers",
      "Elastic Compute Cloud — provides resizable virtual servers in the cloud",
      "Elastic Cost Calculator — provides billing estimates for AWS",
      "Enterprise Cloud Computing — provides physical dedicated servers",
    ],
    answer: 1,
    why: "EC2 = Elastic Compute Cloud. It provides virtual servers (instances) on demand. 'Elastic' means you can resize them. You pay only while they're running. Not physical hardware — virtual machines.",
  },
  {
    id: 9, module: "Module 2", difficulty: "Medium",
    topic: "EC2 Instance Types",
    q: "A company is running a large in-memory Redis cache that stores millions of user sessions. Which EC2 instance family is most appropriate?",
    options: [
      "Compute Optimized (c-family) — for fast CPU calculations",
      "General Purpose (t/m family) — balanced workloads",
      "Memory Optimized (r/x family) — for large datasets in RAM",
      "Storage Optimized (i/d family) — for high disk I/O",
    ],
    answer: 2,
    why: "Redis = in-memory cache = holding massive datasets in RAM = Memory Optimized (r, x families). Memory Optimized instances have large RAM capacity. Compute Optimized is for heavy calculations (CPU-bound). Rule: holding data = RAM = Memory Optimized.",
  },
  {
    id: 10, module: "Module 2", difficulty: "Medium",
    topic: "EC2 Pricing",
    q: "A company has a predictable, steady-state workload running 24/7 for 3 years. Which EC2 pricing model provides the MAXIMUM cost savings?",
    options: [
      "On-Demand Instances",
      "Spot Instances",
      "Reserved Instances (1-year or 3-year term)",
      "Dedicated Hosts",
    ],
    answer: 2,
    why: "Reserved Instances give up to 72% savings vs On-Demand for predictable, steady workloads. 3-year term saves more than 1-year. Spot Instances save up to 90% but can be INTERRUPTED — wrong for steady 24/7 workloads. On-Demand = full price.",
  },
  {
    id: 11, module: "Module 2", difficulty: "Hard",
    topic: "EC2 Pricing",
    q: "A batch processing job runs 4 hours every night and can tolerate interruptions. Which pricing model is BEST?",
    options: [
      "On-Demand — flexibility when needed",
      "Spot Instances — up to 90% savings, tolerates interruption",
      "Reserved Instances — commit for 1 year",
      "Dedicated Host — physical server isolation",
    ],
    answer: 1,
    why: "Spot Instances are perfect here: the job runs periodically (not 24/7), it can tolerate interruption (AWS gives 2-minute warning before reclaiming), and the savings are up to 90%. Reserved Instances need 1-3 year commitment — wrong for intermittent jobs.",
  },
  {
    id: 12, module: "Module 2", difficulty: "Medium",
    topic: "Auto Scaling",
    q: "What are the THREE key configuration values for Amazon EC2 Auto Scaling?",
    options: [
      "CPU, RAM, and Disk",
      "Minimum, Desired, and Maximum capacity",
      "On-Demand, Spot, and Reserved counts",
      "Primary, Secondary, and Failover instances",
    ],
    answer: 1,
    why: "Auto Scaling uses: Minimum (floor — always running, prevents scaling to zero), Desired (target — what you want right now), Maximum (ceiling — cost control cap). These three values control the scaling behavior.",
  },
  {
    id: 13, module: "Module 2", difficulty: "Medium",
    topic: "Elastic Load Balancing",
    q: "What is the PRIMARY purpose of Elastic Load Balancing (ELB)?",
    options: [
      "To store static files close to users globally",
      "To distribute incoming network traffic evenly across multiple EC2 instances",
      "To automatically create and delete EC2 instances",
      "To encrypt data in transit between users and servers",
    ],
    answer: 1,
    why: "ELB distributes incoming traffic across healthy EC2 instances. It prevents any single server from being overloaded. ELB and Auto Scaling work together: Auto Scaling adjusts the number of instances, ELB routes traffic to healthy ones.",
  },
  {
    id: 14, module: "Module 2", difficulty: "Hard",
    topic: "SQS vs SNS",
    q: "An e-commerce app publishes an 'order placed' event and needs to simultaneously trigger payment processing, inventory update, AND send a confirmation email. Which AWS service pattern is BEST?",
    options: [
      "SQS only — put everything in one queue",
      "SNS only — publish to a topic, all three systems subscribe",
      "EventBridge only — route events with complex rules",
      "Three separate SQS queues with no messaging service",
    ],
    answer: 1,
    why: "SNS (pub/sub) is perfect for fan-out: one message published to an SNS topic instantly delivers to ALL subscribers simultaneously. Payment, inventory, and email each subscribe to the same topic. SQS alone delivers to ONE consumer per message — wrong for fan-out.",
  },
  {
    id: 15, module: "Module 2", difficulty: "Hard",
    topic: "Decoupling",
    q: "A frontend service directly calls a backend service. When the backend becomes slow, the frontend also slows down. What architecture pattern fixes this?",
    options: [
      "Add more EC2 instances to the backend",
      "Use a larger EC2 instance type",
      "Introduce an SQS queue between frontend and backend to decouple them",
      "Use Reserved Instances to reduce cost",
    ],
    answer: 2,
    why: "This is tight coupling — a direct dependency. Adding an SQS queue decouples them: frontend puts messages in the queue, backend processes at its own pace. If backend slows down, messages wait in the queue — frontend is unaffected. This is the AWS recommended pattern.",
  },

  // ── MODULE 3: Serverless, Containers & Compute ───────────────────────────────
  {
    id: 16, module: "Module 3", difficulty: "Easy",
    topic: "Serverless",
    q: "Which statement BEST describes 'serverless' computing?",
    options: [
      "There are literally no servers — code runs on thin air",
      "AWS manages the servers, so you focus only on your code",
      "Your application runs entirely on your local machine",
      "Serverless means free — you pay nothing",
    ],
    answer: 1,
    why: "Serverless doesn't mean no servers — it means YOU don't see, manage, or patch them. AWS handles all infrastructure. You focus on writing code. You still pay, but only per execution (not for idle time).",
  },
  {
    id: 17, module: "Module 3", difficulty: "Medium",
    topic: "AWS Lambda",
    q: "What is the MAXIMUM execution duration for a single AWS Lambda function invocation?",
    options: [
      "5 minutes",
      "10 minutes",
      "15 minutes",
      "60 minutes",
    ],
    answer: 2,
    why: "Lambda has a 15-minute (900 second) maximum execution timeout. This is a hard limit. If your code runs longer, use EC2, ECS, or AWS Batch instead. Lambda is designed for short, event-triggered executions.",
  },
  {
    id: 18, module: "Module 3", difficulty: "Medium",
    topic: "Containers vs VMs",
    q: "What is the KEY difference between containers and virtual machines?",
    options: [
      "Containers are slower than virtual machines",
      "Virtual machines share the host OS; containers have their own OS",
      "Containers share the host OS kernel; virtual machines each have their own complete OS",
      "Containers require more RAM than virtual machines",
    ],
    answer: 2,
    why: "VMs = each has a full OS (heavy, slow to start). Containers = share the host OS kernel, only package the app + its dependencies (lightweight, fast to start in seconds). This is the core architectural difference.",
  },
  {
    id: 19, module: "Module 3", difficulty: "Medium",
    topic: "ECS vs EKS",
    q: "A team is new to AWS and wants the simplest way to run Docker containers without learning Kubernetes. Which service should they use?",
    options: [
      "Amazon EKS — because it supports more container workloads",
      "Amazon ECS — AWS-native, simpler orchestration, no Kubernetes knowledge needed",
      "AWS Lambda — best for all containerized apps",
      "AWS Outposts — for running containers on-premises",
    ],
    answer: 1,
    why: "ECS is AWS-native, simpler, and doesn't require Kubernetes knowledge. EKS runs managed Kubernetes — powerful but requires K8s expertise. For simplicity and AWS-native experience, ECS is the right choice for new teams.",
  },
  {
    id: 20, module: "Module 3", difficulty: "Hard",
    topic: "Fargate",
    q: "A developer wants to run containers WITHOUT managing any EC2 instances or servers. Which combination is correct?",
    options: [
      "ECS with EC2 launch type",
      "EKS with self-managed node groups",
      "ECS or EKS with AWS Fargate launch type",
      "AWS Batch with Spot Instances",
    ],
    answer: 2,
    why: "Fargate = serverless containers. With Fargate launch type on either ECS or EKS, AWS manages the underlying EC2 infrastructure completely. You only define your container specs and pay per task. ECS/EKS + EC2 = you still manage the EC2 fleet.",
  },
  {
    id: 21, module: "Module 3", difficulty: "Easy",
    topic: "ECR",
    q: "What is Amazon ECR and what is its purpose?",
    options: [
      "Elastic Compute Registry — stores EC2 AMIs",
      "Elastic Container Registry — stores and manages container images",
      "Elastic Cache Registry — stores Redis cache configurations",
      "Elastic Code Repository — stores application source code",
    ],
    answer: 1,
    why: "ECR = Elastic Container Registry. It's a fully managed container image registry (like a private Docker Hub on AWS). You push images to ECR, and ECS/EKS pull from it to deploy. The typical flow: build image → push to ECR → deploy via ECS/EKS.",
  },
  {
    id: 22, module: "Module 3", difficulty: "Hard",
    topic: "Elastic Beanstalk",
    q: "A developer uploads their Python web app to Elastic Beanstalk. What does Beanstalk automatically provision?",
    options: [
      "Lambda functions and API Gateway only",
      "EC2 instances, Load Balancer, Auto Scaling, and networking",
      "Only an S3 bucket to host the static files",
      "A Kubernetes cluster using EKS",
    ],
    answer: 1,
    why: "Beanstalk is the 'easy button' for EC2 deployments. Upload your code → Beanstalk auto-provisions EC2 instances, ELB, Auto Scaling groups, security groups, and networking. IMPORTANT: Beanstalk still uses EC2 under the hood — it's not serverless. It just automates the setup.",
  },
  {
    id: 23, module: "Module 3", difficulty: "Medium",
    topic: "AWS Outposts",
    q: "A hospital requires that patient data NEVER leaves their physical building due to regulations. Which AWS service is designed for this?",
    options: [
      "AWS Lambda — because it's serverless and has no physical location",
      "Amazon CloudFront — edge locations handle compliance",
      "AWS Outposts — deploys AWS infrastructure inside the customer's own facility",
      "Amazon S3 — data is encrypted and compliant",
    ],
    answer: 2,
    why: "AWS Outposts physically installs AWS hardware IN the customer's data center. Data stays on-premises while still using AWS services (EC2, RDS, ECS). Perfect for strict data residency laws, ultra-low latency, or compliance requirements that forbid cloud.",
  },
  {
    id: 24, module: "Module 3", difficulty: "Hard",
    topic: "Lambda vs EC2",
    q: "Which scenario is MOST suitable for AWS Lambda rather than EC2?",
    options: [
      "A 24/7 web server serving thousands of concurrent requests",
      "A machine learning training job running for 2 hours",
      "A function that resizes images every time one is uploaded to S3",
      "A legacy enterprise application requiring specific OS configuration",
    ],
    answer: 2,
    why: "Lambda is perfect for event-triggered, short-duration tasks. 'Image uploaded to S3 → trigger Lambda to resize' is a textbook Lambda pattern. Lambda has a 15-min max — wrong for 2-hour ML jobs. 24/7 web servers are better on EC2. Legacy apps needing OS config = EC2 only.",
  },
  {
    id: 25, module: "Module 3", difficulty: "Hard",
    topic: "Compute Selection",
    q: "A data science team needs to process 500,000 genomic analysis jobs overnight. Each job takes 3 minutes. They don't want to run EC2 manually. What is the BEST service?",
    options: [
      "AWS Lambda — serverless, no EC2 management",
      "AWS Batch — designed for large-scale batch workloads, manages EC2 automatically",
      "Amazon Lightsail — simple and affordable",
      "Elastic Beanstalk — easy deployment platform",
    ],
    answer: 1,
    why: "AWS Batch is designed exactly for this: massive parallel batch jobs. It automatically provisions EC2, runs all 500K jobs, then terminates instances. Lambda has a 15-min limit (3-min jobs fit, but 500K concurrent is not Lambda's strength). Batch handles scheduling, scaling, and fleet management automatically.",
  },
];

const DIFFICULTY_COLOR = { Easy: "#0f9d58", Medium: "#FF9900", Hard: "#d32f2f" };
const MODULE_COLOR = { "Module 1": "#1a73e8", "Module 2": "#FF9900", "Module 3": "#0f9d58" };
const accent = "#FF9900";

export default function Quiz() {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [showReview, setShowReview] = useState(false);

  const total = QUESTIONS.length;
  const answered = Object.keys(answers).length;
  const score = submitted
    ? QUESTIONS.filter(q => answers[q.id] === q.answer).length
    : 0;
  const pct = submitted ? Math.round((score / total) * 100) : 0;

  const grade = pct >= 80 ? { label: "PASS ✅", color: "#0f9d58", msg: "Excellent! Exam ready." }
    : pct >= 60 ? { label: "CLOSE 🔶", color: "#FF9900", msg: "Almost there — review the wrong ones." }
    : { label: "NEEDS WORK ❌", color: "#d32f2f", msg: "Go back to modules and try again." };

  const q = QUESTIONS[currentQ];
  const selectedAnswer = answers[q.id];
  const isCorrect = submitted && selectedAnswer === q.answer;
  const isWrong = submitted && selectedAnswer !== undefined && selectedAnswer !== q.answer;

  function select(optIdx) {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [q.id]: optIdx }));
  }

  function submitQuiz() {
    if (answered < total) {
      if (!window.confirm(`You have ${total - answered} unanswered question(s). Submit anyway?`)) return;
    }
    setSubmitted(true);
    setShowReview(true);
    setCurrentQ(0);
  }

  function restart() {
    setAnswers({});
    setSubmitted(false);
    setShowReview(false);
    setCurrentQ(0);
  }

  const progressPct = (answered / total) * 100;

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", maxWidth: 800, margin: "0 auto", padding: "1rem", background: "#f4f6fb", minHeight: "100vh" }}>

      {/* ── Header ─────────────────────────────────────────────── */}
      <div style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
        borderRadius: 14, padding: "18px 22px", marginBottom: 16,
        display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10,
      }}>
        <div>
          <div style={{ fontWeight: 800, fontSize: 18, color: "#FF9900", letterSpacing: 0.3 }}>
            ☁️ AWS CCP Exam Quiz
          </div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginTop: 2 }}>
            Modules 1–3 · 25 Questions · CLF-C02
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {["Module 1", "Module 2", "Module 3"].map(m => (
            <span key={m} style={{
              fontSize: 11, fontWeight: 700, padding: "3px 10px",
              borderRadius: 14, background: MODULE_COLOR[m] + "30",
              color: MODULE_COLOR[m], border: `1px solid ${MODULE_COLOR[m]}50`,
            }}>{m}</span>
          ))}
        </div>
      </div>

      {/* ── Score Panel (after submit) ─────────────────────────── */}
      {submitted && (
        <div style={{
          background: "linear-gradient(135deg, #0f172a, #1e293b)",
          borderRadius: 14, padding: "20px 22px", marginBottom: 16,
          border: `2px solid ${grade.color}40`,
        }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 10, marginBottom: 14 }}>
            {[
              { label: "Score", value: `${score}/${total}`, color: grade.color },
              { label: "Percentage", value: `${pct}%`, color: grade.color },
              { label: "Result", value: grade.label, color: grade.color },
              { label: "Grade Needed", value: "70%+", color: "#888" },
            ].map(({ label, value, color }) => (
              <div key={label} style={{ textAlign: "center", background: "rgba(255,255,255,0.05)", borderRadius: 10, padding: "10px 6px" }}>
                <div style={{ fontSize: 22, fontWeight: 800, color }}>{value}</div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.45)", marginTop: 3, textTransform: "uppercase", letterSpacing: 0.5 }}>{label}</div>
              </div>
            ))}
          </div>
          {/* Score bar */}
          <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: 8, height: 10, overflow: "hidden", marginBottom: 10 }}>
            <div style={{ background: grade.color, height: "100%", width: `${pct}%`, borderRadius: 8, transition: "width 1s ease" }} />
          </div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", textAlign: "center", marginBottom: 14 }}>{grade.msg}</div>
          {/* Module breakdown */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
            {["Module 1", "Module 2", "Module 3"].map(mod => {
              const qs = QUESTIONS.filter(q => q.module === mod);
              const correct = qs.filter(q => answers[q.id] === q.answer).length;
              const modPct = Math.round((correct / qs.length) * 100);
              const mc = MODULE_COLOR[mod];
              return (
                <div key={mod} style={{ background: mc + "15", border: `1px solid ${mc}30`, borderRadius: 9, padding: "10px", textAlign: "center" }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: mc, marginBottom: 4 }}>{mod}</div>
                  <div style={{ fontSize: 19, fontWeight: 800, color: mc }}>{correct}/{qs.length}</div>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>{modPct}%</div>
                </div>
              );
            })}
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 14, justifyContent: "center" }}>
            <button onClick={restart} style={{
              padding: "8px 22px", borderRadius: 20, border: "none",
              background: accent, color: "#0f172a", fontWeight: 700, fontSize: 13, cursor: "pointer",
            }}>🔄 Retake Quiz</button>
          </div>
        </div>
      )}

      {/* ── Progress Bar (before submit) ──────────────────────── */}
      {!submitted && (
        <div style={{ background: "white", borderRadius: 10, padding: "10px 14px", marginBottom: 12, border: "1px solid #e0e0e0" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ fontSize: 12, color: "#666" }}>Progress</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: accent }}>{answered}/{total} answered</span>
          </div>
          <div style={{ background: "#f0f0f0", borderRadius: 6, height: 8, overflow: "hidden" }}>
            <div style={{ background: accent, height: "100%", width: `${progressPct}%`, borderRadius: 6, transition: "width 0.3s" }} />
          </div>
        </div>
      )}

      {/* ── Question Navigator ──────────────────────────────────── */}
      <div style={{ background: "white", borderRadius: 10, padding: "10px 14px", marginBottom: 12, border: "1px solid #e0e0e0" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#888", marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.5 }}>Questions</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
          {QUESTIONS.map((q, i) => {
            const isActive = currentQ === i;
            const isAns = answers[q.id] !== undefined;
            const isRight = submitted && answers[q.id] === q.answer;
            const isWrongQ = submitted && isAns && answers[q.id] !== q.answer;
            const bg = isRight ? "#0f9d58" : isWrongQ ? "#d32f2f" : isAns ? accent : "white";
            const border = isActive ? `2px solid #0f172a` : isAns ? `2px solid ${bg}` : "1px solid #ddd";
            return (
              <button key={q.id} onClick={() => setCurrentQ(i)} style={{
                width: 34, height: 34, borderRadius: 8, border,
                background: bg, color: isAns || isRight || isWrongQ ? "white" : "#555",
                fontWeight: isActive ? 800 : 600, fontSize: 12, cursor: "pointer",
                transform: isActive ? "scale(1.12)" : "scale(1)", transition: "all 0.12s",
              }}>{i + 1}</button>
            );
          })}
        </div>
        <div style={{ display: "flex", gap: 14, marginTop: 8, flexWrap: "wrap" }}>
          {!submitted && [
            { color: accent, label: "Answered" },
            { color: "#e0e0e0", label: "Not answered" },
          ].map(({ color, label }) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <div style={{ width: 12, height: 12, borderRadius: 3, background: color }} />
              <span style={{ fontSize: 10.5, color: "#888" }}>{label}</span>
            </div>
          ))}
          {submitted && [
            { color: "#0f9d58", label: "Correct" },
            { color: "#d32f2f", label: "Incorrect" },
          ].map(({ color, label }) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <div style={{ width: 12, height: 12, borderRadius: 3, background: color }} />
              <span style={{ fontSize: 10.5, color: "#888" }}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Question Card ────────────────────────────────────────── */}
      <div style={{
        background: "white", borderRadius: 14, padding: "20px 20px 24px",
        border: "1px solid #e0e0e0", marginBottom: 14,
        boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
      }}>
        {/* Q meta */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8, background: "#0f172a",
            color: accent, fontWeight: 800, fontSize: 13,
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}>{currentQ + 1}</div>
          <span style={{ fontSize: 10.5, fontWeight: 700, background: MODULE_COLOR[q.module] + "18", color: MODULE_COLOR[q.module], border: `1px solid ${MODULE_COLOR[q.module]}35`, borderRadius: 10, padding: "2px 9px" }}>{q.module}</span>
          <span style={{ fontSize: 10.5, fontWeight: 700, background: DIFFICULTY_COLOR[q.difficulty] + "18", color: DIFFICULTY_COLOR[q.difficulty], border: `1px solid ${DIFFICULTY_COLOR[q.difficulty]}35`, borderRadius: 10, padding: "2px 9px" }}>{q.difficulty}</span>
          <span style={{ fontSize: 10.5, color: "#999", background: "#f5f5f5", borderRadius: 10, padding: "2px 9px", border: "1px solid #eee" }}>{q.topic}</span>
          <span style={{ marginLeft: "auto", fontSize: 11, fontWeight: 700, color: "#888" }}>1 mark</span>
        </div>

        {/* Question text */}
        <div style={{ fontSize: 15, fontWeight: 600, color: "#1a1a1a", lineHeight: 1.6, marginBottom: 18 }}>
          {q.q}
        </div>

        {/* Options */}
        <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
          {q.options.map((opt, i) => {
            const isSelected = selectedAnswer === i;
            const isCorrectOpt = submitted && i === q.answer;
            const isWrongOpt = submitted && isSelected && i !== q.answer;

            let bg = "white", border = "1.5px solid #e0e0e0", color = "#333";
            if (isCorrectOpt) { bg = "#0f9d5812"; border = "1.5px solid #0f9d58"; color = "#0f9d58"; }
            else if (isWrongOpt) { bg = "#d32f2f10"; border = "1.5px solid #d32f2f"; color = "#d32f2f"; }
            else if (!submitted && isSelected) { bg = "#FF990012"; border = "1.5px solid #FF9900"; color = "#CC7A00"; }

            return (
              <button key={i} onClick={() => select(i)} style={{
                width: "100%", textAlign: "left", padding: "11px 14px",
                borderRadius: 10, border, background: bg, color,
                cursor: submitted ? "default" : "pointer",
                display: "flex", alignItems: "center", gap: 12, transition: "all 0.12s",
                fontFamily: "inherit",
              }}>
                <div style={{
                  width: 26, height: 26, borderRadius: "50%", flexShrink: 0,
                  background: isCorrectOpt ? "#0f9d58" : isWrongOpt ? "#d32f2f" : !submitted && isSelected ? "#FF9900" : "#f0f0f0",
                  color: isCorrectOpt || isWrongOpt || (!submitted && isSelected) ? "white" : "#888",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: isCorrectOpt ? 14 : isWrongOpt ? 14 : 12, fontWeight: 700,
                }}>
                  {isCorrectOpt ? "✓" : isWrongOpt ? "✗" : String.fromCharCode(65 + i)}
                </div>
                <span style={{ fontSize: 13.5, lineHeight: 1.5, fontWeight: isCorrectOpt ? 600 : 400 }}>{opt}</span>
              </button>
            );
          })}
        </div>

        {/* Justification (after submit) */}
        {submitted && (
          <div style={{
            marginTop: 16, borderRadius: 10, padding: "12px 14px",
            background: isCorrect ? "#0f9d5810" : "#d32f2f10",
            border: `1px solid ${isCorrect ? "#0f9d5840" : "#d32f2f40"}`,
            borderLeft: `3px solid ${isCorrect ? "#0f9d58" : "#d32f2f"}`,
          }}>
            <div style={{ fontWeight: 700, fontSize: 12, color: isCorrect ? "#0f9d58" : "#d32f2f", marginBottom: 5 }}>
              {isCorrect ? "✅ Correct!" : selectedAnswer === undefined ? "⚠️ Not answered — correct answer above" : "❌ Incorrect — here's why:"}
            </div>
            <div style={{ fontSize: 13, color: "#444", lineHeight: 1.65 }}>{q.why}</div>
          </div>
        )}
      </div>

      {/* ── Navigation ───────────────────────────────────────────── */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
        <button onClick={() => setCurrentQ(v => Math.max(0, v - 1))}
          disabled={currentQ === 0}
          style={{
            padding: "9px 20px", borderRadius: 20, border: "1.5px solid #ddd",
            background: "white", color: currentQ === 0 ? "#ccc" : "#333",
            cursor: currentQ === 0 ? "not-allowed" : "pointer", fontWeight: 600, fontSize: 13,
          }}>← Prev</button>

        <div style={{ display: "flex", gap: 8 }}>
          {!submitted && (
            <button onClick={submitQuiz} style={{
              padding: "9px 24px", borderRadius: 20, border: "none",
              background: "#0f172a", color: accent,
              cursor: "pointer", fontWeight: 700, fontSize: 13,
            }}>Submit Quiz ({answered}/{total})</button>
          )}
        </div>

        <button onClick={() => setCurrentQ(v => Math.min(total - 1, v + 1))}
          disabled={currentQ === total - 1}
          style={{
            padding: "9px 20px", borderRadius: 20, border: "none",
            background: currentQ === total - 1 ? "#e0e0e0" : "#0f172a",
            color: currentQ === total - 1 ? "#aaa" : accent,
            cursor: currentQ === total - 1 ? "not-allowed" : "pointer", fontWeight: 700, fontSize: 13,
          }}>Next →</button>
      </div>

      {/* ── Difficulty legend ────────────────────────────────────── */}
      <div style={{ display: "flex", gap: 16, justifyContent: "center", marginTop: 14, flexWrap: "wrap" }}>
        {[["Easy", "7 Qs"], ["Medium", "12 Qs"], ["Hard", "6 Qs"]].map(([d, n]) => (
          <div key={d} style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: DIFFICULTY_COLOR[d] }} />
            <span style={{ fontSize: 11, color: "#888" }}>{d} — {n}</span>
          </div>
        ))}
        <span style={{ fontSize: 11, color: "#bbb" }}>|</span>
        <span style={{ fontSize: 11, color: "#888" }}>Pass mark: 70% (18/25)</span>
      </div>
    </div>
  );
}
