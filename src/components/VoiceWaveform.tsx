import { cn } from "@/lib/utils";

interface VoiceWaveformProps {
  isActive: boolean;
  isSpeaking: boolean;
}

export function VoiceWaveform({ isActive, isSpeaking }: VoiceWaveformProps) {
  if (!isActive) return null;

  return (
    <div 
      className="flex items-center justify-center gap-1.5 h-10 mt-5"
      role="img"
      aria-label={isSpeaking ? "Assistant is speaking" : "Listening for your voice"}
    >
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className={cn(
            "w-1.5 rounded-full transition-all duration-200",
            isSpeaking ? "bg-accent" : "bg-primary",
            i === 0 && "animate-wave",
            i === 1 && "animate-wave-delay-1",
            i === 2 && "animate-wave-delay-2",
            i === 3 && "animate-wave-delay-3",
            i === 4 && "animate-wave-delay-2",
            i === 5 && "animate-wave-delay-1",
            i === 6 && "animate-wave"
          )}
          style={{
            height: isActive ? undefined : "8px",
          }}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}
