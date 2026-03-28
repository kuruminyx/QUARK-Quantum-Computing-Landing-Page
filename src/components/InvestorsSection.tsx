import { motion } from "framer-motion";

const partners = [
  "DeepMind Ventures",
  "CERN Labs",
  "MIT Quantum Initiative",
  "Andreessen Horowitz",
  "DARPA",
  "IBM Research",
];

const InvestorsSection = () => {
  return (
    <section className="relative py-24 md:py-32">
      <div className="absolute inset-0 section-overlay" />
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="font-heading text-3xl md:text-4xl font-bold mb-4"
        >
          Backed by those who <span className="text-primary text-glow-cyan">build the future</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-muted-foreground mb-14 max-w-lg mx-auto"
        >
          Strategic partnerships with the world's leading research institutions and technology investors.
        </motion.p>
        <div className="flex flex-wrap justify-center gap-8 md:gap-12">
          {partners.map((name, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              whileHover={{ scale: 1.08, color: "#00f5ff" }}
              className="font-heading text-lg md:text-xl font-semibold text-muted-foreground/40 hover:text-primary transition-colors duration-500 cursor-default"
            >
              {name}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InvestorsSection;
