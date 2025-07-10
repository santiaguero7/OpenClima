import { useState, useEffect } from 'react';
import { Clock, Calendar } from 'lucide-react';

export const DateTime = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="fixed top-4 right-4 z-20 bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/20 shadow-lg animate-fade-in hover:bg-white/15 transition-all duration-300
      md:p-4 md:top-4 md:right-4
      sm:top-2 sm:right-2 sm:p-2 sm:text-xs
      max-w-[90vw] w-fit">
      <div className="flex items-center gap-2 mb-1 md:mb-2">
        <Clock size={14} className="text-white/80 animate-pulse-soft" />
        <span className="text-white font-mono text-base md:text-lg font-semibold">
          {formatTime(currentTime)}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <Calendar size={14} className="text-white/80" />
        <span className="text-white text-xs md:text-sm capitalize">
          {formatDate(currentTime)}
        </span>
      </div>
    </div>
  );
};
