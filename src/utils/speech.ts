export interface SpeakOptions {
  rate?: number;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: () => void;
}

let cachedVoices: SpeechSynthesisVoice[] = [];

export function supportsSpeech() {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

export function prepareVoices(onChange?: () => void) {
  if (!supportsSpeech()) {
    return () => undefined;
  }

  const refresh = (notify = true) => {
    cachedVoices = window.speechSynthesis.getVoices();
    if (notify) {
      onChange?.();
    }
  };
  const handleVoicesChanged = () => refresh(true);

  refresh(false);
  window.speechSynthesis.addEventListener('voiceschanged', handleVoicesChanged);

  return () => {
    window.speechSynthesis.removeEventListener('voiceschanged', handleVoicesChanged);
  };
}

export function speakText(text: string, options: SpeakOptions = {}) {
  if (!supportsSpeech() || !text.trim()) {
    return false;
  }

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  utterance.rate = options.rate ?? 0.95;
  utterance.pitch = 1;
  utterance.voice = getPreferredEnglishVoice();
  utterance.onstart = () => options.onStart?.();
  utterance.onend = () => options.onEnd?.();
  utterance.onerror = () => options.onError?.();

  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
  return true;
}

export function stopSpeech() {
  if (supportsSpeech()) {
    window.speechSynthesis.cancel();
  }
}

function getPreferredEnglishVoice() {
  const voices =
    cachedVoices.length > 0 ? cachedVoices : window.speechSynthesis.getVoices();
  cachedVoices = voices;

  const enUsVoices = voices.filter((voice) => voice.lang.toLowerCase() === 'en-us');
  const localEnUs = enUsVoices.find((voice) => voice.localService);
  const namedUsVoice = enUsVoices.find((voice) =>
    /samantha|alex|google us|microsoft|zira|david/i.test(voice.name),
  );
  const anyEnglish = voices.find((voice) => voice.lang.toLowerCase().startsWith('en'));

  return localEnUs ?? namedUsVoice ?? enUsVoices[0] ?? anyEnglish ?? null;
}
