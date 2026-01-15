import { Cloud, Sun, Droplets, Wind, ThermometerSun, CloudRain } from "lucide-react";

export function WeatherWidget() {
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
      className="relative bg-white/10 backdrop-blur-md p-6 rounded-3xl shadow-lg border border-white/20 overflow-hidden group hover:shadow-xl transition-shadow duration-300"
      role="region"
      aria-label="Current weather conditions"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative z-10 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-white/80 uppercase tracking-wider mb-2">
            Today's Weather
          </p>
          <div className="flex items-baseline gap-2">
            <span
              className="text-6xl font-display font-bold text-white drop-shadow-lg"
              aria-label={`Temperature ${weather.temp} degrees celsius`}
            >
              {weather.temp}°
            </span>
            <span className="text-white/70 text-2xl font-medium">C</span>
          </div>
          <p className="text-base mt-2 text-white/90 font-medium">
            {weather.condition}
          </p>
        </div>

        <div
          className="relative w-24 h-24 bg-white/15 rounded-3xl flex items-center justify-center animate-float shadow-lg"
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-300/30 to-transparent rounded-3xl" />
          <Sun className="w-12 h-12 text-yellow-300 absolute animate-pulse-slow drop-shadow-glow" />
          <Cloud className="w-10 h-10 text-white mt-6 ml-4 drop-shadow-md" />
        </div>
      </div>

      <div
        className="grid grid-cols-3 gap-3 mt-6 pt-5 border-t border-white/20"
        role="list"
        aria-label="Weather details"
      >
        <div className="flex flex-col items-center p-3 rounded-2xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group/item" role="listitem">
          <div className="w-10 h-10 rounded-xl bg-blue-400/20 flex items-center justify-center mb-2 group-hover/item:scale-110 transition-transform duration-300">
            <Droplets className="w-5 h-5 text-blue-300" aria-hidden="true" />
          </div>
          <span className="text-[10px] text-white/70 block mb-1">Humidity</span>
          <span className="text-base font-bold text-white">{weather.humidity}%</span>
        </div>

        <div className="flex flex-col items-center p-3 rounded-2xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group/item" role="listitem">
          <div className="w-10 h-10 rounded-xl bg-cyan-400/20 flex items-center justify-center mb-2 group-hover/item:scale-110 transition-transform duration-300">
            <Wind className="w-5 h-5 text-cyan-300" aria-hidden="true" />
          </div>
          <span className="text-[10px] text-white/70 block mb-1">Wind</span>
          <span className="text-base font-bold text-white">{weather.wind} km/h</span>
        </div>

        <div className="flex flex-col items-center p-3 rounded-2xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group/item" role="listitem">
          <div className="w-10 h-10 rounded-xl bg-orange-400/20 flex items-center justify-center mb-2 group-hover/item:scale-110 transition-transform duration-300">
            <ThermometerSun className="w-5 h-5 text-orange-300" aria-hidden="true" />
          </div>
          <span className="text-[10px] text-white/70 block mb-1">High/Low</span>
          <span className="text-base font-bold text-white">{weather.high}°/{weather.low}°</span>
        </div>
      </div>
    </div>
  );
}
