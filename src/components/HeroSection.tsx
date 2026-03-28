import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const AnimatedCounter = ({ end, duration = 2000, prefix = "", suffix = "" }: { end: number; duration?: number; prefix?: string; suffix?: string }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(tick);
    };
    tick();
  }, [end, duration]);

  return <span>{prefix}{count.toLocaleString()}{suffix}</span>;
};

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center noise-overlay scanline-overlay">
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Status label */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center justify-center gap-2 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse-dot inline-block" style={{ animation: "pulse-dot 2s ease-in-out infinite" }} />
          <span className="text-xs font-mono tracking-[0.3em] text-primary text-glow-cyan uppercase">
            Quantum Supremacy Achieved
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.95] mb-6 tracking-tight"
        >
          Computing at the
          <br />
          <span className="text-primary text-glow-cyan">Speed of the Universe</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          QUARK-9 processes in superposition — solving in seconds what would take classical computers 10,000 years.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <button className="px-8 py-3.5 bg-primary text-primary-foreground font-heading font-semibold rounded-lg glow-cyan hover:glow-cyan-strong transition-all duration-300 text-sm tracking-wide">
            Request Early Access
          </button>
          <button className="px-8 py-3.5 border border-primary/40 text-primary font-heading font-semibold rounded-lg hover:bg-primary/10 transition-all duration-300 text-sm tracking-wide">
            Watch Demo
          </button>
        </motion.div>

        {/* Animated counters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.6 }}
          className="flex justify-center gap-12 md:gap-20"
        >
          <div className="text-center">
            <div className="font-mono text-2xl md:text-3xl font-bold text-primary text-glow-cyan">
              <AnimatedCounter end={1247} duration={2500} />
            </div>
            <div className="text-xs text-muted-foreground tracking-[0.2em] mt-1 uppercase">Qubits</div>
          </div>
          <div className="text-center">
            <div className="font-mono text-2xl md:text-3xl font-bold text-primary text-glow-cyan">
              10<sup className="text-lg"><AnimatedCounter end={18} duration={2000} /></sup>
            </div>
            <div className="text-xs text-muted-foreground tracking-[0.2em] mt-1 uppercase">Operations/sec</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
