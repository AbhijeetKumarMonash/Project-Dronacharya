import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Upload as UploadIcon, FileText, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

type InputMode = "pdf" | "text" | null;

const Upload = () => {
  const [mode, setMode] = useState<InputMode>(null);
  const [syllabusText, setSyllabusText] = useState("");
  const [subject, setSubject] = useState("");
  const [level, setLevel] = useState("");
  const [duration, setDuration] = useState("");
  const [learningStyle, setLearningStyle] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (mode === "text" && !syllabusText.trim()) {
      toast({
        title: "Missing information",
        description: "Please enter your syllabus or learning goals.",
        variant: "destructive",
      });
      return;
    }

    // In a real app, this would send data to backend
    toast({
      title: "✨ Creating your learning path",
      description: "Hang tight! AI is crafting your personalized curriculum...",
    });

    setTimeout(() => {
      navigate("/curriculum");
    }, 1500);
  };

  return (
    <div className="min-h-screen gradient-calm py-12 px-4">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="mb-4">Let's Create Your Learning Path</h1>
          <p className="text-xl text-muted-foreground">
            Choose how you'd like to get started
          </p>
        </div>

        {!mode && (
          <div className="grid md:grid-cols-2 gap-6 animate-slide-up">
            <ModeCard
              icon={<UploadIcon className="w-10 h-10" />}
              title="Upload PDF Syllabus"
              description="Have a course syllabus? Upload it and let AI do the work."
              onClick={() => setMode("pdf")}
            />
            <ModeCard
              icon={<FileText className="w-10 h-10" />}
              title="Describe What You Want to Learn"
              description="Tell us about your learning goals and we'll create a path."
              onClick={() => setMode("text")}
            />
          </div>
        )}

        {mode === "pdf" && (
          <Card className="p-8 animate-scale-in">
            <Button
              variant="ghost"
              onClick={() => setMode(null)}
              className="mb-6"
            >
              ← Back
            </Button>
            
            <div className="border-2 border-dashed border-border rounded-2xl p-12 text-center hover:border-primary transition-colors cursor-pointer">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <UploadIcon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl mb-2">Drop your PDF here</h3>
              <p className="text-muted-foreground mb-4">
                or click to browse files
              </p>
              <input
                type="file"
                accept=".pdf"
                className="hidden"
                id="pdf-upload"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    handleSubmit(e as any);
                  }
                }}
              />
              <label htmlFor="pdf-upload">
                <Button type="button" onClick={() => document.getElementById('pdf-upload')?.click()}>
                  Choose File
                </Button>
              </label>
            </div>
          </Card>
        )}

        {mode === "text" && (
          <Card className="p-8 animate-scale-in">
            <Button
              variant="ghost"
              onClick={() => setMode(null)}
              className="mb-6"
            >
              ← Back
            </Button>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="syllabus" className="text-lg">
                  What do you want to learn? <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="syllabus"
                  placeholder="Example: I want to learn web development, including HTML, CSS, JavaScript, React, and how to build full-stack applications..."
                  value={syllabusText}
                  onChange={(e) => setSyllabusText(e.target.value)}
                  className="min-h-[120px] text-base focus-ring"
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-lg">Subject/Topic</Label>
                  <Input
                    id="subject"
                    placeholder="e.g., Web Development"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="text-base focus-ring"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="level" className="text-lg">Experience Level</Label>
                  <Input
                    id="level"
                    placeholder="e.g., Beginner, Intermediate"
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                    className="text-base focus-ring"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration" className="text-lg">Target Duration</Label>
                  <Input
                    id="duration"
                    placeholder="e.g., 3 months, 12 weeks"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="text-base focus-ring"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="style" className="text-lg">Learning Style</Label>
                  <Input
                    id="style"
                    placeholder="e.g., Visual, Hands-on"
                    value={learningStyle}
                    onChange={(e) => setLearningStyle(e.target.value)}
                    className="text-base focus-ring"
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                size="lg" 
                className="w-full text-lg py-6 glow-on-hover"
              >
                <Sparkles className="mr-2 w-5 h-5" />
                Generate My Learning Path
              </Button>
            </form>
          </Card>
        )}
      </div>
    </div>
  );
};

const ModeCard = ({
  icon,
  title,
  description,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}) => (
  <Card
    className="p-8 cursor-pointer hover-lift border-2 hover:border-primary transition-all group"
    onClick={onClick}
  >
    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h3 className="text-xl mb-2">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </Card>
);

export default Upload;
