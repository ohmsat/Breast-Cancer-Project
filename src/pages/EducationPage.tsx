import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, Shield, Heart, Activity, Play } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const EducationPage = () => {
  const cancerTypes = [
    {
      name: "Breast Cancer",
      description: "The most common cancer among women in Ghana",
      symptoms: ["Lump in breast", "Breast pain", "Nipple discharge", "Skin changes"],
      prevention: ["Monthly self-exams", "Regular mammograms", "Healthy lifestyle"],
    },
    {
      name: "Cervical Cancer",
      description: "Highly preventable with early screening",
      symptoms: ["Abnormal bleeding", "Pelvic pain", "Unusual discharge"],
      prevention: ["HPV vaccination", "Regular Pap smears", "Safe sexual practices"],
    },
    {
      name: "Prostate Cancer",
      description: "Most common cancer in men",
      symptoms: ["Urinary problems", "Blood in urine", "Erectile dysfunction"],
      prevention: ["Regular screening", "Healthy diet", "Exercise"],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20 pb-20">
        {/* Hero Image Section - Ghana healthcare focus */}
        <div className="relative h-96 mb-16 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=1920&h=600&fit=crop"
            alt="Cancer education and awareness in Ghana"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          {/* Ghana Flag Colors Accent */}
          <div className="absolute inset-0 opacity-10" style={{
            background: "linear-gradient(135deg, #CE1126 0%, #FCD116 50%, #006B3F 100%)"
          }} />
          <div className="absolute inset-0 flex items-end">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
              <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-4">
                Learn About Cancer
              </h1>
              <p className="text-lg text-foreground/90 max-w-3xl">
                Knowledge is power. Understanding cancer, its symptoms, and prevention methods can help save lives in Ghana.
              </p>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Key Stats Alert */}
          <Alert className="mb-12">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Did You Know?</AlertTitle>
            <AlertDescription>
              Early detection increases survival rates by up to 90%. Regular screenings and awareness can significantly improve outcomes.
            </AlertDescription>
          </Alert>

          <Tabs defaultValue="overview" className="mb-12">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="types">Cancer Types</TabsTrigger>
              <TabsTrigger value="prevention">Prevention</TabsTrigger>
              <TabsTrigger value="screening">Screening</TabsTrigger>
              <TabsTrigger value="videos">Videos</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-8">
              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="w-5 h-5 text-primary" />
                      What is Cancer?
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Cancer is a disease where abnormal cells divide uncontrollably and can invade other tissues.
                      Early detection and treatment significantly improve survival rates.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="w-5 h-5 text-primary" />
                      Risk Factors
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-muted-foreground text-sm">
                      <li>• Age (risk increases with age)</li>
                      <li>• Family history</li>
                      <li>• Lifestyle factors</li>
                      <li>• Environmental exposure</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Heart className="w-5 h-5 text-primary" />
                      Treatment Options
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-muted-foreground text-sm">
                      <li>• Surgery</li>
                      <li>• Chemotherapy</li>
                      <li>• Radiation therapy</li>
                      <li>• Immunotherapy</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="types" className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                {cancerTypes.map((type, index) => {
                  // Ghana-specific healthcare images
                  const typeImages = [
                    "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400&h=300&fit=crop", // Breast cancer awareness
                    "https://images.unsplash.com/photo-1559757175-2b0e8e06097a?w=400&h=300&fit=crop", // Women's health
                    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop", // Men's health
                  ];
                  
                  return (
                  <Card key={index} className="overflow-hidden group hover:shadow-lg transition-shadow">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={typeImages[index]}
                        alt={type.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <CardTitle className="text-foreground">{type.name}</CardTitle>
                        <CardDescription className="text-foreground/80">{type.description}</CardDescription>
                      </div>
                    </div>
                    <CardContent className="space-y-4 p-6">
                      <div>
                        <div className="font-semibold text-sm mb-2">Common Symptoms:</div>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {type.symptoms.map((symptom, idx) => (
                            <li key={idx}>• {symptom}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <div className="font-semibold text-sm mb-2">Prevention:</div>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {type.prevention.map((prev, idx) => (
                            <li key={idx}>• {prev}</li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="prevention" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Lifestyle Changes</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <div className="font-semibold mb-1">Maintain Healthy Weight</div>
                      <div className="text-sm text-muted-foreground">
                        Obesity increases cancer risk. Aim for a BMI between 18.5-25.
                      </div>
                    </div>
                    <div>
                      <div className="font-semibold mb-1">Regular Exercise</div>
                      <div className="text-sm text-muted-foreground">
                        Aim for at least 30 minutes of moderate activity daily.
                      </div>
                    </div>
                    <div>
                      <div className="font-semibold mb-1">Healthy Diet</div>
                      <div className="text-sm text-muted-foreground">
                        Eat plenty of fruits, vegetables, and whole grains. Limit processed foods.
                      </div>
                    </div>
                    <div>
                      <div className="font-semibold mb-1">Avoid Tobacco</div>
                      <div className="text-sm text-muted-foreground">
                        Don't smoke or use tobacco products. Avoid secondhand smoke.
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Medical Prevention</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <div className="font-semibold mb-1">Vaccinations</div>
                      <div className="text-sm text-muted-foreground">
                        Get HPV and Hepatitis B vaccinations as recommended.
                      </div>
                    </div>
                    <div>
                      <div className="font-semibold mb-1">Regular Screening</div>
                      <div className="text-sm text-muted-foreground">
                        Follow recommended screening schedules for your age and risk factors.
                      </div>
                    </div>
                    <div>
                      <div className="font-semibold mb-1">Know Your Family History</div>
                      <div className="text-sm text-muted-foreground">
                        Share family history with your doctor for personalized screening.
                      </div>
                    </div>
                    <div>
                      <div className="font-semibold mb-1">Self-Examinations</div>
                      <div className="text-sm text-muted-foreground">
                        Perform monthly self-exams for breast and testicular cancer.
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="screening" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Screening Guidelines</CardTitle>
                  <CardDescription>
                    Early detection through regular screening is crucial
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <div className="font-semibold text-lg mb-2">Breast Cancer</div>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>• Women 40-49: Annual or biennial mammograms</li>
                        <li>• Women 50+: Annual mammograms</li>
                        <li>• High-risk individuals: Earlier and more frequent screening</li>
                        <li>• Monthly self-examinations for all women</li>
                      </ul>
                    </div>
                    <div>
                      <div className="font-semibold text-lg mb-2">Cervical Cancer</div>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>• Women 21-29: Pap test every 3 years</li>
                        <li>• Women 30-65: Pap test + HPV test every 5 years</li>
                        <li>• Women 65+: If previous tests normal, may stop screening</li>
                      </ul>
                    </div>
                    <div>
                      <div className="font-semibold text-lg mb-2">Prostate Cancer</div>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>• Men 50+: Discuss screening with doctor</li>
                        <li>• High-risk men (African descent, family history): Start at 45</li>
                        <li>• PSA test and digital rectal exam</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="videos" className="space-y-6">
              <div>
                <h3 className="font-semibold text-xl mb-6">Educational Video Library</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { id: "kkvAmbu3jF4", title: "Cancer Awareness in Ghana", desc: "Understanding cancer prevention" },
                    { id: "_MG-wOoGkQE", title: "Breast Cancer Screening", desc: "Step-by-step self-examination guide" },
                    { id: "q5ANlM_VbHg", title: "Cervical Cancer Prevention", desc: "HPV vaccination and screening" },
                    { id: "V-B_NKuG8eM", title: "Support Groups", desc: "Finding strength in community" },
                    { id: "FiffQhTBqeQ", title: "Treatment Options", desc: "Understanding available treatments" },
                    { id: "Ev_0qewKdhE", title: "Financial Assistance", desc: "Resources for treatment funding" },
                  ].map((video, index) => (
                    <Card key={index} className="hover:shadow-lg transition-all overflow-hidden">
                      <div className="relative aspect-video bg-muted overflow-hidden">
                        <iframe
                          className="w-full h-full"
                          src={`https://www.youtube.com/embed/${video.id}`}
                          title={video.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          loading="lazy"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h4 className="font-semibold text-sm mb-1">{video.title}</h4>
                        <p className="text-xs text-muted-foreground">{video.desc}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EducationPage;

