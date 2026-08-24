'use client';

import { useEffect, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { prepareVoices, speakText, supportsSpeech } from '@/src/utils/speech';

interface SpeechButtonProps {
  text: string;
  label: string;
  rate?: number;
  variant?: 'primary' | 'subtle' | 'ghost';
}

export function SpeechButton({
  text,
  label,
  rate = 0.95,
  variant = 'subtle',
}: SpeechButtonProps) {
  const [available, setAvailable] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setAvailable(supportsSpeech()), 0);
    const cleanupVoices = prepareVoices(() => setAvailable(supportsSpeech()));

    return () => {
      window.clearTimeout(timer);
      cleanupVoices();
    };
  }, []);

  const startSpeech = () => {
    const started = speakText(text, {
      rate,
      onStart: () => setPlaying(true),
      onEnd: () => setPlaying(false),
      onError: () => setPlaying(false),
    });

    if (!started) {
      setPlaying(false);
    }
  };

  const Icon = !available ? VolumeX : Volume2;

  return (
    <button
      className={`audio-button audio-button-${variant} focus-ring ${playing ? 'is-playing' : ''}`}
      type="button"
      disabled={!available}
      aria-label={available ? label : 'Speech is not available in this browser'}
      aria-pressed={playing}
      onClick={startSpeech}
      title={label}
    >
      <Icon aria-hidden="true" size={18} strokeWidth={2.2} />
    </button>
  );
}
