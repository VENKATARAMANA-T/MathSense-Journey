import { useState, useEffect, useRef, useContext } from 'react';
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import { SettingsContext } from '../App';
import { motion } from 'framer-motion';

const AudioPlayer = ({ src, type = 'narration', autoPlay = false, loop = false }) => {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);
  const { settings } = useContext(SettingsContext);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Set volume based on type and settings
    const volumeMap = {
      narration: settings.audioVolume,
      music: settings.musicVolume,
      effects: settings.effectsVolume,
    };
    audio.volume = volumeMap[type] || 0.5;

    // Auto play if specified
    if (autoPlay) {
      audio.play().catch(err => console.log('Audio autoplay prevented:', err));
    }

    return () => {
      audio.pause();
    };
  }, [settings, type, autoPlay]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  // Simulate audio with visual feedback (no actual audio files needed for demo)
  const simulateAudio = () => {
    if (!src) return;
    
    // Create a simulated audio experience
    console.log(`Playing ${type} audio:`, src);
  };

  useEffect(() => {
    if (isPlaying) {
      simulateAudio();
    }
  }, [isPlaying]);

  return (
    <div className="flex items-center space-x-2 p-2 rounded-full bg-white/80 shadow-md">
      <audio ref={audioRef} src={src} loop={loop} />
      
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={togglePlay}
        className="audio-control"
        aria-label={isPlaying ? 'Pause' : 'Play'}
      >
        {isPlaying ? <FaPause /> : <FaPlay />}
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleMute}
        className="audio-control"
        aria-label={isMuted ? 'Unmute' : 'Mute'}
      >
        {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
      </motion.button>

      {isPlaying && (
        <div className="flex space-x-1">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="w-1 bg-primary-500 rounded-full"
              animate={{
                height: [8, 16, 8],
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.1,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AudioPlayer;
