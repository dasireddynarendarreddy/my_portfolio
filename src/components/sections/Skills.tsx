import { useState } from 'react';
import { motion } from 'framer-motion';
import { skillCategories } from '@/data/portfolio';
import SectionHeader from '@/components/ui/SectionHeader';

function SkillBar({ name, level, icon, index }: { name: string; level: number; icon: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="group"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-base">{icon}</span>
          <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">{name}</span>
        </div>
        <span className="text-xs text-slate-500 font-mono">{level}%</span>
      </div>
      <div className="h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: index * 0.06 + 0.2, ease: 'easeOut' }}
          className="h-full rounded-full relative"
          style={{ background: 'linear-gradient(90deg, #6366f1, #818cf8)' }}
        >
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-sm shadow-indigo-500/50" />
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <section id="skills" className="section py-24 bg-[#0c0c10]">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          eyebrow="Expertise"
          title="Skills & Technologies"
          subtitle="My technical toolkit — continuously expanding with each project."
        />

        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center gap-2 flex-wrap mb-12"
        >
          {skillCategories.map((cat, i) => (
            <button
              key={cat.label}
              onClick={() => setActiveCategory(i)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeCategory === i
                  ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/25'
                  : 'glass border border-white/[0.08] text-slate-400 hover:text-white'
              }`}
            >
              <span>{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="glass rounded-2xl border border-white/[0.06] p-8"
          >
            <div className="flex items-center gap-3 mb-8">
              <span className="text-2xl">{skillCategories[activeCategory].icon}</span>
              <div>
                <h3 className="text-white font-bold text-lg">{skillCategories[activeCategory].label}</h3>
                <p className="text-slate-500 text-sm">{skillCategories[activeCategory].skills.length} technologies</p>
              </div>
            </div>

            <div className="space-y-6">
              {skillCategories[activeCategory].skills.map((skill, i) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  icon={skill.icon}
                  index={i}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* All skills cloud */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-slate-500 text-sm mb-6 uppercase tracking-widest text-xs">Also experienced with</p>
          <div className="flex flex-wrap justify-center gap-2">
            {['REST APIs', 'Framer Motion', 'shadcn/ui', 'Material UI', 'Amazon Polly', 'Vercel', 'Netlify', 'Gemini API', 'Canvas API', 'React Router', 'React Hook Form', 'Zod'].map((tech) => (
              <span key={tech} className="tag">{tech}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
