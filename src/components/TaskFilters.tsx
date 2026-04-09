import type { TaskFilter } from "../types";

type TaskFiltersProps = {
  clearDone: () => void;
  currentFilter: TaskFilter;
  filters: TaskFilter[];
  onFilterChange: (filter: TaskFilter) => void;
};

const TaskFilters = ({
  clearDone,
  currentFilter,
  filters,
  onFilterChange,
}: TaskFiltersProps) => {
  return (
    <div className="mt-[22px] flex flex-wrap items-center justify-between gap-4">
      <div className="inline-flex flex-wrap gap-2.5 rounded-[20px] border border-white/4 bg-white/4 p-2">
        {filters.map((name) => (
          <button
            key={name}
            className={`rounded-[14px] px-[14px] py-2.5 capitalize transition duration-200 ${
              currentFilter === name
                ? "bg-[#7cf6d3]/14 text-[#7cf6d3]"
                : "text-[#f2f7ff]"
            }`}
            type="button"
            onClick={() => onFilterChange(name)}
          >
            {name}
          </button>
        ))}
      </div>

      <button
        className="rounded-[14px] bg-[#ff8b7b]/8 px-[14px] py-2.5 text-white transition duration-200 hover:bg-[#ff8b7b]/14"
        type="button"
        onClick={clearDone}
      >
        Clear Done
      </button>
    </div>
  );
};

export default TaskFilters;
