import { motion } from 'framer-motion';
import { Code2, Palette, Lightbulb, Zap } from 'lucide-react';
import { personalInfo } from '@/data/portfolio';
import SectionHeader from '@/components/ui/SectionHeader';

const traits = [
  {
    icon: Code2,
    title: 'Clean Architecture',
    description: 'Writing maintainable, scalable, and well-structured code is a core principle — not an afterthought.',
    color: 'text-indigo-400',
    bg: 'bg-indigo-500/10',
    border: 'border-indigo-500/20',
  },
  {
    icon: Palette,
    title: 'Design-Driven',
    description: 'Pixel-perfect UIs that feel intuitive. Design and engineering must work in harmony.',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20',
  },
  {
    icon: Lightbulb,
    title: 'Problem Solver',
    description: 'I thrive on complex challenges — breaking them down into elegant, user-centric solutions.',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
  },
  {
    icon: Zap,
    title: 'Performance First',
    description: 'Speed matters. Every project is optimized for fast load times, smooth interactions, and great UX.',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
  },
];

export default function About() {
  return (
    <section id="about" className="section py-24">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          eyebrow="About Me"
          title="Crafting Digital Experiences"
          subtitle="A developer who blends technical depth with design sensibility."
        />

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Bio */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="glass rounded-2xl p-8 border border-white/[0.06] relative overflow-hidden">
              {/* Decorative gradient */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-500/10 blur-3xl rounded-full pointer-events-none" />

              <div className="relative z-10">
                {/* Avatar placeholder */}
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white text-3xl font-extrabold mb-6 shadow-lg shadow-indigo-500/20">
                  N
                </div>

                <h3 className="text-xl font-bold text-white mb-1">{personalInfo.name}</h3>
                <p className="text-indigo-400 text-sm font-medium mb-5">Full Stack Developer</p>

                <p className="text-slate-400 leading-relaxed mb-4">{personalInfo.bio}</p>
                <p className="text-slate-400 leading-relaxed">{personalInfo.bioExtended}</p>

                <div className="mt-6 pt-6 border-t border-white/[0.06] flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-sm text-slate-400">
                    Open to <span className="text-white font-medium">full-time roles</span> and <span className="text-white font-medium">freelance projects</span>
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Trait cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {traits.map((trait, i) => (
              <motion.div
                key={trait.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`glass glass-hover rounded-2xl p-6 border ${trait.border} group cursor-default`}
              >
                <div className={`w-10 h-10 rounded-xl ${trait.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <trait.icon className={`w-5 h-5 ${trait.color}`} />
                </div>
                <h4 className="text-white font-semibold mb-2">{trait.title}</h4>
                <p className="text-slate-500 text-sm leading-relaxed">{trait.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
