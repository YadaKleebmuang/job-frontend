import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import NavBar from "./components/NavBar";
import Login from "./pages/Login";
import CreateJob from "./pages/CreateJob";
import JobList from "./pages/JobList";
import JobDetail from "./pages/JobDetail";
import TermsPage from "./pages/TermsPage";
import type { UserRole } from "./types/user"; // ✅ ใช้ UserRole เดียวกับ NavBar


function App() {
  const [userRole, setUserRole] = useState<UserRole>("seeker");

  const handleLogin = () => setUserRole("admin"); // mock: login เป็น admin เลย
  const handleLogout = () => setUserRole("seeker");

  return (
    
    <BrowserRouter>
      <NavBar
        userRole={userRole}
        onLoginClick={handleLogin}
        onLogout={handleLogout}
      />
      <Routes>
        <Route path="/" element={<JobList />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin/dashboard"
          element={<h1 className="text-center mt-20 text-3xl">Admin Dashboard</h1>}
        />
        <Route path="/create-job" element={<CreateJob />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/job/:id" element={<JobDetail />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
