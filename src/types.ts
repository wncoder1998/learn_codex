export type TaskPriority = "high" | "medium" | "low";

export type TaskFilter = "all" | "active" | "done";

export type Task = {
  id: string;
  title: string;
  priority: TaskPriority;
  done: boolean;
  createdAt: number;
};

export type TaskStats = {
  total: number;
  completed: number;
  active: number;
  progress: number;
};
