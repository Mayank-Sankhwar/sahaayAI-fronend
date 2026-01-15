import { Cloud, Sun, Droplets, Wind, ThermometerSun } from "lucide-react";

export function WeatherWidget() {
  // Mock weather data - in production, fetch from weather API
  const weather = {
    temp: 24,
    condition: "Partly Cloudy",
    humidity: 65,
    wind: 12,
    high: 28,
    low: 18,
  };

  return (
    <div 
      className="bg-primary-foreground/10 backdrop-blur-sm p-5 rounded-2xl"
      role="region"
      aria-label="Current weather conditions"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium text-primary-foreground/70 uppercase tracking-wide">
            Today's Weather
          </p>
          <div className="flex items-baseline gap-1 mt-1">
            <span 
              className="text-5xl font-display font-bold text-primary-foreground"
              aria-label={`Temperature ${weather.temp} degrees celsius`}
            >
              {weather.temp}°
            </span>
            <span className="text-primary-foreground/60 text-lg">C</span>
          </div>
          <p className="text-sm mt-1 text-primary-foreground/80 font-medium">
            {weather.condition}
          </p>
        </div>
        
        {/* Weather icon */}
        <div 
          className="w-20 h-20 bg-primary-foreground/15 rounded-2xl flex items-center justify-center animate-float"
          aria-hidden="true"
        >
          <Sun className="w-10 h-10 text-accent absolute" />
          <Cloud className="w-8 h-8 text-primary-foreground mt-4 ml-3" />
        </div>
      </div>
      
      {/* Weather details */}
      <div 
        className="flex gap-4 mt-5 pt-4 border-t border-primary-foreground/15"
        role="list"
        aria-label="Weather details"
      >
        <div className="flex items-center gap-2" role="listitem">
          <div className="w-8 h-8 rounded-lg bg-primary-foreground/10 flex items-center justify-center">
            <Droplets className="w-4 h-4 text-primary-foreground/80" aria-hidden="true" />
          </div>
          <div>
            <span className="text-xs text-primary-foreground/60 block">Humidity</span>
            <span className="text-sm font-semibold text-primary-foreground">{weather.humidity}%</span>
          </div>
        </div>
        <div className="flex items-center gap-2" role="listitem">
          <div className="w-8 h-8 rounded-lg bg-primary-foreground/10 flex items-center justify-center">
            <Wind className="w-4 h-4 text-primary-foreground/80" aria-hidden="true" />
          </div>
          <div>
            <span className="text-xs text-primary-foreground/60 block">Wind</span>
            <span className="text-sm font-semibold text-primary-foreground">{weather.wind} km/h</span>
          </div>
        </div>
        <div className="flex items-center gap-2" role="listitem">
          <div className="w-8 h-8 rounded-lg bg-primary-foreground/10 flex items-center justify-center">
            <ThermometerSun className="w-4 h-4 text-primary-foreground/80" aria-hidden="true" />
          </div>
          <div>
            <span className="text-xs text-primary-foreground/60 block">H/L</span>
            <span className="text-sm font-semibold text-primary-foreground">{weather.high}°/{weather.low}°</span>
          </div>
        </div>
      </div>
    </div>
  );
}
