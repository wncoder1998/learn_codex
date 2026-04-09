import type { TaskStats } from "../types";

const statCardClassName =
  "rounded-[20px] border border-white/5 bg-[linear-gradient(135deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] px-5 py-[18px]";

type StatsPanelProps = {
  panelClassName: string;
  stats: TaskStats;
};

const StatsPanel = ({ panelClassName, stats }: StatsPanelProps) => {
  return (
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
        <StatCard label="Tasks" value={stats.total} />
        <StatCard label="Done" value={stats.completed} />
        <StatCard label="Progress" value={`${stats.progress}%`} />
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
  );
};

type StatCardProps = {
  label: string;
  value: number | string;
};

const StatCard = ({ label, value }: StatCardProps) => {
  return (
    <article className={statCardClassName}>
      <span className="block text-[2rem] font-bold">{value}</span>
      <p className="mt-1.5 text-[#93a4be]">{label}</p>
    </article>
  );
};

export default StatsPanel;
