import { cn } from "@/lib/utils";

interface MultipleChoiceProps {
  options: string[];
  value: string | null;
  onChange: (value: string) => void;
  className?: string;
}

export function MultipleChoice({ options, value, onChange, className }: MultipleChoiceProps) {
  return (
    <div className={cn("space-y-3", className)}>
      {options.map((option, index) => (
        <button
          key={index}
          onClick={() => onChange(option)}
          className={cn(
            "w-full p-4 rounded-lg border text-left transition-all duration-200",
            "hover:shadow-soft hover:scale-[1.02]",
            value === option
              ? "bg-gradient-primary text-white border-primary shadow-medium"
              : "bg-card border-border hover:border-primary/50"
          )}
        >
          <div className="flex items-center space-x-3">
            <div
              className={cn(
                "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                value === option
                  ? "border-white bg-white"
                  : "border-muted-foreground"
              )}
            >
              {value === option && (
                <div className="w-2 h-2 rounded-full bg-primary" />
              )}
            </div>
            <span className="font-medium">{option}</span>
          </div>
        </button>
      ))}
    </div>
  );
}