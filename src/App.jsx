import { Routes, Route, Navigate } from "react-router-dom";

// layout
import DashboardLayout from "./layouts/DashboardLayout";

// pages
import Auth from "./pages/Auth";
import ContractorDashboard from "./pages/ContractorDashboard";
import Jobs from "./pages/jobs";        // ⬅ match file name: jobs.jsx
import Profile from "./pages/profile";  // ⬅ match file name: profile.jsx

function App() {
  return (
    <Routes>
      {/* Login page (magic link via Supabase) */}
      <Route path="/login" element={<Auth />} />

      {/* Main dashboard */}
      <Route
        path="/"
        element={
          <DashboardLayout>
            <ContractorDashboard />
          </DashboardLayout>
        }
      />

      {/* Jobs list */}
      <Route
        path="/jobs"
        element={
          <DashboardLayout>
            <Jobs />
          </DashboardLayout>
        }
      />

      {/* Contractor profile/settings */}
      <Route
        path="/profile"
        element={
          <DashboardLayout>
            <Profile />
          </DashboardLayout>
        }
      />

      {/* Anything else -> dashboard */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
