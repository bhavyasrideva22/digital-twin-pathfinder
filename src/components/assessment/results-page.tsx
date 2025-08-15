import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface ResultsPageProps {
  results: AssessmentResults;
  onRestart: () => void;
}

export interface AssessmentResults {
  psychometric: {
    fitScore: number;
    interest: number;
    grit: number;
    conscientiousness: number;
    openness: number;
    motivation: number;
  };
  technical: {
    readinessScore: number;
    logicScore: number;
    mathScore: number;
    domainKnowledge: number;
    programmingLevel: string;
    dataAnalysisLevel: string;
  };
  wiscar: {
    will: number;
    interest: number;
    skill: number;
    cognitive: number;
    ability: number;
    realWorld: number;
  };
  recommendation: {
    shouldPursue: 'Yes' | 'Maybe' | 'No';
    confidenceScore: number;
    reasoning: string;
    nextSteps: string[];
    alternativePaths: string[];
  };
}

const ScoreCard = ({ title, score, description, color = "primary" }: {
  title: string;
  score: number;
  description: string;
  color?: string;
}) => (
  <Card className="bg-gradient-card shadow-medium border-0">
    <CardHeader className="pb-2">
      <CardTitle className="text-lg">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold">{score}%</span>
          <Badge variant={score >= 70 ? "default" : score >= 55 ? "secondary" : "destructive"}>
            {score >= 70 ? "Strong" : score >= 55 ? "Moderate" : "Developing"}
          </Badge>
        </div>
        <Progress value={score} className="h-2" />
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </CardContent>
  </Card>
);

export function ResultsPage({ results, onRestart }: ResultsPageProps) {
  const { psychometric, technical, wiscar, recommendation } = results;

  const getRecommendationColor = (shouldPursue: string) => {
    switch (shouldPursue) {
      case 'Yes': return 'bg-success text-success-foreground';
      case 'Maybe': return 'bg-warning text-warning-foreground';
      case 'No': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-primary text-primary-foreground';
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <div className="text-6xl mb-4">
          {recommendation.shouldPursue === 'Yes' ? '🎉' : 
           recommendation.shouldPursue === 'Maybe' ? '🤔' : '💭'}
        </div>
        <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Your Assessment Results
        </h1>
        <div className={`inline-flex items-center px-6 py-3 rounded-full text-lg font-semibold ${getRecommendationColor(recommendation.shouldPursue)}`}>
          Recommendation: {recommendation.shouldPursue}
        </div>
      </div>

      <Card className="bg-gradient-hero shadow-strong border-0 text-white">
        <CardHeader>
          <CardTitle className="text-2xl">🎯 Overall Confidence Score</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <span className="text-4xl font-bold">{recommendation.confidenceScore}%</span>
            <Badge 
              variant="secondary" 
              className="text-lg px-4 py-2 bg-white/20 text-white border-white/30"
            >
              {recommendation.confidenceScore >= 70 ? "High Confidence" : 
               recommendation.confidenceScore >= 55 ? "Moderate Confidence" : "Low Confidence"}
            </Badge>
          </div>
          <Progress value={recommendation.confidenceScore} className="h-3 mb-4" />
          <p className="text-lg leading-relaxed">{recommendation.reasoning}</p>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ScoreCard
          title="🧠 Psychological Fit"
          score={psychometric.fitScore}
          description="Interest, motivation, and personality alignment with Digital Twin engineering"
        />
        <ScoreCard
          title="⚙️ Technical Readiness"
          score={technical.readinessScore}
          description="Programming, math, and domain knowledge foundation"
        />
        <ScoreCard
          title="🎯 Overall Readiness"
          score={recommendation.confidenceScore}
          description="Combined assessment of all factors"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="bg-gradient-card shadow-medium border-0">
          <CardHeader>
            <CardTitle>📊 WISCAR Framework Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(wiscar).map(([key, value]) => (
                <div key={key} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium capitalize">
                      {key === 'realWorld' ? 'Real-World Alignment' : key}
                    </span>
                    <span className="font-bold">{value}%</span>
                  </div>
                  <Progress value={value} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-medium border-0">
          <CardHeader>
            <CardTitle>🎓 Detailed Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold">Interest Level</h4>
                <p className="text-sm text-muted-foreground">{psychometric.interest}% - {psychometric.interest >= 80 ? "Very High" : psychometric.interest >= 60 ? "High" : "Moderate"}</p>
              </div>
              <div>
                <h4 className="font-semibold">Programming Level</h4>
                <p className="text-sm text-muted-foreground">{technical.programmingLevel}</p>
              </div>
              <div>
                <h4 className="font-semibold">Data Analysis Level</h4>
                <p className="text-sm text-muted-foreground">{technical.dataAnalysisLevel}</p>
              </div>
              <div>
                <h4 className="font-semibold">Domain Knowledge</h4>
                <p className="text-sm text-muted-foreground">{technical.domainKnowledge}% understanding</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {recommendation.nextSteps.length > 0 && (
        <Card className="bg-gradient-secondary shadow-medium border-0 text-white">
          <CardHeader>
            <CardTitle>🚀 Recommended Next Steps</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {recommendation.nextSteps.map((step, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="font-bold text-white/80">{index + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      <div className="text-center">
        <Button
          onClick={onRestart}
          variant="outline"
          size="lg"
          className="px-8 py-3"
        >
          Take Assessment Again
        </Button>
      </div>
    </div>
  );
}