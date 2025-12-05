import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowLeft, RefreshCw, CheckCircle2, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Practice = () => {
  const navigate = useNavigate();
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const question = {
    text: "Which of the following best describes the core concept we just studied?",
    options: [
      { id: "a", text: "A systematic approach to breaking down complex topics" },
      { id: "b", text: "A method for memorizing information quickly" },
      { id: "c", text: "A technique for avoiding difficult subjects" },
      { id: "d", text: "A way to skip foundational learning" },
    ],
    correctAnswer: "a",
  };

  const handleSubmit = () => {
    setIsCorrect(selectedAnswer === question.correctAnswer);
    setShowResult(true);
  };

  const handleNext = () => {
    setSelectedAnswer("");
    setShowResult(false);
  };

  return (
    <div className="min-h-screen gradient-calm py-8 px-4">
      <div className="container mx-auto max-w-3xl">
        <Button
          variant="ghost"
          onClick={() => navigate("/curriculum")}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Curriculum
        </Button>

        <div className="mb-8 animate-fade-in">
          <h1 className="mb-3">Practice Mode</h1>
          <p className="text-xl text-muted-foreground">
            Test your understanding with unlimited questions
          </p>
        </div>

        <Card className="p-8 animate-scale-in">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-muted-foreground">
                Question 1
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleNext}
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                New Question
              </Button>
            </div>
            <h3 className="text-xl mb-6">{question.text}</h3>
          </div>

          <RadioGroup
            value={selectedAnswer}
            onValueChange={setSelectedAnswer}
            className="space-y-4"
          >
            {question.options.map((option) => (
              <div
                key={option.id}
                className={`flex items-center space-x-3 p-4 rounded-xl border-2 transition-all ${
                  selectedAnswer === option.id
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                } ${
                  showResult && option.id === question.correctAnswer
                    ? "border-accent bg-accent/10"
                    : ""
                } ${
                  showResult &&
                  option.id === selectedAnswer &&
                  !isCorrect
                    ? "border-destructive bg-destructive/10"
                    : ""
                }`}
              >
                <RadioGroupItem value={option.id} id={option.id} />
                <Label
                  htmlFor={option.id}
                  className="flex-1 cursor-pointer text-base"
                >
                  {option.text}
                </Label>
                {showResult && option.id === question.correctAnswer && (
                  <CheckCircle2 className="w-5 h-5 text-accent" />
                )}
                {showResult &&
                  option.id === selectedAnswer &&
                  !isCorrect && (
                    <XCircle className="w-5 h-5 text-destructive" />
                  )}
              </div>
            ))}
          </RadioGroup>

          {!showResult ? (
            <Button
              size="lg"
              className="w-full mt-8"
              onClick={handleSubmit}
              disabled={!selectedAnswer}
            >
              Check Answer
            </Button>
          ) : (
            <div className="mt-8">
              <div
                className={`p-6 rounded-xl mb-4 ${
                  isCorrect
                    ? "bg-accent/10 border-2 border-accent"
                    : "bg-destructive/10 border-2 border-destructive"
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  {isCorrect ? (
                    <>
                      <CheckCircle2 className="w-6 h-6 text-accent" />
                      <h3 className="text-xl text-accent-foreground">
                        Correct! Well done! 🎉
                      </h3>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-6 h-6 text-destructive" />
                      <h3 className="text-xl text-destructive-foreground">
                        Not quite right
                      </h3>
                    </>
                  )}
                </div>
                <p className="text-muted-foreground">
                  {isCorrect
                    ? "You've demonstrated a solid understanding of this concept."
                    : "Review the study materials to strengthen your understanding."}
                </p>
              </div>

              <div className="flex gap-3">
                <Button
                  size="lg"
                  className="flex-1"
                  onClick={handleNext}
                >
                  Next Question
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => navigate("/curriculum")}
                >
                  Finish Practice
                </Button>
              </div>
            </div>
          )}
        </Card>

        <div className="mt-6 text-center">
          <p className="text-muted-foreground">
            Practice as much as you need – unlimited questions available
          </p>
        </div>
      </div>
    </div>
  );
};

export default Practice;
