import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { SocialLink as SocialLinkType } from '../../types/index.ts';
import { EASE } from '../../lib/motion.ts';

interface HeroProps {
  socialLinks: SocialLinkType[];
}

const item = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const Hero: React.FC<HeroProps> = ({ socialLinks }) => {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      <motion.div
        style={reduceMotion ? undefined : { y: contentY, opacity: contentOpacity }}
        initial={reduceMotion ? undefined : 'hidden'}
        animate={reduceMotion ? undefined : 'visible'}
        variants={{ visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } } }}
        className="max-w-content mx-auto px-6 sm:px-10 md:px-16 lg:px-24 w-full"
      >
        <motion.p variants={item} className="font-signal text-sm text-signal mb-5 tracking-wide">
          Hello, World! 👋
        </motion.p>

        <motion.h1
          variants={item}
          className="font-display text-7xl sm:text-8xl md:text-9xl font-black text-text leading-[0.9] mb-7 tracking-tight"
        >
          Airhood
        </motion.h1>

        <motion.p variants={item} className="text-lg text-muted max-w-md mb-10 leading-relaxed">
          Developer passionate about{' '}
          <span className="text-text font-semibold">AI</span>,{' '}
          <span className="text-text font-semibold">Robotics</span>,{' '}
          and exploring the depths of software.
        </motion.p>

        <motion.div variants={item} className="flex flex-wrap gap-2.5">
          {socialLinks.map((link, i) => {
            const Icon = link.icon;
            return (
              <a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                title={link.platform}
                className="w-10 h-10 rounded-card flex items-center justify-center bg-surface border border-line text-muted hover:text-signal hover:border-signal/50 transition-colors duration-200"
              >
                {Icon && <Icon className="text-base" />}
              </a>
            );
          })}
        </motion.div>
      </motion.div>

      <motion.div
        style={reduceMotion ? undefined : { opacity: scrollHintOpacity }}
        className="absolute bottom-10 left-0 right-0 flex flex-col items-center gap-2"
      >
        <span className="font-signal text-[11px] text-muted tracking-[0.2em]">SCROLL</span>
        <div className="w-px h-10 bg-gradient-to-b from-muted to-transparent" />
      </motion.div>
    </section>
  );
};

export default Hero;
