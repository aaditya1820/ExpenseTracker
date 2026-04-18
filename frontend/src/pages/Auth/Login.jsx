import React, { useState, useContext } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance"; 
import { API_PATHS } from "../../utils/apiPaths";
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
  const navigate = useNavigate();

  const togglePassword = () => setShowPassword(!showPassword);

  const handleLogin = async (e) => {
    e.preventDefault();
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
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-blue-900 tracking-tight">Sign In</h2>
        <p className="text-blue-400 font-medium mt-1">Welcome back to CashSprout.</p>
      </div>

      <form onSubmit={handleLogin} className="space-y-6">
        <div>
          <label className="text-xs font-bold text-blue-900 uppercase tracking-widest ml-1">
            Email Address
          </label>
          <input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            placeholder="name@email.com"
            type="email"
            className="input-box placeholder:text-blue-200"
            required
          />
        </div>

        <div>
          <label className="text-xs font-bold text-blue-900 uppercase tracking-widest ml-1">Password</label>
          <div className="relative">
            <input
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              placeholder="••••••••"
              type={showPassword ? "text" : "password"}
              className="input-box pr-12 placeholder:text-blue-200"
              required
            />
            <button
              type="button"
              onClick={togglePassword}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-300 hover:text-blue-600 transition-colors"
            >
              {showPassword ? <FaRegEyeSlash size={18} /> : <FaRegEye size={18} />}
            </button>
          </div>
        </div>

        {error && (
          <p className="text-rose-500 text-xs font-bold bg-rose-50 p-4 rounded-xl border border-rose-100">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-blue-700 transition-all active:scale-[0.98] shadow-lg shadow-blue-500/20"
        >
          Sign In
        </button>

        <p className="text-center text-slate-500 text-sm font-medium">
          New here?{" "}
          <Link className="text-blue-600 hover:text-blue-800 font-bold underline underline-offset-4" to="/signup">
            Create account
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Login;



