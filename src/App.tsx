import { useState } from "react";
import type { FormEvent } from "react";
import { StatsPanel, TaskComposer, TaskFilters, TaskList } from "./components";
import type { TaskFilter, TaskPriority } from "./types";
import { useTasks } from "./useTasks";

const FILTERS: TaskFilter[] = ["all", "active", "done"];
const panelClassName =
  "border border-white/8 bg-[rgba(11,22,40,0.82)] shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-[24px]";

const App = () => {
  const [filter, setFilter] = useState<TaskFilter>("all");
  const [draft, setDraft] = useState<string>("");
  const [priority, setPriority] = useState<TaskPriority>("medium");
  const { stats, visibleTasks, addTask, toggleTask, deleteTask, clearDone } =
    useTasks(filter);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const title = draft.trim();
    if (!title) {
      return;
    }

    addTask(title, priority);
    setDraft("");
    setPriority("medium");
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[linear-gradient(135deg,#050914_0%,#0b1422_48%,#09101d_100%)] font-['Space_Grotesk',sans-serif] text-[#f2f7ff]">
      <div className="pointer-events-none fixed left-[-40px] top-[12%] h-[220px] w-[220px] rounded-full bg-[#7cf6d3]/20 blur-3xl" />
      <div className="pointer-events-none fixed right-[-80px] top-[58%] h-[260px] w-[260px] rounded-full bg-[#ffd76a]/16 blur-3xl" />
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(124,246,211,0.16),transparent_30%),radial-gradient(circle_at_85%_15%,rgba(255,139,123,0.20),transparent_24%)]" />

      <main className="mx-auto grid w-[min(1120px,calc(100%-20px))] gap-7 px-0 py-5 sm:w-[min(1120px,calc(100%-32px))] sm:py-12 lg:grid-cols-[0.95fr_1.2fr]">
        <StatsPanel panelClassName={panelClassName} stats={stats} />

        <section
          className={`${panelClassName} rounded-[24px] p-[18px] sm:p-6 lg:rounded-[28px]`}
        >
          <TaskComposer
            draft={draft}
            priority={priority}
            onDraftChange={setDraft}
            onPriorityChange={setPriority}
            onSubmit={handleSubmit}
          />
          <TaskFilters
            clearDone={clearDone}
            currentFilter={filter}
            filters={FILTERS}
            onFilterChange={setFilter}
          />
          <TaskList
            filter={filter}
            tasks={visibleTasks}
            onDelete={deleteTask}
            onToggle={toggleTask}
          />
        </section>
      </main>
    </div>
  );
};

export default App;
