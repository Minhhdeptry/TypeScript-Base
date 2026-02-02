// import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
// import z from 'zod';

type FormValues = {
  name: string;
  teacher: string;
  category: string;
  credit: number;
};

function AddPage() {
  // const validate = z.object({
  //   // name: z.string().min(3, "Name 3 ký tự").max(10),
  //   // teacher: z.string().min(3, "Name 3 ký tự").max(10),
  // })
  const { id } = useParams();
  // console.log(id);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();
  const nav = useNavigate();

  useEffect(() => {
    if(!id) return;
    const getCourseById = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3000/Courses/${id}`);
        reset(data);
      } catch (error) {
        console.log(error);
      }
    };
    getCourseById();
  }, [id]);

  const onSubmit = async (values: FormValues) => {
    console.log(values);

    try {
      if (id) {
        // edit
        await axios.put(`http://localhost:3000/Courses/${id}`, values);
        toast.success("Cập nhật thành công");
        nav("/list");
      } else {
        // add
        await axios.post(`http://localhost:3000/Courses`, values);
        toast.success("Thêm mới thành công")
        nav("/list");
      }
    } catch (error) {
      console.log(error);
      toast.error("Thất bại: " + (error as AxiosError).message)
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Thêm mới + Chỉnh sửa</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name input */}
        <div>
          <label htmlFor="name" className="block font-medium mb-1">
            Name
          </label>
          <input
            {...register("name", {
              required: "Không được để trống tên khóa học",
              minLength: {
                value: 3,
                message: "Không được nhỏ hơn 3 ký tự",
              },
            })}
            type="text"
            id="name"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.name && (
            <span className="text-red-500">
              {errors.name.message as string}
            </span>
          )}
        </div>
        <div>
          <label htmlFor="teacher" className="block font-medium mb-1">
            Teacher
          </label>
          <input
            {...register("teacher", {
              required: "Không được để trống giảng viên",
              minLength: {
                value: 3,
                message: "Không được nhỏ hơn 3 ký tự",
              },
            })}
            type="text"
            id="teacher"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.teacher && (
            <span className="text-red-500">
              {errors.teacher.message as string}
            </span>
          )}
        </div>

        {/* Select */}
        <div>
          <label htmlFor="category" className="block font-medium mb-1">
            Category
          </label>
          <select
            {...register("category", {
              required: "Cần chọn danh mục",
            })}
            id="category"
            className="w-full border rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">--Chọn danh mục--</option>
            <option value="Chuyên ngành">Chuyên ngành</option>
            <option value="Cơ sở">Cơ sở</option>
            <option value="Đại cương">Đại cương</option>
          </select>
          {errors.category && (
            <span className="text-red-500">
              {errors.category.message as string}
            </span>
          )}
        </div>

        <div>
          <label htmlFor="credit" className="block font-medium mb-1">
            Credit
          </label>
          <input
            {...register("credit", {
              valueAsNumber: true,
              required: "Không được để trống credit",
              min: {
                value: 1,
                message: "Phải lớn hơn 0",
              },
            })}
            type="number"
            id="credit"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.credit && (
            <span className="text-red-500">
              {errors.credit.message as string}
            </span>
          )}
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Hoàn thành
        </button>
      </form>
    </div>
  );
}

export default AddPage;
