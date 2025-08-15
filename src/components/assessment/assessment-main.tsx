import { useState } from "react";
import { AssessmentIntro } from "./assessment-intro";
import { QuestionCard } from "./question-card";
import { LikertScale } from "./likert-scale";
import { MultipleChoice } from "./multiple-choice";
import { ResultsPage, AssessmentResults } from "./results-page";
import { ProgressIndicator } from "@/components/ui/progress-indicator";
import { assessmentQuestions, sectionInfo } from "@/data/assessment-questions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type AssessmentPhase = 'intro' | 'questions' | 'results';

export function AssessmentMain() {
  const [phase, setPhase] = useState<AssessmentPhase>('intro');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  
  const currentQuestion = assessmentQuestions[currentQuestionIndex];
  const currentSection = currentQuestion?.category;
  const sectionQuestions = assessmentQuestions.filter(q => q.category === currentSection);
  const questionIndexInSection = sectionQuestions.findIndex(q => q.id === currentQuestion?.id) + 1;

  const steps = ['Introduction', 'Personality Assessment', 'Technical Assessment', 'Results'];
  const getCurrentStep = () => {
    if (phase === 'intro') return 0;
    if (phase === 'questions') {
      if (currentSection === 'psychometric') return 1;
      if (currentSection === 'technical') return 2;
    }
    return 3;
  };

  const handleAnswer = (value: any) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: value
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < assessmentQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Calculate results and move to results phase
      const results = calculateResults(answers);
      setPhase('results');
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const calculateResults = (answers: Record<string, any>): AssessmentResults => {
    // Psychometric scoring
    const psychometricAnswers = Object.entries(answers).filter(([id]) => id.startsWith('psych_'));
    const psychometricAvg = psychometricAnswers.reduce((sum, [_, value]) => sum + (typeof value === 'number' ? value : 3), 0) / psychometricAnswers.length;
    const psychometricScore = Math.round(((psychometricAvg - 1) / 4) * 100);

    // Technical scoring
    const technicalAnswers = Object.entries(answers).filter(([id]) => id.startsWith('tech_'));
    let technicalScore = 0;
    let totalTechnicalPoints = 0;

    technicalAnswers.forEach(([id, answer]) => {
      const question = assessmentQuestions.find(q => q.id === id);
      if (question?.points && question.correctAnswer) {
        totalTechnicalPoints += question.points;
        if (answer === question.correctAnswer) {
          technicalScore += question.points;
        }
      }
    });

    const technicalPercentage = totalTechnicalPoints > 0 ? Math.round((technicalScore / totalTechnicalPoints) * 100) : 50;

    // WISCAR calculation (simplified)
    const wiscarScores = {
      will: Math.min(100, psychometricScore + 10),
      interest: psychometricScore,
      skill: technicalPercentage,
      cognitive: Math.min(100, technicalPercentage + 15),
      ability: Math.min(100, psychometricScore + 5),
      realWorld: Math.round((psychometricScore + technicalPercentage) / 2)
    };

    const overallScore = Math.round(Object.values(wiscarScores).reduce((sum, score) => sum + score, 0) / 6);

    // Recommendation logic
    let shouldPursue: 'Yes' | 'Maybe' | 'No' = 'No';
    let reasoning = '';

    if (overallScore >= 70) {
      shouldPursue = 'Yes';
      reasoning = 'You have strong interest, good learning potential, and sufficient technical foundation to begin a career in Digital Twin engineering.';
    } else if (overallScore >= 55) {
      shouldPursue = 'Maybe';
      reasoning = 'You show potential but may need to develop stronger foundations in some areas before pursuing this career path.';
    } else {
      shouldPursue = 'No';
      reasoning = 'While you have some relevant interests, significant skill development would be needed to successfully pursue this career path.';
    }

    return {
      psychometric: {
        fitScore: psychometricScore,
        interest: Math.round(psychometricScore * 1.1),
        grit: Math.round(psychometricScore * 0.9),
        conscientiousness: Math.round(psychometricScore * 1.05),
        openness: Math.round(psychometricScore * 1.15),
        motivation: psychometricScore
      },
      technical: {
        readinessScore: technicalPercentage,
        logicScore: Math.round(technicalPercentage * 1.1),
        mathScore: Math.round(technicalPercentage * 0.9),
        domainKnowledge: technicalPercentage,
        programmingLevel: answers.tech_6 || 'Basic syntax knowledge',
        dataAnalysisLevel: answers.tech_9 || 'Basic charts and graphs'
      },
      wiscar: wiscarScores,
      recommendation: {
        shouldPursue,
        confidenceScore: overallScore,
        reasoning,
        nextSteps: [
          'Start learning system modeling in Python or MATLAB',
          'Explore Azure Digital Twins basics',
          'Build a mini-project simulating a smart city component',
          'Take online courses in IoT fundamentals'
        ],
        alternativePaths: []
      }
    };
  };

  const isCurrentAnswered = currentQuestion && answers[currentQuestion.id] !== undefined;

  if (phase === 'intro') {
    return <AssessmentIntro onStart={() => setPhase('questions')} />;
  }

  if (phase === 'results') {
    const results = calculateResults(answers);
    return <ResultsPage results={results} onRestart={() => {
      setPhase('intro');
      setCurrentQuestionIndex(0);
      setAnswers({});
    }} />;
  }

  // Check if we're starting a new section
  const isNewSection = currentQuestionIndex === 0 || 
    assessmentQuestions[currentQuestionIndex - 1]?.category !== currentSection;

  if (isNewSection && currentSection) {
    const section = sectionInfo[currentSection as keyof typeof sectionInfo];
    return (
      <div className="max-w-4xl mx-auto space-y-8">
        <ProgressIndicator
          currentStep={getCurrentStep()}
          totalSteps={4}
          steps={steps}
        />
        
        <Card className="bg-gradient-secondary shadow-strong border-0 text-white text-center">
          <CardHeader>
            <div className="text-4xl mb-2">{section.icon}</div>
            <CardTitle className="text-2xl">{section.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg leading-relaxed mb-6">{section.description}</p>
            <button
              onClick={() => {/* Already on the right question */}}
              className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300"
            >
              Begin Section →
            </button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <ProgressIndicator
        currentStep={getCurrentStep()}
        totalSteps={4}
        steps={steps}
      />

      <QuestionCard
        question={currentQuestion.text}
        onNext={handleNext}
        onPrevious={handlePrevious}
        canNext={isCurrentAnswered}
        canPrevious={currentQuestionIndex > 0}
        questionNumber={questionIndexInSection}
        totalQuestions={sectionQuestions.length}
      >
        {currentQuestion.type === 'likert' && (
          <LikertScale
            value={answers[currentQuestion.id] || null}
            onChange={(value) => handleAnswer(value)}
          />
        )}
        
        {currentQuestion.type === 'multiple-choice' && currentQuestion.options && (
          <MultipleChoice
            options={currentQuestion.options}
            value={answers[currentQuestion.id] || null}
            onChange={(value) => handleAnswer(value)}
          />
        )}
      </QuestionCard>
    </div>
  );
}