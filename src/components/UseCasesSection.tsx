import { motion } from "framer-motion";

const useCases = [
  { icon: "🧬", title: "Drug Discovery", desc: "Simulate molecular interactions at quantum scale to identify viable drug candidates in hours, not years.", color: "border-l-neon-cyan" },
  { icon: "🌍", title: "Climate Modeling", desc: "Run full-fidelity Earth system models capturing chaotic dynamics that classical simulations approximate.", color: "border-l-neon-magenta" },
  { icon: "🔐", title: "Financial Cryptography", desc: "Post-quantum encryption protocols and real-time risk modeling across billions of variables.", color: "border-l-neon-green" },
  { icon: "⚛️", title: "Materials Science", desc: "Design novel superconductors, catalysts, and metamaterials by simulating quantum mechanical properties.", color: "border-l-neon-cyan" },
  { icon: "🧠", title: "AI Training", desc: "Quantum-accelerated gradient descent across exponentially large parameter spaces.", color: "border-l-neon-magenta" },
  { icon: "📦", title: "Logistics Optimization", desc: "Solve traveling salesman problems with millions of nodes in real time for global supply chains.", color: "border-l-neon-green" },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      delay: i * 0.1,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
};

const UseCasesSection = () => {
  return (
    <section className="relative py-24 md:py-32">
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            What QUARK <span className="text-primary text-glow-cyan">solves</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Problems that were previously intractable become routine.
          </p>
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {useCases.map((uc, i) => (
            <motion.div
              key={uc.title}
              custom={i}
              variants={cardVariants}
              whileHover={{ y: -6, boxShadow: "0 0 30px rgba(0,245,255,0.15)" }}
              className={`glass-card rounded-lg p-6 border-l-4 ${uc.color} transition-colors duration-300`}
            >
              <div className="text-3xl mb-3">{uc.icon}</div>
              <h3 className="font-heading font-semibold text-lg mb-2">{uc.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{uc.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default UseCasesSection;
