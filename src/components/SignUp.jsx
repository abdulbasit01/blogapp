import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Logo } from "./index";
import authService from "../appwrite/auth";
import { login } from "../features/authSlice";
import { Button, Input } from "./common";
const SignUp = () => {
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const doSignUp = async (data) => {
    console.log(data);
    // TODO: log data
    setError("");
    try {
      let userData = await authService.createAccount(data);
      if (userData) {
        const userData = await authService.getCurrentUserSession();
        if (userData) dispatch(login(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error);
    }
  };
  return (
    <div className="flex items-center justify-center w-full">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Already have an account do{" "}
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Login
          </Link>{" "}
          to continue
        </h2>

        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form className="mt-8" onSubmit={handleSubmit(doSignUp)}>
          <div className="space-y-5">
            {/* TODO: create inputs for email, password, name */}
            <Input
              label="Name:"
              placeholder="Enter your name"
              {...register("name", {
                required: true,
              })}
            />
            <Input
              label="Email:"
              type="email"
              placeholder="Enetr your valid email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            <Input
              label="Password:"
              type="password"
              placeholder="Enter a password"
              {...register("password", {
                required: true,
              })}
            />
            <Button className="w-full" type="submit">
              Sign Up
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
