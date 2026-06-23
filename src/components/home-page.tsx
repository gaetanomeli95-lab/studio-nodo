"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Code2, Compass, Layers3, LineChart, MapPin, MousePointer2, Target, MessageCircle, Mail, UtensilsCrossed, Coffee, Pizza, Sparkles, Hotel, BedDouble, Store, Briefcase, Gem } from "lucide-react";
import type { ReactNode } from "react";
import { useRef, useState } from "react";
import { CustomCursor } from "@/components/custom-cursor";
import { HeroBackdrop } from "@/components/hero-backdrop";
import { PageTransition } from "@/components/page-transition";
import { MagneticButton } from "@/components/magnetic-button";
import { Reveal } from "@/components/reveal";
import { RevealText } from "@/components/reveal-text";
import { ScrollProgress } from "@/components/scroll-progress";
import { cn } from "@/lib/cn";
import { TiltCard, SpotlightCard, AnimatedCounter, AccordionItem, MagneticWrapper } from "@/components/interactive";
import { AnimatePresence } from "framer-motion";

const heroImages = {
  presence: "/images/hero-studio-nodo.png",
  strategy: "/images/hero-studio-nodo 2.png",
  creation: "/images/hero-studio-nodo 3.png",
  framework: "/images/hero-studio-nodo 4.png",
  web: "/images/hero-studio-nodo 5.png"
};

const services = [
  {
    icon: Compass,
    title: "Gestione Social Media",
    description: "Gestione completa di TikTok, Instagram e Facebook. Oggi TikTok è il social numero uno per visibilità: creo contenuti video che catturano l'attenzione e costruiscono una presenza editoriale riconoscibile e coerente con il valore della tua attività.",
    benefit: "Più fiducia prima ancora del primo contatto.",
    platforms: "TikTok · Instagram · Facebook",
    color: "emerald",
    glow: "rgba(52,211,153,0.15)",
    tiktok: true
  },
  {
    icon: Target,
    title: "Strategia dei Contenuti",
    description: "Pilastri, calendario, messaggi e direzione creativa pensati per parlare alle persone giuste. TikTok è oggi il social n.1 per raggiungere nuove persone: investo su contenuti TikTok-first, poi replicati su Reels e Storie.",
    benefit: "Contenuti meno casuali, decisioni più chiare.",
    platforms: "TikTok-first · Reels · Storie",
    color: "rose",
    glow: "rgba(251,113,133,0.15)",
    tiktok: true
  },
  {
    icon: Layers3,
    title: "Progettazione Siti Web",
    description: "Siti e landing page veloci, eleganti e costruiti per trasformare interesse in richiesta concreta.",
    benefit: "Una destinazione di qualità per chi ti scopre online.",
    platforms: "Siti web · Landing page",
    color: "sky",
    glow: "rgba(56,189,248,0.15)"
  },
  {
    icon: Code2,
    title: "Sviluppo App",
    description: "Interfacce digitali, strumenti su misura e applicazioni leggere per semplificare processi e vendite.",
    benefit: "Tecnologia utile, non decorativa.",
    platforms: "App · Strumenti web",
    color: "amber",
    glow: "rgba(251,191,36,0.15)"
  }
];

const process = [
  {
    step: "01",
    title: "Analisi",
    copy: "Capisco attività, pubblico, posizionamento, margini e obiettivi reali. Analizzo dove sei già presente — TikTok, Instagram, Google — e cosa manca. Prima di creare, ascolto.",
    color: "emerald"
  },
  {
    step: "02",
    title: "Strategia",
    copy: "Definisco messaggi, canali, contenuti e architettura digitale. TikTok al centro: è il social con la crescita più rapida e il maggior potenziale di visibilità per le attività locali.",
    color: "sky"
  },
  {
    step: "03",
    title: "Creazione",
    copy: "Produco contenuti video TikTok-first: hook, storytelling visivo, montaggio veloce e trend audio. Poi adatto lo stesso contenuto per Reels e Storie, mantenendo una direzione estetica coerente e riconoscibile.",
    color: "rose"
  },
  {
    step: "04",
    title: "Pubblicazione",
    copy: "Pubblico su TikTok come canale principale, poi su Instagram e Facebook. Monitoro performance, esperienza mobile, chiarezza del percorso e percezione di qualità su ogni piattaforma.",
    color: "amber"
  },
  {
    step: "05",
    title: "Ottimizzazione",
    copy: "Osservo, misuro e miglioro. Il digitale non resta fermo: si affina con il comportamento reale delle persone.",
    color: "violet"
  }
];

const trustItems = [
  { label: "Da Palermo", value: 100, suffix: "%", desc: "Su misura, niente template", color: "emerald", glow: "rgba(52,211,153,0.12)" },
  { label: "Freelance", value: 1, suffix: "", desc: "Contatto diretto, niente agenzie", color: "sky", glow: "rgba(56,189,248,0.12)" },
  { label: "Social media manager", value: 3, suffix: " piatti", desc: "TikTok, Instagram, Facebook", color: "rose", glow: "rgba(251,113,133,0.12)" },
  { label: "Sviluppatore web", value: 24, suffix: "h", desc: "Risposta garantita entro 24 ore", color: "amber", glow: "rgba(251,191,36,0.12)" }
];

const localClients = [
  { name: "Ristoranti", icon: UtensilsCrossed, desc: "Menu, piatti, atmosfera", color: "emerald" },
  { name: "Bar", icon: Coffee, desc: "Caffè, cocktail, vibe", color: "amber" },
  { name: "Pizzerie", icon: Pizza, desc: "Forno, impasto, tradizione", color: "rose" },
  { name: "Centri estetici", icon: Sparkles, desc: "Trattamenti, risultati, eleganza", color: "violet" },
  { name: "Hotel", icon: Hotel, desc: "Camere, esperienze, accoglienza", color: "sky" },
  { name: "B&B", icon: BedDouble, desc: "Calore, unicità, soggiorni", color: "emerald" },
  { name: "Negozi", icon: Store, desc: "Vetrine, prodotti, vendite", color: "amber" },
  { name: "Professionisti", icon: Briefcase, desc: "Competenza, fiducia, autorità", color: "sky" },
  { name: "Marche locali", icon: Gem, desc: "Identità, artigianato, valore", color: "rose" }
];

const colorMap: Record<string, { text: string; bg: string; border: string; glow: string; gradient: string }> = {
  emerald: { text: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-400/40", glow: "shadow-[0_0_30px_rgba(52,211,153,0.2)]", gradient: "from-emerald-400/[0.12]" },
  rose: { text: "text-rose-400", bg: "bg-rose-400/10", border: "border-rose-400/40", glow: "shadow-[0_0_30px_rgba(251,113,133,0.2)]", gradient: "from-rose-400/[0.12]" },
  sky: { text: "text-sky-400", bg: "bg-sky-400/10", border: "border-sky-400/40", glow: "shadow-[0_0_30px_rgba(56,189,248,0.2)]", gradient: "from-sky-400/[0.12]" },
  amber: { text: "text-amber-400", bg: "bg-amber-400/10", border: "border-amber-400/40", glow: "shadow-[0_0_30px_rgba(251,191,36,0.2)]", gradient: "from-amber-400/[0.12]" },
  violet: { text: "text-violet-400", bg: "bg-violet-400/10", border: "border-violet-400/40", glow: "shadow-[0_0_30px_rgba(167,139,250,0.2)]", gradient: "from-violet-400/[0.12]" }
};

const imageStory = [
  {
    image: heroImages.strategy,
    label: "Strategia",
    title: "Non pubblico contenuti. Costruisco direzione.",
    copy: "Questa immagine guida la parte strategica: analisi dati, obiettivi, pilastri e calendario. È il livello nascosto che rende il contenuto più efficace."
  },
  {
    image: heroImages.creation,
    label: "Creazione",
    title: "Ogni visual deve comunicare prima di essere bello.",
    copy: "Bacheche di ispirazione, palette, texture e contenuti TikTok diventano un linguaggio riconoscibile per attività locali che vogliono essere ricordate."
  },
  {
    image: heroImages.web,
    label: "Conversione",
    title: "Il sito è il punto in cui l'attenzione diventa scelta.",
    copy: "I contenuti su TikTok e Instagram portano interesse. Il sito dà profondità, fiducia e una strada semplice per contattarti."
  }
];

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="mb-5 inline-flex items-center gap-3 text-[0.68rem] font-semibold uppercase tracking-micro text-nodo-accent">
      <span className="h-px w-8 bg-nodo-accent/60" />
      {children}
    </div>
  );
}

function LogoMark({ size = 44 }: { size?: number }) {
  return (
    <Image
      src="/images/studio-nodo-simbolo.png"
      alt="Studio Nodo logo"
      width={size}
      height={size}
      className="shrink-0 rounded-full"
      priority
    />
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.73 2.89 2.89 0 0 1 2.31-4.61 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}

function Header() {
  return (
    <motion.header
      className="fixed left-0 right-0 top-0 z-50 border-b border-emerald-400/15 backdrop-blur-2xl"
      style={{ background: "linear-gradient(180deg, rgba(6,78,59,0.12), rgba(30,34,41,0.65))" }}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent" />
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
        <a href="#home" className="flex items-center gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-nodo-accent">
          <LogoMark size={44} />
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-nodo-text">Studio Nodo</p>
            <p className="text-[0.64rem] uppercase tracking-[0.28em] text-nodo-accent/80">Digital Studio</p>
          </div>
        </a>
        <nav className="hidden items-center gap-8 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-nodo-muted/75 lg:flex">
          <a className="transition-colors hover:text-nodo-text" href="#servizi">Servizi</a>
          <a className="transition-colors hover:text-nodo-text" href="#metodo">Metodo</a>
          <a className="transition-colors hover:text-nodo-text" href="#lavori">Lavori</a>
          <a className="transition-colors hover:text-nodo-text" href="#contatti">Contatti</a>
        </nav>
        <div className="flex items-center gap-3">
          <a
            href="https://www.tiktok.com/@studio.nodo"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.035] text-nodo-muted transition-all duration-300 hover:scale-110 hover:border-rose-400/50 hover:text-rose-400 hover:shadow-[0_0_20px_rgba(251,113,133,0.3)]"
            aria-label="TikTok"
          >
            <TikTokIcon className="h-4 w-4" />
          </a>
          <a
            href="tel:+393450494432"
            className="group hidden items-center gap-3 rounded-full border border-nodo-muted/20 bg-white/[0.035] px-5 py-3 text-[0.66rem] font-semibold uppercase tracking-[0.17em] text-nodo-text transition-all duration-500 hover:border-nodo-accent/50 hover:bg-white/[0.07] sm:flex"
          >
            Parliamone
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </motion.header>
  );
}

function Hero() {
  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden px-5 pb-28 pt-36 sm:px-8 lg:px-10">
      {/* Glow orbs */}
      <motion.div
        className="pointer-events-none absolute left-[5%] top-[20%] h-[400px] w-[400px] rounded-full bg-emerald-500/[0.07] blur-[130px]"
        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute right-[8%] top-[30%] h-[350px] w-[350px] rounded-full bg-rose-500/[0.06] blur-[120px]"
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.div
        className="pointer-events-none absolute bottom-[10%] left-1/2 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-sky-500/[0.05] blur-[100px]"
        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* Griglia futuristica */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(rgba(167,183,158,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(167,183,158,0.5) 1px, transparent 1px)",
          backgroundSize: "80px 80px"
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <div className="max-w-4xl">
          {/* Badge */}
          <motion.div
            className="mb-8 inline-flex max-w-full items-center gap-2.5 rounded-full border border-white/[0.1] py-2 pl-2 pr-4 text-[0.6rem] uppercase tracking-micro backdrop-blur-2xl sm:pr-5 sm:text-[0.64rem]"
            style={{ background: "linear-gradient(135deg, rgba(131,24,67,0.12), rgba(30,34,41,0.6), rgba(6,78,59,0.12))" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-[#25F4EE] via-[#000000] to-[#FE2C55]">
              <TikTokIcon className="h-3.5 w-3.5 text-white" />
            </span>
            <span className="flex items-center gap-1.5 sm:gap-2">
              <motion.span
                className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400"
                animate={{ opacity: [1, 0.3, 1], scale: [1, 0.8, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              <span className="font-medium text-nodo-text">Palermo</span>
              <span className="text-white/20">/</span>
              <span className="font-medium text-rose-400">TikTok-first</span>
              <span className="hidden text-white/20 sm:inline">·</span>
              <span className="hidden text-nodo-muted sm:inline">Brand digitale freelance</span>
            </span>
          </motion.div>

          {/* Headline */}
          <RevealText
            as="h1"
            text="Crescita digitale per attività che vogliono distinguersi."
            className="text-balance font-display text-[clamp(2.8rem,8vw,7.2rem)] font-medium leading-[0.98] tracking-[-0.065em]"
            wordClassName="text-gradient-luxe"
            delay={0.15}
            stagger={0.06}
          />

          {/* Sottotitolo con accent */}
          <motion.p
            className="mt-8 max-w-xl text-lg leading-8 text-nodo-muted/90 sm:text-xl sm:leading-9"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            Strategia, contenuti <span className="font-medium text-rose-400">TikTok</span> e siti web progettati per trasformare attenzione in clienti.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            className="mt-10 flex flex-col gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.48, ease: [0.22, 1, 0.36, 1] }}
          >
            <MagneticButton href="tel:+393450494432">
              Prenota una consulenza
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </MagneticButton>
            <MagneticButton href="#metodo" variant="secondary">
              Scopri il metodo
              <MousePointer2 className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
            </MagneticButton>
          </motion.div>

          {/* Stat cards con icone e colori */}
          <motion.div
            className="mt-14 grid max-w-lg grid-cols-3 gap-3 sm:gap-4"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.62, ease: [0.22, 1, 0.36, 1] }}
          >
            {[
              { title: "TikTok", subtitle: "visibilità", icon: TikTokIcon, color: "rose", glow: "rgba(251,113,133,0.15)" },
              { title: "Siti web", subtitle: "conversione", icon: Layers3, color: "sky", glow: "rgba(56,189,248,0.15)" },
              { title: "Contenuti", subtitle: "fiducia", icon: Target, color: "emerald", glow: "rgba(52,211,153,0.15)" }
            ].map((stat, index) => {
              const c = colorMap[stat.color];
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.title}
                  className="group relative overflow-hidden rounded-2xl border p-4 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1"
                  style={{ background: `linear-gradient(160deg, ${stat.color === 'emerald' ? 'rgba(6,78,59,0.15)' : stat.color === 'rose' ? 'rgba(131,24,67,0.15)' : 'rgba(12,74,110,0.15)'}, rgba(30,34,41,0.6))` }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className={cn("absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r to-transparent", c.gradient)} />
                  <div className={cn("absolute -right-4 -top-4 h-16 w-16 rounded-full blur-2xl opacity-30 transition-opacity duration-300 group-hover:opacity-60", c.bg)} />
                  <div className={cn("relative mb-3 flex h-9 w-9 items-center justify-center rounded-xl border transition-transform duration-300 group-hover:scale-110", c.border, c.bg, c.text)}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <p className={cn("relative text-[0.65rem] font-semibold uppercase tracking-[0.18em]", c.text)}>{stat.title}</p>
                  <p className="relative mt-1.5 text-sm text-nodo-muted/60">{stat.subtitle}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Linea decorativa laterale */}
      <div className="pointer-events-none absolute left-5 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-2 lg:flex">
        <div className="h-20 w-px bg-gradient-to-b from-transparent via-emerald-400/30 to-transparent" />
        <span className="text-[0.5rem] uppercase tracking-[0.3em] text-nodo-muted/40 [writing-mode:vertical-rl]">Studio Nodo</span>
        <div className="h-20 w-px bg-gradient-to-b from-transparent via-rose-400/30 to-transparent" />
      </div>

      {/* Scroll indicator */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 sm:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="text-[0.58rem] uppercase tracking-[0.3em] text-nodo-muted/60">Scroll</span>
        <span className="relative h-12 w-px overflow-hidden bg-white/10">
          <motion.span
            className="absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-emerald-400 to-transparent"
            animate={{ y: [-16, 48] }}
            transition={{ duration: 1.9, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.div>
    </section>
  );
}

function TrustSection() {
  return (
    <section className="relative px-5 py-20 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {trustItems.map((item, index) => {
            const c = colorMap[item.color];
            return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <SpotlightCard
                className={cn("h-full rounded-[1.4rem] border p-6 backdrop-blur-xl transition-transform duration-500 hover:-translate-y-1.5 shadow-card", c.border)}
                style={{ background: `linear-gradient(160deg, ${item.color === 'emerald' ? 'rgba(6,78,59,0.25)' : item.color === 'rose' ? 'rgba(131,24,67,0.25)' : item.color === 'sky' ? 'rgba(12,74,110,0.25)' : item.color === 'amber' ? 'rgba(120,53,15,0.25)' : 'rgba(76,29,149,0.25)'}, rgba(30,34,41,0.85))` }}
                spotlightColor={item.glow}
              >
                <div className={cn("absolute inset-x-0 top-0 h-[3px] rounded-t-[1.4rem] bg-gradient-to-r to-transparent", c.gradient)} />
                <div className={cn("absolute -right-6 -top-6 h-20 w-20 rounded-full blur-2xl opacity-40", c.bg)} />
                <div className="relative flex h-full flex-col">
                  <span className={cn("font-display text-3xl font-medium opacity-40", c.text)}>0{index + 1}</span>
                  <p className="mt-3 text-lg font-medium tracking-[-0.03em] text-nodo-text">{item.label}</p>
                  <div className="mt-4 flex items-baseline gap-1">
                    <AnimatedCounter to={item.value} suffix={item.suffix} className={cn("font-display text-2xl font-medium", c.text)} />
                  </div>
                  <p className="mt-2 text-sm leading-6 text-nodo-muted/60">{item.desc}</p>
                </div>
              </SpotlightCard>
            </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section id="servizi" className="relative overflow-hidden px-5 py-28 sm:px-8 lg:px-10">
      <div className="absolute right-0 top-28 h-96 w-96 rounded-full bg-nodo-accent/10 blur-[130px]" />
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionLabel>Servizi</SectionLabel>
          <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:gap-16">
            <RevealText
              as="h2"
              text="Un sistema digitale curato, non una lista di compiti."
              className="max-w-3xl font-display text-5xl font-medium leading-[0.98] tracking-[-0.055em] text-nodo-text sm:text-6xl lg:text-7xl"
            />
            <p className="max-w-2xl text-lg leading-8 text-nodo-muted/80">
              Studio Nodo nasce per attività locali che hanno qualità, atmosfera e valore, ma online vengono percepite meno di quanto meritano. Il lavoro è unire estetica, messaggio e conversione in un'unica esperienza coerente.
            </p>
          </div>
        </Reveal>
        <div className="mt-16 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service, index) => {
            const Icon = service.icon;
            const c = colorMap[service.color];

            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 34, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.76, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <TiltCard intensity={6} className="h-full">
                  <SpotlightCard className={cn("lux-border group h-full rounded-[1.8rem] border p-7 shadow-luxury backdrop-blur-2xl transition-transform duration-500 hover:-translate-y-2.5", c.border)} spotlightColor={service.glow}
                    style={{ background: `linear-gradient(170deg, ${service.color === 'emerald' ? 'rgba(6,78,59,0.22)' : service.color === 'rose' ? 'rgba(131,24,67,0.22)' : service.color === 'sky' ? 'rgba(12,74,110,0.22)' : service.color === 'amber' ? 'rgba(120,53,15,0.22)' : 'rgba(76,29,149,0.22)'}, rgba(30,34,41,0.82))` }}
                  >
                    <div className={cn("absolute inset-0 rounded-[1.8rem] bg-gradient-to-b to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100", c.gradient)} />
                    <div className={cn("absolute inset-x-0 top-0 h-[3px] rounded-t-[1.8rem] bg-gradient-to-r to-transparent", c.gradient)} />
                    <div className="absolute right-5 top-5 font-display text-5xl font-medium text-white/[0.04]">0{index + 1}</div>
                    <div className="relative flex h-full flex-col" style={{ transform: "translateZ(40px)" }}>
                      <div className={cn("mb-9 flex h-14 w-14 items-center justify-center rounded-2xl border transition-all duration-500 group-hover:scale-110", c.border, c.bg, c.text, c.glow)}>
                        <Icon className="h-5 w-5 transition-transform duration-500 group-hover:scale-110" />
                      </div>
                      {service.tiktok && (
                        <div className="absolute right-0 top-16 flex items-center gap-1.5 rounded-full border border-rose-400/30 bg-gradient-to-r from-[#25F4EE]/10 via-nodo-background/40 to-[#FE2C55]/10 px-2.5 py-1 backdrop-blur-xl">
                          <TikTokIcon className="h-3 w-3 text-white" />
                          <span className="text-[0.52rem] font-semibold uppercase tracking-[0.1em] text-white/80">TikTok</span>
                        </div>
                      )}
                      <h3 className="text-2xl font-medium tracking-[-0.045em] text-nodo-text">{service.title}</h3>
                      <p className={cn("mt-2 text-[0.62rem] uppercase tracking-micro", c.text, "opacity-70")}>{service.platforms}</p>
                      <p className="mt-4 text-sm leading-7 text-nodo-muted/75">{service.description}</p>
                      <div className="mt-auto pt-10">
                        <div className={cn("mb-4 h-px w-full bg-gradient-to-r to-transparent", c.gradient)} />
                        <div className="flex items-center justify-between gap-3">
                          <p className={cn("text-sm leading-6", c.text)}>{service.benefit}</p>
                          <span className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-full border opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-2", c.border, c.text)}>
                            <ArrowRight className="h-3.5 w-3.5" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </SpotlightCard>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  const lineScale = useTransform(scrollYProgress, [0.1, 0.8], [0, 1]);
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="metodo" ref={ref} className="relative overflow-hidden px-5 py-28 sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:h-fit">
          <Reveal>
            <SectionLabel>Metodo</SectionLabel>
            <RevealText
              as="h2"
              text="Processo chiaro. Risultato memorabile."
              className="font-display text-5xl font-medium leading-[0.98] tracking-[-0.055em] text-nodo-text sm:text-6xl lg:text-7xl"
            />
            <p className="mt-7 max-w-xl text-lg leading-8 text-nodo-muted/80">
              La qualità percepita nasce dal metodo: capire, progettare, creare, lanciare, ottimizzare. Senza improvvisazione.
            </p>
          </Reveal>
          <motion.div
            className="relative mt-10 aspect-[16/10] overflow-hidden rounded-[2rem] border border-sky-400/20 shadow-luxury"
            style={{ y: imageY, background: "linear-gradient(135deg, rgba(12,74,110,0.3), rgba(30,34,41,0.85))" }}
          >
            <Image
              src={heroImages.framework}
              alt="Framework strategico Studio Nodo con customer journey e calendario editoriale"
              fill
              sizes="(max-width: 1024px) 100vw, 44vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-nodo-background/70 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between rounded-[1.2rem] border border-white/[0.08] bg-nodo-background/60 p-4 backdrop-blur-2xl">
              <span className="text-[0.62rem] uppercase tracking-micro text-nodo-accent">Step attivo</span>
              <span className="font-display text-lg font-medium text-nodo-text">0{activeStep + 1} / 05</span>
            </div>
          </motion.div>
        </div>
        <div className="relative pt-4">
          <motion.div className="absolute left-[1.15rem] top-8 h-[calc(100%-4rem)] w-px origin-top bg-nodo-accent/50" style={{ scaleY: lineScale }} />
          <div className="space-y-5">
            {process.map((item, index) => {
              const c = colorMap[item.color];
              return (
              <motion.article
                key={item.step}
                className={cn(
                  "lux-border group relative grid cursor-pointer gap-5 overflow-hidden rounded-[1.6rem] border p-6 pl-16 backdrop-blur-2xl transition-all duration-500 sm:p-8 sm:pl-20",
                  activeStep === index ? cn(c.border, "shadow-luxury") : "border-white/[0.08] shadow-card"
                )}
                initial={{ opacity: 0, x: 34 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-90px" }}
                transition={{ duration: 0.72, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ x: 8 }}
                onClick={() => setActiveStep(index)}
                style={{
                  background: activeStep === index
                    ? "linear-gradient(135deg, rgba(37,42,51,0.92), rgba(30,34,41,0.62))"
                    : "linear-gradient(135deg, rgba(37,42,51,0.82), rgba(30,34,41,0.52))"
                }}
              >
                <div className={cn(
                  "absolute inset-x-0 top-0 h-[3px] rounded-t-[1.6rem] bg-gradient-to-r to-transparent",
                  c.gradient,
                  activeStep === index ? "opacity-100" : "opacity-50"
                )} />
                <div className={cn(
                  "absolute -left-8 top-1/2 h-24 w-24 -translate-y-1/2 rounded-full blur-2xl transition-all duration-500",
                  c.bg,
                  activeStep === index ? "opacity-60" : "opacity-20"
                )} />
                <div className={cn(
                  "absolute left-4 top-7 flex h-8 w-8 items-center justify-center rounded-full border text-xs font-semibold transition-all duration-500 sm:left-6 sm:top-9",
                  activeStep === index
                    ? cn(c.border, c.bg, c.text, c.glow)
                    : cn(c.border, "bg-nodo-background/90", c.text)
                )}>
                  {index + 1}
                </div>
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                  <div>
                    <p className={cn("text-[0.65rem] uppercase tracking-micro", c.text, "opacity-80")}>{item.step}</p>
                    <h3 className="mt-2 text-3xl font-medium tracking-[-0.05em] text-nodo-text">{item.title}</h3>
                  </div>
                  <ArrowRight className={cn(
                    "h-5 w-5 transition-all duration-500",
                    activeStep === index ? cn(c.text, "translate-x-2") : cn(c.text, "opacity-60 group-hover:translate-x-2")
                  )} />
                </div>
                <p className="max-w-2xl text-base leading-8 text-nodo-muted/75">{item.copy}</p>
              </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturedWorkSection() {
  return (
    <section id="lavori" className="relative px-5 py-28 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="flex flex-col justify-between gap-7 border-y border-white/[0.08] py-10 lg:flex-row lg:items-end">
            <div>
              <SectionLabel>Progetti in evidenza</SectionLabel>
              <RevealText
                as="h2"
                text="Uno spazio pronto per progetti che meritano scena."
                className="max-w-3xl font-display text-5xl font-medium leading-[0.98] tracking-[-0.055em] text-nodo-text sm:text-6xl lg:text-7xl"
              />
            </div>
            <p className="max-w-md text-base leading-7 text-nodo-muted/75">
              La sezione è progettata per ospitare casi studio reali: ristoranti, hotel, beauty salon, retail e brand locali.
            </p>
          </div>
        </Reveal>
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {[
            ["Identità hospitality", heroImages.web, "Sito web / Marche locali", "Brand identity, design responsive e strategia di posizionamento per attività del settore hospitality.", "sky"],
            ["Sistema editoriale social", heroImages.creation, "Contenuti / Social", "Calendario editoriale, direzione creativa e produzione contenuti per Instagram e TikTok.", "rose"],
            ["Modello di crescita", heroImages.strategy, "Strategia / Conversione", "Analisi dati, ottimizzazione del percorso utente e misurazione dei risultati nel tempo.", "emerald"]
          ].map(([title, image, meta, desc, color], index) => {
            const c = colorMap[color as string];
            return (
            <motion.div
              key={title as string}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.78, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <TiltCard intensity={5} className={cn("h-full", index === 0 && "lg:col-span-2")}>
                <div
                  className={cn(
                    "lux-border group relative h-full overflow-hidden rounded-[2rem] border shadow-luxury transition-transform duration-500 hover:-translate-y-2",
                    c.border
                  )}
                >
                  <div className={cn("relative overflow-hidden", index === 0 ? "aspect-[1.6/1] lg:aspect-[2.1/1]" : "aspect-[1.2/1] lg:aspect-[1.45/1]")}>
                    <Image
                      src={image as string}
                      alt={`${title} placeholder Studio Nodo`}
                      fill
                      sizes={index === 0 ? "(max-width: 1024px) 100vw, 66vw" : "(max-width: 1024px) 100vw, 33vw"}
                      className="object-cover transition-transform duration-1000 ease-luxury group-hover:scale-108"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-nodo-background via-nodo-background/20 to-transparent" />
                    <div className={cn("absolute inset-0 bg-gradient-to-t from-transparent to-transparent transition-colors duration-500 group-hover:from-transparent", c.bg)} />
                  </div>
                  <div className={cn("absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r to-transparent", c.gradient)} />
                  <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8" style={{ transform: "translateZ(30px)" }}>
                    <p className={cn("text-[0.64rem] uppercase tracking-micro", c.text)}>{meta}</p>
                    <h3 className="mt-3 text-3xl font-medium tracking-[-0.05em] text-nodo-text">{title}</h3>
                    <p className="mt-3 max-w-md text-sm leading-6 text-nodo-muted/70 opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2">{desc}</p>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function PhilosophySection() {
  const [open, setOpen] = useState(0);
  const philosophyItems = [
    ["Presenza", "Non basta esserci. Serve essere riconoscibili, coerenti e memorabili nel momento in cui qualcuno ti scopre.", "emerald"],
    ["Narrazione", "Le persone scelgono luoghi, professionisti e brand perché percepiscono una storia, un gusto, una promessa.", "rose"],
    ["Crescita", "Il digitale funziona quando social, contenuti e sito guidano la stessa decisione: fidarsi e contattarti.", "sky"],
    ["Autenticità", "Il tono resta umano, locale e vero. Premium non significa distante: significa curato.", "amber"]
  ];

  return (
    <section className="relative overflow-hidden px-5 py-28 sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_0.86fr] lg:gap-20">
        <Reveal>
          <SectionLabel>Perché Studio Nodo</SectionLabel>
          <h2 className="font-display text-4xl font-medium leading-[1.05] tracking-[-0.055em] text-nodo-text sm:text-5xl lg:text-7xl">
            Le attività locali meritano una presenza digitale all'altezza della loro esperienza reale.
          </h2>
        </Reveal>
        <div className="space-y-0 lg:pt-28">
          {philosophyItems.map(([title, copy, color], index) => {
            const c = colorMap[color as string];
            return (
            <div key={title as string} className={cn("group border-t transition-colors duration-300", c.border)}>
              <button
                onClick={() => setOpen(open === index ? -1 : index)}
                className="flex w-full items-center justify-between gap-4 py-7 text-left"
              >
                <div className="flex items-center gap-4">
                  <span className={cn("font-display text-sm font-medium", c.text, "opacity-50")}>0{index + 1}</span>
                  <h3 className="flex items-center gap-3 text-xl font-medium tracking-[-0.035em] text-nodo-text">
                    <span className={cn("h-1.5 w-1.5 rounded-full transition-colors duration-300", open === index ? c.bg : "bg-white/20")} />
                    {title}
                  </h3>
                </div>
                <motion.span
                  animate={{ rotate: open === index ? 45 : 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className={cn("flex h-7 w-7 shrink-0 items-center justify-center rounded-full border", c.border, c.text)}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M6 1V11M1 6H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {open === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className={cn("pb-7 pl-8 pr-4 text-base leading-8", c.text, "opacity-80")}>
                      {copy}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            );
          })}
          <div className="border-t border-white/[0.08]" />
        </div>
      </div>
    </section>
  );
}

function ComboSection() {
  const [activeFlow, setActiveFlow] = useState(0);
  const flowSteps = [
    { label: "TikTok", desc: "Catturi l'attenzione", color: "rose" },
    { label: "Instagram", desc: "Costruisci fiducia", color: "violet" },
    { label: "Sito web", desc: "Dai profondità", color: "sky" },
    { label: "Contatto", desc: "Chiudi il cerchio", color: "emerald" }
  ];

  return (
    <section className="relative px-5 py-28 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.4rem] border border-rose-400/15 shadow-luxury backdrop-blur-2xl" style={{ background: "linear-gradient(135deg, rgba(131,24,67,0.15), rgba(30,34,41,0.85))" }}>
        <div className="grid lg:grid-cols-[0.92fr_1.08fr]">
          <div className="p-7 sm:p-10 lg:p-14">
            <Reveal>
              <SectionLabel>Sito web + Social</SectionLabel>
              <h2 className="font-display text-5xl font-medium leading-[0.95] tracking-[-0.055em] text-nodo-text sm:text-6xl">
                TikTok accende l'attenzione. Il sito chiude il cerchio.
              </h2>
              <p className="mt-7 max-w-xl text-lg leading-8 text-nodo-muted/80">
                TikTok è il social n.1 oggi: genera più visibilità di qualsiasi altra piattaforma. Ma una persona pronta a scegliere cerca conferme: servizi, atmosfera, dettagli, contatti, chiarezza. Il sito diventa il luogo in cui la fiducia prende forma.
              </p>
            </Reveal>
            <div className="mt-12 grid grid-cols-2 gap-3 overflow-hidden sm:grid-cols-4">
              {flowSteps.map((item, index) => {
                const c = colorMap[item.color];
                return (
                <motion.div
                  key={item.label}
                  className={cn(
                    "group relative cursor-pointer rounded-2xl border p-4 text-center transition-all duration-300",
                    activeFlow === index
                      ? cn(c.border, c.bg, "scale-105", c.glow)
                      : cn("border-white/[0.08] bg-white/[0.035] hover:border-white/20 hover:bg-white/[0.05]")
                  )}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.64, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => setActiveFlow(index)}
                >
                  <p className={cn("text-[0.62rem] uppercase tracking-micro", c.text, activeFlow === index ? "opacity-100" : "opacity-70")}>0{index + 1}</p>
                  <div className="mt-2 flex items-center justify-center gap-1.5">
                    {index === 0 && <TikTokIcon className={cn("h-3.5 w-3.5", activeFlow === index ? c.text : c.text, "opacity-80")} />}
                    <p className={cn("text-sm font-medium", activeFlow === index ? c.text : "text-nodo-text")}>{item.label}</p>
                  </div>
                  <p className={cn("mt-1 text-[0.6rem] leading-4 text-nodo-muted/60 transition-opacity duration-300", activeFlow === index ? "opacity-100" : "opacity-0")}>{item.desc}</p>
                  {index < 3 && <ArrowRight className={cn("absolute -right-4 top-1/2 hidden h-4 w-4 -translate-y-1/2 sm:block", c.text, "opacity-50")} />}
                </motion.div>
                );
              })}
            </div>
          </div>
          <div className="relative min-h-[460px] overflow-hidden lg:min-h-[680px]">
            <Image
              src={heroImages.web}
              alt="Sito web e social media integrati per attività locali"
              fill
              sizes="(max-width: 1024px) 100vw, 52vw"
              className="object-cover transition-transform duration-1000 ease-luxury hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-nodo-secondary via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 rounded-[1.6rem] border border-white/[0.08] bg-nodo-background/48 p-5 backdrop-blur-2xl sm:bottom-8 sm:left-8 sm:right-8 sm:p-6">
              <p className="text-[0.66rem] uppercase tracking-micro text-nodo-accent">Percorso di conversione</p>
              <div className="mt-4 flex items-center gap-3 text-sm text-nodo-muted">
                <LineChart className="h-5 w-5 text-nodo-accent" />
                <span>Attenzione → fiducia → contatto → cliente</span>
              </div>
              <div className="mt-4 h-1 overflow-hidden rounded-full bg-white/[0.06]">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-nodo-accent/60 to-nodo-accent"
                  initial={{ width: "0%" }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.4, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StorySection() {
  return (
    <section className="relative px-5 py-28 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionLabel>Racconto visivo</SectionLabel>
          <h2 className="max-w-4xl font-display text-5xl font-medium leading-[0.95] tracking-[-0.055em] text-nodo-text sm:text-6xl lg:text-7xl">
            Le immagini non decorano. Spiegano il modo in cui lavoro.
          </h2>
        </Reveal>
        <div className="mt-14 space-y-5">
          {imageStory.map((item, index) => {
            const storyColors = ["emerald", "rose", "sky"];
            const c = colorMap[storyColors[index % 3]];
            return (
            <motion.article
              key={item.title}
              className={cn("lux-border group grid overflow-hidden rounded-[2rem] border shadow-luxury backdrop-blur-2xl transition-all duration-500 hover:-translate-y-1 lg:grid-cols-[0.92fr_1.08fr]", c.border)}
              style={{ background: `linear-gradient(135deg, ${index % 3 === 0 ? 'rgba(6,78,59,0.18)' : index % 3 === 1 ? 'rgba(131,24,67,0.18)' : 'rgba(12,74,110,0.18)'}, rgba(30,34,41,0.82))` }}
              initial={{ opacity: 0, y: 34 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.75, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4 }}
            >
              <div className={cn("relative min-h-[330px] overflow-hidden", index % 2 === 1 && "lg:order-2")}>
                <Image
                  src={item.image}
                  alt={`${item.label} Studio Nodo`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 48vw"
                  className="object-cover transition-transform duration-1000 ease-luxury group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-nodo-background/70 via-transparent to-transparent" />
                <div className={cn("absolute left-5 top-5 rounded-full border px-3 py-1.5 text-[0.6rem] uppercase tracking-micro backdrop-blur-xl", c.border, c.text, c.bg)}>
                  {item.label}
                </div>
              </div>
              <div className="relative flex flex-col justify-center p-7 sm:p-10 lg:p-14">
                <div className={cn("absolute left-0 top-10 h-16 w-1 rounded-full bg-gradient-to-b to-transparent transition-all duration-500 group-hover:h-24", c.gradient)} />
                <p className={cn("ml-4 text-[0.66rem] uppercase tracking-micro", c.text)}>{item.label}</p>
                <h3 className="mt-5 max-w-2xl text-4xl font-medium leading-[0.98] tracking-[-0.055em] text-nodo-text sm:text-5xl">{item.title}</h3>
                <p className="mt-6 max-w-xl text-base leading-8 text-nodo-muted/75">{item.copy}</p>
                <div className={cn("mt-6 ml-4 flex items-center gap-2 text-sm opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-2", c.text)}>
                  <span className="text-[0.62rem] uppercase tracking-micro">Scopri di più</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </div>
            </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function AudienceSection() {
  return (
    <section className="px-5 py-20 sm:px-8 lg:px-10">
      <Reveal className="mx-auto max-w-7xl">
        <SpotlightCard className="rounded-[2rem] border border-emerald-400/15 p-6 backdrop-blur-2xl shadow-luxury sm:p-9" spotlightColor="rgba(167,183,158,0.15)" style={{ background: "linear-gradient(160deg, rgba(6,78,59,0.15), rgba(30,34,41,0.82))" }}>
          <div className="relative">
            <div className="mb-8 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
              <div>
                <SectionLabel>Per chi</SectionLabel>
                <h2 className="font-display text-4xl font-medium tracking-[-0.05em] text-nodo-text sm:text-5xl">Attività locali con ambizione e gusto.</h2>
              </div>
              <p className="max-w-md text-sm leading-7 text-nodo-muted/70">
                Palermo, Sicilia e brand locali che vogliono presentarsi meglio, comunicare con più chiarezza e farsi scegliere con più fiducia.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {localClients.map((client, index) => {
                const c = colorMap[client.color];
                const Icon = client.icon;
                return (
                <motion.div
                  key={client.name}
                  className={cn(
                    "group relative flex items-center gap-4 rounded-2xl border p-4 transition-all duration-300 hover:-translate-y-1",
                    c.border, c.bg
                  )}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className={cn("flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-transform duration-300 group-hover:scale-110", c.border, c.bg, c.text)}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-nodo-text">{client.name}</p>
                    <p className={cn("mt-0.5 text-[0.68rem] leading-4", c.text, "opacity-70")}>{client.desc}</p>
                  </div>
                  <div className={cn("absolute inset-x-0 bottom-0 h-[2px] rounded-b-2xl bg-gradient-to-r to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100", c.gradient)} />
                </motion.div>
                );
              })}
            </div>
          </div>
        </SpotlightCard>
      </Reveal>
    </section>
  );
}

function FinalCta() {
  return (
    <section id="contatti" className="relative overflow-hidden px-5 py-28 sm:px-8 lg:px-10">
      {/* Glow orbs futuristici */}
      <motion.div
        className="absolute left-[15%] top-[20%] h-[400px] w-[400px] rounded-full bg-emerald-500/[0.08] blur-[120px]"
        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[10%] bottom-[15%] h-[350px] w-[350px] rounded-full bg-rose-500/[0.08] blur-[120px]"
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.div
        className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-500/[0.06] blur-[100px]"
        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* Griglia futuristica */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "linear-gradient(rgba(167,183,158,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(167,183,158,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px"
        }}
      />

      <div className="relative mx-auto max-w-7xl">
        <div className="overflow-hidden rounded-[2.6rem] border border-white/[0.1] shadow-luxury backdrop-blur-2xl" style={{ background: "linear-gradient(135deg, rgba(6,78,59,0.12), rgba(30,34,41,0.88), rgba(131,24,67,0.12))" }}>
          <div className="grid lg:grid-cols-[1fr_0.72fr]">
            {/* Lato sinistro: CTA principale */}
            <div className="relative p-8 sm:p-12 lg:p-16">
              {/* Linea di scansione animata */}
              <motion.div
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent"
                animate={{ y: ["0%", "100%", "0%"] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />
              <Reveal>
                <p className="mb-8 inline-flex items-center gap-3 text-[0.68rem] font-semibold uppercase tracking-micro text-nodo-accent">
                  <MapPin className="h-4 w-4" /> Palermo, Sicilia, Italia
                </p>
                <RevealText
                  as="h2"
                  text="Pronto a far crescere la tua presenza digitale?"
                  className="max-w-4xl font-display text-5xl font-medium leading-[1.0] tracking-[-0.065em] text-nodo-text sm:text-6xl lg:text-7xl"
                />
                <p className="mt-8 max-w-2xl text-lg leading-8 text-nodo-muted/80">
                  Se hai un'attività locale e vuoi che la tua presenza online comunichi lo stesso valore che le persone vivono dal vivo, iniziamo da una conversazione semplice.
                </p>
                <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                  <MagneticButton href="https://wa.me/393450494432">
                    WhatsApp
                    <MessageCircle className="h-4 w-4" />
                  </MagneticButton>
                  <MagneticButton href="mailto:Gaetano.meli95@gmail.com" variant="secondary">
                    Email
                    <Mail className="h-4 w-4" />
                  </MagneticButton>
                  <MagneticButton href="https://www.tiktok.com/@studio.nodo" variant="secondary">
                    <TikTokIcon className="h-4 w-4 text-rose-400" />
                    TikTok
                  </MagneticButton>
                </div>
              </Reveal>
            </div>

            {/* Lato destro: card contatti futuristica */}
            <div className="relative min-h-[430px] overflow-hidden border-t border-white/[0.08] lg:border-l lg:border-t-0">
              <Image
                src={heroImages.presence}
                alt="Studio Nodo contatti e crescita digitale"
                fill
                sizes="(max-width: 1024px) 100vw, 38vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-nodo-background via-nodo-background/50 to-transparent" />

              {/* Card contatti glassmorphism */}
              <MagneticWrapper strength={0.12} className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-8">
                <motion.div
                  className="space-y-4 rounded-[1.6rem] border border-white/[0.1] p-5 backdrop-blur-2xl sm:p-6"
                  style={{ background: "linear-gradient(160deg, rgba(30,34,41,0.75), rgba(37,42,51,0.6))" }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Telefono */}
                  <a className="group flex items-center gap-3 text-lg font-medium tracking-[-0.03em] text-nodo-text transition-colors hover:text-emerald-400" href="tel:+393450494432">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-emerald-400/30 bg-emerald-400/[0.08] text-emerald-400 transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(52,211,153,0.3)]">
                      <MessageCircle className="h-4 w-4" />
                    </span>
                    <span className="flex items-center gap-2">
                      3450494432
                      <ArrowRight className="h-3.5 w-3.5 text-emerald-400 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1" />
                    </span>
                  </a>

                  {/* Divider */}
                  <div className="h-px w-full bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

                  {/* Email */}
                  <a className="group flex items-center gap-3 break-words text-sm text-nodo-muted transition-colors hover:text-sky-400" href="mailto:Gaetano.meli95@gmail.com">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-sky-400/30 bg-sky-400/[0.08] text-sky-400 transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(56,189,248,0.3)]">
                      <Mail className="h-4 w-4" />
                    </span>
                    <span className="flex items-center gap-2">
                      Gaetano.meli95@gmail.com
                      <ArrowRight className="h-3.5 w-3.5 text-sky-400 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1" />
                    </span>
                  </a>

                  {/* Divider */}
                  <div className="h-px w-full bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

                  {/* TikTok */}
                  <a className="group flex items-center gap-3 text-sm text-nodo-muted transition-colors hover:text-rose-400" href="https://www.tiktok.com/@studio.nodo" target="_blank" rel="noopener noreferrer">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-rose-400/30 bg-rose-400/[0.08] text-rose-400 transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(251,113,133,0.3)]">
                      <TikTokIcon className="h-4 w-4" />
                    </span>
                    <span className="flex items-center gap-2">
                      @studio.nodo
                      <ArrowRight className="h-3.5 w-3.5 text-rose-400 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1" />
                    </span>
                  </a>

                  {/* Founder badge */}
                  <div className="flex items-center gap-3 pt-3">
                    <LogoMark size={32} />
                    <p className="text-[0.66rem] uppercase tracking-micro text-nodo-accent/80">Gaetano Meli / Founder</p>
                  </div>
                </motion.div>
              </MagneticWrapper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function HomePage() {
  return (
    <main className="relative z-10 min-h-screen overflow-x-hidden text-nodo-text selection:bg-nodo-accent selection:text-nodo-ink">
      <HeroBackdrop />
      <PageTransition />
      <ScrollProgress />
      <CustomCursor />
      <Header />
      <Hero />
      <TrustSection />
      <ServicesSection />
      <ProcessSection />
      <FeaturedWorkSection />
      <PhilosophySection />
      <ComboSection />
      <StorySection />
      <AudienceSection />
      <FinalCta />

      {/* Pulsanti rapidi flottanti */}
      <motion.div
        className="fixed bottom-5 right-5 z-50 flex flex-col gap-3 sm:bottom-6 sm:right-6 sm:gap-4"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* TikTok */}
        <motion.a
          href="https://www.tiktok.com/@studio.nodo"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#25F4EE] via-[#000000] to-[#FE2C55] shadow-luxury transition-all duration-300 hover:scale-110 hover:shadow-[0_0_30px_rgba(254,44,85,0.5)] sm:h-14 sm:w-14"
          aria-label="TikTok"
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.span
            className="absolute inset-0 rounded-full bg-[#FE2C55]"
            animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
          <TikTokIcon className="h-5 w-5 text-white sm:h-6 sm:w-6" />
          <span className="absolute right-14 hidden items-center gap-2 whitespace-nowrap rounded-full border border-rose-400/30 bg-nodo-background/95 px-4 py-2 text-xs font-medium text-nodo-text opacity-0 backdrop-blur-xl transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 translate-x-2 sm:right-16 sm:flex">
            Seguimi su TikTok
            <ArrowRight className="h-3 w-3 text-rose-400" />
          </span>
        </motion.a>

        {/* WhatsApp */}
        <motion.a
          href="https://wa.me/393450494432"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#25D366] to-[#128C7E] shadow-luxury transition-all duration-300 hover:scale-110 hover:shadow-[0_0_30px_rgba(37,211,102,0.5)] sm:h-14 sm:w-14"
          aria-label="WhatsApp"
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.span
            className="absolute inset-0 rounded-full bg-[#25D366]"
            animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.span
            className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-[0.6rem] font-bold text-white shadow-glow"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            1
          </motion.span>
          <motion.div
            animate={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 2 }}
          >
            <MessageCircle className="h-5 w-5 text-white sm:h-6 sm:w-6" />
          </motion.div>
          <span className="absolute right-14 hidden items-center gap-2 whitespace-nowrap rounded-full border border-[#25D366]/30 bg-nodo-background/95 px-4 py-2 text-xs font-medium text-nodo-text opacity-0 backdrop-blur-xl transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 translate-x-2 sm:right-16 sm:flex">
            Scrivimi su WhatsApp
            <ArrowRight className="h-3 w-3 text-[#25D366]" />
          </span>
        </motion.a>

        {/* Email */}
        <motion.a
          href="mailto:Gaetano.meli95@gmail.com"
          className="group relative flex h-12 w-12 items-center justify-center rounded-full border border-sky-400/40 bg-gradient-to-br from-nodo-secondary to-nodo-background shadow-luxury backdrop-blur-xl transition-all duration-300 hover:scale-110 hover:border-sky-400/70 hover:shadow-[0_0_30px_rgba(56,189,248,0.4)] sm:h-14 sm:w-14"
          aria-label="Email"
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.span
            className="absolute inset-0 rounded-full border border-sky-400/40"
            animate={{ scale: [1, 1.35, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          />
          <motion.div
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
          >
            <Mail className="h-5 w-5 text-sky-400 sm:h-6 sm:w-6" />
          </motion.div>
          <span className="absolute right-14 hidden items-center gap-2 whitespace-nowrap rounded-full border border-sky-400/30 bg-nodo-background/95 px-4 py-2 text-xs font-medium text-nodo-text opacity-0 backdrop-blur-xl transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 translate-x-2 sm:right-16 sm:flex">
            Invia una email
            <ArrowRight className="h-3 w-3 text-sky-400" />
          </span>
        </motion.a>
      </motion.div>

      <footer className="px-5 pb-10 sm:px-8 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 border-t border-white/[0.08] pt-8 sm:flex-row">
          <div className="flex items-center gap-3">
            <LogoMark size={36} />
            <div>
              <p className="text-sm font-medium text-nodo-text">© Studio Nodo — Gaetano Meli</p>
              <p className="text-[0.64rem] uppercase tracking-micro text-nodo-muted/50">Palermo, Sicilia</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://www.tiktok.com/@studio.nodo"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-9 w-9 items-center justify-center rounded-full border border-rose-400/30 bg-rose-400/[0.08] text-rose-400 transition-all duration-300 hover:scale-110 hover:border-rose-400/60 hover:shadow-[0_0_20px_rgba(251,113,133,0.3)]"
              aria-label="TikTok"
            >
              <TikTokIcon className="h-4 w-4" />
            </a>
            <p className="text-sm text-nodo-muted/60">TikTok · Instagram · Web design · Crescita digitale</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
