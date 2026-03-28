import { motion } from "framer-motion";

const HexLayer = ({ size, color }: { size: number; color: string }) => (
  <div
    style={{
      width: size,
      height: size,
      clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
      border: `1px solid ${color}`,
      background: `${color.replace(/[\d.]+\)$/, "0.05)")}`,
    }}
  />
);

const StatBlock = ({ value, label, delay }: { value: string; label: string; delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="text-center"
  >
    <div className="font-mono text-xl font-bold text-primary">{value}</div>
    <div className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">{label}</div>
  </motion.div>
);

const WhatWeBuiltSection = () => {
  return (
    <section className="relative py-24 md:py-32">
      <div className="absolute inset-0 section-overlay" />
      <div className="relative z-10 max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        {/* Hexagon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6, rotate: -30 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center"
        >
          <div className="relative w-64 h-64">
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ animation: "hexagon-rotate 20s linear infinite" }}
            >
              <HexLayer size={220} color="rgba(0,245,255,0.3)" />
            </div>
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ animation: "hexagon-rotate 30s linear infinite reverse" }}
            >
              <HexLayer size={170} color="rgba(255,0,212,0.25)" />
            </div>
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ animation: "hexagon-rotate 25s linear infinite" }}
            >
              <HexLayer size={120} color="rgba(0,255,136,0.3)" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-primary/20 blur-xl" />
            </div>
          </div>
        </motion.div>

        {/* Content */}
        <div>
          <motion.h2
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading text-3xl md:text-4xl font-bold mb-6"
          >
            Not faster computers.
            <br />
            <span className="text-primary text-glow-cyan">Different computers.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="text-muted-foreground leading-relaxed mb-8"
          >
            Classical machines process bits — zeroes and ones, one at a time. QUARK-9 harnesses quantum superposition, allowing qubits to exist in multiple states simultaneously. Through engineered entanglement and quantum tunneling, we've built a machine that doesn't just compute faster — it computes in dimensions classical hardware can't access.
          </motion.p>
          <div className="grid grid-cols-3 gap-6">
            <StatBlock value="99.9%" label="Error Correction" delay={0.3} />
            <StatBlock value="1,247" label="Qubits" delay={0.4} />
            <StatBlock value="10¹⁸" label="Ops/sec" delay={0.5} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeBuiltSection;
