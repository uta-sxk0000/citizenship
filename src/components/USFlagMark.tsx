interface USFlagMarkProps {
  label?: string;
}

export function USFlagMark({ label = 'United States flag mark' }: USFlagMarkProps) {
  return (
    <span className="us-flag-mark" role="img" aria-label={label}>
      <span />
    </span>
  );
}
