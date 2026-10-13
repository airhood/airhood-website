import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import Header from './components/layout/Header.tsx';
import Footer from './components/layout/Footer.tsx';
import BuildStrip from './components/layout/BuildStrip.tsx';
import Home from './pages/Home.tsx';
import Projects from './pages/Projects.tsx';
import ProjectDetail from './pages/ProjectDetail.tsx';
import { pageTransition } from './lib/motion.ts';
import './styles/globals.css';

const AnimatedRoutes: React.FC = () => {
  const location = useLocation();

  return (
    // 스크롤 초기화는 이전 페이지가 완전히 사라진 뒤에 — 사라지는 중에 위로 튀면 순간이동처럼 보인다
    <AnimatePresence
      mode="wait"
      onExitComplete={() => {
        if (!window.location.hash) window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
      }}
    >
      <motion.div
        key={location.pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageTransition}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-ink text-text flex flex-col">
        <Header />

        <main className="flex-1">
          <AnimatedRoutes />
        </main>

        <Footer />
        <BuildStrip />
      </div>
    </BrowserRouter>
  );
};

export default App;
