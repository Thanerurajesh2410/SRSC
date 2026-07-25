import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music, Play } from 'lucide-react';

export default function DevotionalAudio({ lang }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const audioCtxRef = useRef(null);
  const isPlayingRef = useRef(false);

  // Auto-play Sri Rama Chanting Audio when website opens
  useEffect(() => {
    let started = false;

    const startAudio = async () => {
      if (started) return;
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!audioCtxRef.current) {
          audioCtxRef.current = new AudioContext();
        }
        
        if (audioCtxRef.current.state === 'suspended') {
          await audioCtxRef.current.resume();
        }

        if (audioCtxRef.current.state === 'running') {
          started = true;
          isPlayingRef.current = true;
          setIsPlaying(true);
          setShowPrompt(false);
          playSriRamaChanting();
        } else {
          setShowPrompt(true);
        }
      } catch (e) {
        setShowPrompt(true);
      }
    };

    // Attempt instant auto-play
    startAudio();

    // Browser Autoplay Policy Handler (Triggers on first click/scroll/touch)
    const handleUserInteraction = () => {
      if (!isPlayingRef.current) {
        startAudio();
      }
    };

    window.addEventListener('click', handleUserInteraction);
    window.addEventListener('touchstart', handleUserInteraction);
    window.addEventListener('scroll', handleUserInteraction);

    return () => {
      window.removeEventListener('click', handleUserInteraction);
      window.removeEventListener('touchstart', handleUserInteraction);
      window.removeEventListener('scroll', handleUserInteraction);
    };
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      isPlayingRef.current = false;
      setIsPlaying(false);
      setShowPrompt(false);
      if (audioCtxRef.current) {
        audioCtxRef.current.suspend();
      }
    } else {
      isPlayingRef.current = true;
      setIsPlaying(true);
      setShowPrompt(false);
      playSriRamaChanting();
    }
  };

  // High-Quality Audible Sri Rama Chanting & Tanpura Melody Synthesizer
  const playSriRamaChanting = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContext();
      }
      
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Sacred Raga Frequencies: "Sri Rama Jaya Rama Jaya Jaya Rama"
      // Frequencies for S-R-G-P-D-S (Mohanam Raga Chanting)
      const chantingNotes = [
        { freq: 261.63, duration: 0.6, label: "Sri" },     // C4
        { freq: 329.63, duration: 0.6, label: "Rama" },    // E4
        { freq: 392.00, duration: 0.8, label: "Jaya" },    // G4
        { freq: 329.63, duration: 0.6, label: "Rama" },    // E4
        { freq: 440.00, duration: 0.6, label: "Jaya" },    // A4
        { freq: 392.00, duration: 0.6, label: "Jaya" },    // G4
        { freq: 523.25, duration: 1.2, label: "Rama" },    // C5
      ];

      let noteIdx = 0;

      const playNextChantNote = () => {
        if (!isPlayingRef.current || !audioCtxRef.current) return;

        const note = chantingNotes[noteIdx];
        const osc = ctx.createOscillator();
        const oscHarmonic = ctx.createOscillator();
        const gain = ctx.createGain();

        // Main Chant Bell Tone (Loud and Clear Volume)
        osc.type = 'sine';
        osc.frequency.setValueAtTime(note.freq, ctx.currentTime);

        // Tanpura Harmonic Warmth
        oscHarmonic.type = 'triangle';
        oscHarmonic.frequency.setValueAtTime(note.freq * 0.5, ctx.currentTime);

        // Rich, audible gain envelope
        gain.gain.setValueAtTime(0.02, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.35, ctx.currentTime + 0.08); // Clear audible volume
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + note.duration + 0.4);

        osc.connect(gain);
        oscHarmonic.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        oscHarmonic.start();
        osc.stop(ctx.currentTime + note.duration + 0.5);
        oscHarmonic.stop(ctx.currentTime + note.duration + 0.5);

        noteIdx = (noteIdx + 1) % chantingNotes.length;

        // Schedule next note smoothly
        setTimeout(playNextChantNote, note.duration * 1000 + 150);
      };

      playNextChantNote();
    } catch (e) {
      console.log('Chanting playback error:', e);
    }
  };

  return (
    <div className="flex items-center gap-2 relative">
      {/* Primary Audio Toggle Button */}
      <button
        onClick={togglePlay}
        className={`px-3.5 py-1.5 rounded-full text-xs font-black transition-all duration-300 flex items-center gap-2 shadow-xl border ${
          isPlaying
            ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white border-amber-300 animate-pulse shadow-amber-500/60 scale-105'
            : 'bg-white/10 text-amber-300 border-amber-400/40 hover:bg-white/20'
        }`}
        title={isPlaying ? "పాజ్ చేయి (Pause Sri Rama Chanting)" : "శ్రీరామదాసు జప గానం వినండి (Play Sri Rama Chanting)"}
      >
        <Music className={`w-4 h-4 ${isPlaying ? 'animate-spin text-yellow-200' : 'text-amber-400'}`} />
        <span className="tracking-wide">
          {isPlaying
            ? (lang === 'te' ? '॥ శ్రీ రామ జప గానం వినపడుతోంది 🔊 ॥' : '॥ Sri Rama Chanting Active 🔊 ॥')
            : (lang === 'te' ? '॥ శ్రీ రామ జప గానం వినండి 🔊 ॥' : '॥ Play Sri Rama Chanting 🔊 ॥')}
        </span>
        {isPlaying ? (
          <Volume2 className="w-4 h-4 text-yellow-200" />
        ) : (
          <VolumeX className="w-4 h-4 text-gray-400" />
        )}
      </button>

      {/* Auto-Play Unmute Banner if Browser Autoplay Policy Paused */}
      {showPrompt && !isPlaying && (
        <button
          onClick={togglePlay}
          className="absolute top-12 left-0 z-50 bg-gradient-to-r from-amber-500 to-orange-600 text-white text-xs font-black px-4 py-2 rounded-xl shadow-2xl border-2 border-yellow-300 flex items-center gap-2 animate-bounce whitespace-nowrap"
        >
          <Play className="w-4 h-4 fill-white" />
          <span>శ్రీ రామ నామ జప గానం వినడానికి ఇక్కడ క్లిక్ చేయండి (Click to Listen Sri Rama Chant)</span>
        </button>
      )}
    </div>
  );
}
