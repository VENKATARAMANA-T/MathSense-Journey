import { createContext, useContext, useState, useCallback, useRef } from 'react'

const AudioContext = createContext()

export const AudioProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    narrationVolume: 0.7,
    musicVolume: 0.3,
    effectsVolume: 0.5,
    narrationEnabled: true,
    musicEnabled: true,
    effectsEnabled: true,
    narrationSpeed: 1.0
  })

  const narrationRef = useRef(null)
  const musicRef = useRef(null)

  // Text-to-speech narration
  const speak = useCallback((text, options = {}) => {
    if (!settings.narrationEnabled || !window.speechSynthesis) return

    // Cancel any ongoing speech
    window.speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = settings.narrationSpeed
    utterance.volume = settings.narrationVolume
    utterance.pitch = 1.0
    
    // Prefer child-friendly voices
    const voices = window.speechSynthesis.getVoices()
    const preferredVoice = voices.find(voice => 
      voice.name.includes('Female') || voice.name.includes('Child')
    ) || voices[0]
    
    if (preferredVoice) {
      utterance.voice = preferredVoice
    }

    if (options.onEnd) {
      utterance.onend = options.onEnd
    }

    window.speechSynthesis.speak(utterance)
  }, [settings])

  // Stop narration
  const stopSpeaking = useCallback(() => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel()
    }
  }, [])

  // Play sound effect
  const playSound = useCallback((soundType) => {
    if (!settings.effectsEnabled) return

    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    gainNode.gain.setValueAtTime(settings.effectsVolume * 0.3, audioContext.currentTime)

    // Different sounds for different interactions
    const sounds = {
      success: { frequency: 523.25, duration: 0.3 }, // C5
      click: { frequency: 261.63, duration: 0.1 }, // C4
      error: { frequency: 196.00, duration: 0.2 }, // G3
      collect: { frequency: 659.25, duration: 0.2 }, // E5
      complete: { frequency: 783.99, duration: 0.4 }, // G5
    }

    const sound = sounds[soundType] || sounds.click

    oscillator.frequency.setValueAtTime(sound.frequency, audioContext.currentTime)
    oscillator.type = 'sine'

    oscillator.start()
    oscillator.stop(audioContext.currentTime + sound.duration)

    // Fade out
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      audioContext.currentTime + sound.duration
    )

    // Cleanup
    setTimeout(() => {
      audioContext.close()
    }, (sound.duration + 0.1) * 1000)
  }, [settings])

  // Play celebration sound
  const playCelebration = useCallback(() => {
    if (!settings.effectsEnabled) return

    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    const notes = [523.25, 587.33, 659.25, 783.99] // C5, D5, E5, G5
    
    notes.forEach((freq, index) => {
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)
      
      gainNode.gain.setValueAtTime(settings.effectsVolume * 0.2, audioContext.currentTime)
      oscillator.frequency.setValueAtTime(freq, audioContext.currentTime)
      oscillator.type = 'sine'
      
      const startTime = audioContext.currentTime + (index * 0.1)
      const duration = 0.3
      
      oscillator.start(startTime)
      oscillator.stop(startTime + duration)
      
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        startTime + duration
      )
    })

    setTimeout(() => {
      audioContext.close()
    }, 1000)
  }, [settings])

  // Update settings
  const updateSettings = useCallback((newSettings) => {
    setSettings(prev => ({ ...prev, ...newSettings }))
  }, [])

  const value = {
    settings,
    updateSettings,
    speak,
    stopSpeaking,
    playSound,
    playCelebration
  }

  return (
    <AudioContext.Provider value={value}>
      {children}
    </AudioContext.Provider>
  )
}

export const useAudio = () => {
  const context = useContext(AudioContext)
  if (!context) {
    throw new Error('useAudio must be used within AudioProvider')
  }
  return context
}

export default useAudio
