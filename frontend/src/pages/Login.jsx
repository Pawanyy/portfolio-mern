import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import constants from "../constants.js";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../store/authSlice.js";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    reset({
      email: "Pawanyyy01@gmail.com",
      password: "Py69290",
    });
  }, []);

  const onSubmit = async (data) => {
    try {
      setIsProcessing(true);
      setErrorMessage(null);
      const res = await axios.post(`${constants.API_URL}/auth/login`, data);
      if (res.data.success) {
        dispatch(loginUser(res.data.data));
        navigateTo("/admin/dashboard");
      }
    } catch (error) {
      if (error.status !== 500) {
        setErrorMessage(
          error.response?.data?.message || "Can't connect to server!"
        );
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-2xl font-bold text-center mb-4">Admin Login</h1>
          <p className="text-gray-600 text-center mb-6">
            Enter your email and password to login to your account
          </p>
          {errorMessage && (
            <p className="text-red-500 text-center mb-4">{errorMessage}</p>
          )}
          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 block w-full px-3 py-2 border rounded-lg text-gray-900 "
                placeholder="Email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/i,
                    message: "Invalid Email Address",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="mt-1 block w-full px-3 py-2 border rounded-lg text-gray-900"
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                })}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>
          <div className="mt-6 space-y-4">
            <button
              type="submit"
              className={`w-full px-4 py-2 text-white rounded-lg ${
                isProcessing
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
              disabled={isProcessing}
            >
              {isProcessing ? "Processing..." : "Login"}
            </button>
            <a
              href="#"
              className="block text-center text-blue-600 hover:underline"
            >
              Create Account
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
