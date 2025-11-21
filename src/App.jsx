import { Routes, Route, Navigate } from "react-router-dom";

// Layout
import DashboardLayout from "./layouts/DashboardLayout";

// Pages
import Dashboard from "./pages/Dashboard";
import Jobs from "./pages/Jobs";
import Profile from "./pages/Profile";
import Auth from "./pages/Auth";

export default function App() {
  return (
    <Routes>

      {/* Public login page */}
      <Route path="/login" element={<Auth />} />

      {/* Dashboard Home */}
      <Route
        path="/"
        element={
          <DashboardLayout>
            <Dashboard />
          </DashboardLayout>
        }
      />

      {/* Jobs page */}
      <Route
        path="/jobs"
        element={
          <DashboardLayout>
            <Jobs />
          </DashboardLayout>
        }
      />

      {/* Profile page */}
      <Route
        path="/profile"
        element={
          <DashboardLayout>
            <Profile />
          </DashboardLayout>
        }
      />

      {/* Catch-all redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
