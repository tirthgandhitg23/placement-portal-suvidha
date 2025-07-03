
import { Card, CardContent } from "@/components/ui/card";
import { Building2, Users, GraduationCap, Award } from "lucide-react";

const Stats = () => {
  const stats = [
    {
      icon: Building2,
      value: "500+",
      label: "Partner Colleges",
      description: "Educational institutions connected"
    },
    {
      icon: Users,
      value: "1,200+",
      label: "TPO Records",
      description: "Training & placement officers managed"
    },
    {
      icon: GraduationCap,
      value: "50,000+",
      label: "Students Served",
      description: "Through our partner network"
    },
    {
      icon: Award,
      value: "99.9%",
      label: "Uptime",
      description: "Reliable service availability"
    }
  ];

  return (
    <section className="py-20 bg-primary-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Trusted by Educational Leaders
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Join thousands of educational institutions who trust our platform for their TPO management needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card key={index} className="bg-white/5 backdrop-blur-sm border-white/10 text-center hover:bg-white/10 transition-all duration-300">
                <CardContent className="p-8">
                  <div className="bg-accent-yellow/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="h-8 w-8 text-accent-yellow" />
                  </div>
                  <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-lg font-semibold text-accent-yellow mb-2">{stat.label}</div>
                  <div className="text-sm text-gray-300">{stat.description}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Stats;
