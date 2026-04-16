import { useState } from "react";

/* ═══════════════════════════════════════════════════════════════
   SPRING BOOT — RESTful Web Services — Interview Prep Notes
   Module-based interactive notes (same style as AWS modules)
   Drop into your React project: replace/add as a route component
   ═══════════════════════════════════════════════════════════════ */

const spring = "#6DB33F";
const springDark = "#5A9E2F";
const navy = "#1B2A4A";
const ember = "#E8623F";
const sky = "#2E86DE";
const plum = "#8854D0";
const gold = "#F7B731";
const mint = "#20BF6B";
const rose = "#EB3B5A";

/* ─── Reusable Components ─── */

function Pill({ text, color }) {
  return (
    <span style={{
      display: "inline-block", padding: "2px 10px", borderRadius: 99,
      fontSize: 9.5, fontWeight: 700, letterSpacing: 0.6, textTransform: "uppercase",
      background: color + "18", color, border: `1px solid ${color}35`,
    }}>{text}</span>
  );
}

function Code({ children, title }) {
  return (
    <div style={{ margin: "10px 0", borderRadius: 10, overflow: "hidden", border: "1px solid #30363d" }}>
      {title && (
        <div style={{
          background: "#161b22", padding: "5px 14px", fontSize: 9.5, fontWeight: 600,
          color: "#8b949e", borderBottom: "1px solid #30363d", letterSpacing: 0.3,
        }}>{title}</div>
      )}
      <pre style={{
        background: "#0d1117", color: "#e6edf3", padding: "12px 14px", margin: 0,
        fontSize: 11.5, lineHeight: 1.6, overflowX: "auto",
        fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace",
      }}>{children}</pre>
    </div>
  );
}

function Say({ children }) {
  return (
    <div style={{
      margin: "12px 0", padding: "11px 14px", borderRadius: "2px 10px 10px 2px",
      background: `linear-gradient(135deg, ${spring}10, ${spring}06)`,
      borderLeft: `3px solid ${spring}`, fontSize: 12.5, lineHeight: 1.65,
    }}>
      <div style={{ fontWeight: 800, fontSize: 9, color: spring, textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 4 }}>
        🎤 Interview Line
      </div>
      <div style={{ fontStyle: "italic", color: "#2d5016" }}>"{children}"</div>
    </div>
  );
}

function Tip({ emoji, title, children, color = sky }) {
  return (
    <div style={{
      margin: "10px 0", padding: "11px 14px", borderRadius: 10,
      background: color + "0A", border: `1px solid ${color}22`,
    }}>
      <div style={{ fontWeight: 700, fontSize: 11.5, color, marginBottom: 5 }}>{emoji} {title}</div>
      <div style={{ fontSize: 12, lineHeight: 1.65, color: "#4a5568" }}>{children}</div>
    </div>
  );
}

function Flip({ title, emoji, children, color = spring }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{
      margin: "6px 0", borderRadius: 10, overflow: "hidden",
      border: `1px solid ${open ? color + "60" : "#e2e8f0"}`,
      background: open ? color + "08" : "white",
      transition: "all 0.15s ease",
    }}>
      <div
        onClick={() => setOpen(!open)}
        style={{
          padding: "10px 14px", cursor: "pointer", display: "flex",
          justifyContent: "space-between", alignItems: "center", userSelect: "none",
        }}
      >
        <span style={{ fontWeight: 600, fontSize: 12.5, color: open ? color : "#2d3748" }}>
          {emoji} {title}
        </span>
        <span style={{
          fontSize: 10, width: 22, height: 22, borderRadius: "50%", display: "flex",
          alignItems: "center", justifyContent: "center",
          background: open ? color + "18" : "#f1f5f9", color: open ? color : "#94a3b8",
          transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "all 0.2s",
        }}>▼</span>
      </div>
      {open && (
        <div style={{ padding: "2px 14px 14px", fontSize: 12, lineHeight: 1.7, color: "#4a5568" }}>
          {children}
        </div>
      )}
    </div>
  );
}

function Grid2({ children }) {
  return <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, margin: "8px 0" }}>{children}</div>;
}
function Grid3({ children }) {
  return <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6, margin: "8px 0" }}>{children}</div>;
}

function MiniCard({ emoji, title, desc, color = "#64748b" }) {
  return (
    <div style={{
      padding: "10px 12px", borderRadius: 10,
      background: color + "08", border: `1px solid ${color}20`,
    }}>
      <div style={{ fontSize: 10.5, fontWeight: 700, color }}>{emoji} {title}</div>
      <div style={{ fontSize: 10, color: "#64748b", marginTop: 3, lineHeight: 1.5 }}>{desc}</div>
    </div>
  );
}

function Versus({ left, right, leftColor = rose, rightColor = mint }) {
  return (
    <div style={{ display: "flex", gap: 8, margin: "10px 0" }}>
      <div style={{ flex: 1, padding: 10, borderRadius: 8, background: leftColor + "0C", border: `1px solid ${leftColor}30`, textAlign: "center" }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: leftColor }}>{left[0]}</div>
        <div style={{ fontSize: 10, color: "#64748b", marginTop: 3 }}>{left[1]}</div>
      </div>
      <div style={{ flex: 1, padding: 10, borderRadius: 8, background: rightColor + "0C", border: `1px solid ${rightColor}30`, textAlign: "center" }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: rightColor }}>{right[0]}</div>
        <div style={{ fontSize: 10, color: "#64748b", marginTop: 3 }}>{right[1]}</div>
      </div>
    </div>
  );
}

function Table({ headers, rows, accentColor = navy }) {
  return (
    <div style={{ borderRadius: 10, overflow: "hidden", border: "1px solid #e2e8f0", margin: "10px 0" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
        <thead>
          <tr style={{ background: accentColor, color: "white" }}>
            {headers.map((h, i) => (
              <th key={i} style={{ padding: "8px 12px", textAlign: "left", fontSize: 10, fontWeight: 700, letterSpacing: 0.4 }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={{ background: i % 2 === 0 ? "white" : "#f8fafc", borderBottom: "1px solid #f1f5f9" }}>
              {row.map((cell, j) => (
                <td key={j} style={{
                  padding: "7px 12px", color: j === 0 ? accentColor : "#4a5568",
                  fontWeight: j === 0 ? 700 : 400,
                  fontFamily: j === 0 ? "'JetBrains Mono', monospace" : "inherit",
                  fontSize: j === 0 ? 10.5 : 11,
                }}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ─── SVG Diagrams ─── */

function RequestFlowSVG() {
  const steps = [
    { label: "🌐  Browser / Postman", sub: "HTTP Request (GET, POST...)", color: sky },
    { label: "🐱  Embedded Tomcat :8080", sub: "Provided by starter-web", color: ember },
    { label: "🎯  DispatcherServlet", sub: "Front Controller — routes ALL requests to correct handler", color: gold },
    { label: "📦  Your @RestController", sub: "Your method executes, returns data", color: spring },
    { label: "🔄  Jackson Converter", sub: "Java Object → JSON", color: plum },
    { label: "✅  HTTP Response", sub: "200 OK + JSON body → back to client", color: mint },
  ];
  const h = 50, gap = 12, startY = 8;
  const total = steps.length * h + (steps.length - 1) * gap + startY + 8;
  return (
    <svg viewBox={`0 0 480 ${total}`} style={{ width: "100%", maxWidth: 500, display: "block", margin: "10px auto" }}>
      <defs>
        <marker id="af" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto">
          <path d="M0,0 L7,2.5 L0,5" fill="#94a3b8" />
        </marker>
        <filter id="ds"><feDropShadow dx="0" dy="1" stdDeviation="2" floodOpacity="0.06" /></filter>
      </defs>
      {steps.map((s, i) => {
        const y = startY + i * (h + gap);
        return (
          <g key={i}>
            {i > 0 && (
              <line x1="240" y1={y - gap + 2} x2="240" y2={y + 2} stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="4,3" markerEnd="url(#af)" />
            )}
            <rect x="40" y={y} width="400" height={h} rx="10" fill="white" stroke={s.color} strokeWidth="1.5" filter="url(#ds)" />
            <rect x="40" y={y} width="5" height={h} rx="2.5" fill={s.color} />
            <text x="58" y={y + 21} fontSize="12" fontWeight="700" fill={s.color}>{s.label}</text>
            <text x="58" y={y + 37} fontSize="9.5" fill="#8899a6">{s.sub}</text>
          </g>
        );
      })}
    </svg>
  );
}

function LayersSVG() {
  const layers = [
    { label: "CONTROLLER", sub: "UserController — @RestController, @GetMapping, @PostMapping", color: sky, tag: "@RestController" },
    { label: "SERVICE / DAO", sub: "UserDaoService — business logic + data access", color: spring, tag: "@Component" },
    { label: "DATA STORE", sub: "static ArrayList (now) → H2 + JPA (later)", color: gold, tag: "In-Memory" },
  ];
  return (
    <svg viewBox="0 0 460 230" style={{ width: "100%", maxWidth: 460, display: "block", margin: "10px auto" }}>
      <defs>
        <marker id="al" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto">
          <path d="M0,0 L7,2.5 L0,5" fill="#94a3b8" />
        </marker>
      </defs>
      {layers.map((l, i) => {
        const y = i * 78;
        return (
          <g key={i}>
            {i > 0 && (
              <>
                <line x1="230" y1={y - 20} x2="230" y2={y + 4} stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="4,3" markerEnd="url(#al)" />
                <text x="244" y={y - 6} fontSize="8.5" fill="#94a3b8">{i === 1 ? "@Autowired" : "reads/writes"}</text>
              </>
            )}
            <rect x="20" y={y + 4} width="420" height="56" rx="12" fill={l.color + "0C"} stroke={l.color} strokeWidth="1.5" />
            <text x="40" y={y + 28} fontSize="13" fontWeight="800" fill={l.color}>{l.label}</text>
            <text x="40" y={y + 46} fontSize="9.5" fill="#64748b">{l.sub}</text>
            <rect x="340" y={y + 14} width="85" height="22" rx="11" fill={l.color + "18"} />
            <text x="382" y={y + 29} fontSize="9" fontWeight="700" fill={l.color} textAnchor="middle">{l.tag}</text>
          </g>
        );
      })}
    </svg>
  );
}

function JsonFlowSVG() {
  return (
    <svg viewBox="0 0 500 90" style={{ width: "100%", maxWidth: 500, display: "block", margin: "10px auto" }}>
      <defs>
        <marker id="aj" markerWidth="6" markerHeight="4" refX="6" refY="2" orient="auto">
          <path d="M0,0 L6,2 L0,4" fill="#94a3b8" />
        </marker>
      </defs>
      {/* JSON box */}
      <rect x="5" y="10" width="140" height="65" rx="10" fill={sky + "0C"} stroke={sky} strokeWidth="1.2" />
      <text x="75" y="32" fontSize="10.5" fontWeight="700" fill={sky} textAnchor="middle">POST /users</text>
      <text x="75" y="48" fontSize="9" fill="#64748b" textAnchor="middle">{"{"} "name": "Shrey" {"}"}</text>
      <text x="75" y="62" fontSize="8" fill="#94a3b8" textAnchor="middle">JSON</text>
      {/* Arrow 1 */}
      <line x1="150" y1="42" x2="185" y2="42" stroke="#94a3b8" strokeWidth="1.2" markerEnd="url(#aj)" />
      <text x="167" y="36" fontSize="8" fill={spring} fontWeight="700" textAnchor="middle">@RequestBody</text>
      {/* Jackson box */}
      <rect x="190" y="10" width="110" height="65" rx="10" fill={spring + "0C"} stroke={spring} strokeWidth="1.2" />
      <text x="245" y="34" fontSize="10.5" fontWeight="700" fill={spring} textAnchor="middle">Jackson</text>
      <text x="245" y="50" fontSize="8.5" fill="#64748b" textAnchor="middle">HttpMessage</text>
      <text x="245" y="62" fontSize="8.5" fill="#64748b" textAnchor="middle">Converter</text>
      {/* Arrow 2 */}
      <line x1="305" y1="42" x2="340" y2="42" stroke="#94a3b8" strokeWidth="1.2" markerEnd="url(#aj)" />
      {/* POJO box */}
      <rect x="345" y="10" width="140" height="65" rx="10" fill={mint + "0C"} stroke={mint} strokeWidth="1.2" />
      <text x="415" y="32" fontSize="10.5" fontWeight="700" fill={mint} textAnchor="middle">User Object</text>
      <text x="415" y="48" fontSize="9" fill="#64748b" textAnchor="middle">name = "Shrey"</text>
      <text x="415" y="62" fontSize="8" fill="#94a3b8" textAnchor="middle">Java POJO</text>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION CONTENT — Each tab's full content
   ═══════════════════════════════════════════════════════════════ */

function Content({ id }) {
  switch (id) {

    /* ───────── MODULE 1: SETUP ───────── */
    case "setup": return (<>
      <p style={P}>Every Spring Boot project starts at <b>start.spring.io</b>. You pick dependencies, download, hit Run. Spring Boot auto-configures everything.</p>

      <Say>Spring Boot is an opinionated framework on top of Spring that uses auto-configuration, starter dependencies, and an embedded server to eliminate boilerplate.</Say>

      <H4>Dependencies in pom.xml</H4>
      <Grid2>
        <MiniCard emoji="🌐" title="spring-boot-starter-web" desc="Spring MVC + Embedded Tomcat + Jackson (JSON)" color={sky} />
        <MiniCard emoji="🗄️" title="spring-boot-starter-data-jpa" desc="JPA + Hibernate ORM + Spring Data" color={mint} />
        <MiniCard emoji="💾" title="h2" desc="In-memory database — resets on restart" color={gold} />
        <MiniCard emoji="🔧" title="spring-boot-devtools" desc="Auto-restart on code save" color={plum} />
      </Grid2>

      <Tip emoji="🧩" title="Starter Projects" color={spring}>
        Add ONE starter → it pulls MANY JARs transitively. <code>spring-boot-starter-web</code> brings Spring MVC, Tomcat, Jackson, and all transitive deps. You never manage individual JARs.
      </Tip>

      <H4>@SpringBootApplication — The Entry Point</H4>
      <Code title="Main class">{`@SpringBootApplication   // ← This ONE annotation does 3 things
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}`}</Code>
      <Grid3>
        <MiniCard emoji="⚙️" title="@Configuration" desc="This class can define beans" color={sky} />
        <MiniCard emoji="🔮" title="@EnableAutoConfig" desc="Auto-configure from classpath" color={ember} />
        <MiniCard emoji="🔍" title="@ComponentScan" desc="Scan package + sub-packages" color={spring} />
      </Grid3>
      <Say>@SpringBootApplication is a meta-annotation combining @Configuration, @EnableAutoConfiguration, and @ComponentScan. It marks the entry point and triggers component scanning and auto-configuration.</Say>
    </>);

    /* ───────── MODULE 2: BACKGROUND ───────── */
    case "bg": return (<>
      <p style={P}>When you hit Run, Spring Boot auto-configures a LOT behind the scenes. Enable debug logging to see it:</p>
      <Code title="application.properties">{`logging.level.org.springframework=debug`}</Code>

      <H4>The Request Lifecycle</H4>
      <RequestFlowSVG />

      <H4>4 Interview Questions About the Background</H4>
      <Flip title="How are requests handled?" emoji="1️⃣" color={sky}>
        <b>DispatcherServlet</b> — the Front Controller. Maps to <code>urls=[/]</code>, catches ALL requests, consults Handler Mapping to route to the right controller method.
        <br /><br />Auto-configured by: <code>DispatcherServletAutoConfiguration</code>
      </Flip>
      <Flip title="How does HelloWorldBean become JSON?" emoji="2️⃣" color={mint}>
        <code>@ResponseBody</code> (inside <code>@RestController</code>) tells Spring to serialize the return value. Jackson's <code>JacksonHttpMessageConverters</code> does the conversion.
        <br /><br />Auto-configured by: <code>JacksonHttpMessageConvertersConfiguration</code>
      </Flip>
      <Flip title="Who configures error mapping?" emoji="3️⃣" color={rose}>
        <code>ErrorMvcAutoConfiguration</code> — gives you the Whitelabel Error Page on wrong URLs.
      </Flip>
      <Flip title="How are all JARs available?" emoji="4️⃣" color={gold}>
        <b>Starter Projects.</b> <code>spring-boot-starter-web</code> transitively pulls in spring-webmvc, spring-web, starter-tomcat, and starter-json.
      </Flip>

      <Say>All requests go through the DispatcherServlet, which is the front controller. It consults handler mappings to route each request to the correct controller method. Spring Boot auto-configures it through DispatcherServletAutoConfiguration.</Say>
    </>);

    /* ───────── MODULE 3: HELLO WORLD ───────── */
    case "hello": return (<>
      <p style={P}>Your first REST controller evolves in 3 steps: return a string → return an object (JSON) → use path variables.</p>

      <H4>@RestController = @Controller + @ResponseBody</H4>
      <Versus
        left={["@Controller", "Returns a view name (HTML page)"]}
        right={["@RestController", "Returns data (JSON) directly"]}
        leftColor={sky} rightColor={spring}
      />

      <H4>Evolution: 3 Steps</H4>
      <Flip title="Step 1 — Return a String" emoji="1️⃣" color={sky}>
        <Code title="v1: @RequestMapping (verbose)">{`@RequestMapping(method = RequestMethod.GET, path = "/hello-world")
public String helloWorld() {
    return "Hello World";
}`}</Code>
        <Code title="v2: @GetMapping (shortcut — cleaner)">{`@GetMapping(path = "/hello-world")
public String helloWorld() { return "Hello World"; }
// GET localhost:8080/hello-world → "Hello World"`}</Code>
        <Tip emoji="📝" title="@GetMapping vs @RequestMapping" color={sky}>
          <code>@GetMapping</code> = shortcut for <code>@RequestMapping(method=GET)</code>. Same for <code>@PostMapping</code>, <code>@PutMapping</code>, <code>@DeleteMapping</code>, <code>@PatchMapping</code>.
        </Tip>
      </Flip>

      <Flip title="Step 2 — Return Object → Auto-JSON" emoji="2️⃣" color={spring}>
        <Code>{`@GetMapping(path = "/hello-world-bean")
public HelloWorldBean helloWorldBean() {
    return new HelloWorldBean("Hello World");
}
// → { "message": "Hello World" }

// Jackson calls GETTER methods to serialize.
// getMessage() → "message" field in JSON.
// No getter = no field in JSON output!`}</Code>
      </Flip>

      <Flip title="Step 3 — @PathVariable (Dynamic URLs)" emoji="3️⃣" color={ember}>
        <Code>{`@GetMapping("/hello-world/path-variable/{name}")
public HelloWorldBean helloWorldPathVariable(
        @PathVariable String name) {
    return new HelloWorldBean(
        String.format("Hello World, %s", name));
}
// /hello-world/path-variable/Ranga
//   {name} → @PathVariable String name → name = "Ranga"
//   → { "message": "Hello World, Ranga" }`}</Code>
        <Say>@PathVariable binds a URI template variable to a method parameter. The variable name in the template must match the parameter name, or use @PathVariable("name") to map explicitly.</Say>
      </Flip>

      <Table headers={["Shortcut", "Equivalent"]} rows={[
        ["@GetMapping", "@RequestMapping(method = GET)"],
        ["@PostMapping", "@RequestMapping(method = POST)"],
        ["@PutMapping", "@RequestMapping(method = PUT)"],
        ["@DeleteMapping", "@RequestMapping(method = DELETE)"],
        ["@PatchMapping", "@RequestMapping(method = PATCH)"],
      ]} accentColor={spring} />
    </>);

    /* ───────── MODULE 4: REST API DESIGN ───────── */
    case "rest": return (<>
      <H4>HTTP Methods — The Verbs of REST</H4>
      <Table headers={["Method", "Purpose", "CRUD"]} rows={[
        ["GET", "Retrieve a resource", "READ"],
        ["POST", "Create a new resource", "CREATE"],
        ["PUT", "Replace entire resource", "UPDATE (full)"],
        ["PATCH", "Update part of resource", "UPDATE (partial)"],
        ["DELETE", "Remove a resource", "DELETE"],
      ]} accentColor={navy} />

      <Tip emoji="⚡" title="PUT vs PATCH — Interview Favorite" color={rose}>
        <b>PUT</b> sends the COMPLETE object. Missing fields → null.<br />
        <b>PATCH</b> sends ONLY changed fields. Everything else stays.
      </Tip>

      <H4>Social Media App — Endpoints</H4>
      <Table headers={["Action", "Method + URI"]} rows={[
        ["Retrieve all users", "GET /users"],
        ["Create a user", "POST /users"],
        ["Retrieve one user", "GET /users/{id}"],
        ["Delete a user", "DELETE /users/{id}"],
        ["All posts for a user", "GET /users/{id}/posts"],
        ["Create a post", "POST /users/{id}/posts"],
        ["One specific post", "GET /users/{id}/posts/{post_id}"],
      ]} accentColor={spring} />
      <p style={{ fontSize: 10, color: "#94a3b8", marginTop: 4 }}>Posts are <b>nested under users</b> — the URI reflects the belongs-to relationship.</p>
    </>);

    /* ───────── MODULE 5: LAYERS ───────── */
    case "layers": return (<>
      <p style={P}>Don't put everything in one file. Spring apps follow a layered architecture:</p>
      <LayersSVG />

      <H4>Why Separate Layers?</H4>
      <Grid2>
        <MiniCard emoji="🎯" title="Separation of Concerns" desc="Controller = HTTP, DAO = data" color={sky} />
        <MiniCard emoji="🧪" title="Testability" desc="Mock DAO when testing controller" color={mint} />
        <MiniCard emoji="♻️" title="Reusability" desc="Multiple controllers share same DAO" color={plum} />
        <MiniCard emoji="🔄" title="Swappability" desc="ArrayList → MySQL, controller untouched" color={gold} />
      </Grid2>
      <Say>I follow a layered architecture — controllers handle HTTP, service/DAO handles data access. This separation makes the code testable, reusable, and allows swapping data sources without changing the controller.</Say>

      <H4>@Component — Register a Bean</H4>
      <Code>{`@Component  // "Spring, create & manage this class as a bean"
public class UserDaoService { ... }`}</Code>
      <Tip emoji="🏷️" title="Stereotype Annotations" color={gold}>
        All extend <code>@Component</code>:<br />
        <b>@Service</b> → business layer · <b>@Repository</b> → data layer + exception translation · <b>@Controller</b> → web layer
      </Tip>

      <H4>@Autowired — Dependency Injection</H4>
      <Code>{`@RestController
public class UserController {
    @Autowired  // Spring creates + injects the bean
    private UserDaoService service;
    // No "new UserDaoService()" — loose coupling!
}`}</Code>
      <Say>@Autowired enables dependency injection. Spring resolves the required bean and injects it. If only ONE constructor exists, @Autowired is optional — constructor injection happens automatically.</Say>

      <H4>In-Memory "Database" Explained</H4>
      <Code title="Why static List?">{`private static List<User> users = new ArrayList<>();
// private  → only this class accesses it
// static   → belongs to CLASS, shared by all instances
//            simulates a shared database
// ArrayList → resizable array implementation
// Resets on restart. Later replaced by JPA + H2.`}</Code>
    </>);

    /* ───────── MODULE 6: POST & RESPONSE ───────── */
    case "post": return (<>
      <H4>@RequestBody — JSON → Java Object</H4>
      <JsonFlowSVG />
      <Say>@RequestBody binds the HTTP request body to a method parameter. Spring uses Jackson's HttpMessageConverter to deserialize JSON into the target Java type.</Say>

      <H4>ResponseEntity — Full HTTP Response Control</H4>
      <p style={P}><code>ResponseEntity</code> is a <b>class</b> (NOT an annotation) — wraps status + headers + body.</p>
      <Grid2>
        <MiniCard emoji="✅" title=".ok(body)" desc="→ 200 OK + body" color={mint} />
        <MiniCard emoji="🆕" title=".created(uri).build()" desc="→ 201 Created + Location header" color={sky} />
        <MiniCard emoji="🚫" title=".notFound().build()" desc="→ 404 Not Found" color={rose} />
        <MiniCard emoji="⚠️" title=".badRequest().body(err)" desc="→ 400 Bad Request + error" color={gold} />
      </Grid2>

      <H4>Complete POST Flow</H4>
      <Code title="POST /users — Create a user">{`@PostMapping("/users")
public ResponseEntity<Object> createUser(
        @RequestBody User user) {
    User saved = service.saveUser(user);

    URI location = ServletUriComponentsBuilder
        .fromCurrentRequest()            // /users
        .path("/{id}")                   // /users/{id}
        .buildAndExpand(saved.getId())   // /users/3
        .toUri();

    return ResponseEntity.created(location).build();
    // → 201 Created
    // → Location: http://localhost:8080/users/3
}`}</Code>
      <Say>After a successful POST, I return 201 Created with a Location header built using ServletUriComponentsBuilder. This tells the client the URI of the new resource, following REST conventions.</Say>
    </>);

    /* ───────── MODULE 7: EXCEPTIONS ───────── */
    case "err": return (<>
      <Tip emoji="❌" title="The Problem" color={rose}>
        <code>GET /users/999</code> → DAO returns null → client gets <b>200 OK empty body</b>. Should be <b>404 Not Found</b>.
      </Tip>

      <H4>@ResponseStatus — Map Exception → HTTP Status</H4>
      <Code title="Custom exception class">{`@ResponseStatus(code = HttpStatus.NOT_FOUND)
public class UserNotFoundException
        extends RuntimeException {
    public UserNotFoundException(String message) {
        super(message);
    }
}`}</Code>

      <Code title="Updated controller">{`@GetMapping("/users/{id}")
public User retreieveOneUser(@PathVariable int id) {
    User user = service.findOne(id);
    if (user == null)
        throw new UserNotFoundException("id: " + id);
    return user;  // → 404 if not found!
}`}</Code>

      <Versus
        left={["BEFORE ❌", "GET /users/999 → 200 OK (empty)"]}
        right={["AFTER ✅", "GET /users/999 → 404 Not Found"]}
      />

      <Table headers={["HttpStatus", "Code", "When"]} rows={[
        ["NOT_FOUND", "404", "Resource doesn't exist"],
        ["BAD_REQUEST", "400", "Invalid input from client"],
        ["INTERNAL_SERVER_ERROR", "500", "Something broke on server"],
        ["FORBIDDEN", "403", "Not allowed (even if authenticated)"],
        ["UNAUTHORIZED", "401", "Not authenticated"],
      ]} accentColor={rose} />

      <Say>@ResponseStatus maps an exception to a specific HTTP status code. By annotating UserNotFoundException with NOT_FOUND, Spring returns 404 automatically — no try-catch needed in the controller.</Say>
    </>);

    /* ───────── MODULE 8: VALIDATION ───────── */
    case "valid": return (<>
      <p style={P}>Users can POST anything — empty names, future birth dates. Add validation → bad data gets <b>400 Bad Request</b>.</p>

      <H4>Constraints on the Model</H4>
      <Code title="User.java">{`public class User {
    private Integer id;

    @Size(min = 2, message = "Name should have at least 2 chars")
    private String name;

    @Past(message = "Birth date should be in the past")
    private LocalDate birthDate;
}`}</Code>

      <Flip title="@Size — Validate String Length" emoji="📏" color={sky}>
        <Code>{`@Size(min = 2)             → at least 2 chars
@Size(max = 100)           → at most 100 chars
@Size(min = 2, max = 100)  → between 2 and 100
message = "..."            → custom error message`}</Code>
      </Flip>
      <Flip title="@Past / @Future — Validate Dates" emoji="📅" color={mint}>
        <Code>{`@Past            → must be before today    (birthDate)
@PastOrPresent   → before or equal to today
@Future          → must be after today     (expiryDate)
@FutureOrPresent → after or equal to today`}</Code>
      </Flip>

      <H4>@Valid — The Trigger (CRITICAL!)</H4>
      <Code>{`@PostMapping("/users")
public ResponseEntity<Object> createUser(
        @Valid @RequestBody User user) {
    //  ^^^^^^ WITHOUT THIS, @Size AND @Past ARE IGNORED!
}`}</Code>
      <Versus
        left={["Without @Valid ❌", 'POST {"name":""} → Saved!']}
        right={["With @Valid ✅", 'POST {"name":""} → 400 Bad Request']}
      />
      <Say>@Valid triggers Bean Validation on the annotated parameter. Without it, @Size and @Past are completely ignored. When validation fails, Spring returns 400 Bad Request automatically.</Say>

      <H4>Nullable vs NotNull Family</H4>
      <Table headers={["Annotation", "Meaning", "Enforced?"]} rows={[
        ["@Nullable", "This field may be null", "No (docs only)"],
        ["@NotNull", "Must NOT be null", "Yes ✅"],
        ["@NotBlank", "Not null + not empty + not whitespace", "Yes ✅"],
        ["@NotEmpty", "Not null + not empty", "Yes ✅"],
      ]} accentColor={plum} />
    </>);

    /* ───────── MODULE 9: JSON ───────── */
    case "json": return (<>
      <p style={P}>Jackson uses getter names for JSON fields by default. <code>@JsonProperty</code> overrides that.</p>

      <Code title="User.java">{`@JsonProperty("user_name")
private String name;

// Before: { "id": 1, "name": "Shrey" }
// After:  { "id": 1, "user_name": "Shrey" }`}</Code>

      <H4>When to Use @JsonProperty</H4>
      <Grid3>
        <MiniCard emoji="🔤" title="Convention Mismatch" desc="Java camelCase → API snake_case" color={sky} />
        <MiniCard emoji="🔒" title="Hide Internals" desc="Internal field ≠ public API name" color={plum} />
        <MiniCard emoji="🔗" title="Third-Party API" desc="Match their expected JSON keys" color={ember} />
      </Grid3>
      <Say>@JsonProperty customizes the JSON field name during serialization and deserialization. Useful when Java naming conventions differ from the API contract.</Say>
    </>);

    /* ───────── CHEAT SHEET ───────── */
    case "cheat": return (<>
      <H4>All Annotations — Rapid Fire</H4>
      <Table headers={["Annotation / Class", "One-Liner"]} rows={[
        ["@SpringBootApplication", "@Configuration + @EnableAutoConfig + @ComponentScan"],
        ["@RestController", "@Controller + @ResponseBody → returns JSON"],
        ["@GetMapping", "Shortcut for @RequestMapping(method=GET)"],
        ["@PostMapping", "Shortcut for @RequestMapping(method=POST)"],
        ["@PathVariable", "Extract value from URL path → method param"],
        ["@RequestBody", "Deserialize JSON body → Java object"],
        ["@Component", "Register class as Spring-managed bean"],
        ["@Autowired", "Inject matching bean (dependency injection)"],
        ["@ResponseStatus", "Map exception → HTTP status code"],
        ["@Valid", "Trigger Bean Validation on parameter"],
        ["@Size", "Validate string length (min/max)"],
        ["@Past", "Validate date is in the past"],
        ["@JsonProperty", "Customize JSON field name"],
        ["ResponseEntity", "Class — full HTTP response control"],
        ["DispatcherServlet", "Front Controller — routes ALL requests"],
        ["Jackson", "Library — JSON ↔ Java object conversion"],
      ]} accentColor={spring} />

      <H4>Module Progress</H4>
      <Grid3>
        {[
          { n: "1", t: "Setup", done: true },
          { n: "2", t: "Background", done: true },
          { n: "3", t: "Hello World", done: true },
          { n: "4", t: "REST Design", done: true },
          { n: "5", t: "Layers + DI", done: true },
          { n: "6", t: "POST + Response", done: true },
          { n: "7", t: "Exceptions", done: true },
          { n: "8", t: "Validation", done: true },
          { n: "9", t: "JSON Config", done: true },
          { n: "10", t: "JPA + DB", done: false },
          { n: "11", t: "HATEOAS", done: false },
          { n: "12", t: "Security", done: false },
        ].map(m => (
          <div key={m.n} style={{
            padding: "8px 6px", borderRadius: 8, textAlign: "center",
            background: m.done ? spring + "0C" : "#f8fafc",
            border: `1px solid ${m.done ? spring + "40" : "#e2e8f0"}`,
          }}>
            <div style={{ fontSize: 16 }}>{m.done ? "✅" : "🔜"}</div>
            <div style={{ fontSize: 9.5, fontWeight: 700, color: m.done ? spring : "#94a3b8", marginTop: 2 }}>M{m.n}: {m.t}</div>
          </div>
        ))}
      </Grid3>
    </>);

    default: return null;
  }
}

/* ─── Helpers ─── */
const P = { fontSize: 12.5, lineHeight: 1.7, color: "#4a5568", margin: "4px 0 8px" };
function H4({ children }) {
  return <h4 style={{ fontSize: 13.5, fontWeight: 700, color: navy, margin: "18px 0 6px", paddingBottom: 4, borderBottom: "1px solid #edf2f7" }}>{children}</h4>;
}

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════ */

const tabs = [
  { id: "setup",  emoji: "🚀", title: "Setup",          pill: "Dependencies + Entry Point",    pillColor: sky },
  { id: "bg",     emoji: "⚙️", title: "Background",     pill: "DispatcherServlet + AutoConfig", pillColor: gold },
  { id: "hello",  emoji: "👋", title: "Hello World",     pill: "String → JSON → PathVariable",  pillColor: spring },
  { id: "rest",   emoji: "📐", title: "REST Design",     pill: "Methods + Resources + URIs",    pillColor: ember },
  { id: "layers", emoji: "🏗️", title: "Layers + DI",     pill: "Controller → DAO → Data",       pillColor: mint },
  { id: "post",   emoji: "📮", title: "POST & Response", pill: "@RequestBody + 201 Created",    pillColor: sky },
  { id: "err",    emoji: "🚨", title: "Exceptions",      pill: "@ResponseStatus + 404",         pillColor: rose },
  { id: "valid",  emoji: "✅", title: "Validation",      pill: "@Valid + @Size + @Past",         pillColor: plum },
  { id: "json",   emoji: "🔧", title: "JSON Config",     pill: "@JsonProperty",                 pillColor: gold },
  { id: "cheat",  emoji: "📋", title: "Cheat Sheet",     pill: "All Annotations + Progress",    pillColor: navy },
];

export default function SpringBootNotes() {
  const [active, setActive] = useState("setup");
  const tab = tabs.find(t => t.id === active);

  return (
    <div style={{ maxWidth: 740, margin: "0 auto", padding: "20px 16px", fontFamily: "'DM Sans', 'Segoe UI', system-ui, sans-serif", background: "#f8fafc", minHeight: "100vh" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet" />

      {/* ── Header ── */}
      <div style={{
        background: `linear-gradient(135deg, ${navy}, #243b5c)`,
        borderRadius: 16, padding: "22px 24px", marginBottom: 16,
        color: "white", position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: -30, right: -30, width: 120, height: 120, borderRadius: "50%", background: spring + "20" }} />
        <div style={{ position: "absolute", bottom: -20, right: 50, width: 70, height: 70, borderRadius: "50%", background: spring + "12" }} />
        <div style={{ fontSize: 10, fontWeight: 700, color: spring, letterSpacing: 2, textTransform: "uppercase" }}>☕ Interview Prep Notes</div>
        <div style={{ fontSize: 24, fontWeight: 800, marginTop: 4, lineHeight: 1.2 }}>Spring Boot — RESTful Web Services</div>
        <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 8 }}>Module-by-module · Basic → Advanced · Click tabs below to navigate</div>
      </div>

      {/* ── Tab Nav ── */}
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 14 }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setActive(t.id)} style={{
            padding: "6px 12px", fontSize: 11, fontWeight: active === t.id ? 700 : 400,
            borderRadius: 20, border: active === t.id ? `1.5px solid ${t.pillColor}` : "1px solid #e2e8f0",
            background: active === t.id ? t.pillColor + "12" : "white",
            color: active === t.id ? t.pillColor : "#94a3b8",
            cursor: "pointer", transition: "all 0.12s", whiteSpace: "nowrap",
            fontFamily: "inherit",
          }}>
            {t.emoji} {t.title}
          </button>
        ))}
      </div>

      {/* ── Content Card ── */}
      <div style={{
        background: "white", border: "1px solid #e2e8f0", borderRadius: 16,
        padding: "20px 22px 26px", boxShadow: "0 1px 6px rgba(0,0,0,0.04)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
          <span style={{ fontSize: 30 }}>{tab.emoji}</span>
          <div>
            <div style={{ fontWeight: 800, fontSize: 18, color: navy }}>{tab.title}</div>
            <div style={{ marginTop: 3 }}><Pill text={tab.pill} color={tab.pillColor} /></div>
          </div>
        </div>
        <Content id={active} />
      </div>

      {/* ── Footer ── */}
      <div style={{ textAlign: "center", marginTop: 18, fontSize: 10, color: "#94a3b8" }}>
        Built for Microservices interview prep · Modules 10-12 coming as you progress through the course
      </div>
    </div>
  );
}