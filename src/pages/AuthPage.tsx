import axios from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import j from "joi";
import { joiResolver } from "@hookform/resolvers/joi";

type Props = {
  isLogin?: boolean;
};

type FormValues = {
  username?: string;
  email: string;
  password: string;
  confirmPassword?: string;
};

function AuthPage({ isLogin }: Props) {
  const loginValid = j.object({
    email: j.string().email().required() .messages({
      "string.base": "Email phải là chuỗi",
      "string.email": "Email không đúng định dạng",
      "any.required": "Email không được để trống",
      "string.empty": "Email không được để trống",
    }),
    password: j.string().min(6).required() .messages({
      "string.base": "Mật khẩu phải là chuỗi",
      "string.min": "Mật khẩu phải có ít nhất 6 ký tự",
      "string.empty": "Mật khẩu không được để trống",
      "any.required": "Vui lòng nhập mật khẩu",
    }),
  });

  const registerValid = j.object({
    username: j.string().min(4).required() .messages({
      "string.base": "Username phải là chuỗi",
      "string.min": "Username phải có ít nhất 4 ký tự",
      "string.empty": "Username không được để trống",
      "any.required": "Vui lòng nhập username",
    }),
    email: j.string().email().required() .messages({
      "string.base": "Email phải là chuỗi",
      "string.email": "Email không đúng định dạng",
      "any.required": "Email không được để trống",
      "string.empty": "Email không được để trống",
    }),
    password: j.string().min(6).required() .messages({
      "string.base": "Mật khẩu phải là chuỗi",
      "string.min": "Mật khẩu phải có ít nhất 6 ký tự",
      "string.empty": "Mật khẩu không được để trống",
      "any.required": "Vui lòng nhập mật khẩu",
    }),
    confirmPassword: j.string().valid(j.ref("password")).required() .messages({
      "any.only": "Mật khẩu không khớp",
      "any.required": "Vui lòng nhập lại mật khẩu",
      "string.empty": "Vui lòng nhập lại mật khẩu",
    }),
  });

  const nav = useNavigate();
  const {
    register,
    handleSubmit,
  } = useForm<FormValues>({
    resolver: joiResolver(isLogin ? loginValid : registerValid),
  });
  const onSubmit = async (values: FormValues) => {
    try {
      if (isLogin) {
        const { data } = await axios.post(
          "http://localhost:3000/login",
          values,
        );
        // console.log(data);

        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("user", JSON.stringify({ email: values.email }));
        toast.success("Đăng nhập thành công");
        nav("/list");
      } else {
        // register
        const { confirmPassword, ...data } = values;
        await axios.post("http://localhost:3000/register", data);
        toast.success("Đăng ký thành công");
        nav("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="">
      <h1 className="text-3xl">{isLogin ? "Login" : "Register"}</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {!isLogin && (
          <div>
            <label htmlFor="text" className="block font-medium mb-1">
              Username
            </label>
            <input
              {...register("username")}
              type="text"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        <div>
          <label htmlFor="text" className="block font-medium mb-1">
            Email
          </label>
          <input
            {...register("email")}
            type="email"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="text" className="block font-medium mb-1">
            Password
          </label>
          <input
            {...register("password")}
            type="password"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {!isLogin && (
          <div>
            <label htmlFor="text" className="block font-medium mb-1">
              Confirm Password
            </label>
            <input
              {...register("confirmPassword")}
              type="password"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            
          </div>
        )}

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

export default AuthPage;
