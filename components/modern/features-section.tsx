'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Zap, 
  Shield, 
  Palette, 
  Code, 
  Smartphone, 
  Globe,
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
  accentColor: string;
}

const FeatureCard = ({ icon, title, description, delay = 0, accentColor }: FeatureCardProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      whileHover={{ 
        y: -10,
        transition: { duration: 0.2 }
      }}
      className="group relative"
    >
      <div className="relative h-full p-8 rounded-3xl bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-xl border border-gray-700/50 hover:border-gray-600/70 transition-all duration-300">
        {/* Glow effect on hover */}
        <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${accentColor} opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl`} />
        
        {/* Icon */}
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
          className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${accentColor} mb-6`}
        >
          <div className="text-white">
            {icon}
          </div>
        </motion.div>

        {/* Content */}
        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-100 transition-colors duration-300">
          {title}
        </h3>
        
        <p className="text-gray-300 leading-relaxed mb-6">
          {description}
        </p>

        {/* Learn more link */}
        <motion.div
          className="flex items-center text-blue-400 hover:text-blue-300 transition-colors duration-300 cursor-pointer"
          whileHover={{ x: 5 }}
        >
          <span className="text-sm font-medium">Learn more</span>
          <ArrowRight className="w-4 h-4 ml-2" />
        </motion.div>
      </div>
    </motion.div>
  );
};

const StatCard = ({ number, label, delay = 0 }: { number: string; label: string; delay?: number }) => {
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
      className="text-center"
    >
      <motion.div
        className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay }}
      >
        {number}
      </motion.div>
      <div className="text-gray-400 text-sm uppercase tracking-wide font-medium">
        {label}
      </div>
    </motion.div>
  );
};

export const FeaturesSection = () => {
  const [titleRef, titleInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning Performance",
      description: "Built with Next.js 15 and optimized for maximum speed. Experience blazing-fast load times and smooth interactions.",
      accentColor: "from-yellow-500 to-orange-500",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Enterprise Security",
      description: "Bank-grade security with authentication, encryption, and compliance features built-in from day one.",
      accentColor: "from-green-500 to-emerald-500",
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Modern Design System",
      description: "Beautiful, accessible components with Tailwind CSS and Radix UI. Consistent design language across all platforms.",
      accentColor: "from-pink-500 to-rose-500",
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: "Developer Experience",
      description: "TypeScript, ESLint, Prettier, and hot reloading. Everything you need for productive development.",
      accentColor: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Mobile First",
      description: "Responsive design that looks perfect on every device. Progressive Web App features included.",
      accentColor: "from-purple-500 to-violet-500",
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Global Ready",
      description: "Internationalization support with multiple languages, currencies, and regional settings out of the box.",
      accentColor: "from-indigo-500 to-blue-500",
    },
  ];

  return (
    <section className="relative py-32 px-6">
      {/* Section Header */}
      <div ref={titleRef} className="text-center mb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 text-blue-300 text-sm font-medium backdrop-blur-sm mb-6"
        >
          <Sparkles className="w-4 h-4 mr-2" />
          Features & Benefits
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl md:text-6xl font-bold text-white mb-6"
        >
          Everything you need to
          <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"> succeed</span>
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
        >
          A comprehensive boilerplate that accelerates your development with modern tools, 
          best practices, and production-ready features.
        </motion.p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20 max-w-4xl mx-auto">
        <StatCard number="99.9%" label="Uptime" delay={0} />
        <StatCard number="< 1s" label="Load Time" delay={0.1} />
        <StatCard number="100%" label="Responsive" delay={0.2} />
        <StatCard number="A+" label="Performance" delay={0.3} />
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {features.map((feature, index) => (
          <FeatureCard
            key={feature.title}
            {...feature}
            delay={index * 0.1}
          />
        ))}
      </div>

      {/* Background decoration */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl" />
    </section>
  );
};