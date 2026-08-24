interface EmptyStateProps {
  title: string;
  description: string;
}

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="card grid gap-2 p-6 text-center">
      <h2 className="text-xl font900 text-[var(--navy-strong)]">{title}</h2>
      <p className="text-sm leading-6 text-[var(--muted)]">{description}</p>
    </div>
  );
}
