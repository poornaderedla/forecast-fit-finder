import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Question {
  id: string;
  text: string;
  type: "likert" | "multiple_choice" | "scale";
  options?: string[];
  correct?: number;
  min?: number;
  max?: number;
}

interface Section {
  id: string;
  title: string;
  description: string;
  questions: Question[];
}

// Assessment data structure
const assessmentSections: Section[] = [
  {
    id: "psychometric",
    title: "Psychometric Evaluation",
    description: "Understanding your personality and cognitive preferences",
    questions: [
      {
        id: "interest1",
        text: "I enjoy working with numbers to predict future outcomes",
        type: "likert"
      },
      {
        id: "interest2", 
        text: "I find satisfaction in analyzing patterns and trends in data",
        type: "likert"
      },
      {
        id: "personality1",
        text: "I prefer structured tasks with clear procedures",
        type: "likert"
      },
      {
        id: "personality2",
        text: "I work well under pressure and tight deadlines",
        type: "likert"
      },
      {
        id: "cognitive1",
        text: "I prefer logical, analytical thinking over creative brainstorming",
        type: "likert"
      }
    ]
  },
  {
    id: "technical",
    title: "Technical & Aptitude Assessment",
    description: "Testing your technical readiness and analytical skills",
    questions: [
      {
        id: "excel1",
        text: "Which Excel function would you use to find the average of values in cells A1:A10?",
        type: "multiple_choice",
        options: ["SUM(A1:A10)/10", "AVERAGE(A1:A10)", "MEAN(A1:A10)", "AVG(A1:A10)"],
        correct: 1
      },
      {
        id: "forecasting1",
        text: "What does 'lead time' represent in demand planning?",
        type: "multiple_choice",
        options: [
          "Time to manufacture a product",
          "Time between placing an order and receiving it",
          "Time to sell inventory",
          "Time to process customer requests"
        ],
        correct: 1
      },
      {
        id: "logic1",
        text: "If sales increase by 15% each month, and current sales are 1000 units, what will sales be in month 3?",
        type: "multiple_choice",
        options: ["1150 units", "1300 units", "1323 units", "1520 units"],
        correct: 2
      }
    ]
  },
  {
    id: "wiscar",
    title: "WISCAR Framework Analysis", 
    description: "Comprehensive evaluation of your readiness across all dimensions",
    questions: [
      {
        id: "will1",
        text: "I consistently work toward long-term goals even when progress is slow",
        type: "likert"
      },
      {
        id: "skill1",
        text: "Rate your current Excel skills (pivot tables, formulas, data analysis)",
        type: "scale",
        min: 1,
        max: 10
      },
      {
        id: "learning1",
        text: "I actively seek feedback to improve my performance",
        type: "likert"
      }
    ]
  }
];

const likertOptions = [
  { value: "1", label: "Strongly Disagree" },
  { value: "2", label: "Disagree" },
  { value: "3", label: "Neutral" },
  { value: "4", label: "Agree" },
  { value: "5", label: "Strongly Agree" }
];

const Assessment = () => {
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  
  const totalQuestions = assessmentSections.reduce((acc, section) => acc + section.questions.length, 0);
  const answeredQuestions = Object.keys(answers).length;
  const progress = (answeredQuestions / totalQuestions) * 100;

  const currentSectionData = assessmentSections[currentSection];
  const currentQuestionData = currentSectionData.questions[currentQuestion];

  const handleAnswer = (questionId: string, answer: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleNext = () => {
    if (currentQuestion < currentSectionData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else if (currentSection < assessmentSections.length - 1) {
      setCurrentSection(currentSection + 1);
      setCurrentQuestion(0);
    } else {
      // Assessment complete, navigate to results
      navigate("/results", { state: { answers } });
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
      setCurrentQuestion(assessmentSections[currentSection - 1].questions.length - 1);
    }
  };

  const canProceed = answers[currentQuestionData.id];

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost" 
            onClick={() => navigate("/")}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          
          <div className="bg-card rounded-lg p-6 shadow-sm">
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Forecasting & Demand Planning Readiness Assessment
            </h1>
            <p className="text-muted-foreground mb-4">
              Section {currentSection + 1} of {assessmentSections.length}: {currentSectionData.title}
            </p>
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-muted-foreground mt-2">
              {answeredQuestions} of {totalQuestions} questions completed
            </p>
          </div>
        </div>

        {/* Question Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg">
              Question {currentQuestion + 1} of {currentSectionData.questions.length}
            </CardTitle>
            <p className="text-sm text-muted-foreground">{currentSectionData.description}</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <h3 className="text-lg font-medium">{currentQuestionData.text}</h3>
            
            {currentQuestionData.type === "likert" && (
              <RadioGroup
                value={answers[currentQuestionData.id] || ""}
                onValueChange={(value) => handleAnswer(currentQuestionData.id, value)}
              >
                {likertOptions.map((option) => (
                  <div key={option.value} className="flex items-center space-x-2">
                    <RadioGroupItem value={option.value} id={option.value} />
                    <Label htmlFor={option.value}>{option.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            )}

            {currentQuestionData.type === "multiple_choice" && currentQuestionData.options && (
              <RadioGroup
                value={answers[currentQuestionData.id] || ""}
                onValueChange={(value) => handleAnswer(currentQuestionData.id, value)}
              >
                {currentQuestionData.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem value={index.toString()} id={index.toString()} />
                    <Label htmlFor={index.toString()}>{option}</Label>
                  </div>
                ))}
              </RadioGroup>
            )}

            {currentQuestionData.type === "scale" && (
              <RadioGroup
                value={answers[currentQuestionData.id] || ""}
                onValueChange={(value) => handleAnswer(currentQuestionData.id, value)}
              >
                <div className="grid grid-cols-10 gap-2">
                  {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                    <div key={num} className="flex flex-col items-center space-y-1">
                      <RadioGroupItem value={num.toString()} id={num.toString()} />
                      <Label htmlFor={num.toString()} className="text-xs">{num}</Label>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>Beginner</span>
                  <span>Expert</span>
                </div>
              </RadioGroup>
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentSection === 0 && currentQuestion === 0}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          
          <Button
            onClick={handleNext}
            disabled={!canProceed}
            variant={currentSection === assessmentSections.length - 1 && 
                     currentQuestion === currentSectionData.questions.length - 1 ? "default" : "outline"}
          >
            {currentSection === assessmentSections.length - 1 && 
             currentQuestion === currentSectionData.questions.length - 1 ? 
             "Complete Assessment" : "Next"}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Assessment;