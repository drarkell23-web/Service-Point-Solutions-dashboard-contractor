import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";

// Corrected imports (matching your real file names)
import ContractorDashboard from "./pages/ContractorDashboard";
import Jobs from "./pages/jobs";
import Profile from "./pages/profile";
import Auth from "./pages/Auth";
import Home from "./pages/Home";

function App() {
  return (
    <Routes>
      {/* Login */}
      <Route path="/login" element={<Auth />} />

      {/* Home */}
      <Route
        path="/"
        element={
          <DashboardLayout>
            <Home />
          </DashboardLayout>
        }
      />

      {/* Dashboard */}
      <Route
        path="/dashboard"
        element={
          <DashboardLayout>
            <ContractorDashboard />
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

      {/* fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
