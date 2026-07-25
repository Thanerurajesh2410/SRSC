import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music, Play } from 'lucide-react';

export default function DevotionalAudio({ lang }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const audioCtxRef = useRef(null);
  const isPlayingRef = useRef(false);

  // Auto-play Jagadanandakaraka Devotional Song when website opens
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
          playJagadanandakarakaSong();
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
      playJagadanandakarakaSong();
    }
  };

  // High-Quality Audible Jagadanandakaraka (Nattai Raga) Pancharatna Krithi Synthesizer
  const playJagadanandakarakaSong = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContext();
      }
      
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Nattai Raga Notes for "Jagadanandakaraka Surasevita":
      // S - R3 - G3 - M1 - P - D3 - N3 - S (Swara notes)
      const songNotes = [
        { freq: 261.63, duration: 0.5, label: "Ja" },      // C4
        { freq: 311.13, duration: 0.5, label: "ga" },     // D#4
        { freq: 329.63, duration: 0.6, label: "da" },     // E4
        { freq: 392.00, duration: 0.6, label: "nan" },    // G4
        { freq: 493.88, duration: 0.7, label: "da" },     // B4
        { freq: 523.25, duration: 0.8, label: "ka" },     // C5
        { freq: 493.88, duration: 0.5, label: "ra" },     // B4
        { freq: 392.00, duration: 0.7, label: "ka" },     // G4
        { freq: 349.23, duration: 0.6, label: "Su" },     // F4
        { freq: 329.63, duration: 0.6, label: "ra" },     // E4
        { freq: 311.13, duration: 0.6, label: "se" },     // D#4
        { freq: 261.63, duration: 1.2, label: "vita" },    // C4
      ];

      let noteIdx = 0;

      const playNextSongNote = () => {
        if (!isPlayingRef.current || !audioCtxRef.current) return;

        const note = songNotes[noteIdx];
        const osc = ctx.createOscillator();
        const oscHarmonic = ctx.createOscillator();
        const gain = ctx.createGain();

        // Veena / Temple Flute Tone
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(note.freq, ctx.currentTime);

        // Flute Harmonic Resonance
        oscHarmonic.type = 'sine';
        oscHarmonic.frequency.setValueAtTime(note.freq * 2, ctx.currentTime);

        // Audible volume envelope
        gain.gain.setValueAtTime(0.02, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.38, ctx.currentTime + 0.06); // Rich audible sound
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + note.duration + 0.3);

        osc.connect(gain);
        oscHarmonic.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        oscHarmonic.start();
        osc.stop(ctx.currentTime + note.duration + 0.4);
        oscHarmonic.stop(ctx.currentTime + note.duration + 0.4);

        noteIdx = (noteIdx + 1) % songNotes.length;

        // Schedule next melody note
        setTimeout(playNextSongNote, note.duration * 1000 + 100);
      };

      playNextSongNote();
    } catch (e) {
      console.log('Jagadanandakaraka playback error:', e);
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
        title={isPlaying ? "పాజ్ చేయి (Pause Jagadanandakaraka Song)" : "జగదానందకారక పవిత్ర గానం వినండి (Play Jagadanandakaraka Song)"}
      >
        <Music className={`w-4 h-4 ${isPlaying ? 'animate-spin text-yellow-200' : 'text-amber-400'}`} />
        <span className="tracking-wide">
          {isPlaying
            ? (lang === 'te' ? '॥ జగదానందకారక సురసేవిత 🔊 ॥' : '॥ Jagadanandakaraka Playing 🔊 ॥')
            : (lang === 'te' ? '॥ జగదానందకారక పవిత్ర గానం 🔊 ॥' : '॥ Play Jagadanandakaraka 🔊 ॥')}
        </span>
        {isPlaying ? (
          <Volume2 className="w-4 h-4 text-yellow-200" />
        ) : (
          <VolumeX className="w-4 h-4 text-gray-400" />
        )}
      </button>

      {/* Auto-Play Unmute Prompt Banner if Browser Autoplay Policy Paused */}
      {showPrompt && !isPlaying && (
        <button
          onClick={togglePlay}
          className="absolute top-12 left-0 z-50 bg-gradient-to-r from-amber-500 to-orange-600 text-white text-xs font-black px-4 py-2 rounded-xl shadow-2xl border-2 border-yellow-300 flex items-center gap-2 animate-bounce whitespace-nowrap"
        >
          <Play className="w-4 h-4 fill-white" />
          <span>జగదానందకారక శ్రీరామ గానం వినడానికి ఇక్కడ క్లిక్ చేయండి (Click to Play Jagadanandakaraka)</span>
        </button>
      )}
    </div>
  );
}
