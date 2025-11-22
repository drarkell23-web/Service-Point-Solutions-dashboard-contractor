export default function StatCard({ title, value, label, trend, trendColor }) {
  return (
    <div className="flex flex-col justify-between rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100 dark:bg-slate-900 dark:ring-slate-800">
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <span>{title}</span>
        <span className="rounded-full bg-slate-100 px-2 py-[2px] text-[10px] text-slate-500 dark:bg-slate-800 dark:text-slate-300">
          {label}
        </span>
      </div>
      <div className="mt-3 flex items-end justify-between">
        <div>
          <div className="text-2xl font-semibold text-slate-900 dark:text-white">
            {value}
          </div>
          <div
            className={`mt-1 text-[11px] font-medium ${
              trendColor || "text-emerald-500"
            }`}
          >
            {trend}
          </div>
        </div>
        <div className="h-10 w-12 rounded-xl bg-gradient-to-tr from-violet-500/10 to-violet-500/40 dark:from-violet-400/20 dark:to-violet-500/60" />
      </div>
    </div>
  );
}
