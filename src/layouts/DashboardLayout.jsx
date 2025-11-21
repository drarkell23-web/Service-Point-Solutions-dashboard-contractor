import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <TopBar />
        <main className="flex-1 overflow-y-auto p-6 lg:p-8 bg-slate-950/60">
          {children}
        </main>
      </div>
    </div>
  );
}
