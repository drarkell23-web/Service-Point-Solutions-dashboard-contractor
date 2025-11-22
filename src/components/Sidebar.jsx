import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/", label: "Analytics", icon: "📊" },
  { to: "/jobs", label: "Jobs", icon: "🧰" },
  { to: "/profile", label: "Profile", icon: "👤" },
];

export default function Sidebar() {
  return (
    <aside className="hidden w-56 flex-shrink-0 flex-col border-r border-slate-200 bg-slate-50 pt-6 text-sm dark:border-slate-800 dark:bg-slate-900 md:flex">
      <div className="px-5 pb-6">
        <div className="mb-6 flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-violet-500 text-white font-semibold">
            SP
          </div>
          <div className="flex flex-col">
            <span className="text-xs uppercase tracking-[0.2em] text-slate-400">
              Service Point SA
            </span>
            <span className="text-sm font-semibold text-slate-800 dark:text-slate-50">
              Contractor
            </span>
          </div>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                [
                  "flex items-center gap-2 rounded-xl px-3 py-2 transition",
                  isActive
                    ? "bg-slate-900 text-slate-50 dark:bg-slate-100 dark:text-slate-900"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white",
                ].join(" ")
              }
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="mt-auto px-5 pb-6">
        <button className="flex w-full items-center justify-between rounded-xl bg-slate-900 px-3 py-3 text-left text-xs text-slate-100 shadow-sm dark:bg-slate-100 dark:text-slate-900">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 text-base dark:bg-slate-200">
              💬
            </div>
            <div className="flex flex-col">
              <span className="font-semibold">Need help?</span>
              <span className="text-[10px] opacity-80">
                Support is online 24/7
              </span>
            </div>
          </div>
          <span className="text-[10px] underline">Get support</span>
        </button>
      </div>
    </aside>
  );
}
