import { cn } from "@/lib/utils";

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  steps: string[];
  className?: string;
}

export function ProgressIndicator({ currentStep, totalSteps, steps, className }: ProgressIndicatorProps) {
  return (
    <div className={cn("w-full mb-8", className)}>
      <div className="flex items-center justify-between mb-4">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center">
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300",
                index < currentStep
                  ? "bg-gradient-primary text-white shadow-medium"
                  : index === currentStep
                  ? "bg-gradient-secondary text-white shadow-medium animate-pulse"
                  : "bg-secondary text-muted-foreground"
              )}
            >
              {index + 1}
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "h-0.5 w-16 mx-2 transition-all duration-300",
                  index < currentStep ? "bg-primary" : "bg-secondary"
                )}
              />
            )}
          </div>
        ))}
      </div>
      <div className="w-full bg-secondary rounded-full h-2">
        <div
          className="bg-gradient-primary h-2 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>
      <div className="text-sm text-muted-foreground mt-2 text-center">
        Step {currentStep + 1} of {totalSteps}: {steps[currentStep]}
      </div>
    </div>
  );
}