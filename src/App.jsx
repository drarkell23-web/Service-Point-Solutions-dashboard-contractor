import { Routes, Route, Navigate } from "react-router-dom";
import ContractorDashboard from "./pages/ContractorDashboard";
import Jobs from "./pages/Jobs";
import Profile from "./pages/Profile";
import Auth from "./pages/Auth";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Auth />} />

      <Route path="/" element={<ContractorDashboard />} />
      <Route path="/jobs" element={<Jobs />} />
      <Route path="/profile" element={<Profile />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
