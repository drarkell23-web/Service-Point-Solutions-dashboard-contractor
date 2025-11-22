import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function DashboardLayout({ children }) {
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "dark";
    return localStorage.getItem("sps-theme") || "dark";
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem("sps-theme", theme);
  }, [theme]);

  const isDark = theme === "dark";

  return (
    <div className={isDark ? "dark" : ""}>
      <div className="flex min-h-screen bg-slate-100 text-slate-900 dark:bg-slate-950 dark:text-slate-50">
        <Sidebar />
        <div className="flex flex-1 flex-col">
          <Header theme={theme} setTheme={setTheme} />
          <main className="flex-1 overflow-y-auto bg-slate-100 p-6 dark:bg-slate-950">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
