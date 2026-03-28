import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const EarlyAccessSection = () => {
  const [waitlist, setWaitlist] = useState(2847);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.3) {
        setWaitlist((prev) => prev + 1);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-24 md:py-32">
      <div className="relative z-10 max-w-xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-4">
            Join the <span className="text-primary text-glow-cyan">Quantum Era</span>
          </h2>
          <p className="text-muted-foreground text-center mb-10">
            Currently accepting 50 organizations for our closed beta.
          </p>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <input type="text" placeholder="Full Name" className="w-full px-4 py-3 bg-muted/30 border border-border rounded-lg text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary font-body text-sm" />
            <input type="text" placeholder="Organization" className="w-full px-4 py-3 bg-muted/30 border border-border rounded-lg text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary font-body text-sm" />
            <select className="w-full px-4 py-3 bg-muted/30 border border-border rounded-lg text-muted-foreground/70 focus:outline-none focus:ring-1 focus:ring-primary font-body text-sm appearance-none">
              <option value="">Select Use Case</option>
              <option value="research">Research</option>
              <option value="enterprise">Enterprise</option>
              <option value="defense">Defense</option>
              <option value="healthcare">Healthcare</option>
            </select>
            <input type="email" placeholder="Email Address" className="w-full px-4 py-3 bg-muted/30 border border-border rounded-lg text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary font-body text-sm" />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-8 py-3.5 bg-primary text-primary-foreground font-heading font-semibold rounded-lg glow-cyan hover:glow-cyan-strong transition-all duration-300 text-sm tracking-wide"
            >
              Request Access
            </motion.button>
          </form>

          <p className="text-center text-xs text-muted-foreground mt-6 font-mono">
            <span className="text-primary">{waitlist.toLocaleString()}</span> on waitlist
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default EarlyAccessSection;
