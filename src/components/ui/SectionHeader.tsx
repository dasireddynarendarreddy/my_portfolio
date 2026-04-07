import { motion } from 'framer-motion';

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

export default function SectionHeader({ eyebrow, title, subtitle, align = 'center' }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`mb-16 ${align === 'center' ? 'text-center' : 'text-left'}`}
    >
      {eyebrow && (
        <div className={`flex items-center gap-3 mb-4 ${align === 'center' ? 'justify-center' : ''}`}>
          <span className="h-px w-8 bg-gradient-to-r from-indigo-500 to-transparent" />
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-400">
            {eyebrow}
          </span>
          <span className="h-px w-8 bg-gradient-to-l from-indigo-500 to-transparent" />
        </div>
      )}
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{title}</h2>
      {subtitle && (
        <p className="text-slate-400 text-lg max-w-xl mx-auto">{subtitle}</p>
      )}
    </motion.div>
  );
}
