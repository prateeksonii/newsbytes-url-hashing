import { useAtom } from "jotai";
import type { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { publicApi } from "../api";
import loggedInAtom from "../atoms/loggedInAtom";

interface LoginFormValues {
  username: string;
  password: string;
}

const Home: FC = () => {
  const [, setLoggedIn] = useAtom(loggedInAtom);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginFormValues>();

  const onSubmit: SubmitHandler<LoginFormValues> = async (values) => {
    try {
      const res = await publicApi.post("/api/v1/auth", values);
      localStorage.setItem("hash_jwt", res.data.data.token);
      setLoggedIn(true);
    } catch (err: any) {
      toast.error(err.response.data.error.message);
    }
  };

  return (
    <section className="px-8 md:px-0 py-10 max-w-[60ch] mx-auto">
      <h1 className="text-3xl font-bold text-center">
        URL Hashing System for NewsBytes
      </h1>
      <form
        className="mt-12 text-lg flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="bg-dark2 text-lg p-2 rounded"
            {...register("username", {
              required: "Username is required",
            })}
          />
          <div className="text-red-500">{errors?.username?.message}</div>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="bg-dark2 text-lg p-2 rounded"
            {...register("password", {
              required: "Password is required",
            })}
          />
          <div className="text-red-500">{errors?.password?.message}</div>
        </div>
        <button
          type="submit"
          className="mt-3 bg-primary py-3 text-lg font-medium rounded"
        >
          Login
        </button>
      </form>
    </section>
  );
};

export default Home;
