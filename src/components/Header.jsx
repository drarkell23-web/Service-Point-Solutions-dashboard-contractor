export default function Header({ theme, setTheme }) {
  const isDark = theme === "dark";

  function toggleTheme() {
    setTheme(isDark ? "light" : "dark");
  }

  return (
    <header className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-6 py-4 text-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center gap-3">
        <h1 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
          Analytics
        </h1>
        <span className="rounded-full bg-slate-200 px-3 py-1 text-[11px] text-slate-600 dark:bg-slate-800 dark:text-slate-300">
          01.08.2022 – 31.08.2022
        </span>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-[11px] text-slate-500 dark:bg-slate-800 dark:text-slate-300 md:flex">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          <span>All systems normal</span>
        </div>

        {/* theme toggle */}
        <button
          onClick={toggleTheme}
          className="flex items-center gap-1 rounded-full border border-slate-300 bg-white px-2 py-1 text-[11px] text-slate-600 shadow-sm transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
        >
          <span>{isDark ? "🌙" : "☀️"}</span>
          <span className="hidden md:inline">
            {isDark ? "Dark" : "Light"} mode
          </span>
        </button>

        <div className="flex items-center gap-3">
          <button className="hidden h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 md:flex">
            🔔
          </button>
          <div className="flex items-center gap-2 rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-50">
            <img
              src="https://i.pravatar.cc/40?img=13"
              alt="avatar"
              className="h-7 w-7 rounded-full object-cover"
            />
            <div className="hidden flex-col md:flex">
              <span className="font-semibold">Lead Partner</span>
              <span className="text-[10px] opacity-80">
                servicepoint-sa.com
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
