import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Dashboard", icon: "📊" },
  { to: "/jobs", label: "Jobs", icon: "🛠️" },
  { to: "/profile", label: "Profile", icon: "👤" }
];

export default function Sidebar() {
  return (
    <aside className="hidden md:flex md:flex-col w-60 bg-slate-950 border-r border-slate-800">
      <div className="flex items-center gap-2 px-6 py-5 border-b border-slate-800">
        <div className="h-9 w-9 rounded-full bg-sp-green flex items-center justify-center font-bold text-slate-900">
          SP
        </div>
        <div>
          <p className="text-sm font-semibold">ServicePoint SA</p>
          <p className="text-xs text-slate-400">Contractor Portal</p>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {links.map(link => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === "/"}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition ${
                isActive
                  ? "bg-sp-green text-slate-900"
                  : "text-slate-300 hover:bg-slate-800"
              }`
            }
          >
            <span className="text-lg">{link.icon}</span>
            {link.label}
          </NavLink>
        ))}
      </nav>

      <div className="px-4 pb-4 text-xs text-slate-500">
        © {new Date().getFullYear()} ServicePoint SA
      </div>
    </aside>
  );
}
