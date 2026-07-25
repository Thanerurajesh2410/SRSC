import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, Image as ImageIcon } from 'lucide-react';

export default function HeroSlideshow({ t }) {
  const slides = t.slideshow || [];
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused || slides.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isPaused, slides.length]);

  const prevSlide = () => {
    setCurrentIdx((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIdx((prev) => (prev + 1) % slides.length);
  };

  if (slides.length === 0) return null;

  return (
    <div 
      className="relative w-full max-w-6xl mx-auto rounded-3xl overflow-hidden shadow-2xl border-2 border-[var(--primary-gold)]/60 my-6 group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slides Container */}
      <div className="relative h-[320px] sm:h-[420px] md:h-[500px] w-full bg-black">
        {slides.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentIdx ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {/* Background Image */}
            <img
              src={slide.src}
              alt={slide.title}
              className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-700 hover:scale-100"
            />

            {/* Gradient Overlay for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent flex flex-col justify-end p-6 md:p-10">
              <div className="max-w-2xl">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#5C121E] text-[#FFD700] border border-[#FFD700]/60 mb-2 shadow-lg">
                  <Sparkles className="w-3.5 h-3.5" />
                  {slide.tag}
                </span>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white heading-telugu drop-shadow-md">
                  {slide.title}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrow Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/60 hover:bg-[#5C121E] text-[#FFD700] border border-[#FFD700]/50 flex items-center justify-center transition-all duration-300 shadow-xl opacity-80 group-hover:opacity-100"
        title="గత చిత్రం (Previous Slide)"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/60 hover:bg-[#5C121E] text-[#FFD700] border border-[#FFD700]/50 flex items-center justify-center transition-all duration-300 shadow-xl opacity-80 group-hover:opacity-100"
        title="తరువాతి చిత్రం (Next Slide)"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Pagination Dot Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIdx(idx)}
            className={`transition-all duration-300 rounded-full ${
              idx === currentIdx
                ? 'w-7 h-2.5 bg-[#FFD700] shadow-md shadow-[#FFD700]/50'
                : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/70'
            }`}
            title={`Slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Slide Badge Counter */}
      <div className="absolute top-4 right-4 z-20 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-[#FFD700] border border-[#FFD700]/40 flex items-center gap-1.5">
        <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
        <span>{currentIdx + 1} / {slides.length}</span>
      </div>
    </div>
  );
}
