import { Link } from "react-router-dom";
import { Stethoscope, BookOpen, Users, HeartHandshake, Building2, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const ServicesSection = () => {
  const services = [
    {
      icon: Stethoscope,
      title: "Early Screening",
      description: "Free cancer screening programs across all 16 regions of Ghana. Early detection saves lives.",
      features: ["Breast Cancer", "Cervical Cancer", "Prostate Cancer"],
    },
    {
      icon: BookOpen,
      title: "Education Programs",
      description: "Community outreach and awareness campaigns in local languages.",
      features: ["School Programs", "Community Talks", "Media Campaigns"],
    },
    {
      icon: Users,
      title: "Support Groups",
      description: "Connect with survivors and caregivers who understand your journey.",
      features: ["Peer Support", "Family Counseling", "Online Forums"],
    },
    {
      icon: HeartHandshake,
      title: "Patient Support",
      description: "Financial assistance and navigation services for cancer patients.",
      features: ["Treatment Funding", "Transport Aid", "Nutrition Support"],
    },
    {
      icon: Building2,
      title: "Treatment Centers",
      description: "Partner with leading hospitals providing quality cancer care.",
      features: ["Korle Bu", "KATH", "Regional Hospitals"],
    },
    {
      icon: Phone,
      title: "24/7 Helpline",
      description: "Always available to answer questions and provide guidance.",
      features: ["Free Calls", "SMS Support", "WhatsApp"],
    },
  ];

  return (
    <section id="services" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            Our Services
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Comprehensive Cancer Support Across Ghana
          </h2>
          <p className="text-muted-foreground text-lg">
            From prevention to recovery, we support patients and families in every region.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            // Ghana-specific healthcare and community images
            const serviceImages = [
              "https://tidexsg.com/wp-content/uploads/2025/09/pexels-photo-33132346-33132346-1024x734.jpg", // Medical screening
              "https://media.licdn.com/dms/image/v2/D4E22AQGtI_Nw8xyV8w/feedshare-shrink_800/feedshare-shrink_800/0/1710504071909?e=2147483647&v=beta&t=kZU-t7_hwqojr4I99n7_0ZEraZSwr3kL3cHy165DNEA", // Education
              "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=300&fit=crop", // Community support
              "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=400&h=300&fit=crop", // Patient care
              "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop", // Hospital
              "https://images.unsplash.com/photo-1512678080530-7760d81faba6?w=400&h=300&fit=crop", // Helpline
            ];
            
            return (
            <div
              key={index}
              className="group relative bg-background/95 rounded-2xl overflow-hidden border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300"
            >
              {/* Service Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={serviceImages[index]}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                {/* Icon */}
                <div className="absolute top-4 right-4 w-14 h-14 rounded-2xl bg-background/90 backdrop-blur-sm border border-border flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                  <service.icon className="w-7 h-7 text-primary" />
                </div>
              </div>
              
              <div className="p-6">

              {/* Content */}
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                {service.title}
              </h3>
              <p className="text-muted-foreground mb-4">
                {service.description}
              </p>

              {/* Features */}
              <div className="flex flex-wrap gap-2">
                {service.features.map((feature, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full bg-secondary text-xs font-medium text-muted-foreground"
                  >
                    {feature}
                  </span>
                ))}
              </div>

              </div>
              
              {/* Hover Accent */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Link to="/booking">
            <Button variant="hero" size="xl">
              Schedule Free Consultation
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
