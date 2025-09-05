'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Download, Github, Sparkles, Rocket, Code2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FloatingCard = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div
    animate={{
      y: [0, -10, 0],
      rotate: [0, 1, -1, 0],
    }}
    transition={{
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
      delay,
    }}
  >
    {children}
  </motion.div>
);

export const CTASection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="relative py-32 px-6 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-900/10 to-purple-900/10" />
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
      </div>

      {/* Floating elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10">
          <FloatingCard delay={0}>
            <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-blue-500/20">
              <Code2 className="w-8 h-8 text-blue-400" />
            </div>
          </FloatingCard>
        </div>
        
        <div className="absolute top-40 right-16">
          <FloatingCard delay={1}>
            <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-purple-500/20">
              <Sparkles className="w-6 h-6 text-purple-400" />
            </div>
          </FloatingCard>
        </div>
        
        <div className="absolute bottom-32 left-16">
          <FloatingCard delay={2}>
            <div className="p-4 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-sm border border-cyan-500/20">
              <Rocket className="w-8 h-8 text-cyan-400" />
            </div>
          </FloatingCard>
        </div>
      </div>

      <div ref={ref} className="relative z-10 text-center max-w-6xl mx-auto">
        {/* Main content */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <motion.div 
            className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 text-blue-300 text-sm font-medium backdrop-blur-sm mb-8"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Rocket className="w-4 h-4 mr-2" />
            Ready to launch your next project?
          </motion.div>

          <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
            Start building
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
              {" "}amazing things
            </span>
          </h2>

          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            Get instant access to our production-ready boilerplate. 
            Join thousands of developers who are shipping faster than ever before.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
        >
          <motion.div 
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-xl opacity-50 animate-pulse" />
            <Button size="lg" className="relative bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 px-12 py-8 text-xl font-semibold rounded-full shadow-2xl transition-all duration-300">
              <Download className="w-6 h-6 mr-3" />
              Download Now
              <ArrowRight className="w-6 h-6 ml-3" />
            </Button>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button variant="outline" size="lg" className="border-2 border-gray-500 hover:border-gray-300 text-gray-300 hover:text-white bg-transparent hover:bg-gray-800/50 px-12 py-8 text-xl font-semibold rounded-full backdrop-blur-sm transition-all duration-300">
              <Github className="w-6 h-6 mr-3" />
              View on GitHub
            </Button>
          </motion.div>
        </motion.div>

        {/* Feature highlights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          <motion.div
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
            className="p-6 rounded-2xl bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-xl border border-gray-700/50 text-center"
          >
            <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 mb-4">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Production Ready</h3>
            <p className="text-gray-400 text-sm">Deploy with confidence using battle-tested code</p>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
            className="p-6 rounded-2xl bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-xl border border-gray-700/50 text-center"
          >
            <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 mb-4">
              <div className="flex space-x-1">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" />
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '0.1s' }} />
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '0.2s' }} />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Always Updated</h3>
            <p className="text-gray-400 text-sm">Latest Next.js, React, and modern tooling</p>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
            className="p-6 rounded-2xl bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-xl border border-gray-700/50 text-center"
          >
            <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 mb-4">
              <div className="relative">
                <div className="w-3 h-3 rounded-full bg-purple-500" />
                <div className="absolute inset-0 w-3 h-3 rounded-full bg-purple-500 animate-ping opacity-75" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">24/7 Support</h3>
            <p className="text-gray-400 text-sm">Community support and comprehensive docs</p>
          </motion.div>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-16 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-gray-400 text-sm"
        >
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span>Free forever</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            <span>MIT License</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-purple-500" />
            <span>No vendor lock-in</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};