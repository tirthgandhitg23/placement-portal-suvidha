
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Users, Search, Database, Lock, Smartphone } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Shield,
      title: "Secure Authentication",
      description: "JWT-based authentication system with encrypted passwords and session management for maximum security."
    },
    {
      icon: Users,
      title: "TPO Management",
      description: "Comprehensive dashboard to manage Training & Placement Officers from multiple colleges in one place."
    },
    {
      icon: Search,
      title: "Advanced Search",
      description: "Powerful search and filter functionality to quickly find TPO records by name, college, or email."
    },
    {
      icon: Database,
      title: "MySQL Database",
      description: "Robust MySQL database with proper indexing and real-time data synchronization capabilities."
    },
    {
      icon: Lock,
      title: "Data Protection",
      description: "SQL injection prevention, input validation, and encrypted data storage for complete data security."
    },
    {
      icon: Smartphone,
      title: "Responsive Design",
      description: "Mobile-first responsive design that works seamlessly across all devices and screen sizes."
    }
  ];

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-dark mb-4">
            Powerful Features
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to manage TPO data efficiently and securely
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card 
                key={index} 
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white"
              >
                <CardHeader>
                  <div className="bg-accent-yellow/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <IconComponent className="h-6 w-6 text-accent-yellow" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-primary-dark">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
