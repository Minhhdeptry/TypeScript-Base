import { Navigate, Outlet } from "react-router-dom";

function ProtectRoute() {
  const isLoggedIn = Boolean(localStorage.getItem("accessToken"));
  console.log(isLoggedIn);

  if (isLoggedIn) {
    return <Outlet />;
  } else {
    
    return (
      <div>
        Bạn cần đăng nhập để truy cập trang này
        <Navigate to="/login" replace></Navigate>
      </div>
    );
  }
}

export default ProtectRoute;