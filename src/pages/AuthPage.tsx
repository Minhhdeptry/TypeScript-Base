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
    email: j.string().email().required(),
    password: j.string().min(7).required(),
  });

  const registerValid = j.object({
    username: j.string().min(4).required(),
    email: j.string().email().required(),
    password: j.string().min(7).required(),
    confirmPassword: j.string().valid(j.ref("password")).required(),
  });

  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
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
        localStorage.setItem("accessToken", data.accessToken);
        toast.success("Đăng nhập thành công");
        nav("/list");
      } else {
        // register
        await axios.post("http://localhost:3000/register", values);
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
            {errors.username && <span>{errors.username.message}</span>}
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
          {errors.email && <span>{errors.email.message}</span>}
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
          {errors.password && <span>{errors.password.message}</span>}
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
            {errors.confirmPassword && (
              <span>{errors.confirmPassword.message}</span>
            )}
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
