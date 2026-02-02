import toast, { Toaster } from "react-hot-toast";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
// import Button from "./components/Button";

import HomePage from "./pages/Home";
import ListPage from "./pages/List";
import AddPage from "./pages/Add";
import AuthPage from "./pages/AuthPage";
import ProtectRoute from "./components/ProtectRoute";
import { useState } from "react";
// import EditPage from "./pages/Edit";
// import { useEffect, useState } from "react";

type User = {
  email: string;
};
function App() {
  const nav = useNavigate();
  const [user, setUser] = useState<User | null>(() => {
    const data = localStorage.getItem("user");
    return data ? JSON.parse(data) : null;
  });

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    toast.success("Đăng xuất thành công");
    nav("/login");
  };
  console.log({ user });

  return (
    <>
      <nav className="bg-blue-600 text-white shadow">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="text-xl font-semibold">
            <strong>WEB502 App</strong>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="hover:text-gray-200">
              Trang chủ
            </Link>
            <Link to="/list" className="hover:text-gray-200">
              Danh sách
            </Link>
            <Link to="/add" className="hover:text-gray-200">
              Thêm mới
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            {user ? (
              <>
                <span>Hello {user.email}</span>
                <button
                  className="bg-red-500 rounded-2xl p-2"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-gray-200">
                  Đăng nhập
                </Link>
                <Link to="/register" className="hover:text-gray-200">
                  Đăng ký
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <div className="max-w-6xl mx-auto mt-10 px-4 text-center">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route element={<ProtectRoute></ProtectRoute>}>
            <Route path="/list" element={<ListPage />} />
          </Route>

          <Route element={<ProtectRoute></ProtectRoute>}>
            <Route path="/add" element={<AddPage />} />
            <Route path="/edit/:id" element={<AddPage />} />
          </Route>

          <Route path="/register" element={<AuthPage />} />
          <Route path="/login" element={<AuthPage isLogin={true} />} />
        </Routes>
      </div>

      <Toaster />
    </>
  );
}

export default App;
