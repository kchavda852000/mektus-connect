import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import {
  Activity,
  ArrowDown,
  ArrowRight,
  BarChart3,
  Boxes,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  CircuitBoard,
  Factory,
  Gauge,
  Layers3,
  Menu,
  Network,
  Radio,
  Send,
  ShieldCheck,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  type TooltipProps,
} from "recharts";

import factoryVisual from "@/assets/mektus-connected-factory.png";
import pharmaVisual from "@/assets/industry-pharma.jpg";
import automotiveVisual from "@/assets/industry-automotive.jpg";
import chemicalVisual from "@/assets/industry-chemical.jpg";
import grindingVisual from "@/assets/industry-grinding.jpg";
import oilGasVisual from "@/assets/industry-oil-gas.jpg";
import discreteVisual from "@/assets/industry-discrete.jpg";
const LOGO_SRC = "/mektus-logo.jpeg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MEKTUS Consultancy Solutions | Manufacturing Intelligence" },
      {
        name: "description",
        content:
          "MEKTUS connects shopfloor operations, MES, OT/IT, enterprise systems and AI into intelligent manufacturing solutions.",
      },
      { property: "og:title", content: "MEKTUS Consultancy Solutions" },
      {
        property: "og:description",
        content: "Bridging the gap between the physical factory and digital intelligence.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

const navItems = [
  ["Home", "#home"],
  ["Solutions", "#solutions"],
  ["Architecture", "#architecture"],
  ["MES & AI", "#mes-ai"],
  ["Industries", "#industries"],
  ["About", "#about"],
  ["Contact", "#contact"],
] as const;

const capabilities = [
  "MES Development",
  "OT/IT Integration",
  "Industrial AI",
  "Shopfloor Digitization",
  "Manufacturing Analytics",
  "Industry 4.0",
];

const architecture = [
  { level: "05", name: "INTELLIGENCE", detail: "AI / Analytics / Digital Transformation", icon: BrainCircuit },
  { level: "04", name: "ENTERPRISE", detail: "ERP / Business Applications", icon: Boxes },
  { level: "03", name: "OPERATIONS", detail: "MES / Production / Quality / Inventory", icon: Layers3 },
  { level: "02", name: "CONTROL", detail: "SCADA / HMI / Edge", icon: CircuitBoard },
  { level: "01", name: "SHOPFLOOR", detail: "Machines / Sensors / PLC", icon: Factory },
];

const solutions = [
  { title: "MES Development", text: "Production, quality, inventory and genealogy workflows engineered around your plant.", icon: Layers3 },
  { title: "OT/IT Integration", text: "A secure, contextual data path from controls and SCADA through enterprise systems.", icon: Network },
  { title: "Industrial AI", text: "Applied intelligence for anomalies, yield, maintenance and operational decisions.", icon: BrainCircuit },
  { title: "Shopfloor Digitization", text: "Connected workstations, guided operations and real-time production visibility.", icon: Factory },
  { title: "Manufacturing Analytics", text: "Trusted KPIs and actionable insight across lines, plants and the enterprise.", icon: BarChart3 },
  { title: "Industry 4.0 Solutions", text: "Practical transformation roadmaps grounded in assets, people and process.", icon: Zap },
];

const industryDetails = [
  {
    name: "Pharmaceutical Manufacturing", short: "Pharmaceutical", image: pharmaVisual, imageAlt: "Sterile pharmaceutical filling and inspection line in a cleanroom", code: "PHARMA / 01",
    challenge: "Maintain complete, reviewable batch evidence while connecting validated production and cleanroom data to quality decisions.",
    solution: "An MES workflow linking electronic batch records, cleanroom sensors, serial genealogy and QA disposition with controlled electronic signatures.",
    deliverables: ["Electronic Batch Records (EBR)", "21 CFR Part 11-aligned audit trails & electronic signatures", "Serial genealogy & cleanroom sensor integration", "Real-time QA hold / release workflows"],
  },
  {
    name: "Automotive & Component Assembly", short: "Automotive", image: automotiveVisual, imageAlt: "Robotic automotive chassis assembly cell", code: "ASSEMBLY / 02",
    challenge: "Keep pace with the line while preserving traceability for every fitted component, tool result and inspection decision.",
    solution: "A connected assembly execution layer joins VIN and chassis genealogy with torque tools, inline inspection and line performance signals.",
    deliverables: ["End-to-end VIN & chassis component genealogy", "Torque and tool data capture", "Automated inline inspection & Poka-Yoke error-proofing", "Real-time line-speed & OEE tracking"],
  },
  {
    name: "Chemical & Process Plants", short: "Chemical", image: chemicalVisual, imageAlt: "Stainless steel chemical reactors, piping and instrumentation", code: "PROCESS / 03",
    challenge: "Bring recipe execution, continuous process conditions and material accountability into one operational view.",
    solution: "A process-aware MES and OT integration layer contextualizes reactor telemetry and historian records against batches, materials and yield.",
    deliverables: ["Batch recipe management", "Continuous reactor telemetry", "Process historian integration", "Hazardous material handling logs", "Dynamic yield optimization"],
  },
  {
    name: "Grinding Media Manufacturing", short: "Grinding Media", image: grindingVisual, imageAlt: "Forged grinding media steel balls near a heat treatment furnace and quench line", code: "METALS / 04",
    challenge: "Trace thermal history and material properties from furnace cycle through quench, finished lot and in-service wear.",
    solution: "A lot-centric manufacturing data thread connects furnace and quench signals with hardness results and consumable performance analytics.",
    deliverables: ["High-temperature furnace monitoring", "Quenching cycle logs", "Batch-to-lot hardness & metallurgical traceability", "Consumable wear-rate predictive analytics"],
  },
  {
    name: "Oil & Gas Infrastructure", short: "Oil & Gas", image: oilGasVisual, imageAlt: "Oil and gas refinery with pipelines, processing towers and instrumentation", code: "ENERGY / 05",
    challenge: "Unify distributed operational signals without losing visibility of asset condition or hazardous-environment requirements.",
    solution: "A secure SCADA-to-cloud bridge and edge dashboards bring remote telemetry into asset diagnostics and operational review.",
    deliverables: ["Remote asset telemetry", "SCADA-to-cloud bridge", "Edge operational dashboards", "Pump & compressor health diagnostics", "Hazardous environment compliance workflows"],
  },
  {
    name: "General & Discrete Manufacturing", short: "Discrete Manufacturing", image: discreteVisual, imageAlt: "Connected CNC shopfloor with digital machine operator terminals", code: "SHOPFLOOR / 06",
    challenge: "Replace fragmented paper instructions and manual status updates with timely, actionable shopfloor information.",
    solution: "A paperless execution layer connects operator terminals and CNC assets to instructions, downtime events and inventory movements.",
    deliverables: ["Paperless shopfloor digitization", "Digital work instructions (SOPs)", "Real-time machine status & downtime tracking", "Tool crib & inventory management"],
  },
] as const;

const industries = industryDetails.map((industry) => industry.name);

const hourlyProduction = [
  { time: "06:00", output: 112 }, { time: "07:00", output: 126 },
  { time: "08:00", output: 119 }, { time: "09:00", output: 138 },
  { time: "10:00", output: 132 }, { time: "11:00", output: 146 },
  { time: "12:00", output: 151 }, { time: "13:00", output: 128 },
  { time: "14:00", output: 154 }, { time: "15:00", output: 143 },
  { time: "16:00", output: 158 }, { time: "17:00", output: 148 },
];

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.65 },
};

function Brand({ inverse = false }: { inverse?: boolean }) {
  return (
    <a href="#home" className="flex min-w-0 items-center gap-3" aria-label="MEKTUS home">
      <span className="grid h-10 w-10 shrink-0 place-items-center overflow-hidden bg-brand-light">
        <img src={LOGO_SRC} alt="MEKTUS Consultancy Solutions logo" className="h-full w-full object-cover" width={48} height={48} />
      </span>
      <span className="min-w-0 leading-none">
        <strong className={`block font-display text-base font-extrabold ${inverse ? "text-brand-white" : "text-brand-navy"}`}>MEKTUS</strong>
        <span className={`mt-1 block text-[8px] font-bold tracking-[0.15em] ${inverse ? "text-brand-white/60" : "text-muted-foreground"}`}>
          CONSULTANCY SOLUTIONS
        </span>
      </span>
    </a>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "border-b border-brand-white/10 bg-brand-navy/90 shadow-nav backdrop-blur-xl" : "bg-transparent"}`}>
      <div className="mx-auto grid h-20 max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center px-5 lg:grid-cols-[auto_1fr_auto] lg:px-8">
        <Brand inverse />
        <nav className="hidden items-center justify-center gap-7 lg:flex" aria-label="Main navigation">
          {navItems.map(([label, href]) => (
            <a key={href} href={href} className="nav-link text-xs font-semibold text-brand-white/70 transition-colors hover:text-brand-white">
              {label}
            </a>
          ))}
        </nav>
        <Button asChild className="hidden h-11 rounded-none bg-brand-orange px-6 font-bold text-brand-navy shadow-none hover:bg-brand-orange-bright lg:inline-flex">
          <a href="#contact">Let&apos;s Talk <ArrowRight /></a>
        </Button>
        <Button variant="ghost" size="icon" className="h-11 w-11 text-brand-white hover:bg-brand-white/10 hover:text-brand-white lg:hidden" onClick={() => setOpen(true)} aria-label="Open menu">
          <Menu className="size-6" />
        </Button>
      </div>
      {open && (
        <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} className="fixed inset-0 z-50 overflow-y-auto bg-brand-navy px-4 py-5 sm:px-6 lg:hidden">
          <div className="flex items-center justify-between"><Brand inverse /><Button variant="ghost" size="icon" className="text-brand-white hover:bg-brand-white/10" onClick={() => setOpen(false)} aria-label="Close menu"><X className="size-6" /></Button></div>
          <nav className="mt-16 flex flex-col" aria-label="Mobile navigation">
            {navItems.map(([label, href], index) => (
              <a key={href} href={href} onClick={() => setOpen(false)} className="flex min-h-14 items-center justify-between border-b border-brand-white/10 py-4 font-display text-xl font-bold text-brand-white sm:text-2xl">
                <span><small className="mr-4 font-mono text-xs text-brand-orange">0{index + 1}</small>{label}</span><ChevronRight className="text-brand-orange" />
              </a>
            ))}
          </nav>
        </motion.div>
      )}
    </header>
  );
}

function SectionHeading({ tag, title, text, light = false }: { tag: string; title: string; text?: string; light?: boolean }) {
  return (
    <motion.div {...reveal} className="max-w-3xl">
      <p className="mb-5 flex items-center gap-3 font-mono text-xs font-bold uppercase tracking-[0.18em] text-brand-orange"><span className="h-px w-8 bg-brand-orange" />{tag}</p>
      <h2 className={`font-display text-3xl font-bold leading-[1.1] sm:text-4xl lg:text-5xl ${light ? "text-brand-white" : "text-brand-navy"}`}>{title}</h2>
      {text && <p className={`mt-5 max-w-2xl text-base leading-7 sm:text-lg ${light ? "text-brand-white/65" : "text-muted-foreground"}`}>{text}</p>}
    </motion.div>
  );
}

function Hero() {
  const { scrollY } = useScroll();
  const visualY = useTransform(scrollY, [0, 800], [0, 80]);
  return (
    <section id="home" className="relative min-h-[760px] overflow-hidden bg-brand-navy pt-20 lg:min-h-[820px]">
      <div className="industrial-grid absolute inset-0 opacity-35" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-brand-white/10" />
      <div className="relative mx-auto grid max-w-7xl items-center px-4 py-12 sm:min-h-[680px] sm:px-6 sm:py-16 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:py-12">
        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="relative z-10 max-w-2xl">
          <div className="mb-7 inline-flex items-center gap-3 border border-brand-white/15 bg-brand-white/5 px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-brand-white/70">
            <span className="signal-dot" /> Manufacturing Technology Consultancy
          </div>
          <h1 className="font-display text-4xl font-extrabold leading-[1.04] text-brand-white sm:text-5xl lg:text-7xl">
            Transforming Manufacturing with <span className="text-brand-orange">MES, OT/IT &amp; AI</span>
          </h1>
          <p className="mt-7 max-w-xl text-base leading-7 text-brand-white/68 sm:text-lg">
            We connect shopfloor operations, industrial systems, enterprise applications and AI into intelligent manufacturing solutions.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="h-13 rounded-none bg-brand-orange px-7 font-bold text-brand-navy shadow-none hover:bg-brand-orange-bright"><a href="#solutions">Explore Our Solutions <ArrowDown /></a></Button>
            <Button asChild size="lg" variant="outline" className="h-13 rounded-none border-brand-white/35 bg-transparent px-7 font-bold text-brand-white shadow-none hover:bg-brand-white hover:text-brand-navy"><a href="#contact">Talk to Our Experts <ArrowRight /></a></Button>
          </div>
          <div className="mt-12 flex items-center gap-5 border-t border-brand-white/10 pt-6 text-xs text-brand-white/45">
            <span className="font-mono text-brand-orange">FACTORY TO INTELLIGENCE</span><span className="hidden h-px flex-1 bg-brand-white/10 sm:block" />
          </div>
        </motion.div>
        <motion.div style={{ y: visualY }} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, duration: 1 }} className="relative mt-6 h-[260px] min-w-0 sm:h-[380px] lg:-mr-20 lg:ml-[-6rem] lg:mt-0 lg:h-[660px]">
          <img src={factoryVisual} alt="Connected manufacturing shopfloor flowing into MES and AI intelligence" width={1600} height={1000} className="h-full w-full object-contain object-center" />
          <div className="absolute bottom-10 right-20 hidden border-l-2 border-brand-orange bg-brand-navy/80 px-4 py-3 backdrop-blur-md sm:block lg:right-28">
            <span className="block font-mono text-[10px] uppercase tracking-[0.14em] text-brand-white/45">Live signal path</span>
            <strong className="mt-1 block text-sm text-brand-white">Machine → MES → Intelligence</strong>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Marquee() {
  const items = [...capabilities, ...capabilities];
  return <div className="overflow-hidden border-b border-brand-navy/10 bg-brand-orange py-4"><div className="marquee-track flex w-max items-center">{items.map((item, i) => <span key={`${item}-${i}`} className="flex items-center whitespace-nowrap font-mono text-xs font-bold uppercase tracking-[0.12em] text-brand-navy"><span className="mx-7 size-1.5 rotate-45 bg-brand-navy" />{item}</span>)}</div></div>;
}

function ConnectedFlow() {
  const flow = ["Machines", "PLC / OT", "SCADA / HMI", "MES", "ERP", "AI / Analytics"];
  return (
    <section id="about" className="bg-background py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading tag="The connected plant" title="Manufacturing is Connected. Your Systems Should Be Too." text="We create the digital thread that turns fragmented plant signals into trusted context, coordinated operations and faster decisions." />
        <motion.div {...reveal} className="mt-14 grid overflow-hidden border border-border bg-card sm:grid-cols-3 lg:grid-cols-6">
          {flow.map((item, i) => <div key={item} className="group relative flex min-h-36 flex-col justify-between border-b border-r border-border p-5 last:border-r-0 sm:[&:nth-child(n+4)]:border-b-0 lg:border-b-0">
            <span className="font-mono text-[10px] text-muted-foreground">0{i + 1}</span>
            <Radio className="size-5 text-brand-orange" />
            <strong className="text-sm text-brand-navy">{item}</strong>
            {i < flow.length - 1 && <span className="absolute right-[-6px] top-1/2 z-10 hidden size-3 -translate-y-1/2 rotate-45 border border-brand-orange bg-background lg:block"><span className="absolute inset-[3px] bg-brand-orange" /></span>}
          </div>)}
        </motion.div>
      </div>
    </section>
  );
}

function Architecture() {
  const [active, setActive] = useState(0);
  return (
    <section id="architecture" className="bg-brand-light py-24 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-14 lg:px-8">
        <div><SectionHeading tag="Reference architecture" title="One Digital Thread. Five Connected Layers." text="Inspect each layer to see how we connect operational truth with enterprise context and applied intelligence." /><div className="mt-8 border-l-2 border-brand-orange pl-5"><p className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Active layer</p><p className="mt-2 font-display text-xl font-bold text-brand-navy">{architecture[active]?.name ?? "INTELLIGENCE"}</p><p className="mt-1 text-sm text-muted-foreground">{architecture[active]?.detail ?? "AI / Analytics / Digital Transformation"}</p></div></div>
        <motion.div {...reveal} className="min-w-0 space-y-2">
          {architecture.map((layer, i) => {
            const Icon = layer.icon;
            return <button key={layer.name} type="button" onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} onClick={() => setActive(i)} className={`architecture-layer grid w-full grid-cols-[auto_auto_minmax(0,1fr)_auto] items-center gap-3 border px-3 py-4 text-left transition-all sm:gap-4 sm:px-6 sm:py-5 ${active === i ? "border-brand-orange bg-brand-navy text-brand-white shadow-architecture" : "border-brand-navy/12 bg-brand-white text-brand-navy hover:border-brand-orange"}`}>
              <span className={`font-mono text-[10px] sm:text-xs ${active === i ? "text-brand-orange" : "text-muted-foreground"}`}>{layer.level}</span><Icon className={`size-4 sm:size-5 ${active === i ? "text-brand-orange" : "text-brand-navy"}`} /><span className="min-w-0"><strong className="block text-xs sm:text-sm">{layer.name}</strong><small className={`mt-1 block text-[10px] leading-4 sm:text-xs ${active === i ? "text-brand-white/55" : "text-muted-foreground"}`}>{layer.detail}</small></span><span className={`signal-dot ${active === i ? "opacity-100" : "opacity-30"}`} />
            </button>;
          })}
        </motion.div>
      </div>
    </section>
  );
}

function Solutions() {
  return (
    <section id="solutions" className="bg-background py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading tag="Core solutions" title="What We Build" text="Manufacturing systems engineered to work in the reality of your plant—not isolated technology experiments." />
        <div className="mt-14 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
          {solutions.map((solution, i) => { const Icon = solution.icon; return <motion.article {...reveal} key={solution.title} className="solution-card group min-h-72 bg-background p-7 transition-all duration-300 hover:z-10 hover:-translate-y-1 hover:shadow-card sm:p-8"><div className="flex items-start justify-between"><span className="font-mono text-xs font-bold text-brand-orange">{String(i + 1).padStart(2, "0")}</span><Icon className="size-7 text-brand-navy transition-colors group-hover:text-brand-orange" /></div><div className="mt-20"><h3 className="font-display text-xl font-bold text-brand-navy">{solution.title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{solution.text}</p></div><div className="mt-6 h-0.5 w-8 bg-brand-orange transition-all duration-300 group-hover:w-full" /></motion.article>; })}
        </div>
      </div>
    </section>
  );
}

function Dashboard() {
  return (
    <section id="mes-ai" className="overflow-hidden bg-brand-navy py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid min-w-0 gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
          <div className="min-w-0"><SectionHeading light tag="MES + AI" title="From Production Data to Manufacturing Intelligence." text="A unified operating view helps teams understand performance, detect risk and act with confidence." /><ul className="mt-9 space-y-4">{["Real-time operational context", "AI-assisted anomaly detection", "Production, quality and downtime insight"].map(item => <li key={item} className="flex items-center gap-3 text-sm text-brand-white/75"><CheckCircle2 className="size-5 shrink-0 text-brand-orange" />{item}</li>)}</ul></div>
          <motion.div {...reveal} className="dashboard-shell min-w-0 overflow-hidden border border-brand-white/12 bg-dashboard p-3 shadow-dashboard sm:p-5">
            <div className="mb-4 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-b border-brand-white/10 pb-4"><div className="min-w-0"><p className="truncate font-mono text-[10px] uppercase tracking-[0.16em] text-brand-white/40">Plant 01 · Live Operations</p><h3 className="mt-1 truncate font-display text-base font-bold text-brand-white">Manufacturing Intelligence</h3></div><span className="flex shrink-0 items-center gap-2 font-mono text-[10px] text-status-good"><span className="status-pulse" /> LIVE</span></div>
            <div className="grid gap-3 sm:grid-cols-3">
              <Metric label="OEE" value="88.4%" change="+3.2%" icon={Gauge} />
              <Metric label="Production Rate" value="142" suffix="u/hr" change="On target" icon={Activity} />
              <Metric label="Quality Index" value="99.2%" change="+0.6%" icon={ShieldCheck} />
            </div>
            <div className="mt-3 grid min-w-0 gap-3 md:grid-cols-[1.25fr_0.75fr]">
              <div className="min-w-0 border border-brand-white/10 bg-brand-navy/45 p-3 sm:p-4"><div className="flex items-center justify-between gap-3"><span className="font-mono text-[10px] uppercase text-brand-white/45">Hourly throughput</span><span className="shrink-0 text-xs text-brand-orange">Target 135</span></div><div className="mt-4 h-[220px] w-full min-w-0 sm:h-[260px]"><ResponsiveContainer width="100%" height="100%"><BarChart data={hourlyProduction} margin={{ top: 10, right: 4, left: -24, bottom: 0 }}><CartesianGrid stroke="var(--chart-grid)" strokeDasharray="3 3" vertical={false} /><XAxis dataKey="time" stroke="var(--chart-axis)" tickLine={false} axisLine={false} tick={{ fontSize: 9 }} interval="preserveStartEnd" /><YAxis stroke="var(--chart-axis)" tickLine={false} axisLine={false} tick={{ fontSize: 9 }} domain={[0, 180]} /><Tooltip content={<ThroughputTooltip />} cursor={{ fill: "var(--chart-cursor)" }} /><ReferenceLine y={135} stroke="var(--brand-orange)" strokeDasharray="4 4" /><Bar dataKey="output" name="Output" fill="var(--brand-orange)" radius={[2, 2, 0, 0]} maxBarSize={24} /></BarChart></ResponsiveContainer></div></div>
              <div className="border border-brand-white/10 bg-brand-navy/45 p-4"><span className="font-mono text-[10px] uppercase text-brand-white/45">Machine status</span><div className="mt-5 space-y-4">{[["Running", "12", "bg-status-good"],["Idle", "2", "bg-brand-orange"],["Down", "1", "bg-destructive"]].map(([a,b,c])=><div key={a} className="grid grid-cols-[auto_1fr_auto] items-center gap-3 text-xs text-brand-white/70"><span className={`size-2 ${c}`} /><span>{a}</span><strong className="text-brand-white">{b}</strong></div>)}</div><div className="mt-6 border-t border-brand-white/10 pt-4"><span className="font-mono text-[10px] uppercase text-brand-white/45">Downtime</span><strong className="mt-2 block text-2xl text-brand-white">00:24:18</strong></div></div>
            </div>
            <div className="mt-3 grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 border border-brand-orange/35 bg-brand-orange/8 p-4 sm:grid-cols-[auto_minmax(0,1fr)_auto]"><BrainCircuit className="size-5 shrink-0 text-brand-orange" /><div className="min-w-0"><p className="font-mono text-[9px] uppercase tracking-[0.12em] text-brand-orange">AI anomaly detection</p><p className="mt-1 text-xs leading-5 text-brand-white/75">Spindle vibration pattern outside expected range · CNC-04</p></div><span className="hidden text-xs font-bold text-brand-orange sm:block">Review</span></div>
            <p className="mt-4 text-center font-mono text-[9px] uppercase tracking-[0.14em] text-brand-white/30">Illustrative Manufacturing Intelligence Dashboard</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ThroughputTooltip({ active, payload, label }: TooltipProps<number, string>) {
  if (!active || !payload?.length) return null;
  return <div className="border border-brand-orange/40 bg-brand-navy px-3 py-2 shadow-dashboard"><p className="font-mono text-[9px] text-brand-white/45">{label}</p><p className="mt-1 text-xs font-bold text-brand-white">{payload[0]?.value} units/hour</p></div>;
}

function Metric({ label, value, suffix, change, icon: Icon }: { label:string; value:string; suffix?:string; change:string; icon:typeof Gauge }) {
  return <div className="border border-brand-white/10 bg-brand-navy/45 p-4"><div className="flex items-center justify-between"><span className="font-mono text-[9px] uppercase tracking-[0.1em] text-brand-white/40">{label}</span><Icon className="size-4 text-brand-orange" /></div><strong className="mt-5 block text-2xl text-brand-white sm:text-3xl">{value} <small className="text-xs font-normal text-brand-white/40">{suffix}</small></strong><span className="mt-2 block text-[10px] text-status-good">{change}</span></div>;
}

function Industries() {
  const [active, setActive] = useState(0);
  const detailRef = useRef<HTMLDivElement>(null);
  const selected = industryDetails[active];
  const selectIndustry = (index: number) => {
    setActive(index);
    if (window.matchMedia("(max-width: 639px)").matches) {
      window.setTimeout(() => detailRef.current?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "start" }), 50);
    }
  };

  return (
    <section id="industries" className="bg-brand-light py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading tag="Industry expertise" title="Built for Manufacturing Reality." text="We connect the systems, signals and decisions that matter in each production environment." />
        <div className="mt-10 grid min-w-0 gap-3 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3" aria-label="Explore industries">
          {industryDetails.map((industry, i) => (
            <motion.div {...reveal} key={industry.name} className="min-w-0">
              <Button
                type="button"
                variant="ghost"
                aria-pressed={active === i}
                aria-controls="industry-detail"
                onClick={() => selectIndustry(i)}
                className={`group relative block h-auto w-full overflow-hidden rounded-none border p-0 text-left shadow-none transition-all duration-300 focus-visible:ring-2 focus-visible:ring-brand-orange ${active === i ? "border-brand-orange bg-brand-navy" : "border-brand-navy/15 bg-brand-navy hover:border-brand-orange"}`}
              >
                <span className="relative block aspect-[1.65] w-full overflow-hidden">
                  <img src={industry.image} alt={industry.imageAlt} width={1200} height={800} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <span className="absolute inset-0 bg-brand-navy/15" />
                  <span className="absolute left-4 top-4 border border-brand-white/30 bg-brand-navy/85 px-2 py-1 font-mono text-[10px] text-brand-white backdrop-blur-sm">{industry.code}</span>
                </span>
                <span className="flex min-h-20 items-center justify-between gap-3 px-4 py-4 sm:px-5">
                  <span className="min-w-0 whitespace-normal font-display text-base font-bold leading-snug text-brand-white sm:text-lg">{industry.name}</span>
                  <ArrowRight className={`size-5 shrink-0 text-brand-orange transition-transform ${active === i ? "rotate-90" : "group-hover:translate-x-1"}`} />
                </span>
                <span className={`absolute inset-x-0 bottom-0 h-1 bg-brand-orange transition-opacity ${active === i ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`} />
              </Button>
            </motion.div>
          ))}
        </div>
        <div ref={detailRef} id="industry-detail" className="mt-5 scroll-mt-24 border-l-4 border-brand-orange bg-brand-navy p-5 text-brand-white sm:p-8 lg:p-10" aria-live="polite">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-b border-brand-white/15 pb-5">
            <span className="font-mono text-[10px] font-bold uppercase text-brand-orange">{selected.code}</span>
            <h3 className="font-display text-xl font-bold sm:text-2xl">{selected.name}</h3>
          </div>
          <div className="grid gap-8 pt-7 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1.2fr] lg:gap-10">
            <div><h4 className="font-mono text-[10px] font-bold uppercase text-brand-orange">The challenge</h4><p className="mt-3 text-sm leading-7 text-brand-white/75">{selected.challenge}</p></div>
            <div><h4 className="font-mono text-[10px] font-bold uppercase text-brand-orange">MEKTUS MES / OT approach</h4><p className="mt-3 text-sm leading-7 text-brand-white/75">{selected.solution}</p></div>
            <div className="sm:col-span-2 lg:col-span-1"><h4 className="font-mono text-[10px] font-bold uppercase text-brand-orange">Project deliverables</h4><ul className="mt-3 space-y-2">{selected.deliverables.map((item) => <li key={item} className="flex items-start gap-3 text-sm leading-6 text-brand-white/85"><span className="mt-2 size-1.5 shrink-0 bg-brand-orange" />{item}</li>)}</ul></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); if (event.currentTarget.reportValidity()) setSent(true); };
  const fieldClass = "h-12 rounded-none border-brand-navy/15 bg-brand-white px-4 shadow-none focus-visible:ring-brand-orange";
  return <section id="contact" className="bg-background py-24 sm:py-28"><div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.7fr_1.3fr] lg:gap-14 lg:px-8"><div><SectionHeading tag="Start a conversation" title="Let’s Connect Your Manufacturing Future." text="Tell us where your plant is today and what you need to make possible next." /><div className="mt-10 space-y-6 border-t border-border pt-8"><div><span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Our approach</span><p className="mt-2 text-sm leading-6 text-brand-navy">Discover the operation. Map the architecture. Deliver measurable manufacturing value.</p></div><div className="flex items-center gap-3 text-sm font-semibold text-brand-navy"><span className="grid size-9 place-items-center bg-brand-orange"><Factory className="size-4" /></span>Physical factory to digital intelligence</div></div></div>
    <motion.div {...reveal} className="border border-border bg-brand-light p-5 sm:p-8">{sent ? <div className="grid min-h-[480px] place-items-center text-center"><div><span className="mx-auto grid size-16 place-items-center bg-brand-orange"><CheckCircle2 className="size-7 text-brand-navy" /></span><h3 className="mt-6 font-display text-2xl font-bold text-brand-navy">Inquiry received.</h3><p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">Thank you. A MEKTUS manufacturing technology expert will connect with you shortly.</p></div></div> : <form onSubmit={submit} className="grid gap-5 sm:grid-cols-2"><Field label="Name"><Input required maxLength={100} name="name" autoComplete="name" className={fieldClass} placeholder="Your name" /></Field><Field label="Company"><Input required maxLength={120} name="company" autoComplete="organization" className={fieldClass} placeholder="Company name" /></Field><Field label="Work Email"><Input required maxLength={255} type="email" name="email" autoComplete="email" className={fieldClass} placeholder="name@company.com" /></Field><Field label="Phone"><Input maxLength={30} type="tel" name="phone" autoComplete="tel" className={fieldClass} placeholder="+00 000 000 0000" /></Field><Field label="Industry"><Select required name="industry"><SelectTrigger className={fieldClass}><SelectValue placeholder="Select industry" /></SelectTrigger><SelectContent>{industries.map(x=><SelectItem key={x} value={x}>{x}</SelectItem>)}</SelectContent></Select></Field><Field label="Area of Interest"><Select required name="interest"><SelectTrigger className={fieldClass}><SelectValue placeholder="Select solution" /></SelectTrigger><SelectContent>{capabilities.map(x=><SelectItem key={x} value={x}>{x}</SelectItem>)}</SelectContent></Select></Field><Field label="Message" wide><Textarea required minLength={10} maxLength={1500} name="message" className="min-h-36 rounded-none border-brand-navy/15 bg-brand-white p-4 shadow-none focus-visible:ring-brand-orange" placeholder="Tell us about your manufacturing challenge, current systems and goals." /></Field><div className="sm:col-span-2"><Button type="submit" className="h-13 w-full rounded-none bg-brand-orange px-8 font-bold text-brand-navy shadow-none hover:bg-brand-orange-bright sm:w-auto">Send Inquiry <Send /></Button></div></form>}</motion.div></div></section>;
}

function Field({ label, children, wide=false }: { label:string; children:React.ReactNode; wide?:boolean }) { return <label className={wide ? "sm:col-span-2" : ""}><span className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-brand-navy/60">{label}</span>{children}</label>; }

function Footer() {
  return <footer className="border-t border-brand-white/10 bg-brand-navy"><div className="mx-auto max-w-7xl px-5 py-14 lg:px-8"><div className="grid gap-12 md:grid-cols-[1.2fr_0.8fr_0.8fr]"><div><Brand inverse /><p className="mt-6 max-w-sm font-display text-xl font-semibold leading-7 text-brand-white">Manufacturing Technology.<br/><span className="text-brand-orange">Connected Intelligence.</span></p></div><div><p className="font-mono text-[10px] uppercase tracking-[0.16em] text-brand-white/35">Solutions</p><div className="mt-5 grid gap-3">{capabilities.slice(0,4).map(x=><a key={x} href="#solutions" className="text-sm text-brand-white/60 hover:text-brand-orange">{x}</a>)}</div></div><div><p className="font-mono text-[10px] uppercase tracking-[0.16em] text-brand-white/35">Navigate</p><div className="mt-5 grid gap-3">{navItems.slice(1,5).map(([x,h])=><a key={x} href={h} className="text-sm text-brand-white/60 hover:text-brand-orange">{x}</a>)}</div></div></div><div className="mt-14 flex flex-col gap-3 border-t border-brand-white/10 pt-6 text-xs text-brand-white/35 sm:flex-row sm:items-center sm:justify-between"><p>© 2026 MEKTUS Consultancy Solutions. All rights reserved.</p><p className="font-mono uppercase tracking-[0.1em]">Machines → Data → Intelligence</p></div></div></footer>;
}

function HomePage() {
  return <main className="w-full min-w-0 overflow-x-hidden"><Header /><Hero /><Marquee /><ConnectedFlow /><Architecture /><Solutions /><Dashboard /><Industries /><Contact /><Footer /></main>;
}