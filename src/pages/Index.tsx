import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { TrendingUp, Target, Users, CheckCircle, Clock, BarChart3 } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Target className="w-6 h-6" />,
      title: "Psychometric Analysis",
      description: "Comprehensive personality and cognitive evaluation"
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Technical Assessment",
      description: "Test your Excel skills and forecasting knowledge"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "WISCAR Framework",
      description: "Evaluate Will, Interest, Skills, Cognitive ability, and more"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Career Matching",
      description: "Get matched with specific forecasting roles"
    }
  ];

  const careerRoles = [
    "Demand Planner",
    "Forecast Analyst", 
    "Supply Chain Analyst",
    "Inventory Optimization Specialist",
    "S&OP Manager"
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-primary/5 to-success/10 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              Professional Career Assessment
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Is This <span className="bg-gradient-to-r from-primary to-success bg-clip-text text-transparent">You?</span>
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-muted-foreground mb-8">
              Readiness Assessment for Becoming a
              <br />
              <span className="text-primary">Forecasting & Demand Planner</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-12">
              A comprehensive diagnostic of mindset, skills & market fit in forecasting careers. 
              Discover if you're ready to enter the critical world of data-driven operations and supply chain management.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button 
                size="lg" 
                variant="hero"
                onClick={() => navigate("/assessment")}
                className="text-lg px-8 py-4"
              >
                Start Assessment
              </Button>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>25-30 minutes</span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">95%</div>
                <p className="text-sm text-muted-foreground">Assessment Accuracy</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">25-30</div>
                <p className="text-sm text-muted-foreground">Minutes to Complete</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">5+</div>
                <p className="text-sm text-muted-foreground">Career Paths Evaluated</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Discover Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              What You'll Discover
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our comprehensive assessment evaluates multiple dimensions to give you a complete picture of your readiness.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-glow transition-all duration-300">
                <CardContent className="p-6">
                  <div className="w-12 h-12 mx-auto mb-4 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                    {feature.icon}
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">{feature.title}</h4>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Career Roles Section */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              Typical Career Paths
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover which forecasting and demand planning roles align with your skills and interests.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {careerRoles.map((role, index) => (
              <div key={index} className="flex items-center space-x-3 bg-card p-4 rounded-lg">
                <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                <span className="font-medium text-foreground">{role}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-foreground mb-4">
            Ready to Discover Your Path?
          </h3>
          <p className="text-lg text-muted-foreground mb-8">
            Take our comprehensive assessment and get personalized recommendations for your forecasting career journey.
          </p>
          <Button 
            size="lg" 
            variant="hero"
            onClick={() => navigate("/assessment")}
            className="text-lg px-8 py-4"
          >
            Start Your Assessment Now
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
