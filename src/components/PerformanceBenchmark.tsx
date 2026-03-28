import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const metrics = [
  { label: "Factoring RSA-2048", classical: "~300 trillion years", quark: "8 hours" },
  { label: "Molecular Simulation (200 atoms)", classical: "~10,000 years", quark: "4.2 seconds" },
  { label: "Optimization (10⁶ variables)", classical: "~3 months", quark: "12 milliseconds" },
  { label: "Neural Network Training (1T params)", classical: "~6 months", quark: "47 minutes" },
  { label: "Climate Model (full-fidelity)", classical: "~2 years", quark: "3.1 hours" },
];

const PerformanceBenchmark = () => {
  const [animBars, setAnimBars] = useState(false);

  return (
    <section className="relative py-24 md:py-32">
      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="font-heading text-3xl md:text-4xl font-bold text-center mb-14"
        >
          Classical vs <span className="text-primary text-glow-cyan">Quantum</span>
        </motion.h2>

        {/* Bars */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          onViewportEnter={() => setTimeout(() => setAnimBars(true), 300)}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="grid md:grid-cols-2 gap-8 mb-14"
        >
          <div>
            <p className="font-mono text-sm text-muted-foreground mb-3">Classical Supercomputer</p>
            <div className="h-10 rounded bg-muted/30 overflow-hidden">
              <div
                className="h-full bg-muted-foreground/30 rounded transition-all duration-[5000ms] ease-out"
                style={{ width: animBars ? "100%" : "0%" }}
              />
            </div>
            <p className="font-mono text-xs text-muted-foreground mt-2">10,000 years</p>
          </div>
          <div>
            <p className="font-mono text-sm text-primary mb-3">QUARK-9</p>
            <div className="h-10 rounded bg-muted/30 overflow-hidden">
              <div
                className="h-full rounded glow-cyan transition-all duration-300 ease-out"
                style={{
                  width: animBars ? "4%" : "0%",
                  background: "linear-gradient(90deg, #00f5ff, #00ff88)",
                  minWidth: animBars ? "60px" : "0",
                }}
              />
            </div>
            <p className="font-mono text-xs text-primary mt-2">4.2 seconds</p>
          </div>
        </motion.div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass-card rounded-lg overflow-hidden"
        >
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 font-heading text-muted-foreground font-medium">Benchmark</th>
                <th className="text-left p-4 font-heading text-muted-foreground font-medium">Classical</th>
                <th className="text-left p-4 font-heading text-primary font-medium">QUARK-9</th>
              </tr>
            </thead>
            <tbody>
              {metrics.map((m, i) => (
                <motion.tr
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                  className="border-b border-border/50 last:border-0"
                >
                  <td className="p-4 font-mono text-xs">{m.label}</td>
                  <td className="p-4 font-mono text-xs text-muted-foreground">{m.classical}</td>
                  <td className="p-4 font-mono text-xs text-primary">{m.quark}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
};

export default PerformanceBenchmark;
