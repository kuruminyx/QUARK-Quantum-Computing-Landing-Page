import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const QUBIT_COUNT = 20;
const STATES = ["0", "1", "Ψ"];
const COLORS: Record<string, string> = {
  "0": "#00f5ff",
  "1": "#ff00d4",
  "Ψ": "#00ff88",
};

const QubitVisualizer = () => {
  const [qubits, setQubits] = useState<string[]>(
    Array.from({ length: QUBIT_COUNT }, () => STATES[Math.floor(Math.random() * 3)])
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setQubits((prev) =>
        prev.map((q) => (Math.random() < 0.15 ? STATES[Math.floor(Math.random() * 3)] : q))
      );
    }, 300);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-24 md:py-32">
      <div className="absolute inset-0 section-overlay" />
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <span className="font-mono text-xs text-primary tracking-[0.2em] uppercase">
            QUARK-9 Live State Monitor (Simulated)
          </span>
        </motion.div>

        {/* Qubit grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {qubits.map((state, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.04, type: "spring", stiffness: 200 }}
              className="w-14 h-14 rounded-full border flex items-center justify-center font-mono text-lg font-bold transition-all duration-500"
              style={{
                borderColor: COLORS[state],
                color: COLORS[state],
                boxShadow: `0 0 15px ${COLORS[state]}44, inset 0 0 10px ${COLORS[state]}22`,
              }}
            >
              {state === "Ψ" ? "|Ψ⟩" : `|${state}⟩`}
            </motion.div>
          ))}
        </motion.div>

        {/* Sine wave */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden h-20 relative origin-left"
        >
          <svg
            className="absolute top-0 left-0"
            width="200%"
            height="80"
            style={{ animation: "wave-flow 4s linear infinite" }}
          >
            <path
              d={generateWavePath(1600, 80, 4)}
              fill="none"
              stroke="#00f5ff"
              strokeWidth="1.5"
              opacity="0.6"
            />
            <path
              d={generateWavePath(1600, 80, 3, 10)}
              fill="none"
              stroke="#ff00d4"
              strokeWidth="1"
              opacity="0.3"
            />
          </svg>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-center text-xs text-muted-foreground mt-4 font-mono"
        >
          Probability amplitude distribution • Real-time state collapse visualization
        </motion.p>
      </div>
    </section>
  );
};

function generateWavePath(width: number, height: number, cycles: number, offsetY: number = 0): string {
  const mid = height / 2 + offsetY;
  const amp = height / 3;
  let d = `M 0 ${mid}`;
  for (let x = 0; x <= width; x += 2) {
    const y = mid + Math.sin((x / width) * cycles * Math.PI * 2) * amp;
    d += ` L ${x} ${y}`;
  }
  return d;
}

export default QubitVisualizer;
