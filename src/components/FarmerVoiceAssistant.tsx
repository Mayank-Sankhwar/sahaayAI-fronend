import { useState, useCallback, useRef, useEffect } from "react";
import { useConversation } from "@elevenlabs/react";
import { VoiceButton } from "./VoiceButton";
import { VoiceWaveform } from "./VoiceWaveform";
import { ChatMessage, Message } from "./ChatMessage";
import { QuickActionCard } from "./QuickActionCard";
import { WeatherWidget } from "./WeatherWidget";
import { AccessibilityToolbar } from "./AccessibilityToolbar";
import { useToast } from "@/hooks/use-toast";
import { 
  Sprout, 
  CloudRain, 
  Bug, 
  Calendar,
  Leaf,
  Settings,
  HelpCircle
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

const QUICK_PROMPTS = [
  { icon: CloudRain, title: "Weather", description: "Get today's forecast" },
  { icon: Bug, title: "Pest Help", description: "Identify & control pests" },
  { icon: Sprout, title: "Planting", description: "Best planting tips" },
  { icon: Calendar, title: "Harvest", description: "Optimal harvest times" },
];

export function FarmerVoiceAssistant() {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isConnecting, setIsConnecting] = useState(false);
  const [agentId, setAgentId] = useState<string>("");
  const [showAgentInput, setShowAgentInput] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const conversation = useConversation({
    onConnect: () => {
      console.log("Connected to farm assistant");
      toast({
        title: "Connected!",
        description: "Your farm assistant is ready to help.",
      });
    },
    onDisconnect: () => {
      console.log("Disconnected from assistant");
    },
    onMessage: (message: any) => {
      if (message.type === "user_transcript" && message.user_transcription_event?.user_transcript) {
        const newMessage: Message = {
          id: Date.now().toString(),
          role: "user",
          content: message.user_transcription_event.user_transcript,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, newMessage]);
      }
      if (message.type === "agent_response" && message.agent_response_event?.agent_response) {
        const newMessage: Message = {
          id: Date.now().toString() + "-agent",
          role: "assistant",
          content: message.agent_response_event.agent_response,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, newMessage]);
      }
    },
    onError: (error) => {
      console.error("Conversation error:", error);
      toast({
        variant: "destructive",
        title: "Connection Error",
        description: "Failed to connect. Please check your Agent ID.",
      });
      setIsConnecting(false);
    },
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const startConversation = useCallback(async () => {
    if (!agentId.trim()) {
      setShowAgentInput(true);
      toast({
        title: "Agent ID Required",
        description: "Please enter your ElevenLabs Agent ID to start.",
      });
      return;
    }

    setIsConnecting(true);
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      
      await conversation.startSession({
        agentId: agentId.trim(),
        connectionType: "webrtc",
      });
    } catch (error: any) {
      console.error("Failed to start:", error);
      if (error.name === "NotAllowedError") {
        toast({
          variant: "destructive",
          title: "Microphone Access Required",
          description: "Please enable microphone access to use voice features.",
        });
      }
    } finally {
      setIsConnecting(false);
    }
  }, [conversation, agentId, toast]);

  const stopConversation = useCallback(async () => {
    await conversation.endSession();
  }, [conversation]);

  const handleVoiceClick = () => {
    if (conversation.status === "connected") {
      stopConversation();
    } else {
      startConversation();
    }
  };

  const isConnected = conversation.status === "connected";

  return (
    <div 
      className="min-h-screen min-h-[100dvh] bg-gradient-earth flex flex-col"
      role="application"
      aria-label="Farm Voice Assistant"
    >
      {/* Hero Header */}
      <header className="bg-gradient-hero px-6 pt-8 pb-10 safe-area-top rounded-b-[2.5rem] shadow-elevated">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div 
              className="w-12 h-12 bg-primary-foreground/20 backdrop-blur rounded-2xl flex items-center justify-center"
              aria-hidden="true"
            >
              <Leaf className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-display text-xl font-bold text-primary-foreground">
                Farm Assistant
              </h1>
              <p className="text-sm text-primary-foreground/80">
                Voice-powered help
              </p>
            </div>
          </div>
          <button 
            aria-label="Help and settings"
            className="w-11 h-11 rounded-full bg-primary-foreground/15 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary-foreground/50"
          >
            <HelpCircle className="w-5 h-5 text-primary-foreground" aria-hidden="true" />
          </button>
        </div>

        {/* Weather integrated in header */}
        <WeatherWidget />
      </header>

      {/* Agent ID Input */}
      {showAgentInput && !isConnected && (
        <div className="px-5 -mt-4 relative z-10 animate-slide-up">
          <div className="bg-card rounded-3xl p-5 border border-border shadow-elevated">
            <label 
              htmlFor="agent-id-input"
              className="text-base font-display font-semibold text-foreground block mb-3"
            >
              Enter Agent ID
            </label>
            <input
              id="agent-id-input"
              type="text"
              value={agentId}
              onChange={(e) => setAgentId(e.target.value)}
              placeholder="Your ElevenLabs Agent ID..."
              aria-describedby="agent-id-help"
              className={cn(
                "w-full px-5 py-4 rounded-2xl text-base",
                "bg-muted border-2 border-transparent",
                "text-foreground placeholder:text-muted-foreground",
                "focus:outline-none focus:border-primary focus:bg-background",
                "transition-all duration-200"
              )}
            />
            <p id="agent-id-help" className="text-sm text-muted-foreground mt-3">
              Create a public agent at{" "}
              <span className="text-primary font-medium">elevenlabs.io</span>
            </p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col px-5 pt-6 overflow-hidden" role="main">
        {!isConnected && messages.length === 0 ? (
          // Welcome Screen
          <div className="flex-1 flex flex-col animate-fade-in">
            <h2 className="font-display text-lg font-bold text-foreground mb-4">
              How can I help?
            </h2>
            <p className="text-muted-foreground text-sm mb-5">
              Tap a topic or press the button below to speak
            </p>
            
            <div 
              className="grid grid-cols-2 gap-3"
              role="list"
              aria-label="Quick action topics"
            >
              {QUICK_PROMPTS.map((prompt, i) => (
                <QuickActionCard
                  key={i}
                  icon={prompt.icon}
                  title={prompt.title}
                  description={prompt.description}
                  onClick={() => {
                    if (!agentId) setShowAgentInput(true);
                  }}
                  delay={i * 100}
                />
              ))}
            </div>

            {/* Tips section */}
            <div className="mt-6 p-5 bg-secondary/50 rounded-3xl border border-secondary">
              <h3 className="font-display font-semibold text-secondary-foreground mb-2">
                💡 Voice Tips
              </h3>
              <ul className="text-sm text-muted-foreground space-y-1" role="list">
                <li>• Speak clearly and naturally</li>
                <li>• Ask about weather, pests, or planting</li>
                <li>• Tap the microphone to start</li>
              </ul>
            </div>
          </div>
        ) : (
          // Chat Messages
          <ScrollArea className="flex-1 -mx-5 px-5" aria-label="Conversation history">
            <div className="space-y-4 py-4" role="log" aria-live="polite">
              {messages.length === 0 && isConnected && (
                <div className="text-center py-10" role="status">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Leaf className="w-8 h-8 text-primary" aria-hidden="true" />
                  </div>
                  <p className="text-muted-foreground text-base font-medium">
                    I'm listening...
                  </p>
                  <p className="text-muted-foreground/70 text-sm mt-1">
                    Ask me anything about farming
                  </p>
                </div>
              )}
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
        )}
      </main>

      {/* Voice Control Footer */}
      <footer 
        className="px-5 pb-6 pt-4 safe-area-bottom bg-gradient-to-t from-background to-transparent"
        role="region"
        aria-label="Voice controls"
      >
        <div className="flex flex-col items-center">
          <VoiceButton
            isConnected={isConnected}
            isConnecting={isConnecting}
            isSpeaking={conversation.isSpeaking}
            onClick={handleVoiceClick}
          />
          <VoiceWaveform isActive={isConnected} isSpeaking={conversation.isSpeaking} />
          <p 
            className="text-base font-medium text-muted-foreground mt-4 text-center"
            role="status"
            aria-live="polite"
          >
            {isConnecting 
              ? "Connecting..." 
              : isConnected 
                ? conversation.isSpeaking 
                  ? "Assistant speaking..." 
                  : "Listening... Tap to stop"
                : "Tap to start talking"
            }
          </p>
        </div>
      </footer>

      {/* Accessibility Toolbar */}
      <AccessibilityToolbar />
    </div>
  );
}
