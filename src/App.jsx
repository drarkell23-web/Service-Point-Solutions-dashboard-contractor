import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Jobs from "./pages/Jobs";
import Profile from "./pages/Profile";
import Auth from "./pages/Auth";

function App() {
  return (
    <Routes>
      {/* Login Page */}
      <Route path="/login" element={<Auth />} />

      {/* Dashboard */}
      <Route
        path="/"
        element={
          <DashboardLayout>
            <Dashboard />
          </DashboardLayout>
        }
      />

      {/* Jobs */}
      <Route
        path="/jobs"
        element={
          <DashboardLayout>
            <Jobs />
          </DashboardLayout>
        }
      />

      {/* Profile */}
      <Route
        path="/profile"
        element={
          <DashboardLayout>
            <Profile />
          </DashboardLayout>
        }
      />

      {/* Redirect everything else */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
