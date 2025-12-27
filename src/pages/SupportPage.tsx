import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Phone, MessageCircle, Users, Heart, Shield, DollarSign, Car, Utensils } from "lucide-react";

const SupportPage = () => {
  const navigate = useNavigate();

  const supportServices = [
    {
      icon: Phone,
      title: "24/7 Helpline",
      description: "Speak with trained counselors anytime, day or night",
      action: "Call Now",
      href: "tel:+233302123456",
    },
    {
      icon: MessageCircle,
      title: "Online Chat Support",
      description: "Get instant support through our chat service",
      action: "Start Chat",
      href: "https://wa.me/233302123456",
    },
    {
      icon: Users,
      title: "Support Groups",
      description: "Connect with others on similar journeys",
      action: "Find Groups",
      href: "/resources?tab=groups",
    },
    {
      icon: Heart,
      title: "Counseling Services",
      description: "Professional emotional and psychological support",
      action: "Learn More",
      href: "/contact",
    },
    {
      icon: DollarSign,
      title: "Financial Assistance",
      description: "Help with treatment costs and expenses",
      action: "Apply Now",
      href: "/resources?tab=treatment",
    },
    {
      icon: Car,
      title: "Transportation Aid",
      description: "Free or subsidized transport to treatment centers",
      action: "Request Ride",
      href: "/contact",
    },
    {
      icon: Utensils,
      title: "Nutrition Support",
      description: "Nutritional guidance and meal assistance",
      action: "Get Help",
      href: "/contact",
    },
    {
      icon: Shield,
      title: "Patient Navigation",
      description: "Help navigating the healthcare system",
      action: "Get Navigator",
      href: "/contact",
    },
  ];

  const handleServiceAction = (href: string) => {
    if (href.startsWith("tel:") || href.startsWith("mailto:")) {
      window.location.href = href;
      return;
    }

    if (href.startsWith("http")) {
      window.open(href, "_blank", "noopener,noreferrer");
      return;
    }

    navigate(href);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20 pb-20">
        {/* Hero Image Section - Ghana community support */}
        <div className="relative h-80 mb-16 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=1920&h=600&fit=crop"
            alt="Community support in Ghana"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
          {/* Ghana Flag Colors Accent */}
          <div className="absolute inset-0 opacity-10" style={{
            background: "linear-gradient(135deg, #CE1126 0%, #FCD116 50%, #006B3F 100%)"
          }} />
          <div className="absolute inset-0 flex items-end">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
              <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-4">
                Get Support
              </h1>
              <p className="text-lg text-foreground/90 max-w-3xl">
                You don't have to face cancer alone. We're here to provide comprehensive support throughout your journey in Ghana.
              </p>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <Tabs defaultValue="all" className="mb-12">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="all">All Services</TabsTrigger>
              <TabsTrigger value="emotional">Emotional</TabsTrigger>
              <TabsTrigger value="financial">Financial</TabsTrigger>
              <TabsTrigger value="practical">Practical</TabsTrigger>
              <TabsTrigger value="community">Community</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {supportServices.map((service, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                        <service.icon className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{service.title}</CardTitle>
                      <CardDescription>{service.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => handleServiceAction(service.href)}
                      >
                        {service.action}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="emotional">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {supportServices
                  .filter((s) => ["24/7 Helpline", "Counseling Services", "Support Groups"].includes(s.title))
                  .map((service, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                          <service.icon className="w-6 h-6 text-primary" />
                        </div>
                        <CardTitle className="text-lg">{service.title}</CardTitle>
                        <CardDescription>{service.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button variant="outline" className="w-full" onClick={() => handleServiceAction(service.href)}>
                          {service.action}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="financial">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {supportServices
                  .filter((s) => s.title.includes("Financial") || s.title.includes("Transport"))
                  .map((service, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                          <service.icon className="w-6 h-6 text-primary" />
                        </div>
                        <CardTitle className="text-lg">{service.title}</CardTitle>
                        <CardDescription>{service.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button variant="outline" className="w-full" onClick={() => handleServiceAction(service.href)}>
                          {service.action}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="practical">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {supportServices
                  .filter((s) => ["Transportation Aid", "Nutrition Support", "Patient Navigation"].includes(s.title))
                  .map((service, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                          <service.icon className="w-6 h-6 text-primary" />
                        </div>
                        <CardTitle className="text-lg">{service.title}</CardTitle>
                        <CardDescription>{service.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button variant="outline" className="w-full" onClick={() => handleServiceAction(service.href)}>
                          {service.action}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="community">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {supportServices
                  .filter((s) => ["Support Groups", "Online Chat Support"].includes(s.title))
                  .map((service, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                          <service.icon className="w-6 h-6 text-primary" />
                        </div>
                        <CardTitle className="text-lg">{service.title}</CardTitle>
                        <CardDescription>{service.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button variant="outline" className="w-full" onClick={() => handleServiceAction(service.href)}>
                          {service.action}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* Emergency Contact Card */}
          <Card className="bg-primary/10 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-primary" />
                Need Immediate Help?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="text-2xl font-bold text-foreground mb-1">+233 (0) 302 123 456</div>
                  <div className="text-muted-foreground">Available 24/7 for urgent support</div>
                </div>
                <Button variant="hero" size="lg" onClick={() => (window.location.href = "tel:+233302123456")}>
                  Call Now
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SupportPage;
