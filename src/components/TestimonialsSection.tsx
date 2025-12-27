import { Quote } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "The free screening program detected my breast cancer early. Today, I am cancer-free and helping other women get screened.",
      name: "Ama Serwaa",
      role: "Breast Cancer Survivor",
      location: "Kumasi",
    },
    {
      quote: "The support group changed my life. Knowing I wasn't alone in this journey gave me strength to fight.",
      name: "Kofi Mensah",
      role: "Prostate Cancer Survivor",
      location: "Accra",
    },
    {
      quote: "When my mother was diagnosed, ONCOBRIDGE helped us navigate treatment options and provided financial support.",
      name: "Adjoa Nyarko",
      role: "Caregiver",
      location: "Takoradi",
    },
  ];

  return (
    <section id="stories" className="py-20 bg-secondary/40 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 18px,
            #CE1126 18px,
            #CE1126 36px,
            #FCD116 36px,
            #FCD116 54px,
            #006B3F 54px,
            #006B3F 72px
          )`,
        }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Stories of Hope
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Ghanaian Voices of Courage
          </h2>
          <p className="text-muted-foreground text-lg">
            Real stories from real people who faced cancer and emerged stronger.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => {
            // Diverse Ghanaian representation
            const testimonialImages = [
              "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop&crop=face", // Woman
              "https://media.istockphoto.com/id/1058788004/photo/african-american-man.jpg?s=612x612&w=0&k=20&c=89UgmkQppQuIGB-5Dr1NXY4lccmzm9o-WreIpS7_E9g=", // Man
              "https://media.istockphoto.com/id/1288325130/photo/happy-african-woman-in-the-small-village.jpg?s=612x612&w=0&k=20&c=K1QaEraBJIj_cPDdxIzxBMNns3JYyJlcSRc0JlaW8cc=", // Caregiver
            ];
            
            return (
            <div
              key={index}
              className="relative bg-background/95 rounded-2xl overflow-hidden shadow-sm border border-border group hover:shadow-lg transition-shadow"
            >
              {/* Background Image */}
              <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity">
                <img
                  src={testimonialImages[index]}
                  alt={testimonial.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="relative p-8">
                {/* Quote Icon */}
                <div className="absolute -top-4 left-8">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <Quote className="w-4 h-4 text-white" />
                  </div>
                </div>

                {/* Quote */}
                <blockquote className="text-foreground mb-6 pt-4 leading-relaxed text-sm sm:text-base">
                  "{testimonial.quote}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-primary/20">
                    <img
                      src={testimonialImages[index]}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    <div className="text-xs text-muted-foreground">{testimonial.location}</div>
                  </div>
                </div>
              </div>
            </div>
            );
          })}
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-primary mb-1">2,500+</div>
            <div className="text-sm text-muted-foreground">Survivors Supported</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-1">85%</div>
            <div className="text-sm text-muted-foreground">Early Detection Rate</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-1">100+</div>
            <div className="text-sm text-muted-foreground">Support Groups</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-1">24/7</div>
            <div className="text-sm text-muted-foreground">Helpline Available</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
