import TaskCard from "./TaskCard";
import type { Task, TaskFilter } from "../types";

const getEmptyStateMessage = (filter: TaskFilter): string => {
  if (filter === "done") {
    return "还没有已完成任务。";
  }

  if (filter === "active") {
    return "当前没有进行中的任务。";
  }

  return "先添加一个任务，开始你的节奏。";
};

type TaskListProps = {
  filter: TaskFilter;
  tasks: Task[];
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
};

const TaskList = ({ filter, tasks, onDelete, onToggle }: TaskListProps) => {
  return (
    <ul className="mt-[22px] grid list-none gap-[14px] p-0">
      {tasks.length === 0 ? (
        <li className="rounded-[22px] border border-dashed border-white/12 px-5 py-9 text-center text-[#93a4be]">
          {getEmptyStateMessage(filter)}
        </li>
      ) : (
        tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onDelete={onDelete}
            onToggle={onToggle}
          />
        ))
      )}
    </ul>
  );
};

export default TaskList;
