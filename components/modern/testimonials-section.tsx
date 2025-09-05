'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, Users, Award, TrendingUp } from 'lucide-react';
import Image from 'next/image';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar: string;
  companyLogo?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Lead Developer",
    company: "TechCorp",
    content: "This boilerplate saved us months of development time. The code quality is exceptional and the documentation is crystal clear. Our team was able to ship our MVP in record time.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b2b3?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "CTO",
    company: "StartupXYZ",
    content: "The performance optimizations and security features are top-notch. We've built three products using this boilerplate and couldn't be happier with the results.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Full Stack Developer",
    company: "InnovateNow",
    content: "The developer experience is amazing. Hot reloading, TypeScript support, and the component library made our workflow incredibly smooth. Highly recommended!",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 4,
    name: "David Kim",
    role: "Product Manager",
    company: "DigitalFlow",
    content: "From concept to production in weeks, not months. The authentication system and API integration saved us countless hours. This is how modern development should be.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
  },
];

const TestimonialCard = ({ testimonial, isActive }: { testimonial: Testimonial; isActive: boolean }) => (
  <motion.div
    className={`flex-shrink-0 w-full md:w-96 mx-4 ${isActive ? 'opacity-100' : 'opacity-50'}`}
    animate={{ scale: isActive ? 1 : 0.9 }}
    transition={{ duration: 0.3 }}
  >
    <div className="relative p-8 h-full bg-gradient-to-br from-gray-900/60 to-gray-800/40 backdrop-blur-xl rounded-2xl border border-gray-700/50">
      {/* Quote icon */}
      <Quote className="absolute top-6 right-6 w-8 h-8 text-blue-400/30" />
      
      {/* Rating */}
      <div className="flex space-x-1 mb-6">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
        ))}
      </div>
      
      {/* Content */}
      <p className="text-gray-300 text-lg leading-relaxed mb-8 font-medium">
        "{testimonial.content}"
      </p>
      
      {/* Author */}
      <div className="flex items-center space-x-4">
        <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-blue-400/30">
          <Image
            src={testimonial.avatar}
            alt={testimonial.name}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h4 className="text-white font-semibold">{testimonial.name}</h4>
          <p className="text-gray-400 text-sm">{testimonial.role} at {testimonial.company}</p>
        </div>
      </div>
    </div>
  </motion.div>
);

const StatCard = ({ icon, number, label, delay = 0 }: { 
  icon: React.ReactNode; 
  number: string; 
  label: string; 
  delay?: number;
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, delay }}
      className="text-center p-6 rounded-2xl bg-gradient-to-br from-gray-900/40 to-gray-800/20 backdrop-blur-sm border border-gray-700/30"
    >
      <motion.div
        className="inline-flex p-3 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 mb-4"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="text-white">{icon}</div>
      </motion.div>
      
      <motion.div
        className="text-3xl md:text-4xl font-bold text-white mb-2"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay }}
      >
        {number}
      </motion.div>
      
      <div className="text-gray-400 font-medium">{label}</div>
    </motion.div>
  );
};

export const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="relative py-32 px-6 overflow-hidden">
      {/* Social Proof Stats */}
      <div className="text-center mb-20">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/30 text-green-300 text-sm font-medium backdrop-blur-sm mb-8"
        >
          <Users className="w-4 h-4 mr-2" />
          Trusted by 10,000+ developers
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl md:text-6xl font-bold text-white mb-6"
        >
          Loved by developers
          <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent"> worldwide</span>
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
        >
          Join thousands of developers who have shipped faster and better with our boilerplate.
        </motion.p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-20">
        <StatCard 
          icon={<Users className="w-6 h-6" />}
          number="10K+"
          label="Active Users"
          delay={0}
        />
        <StatCard 
          icon={<Award className="w-6 h-6" />}
          number="98%"
          label="Satisfaction Rate"
          delay={0.1}
        />
        <StatCard 
          icon={<TrendingUp className="w-6 h-6" />}
          number="5x"
          label="Faster Development"
          delay={0.2}
        />
      </div>

      {/* Testimonials Carousel */}
      <div className="relative max-w-6xl mx-auto">
        <div className="flex items-center justify-center">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={prevTestimonial}
            className="absolute left-0 z-10 p-3 rounded-full bg-gray-800/80 backdrop-blur-sm border border-gray-600/50 text-white hover:bg-gray-700/80 transition-colors duration-300"
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>

          <div className="overflow-hidden mx-16">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
                className="flex justify-center"
              >
                <TestimonialCard 
                  testimonial={testimonials[currentIndex]} 
                  isActive={true}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={nextTestimonial}
            className="absolute right-0 z-10 p-3 rounded-full bg-gray-800/80 backdrop-blur-sm border border-gray-600/50 text-white hover:bg-gray-700/80 transition-colors duration-300"
          >
            <ChevronRight className="w-6 h-6" />
          </motion.button>
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center space-x-2 mt-8">
          {testimonials.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                index === currentIndex ? 'bg-blue-500' : 'bg-gray-600'
              }`}
              whileHover={{ scale: 1.2 }}
            />
          ))}
        </div>
      </div>

      {/* Background decorations */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-green-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl" />
    </section>
  );
};