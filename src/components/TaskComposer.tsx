import type { FormEventHandler } from "react";
import type { TaskPriority } from "../types";

type TaskComposerProps = {
  draft: string;
  priority: TaskPriority;
  onDraftChange: (value: string) => void;
  onPriorityChange: (value: TaskPriority) => void;
  onSubmit: FormEventHandler<HTMLFormElement>;
};

const TaskComposer = ({
  draft,
  priority,
  onDraftChange,
  onPriorityChange,
  onSubmit,
}: TaskComposerProps) => {
  return (
    <form
      className="grid items-end gap-[14px] lg:grid-cols-[1.6fr_0.7fr_auto]"
      onSubmit={onSubmit}
    >
      <label className="grid gap-2.5">
        <span className="text-sm text-[#93a4be]">New mission</span>
        <input
          className="w-full rounded-[18px] border border-white/8 bg-[rgba(15,26,44,0.78)] px-[18px] py-4 text-[#f2f7ff] outline-none transition duration-200 placeholder:text-[#93a4be]/70 focus:-translate-y-px focus:border-[#7cf6d3]/55"
          name="task"
          type="text"
          maxLength={120}
          placeholder="比如：把这个页面继续改成真正的应用"
          autoComplete="off"
          value={draft}
          onChange={(event) => onDraftChange(event.target.value)}
        />
      </label>

      <label className="grid gap-2.5">
        <span className="text-sm text-[#93a4be]">Priority</span>
        <select
          className="w-full rounded-[18px] border border-white/8 bg-[rgba(15,26,44,0.78)] px-[18px] py-4 text-[#f2f7ff] outline-none transition duration-200 focus:-translate-y-px focus:border-[#7cf6d3]/55"
          name="priority"
          value={priority}
          onChange={(event) => onPriorityChange(event.target.value as TaskPriority)}
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
  );
};

export default TaskComposer;
