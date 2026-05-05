import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Star } from 'lucide-react';
import { projects } from '@/data/portfolio';
import SectionHeader from '@/components/ui/SectionHeader';

type FilterKey = 'All' | 'Featured';

export default function Projects() {
  const [filter, setFilter] = useState<FilterKey>('All');
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const filtered = filter === 'Featured' ? projects.filter((p) => p.featured) : projects;

  return (
    <section id="projects" className="section py-24">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          eyebrow="Portfolio"
          title="Featured Projects"
          subtitle="Real-world applications built with modern tech stacks — from AI tools to full-stack platforms."
        />

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center gap-2 mb-12"
        >
          {(['All', 'Featured'] as FilterKey[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                filter === f
                  ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/25'
                  : 'glass border border-white/[0.08] text-slate-400 hover:text-white hover:border-indigo-500/30'
              }`}
            >
              {f}
            </button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="glass rounded-2xl border border-white/[0.06] overflow-hidden group flex flex-col hover:border-indigo-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/10"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f13] via-transparent to-transparent" />

                  {/* Featured badge */}
                  {project.featured && (
                    <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-400 text-xs font-medium backdrop-blur-sm">
                      <Star className="w-3 h-3 fill-current" />
                      Featured
                    </div>
                  )}

                  {/* Color accent */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-px opacity-60"
                    style={{ background: `linear-gradient(90deg, transparent, ${project.color}, transparent)` }}
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-6">
                  <h3 className="text-white font-bold text-lg mb-2 group-hover:text-indigo-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed flex-1 mb-4">
                    {hoveredId === project.id ? project.longDescription : project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.tags.map((tag) => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-3 mt-auto pt-4 border-t border-white/[0.06]">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 hover:bg-indigo-500/20 hover:border-indigo-500/40 transition-all text-sm font-medium"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Live Demo
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl glass border border-white/[0.08] text-slate-400 hover:text-white hover:border-white/20 transition-all text-sm font-medium"
                    >
                      <Github className="w-3.5 h-3.5" />
                      Code
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href="https://github.com/dasireddynarendarreddy"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost inline-flex"
          >
            <Github className="w-4 h-4" />
            View All on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
}
