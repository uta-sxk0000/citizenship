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
    <div className="category-filter" role="list" aria-label="Question filters">
      {filters.map((filter) => (
        <button
          key={filter}
          className={`segmented-button focus-ring ${activeFilter === filter ? 'is-active' : ''}`}
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
