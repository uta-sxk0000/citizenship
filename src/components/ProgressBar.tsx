interface ProgressBarProps {
  value: number;
  max: number;
  label: string;
  detail?: string;
}

export function ProgressBar({ value, max, label, detail }: ProgressBarProps) {
  const percent = max === 0 ? 0 : Math.round((value / max) * 100);

  return (
    <div className="grid gap-2">
      <div className="flex items-center justify-between gap-3 text-sm">
        <span className="font800 text-[var(--foreground)]">{label}</span>
        <span className="text-[var(--muted)]">{detail ?? `${percent}%`}</span>
      </div>
      <div
        className="h-3 overflow-hidden rounded-md bg-[var(--surface-strong)]"
        aria-label={label}
        aria-valuemax={max}
        aria-valuemin={0}
        aria-valuenow={value}
        role="progressbar"
      >
        <div
          className="h-full rounded-md bg-[var(--blue)]"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
