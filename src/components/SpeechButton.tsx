'use client';

import { useEffect, useState } from 'react';
import { prepareVoices, speakText, supportsSpeech } from '@/src/utils/speech';

interface SpeechButtonProps {
  text: string;
  label: string;
  rate?: number;
  tone?: 'light' | 'solid';
}

export function SpeechButton({ text, label, rate = 0.95, tone = 'light' }: SpeechButtonProps) {
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

  return (
    <button
      className={`focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font800 ${
        tone === 'solid'
          ? 'bg-[var(--navy)] text-white hover:bg-[var(--navy-strong)]'
          : 'border border-[var(--border)] bg-[var(--surface)] text-[var(--navy-strong)] hover:bg-[var(--surface-muted)]'
      } ${playing ? 'ring-2 ring-[color-mix(in_srgb,var(--blue)_35%,transparent)]' : ''}`}
      type="button"
      disabled={!available}
      aria-label={available ? label : 'Speech is not available in this browser'}
      aria-pressed={playing}
      onClick={startSpeech}
    >
      <span aria-hidden="true">Audio</span>
      <span>{playing ? 'Playing' : label}</span>
    </button>
  );
}
