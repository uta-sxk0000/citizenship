import { Languages } from 'lucide-react';

interface NepaliToggleButtonProps {
  active: boolean;
  available: boolean;
  onToggle: () => void;
  controls?: string;
}

export function NepaliToggleButton({
  active,
  available,
  onToggle,
  controls,
}: NepaliToggleButtonProps) {
  const enabledActive = available && active;

  return (
    <button
      className={`language-toggle-button focus-ring ${enabledActive ? 'is-active' : ''}`}
      type="button"
      disabled={!available}
      aria-label={
        available
          ? enabledActive
            ? 'Hide Nepali translation'
            : 'Show Nepali translation'
          : 'Nepali translation is not available for this question'
      }
      aria-pressed={available ? enabledActive : undefined}
      aria-expanded={available ? enabledActive : undefined}
      aria-controls={available ? controls : undefined}
      onClick={onToggle}
      title={available ? 'नेपाली' : 'Nepali unavailable'}
    >
      <Languages aria-hidden="true" size={16} />
      <span>नेपाली</span>
    </button>
  );
}
