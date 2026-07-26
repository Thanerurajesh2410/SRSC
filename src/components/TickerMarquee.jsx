import React from 'react';
import { Zap } from 'lucide-react';

export default function TickerMarquee({ t }) {
  return (
    <div className="flash-news-banner relative z-40 py-2.5 px-3">
      <div className="container mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 bg-[#FFD700] text-black font-black text-xs md:text-sm px-3.5 py-1 rounded-full shadow-[0_0_15px_rgba(255,215,0,0.9)] shrink-0 animate-pulse border border-black">
          <span className="w-2.5 h-2.5 rounded-full bg-red-600 border border-white animate-ping" />
          <Zap className="w-4 h-4 fill-amber-950 text-black" />
          <span>⚡ తాజా ప్రకటన (FLASH NEWS)</span>
        </div>
        
        <div className="overflow-hidden w-full relative">
          <div className="flash-news-content text-xs sm:text-sm md:text-base font-extrabold text-[#FFF5C0] heading-telugu tracking-wide hover:[animation-play-state:paused] cursor-pointer">
            📢 ముఖ్య గమనిక: ఆలయ వెబ్‌సైట్‌లో ప్రదర్శించబడుతున్న విరాళాల వివరాలు, శ్రీ రామా సేవా కమిటీ పామినివాండ్లవూరు అధికారిక బ్యాంక్ ఖాతా సృష్టించిన తర్వాత NEFT లేదా UPI ద్వారా నేరుగా ఖాతాకు జమ కాబడినవి మాత్రమే ప్రదర్శించబడుతున్నాయి.
          </div>
        </div>
      </div>
    </div>
  );
}
