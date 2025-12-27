import { TrendingUp, Clock, Activity, CheckCircle } from "lucide-react";

const StatisticsSection = () => {
  const stats = [
    {
      icon: TrendingUp,
      value: "22,000+",
      label: "New Cases Yearly",
      description: "Cancer cases diagnosed in Ghana each year",
      color: "text-red-500",
      bgColor: "bg-red-50",
    },
    {
      icon: Clock,
      value: "70%",
      label: "Late Diagnosis",
      description: "Cases detected at advanced stages",
      color: "text-amber-500",
      bgColor: "bg-amber-50",
    },
    {
      icon: Activity,
      value: "Breast & Cervical",
      label: "Most Common",
      description: "Leading cancer types in Ghanaian women",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      icon: CheckCircle,
      value: "40%",
      label: "Preventable",
      description: "Cancers that can be prevented with early action",
      color: "text-green-500",
      bgColor: "bg-green-50",
    },
  ];

  return (
    <section id="about" className="py-20 bg-secondary/60 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <img
          src="https://images.unsplash.com/photo-1576765608866-5b51046452be?w=1920&h=1080&fit=crop"
          alt="Ghanaian healthcare team"
          className="w-full h-full object-cover"
        />
      </div>
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          background: "linear-gradient(135deg, #CE1126 0%, #FCD116 33%, #006B3F 66%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1.1fr_1.4fr] gap-12 items-center">
          <div>
            <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              The Reality
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Understanding Cancer in Ghana
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              These numbers shape our mission. We focus on early action, reliable information, and community-led care.
            </p>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-primary" />
                Regional screening access with trusted local partners
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-accent" />
                Education campaigns tailored to Ghanaian communities
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#006B3F]" />
                Survivor-led support for patients and families
              </div>
            </div>
            <div className="mt-8">
              <a href="#services" className="inline-flex items-center gap-2 text-primary font-medium hover:underline">
                Learn how we can help
                <span>→</span>
              </a>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-background/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-border"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center mb-4`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="font-medium text-foreground mb-2">{stat.label}</div>
                <p className="text-sm text-muted-foreground">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;
