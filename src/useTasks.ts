import { useEffect, useState } from "react";
import type { Task, TaskFilter, TaskPriority, TaskStats } from "./types";

const STORAGE_KEY = "pulse-list-tasks-react";

type UseTasksResult = {
  stats: TaskStats;
  visibleTasks: Task[];
  addTask: (title: string, priority: TaskPriority) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  clearDone: () => void;
};

export const useTasks = (filter: TaskFilter): UseTasksResult => {
  const [tasks, setTasks] = useState<Task[]>(loadTasks);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const total = tasks.length;
  const completed = tasks.filter((task) => task.done).length;
  const active = total - completed;
  const progress = total === 0 ? 0 : Math.round((completed / total) * 100);

  const visibleTasks =
    filter === "active"
      ? tasks.filter((task) => !task.done)
      : filter === "done"
        ? tasks.filter((task) => task.done)
        : tasks;

  const addTask = (title: string, priority: TaskPriority) => {
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
  };

  const toggleTask = (id: string) => {
    setTasks((current) =>
      current.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks((current) => current.filter((task) => task.id !== id));
  };

  const clearDone = () => {
    setTasks((current) => current.filter((task) => !task.done));
  };

  return {
    stats: { total, completed, active, progress },
    visibleTasks,
    addTask,
    toggleTask,
    deleteTask,
    clearDone,
  };
};

const loadTasks = (): Task[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return parseTasks(stored);
    }
  } catch {
    return getSeedTasks();
  }

  return getSeedTasks();
};

const parseTasks = (stored: string): Task[] => {
  const parsed: unknown = JSON.parse(stored);

  if (!Array.isArray(parsed)) {
    return getSeedTasks();
  }

  const tasks = parsed.filter(isTask);
  return tasks.length > 0 ? tasks : getSeedTasks();
};

const isTask = (value: unknown): value is Task => {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Partial<Task>;
  return (
    typeof candidate.id === "string" &&
    typeof candidate.title === "string" &&
    isTaskPriority(candidate.priority) &&
    typeof candidate.done === "boolean" &&
    typeof candidate.createdAt === "number"
  );
};

const isTaskPriority = (value: unknown): value is TaskPriority => {
  return value === "high" || value === "medium" || value === "low";
};

const getSeedTasks = (): Task[] => {
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
