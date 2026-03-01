import React from 'react';
import Header from './components/layout/Header.tsx';
import Footer from './components/layout/Footer.tsx';
import Hero from './components/sections/Hero.tsx';
import AboutMe from './components/sections/AboutMe.tsx';
import Interests from './components/sections/Interests.tsx';
import TechStacks from './components/sections/TechStacks.tsx';
import Projects from './components/sections/Projects.tsx';
import Awards from './components/sections/Awards.tsx';
import GitHubStats from './components/sections/GitHubStats.tsx';
import Goals from './components/sections/Goals.tsx';
import Contact from './components/sections/Contact.tsx';
import { socialLinks, interests, techStacks, projects, awards, goals } from './data/index.ts';
import './styles/globals.css';
import profile_image from './assets/images/Airhood_Fixed.png';

const App: React.FC = () => {
  React.useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0f] text-neutral-900 dark:text-white">
      <Header />

      <main>
        <Hero profileImage={profile_image} socialLinks={socialLinks} />
        <AboutMe />
        <TechStacks techStacks={techStacks} />
        <Interests interests={interests} />
        <Projects projects={projects} />
        <Awards awards={awards} />
        <GitHubStats />
        <Goals goals={goals} />
        <Contact />
      </main>

      <Footer />
    </div>
  );
};

export default App;
