import { useForm } from "react-hook-form";

function EditPage() {
    const {
      register,
      handleSubmit,
      formState: {errors}
    } = useForm()

    const onSubmit = () => {

    }
  return(
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Cập nhật</h1>

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
            <option></option>
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
                value: 0,
                message: "Không được nhỏ hơn 0",
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
          Submit
        </button>
      </form>
    </div>
  );
}

export default EditPage;
