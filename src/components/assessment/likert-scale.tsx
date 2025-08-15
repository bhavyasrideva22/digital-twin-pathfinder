import { cn } from "@/lib/utils";

interface LikertScaleProps {
  value: number | null;
  onChange: (value: number) => void;
  labels?: string[];
  className?: string;
}

const defaultLabels = [
  "Strongly Disagree",
  "Disagree", 
  "Neutral",
  "Agree",
  "Strongly Agree"
];

export function LikertScale({ value, onChange, labels = defaultLabels, className }: LikertScaleProps) {
  return (
    <div className={cn("space-y-4", className)}>
      <div className="grid grid-cols-5 gap-2">
        {labels.map((label, index) => (
          <button
            key={index}
            onClick={() => onChange(index + 1)}
            className={cn(
              "p-3 rounded-lg border text-sm font-medium transition-all duration-200",
              "hover:shadow-soft hover:scale-105",
              value === index + 1
                ? "bg-gradient-primary text-white border-primary shadow-medium"
                : "bg-card border-border hover:border-primary/50"
            )}
          >
            <div className="font-semibold mb-1">{index + 1}</div>
            <div className="text-xs">{label}</div>
          </button>
        ))}
      </div>
      <div className="flex justify-between text-xs text-muted-foreground px-1">
        <span>1 - {labels[0]}</span>
        <span>5 - {labels[4]}</span>
      </div>
    </div>
  );
}