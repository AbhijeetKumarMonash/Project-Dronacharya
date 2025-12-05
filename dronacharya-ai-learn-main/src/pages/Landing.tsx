import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, Target, Zap, Trophy } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen gradient-calm">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary mb-4">
            <Zap className="w-4 h-4" />
            <span>AI-Powered Learning Made Simple</span>
          </div>
          
          <h1 className="text-balance">
            Break the cycle of{" "}
            <span className="text-primary">half-baked learning</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground text-balance max-w-2xl mx-auto">
            Personalized AI-powered mastery for everyone. Transform any syllabus into a focused, 
            gamified learning journey designed for your brain.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 glow-on-hover"
              onClick={() => navigate("/upload")}
            >
              Start Learning <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="text-lg px-8 py-6"
            >
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <FeatureCard
            icon={<Brain className="w-8 h-8" />}
            title="ADHD-Friendly"
            description="Large fonts, calming colors, and distraction-free design help you stay focused."
            delay="0s"
          />
          <FeatureCard
            icon={<Target className="w-8 h-8" />}
            title="Personalized Path"
            description="AI creates a custom curriculum from your syllabus, tailored to your learning style."
            delay="0.1s"
          />
          <FeatureCard
            icon={<Trophy className="w-8 h-8" />}
            title="Gamified Progress"
            description="Earn badges, track streaks, and celebrate every milestone on your journey."
            delay="0.2s"
          />
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-center mb-12 text-balance">How It Works</h2>
          <div className="space-y-6">
            <StepCard
              number="1"
              title="Upload Your Syllabus"
              description="Drop in a PDF or paste your course outline. Our AI will understand your learning goals."
            />
            <StepCard
              number="2"
              title="Get Your Personalized Plan"
              description="Receive a step-by-step curriculum with Pomodoro timers and curated materials."
            />
            <StepCard
              number="3"
              title="Learn & Practice"
              description="Study with focus, practice with unlimited questions, and track your mastery."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 mb-16">
        <div className="max-w-2xl mx-auto bg-card rounded-3xl p-8 md:p-12 text-center shadow-lg border-2 border-primary/20 hover-lift">
          <h2 className="mb-4 text-balance">Ready to master your subject?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of learners who've broken through their learning barriers.
          </p>
          <Button 
            size="lg" 
            className="text-lg px-10 py-6 gradient-primary"
            onClick={() => navigate("/upload")}
          >
            Get Started Free <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ 
  icon, 
  title, 
  description, 
  delay 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
  delay: string;
}) => (
  <div 
    className="bg-card rounded-2xl p-6 shadow-card hover-lift border border-border"
    style={{ animationDelay: delay }}
  >
    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
      {icon}
    </div>
    <h3 className="text-xl mb-2">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </div>
);

const StepCard = ({ 
  number, 
  title, 
  description 
}: { 
  number: string; 
  title: string; 
  description: string;
}) => (
  <div className="flex gap-6 items-start group">
    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-semibold group-hover:scale-110 transition-transform">
      {number}
    </div>
    <div className="flex-1 pt-1">
      <h3 className="text-xl mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  </div>
);

export default Landing;
