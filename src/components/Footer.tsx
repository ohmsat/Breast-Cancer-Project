import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Facebook, Twitter, Instagram, Youtube } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [newsletterEmail, setNewsletterEmail] = useState("");

  const handleNewsletterSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!newsletterEmail.trim()) {
      return;
    }

    const subject = "Newsletter Signup";
    const body = `Please add ${newsletterEmail.trim()} to the ONCOBRIDGE newsletter.`;
    window.location.href = `mailto:support@oncobridge.org?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    setNewsletterEmail("");
  };

  const quickLinks = [
    { name: "About Us", href: "/#about" },
    { name: "Our Services", href: "/#services" },
    { name: "Success Stories", href: "/#stories" },
    { name: "Contact Us", href: "/#contact" },
  ];

  const resources = [
    { name: "Cancer Types", href: "/resources?tab=types" },
    { name: "Prevention Guide", href: "/resources?tab=prevention" },
    { name: "Treatment Options", href: "/resources?tab=treatment" },
    { name: "Support Groups", href: "/resources?tab=groups" },
  ];

  const socialLinks = [
    { icon: Facebook, href: "https://www.facebook.com", label: "Facebook" },
    { icon: Twitter, href: "https://www.twitter.com", label: "Twitter" },
    { icon: Instagram, href: "https://www.instagram.com", label: "Instagram" },
    { icon: Youtube, href: "https://www.youtube.com", label: "Youtube" },
  ];

  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-background/90 border border-background/30 flex items-center justify-center overflow-hidden shadow-sm">
                <img
                  src="/cancer-logo.png"
                  alt="ONCOBRIDGE logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-display text-xl font-semibold">
                <span className="text-primary">ONCO</span>BRIDGE
              </span>
            </Link>
            <p className="text-background/70 mb-6">
              Empowering communities in the fight against cancer through awareness, early detection, and compassionate support.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-background/70 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Resources</h4>
            <ul className="space-y-3">
              {resources.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-background/70 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Stay Updated</h4>
            <p className="text-background/70 mb-4">
              Get the latest news on cancer awareness and events.
            </p>
            <form className="flex gap-2" onSubmit={handleNewsletterSubmit}>
              <input
                type="email"
                placeholder="Your email"
                value={newsletterEmail}
                onChange={(event) => setNewsletterEmail(event.target.value)}
                className="flex-1 px-4 py-2 rounded-lg bg-background/10 border border-background/20 text-background placeholder:text-background/50 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition-colors"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-background/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-background/60 text-sm">
            © {currentYear} ONCOBRIDGE. All rights reserved.
          </p>
          <p className="flex items-center gap-1 text-background/60 text-sm">
            Made with <Heart className="w-4 h-4 text-accent fill-accent" /> for Ghana
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
