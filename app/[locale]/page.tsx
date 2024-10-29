import React from "react";
import { useTranslations } from "next-intl";
import { ArrowDown, Star, Zap, Shield } from "lucide-react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
}) => (
  <div className="bg-blue-50 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
    <div className="text-blue-600 mb-4">{icon}</div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p>{description}</p>
  </div>
);

const LandingPage: React.FC = () => {
  const homeI18n = useTranslations("home");

  return (
    <div className="bg-gradient-to-b from-blue-600 to-blue-800 text-white min-h-screen">
      <section className="h-screen flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          {homeI18n("title")}
        </h1>
        <p className="text-xl mb-8 max-w-2xl">
          Streamline your workflow, boost productivity, and achieve your goals
          with our cutting-edge solution.
        </p>
        <button className="bg-white text-blue-600 font-bold py-3 px-6 rounded-full hover:bg-blue-100 transition duration-300">
          Get Started
        </button>
        <ArrowDown className="mt-12 animate-bounce" size={32} />
      </section>

      <section className="py-16 px-8 bg-white text-blue-800" id="features">
        <h2 className="text-4xl font-bold text-center mb-12">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <FeatureCard
            description="Our user-friendly interface ensures a smooth experience for all users."
            icon={<Star size={32} />}
            title="Intuitive Design"
          />
          <FeatureCard
            description="Optimized performance to save you time and increase productivity."
            icon={<Zap size={32} />}
            title="Lightning Fast"
          />
          <FeatureCard
            description="Your data is protected with industry-leading security measures."
            icon={<Shield size={32} />}
            title="Secure & Reliable"
          />
        </div>
      </section>

      <footer className="bg-blue-900 text-white py-8 px-4 text-center">
        <p>&copy; 2024 MyApp. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
