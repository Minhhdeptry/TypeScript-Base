import { Toaster } from "react-hot-toast";
import { Link, Route, Routes } from "react-router-dom";
// import Button from "./components/Button";

import HomePage from "./pages/Home";
import ListPage from "./pages/List";
import AddPage from "./pages/Add";
// import EditPage from "./pages/Edit";
// import { useEffect, useState } from "react";

function App() {

  // const [count, setCount] = useState(0);
  // useEffect(() => {
  //   console.log("App components đã được render");
  //   document.title = `Count is ${count}`
  // },[])
  return (
    <>
      {/* <h1>Biến count có giá trị: {count}</h1>
      <Button 
      count = {count}
      label="Tăng count thêm 1"
      color="primary"
      bgColor="#007bff"
      onClick={() => setCount(count + 1)}
      /> */}
      
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
            <Link to="#" className="hover:text-gray-200">
              Đăng nhập
            </Link>
            <Link to="#" className="hover:text-gray-200">
              Đăng ký
            </Link>
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <div className="max-w-6xl mx-auto mt-10 px-4 text-center">
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/list" element={<ListPage/>}/>
          <Route path="/add" element={<AddPage/>}/>
          <Route path="/edit/:id" element={<AddPage/>}/>
        </Routes>
      </div>

      <Toaster/>
    </>
  );
}

export default App;
