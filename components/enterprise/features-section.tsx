'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  ChartIcon,
  ShieldIcon,
  CodeIcon,
  DatabaseIcon,
  ApiIcon,
  CloudIcon,
  AnalyticsIcon,
  IntegrationIcon,
  ScaleIcon,
  ArrowIcon
} from './icons';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  metrics?: string;
  delay?: number;
}

const FeatureCard = ({ icon, title, description, metrics, delay = 0 }: FeatureCardProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className="group relative"
    >
      <div className="h-full p-8 rounded-2xl bg-zinc-900/30 border border-zinc-800/50 hover:border-zinc-700/70 backdrop-blur-sm transition-all duration-300 group-hover:bg-zinc-900/50">
        {/* Icon */}
        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-zinc-800/50 border border-zinc-700/50 mb-6 group-hover:bg-zinc-800/70 transition-colors duration-300">
          <div className="text-zinc-300 group-hover:text-white transition-colors duration-300">
            {icon}
          </div>
        </div>

        {/* Content */}
        <h3 className="text-xl font-semibold text-white mb-3 tracking-tight">
          {title}
        </h3>
        
        <p className="text-zinc-400 leading-relaxed mb-4 text-sm">
          {description}
        </p>

        {/* Metrics */}
        {metrics && (
          <div className="text-xs text-zinc-500 font-medium mb-4 uppercase tracking-wider">
            {metrics}
          </div>
        )}

        {/* Learn more link */}
        <div className="flex items-center text-zinc-500 hover:text-zinc-300 transition-colors duration-300 cursor-pointer group/link">
          <span className="text-sm font-medium">Learn more</span>
          <ArrowIcon className="w-3 h-3 ml-2 group-hover/link:translate-x-1 transition-transform duration-200" />
        </div>
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
      icon: <ChartIcon className="w-6 h-6" />,
      title: "Performance Analytics",
      description: "Real-time monitoring with detailed performance metrics and automated alerting for optimal system health.",
      metrics: "99.9% Uptime",
    },
    {
      icon: <ShieldIcon className="w-6 h-6" />,
      title: "Enterprise Security",
      description: "Multi-layered security architecture with OAuth 2.0, JWT tokens, and industry-standard encryption protocols.",
      metrics: "SOC 2 Compliant",
    },
    {
      icon: <CodeIcon className="w-6 h-6" />,
      title: "Developer Tools",
      description: "Comprehensive TypeScript support, automated testing, and integrated development workflows for maximum productivity.",
      metrics: "100% Type Safe",
    },
    {
      icon: <DatabaseIcon className="w-6 h-6" />,
      title: "Database Management",
      description: "Prisma ORM with automated migrations, connection pooling, and optimized query performance for scale.",
      metrics: "1M+ Queries/day",
    },
    {
      icon: <ApiIcon className="w-6 h-6" />,
      title: "API Architecture",
      description: "RESTful and GraphQL endpoints with automatic documentation, rate limiting, and comprehensive error handling.",
      metrics: "< 100ms Response",
    },
    {
      icon: <CloudIcon className="w-6 h-6" />,
      title: "Cloud Infrastructure",
      description: "Multi-region deployment with auto-scaling, load balancing, and disaster recovery capabilities built-in.",
      metrics: "Global CDN",
    },
    {
      icon: <AnalyticsIcon className="w-6 h-6" />,
      title: "Business Intelligence",
      description: "Advanced analytics dashboard with custom reporting, data visualization, and predictive insights.",
      metrics: "Real-time Data",
    },
    {
      icon: <IntegrationIcon className="w-6 h-6" />,
      title: "Third-party Integration",
      description: "Pre-built connectors for popular services with webhook support and automated data synchronization.",
      metrics: "50+ Integrations",
    },
    {
      icon: <ScaleIcon className="w-6 h-6" />,
      title: "Enterprise Scale",
      description: "Horizontal scaling capabilities with microservices architecture and containerized deployment options.",
      metrics: "Auto-scaling",
    },
  ];

  return (
    <section className="relative py-24 px-6">
      {/* Section Header */}
      <div ref={titleRef} className="text-center mb-16 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center px-4 py-2 rounded-lg bg-zinc-900/50 border border-zinc-800/50 text-zinc-300 text-sm font-medium backdrop-blur-sm mb-8"
        >
          <div className="w-2 h-2 rounded-full bg-emerald-400 mr-2" />
          Platform Features
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight"
        >
          Built for
          <span className="text-zinc-400"> enterprise</span>
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-xl text-zinc-400 leading-relaxed font-light"
        >
          Every component designed with enterprise requirements in mind. 
          Security, scalability, and reliability as core principles.
        </motion.p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {features.map((feature, index) => (
          <FeatureCard
            key={feature.title}
            {...feature}
            delay={index * 0.1}
          />
        ))}
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={titleInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="text-center mt-16"
      >
        <div className="inline-flex items-center text-zinc-400 hover:text-zinc-300 transition-colors duration-300 cursor-pointer group">
          <span className="text-sm font-medium">View all features</span>
          <ArrowIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
        </div>
      </motion.div>
    </section>
  );
};