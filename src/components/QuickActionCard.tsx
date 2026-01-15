import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { useState } from "react";

interface QuickActionCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  color?: string;
  bgColor?: string;
  textColor?: string;
  onClick?: () => void;
  delay?: number;
}

export function QuickActionCard({
  icon: Icon,
  title,
  description,
  color = "from-primary to-primary",
  bgColor = "bg-primary/10",
  textColor = "text-primary",
  onClick,
  delay = 0
}: QuickActionCardProps) {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <button
      onClick={onClick}
      onTouchStart={() => setIsPressed(true)}
      onTouchEnd={() => setIsPressed(false)}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      role="listitem"
      aria-label={`${title}: ${description}`}
      className={cn(
        "group relative flex flex-col items-center text-center p-5 rounded-3xl",
        "bg-white border-2 border-gray-100 shadow-soft overflow-hidden",
        "transition-all duration-300 ease-out",
        "hover:shadow-elevated hover:scale-[1.03] hover:-translate-y-1",
        "active:scale-[0.97]",
        "focus:outline-none focus:ring-4 focus:ring-primary/30 focus:ring-offset-2",
        "animate-slide-up",
        isPressed && "scale-95"
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div
        className={cn(
          "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300",
          bgColor
        )}
      />

      <div className="relative z-10 flex flex-col items-center">
        <div
          className={cn(
            "w-16 h-16 rounded-2xl flex items-center justify-center mb-3",
            "bg-gradient-to-br shadow-lg transform transition-all duration-300",
            "group-hover:scale-110 group-hover:rotate-3",
            "group-active:scale-100",
            color
          )}
          aria-hidden="true"
        >
          <Icon className="w-8 h-8 text-white" />
        </div>
        <h3 className={cn(
          "font-display font-bold text-lg transition-colors duration-300",
          "text-gray-800 group-hover:text-gray-900"
        )}>
          {title}
        </h3>
        <p className={cn(
          "text-sm mt-1 leading-relaxed transition-colors duration-300",
          "text-gray-500 group-hover:text-gray-600"
        )}>
          {description}
        </p>
      </div>
    </button>
  );
}
