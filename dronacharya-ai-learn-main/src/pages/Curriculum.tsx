import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  Clock, 
  Play, 
  Pause, 
  CheckCircle2, 
  BookOpen, 
  Lightbulb,
  Trophy,
  Flame
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Curriculum = () => {
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();

  const curriculum = [
    {
      id: 1,
      title: "Introduction to Core Concepts",
      duration: 25,
      completed: false,
      materials: 3,
    },
    {
      id: 2,
      title: "Foundation Building",
      duration: 25,
      completed: false,
      materials: 5,
    },
    {
      id: 3,
      title: "Practical Applications",
      duration: 25,
      completed: false,
      materials: 4,
    },
    {
      id: 4,
      title: "Advanced Techniques",
      duration: 25,
      completed: false,
      materials: 6,
    },
    {
      id: 5,
      title: "Mastery & Integration",
      duration: 25,
      completed: false,
      materials: 4,
    },
  ];

  return (
    <div className="min-h-screen gradient-calm">
      {/* Header with Progress */}
      <div className="bg-card border-b border-border sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-2xl">Your Learning Journey</h2>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-peach" />
                <span className="text-lg font-semibold">7 Day Streak</span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-badge-gold" />
                <span className="text-lg font-semibold">3 Badges</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Progress value={20} className="flex-1" />
            <span className="text-sm font-medium text-muted-foreground">
              1 of 5 steps
            </span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="space-y-6">
            {curriculum.map((step, index) => (
              <StepCard
                key={step.id}
                step={step}
                isActive={activeStep === index}
                isCompleted={step.completed}
                onActivate={() => setActiveStep(index)}
                onViewMaterials={() => navigate("/materials")}
                onPractice={() => navigate("/practice")}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const StepCard = ({
  step,
  isActive,
  isCompleted,
  onActivate,
  onViewMaterials,
  onPractice,
}: {
  step: {
    id: number;
    title: string;
    duration: number;
    completed: boolean;
    materials: number;
  };
  isActive: boolean;
  isCompleted: boolean;
  onActivate: () => void;
  onViewMaterials: () => void;
  onPractice: () => void;
}) => {
  const [timerRunning, setTimerRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(step.duration * 60);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <Card
      className={`p-6 transition-all ${
        isActive
          ? "border-2 border-primary shadow-lg scale-[1.02]"
          : "border border-border hover:border-primary/50"
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            {isCompleted ? (
              <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0" />
            ) : (
              <div className="w-6 h-6 rounded-full border-2 border-primary flex-shrink-0" />
            )}
            <h3 className="text-xl">{step.title}</h3>
          </div>
          <div className="flex items-center gap-4 text-muted-foreground ml-9">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{step.duration} min</span>
            </div>
            <div className="flex items-center gap-1">
              <BookOpen className="w-4 h-4" />
              <span>{step.materials} materials</span>
            </div>
          </div>
        </div>

        <Button
          variant={isActive ? "default" : "outline"}
          onClick={onActivate}
        >
          {isActive ? "Current" : "Select"}
        </Button>
      </div>

      {isActive && (
        <div className="space-y-4 animate-slide-up">
          {/* Pomodoro Timer */}
          <div className="bg-muted rounded-2xl p-6">
            <div className="text-center mb-4">
              <div className="text-5xl font-bold text-primary mb-2">
                {String(minutes).padStart(2, "0")}:
                {String(seconds).padStart(2, "0")}
              </div>
              <p className="text-muted-foreground">Pomodoro Timer</p>
            </div>
            <div className="flex gap-3 justify-center">
              <Button
                size="lg"
                onClick={() => setTimerRunning(!timerRunning)}
                className="px-8"
              >
                {timerRunning ? (
                  <>
                    <Pause className="w-4 h-4 mr-2" /> Pause
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" /> Start
                  </>
                )}
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => setTimeLeft(step.duration * 60)}
              >
                Reset
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid sm:grid-cols-2 gap-3">
            <Button
              size="lg"
              variant="outline"
              className="w-full"
              onClick={onViewMaterials}
            >
              <BookOpen className="w-4 h-4 mr-2" />
              View Study Materials
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full"
              onClick={onPractice}
            >
              <Lightbulb className="w-4 h-4 mr-2" />
              Practice Mode
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default Curriculum;
