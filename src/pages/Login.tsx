// src/pages/Login.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { UserRole } from "../types/user";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // ✅ เพิ่ม state error
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ ตรวจสอบ username / password
    if (username === "admin" && password === "1234") {
      const role: UserRole = "admin";
      localStorage.setItem("role", role);

      navigate("/admin"); // ไปหน้า admin
    } else {
      setError("❌ Username หรือ Password ไม่ถูกต้อง");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Login
        </h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border px-3 py-2 rounded-lg mt-1 focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border px-3 py-2 rounded-lg mt-1 focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>

          {/* ✅ แสดงข้อความ error ถ้า login ไม่ผ่าน */}
          {error && (
            <p className="text-red-500 text-sm font-medium">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg shadow"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
