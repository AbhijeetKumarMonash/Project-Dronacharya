import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, FileText, Video, BookOpen, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Materials = () => {
  const navigate = useNavigate();

  const materials = [
    {
      id: 1,
      type: "article",
      title: "Core Concepts Overview",
      description: "Foundational understanding of key principles and terminology.",
      url: "#",
      duration: "8 min read",
    },
    {
      id: 2,
      type: "video",
      title: "Visual Walkthrough Tutorial",
      description: "Step-by-step video guide covering essential techniques.",
      url: "#",
      duration: "15 min watch",
    },
    {
      id: 3,
      type: "article",
      title: "In-Depth Analysis",
      description: "Comprehensive exploration of advanced concepts.",
      url: "#",
      duration: "12 min read",
    },
    {
      id: 4,
      type: "reference",
      title: "Quick Reference Guide",
      description: "Handy cheat sheet for common patterns and practices.",
      url: "#",
      duration: "5 min read",
    },
    {
      id: 5,
      type: "article",
      title: "Real-World Examples",
      description: "Practical applications and case studies.",
      url: "#",
      duration: "10 min read",
    },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="w-5 h-5" />;
      case "reference":
        return <BookOpen className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen gradient-calm py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <Button
          variant="ghost"
          onClick={() => navigate("/curriculum")}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Curriculum
        </Button>

        <div className="mb-8 animate-fade-in">
          <h1 className="mb-3">Study Materials</h1>
          <p className="text-xl text-muted-foreground">
            Curated resources to help you master this step
          </p>
        </div>

        <div className="space-y-4">
          {materials.map((material, index) => (
            <Card
              key={material.id}
              className="p-6 hover-lift animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  {getIcon(material.type)}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-xl mb-2">{material.title}</h3>
                  <p className="text-muted-foreground mb-3">
                    {material.description}
                  </p>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">
                      {material.duration}
                    </span>
                    <Button size="sm" variant="outline" asChild>
                      <a
                        href={material.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Open Resource
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button
            size="lg"
            onClick={() => navigate("/curriculum")}
            className="px-8"
          >
            Continue Learning
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Materials;
