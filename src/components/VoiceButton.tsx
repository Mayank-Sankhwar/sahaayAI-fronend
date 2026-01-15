import { cn } from "@/lib/utils";
import { Mic, MicOff, Loader2 } from "lucide-react";
import { useState } from "react";

interface VoiceButtonProps {
  isConnected: boolean;
  isConnecting: boolean;
  isSpeaking: boolean;
  onClick: () => void;
}

export function VoiceButton({ isConnected, isConnecting, isSpeaking, onClick }: VoiceButtonProps) {
  const [isPressed, setIsPressed] = useState(false);

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
      onTouchStart={() => setIsPressed(true)}
      onTouchEnd={() => setIsPressed(false)}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      disabled={isConnecting}
      aria-label={getAriaLabel()}
      aria-busy={isConnecting}
      className={cn(
        "relative w-32 h-32 rounded-full transition-all duration-500 ease-out",
        "flex items-center justify-center",
        "focus:outline-none focus:ring-4 focus:ring-primary/40",
        "transform",
        isConnected
          ? "bg-gradient-to-br from-green-400 via-green-500 to-emerald-600 shadow-glow scale-105"
          : "bg-gradient-to-br from-primary via-green-600 to-green-700 shadow-button hover:shadow-glow hover:scale-110",
        isConnecting && "opacity-70 cursor-wait",
        !isConnected && !isConnecting && "animate-voice-pulse",
        isPressed && "scale-95",
        isSpeaking && "shadow-[0_0_60px_rgba(251,191,36,0.5)]"
      )}
    >
      {/* Outer ripple rings when connected */}
      {isConnected && !isConnecting && (
        <>
          <span
            className="absolute inset-[-20px] rounded-full border-3 border-green-400/30 animate-ripple"
            aria-hidden="true"
          />
          <span
            className="absolute inset-[-10px] rounded-full border-3 border-green-400/40 animate-pulse"
            aria-hidden="true"
          />
        </>
      )}

      {/* Speaking indicator ring */}
      {isSpeaking && (
        <>
          <span
            className="absolute inset-0 rounded-full bg-amber-400/30 animate-ping"
            aria-hidden="true"
          />
          <span
            className="absolute inset-[-5px] rounded-full bg-amber-300/20 animate-pulse"
            aria-hidden="true"
          />
        </>
      )}

      {/* Inner glow effect */}
      <span
        className={cn(
          "absolute inset-3 rounded-full transition-all duration-500",
          "backdrop-blur-sm",
          isConnected ? "bg-white/20" : "bg-white/10"
        )}
        aria-hidden="true"
      />

      {/* Icon */}
      <span className={cn(
        "relative z-10 transition-transform duration-300",
        isPressed && "scale-90"
      )}>
        {isConnecting ? (
          <Loader2
            className="w-12 h-12 text-white animate-spin drop-shadow-lg"
            aria-hidden="true"
          />
        ) : isConnected ? (
          <div className="relative">
            <div className="absolute inset-0 bg-white/30 blur-xl rounded-full" />
            <MicOff
              className="w-12 h-12 text-white drop-shadow-lg relative z-10"
              aria-hidden="true"
            />
          </div>
        ) : (
          <div className="relative">
            <div className="absolute inset-0 bg-white/30 blur-xl rounded-full" />
            <Mic
              className="w-12 h-12 text-white drop-shadow-lg relative z-10 animate-bounce-subtle"
              aria-hidden="true"
            />
          </div>
        )}
      </span>
    </button>
  );
}
