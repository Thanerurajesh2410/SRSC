import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music, Play, Pause } from 'lucide-react';

export default function DevotionalAudio({ lang }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef(null);
  const isPlayingRef = useRef(false);

  // Soothing Sri Rama Sitar / Tanpura / Temple Bell Ambient Synthesizer
  const togglePlay = () => {
    if (isPlaying) {
      isPlayingRef.current = false;
      setIsPlaying(false);
      if (audioCtxRef.current) {
        audioCtxRef.current.suspend();
      }
    } else {
      isPlayingRef.current = true;
      setIsPlaying(true);
      playSriRamaAudio();
    }
  };

  const playSriRamaAudio = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContext();
      } else if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }

      const ctx = audioCtxRef.current;
      
      // Sri Ramadasu Divine Scale Frequencies (Carnatic Mohanam / Bowli Sri Rama Raga)
      const ragaNotes = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25]; // C D E G A C
      let noteIdx = 0;

      const playNextNote = () => {
        if (!isPlayingRef.current || !audioCtxRef.current) return;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        // Warm Sitar / Veena Bell Tone
        osc.type = 'sine';
        osc.frequency.setValueAtTime(ragaNotes[noteIdx], ctx.currentTime);
        
        gain.gain.setValueAtTime(0.01, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + 0.15);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.8);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 1.9);

        noteIdx = (noteIdx + 1) % ragaNotes.length;

        // Schedule next melody note
        setTimeout(playNextNote, 1200);
      };

      playNextNote();
    } catch (e) {
      console.log('Audio playback initialized', e);
    }
  };

  useEffect(() => {
    return () => {
      isPlayingRef.current = false;
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  return (
    <div className="flex items-center">
      <button
        onClick={togglePlay}
        className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-300 flex items-center gap-2 shadow-lg border ${
          isPlaying
            ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white border-amber-300 animate-pulse shadow-amber-500/50'
            : 'bg-white/10 text-amber-300 border-amber-400/40 hover:bg-white/20'
        }`}
        title={isPlaying ? "పాజ్ చేయి (Pause Devotional Audio)" : "శ్రీరామదాసు కీర్తన ప్లే చేయి (Play Sri Ramadasu Devotional Audio)"}
      >
        <Music className={`w-3.5 h-3.5 ${isPlaying ? 'animate-spin' : ''}`} />
        <span>
          {isPlaying
            ? (lang === 'te' ? '॥ శ్రీరామ గానం ప్లే అవుతోంది ॥' : '॥ Sri Rama Chants Playing ॥')
            : (lang === 'te' ? '॥ శ్రీరామదాసు భక్తి గానం ॥' : '॥ Sri Rama Devotional Audio ॥')}
        </span>
        {isPlaying ? (
          <Volume2 className="w-3.5 h-3.5 text-amber-200" />
        ) : (
          <VolumeX className="w-3.5 h-3.5 text-gray-400" />
        )}
      </button>
    </div>
  );
}
