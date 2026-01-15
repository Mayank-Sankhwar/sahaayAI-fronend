import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface QuickActionCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  onClick?: () => void;
  delay?: number;
}

export function QuickActionCard({ 
  icon: Icon, 
  title, 
  description, 
  onClick,
  delay = 0
}: QuickActionCardProps) {
  return (
    <button
      onClick={onClick}
      role="listitem"
      aria-label={`${title}: ${description}`}
      className={cn(
        "flex flex-col items-center text-center p-5 rounded-3xl",
        "bg-card border border-border shadow-soft",
        "transition-all duration-200",
        "hover:shadow-elevated hover:scale-[1.02]",
        "active:scale-[0.98]",
        "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
        "animate-slide-up"
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div
        className={cn(
          "w-14 h-14 rounded-2xl flex items-center justify-center mb-3",
          "bg-gradient-nature shadow-soft"
        )}
        aria-hidden="true"
      >
        <Icon className="w-7 h-7 text-primary-foreground" />
      </div>
      <h3 className="font-display font-bold text-base text-foreground">
        {title}
      </h3>
      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
        {description}
      </p>
    </button>
  );
}
