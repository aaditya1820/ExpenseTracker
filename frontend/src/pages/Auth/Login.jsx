import React, { useState } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance"; 
import { API_PATHS } from "../../utils/apiPaths";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";


const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  const {updateUser} = useContext(UserContext)

  const togglePassword = () => setShowPassword(!showPassword);
  const navigate = useNavigate();

  
  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password);

    if (!validateEmail(email)) {
      setError("Please enter a valid email address!");
      return;
    }

    if (!password) {
      setError("Please enter the password!");
      return;
    }

    setError("");
    
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(user)
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
        <h3 className="text-2xl font-semibold text-black">Welcome Back !!</h3>
        <p className="text-xl text-slate-700 mt-[5px] mb-6">
          Please Enter Your Details To LogIn !!
        </p>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Email Address
            </label>
            <input
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              placeholder="example@gmail.com"
              autoComplete="off"
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
              required
            />
          </div>

          <div className="relative">
            <label className="block text-sm text-gray-700 mb-1">Password</label>
            <input
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              placeholder="Enter your password"
              autoComplete="new-password"
              type={showPassword ? "text" : "password"}
              className="w-full px-4 py-2 border border-gray-300 rounded pr-10 focus:outline-none focus:ring-2 focus:ring-purple-600"
              required
            />
            <div
              onClick={togglePassword}
              className="absolute right-3 top-[38px] cursor-pointer text-gray-500"
            >
              {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-700 text-white py-2 hover:bg-fuchsia-700 rounded-xl transition"
          >
            Log In
          </button>

          <p className="text-[13px] text-slate-800 mt-3">
            Don't have an account?{" "}
            <Link className="font-medium text-primary underline" to="/signup">
              Sign Up
            </Link>
          </p>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;
