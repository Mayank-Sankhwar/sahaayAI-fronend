import { cn } from "@/lib/utils";
import { User, Leaf } from "lucide-react";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <article
      className={cn(
        "flex gap-3 p-4 rounded-3xl max-w-[90%] animate-slide-up",
        isUser 
          ? "ml-auto bg-gradient-nature text-primary-foreground shadow-button" 
          : "mr-auto bg-card shadow-elevated border border-border"
      )}
      role="article"
      aria-label={`${isUser ? 'You said' : 'Assistant said'}: ${message.content}`}
    >
      {/* Avatar */}
      <div
        className={cn(
          "w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0",
          isUser 
            ? "bg-primary-foreground/20" 
            : "bg-gradient-nature"
        )}
        aria-hidden="true"
      >
        {isUser ? (
          <User className="w-5 h-5" />
        ) : (
          <Leaf className="w-5 h-5 text-primary-foreground" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className={cn(
          "text-base leading-relaxed break-words",
          isUser ? "text-primary-foreground" : "text-foreground"
        )}>
          {message.content}
        </p>
        <time
          dateTime={message.timestamp.toISOString()}
          className={cn(
            "text-xs mt-2 block font-medium",
            isUser ? "text-primary-foreground/60" : "text-muted-foreground"
          )}
        >
          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </time>
      </div>
    </article>
  );
}
