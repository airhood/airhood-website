import React from 'react';
import Header from './components/layout/Header.tsx';
import Footer from './components/layout/Footer.tsx';
import Hero from './components/sections/Hero.tsx';
import AboutMe from './components/sections/AboutMe.tsx';
import Interests from './components/sections/Interests.tsx';
import TechStacks from './components/sections/TechStacks.tsx';
import { socialLinks, interests, techStacks } from './data/index.ts';
import './styles/globals.css';
import profile_image from './assets/images/Airhood_Fixed.png';

const App: React.FC = () => {
  // 다크모드 초기 설정
  React.useEffect(() => {
    // 시스템 설정이나 사용자 선호도에 따라 다크모드 초기화
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white">
      <Header />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Hero 
          profileImage={profile_image}
          socialLinks={socialLinks}
        />
        
        <div className="section-divider" />
        
        <AboutMe />
        
        <div className="section-divider" />
        
        <Interests interests={interests} />
        
        <div className="section-divider" />
        
        <TechStacks techStacks={techStacks} />
      </main>
      
      <Footer />
    </div>
  );
};

export default App;
