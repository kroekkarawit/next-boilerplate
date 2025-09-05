'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, Sparkles, Zap, Rocket } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { useInView } from 'react-intersection-observer';

const FloatingElement = ({ children, delay = 0, duration = 2 }: { children: React.ReactNode, delay?: number, duration?: number }) => (
  <motion.div
    animate={{
      y: [0, -10, 0],
      rotate: [0, 1, -1, 0],
    }}
    transition={{
      duration,
      repeat: Infinity,
      ease: "easeInOut",
      delay,
    }}
  >
    {children}
  </motion.div>
);

const GlowingOrb = ({ size = 100, color = "blue", delay = 0 }: { size?: number, color?: string, delay?: number }) => (
  <motion.div
    className={`absolute rounded-full blur-xl opacity-20`}
    style={{
      width: size,
      height: size,
      background: `linear-gradient(45deg, ${color === 'blue' ? '#3b82f6, #8b5cf6' : color === 'purple' ? '#8b5cf6, #ec4899' : '#06b6d4, #3b82f6'})`,
    }}
    animate={{
      scale: [1, 1.2, 1],
      opacity: [0.2, 0.4, 0.2],
    }}
    transition={{
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
      delay,
    }}
  />
);

export const HeroSection = () => {
  const { t } = useTranslation();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, -150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <GlowingOrb size={200} color="blue" delay={0} />
        <GlowingOrb size={150} color="purple" delay={1} />
        <GlowingOrb size={120} color="cyan" delay={2} />
        
        {/* Floating icons */}
        <div className="absolute top-20 left-20">
          <FloatingElement delay={0} duration={3}>
            <Sparkles className="w-8 h-8 text-blue-400 opacity-60" />
          </FloatingElement>
        </div>
        <div className="absolute top-40 right-32">
          <FloatingElement delay={1} duration={2.5}>
            <Zap className="w-6 h-6 text-purple-400 opacity-60" />
          </FloatingElement>
        </div>
        <div className="absolute bottom-40 left-16">
          <FloatingElement delay={2} duration={2.8}>
            <Rocket className="w-7 h-7 text-cyan-400 opacity-60" />
          </FloatingElement>
        </div>
      </div>

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 text-center px-6 max-w-6xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-6"
        >
          <motion.span 
            className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 text-blue-300 text-sm font-medium backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            ✨ Next.js 15 Boilerplate 2025
          </motion.span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight"
        >
          <span className="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
            Build the
          </span>
          <br />
          <motion.span
            className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent"
            animate={{ backgroundPosition: ['0%', '100%', '0%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            style={{ backgroundSize: '200%' }}
          >
            Future
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed"
        >
          Experience the next generation of web development with cutting-edge animations, 
          modern design patterns, and seamless user interactions.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 px-8 py-6 text-lg font-semibold rounded-full shadow-2xl hover:shadow-blue-500/25 transition-all duration-300">
              <Rocket className="w-5 h-5 mr-2" />
              Get Started
            </Button>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="outline" size="lg" className="border-2 border-gray-600 hover:border-gray-400 text-gray-300 hover:text-white bg-transparent hover:bg-gray-800/50 px-8 py-6 text-lg font-semibold rounded-full backdrop-blur-sm transition-all duration-300">
              <Sparkles className="w-5 h-5 mr-2" />
              View Demo
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="cursor-pointer"
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
          >
            <ChevronDown className="w-8 h-8 text-gray-400 hover:text-white transition-colors duration-300 mx-auto" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 pointer-events-none" />
    </section>
  );
};