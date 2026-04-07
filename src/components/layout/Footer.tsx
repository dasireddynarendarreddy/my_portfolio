import { Github, Linkedin, Mail, Heart } from 'lucide-react';
import { personalInfo } from '@/data/portfolio';

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-10 mt-0">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white font-bold text-xs">
              N
            </div>
            <span className="text-slate-400 text-sm">
              <span className="text-white font-semibold">{personalInfo.name}</span> — Full Stack Developer
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-all duration-200"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-all duration-200"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-all duration-200"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

          <p className="text-slate-500 text-sm flex items-center gap-1.5">
            Built with <Heart className="w-3.5 h-3.5 text-red-400 fill-current" /> using React & Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
}
