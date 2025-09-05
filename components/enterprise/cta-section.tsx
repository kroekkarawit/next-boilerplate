'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Button } from '@/components/ui/button';
import { ArrowIcon, CheckIcon } from './icons';

export const CTASection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const enterpriseFeatures = [
    'Enterprise-grade security',
    'Dedicated support team',
    'SLA guarantees',
    'Custom integrations'
  ];

  const trustIndicators = [
    { label: 'SOC 2 Type II', status: 'Certified' },
    { label: 'GDPR', status: 'Compliant' },
    { label: 'ISO 27001', status: 'Certified' },
    { label: 'HIPAA', status: 'Ready' }
  ];

  return (
    <section className="relative py-24 px-6">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.015]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[length:32px_32px]" />
      </div>

      <div ref={ref} className="relative z-10 text-center max-w-6xl mx-auto">
        {/* Main content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-lg bg-zinc-900/50 border border-zinc-800/50 text-zinc-300 text-sm font-medium backdrop-blur-sm mb-8">
            <div className="w-2 h-2 rounded-full bg-emerald-400 mr-2" />
            Ready to get started?
          </div>

          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight tracking-tight">
            Scale with
            <span className="text-zinc-400"> confidence</span>
          </h2>

          <p className="text-xl text-zinc-400 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
            Join hundreds of enterprise teams who trust our platform 
            to deliver mission-critical applications at scale.
          </p>
        </motion.div>

        {/* Enterprise features grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
        >
          {enterpriseFeatures.map((feature, index) => (
            <motion.div
              key={feature}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="flex items-center justify-center p-4 rounded-xl bg-zinc-900/30 border border-zinc-800/50 backdrop-blur-sm"
            >
              <CheckIcon className="w-4 h-4 text-emerald-400 mr-2 flex-shrink-0" />
              <span className="text-sm text-zinc-300 font-medium">{feature}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
        >
          <motion.div 
            whileHover={{ scale: 1.02 }} 
            whileTap={{ scale: 0.98 }}
            className="relative group"
          >
            <Button 
              size="lg" 
              className="bg-white hover:bg-zinc-100 text-zinc-900 border-0 px-10 py-6 text-lg font-semibold rounded-lg shadow-lg transition-all duration-300"
            >
              Start Free Trial
              <ArrowIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
            </Button>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.02 }} 
            whileTap={{ scale: 0.98 }}
          >
            <Button 
              variant="outline" 
              size="lg" 
              className="border border-zinc-700 hover:border-zinc-600 text-zinc-300 hover:text-white bg-transparent hover:bg-zinc-800/50 px-10 py-6 text-lg font-semibold rounded-lg backdrop-blur-sm transition-all duration-300"
            >
              Schedule Demo
            </Button>
          </motion.div>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto mb-12"
        >
          {trustIndicators.map((indicator, index) => (
            <div key={indicator.label} className="text-center">
              <div className="text-xs text-zinc-500 font-medium uppercase tracking-wider mb-1">
                {indicator.label}
              </div>
              <div className="text-sm text-zinc-300 font-semibold">
                {indicator.status}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Contact info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center border-t border-zinc-800/50 pt-8"
        >
          <p className="text-sm text-zinc-500 mb-4">
            Need a custom solution? Our enterprise team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-8 text-sm text-zinc-400">
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-emerald-400 mr-2" />
              <span>24/7 Enterprise Support</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-blue-400 mr-2" />
              <span>99.9% SLA Guarantee</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-purple-400 mr-2" />
              <span>Dedicated Success Manager</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};