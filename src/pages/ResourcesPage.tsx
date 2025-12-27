import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Shield, HeartPulse, Users, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ResourcesPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20 pb-20">
        {/* Hero Image Section - Ghana healthcare resources */}
        <div className="relative h-80 mb-16 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1512678080530-7760d81faba6?w=1920&h=600&fit=crop"
            alt="Healthcare resources in Ghana"
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
                Resources & Information
              </h1>
              <p className="text-lg text-foreground/90 max-w-3xl">
                Comprehensive resources to help you understand, prevent, and navigate cancer care in Ghana.
              </p>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <Tabs defaultValue="all" className="mb-12">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="all">All Resources</TabsTrigger>
              <TabsTrigger value="types">Cancer Types</TabsTrigger>
              <TabsTrigger value="prevention">Prevention</TabsTrigger>
              <TabsTrigger value="treatment">Treatment</TabsTrigger>
              <TabsTrigger value="groups">Support Groups</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { icon: BookOpen, title: "Cancer Types", desc: "Learn about different types of cancer", img: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop", tab: "types" },
                  { icon: Shield, title: "Prevention Guide", desc: "Steps to reduce your cancer risk", img: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400&h=300&fit=crop", tab: "prevention" },
                  { icon: HeartPulse, title: "Treatment Options", desc: "Understanding treatment methods", img: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=400&h=300&fit=crop", tab: "treatment" },
                  { icon: Users, title: "Support Groups", desc: "Connect with others", img: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=400&h=300&fit=crop", tab: "groups" },
                ].map((resource, index) => (
                  <Card key={index} className="hover:shadow-lg transition-all cursor-pointer overflow-hidden group" onClick={() => navigate(`/resources?tab=${resource.tab}`)}>
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={resource.img}
                        alt={resource.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
                      <div className="absolute top-4 right-4 w-12 h-12 rounded-xl bg-background/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
                        <resource.icon className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle>{resource.title}</CardTitle>
                      <CardDescription>{resource.desc}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button
                        variant="ghost"
                        className="w-full"
                        onClick={(event) => {
                          event.stopPropagation();
                          navigate(`/resources?tab=${resource.tab}`);
                        }}
                      >
                        {resource.tab === "types" && "Explore"}
                        {resource.tab === "prevention" && "Learn More"}
                        {resource.tab === "treatment" && "Discover"}
                        {resource.tab === "groups" && "Join Now"}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="types">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Understanding Different Cancer Types</CardTitle>
                    <CardDescription>Comprehensive information about various cancers</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="font-semibold text-lg mb-3">Common Cancers in Ghana</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {["Breast Cancer", "Cervical Cancer", "Prostate Cancer", "Liver Cancer", "Colorectal Cancer", "Lung Cancer"].map((type) => (
                          <div key={type} className="p-4 rounded-lg bg-secondary/50">
                            <div className="font-semibold">{type}</div>
                            <Button variant="link" className="p-0 h-auto mt-2" onClick={() => navigate("/education")}>
                              Learn more →
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="prevention">
              <Card>
                <CardHeader>
                  <CardTitle>Cancer Prevention Guide</CardTitle>
                  <CardDescription>Evidence-based strategies to reduce cancer risk</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-3">Key Prevention Strategies</h3>
                    <ul className="space-y-3">
                      {[
                        "Maintain a healthy weight",
                        "Eat a balanced diet rich in fruits and vegetables",
                        "Exercise regularly (at least 30 minutes daily)",
                        "Avoid tobacco products",
                        "Limit alcohol consumption",
                        "Protect yourself from sun exposure",
                        "Get vaccinated (HPV, Hepatitis B)",
                        "Regular cancer screenings",
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button onClick={() => navigate("/education")}>View Detailed Guide</Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="treatment">
              <Card>
                <CardHeader>
                  <CardTitle>Treatment Options</CardTitle>
                  <CardDescription>Understanding available cancer treatments</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {[
                      { title: "Surgery", desc: "Removal of cancerous tissue" },
                      { title: "Chemotherapy", desc: "Drugs to kill cancer cells" },
                      { title: "Radiation Therapy", desc: "High-energy rays to destroy cancer" },
                      { title: "Immunotherapy", desc: "Boost immune system to fight cancer" },
                      { title: "Targeted Therapy", desc: "Drugs targeting specific cancer features" },
                      { title: "Hormone Therapy", desc: "Block hormones that fuel some cancers" },
                    ].map((treatment) => (
                      <div key={treatment.title} className="p-4 rounded-lg border border-border">
                        <div className="font-semibold mb-1">{treatment.title}</div>
                        <div className="text-sm text-muted-foreground">{treatment.desc}</div>
                      </div>
                    ))}
                  </div>
                  <Button onClick={() => navigate("/contact")}>Consult with Our Team</Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="groups">
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { name: "Breast Cancer Support Group", location: "Accra", schedule: "Every 1st Saturday" },
                  { name: "Prostate Cancer Support Group", location: "Kumasi", schedule: "Every 2nd Saturday" },
                  { name: "Caregivers Support Group", location: "Takoradi", schedule: "Every 3rd Saturday" },
                  { name: "Survivors Network", location: "Online", schedule: "Weekly virtual meetings" },
                ].map((group, idx) => (
                  <Card key={idx} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle>{group.name}</CardTitle>
                      <CardDescription>
                        <div className="mt-2 space-y-1">
                          <div>📍 {group.location}</div>
                          <div>📅 {group.schedule}</div>
                        </div>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button variant="outline" className="w-full" onClick={() => navigate("/support")}>
                        Join Group
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ResourcesPage;
