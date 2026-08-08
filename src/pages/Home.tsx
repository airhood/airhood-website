import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/sections/Hero.tsx';
import AboutMe from '../components/sections/AboutMe.tsx';
import Interests from '../components/sections/Interests.tsx';
import TechStacks from '../components/sections/TechStacks.tsx';
import Projects from '../components/sections/Projects.tsx';
import GitHubStats from '../components/sections/GitHubStats.tsx';
import Goals from '../components/sections/Goals.tsx';
import Contact from '../components/sections/Contact.tsx';
import { socialLinks, interests, techStacks, projects, goals } from '../data/index.ts';

const Home: React.FC = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const id = setTimeout(() => {
      document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
    return () => clearTimeout(id);
  }, [hash]);

  return (
    <>
      <Hero socialLinks={socialLinks} />
      <AboutMe />
      <TechStacks techStacks={techStacks} />
      <Interests interests={interests} />
      <Projects projects={projects} />
      <GitHubStats />
      <Goals goals={goals} />
      <Contact />
    </>
  );
};

export default Home;
