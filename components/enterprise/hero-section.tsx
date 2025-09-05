'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

import { Button } from '@/components/ui/button';
import { ArrowIcon, CheckIcon } from './icons';

export const HeroSection = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
    rootMargin: '-50px 0px',
  });

  const trustIndicators = [
    'Enterprise-grade security',
    'SOC 2 Type II compliant',
    '99.9% uptime SLA'
  ];

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_79px,rgba(255,255,255,0.03)_81px,rgba(255,255,255,0.03)_82px,transparent_84px)] bg-[length:84px_84px]" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_79px,rgba(255,255,255,0.03)_81px,rgba(255,255,255,0.03)_82px,transparent_84px)] bg-[length:84px_84px]" />
      </div>

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 text-center px-6 max-w-7xl mx-auto"
      >
        {/* Trust badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ 
            duration: 0.5, 
            ease: [0.25, 0.46, 0.45, 0.94],
            type: "tween"
          }}
          className="mb-8"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-lg bg-zinc-900/50 border border-zinc-800/50 text-zinc-300 text-sm font-medium backdrop-blur-sm">
            <div className="w-2 h-2 rounded-full bg-emerald-500 mr-2" />
            Trusted by Fortune 500 companies
          </div>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ 
            duration: 0.6, 
            delay: 0.1, 
            ease: [0.25, 0.46, 0.45, 0.94],
            type: "tween"
          }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-[0.9] tracking-tight"
        >
          <span className="text-white">
            Enterprise
          </span>
          <br />
          <span className="text-zinc-400">
            Ready
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ 
            duration: 0.5, 
            delay: 0.2, 
            ease: [0.25, 0.46, 0.45, 0.94],
            type: "tween"
          }}
          className="text-xl md:text-2xl text-zinc-400 mb-8 max-w-4xl mx-auto leading-relaxed font-light"
        >
          Production-ready Next.js boilerplate engineered for scale. 
          Built with enterprise-grade security, performance, and reliability standards.
        </motion.p>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ 
            duration: 0.5, 
            delay: 0.3, 
            ease: [0.25, 0.46, 0.45, 0.94],
            type: "tween"
          }}
          className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-8 mb-12 text-sm text-zinc-500"
        >
          {trustIndicators.map((indicator, index) => (
            <motion.div 
              key={index} 
              className="flex items-center"
              initial={{ opacity: 0, x: -10 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ 
                duration: 0.4, 
                delay: 0.3 + (index * 0.05),
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
            >
              <CheckIcon className="w-4 h-4 text-emerald-400 mr-2 flex-shrink-0" />
              {indicator}
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ 
            duration: 0.5, 
            delay: 0.4, 
            ease: [0.25, 0.46, 0.45, 0.94],
            type: "tween"
          }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
        >
          <motion.div 
            whileHover={{ scale: 1.02 }} 
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="relative group"
          >
            <Button 
              size="lg" 
              className="bg-white hover:bg-zinc-100 text-zinc-900 border-0 px-8 py-6 text-lg font-semibold rounded-lg shadow-lg transition-all duration-300 group-hover:shadow-xl"
            >
              Start Building
              <ArrowIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
            </Button>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.02 }} 
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Button 
              variant="outline" 
              size="lg" 
              className="border border-zinc-700 hover:border-zinc-600 text-zinc-300 hover:text-white bg-transparent hover:bg-zinc-800/50 px-8 py-6 text-lg font-semibold rounded-lg backdrop-blur-sm transition-all duration-300"
            >
              View Documentation
            </Button>
          </motion.div>
        </motion.div>

        {/* Metrics */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto text-center"
        >
          {[
            { number: "50K+", label: "Developers" },
            { number: "1M+", label: "API Requests/day" },
            { number: "99.9%", label: "Uptime" }
          ].map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ 
                duration: 0.4, 
                delay: 0.5 + (index * 0.05),
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
            >
              <div className="text-2xl font-bold text-white mb-1">{metric.number}</div>
              <div className="text-sm text-zinc-500 font-medium">{metric.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ 
            duration: 0.4, 
            delay: 0.7,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="cursor-pointer p-2"
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
          >
            <ChevronDown className="w-6 h-6 text-zinc-600 hover:text-zinc-400 transition-colors duration-300" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};