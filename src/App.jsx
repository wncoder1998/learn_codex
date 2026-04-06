import { useEffect, useState } from "react";

const STORAGE_KEY = "pulse-list-tasks-react";
const FILTERS = ["all", "active", "done"];
const PRIORITY_STYLES = {
  high: "bg-[#ff8b7b]/15 text-[#ffb4a8]",
  medium: "bg-[#ffd76a]/14 text-[#ffe08b]",
  low: "bg-[#7cf6d3]/14 text-[#7cf6d3]",
};

const statCardClassName =
  "rounded-[20px] border border-white/5 bg-[linear-gradient(135deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] px-5 py-[18px]";
const panelClassName =
  "border border-white/8 bg-[rgba(11,22,40,0.82)] shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-[24px]";

const App = () => {
  const [tasks, setTasks] = useState(loadTasks);
  const [filter, setFilter] = useState("all");
  const [draft, setDraft] = useState("");
  const [priority, setPriority] = useState("medium");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const total = tasks.length;
  const completed = tasks.filter((task) => task.done).length;
  const active = total - completed;
  const progress = total === 0 ? 0 : Math.round((completed / total) * 100);
  const stats = { total, completed, active, progress };

  const visibleTasks =
    filter === "active"
      ? tasks.filter((task) => !task.done)
      : filter === "done"
        ? tasks.filter((task) => task.done)
        : tasks;

  const handleSubmit = (event) => {
    event.preventDefault();
    const title = draft.trim();
    if (!title) {
      return;
    }

    setTasks((current) => [
      {
        id: crypto.randomUUID(),
        title,
        priority,
        done: false,
        createdAt: Date.now(),
      },
      ...current,
    ]);
    setDraft("");
    setPriority("medium");
  };

  const toggleTask = (id) => {
    setTasks((current) =>
      current.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((current) => current.filter((task) => task.id !== id));
  };

  const clearDone = () => {
    setTasks((current) => current.filter((task) => !task.done));
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[linear-gradient(135deg,#050914_0%,#0b1422_48%,#09101d_100%)] font-['Space_Grotesk',sans-serif] text-[#f2f7ff]">
      <div className="pointer-events-none fixed left-[-40px] top-[12%] h-[220px] w-[220px] rounded-full bg-[#7cf6d3]/20 blur-3xl" />
      <div className="pointer-events-none fixed right-[-80px] top-[58%] h-[260px] w-[260px] rounded-full bg-[#ffd76a]/16 blur-3xl" />
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(124,246,211,0.16),transparent_30%),radial-gradient(circle_at_85%_15%,rgba(255,139,123,0.20),transparent_24%)]" />

      <main className="mx-auto grid w-[min(1120px,calc(100%-20px))] gap-7 px-0 py-5 sm:w-[min(1120px,calc(100%-32px))] sm:py-12 lg:grid-cols-[0.95fr_1.2fr]">
        <section
          className={`${panelClassName} rounded-[24px] p-6 lg:sticky lg:top-7 lg:h-fit lg:rounded-[28px] lg:p-9`}
        >
          <p className="m-0 text-[12px] tracking-[0.2em] text-[#7cf6d3]">
            FOCUS / FLOW / FINISH
          </p>
          <h1 className="mt-[18px] font-['Syne',sans-serif] text-[clamp(3rem,7vw,5.6rem)] leading-[0.95]">
            PulseList
          </h1>
          <p className="m-0 max-w-[28ch] text-[1.05rem] leading-7 text-[#93a4be]">
            React + Vite 版本的任务面板。状态、筛选和本地存储都交给组件管理。
          </p>

          <div className="mt-9 grid gap-[14px]">
            <article className={statCardClassName}>
              <span className="block text-[2rem] font-bold">{stats.total}</span>
              <p className="mt-1.5 text-[#93a4be]">Tasks</p>
            </article>
            <article className={statCardClassName}>
              <span className="block text-[2rem] font-bold">
                {stats.completed}
              </span>
              <p className="mt-1.5 text-[#93a4be]">Done</p>
            </article>
            <article className={statCardClassName}>
              <span className="block text-[2rem] font-bold">
                {stats.progress}%
              </span>
              <p className="mt-1.5 text-[#93a4be]">Progress</p>
            </article>
          </div>

          <div className="mt-[18px] rounded-[22px] border border-[#7cf6d3]/16 bg-[linear-gradient(135deg,rgba(124,246,211,0.12),rgba(255,255,255,0.02))] px-5 py-5">
            <p className="text-[#93a4be]">Active Queue</p>
            <strong className="my-2 block text-[2.4rem] leading-none">
              {stats.active}
            </strong>
            <span className="text-[#93a4be]">
              保持列表短、优先级清晰、完成率稳定。
            </span>
          </div>
        </section>

        <section
          className={`${panelClassName} rounded-[24px] p-[18px] sm:p-6 lg:rounded-[28px]`}
        >
          <form
            className="grid items-end gap-[14px] lg:grid-cols-[1.6fr_0.7fr_auto]"
            onSubmit={handleSubmit}
          >
            <label className="grid gap-2.5">
              <span className="text-sm text-[#93a4be]">New mission</span>
              <input
                className="w-full rounded-[18px] border border-white/8 bg-[rgba(15,26,44,0.78)] px-[18px] py-4 text-[#f2f7ff] outline-none transition duration-200 placeholder:text-[#93a4be]/70 focus:-translate-y-px focus:border-[#7cf6d3]/55"
                name="task"
                type="text"
                maxLength="120"
                placeholder="比如：把这个页面继续改成真正的应用"
                autoComplete="off"
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
              />
            </label>

            <label className="grid gap-2.5">
              <span className="text-sm text-[#93a4be]">Priority</span>
              <select
                className="w-full rounded-[18px] border border-white/8 bg-[rgba(15,26,44,0.78)] px-[18px] py-4 text-[#f2f7ff] outline-none transition duration-200 focus:-translate-y-px focus:border-[#7cf6d3]/55"
                name="priority"
                value={priority}
                onChange={(event) => setPriority(event.target.value)}
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </label>

            <button
              type="submit"
              className="h-14 rounded-[18px] bg-[linear-gradient(135deg,#7cf6d3,#d9fff4)] px-[22px] font-bold text-[#04101b] shadow-[0_14px_30px_rgba(124,246,211,0.2)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_20px_40px_rgba(124,246,211,0.28)]"
            >
              Add Task
            </button>
          </form>

          <div className="mt-[22px] flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex flex-wrap gap-2.5 rounded-[20px] border border-white/4 bg-white/4 p-2">
              {FILTERS.map((name) => (
                <button
                  key={name}
                  className={`rounded-[14px] px-[14px] py-2.5 capitalize transition duration-200 ${
                    filter === name
                      ? "bg-[#7cf6d3]/14 text-[#7cf6d3]"
                      : "text-[#f2f7ff]"
                  }`}
                  type="button"
                  onClick={() => setFilter(name)}
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

          <ul className="mt-[22px] grid list-none gap-[14px] p-0">
            {visibleTasks.length === 0 ? (
              <li className="rounded-[22px] border border-dashed border-white/12 px-5 py-9 text-center text-[#93a4be]">
                {filter === "done"
                  ? "还没有已完成任务。"
                  : filter === "active"
                    ? "当前没有进行中的任务。"
                    : "先添加一个任务，开始你的节奏。"}
              </li>
            ) : (
              visibleTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onToggle={toggleTask}
                  onDelete={deleteTask}
                />
              ))
            )}
          </ul>
        </section>
      </main>
    </div>
  );
};

const TaskCard = ({ task, onToggle, onDelete }) => {
  return (
    <li
      className={`grid items-center gap-4 rounded-[22px] border border-white/6 bg-[rgba(22,37,61,0.92)] p-[18px] sm:grid-cols-[auto_1fr_auto] ${
        task.done ? "opacity-70" : ""
      }`}
    >
      <button
        className={`flex h-[22px] w-[22px] items-center justify-center rounded-full border-2 transition duration-200 ${
          task.done
            ? "border-[#7cf6d3] bg-[#7cf6d3]"
            : "border-[#7cf6d3]/50 bg-transparent"
        }`}
        type="button"
        aria-label="切换完成状态"
        onClick={() => onToggle(task.id)}
      >
        <span
          className={`h-2.5 w-2.5 rounded-full ${
            task.done ? "bg-[#06271e]" : "bg-transparent"
          }`}
        />
      </button>

      <div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p
            className={`text-base font-medium ${
              task.done ? "text-[#93a4be] line-through" : "text-[#f2f7ff]"
            }`}
          >
            {task.title}
          </p>
          <span
            className={`inline-flex min-w-[76px] items-center justify-center rounded-full px-[10px] py-[7px] text-[0.78rem] font-bold uppercase tracking-[0.08em] ${
              PRIORITY_STYLES[task.priority]
            }`}
          >
            {task.priority}
          </span>
        </div>
        <p className="mt-2 text-sm text-[#93a4be]">
          {task.done ? "Completed" : "Created"} {formatTime(task.createdAt)}
        </p>
      </div>

      <button
        className="justify-self-end rounded-[14px] bg-white/4 px-[14px] py-2.5 text-[#93a4be] transition duration-200 hover:bg-white/8 hover:text-white"
        type="button"
        onClick={() => onDelete(task.id)}
      >
        Delete
      </button>
    </li>
  );
};

const loadTasks = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {
    return getSeedTasks();
  }

  return getSeedTasks();
};

const formatTime = (timestamp) => {
  return new Intl.DateTimeFormat("zh-CN", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(timestamp);
};

const getSeedTasks = () => {
  return [
    {
      id: crypto.randomUUID(),
      title: "把静态版 ToDoList 改成 Vite + React 项目",
      priority: "high",
      done: true,
      createdAt: Date.now() - 1000 * 60 * 90,
    },
    {
      id: crypto.randomUUID(),
      title: "整理今天真正要推进的任务",
      priority: "medium",
      done: false,
      createdAt: Date.now() - 1000 * 60 * 25,
    },
    {
      id: crypto.randomUUID(),
      title: "保留足够酷的视觉张力",
      priority: "low",
      done: false,
      createdAt: Date.now() - 1000 * 60 * 8,
    },
  ];
};

export default App;
