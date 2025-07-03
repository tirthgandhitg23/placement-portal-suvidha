
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Users } from "lucide-react";

const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-primary-dark via-primary-dark to-secondary-blue py-20 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="mb-8">
            <div className="inline-flex items-center space-x-2 bg-accent-yellow/10 border border-accent-yellow/20 rounded-full px-4 py-2 mb-6">
              <Shield className="h-4 w-4 text-accent-yellow" />
              <span className="text-accent-yellow text-sm font-medium">Secure & Reliable</span>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            TPO Management
            <span className="block text-accent-yellow">Made Simple</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            A comprehensive portal for managing Training & Placement Officers across colleges. 
            Streamline your educational partnerships with secure, efficient data management.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-accent-yellow text-primary-dark hover:bg-yellow-400 font-semibold px-8 py-4 text-lg group"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg"
            >
              Learn More
            </Button>
          </div>
          
          <div className="mt-12 flex justify-center items-center space-x-8 text-sm text-gray-400">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-accent-yellow" />
              <span>Trusted by 500+ Colleges</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4 text-accent-yellow" />
              <span>100% Secure</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
