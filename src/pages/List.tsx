import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
// type/interface
type Course = {
  id: number;
  name: string;
  credit: number;
  category: string;
  teacher: string;
};

type Product = {
  _id: string;
  name: string;
  price: number;
  slug: string;
  createdAt: string;
  updatedAt: string;
};

function ListPage() {
  //1. State
  const [courses, setCourses] = useState<Product[]>([]);
  const [search, setSearch] = useState("");

  //2. Call api

  // Danh sách
  useEffect(() => {
    const params: string[] = [];

    params.push('minPrice=100');
    params.push('maxPrice=100000000')

    const queryString = params.join("&");
    const getAll = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3000/api/products?${queryString}`);
        // console.log(data);
        setCourses(data.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAll();
  }, []);

  // Xóa
  const handleDelete = async (_id: string) => {
    try {
      if (!_id) return;
      // console.log(_id);
      // return;
      if (window.confirm("Bạn có chắc chắn muốn xóa không?")) {
        await axios.delete(`http://localhost:3000/api/products/${_id}`);
        
        toast.success("Xóa thành công")

        setCourses(prev => prev.filter((item) => item._id != _id));
      }
    } catch (error) {
      console.log(error);
      toast.error("Xóa thất bại: " + (error as AxiosError).message);
    }
  };


  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Danh sách</h1>
      <div className="flex justify-between items-center mb-4">
        {/* Search */}
        <input type="text" placeholder="Tìm kiếm theo tên khóa học"
        value={search} onChange={(event) => {setSearch(event.target.value)}}
        className="border px-3 py-2 rounded w-64" 
        />
        
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
                Price
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Slug
              </th>
              {/* <th className="px-4 py-2 border border-gray-300 text-left">
                Credit
              </th> */}
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
              
              // Danh sách
              .map((item) => (
                <tr key={item._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border border-gray-300">
                    {item._id}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {item.name}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {item.price}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {item.slug}
                  </td>
                  {/* <td className="px-4 py-2 border border-gray-300">
                    {item.credit}
                  </td> */}
                  <td>
                    <Link to={`/edit/${item._id}`} className='bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-700'>Sửa</Link>
                    
                    <button
                      onClick={() => {
                        handleDelete(item._id);
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
