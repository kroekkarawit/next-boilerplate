'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { StarIcon, ArrowIcon } from './icons';
import Image from 'next/image';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
  companyLogo?: string;
  metrics?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "David Chen",
    role: "CTO",
    company: "TechCorp Inc.",
    content: "This platform reduced our development cycle from 6 months to 6 weeks. The enterprise-grade architecture and security features gave us confidence to scale rapidly while maintaining compliance standards.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    metrics: "600% faster deployment",
  },
  {
    id: 2,
    name: "Sarah Mitchell",
    role: "VP Engineering",
    company: "Global Solutions",
    content: "The comprehensive monitoring and analytics capabilities have been game-changing. We've reduced system downtime by 95% and improved our team's productivity significantly through the integrated development workflows.",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b2b3?w=150&h=150&fit=crop&crop=face",
    metrics: "95% downtime reduction",
  },
  {
    id: 3,
    name: "Marcus Rodriguez",
    role: "Lead Architect",
    company: "Enterprise Systems",
    content: "The modular architecture and pre-built integrations allowed us to focus on business logic rather than infrastructure. Our time-to-market improved dramatically while maintaining enterprise security standards.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    metrics: "3x faster time-to-market",
  },
];

const companies = [
  "TechCorp", "Global Solutions", "Enterprise Systems", "Innovation Labs", "Scale Industries"
];

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => (
  <div className="flex-shrink-0 w-full max-w-4xl mx-auto">
    <div className="p-8 md:p-12 rounded-2xl bg-zinc-900/30 border border-zinc-800/50 backdrop-blur-sm">
      {/* Quote content */}
      <blockquote className="text-xl md:text-2xl text-zinc-200 leading-relaxed mb-8 font-light">
        "{testimonial.content}"
      </blockquote>
      
      {/* Author info */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center space-x-4">
          <div className="relative w-14 h-14 rounded-xl overflow-hidden border border-zinc-700/50">
            <Image
              src={testimonial.avatar}
              alt={testimonial.name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h4 className="text-white font-semibold text-lg">{testimonial.name}</h4>
            <p className="text-zinc-400 text-sm">{testimonial.role}, {testimonial.company}</p>
          </div>
        </div>
        
        {/* Metrics */}
        {testimonial.metrics && (
          <div className="px-4 py-2 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
            <span className="text-emerald-400 font-semibold text-sm">{testimonial.metrics}</span>
          </div>
        )}
      </div>
    </div>
  </div>
);

export const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    
    return () => clearInterval(interval);
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="relative py-24 px-6">
      {/* Section header */}
      <div className="text-center mb-16 max-w-4xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center px-4 py-2 rounded-lg bg-zinc-900/50 border border-zinc-800/50 text-zinc-300 text-sm font-medium backdrop-blur-sm mb-8"
        >
          <StarIcon className="w-4 h-4 text-yellow-500 mr-2" />
          Customer Success
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight"
        >
          Trusted by
          <span className="text-zinc-400"> industry leaders</span>
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-xl text-zinc-400 leading-relaxed font-light"
        >
          See how enterprise teams are accelerating their development 
          and achieving measurable business outcomes.
        </motion.p>
      </div>

      {/* Company logos */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="flex flex-wrap items-center justify-center gap-8 mb-16 opacity-50"
      >
        {companies.map((company, index) => (
          <div key={index} className="text-zinc-600 font-semibold text-sm tracking-wider uppercase">
            {company}
          </div>
        ))}
      </motion.div>

      {/* Testimonials carousel */}
      <div className="relative max-w-6xl mx-auto">
        <div className="flex items-center justify-center">
          <button
            onClick={prevTestimonial}
            className="absolute left-0 z-10 p-3 rounded-xl bg-zinc-800/50 border border-zinc-700/50 text-zinc-300 hover:bg-zinc-800/70 hover:text-white transition-all duration-300 backdrop-blur-sm"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="overflow-hidden mx-16 w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <TestimonialCard testimonial={testimonials[currentIndex]} />
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            onClick={nextTestimonial}
            className="absolute right-0 z-10 p-3 rounded-xl bg-zinc-800/50 border border-zinc-700/50 text-zinc-300 hover:bg-zinc-800/70 hover:text-white transition-all duration-300 backdrop-blur-sm"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center space-x-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-white w-8' 
                  : 'bg-zinc-600 hover:bg-zinc-500'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Bottom stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-4xl mx-auto mt-16 pt-8 border-t border-zinc-800/50"
      >
        <div className="text-center">
          <div className="text-2xl font-bold text-white mb-1">500+</div>
          <div className="text-sm text-zinc-500 font-medium">Enterprise Clients</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-white mb-1">99.9%</div>
          <div className="text-sm text-zinc-500 font-medium">Customer Satisfaction</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-white mb-1">5x</div>
          <div className="text-sm text-zinc-500 font-medium">Development Speed</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-white mb-1">24/7</div>
          <div className="text-sm text-zinc-500 font-medium">Enterprise Support</div>
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 1 }}
        className="text-center mt-12"
      >
        <div className="inline-flex items-center text-zinc-400 hover:text-zinc-300 transition-colors duration-300 cursor-pointer group">
          <span className="text-sm font-medium">Read more case studies</span>
          <ArrowIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
        </div>
      </motion.div>
    </section>
  );
};