import type { Task, TaskPriority } from "../types";

const PRIORITY_STYLES: Record<TaskPriority, string> = {
  high: "bg-[#ff8b7b]/15 text-[#ffb4a8]",
  medium: "bg-[#ffd76a]/14 text-[#ffe08b]",
  low: "bg-[#7cf6d3]/14 text-[#7cf6d3]",
};

const formatTime = (timestamp: number): string => {
  return new Intl.DateTimeFormat("zh-CN", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(timestamp);
};

type TaskCardProps = {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

const TaskCard = ({ task, onToggle, onDelete }: TaskCardProps) => {
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

export default TaskCard;
