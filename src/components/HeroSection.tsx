import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Shield, Users } from "lucide-react";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background with Ghana Flag Colors */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#CE1126]/5 via-[#FCD116]/5 to-[#006B3F]/5" />
      
      {/* Kente Pattern Overlay - Ghanaian inspired */}
      <div className="absolute inset-0 opacity-[0.05]" style={{
        backgroundImage: `repeating-linear-gradient(
          45deg,
          transparent,
          transparent 20px,
          #CE1126 20px,
          #CE1126 40px,
          #FCD116 40px,
          #FCD116 60px,
          #006B3F 60px,
          #006B3F 80px
        )`
      }} />
      
      {/* Ghana Flag Pattern Background */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        background: "linear-gradient(to bottom, #CE1126 0%, #FCD116 33%, #006B3F 66%, #FCD116 100%)"
      }} />

      {/* Floating Elements */}
      <div className="absolute top-1/4 left-10 w-20 h-20 rounded-full bg-primary/10 blur-2xl animate-pulse" />
      <div className="absolute bottom-1/4 right-10 w-32 h-32 rounded-full bg-accent/10 blur-3xl animate-pulse" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-in">
              <Heart className="w-4 h-4" />
              <span>Ghana Cancer Care Network</span>
            </div>

            <h1
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6 animate-fade-in"
              style={{ animationDelay: "0.1s" }}
            >
              Professional Cancer Support,{" "}
              <span className="text-primary">Rooted in Ghana</span>
            </h1>

            <p
              className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0 animate-fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              We deliver early screening, education, and care coordination for communities across all 16 regions.
              Together, we improve outcomes through action and awareness.
            </p>

            <div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in"
              style={{ animationDelay: "0.3s" }}
            >
              <Link to="/booking">
                <Button variant="hero" size="xl" className="group">
                  Book Free Screening
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/education">
                <Button variant="soft" size="xl">
                  Learn About Cancer
                </Button>
              </Link>
            </div>

            <div
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10 animate-fade-in"
              style={{ animationDelay: "0.4s" }}
            >
              <div className="rounded-2xl border border-border bg-background/80 px-4 py-3 text-left shadow-sm">
                <div className="text-2xl font-bold text-primary">10K+</div>
                <div className="text-sm text-muted-foreground">Patients supported</div>
              </div>
              <div className="rounded-2xl border border-border bg-background/80 px-4 py-3 text-left shadow-sm">
                <div className="text-2xl font-bold text-primary">50+</div>
                <div className="text-sm text-muted-foreground">Partner clinics</div>
              </div>
              <div className="rounded-2xl border border-border bg-background/80 px-4 py-3 text-left shadow-sm">
                <div className="text-2xl font-bold text-primary">16</div>
                <div className="text-sm text-muted-foreground">Regions covered</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative w-full max-w-lg mx-auto">
              <div className="relative w-full aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?w=900&h=1100&fit=crop&crop=faces"
                  alt="Ghanaian healthcare professionals supporting cancer care"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    background: "linear-gradient(135deg, #CE1126 0%, #FCD116 50%, #006B3F 100%)",
                  }}
                />
              </div>

              <div className="absolute -left-6 top-10 rounded-2xl border border-border bg-background/95 p-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Screening Access</div>
                    <div className="text-xs text-muted-foreground">Free clinics nationwide</div>
                  </div>
                </div>
              </div>

              <div className="absolute -right-6 bottom-10 rounded-2xl border border-border bg-background/95 p-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                    <Users className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Community Support</div>
                    <div className="text-xs text-muted-foreground">Counselors and groups</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
