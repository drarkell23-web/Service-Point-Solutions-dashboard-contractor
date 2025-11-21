import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen flex">
      <Sidebar />

      <div className="flex-1 bg-gray-100">
        <Header />
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
