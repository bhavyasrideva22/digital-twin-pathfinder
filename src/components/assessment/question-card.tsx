import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface QuestionCardProps {
  question: string;
  children: ReactNode;
  onNext?: () => void;
  onPrevious?: () => void;
  canNext?: boolean;
  canPrevious?: boolean;
  questionNumber?: number;
  totalQuestions?: number;
  className?: string;
}

export function QuestionCard({
  question,
  children,
  onNext,
  onPrevious,
  canNext = false,
  canPrevious = false,
  questionNumber,
  totalQuestions,
  className
}: QuestionCardProps) {
  return (
    <Card className={cn("bg-gradient-card shadow-medium border-0", className)}>
      <CardHeader className="pb-4">
        {questionNumber && totalQuestions && (
          <div className="text-sm text-muted-foreground mb-2">
            Question {questionNumber} of {totalQuestions}
          </div>
        )}
        <CardTitle className="text-lg leading-relaxed">{question}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {children}
        <div className="flex justify-between pt-4">
          <Button
            variant="outline"
            onClick={onPrevious}
            disabled={!canPrevious}
            className="min-w-24"
          >
            Previous
          </Button>
          <Button
            onClick={onNext}
            disabled={!canNext}
            className="min-w-24 bg-gradient-primary border-0 shadow-medium hover:shadow-strong transition-all duration-300"
          >
            Next
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}