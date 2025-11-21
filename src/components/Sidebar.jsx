import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 bg-white shadow-md h-screen p-6">
      <h2 className="text-xl font-bold mb-6 text-blue-600">Contractor</h2>

      <nav className="flex flex-col gap-4">
        <NavLink to="/" className="hover:text-blue-500">
          Dashboard
        </NavLink>

        <NavLink to="/jobs" className="hover:text-blue-500">
          Jobs
        </NavLink>

        <NavLink to="/profile" className="hover:text-blue-500">
          Profile
        </NavLink>

        <NavLink to="/login" className="hover:text-blue-500 text-red-500">
          Logout
        </NavLink>
      </nav>
    </div>
  );
}
