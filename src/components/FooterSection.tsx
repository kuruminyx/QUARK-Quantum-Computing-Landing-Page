import { motion } from "framer-motion";

const FooterSection = () => {
  return (
    <footer className="relative py-16 border-t border-border/30">
      <div className="absolute inset-0 section-overlay" />
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-6xl mx-auto px-6"
      >
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h3 className="font-heading text-2xl font-bold text-primary text-glow-cyan mb-1">QUARK</h3>
            <p className="text-sm text-muted-foreground italic">The universe computes. We listen.</p>
          </div>

          <nav className="flex gap-8">
            {["Research", "Careers", "Press", "Contact"].map((link) => (
              <a key={link} href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300">
                {link}
              </a>
            ))}
          </nav>

          <div className="flex gap-4">
            {["𝕏", "in", "◉"].map((icon, i) => (
              <a key={i} href="#" className="w-9 h-9 rounded-full border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-300 text-sm">
                {icon}
              </a>
            ))}
          </div>
        </div>

        <div className="text-center mt-10 text-xs text-muted-foreground/50">
          © 2026 QUARK Technologies Inc. All rights reserved.
        </div>
      </motion.div>
    </footer>
  );
};

export default FooterSection;
