import { useEffect, useState } from "react";
import axios from "axios";
// type/interface
type Course = {
  id: number;
  name: string;
  credit: number;
  category: string;
  teacher: string;
};

function ListPage() {
  //1. State
  const [courses, setCourses] = useState<Course[]>([]);
  const [search, setSearch] = useState("");
  const [teacher, setTeacher] = useState("all");

  //2. Call api

  // Danh sách
  useEffect(() => {
    const getAll = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/courses");
        // console.log(data);
        setCourses(data);
      } catch (error) {
        console.log(error);
      }
    };
    getAll();
  }, []);

  // Xóa
  const handleDelete = async (id: number) => {
    try {
      if (!id) return;
      if (window.confirm("Bạn có chắc chắn muốn xóa không?")) {
        await axios.delete(`http://localhost:3000/courses/${id}`);
        alert("Xóa thành công");

        setCourses((prev) => {
          return prev.filter((item) => item.id != id);
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Lọc
  const teachers = Array.from(new Set(courses.map((item) => item.teacher)));

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Danh sách</h1>
      <div className="flex justify-between items-center mb-4">
        {/* Search */}
        <input type="text" placeholder="Tìm kiếm theo tên"
        value={search} onChange={(event) => {setSearch(event.target.value)}}
        className="border px-3 py-2 rounded w-64" 
        />

        {/* Lọc */}
        <select value={teacher} onChange={(event) => setTeacher(event.target.value)} className="border px-3 py-2 rounded">
          <option value="all">Tất cả giảng viên</option>
          {teachers.map((item) => (
            <option key={item} value={item} > {item} </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border border-gray-300 text-left">ID</th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Name
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Teacher
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Category
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Credit
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {courses
              // Search
              .filter((item) =>
                item.name.toLowerCase().includes(search.toLowerCase()),
              )
              // Lọc
              .filter((item) => (
                teacher === "all" || item.teacher === teacher
              ))
              // Danh sách
              .map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border border-gray-300">
                    {item.id}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {item.name}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {item.teacher}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {item.category}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {item.credit}
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        handleDelete(item.id);
                      }}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListPage;
