"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Sparkles, Award, Rocket, Maximize2, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const KALAM_QUOTES = [
  "Dream is not that which you see while sleeping, it is something that does not let you sleep.",
  "To succeed in your mission, you must have single-minded devotion to your goal.",
  "If you want to shine like a sun, first burn like a sun.",
  "All of us do not have equal talent. But, all of us have an equal opportunity to develop our talents.",
  "Learning gives creativity, creativity leads to thinking, thinking provides knowledge, knowledge makes you great."
];

const SUCCESS_STORIES = [
  {
    name: "NIDAR Drone Innovation Challenge",
    project: "National Level Achievement",
    achievement: "Top 5 in India",
    story: "Proud to be ranked Top 5 among 170+ teams across India at the NIDAR Drone Innovation Challenge.",
    image: "/photos/NIDAR MA collge .webp"
  },
  {
    name: "MBITS Training Session",
    project: "Drone, Robotics, and IoT",
    achievement: "Hands-On Training",
    story: "Hands-on Drone, Robotics, and IoT training with MBITS.",
    image: "/photos/IMG_7883.webp"
  },
  {
    name: "Viswajyothi Training Session",
    project: "Drone, Robotics, and IoT",
    achievement: "Hands-On Training",
    story: "Hands-on Drone, Robotics, and IoT training with Viswajyothi.",
    image: "/photos/IMG_0613.webp"
  },
  {
    name: "MBITS Logo Launch",
    project: "Club Branding",
    achievement: "Logo Launch @ MBITS",
    story: "A memorable logo launch moment at MBITS Drone.",
    image: "/photos/Mbits Drone.webp"
  }
];

type PortfolioImage = {
  src: string;
  alt: string;
  label: string;
  previewFit?: "cover" | "contain";
};

const SAJI_HERO_IMAGE: PortfolioImage = {
  src: "/photos/saji_thomas/B7KDgJyde08VrU0WhUeh95JX.webp",
  alt: "Saji Thomas in his innovation journey.",
  label: "Saji Thomas Portrait",
  previewFit: "contain"
};

const SAJI_PORTFOLIO_GALLERY: PortfolioImage[] = [
  {
    src: "/photos/saji_thomas/23xair10.webp",
    alt: "Saji Thomas building and testing his aircraft setup.",
    label: "Prototype Build",
    previewFit: "cover"
  },
  {
    src: "/photos/saji_thomas/records/RECORDS_page-0001.webp",
    alt: "Saji Thomas flight record and documentation page one.",
    label: "Flight Record I",
    previewFit: "contain"
  },
  {
    src: "/photos/saji_thomas/records/RECORDS_page-0002.webp",
    alt: "Saji Thomas flight record and documentation page two.",
    label: "Flight Record II",
    previewFit: "contain"
  }
];

const SAJI_PORTFOLIO_SLIDES: PortfolioImage[] = [SAJI_HERO_IMAGE, ...SAJI_PORTFOLIO_GALLERY];

export default function HomePage() {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [portfolioSlideIndex, setPortfolioSlideIndex] = useState(0);
  const [activePortfolioImage, setActivePortfolioImage] = useState<PortfolioImage | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % KALAM_QUOTES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (activePortfolioImage) {
      return;
    }

    const interval = setInterval(() => {
      setPortfolioSlideIndex((prev) => (prev + 1) % SAJI_PORTFOLIO_SLIDES.length);
    }, 4200);
    return () => clearInterval(interval);
  }, [activePortfolioImage]);

  useEffect(() => {
    if (!activePortfolioImage) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActivePortfolioImage(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activePortfolioImage]);

  useEffect(() => {
    document.body.style.overflow = activePortfolioImage ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [activePortfolioImage]);

  const duplicatedStories = [...SUCCESS_STORIES, ...SUCCESS_STORIES];
  const activeSlide = SAJI_PORTFOLIO_SLIDES[portfolioSlideIndex];
  const showPreviousSlide = () => {
    setPortfolioSlideIndex((prev) => (prev - 1 + SAJI_PORTFOLIO_SLIDES.length) % SAJI_PORTFOLIO_SLIDES.length);
  };
  const showNextSlide = () => {
    setPortfolioSlideIndex((prev) => (prev + 1) % SAJI_PORTFOLIO_SLIDES.length);
  };

  return (
    <main className="flex flex-col gap-8 pb-12">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col md:flex-row items-center overflow-hidden pt-28 md:pt-48 lg:pt-20 pb-8">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-accent/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-accent/5 rounded-full blur-[120px]" />
        </div>

        <div className="container mx-auto px-6 relative z-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-left relative z-30"
            >
              <h1 className="text-5xl md:text-8xl font-black mb-6 tracking-tighter leading-none mt-8 md:mt-0">
                IGNITE YOUR <br />
                <span className="relative inline-block">
                  <span className="relative z-30 text-brand-accent font-black tracking-tighter drop-shadow-[0_0_10px_rgba(249,115,22,0.5)]">
                    WINGS
                  </span>
                  <div className="absolute -inset-2 bg-brand-blue/60 blur-xl z-10 rounded-full pointer-events-none" />
                </span>
              </h1>
              <p className="text-xl md:text-2xl font-light text-slate-300 mb-8 max-w-xl">
                DREAM IT. BUILD IT. FLY IT. — Spark the fire that gives your mind wings.
              </p>

              <div className="h-24 flex items-center mb-8">
                <motion.p
                  key={quoteIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-lg italic text-brand-accent font-medium border-l-2 border-brand-accent/30 pl-6"
                >
                  &quot;{KALAM_QUOTES[quoteIndex]}&quot;
                </motion.p>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <Link
                  href="/join"
                  className="px-10 py-5 bg-brand-accent text-white rounded-2xl font-bold text-lg hover:scale-105 transition-transform flex items-center gap-2 shadow-xl shadow-brand-accent/30"
                >
                  Join Club <ChevronRight className="w-5 h-5" />
                </Link>
                <p className="text-slate-300 text-sm max-w-[200px]">
                  Join the future of innovation in drones, IoT & robotics
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <div className="relative w-full h-[250px] sm:h-[400px] md:h-[600px] flex items-center justify-center mt-12 md:mt-0" style={{ perspective: "2000px", transformStyle: "preserve-3d" }}>
                <div className="relative z-20 w-28 h-28 sm:w-48 sm:h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-brand-accent/30 shadow-[0_0_50px_rgba(249,115,22,0.3)] bg-brand-blue" style={{ transform: "translateZ(1px)" }}>
                  <Image
                    src="https://ik.imagekit.io/b3s3mttie3/Firewings%20/kalam.png"
                    alt="Dr. APJ Abdul Kalam Sketch"
                    fill
                    sizes="(min-width: 768px) 256px, (min-width: 640px) 192px, 112px"
                    className="object-cover grayscale contrast-125 opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-accent/20 to-transparent" />
                </div>

                <div className="absolute inset-0" style={{ transformStyle: "preserve-3d" }}>
                  {[
                    { rx: 75, ry: 15, duration: 12 },
                    { rx: -45, ry: 45, duration: 18 },
                    { rx: 35, ry: -65, duration: 24 }
                  ].map((orbit, i) => (
                    <div
                      key={i}
                      className="orbit-path"
                      style={{
                        width: `${300 + i * 50}px`,
                        height: `${300 + i * 50}px`,
                        transform: `translate(-50%, -50%) rotateX(${orbit.rx}deg) rotateY(${orbit.ry}deg)`,
                        transformStyle: "preserve-3d"
                      }}
                    >
                      <motion.div
                        className="absolute inset-0"
                        style={{ transformStyle: "preserve-3d" }}
                        animate={{ rotateZ: 360 }}
                        transition={{ duration: orbit.duration, repeat: Infinity, ease: "linear" }}
                      >
                        <div
                          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
                          style={{ transform: "rotateX(-90deg) rotateY(90deg)", transformStyle: "preserve-3d" }}
                        >
                          <div className="relative flex flex-col items-center">
                            <div className="text-brand-accent drop-shadow-[0_0_15px_rgba(249,115,22,0.9)]">
                              <Rocket className="w-6 h-6 -rotate-45" />
                            </div>
                            <div className="absolute top-[85%] flex flex-col items-center pointer-events-none">
                              <div className="w-1.5 h-6 bg-gradient-to-t from-transparent via-orange-500 to-yellow-300 rounded-full blur-[1px] origin-top fire-trail" />
                              <div className="absolute top-0 w-3 h-10 bg-orange-600/20 rounded-full blur-[4px] origin-top fire-glow" />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  ))}
                </div>

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-brand-accent/5 rounded-full blur-[100px]" style={{ transform: "translateZ(-250px)" }} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* RC Event Spotlight */}
      <section className="container mx-auto px-6 py-1">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass rounded-3xl md:rounded-[3rem] p-4 md:p-6 border-brand-accent/20 overflow-hidden"
        >
          <div className="grid lg:grid-cols-[minmax(260px,360px)_minmax(0,1fr)] gap-4 md:gap-6 items-center">
            <div className="relative w-full max-w-[360px] mx-auto lg:mx-0 rounded-2xl overflow-hidden border border-white/15 aspect-[5/4]">
              <Image
                src="/photos/rc_image/rc_event.webp"
                alt="RC Event challenge preview"
                fill
                sizes="(min-width: 1024px) 360px, (min-width: 768px) 52vw, 92vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/65 via-transparent to-transparent" />
            </div>

            <div className="md:pr-2">
              <span className="text-brand-accent font-bold uppercase tracking-widest text-sm md:text-base mb-2 block">RC Event</span>
              <h2 className="text-2xl md:text-4xl font-black leading-tight mb-3">Build. Race. Fly.</h2>
              <p className="text-slate-200 text-sm md:text-base leading-relaxed mb-5">
                Join the Firewing RC challenge in Track or Air mode. Pick your slot between 7:00 AM and 8:00 PM,
                register in seconds, and test your speed, control, and creativity on event day.
              </p>
              <Link href="/rc-event" className="inline-flex px-6 py-3 bg-brand-accent text-white rounded-2xl font-bold hover:bg-orange-500 transition-colors shadow-lg shadow-brand-accent/30">
                Register Now
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Why Firewing? */}
      <section className="container mx-auto px-6 py-1">
        <div className="glass rounded-3xl md:rounded-[3rem] p-6 md:p-16 border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-accent/5 to-transparent pointer-events-none" />

          <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
            <div>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 className="text-4xl md:text-6xl font-black mb-6 md:mb-8 leading-tight">
                  Why <span className="text-brand-accent">Firewing?</span>
                </h2>
                <p className="text-slate-300 text-lg mb-12 max-w-lg">
                  We are more than just a platform; we are a launchpad for the next generation of Indian engineers and dreamers.
                </p>
              </motion.div>

              <div className="grid gap-8">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="group flex gap-6 p-6 rounded-3xl hover:bg-white/5 transition-colors border border-transparent hover:border-brand-accent/20">
                  <div className="w-14 h-14 rounded-2xl bg-brand-accent/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Sparkles className="text-brand-accent w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-3">Practical Experience</h3>
                    <p className="text-slate-300 leading-relaxed">
                      Theory only takes you so far—real innovation happens at the workbench. Our boards feature fully immersive, practical exercises designed to captivate young minds.
                    </p>
                  </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="group flex gap-6 p-6 rounded-3xl hover:bg-white/5 transition-colors border border-transparent hover:border-brand-accent/20">
                  <div className="w-14 h-14 rounded-2xl bg-brand-accent/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Award className="text-brand-accent w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-3">Free to Join Our Club</h3>
                    <p className="text-slate-300 leading-relaxed">
                      Education should be accessible to all. Joining our club is completely free, giving you access to exclusive resources, workshops, and a vibrant community.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative">
              <div className="absolute -inset-4 bg-brand-accent/20 blur-3xl rounded-full opacity-30" />
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10 aspect-[4/3]">
                <Image
                  src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800"
                  alt="Innovation Lab"
                  fill
                  preload
                  sizes="(min-width: 1024px) 40vw, 92vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/80 via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8 right-8 p-6 glass rounded-2xl">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-brand-accent rounded-full flex items-center justify-center">
                      <Rocket className="text-white w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-white font-bold">Ready to Fly?</p>
                      <p className="text-slate-300 text-xs">Join 500+ students building today.</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Saji Thomas Portfolio */}
      <section className="py-2 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 left-1/3 w-[420px] h-[420px] bg-brand-accent/15 rounded-full blur-[130px]" />
          <div className="absolute -bottom-24 right-0 w-[520px] h-[520px] bg-orange-500/10 rounded-full blur-[150px]" />
        </div>

        <div className="container mx-auto px-6 relative">
          <div className="text-center mb-6 md:mb-8">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight">
              Dreams <span className="text-brand-accent">Beyond Limits</span>
            </h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-[2rem] md:rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-white/[0.06] via-white/[0.02] to-transparent"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(249,115,22,0.25),transparent_45%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:42px_42px] opacity-30" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_420px] items-start gap-6 lg:gap-8 p-5 md:p-7 lg:p-10">
              <div className="order-1 space-y-5 text-left lg:pr-2">


                <div>
                  <p className="text-brand-accent font-bold uppercase tracking-[0.16em] text-4xl mb-2">Saji Thomas</p>
                  <p className="text-base md:text-2xl text-slate-200 mt-3 mb-2 font-medium">
                    Self-Taught Aerospace Innovator
                  </p>
                  <h2 className="text-md md:text-md lg:text-lg font-black leading-tight tracking-tight">
                    The Man Who Gave Wings to Dreams
                  </h2>
                </div>

                <div className="space-y-4 text-slate-200 leading-relaxed text-sm md:text-base">
                  <p>
                    Beyond the limitations of speech and hearing, Saji listened only to his dreams.
                  </p>
                  <p>
                    Though he left school after the seventh standard, his passion for flight and engineering never stopped. Through years of self-learning, determination, and relentless experimentation, he designed, built, and successfully flew his own ultralight aircraft.
                  </p>
                </div>

                <div className="rounded-2xl border border-brand-accent/25 bg-brand-accent/10 p-4 md:p-5">
                  <p className="text-slate-100 text-sm md:text-base leading-relaxed">
                    The spirit of FirewingFab is built on the same belief &mdash;
                    <span className="block mt-2 font-semibold text-white">
                      &ldquo;It is not limitations, but dreams, that lift people higher.&rdquo;
                    </span>
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 md:p-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-brand-accent font-bold mb-2">Signature Line</p>
                  <p className="text-xl md:text-2xl font-semibold text-white italic leading-snug">
                    &ldquo;Dreams don&rsquo;t need permission to fly.&rdquo;
                  </p>
                </div>
              </div>

              <div className="order-2 w-full max-w-[420px] ml-auto lg:ml-0 lg:justify-self-end lg:self-start">
                <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03]">
                  <button
                    type="button"
                    onClick={() => setActivePortfolioImage(activeSlide)}
                    className="relative aspect-[4/5] w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
                    aria-label={`Open full image for ${activeSlide.label}`}
                  >
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeSlide.src}
                        initial={{ opacity: 0, x: 14 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -14 }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute inset-0"
                      >
                        <Image
                          src={activeSlide.src}
                          alt={activeSlide.alt}
                          fill
                          loading={portfolioSlideIndex === 0 ? "eager" : "lazy"}
                          fetchPriority={portfolioSlideIndex === 0 ? "high" : "auto"}
                          sizes="(min-width: 1280px) 420px, (min-width: 1024px) 34vw, (min-width: 768px) 46vw, 92vw"
                          className={
                            activeSlide.previewFit === "contain"
                              ? "object-contain bg-slate-950/70 p-1.5 md:p-2"
                              : "object-cover"
                          }
                        />
                      </motion.div>
                    </AnimatePresence>
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/90 via-brand-blue/25 to-transparent pointer-events-none" />

                    <div className="absolute top-3 right-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-brand-blue/70 px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-slate-100">
                      <span>{portfolioSlideIndex + 1}</span>
                      <span className="text-slate-300">/</span>
                      <span>{SAJI_PORTFOLIO_SLIDES.length}</span>
                    </div>
                    <div className="absolute top-3 left-3 inline-flex items-center justify-center rounded-full border border-white/20 bg-brand-blue/70 p-1.5 text-white">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 px-4 py-3.5">
                      <p className="text-xs tracking-[0.14em] uppercase font-bold text-slate-100">{activeSlide.label}</p>
                      <p className="text-[10px] text-slate-300 mt-0.5">Click to view full image</p>
                    </div>
                  </button>
                </div>

                <div className="mt-3 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={showPreviousSlide}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-slate-100 transition-colors hover:border-brand-accent/40 hover:text-brand-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
                      aria-label="Previous portfolio image"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={showNextSlide}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-slate-100 transition-colors hover:border-brand-accent/40 hover:text-brand-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
                      aria-label="Next portfolio image"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {SAJI_PORTFOLIO_SLIDES.map((slide, index) => (
                      <button
                        key={slide.src}
                        type="button"
                        onClick={() => setPortfolioSlideIndex(index)}
                        className={`h-2 rounded-full transition-all ${
                          index === portfolioSlideIndex ? "w-6 bg-brand-accent" : "w-2 bg-white/35 hover:bg-white/55"
                        }`}
                        aria-label={`Show ${slide.label}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {activePortfolioImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActivePortfolioImage(null)}
            className="fixed inset-0 z-[120] p-4 md:p-8 lg:p-10 flex items-center justify-center"
            role="dialog"
            aria-modal="true"
            aria-label={`${activePortfolioImage.label} full image preview`}
          >
            <motion.div className="absolute inset-0 bg-brand-blue/90 backdrop-blur-xl" />

            <motion.div
              initial={{ y: 20, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              onClick={(event) => event.stopPropagation()}
              className="relative z-10 w-full max-w-6xl rounded-[2rem] border border-white/15 bg-slate-950/80 shadow-[0_30px_120px_rgba(0,0,0,0.6)] p-3 md:p-5"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-brand-accent font-bold">Portfolio Spotlight</p>
                  <h3 className="text-base md:text-xl font-bold text-white">{activePortfolioImage.label}</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActivePortfolioImage(null)}
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-white/15 bg-white/5 text-white hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
                  aria-label="Close full image preview"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="relative w-full h-[60vh] md:h-[72vh] rounded-2xl overflow-hidden border border-white/10 bg-black/30">
                <Image
                  src={activePortfolioImage.src}
                  alt={activePortfolioImage.alt}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Developers Marquee */}
      <section className="bg-brand-blue/50 py-3 overflow-hidden">
        <div className="container mx-auto px-6 mb-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Developer &amp; Achievements</h2>
          <p className="text-slate-300">Our Community Inspired Members</p>
        </div>

        <div className="relative flex overflow-hidden group">
          <div className="flex gap-8 animate-marquee">
            {duplicatedStories.map((story, i) => (
              <div key={i} className="w-[350px] glass rounded-3xl overflow-hidden shrink-0">
                <div className="aspect-video overflow-hidden relative">
                  <Image
                    src={story.image}
                    alt={story.name}
                    fill
                    sizes="(min-width: 1280px) 350px, (min-width: 768px) 45vw, 90vw"
                    className="object-cover"
                    style={story.image === "/photos/Mbits Drone.webp" ? { objectPosition: "center 18%" } : undefined}
                  />
                </div>
                <div className="p-6 whitespace-normal">
                  <div className="flex items-center gap-2 text-brand-accent mb-2">
                    <Award className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">{story.achievement}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-1">{story.name}</h3>
                  <p className="text-sm text-slate-300 mb-4">{story.project}</p>
                  <p className="text-slate-300 text-sm leading-relaxed line-clamp-3">{story.story}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
