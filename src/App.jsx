import { Routes, Route, Navigate } from "react-router-dom";

// layout
import DashboardLayout from "./layouts/DashboardLayout.jsx";

// pages (all lowercase because your filenames are lowercase)
import Auth from "./pages/Auth.jsx";
import ContractorDashboard from "./pages/ContractorDashboard.jsx";
import Jobs from "./pages/jobs.jsx";
import Profile from "./pages/profile.jsx";

function App() {
  return (
    <Routes>
      {/* Login Page */}
      <Route path="/login" element={<Auth />} />

      {/* Dashboard Home */}
      <Route
        path="/"
        element={
          <DashboardLayout>
            <ContractorDashboard />
          </DashboardLayout>
        }
      />

      {/* Jobs Page */}
      <Route
        path="/jobs"
        element={
          <DashboardLayout>
            <Jobs />
          </DashboardLayout>
        }
      />

      {/* Profile Page */}
      <Route
        path="/profile"
        element={
          <DashboardLayout>
            <Profile />
          </DashboardLayout>
        }
      />

      {/* Redirect all unknown routes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
