import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        <div className="relative h-64 mb-12 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1920&h=600&fit=crop"
            alt="Contact ONCOBRIDGE support team"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
          <div
            className="absolute inset-0 opacity-10"
            style={{
              background: "linear-gradient(135deg, #CE1126 0%, #FCD116 50%, #006B3F 100%)",
            }}
          />
          <div className="absolute inset-0 flex items-end">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 w-full">
              <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-3">
                Contact Us
              </h1>
              <p className="text-lg text-foreground/90 max-w-2xl">
                Reach out for screening guidance, support services, or any questions about cancer care in Ghana.
              </p>
            </div>
          </div>
        </div>
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
