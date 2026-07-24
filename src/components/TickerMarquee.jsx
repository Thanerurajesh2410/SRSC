import React from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';

export default function TickerMarquee({ t }) {
  return (
    <div className="marquee-container relative z-40">
      <div className="container mx-auto px-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs font-bold text-[var(--primary-saffron)] shrink-0 bg-[var(--sacred-maroon)]/90 px-3 py-1 rounded-full border border-[var(--border-gold)] shadow">
          <Sparkles className="w-3.5 h-3.5 animate-spin" />
          <span>అప్‌డేట్‌లు (LIVE):</span>
        </div>
        
        <div className="overflow-hidden w-full">
          <div className="marquee-content text-xs font-semibold text-[var(--primary-gold-light)] font-mono">
            {t.ticker} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {t.ticker}
          </div>
        </div>
      </div>
    </div>
  );
}
