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
      <div className="space-y-3 mb-10 text-center md:text-left">
        <h2 className="text-4xl font-extrabold text-white tracking-tight font-display">
          Welcome <span className="text-primary-light">Back</span>
        </h2>
        <p className="text-slate-400 font-medium text-lg">Your financial hub is waiting for you.</p>
      </div>

      <form onSubmit={handleLogin} className="space-y-6">
        <div className="space-y-1">
          <label className="block text-sm font-bold text-slate-300 ml-1">
            Email Address
          </label>
          <input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            placeholder="name@nexus.com"
            autoComplete="off"
            type="email"
            className="input-box m-0"
            required
          />
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-bold text-slate-300 ml-1">Password</label>
          <div className="relative">
            <input
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
              type={showPassword ? "text" : "password"}
              className="input-box m-0 pr-14"
              required
            />
            <button
              type="button"
              onClick={togglePassword}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-primary-light transition-colors cursor-pointer"
            >
              {showPassword ? <FaRegEyeSlash size={22} /> : <FaRegEye size={22} />}
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 px-5 py-4 rounded-2xl text-sm font-bold animate-shake">
            {error}
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-gradient-to-br from-primary to-primary-dark text-white py-4 rounded-2xl font-bold text-lg shadow-2xl shadow-primary/20 hover:shadow-primary/40 transition-all active:scale-[0.98] cursor-pointer"
        >
          Sign In
        </button>

        <p className="text-center text-slate-400 font-semibold pt-4">
          New here?{" "}
          <Link className="text-primary-light hover:text-white font-bold underline underline-offset-8 transition-all" to="/signup">
            Create account
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Login;

