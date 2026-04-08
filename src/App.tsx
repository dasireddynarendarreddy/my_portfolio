import { lazy, Suspense } from 'react';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';

const About = lazy(() => import('@/components/sections/About'));
const Experience = lazy(() => import('@/components/sections/Experience'));
const Projects = lazy(() => import('@/components/sections/Projects'));
const Skills = lazy(() => import('@/components/sections/Skills'));
const Contact = lazy(() => import('@/components/sections/Contact'));

function SectionFallback() {
  return (
    <div className="h-32 flex items-center justify-center">
      <div className="w-6 h-6 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
    </div>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-[#0f0f13] text-white selection:bg-indigo-500/30">
      <Navigation />
      <main>
        <Hero />
        <Suspense fallback={<SectionFallback />}>
          <About />
        </Suspense>
        <div className="section-divider" />
        <Suspense fallback={<SectionFallback />}>
          <Experience />
        </Suspense>
        <div className="section-divider" />
        <Suspense fallback={<SectionFallback />}>
          <Projects />
        </Suspense>
        <div className="section-divider" />
        <Suspense fallback={<SectionFallback />}>
          <Skills />
        </Suspense>
        <div className="section-divider" />
        <Suspense fallback={<SectionFallback />}>
          <Contact />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default App;
