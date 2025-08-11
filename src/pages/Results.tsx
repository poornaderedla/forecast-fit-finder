import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, CheckCircle, AlertCircle, XCircle, Target, TrendingUp, BookOpen } from "lucide-react";

interface ResultsData {
  psychologicalFit: number;
  technicalReadiness: number;
  wiscarScores: {
    will: number;
    interest: number; 
    skill: number;
    cognitive: number;
    abilityToLearn: number;
    realWorldAlignment: number;
  };
  overallScore: number;
  recommendation: "Yes" | "Maybe" | "No";
  confidenceScore: number;
}

const Results = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const answers = location.state?.answers || {};

  // Calculate scores based on answers (simplified calculation)
  const calculateScores = (): ResultsData => {
    const likertAnswers = Object.entries(answers).filter(([key]) => 
      key.includes("interest") || key.includes("personality") || key.includes("cognitive") || key.includes("will") || key.includes("learning")
    );
    
    const technicalAnswers = Object.entries(answers).filter(([key]) => 
      key.includes("excel") || key.includes("forecasting") || key.includes("logic")
    );

    const psychologicalFit = likertAnswers.length > 0 ? 
      Math.round(likertAnswers.reduce((acc, [, value]) => acc + parseInt(String(value)), 0) / likertAnswers.length * 20) : 0;
    
    const technicalReadiness = technicalAnswers.length > 0 ? 
      Math.round(technicalAnswers.reduce((acc, [, value]) => {
        // Simple scoring for technical questions
        const numValue = typeof value === 'string' ? parseInt(value) : 0;
        return acc + (numValue === 1 ? 100 : numValue === 2 ? 33 : 0);
      }, 0) / technicalAnswers.length) : 0;

    const overallScore = Math.round((psychologicalFit + technicalReadiness) / 2);
    
    let recommendation: "Yes" | "Maybe" | "No" = "No";
    if (overallScore >= 80) recommendation = "Yes";
    else if (overallScore >= 60) recommendation = "Maybe";

    return {
      psychologicalFit,
      technicalReadiness,
      wiscarScores: {
        will: Math.min(100, psychologicalFit + Math.random() * 20),
        interest: Math.min(100, psychologicalFit + Math.random() * 15),
        skill: technicalReadiness,
        cognitive: Math.min(100, technicalReadiness + Math.random() * 20),
        abilityToLearn: Math.min(100, psychologicalFit + Math.random() * 25),
        realWorldAlignment: Math.min(100, overallScore + Math.random() * 15)
      },
      overallScore,
      recommendation,
      confidenceScore: Math.min(100, overallScore + Math.random() * 10)
    };
  };

  const results = calculateScores();

  const getRecommendationIcon = (recommendation: string) => {
    switch (recommendation) {
      case "Yes": return <CheckCircle className="w-8 h-8 text-success" />;
      case "Maybe": return <AlertCircle className="w-8 h-8 text-warning" />;
      case "No": return <XCircle className="w-8 h-8 text-destructive" />;
      default: return null;
    }
  };

  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case "Yes": return "bg-success/10 border-success/20";
      case "Maybe": return "bg-warning/10 border-warning/20";
      case "No": return "bg-destructive/10 border-destructive/20";
      default: return "";
    }
  };

  const skillsData = [
    { skill: "Excel for Planning", required: 85, current: results.technicalReadiness, gap: 85 - results.technicalReadiness },
    { skill: "Forecast Models", required: 80, current: results.technicalReadiness - 10, gap: 90 - results.technicalReadiness },
    { skill: "Trend Analysis", required: 75, current: results.wiscarScores.cognitive, gap: 75 - results.wiscarScores.cognitive },
    { skill: "Communication", required: 80, current: results.wiscarScores.realWorldAlignment, gap: 80 - results.wiscarScores.realWorldAlignment },
    { skill: "Business Acumen", required: 70, current: results.wiscarScores.will, gap: 70 - results.wiscarScores.will }
  ];

  const careerRoles = [
    { title: "Demand Planner", description: "Projects future demand across categories", match: results.overallScore },
    { title: "Forecast Analyst", description: "Uses models for predictions", match: results.technicalReadiness },
    { title: "Inventory Optimization Specialist", description: "Ensures product availability", match: results.wiscarScores.cognitive },
    { title: "Supply Planner", description: "Balances supply based on demand", match: results.wiscarScores.realWorldAlignment },
    { title: "S&OP Coordinator", description: "Bridges planning between teams", match: results.wiscarScores.will }
  ];

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-6xl mx-auto">
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
          
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Your Assessment Results
            </h1>
            <p className="text-muted-foreground">
              Comprehensive analysis of your readiness for Forecasting & Demand Planning
            </p>
          </div>
        </div>

        {/* Main Recommendation */}
        <Card className={`mb-8 border-2 ${getRecommendationColor(results.recommendation)}`}>
          <CardContent className="p-8">
            <div className="flex items-center justify-center space-x-4 mb-6">
              {getRecommendationIcon(results.recommendation)}
              <div className="text-center">
                <h2 className="text-2xl font-bold">
                  {results.recommendation === "Yes" && "You're Ready!"}
                  {results.recommendation === "Maybe" && "You're Almost There!"}
                  {results.recommendation === "No" && "Consider Alternatives"}
                </h2>
                <p className="text-lg text-muted-foreground">
                  Overall Confidence Score: {results.confidenceScore}%
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">{results.psychologicalFit}%</div>
                <p className="text-sm text-muted-foreground">Psychological Fit</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">{results.technicalReadiness}%</div>
                <p className="text-sm text-muted-foreground">Technical Readiness</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">{results.overallScore}%</div>
                <p className="text-sm text-muted-foreground">Overall Score</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* WISCAR Framework */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="w-5 h-5" />
                <span>WISCAR Framework Analysis</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(results.wiscarScores).map(([key, value]) => (
                <div key={key} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="capitalize text-sm font-medium">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <span className="text-sm font-medium">{Math.round(value)}%</span>
                  </div>
                  <Progress value={value} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Skills Gap Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5" />
                <span>Skills Gap Analysis</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {skillsData.map((skill, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">{skill.skill}</span>
                    <Badge variant={skill.gap <= 0 ? "default" : skill.gap <= 20 ? "secondary" : "outline"}>
                      {skill.gap <= 0 ? "✓" : `${skill.gap} gap`}
                    </Badge>
                  </div>
                  <div className="flex space-x-2">
                    <div className="flex-1">
                      <div className="text-xs text-muted-foreground">Current: {skill.current}%</div>
                      <Progress value={skill.current} className="h-2" />
                    </div>
                    <div className="w-16 text-xs text-muted-foreground">
                      Req: {skill.required}%
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Career Matches */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5" />
              <span>Top Career Matches</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {careerRoles.map((role, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">{role.title}</h4>
                  <p className="text-sm text-muted-foreground mb-3">{role.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs">Match</span>
                    <Badge variant={role.match >= 80 ? "default" : role.match >= 60 ? "secondary" : "outline"}>
                      {Math.round(role.match)}%
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Next Steps & Recommendations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {results.recommendation === "Yes" && (
              <div className="space-y-3">
                <h4 className="font-semibold text-success">You're ready to pursue forecasting roles!</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Start applying for entry-level Demand Planner or Forecast Analyst positions</li>
                  <li>Consider advanced training in specific forecasting software (SAP IBP, Oracle ASCP)</li>
                  <li>Build a portfolio with Excel-based forecasting projects</li>
                </ul>
              </div>
            )}
            
            {results.recommendation === "Maybe" && (
              <div className="space-y-3">
                <h4 className="font-semibold text-warning">You have potential but need some development</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Take an Excel for Business Analytics course</li>
                  <li>Study supply chain fundamentals</li>
                  <li>Practice with forecasting case studies</li>
                  <li>Consider starting in related roles like Inventory Coordinator</li>
                </ul>
              </div>
            )}

            {results.recommendation === "No" && (
              <div className="space-y-3">
                <h4 className="font-semibold text-destructive">Consider alternative career paths</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Explore Business Analysis or Operations Support roles</li>
                  <li>Consider customer service or sales roles in supply chain companies</li>
                  <li>Build foundational skills in Excel and data analysis first</li>
                </ul>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
          <Button onClick={() => navigate("/assessment")} variant="outline">
            Retake Assessment
          </Button>
          <Button onClick={() => window.print()}>
            Download Results
          </Button>
          <Button variant="default">
            Explore Learning Paths
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Results;