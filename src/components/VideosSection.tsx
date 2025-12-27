import { Play } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const VideosSection = () => {
  const videos = [
    {
      id: "kkvAmbu3jF4",
      title: "Cancer Awareness in Ghana",
      description: "Understanding cancer prevention and early detection",
    },
    {
      id: "_MG-wOoGkQE",
      title: "Breast Cancer Screening Guide",
      description: "Step-by-step guide to breast self-examination",
    },
    {
      id: "KyeiZJrWrys",
      title: "Patient Success Stories",
      description: "Inspiring stories from cancer survivors",
    },
    {
      id: "U8j2Oj9jiNA",
      title: "Nutrition and Cancer Prevention",
      description: "Healthy eating to reduce cancer risk",
    },
    // {
    //   id: "V-B_NKuG8eM",
    //   title: "Support Groups and Community",
    //   description: "Finding strength in community support",
    // },
    {
      id: "FiffQhTBqeQ",
      title: "Treatment Options Explained",
      description: "Understanding available treatment methods",
    },
    {
      id: "q5ANlM_VbHg",
      title: "Cervical Cancer Prevention",
      description: "HPV vaccination and screening importance",
    },
    {
      id: "Om1BE3AGWVI",
      title: "Mental Health and Cancer",
      description: "Coping strategies and emotional support",
    },
    {
      id: "Ev_0qewKdhE",
      title: "Financial Assistance Programs",
      description: "Resources for treatment funding",
    },
    {
      id: "hulMwat3Cpg",
      title: "Early Detection Saves Lives",
      description: "The importance of regular screenings",
    },
  ];
  const [featuredVideo, ...otherVideos] = videos;

  return (
    <section id="videos" className="py-20 bg-background relative overflow-hidden">
      {/* Ghanaian Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `repeating-linear-gradient(
          45deg,
          #CE1126,
          #CE1126 30px,
          #FCD116 30px,
          #FCD116 60px,
          #006B3F 60px,
          #006B3F 90px
        )`
      }} />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Educational Videos
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Learn Through Our Ghana Video Library
          </h2>
          <p className="text-muted-foreground text-lg">
            Video resources designed for Ghanaian families covering awareness, prevention, treatment, and support.
          </p>
        </div>

        {/* Videos Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
          {videos.map((video, index) => (
            <Card
              key={index}
              className="group flex h-full flex-col hover:shadow-lg transition-all duration-300 overflow-hidden border border-border"
            >
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
              <CardContent className="p-4 flex-1">
                <h3 className="font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                  {video.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {video.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            Subscribe to our YouTube channel for the latest updates and educational content
          </p>
        </div>
      </div>
    </section>
  );
};

export default VideosSection;
