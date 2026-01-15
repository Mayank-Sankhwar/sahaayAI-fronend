import { cn } from "@/lib/utils";
import { Mic, MicOff, Loader2 } from "lucide-react";

interface VoiceButtonProps {
  isConnected: boolean;
  isConnecting: boolean;
  isSpeaking: boolean;
  onClick: () => void;
}

export function VoiceButton({ isConnected, isConnecting, isSpeaking, onClick }: VoiceButtonProps) {
  const getAriaLabel = () => {
    if (isConnecting) return "Connecting to voice assistant, please wait";
    if (isConnected) {
      if (isSpeaking) return "Assistant is speaking. Tap to stop conversation";
      return "Listening for your voice. Tap to stop conversation";
    }
    return "Tap to start voice conversation";
  };

  return (
    <button
      onClick={onClick}
      disabled={isConnecting}
      aria-label={getAriaLabel()}
      aria-busy={isConnecting}
      className={cn(
        "relative w-28 h-28 rounded-full transition-all duration-300",
        "flex items-center justify-center",
        "focus:outline-none focus:ring-4 focus:ring-primary/40",
        isConnected 
          ? "bg-gradient-nature shadow-glow" 
          : "bg-gradient-nature shadow-button",
        isConnecting && "opacity-70 cursor-wait",
        !isConnected && !isConnecting && "animate-voice-pulse"
      )}
    >
      {/* Outer ripple rings when connected */}
      {isConnected && !isConnecting && (
        <>
          <span 
            className="absolute inset-[-16px] rounded-full border-2 border-primary/20 animate-ripple"
            aria-hidden="true"
          />
          <span 
            className="absolute inset-[-8px] rounded-full border-2 border-primary/30 animate-pulse"
            aria-hidden="true"
          />
        </>
      )}

      {/* Speaking indicator ring */}
      {isSpeaking && (
        <span 
          className="absolute inset-0 rounded-full bg-accent/30 animate-ping"
          aria-hidden="true"
        />
      )}

      {/* Inner glow effect */}
      <span 
        className={cn(
          "absolute inset-2 rounded-full transition-all duration-300",
          isConnected ? "bg-primary-foreground/10" : "bg-primary-foreground/5"
        )}
        aria-hidden="true"
      />
      
      {/* Icon */}
      <span className="relative z-10">
        {isConnecting ? (
          <Loader2 
            className="w-10 h-10 text-primary-foreground animate-spin" 
            aria-hidden="true"
          />
        ) : isConnected ? (
          <MicOff 
            className="w-10 h-10 text-primary-foreground" 
            aria-hidden="true"
          />
        ) : (
          <Mic 
            className="w-10 h-10 text-primary-foreground" 
            aria-hidden="true"
          />
        )}
      </span>
    </button>
  );
}
