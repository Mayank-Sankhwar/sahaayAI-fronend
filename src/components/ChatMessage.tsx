import { cn } from "@/lib/utils";
import { User, Leaf, Volume2 } from "lucide-react";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
  onSpeak?: (text: string) => void;
  isSpeaking?: boolean;
}

export function ChatMessage({ message, onSpeak, isSpeaking }: ChatMessageProps) {
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
        <div className="flex items-center justify-between mt-2">
          <time
            dateTime={message.timestamp.toISOString()}
            className={cn(
              "text-xs font-medium",
              isUser ? "text-primary-foreground/60" : "text-muted-foreground"
            )}
          >
            {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </time>
          
          {/* Speak button for assistant messages */}
          {!isUser && onSpeak && (
            <button
              onClick={() => onSpeak(message.content)}
              disabled={isSpeaking}
              className={cn(
                "flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium transition-colors",
                "hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring",
                isSpeaking ? "bg-muted text-muted-foreground" : "bg-primary/10 text-primary hover:bg-primary/20"
              )}
              aria-label={`Speak message: ${message.content}`}
            >
              <Volume2 className="w-3 h-3" />
              {isSpeaking ? "Speaking..." : "Speak"}
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
