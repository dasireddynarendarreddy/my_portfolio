import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Download } from 'lucide-react';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { personalInfo } from '@/data/portfolio';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const progress = useScrollProgress();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks.map((l) => l.href.replace('#', ''));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.3 }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 h-[2px] z-[100] origin-left"
        style={{
          width: `${progress}%`,
          background: 'linear-gradient(90deg, #6366f1, #06b6d4)',
        }}
      />

      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#0f0f13]/90 backdrop-blur-xl border-b border-white/[0.06] py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center gap-2 group"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm shadow-lg group-hover:shadow-indigo-500/30 transition-shadow">
              N
            </div>
            <span className="font-bold text-white hidden sm:block">
              {personalInfo.name.split(' ')[0]}
              <span className="gradient-text">.</span>
            </span>
          </motion.a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 underline-anim ${
                  activeSection === link.href.replace('#', '')
                    ? 'text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {activeSection === link.href.replace('#', '') && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-white/[0.06] rounded-lg"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </button>
            ))}
          </nav>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-3">
            <a
              href={`mailto:${personalInfo.email}`}
              className="hidden md:flex btn-primary text-sm py-2 px-4"
            >
              <Download className="w-4 h-4" />
              Hire Me
            </a>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg bg-white/[0.05] border border-white/[0.08] text-slate-300 hover:text-white transition-colors"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden border-t border-white/[0.06] bg-[#0f0f13]/95 backdrop-blur-xl overflow-hidden"
            >
              <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.button
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => handleNavClick(link.href)}
                    className="text-left px-4 py-3 text-slate-300 hover:text-white hover:bg-white/[0.04] rounded-lg transition-colors font-medium"
                  >
                    {link.label}
                  </motion.button>
                ))}
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="mt-2 btn-primary justify-center text-sm"
                >
                  Hire Me
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
