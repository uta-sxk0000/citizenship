interface CategoryFilterProps {
  filters: string[];
  activeFilter: string;
  onChange: (filter: string) => void;
}

export function CategoryFilter({
  filters,
  activeFilter,
  onChange,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2" role="list" aria-label="Question filters">
      {filters.map((filter) => (
        <button
          key={filter}
          className={`focus-ring min-h-10 rounded-md border px-3 py-2 text-sm font800 ${
            activeFilter === filter
              ? 'border-[var(--navy)] bg-[var(--navy)] text-white'
              : 'border-[var(--border)] bg-[var(--surface)] text-[var(--muted-strong)] hover:bg-[var(--surface-muted)]'
          }`}
          type="button"
          aria-pressed={activeFilter === filter}
          onClick={() => onChange(filter)}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}
