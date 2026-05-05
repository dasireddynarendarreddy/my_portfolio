import { motion } from 'framer-motion';
import { Briefcase, CheckCircle2 } from 'lucide-react';
import { experiences } from '@/data/portfolio';
import SectionHeader from '@/components/ui/SectionHeader';

export default function Experience() {
  return (
    <section id="experience" className="section py-24 bg-[#0c0c10]">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          eyebrow="Career"
          title="Work Experience"
          subtitle="My journey building products and growing as an engineer."
        />

        <div className="relative max-w-3xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500/60 via-indigo-500/20 to-transparent hidden md:block" />

          <div className="space-y-8">
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative flex gap-6"
              >
                {/* Timeline dot */}
                <div className="hidden md:flex flex-col items-center">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg shrink-0 z-10"
                    style={{ background: `${exp.color}20`, border: `1px solid ${exp.color}30` }}
                  >
                    <Briefcase className="w-5 h-5" style={{ color: exp.color }} />
                  </div>
                </div>

                {/* Card */}
                <div className="flex-1 glass glass-hover rounded-2xl p-7 border border-white/[0.06] group">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                    <div>
                      <h3 className="text-white font-bold text-lg group-hover:text-indigo-300 transition-colors">
                        {exp.role}
                      </h3>
                      <p className="font-medium mt-0.5" style={{ color: exp.color }}>
                        {exp.company}
                      </p>
                    </div>
                    <div className="flex flex-col sm:items-end gap-1 shrink-0">
                      <span className="text-sm text-slate-400 font-mono">{exp.duration}</span>
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-white/[0.05] text-slate-400 border border-white/[0.06] w-fit">
                        {exp.type}
                      </span>
                    </div>
                  </div>

                  <p className="text-slate-400 text-sm leading-relaxed mb-5">{exp.description}</p>

                  <div className="space-y-2">
                    {exp.highlights.map((h, j) => (
                      <div key={j} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="text-slate-400 text-sm">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
