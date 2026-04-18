import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import AuthLayout from "../../components/layouts/AuthLayout";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector.jsx";
import { UserContext } from "../../context/UserContext.jsx";
import { validateEmail } from "../../utils/helper.js";
import uploadImage from "../../utils/uploadImage.js";
import axiosInstance from "../../utils/axiosInstance.js";
import { API_PATHS } from "../../utils/apiPaths";

const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const togglePassword = () => setShowPassword(!showPassword);

  const handleSignUp = async (e) => {
    e.preventDefault();
    let profileImageUrl = "";
    if (!fullname) {
      setError("Please enter your name");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email");
      return;
    }
    if (!password) {
      setError("Please enter the password");
      return;
    }
    setError("");

    try {
      if (profilePic) {
        try {
          const imgUploadRes = await uploadImage(profilePic);
          profileImageUrl = imgUploadRes?.imageUrl || "";
        } catch (err) {
          setError("Image upload failed.");
          return;
        }
      }
      const payload = {
        fullName: fullname,
        email,
        password,
        profileImageUrl,
      };

      const response = await axiosInstance.post(
        API_PATHS.AUTH.REGISTER,
        payload,
      );
      const { token, user } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <AuthLayout>
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-blue-900 tracking-tight">
          Create Account
        </h2>
        <p className="text-blue-400 font-medium mt-1 text-sm">
          Join CashSprout and track properly.
        </p>
      </div>

      <form onSubmit={handleSignUp} className="space-y-4">
        <div className="flex justify-center mb-2 scale-90">
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="text-[10px] font-bold text-blue-900 uppercase tracking-widest ml-1">
              Full Name
            </label>
            <input
              value={fullname}
              onChange={({ target }) => setFullName(target.value)}
              placeholder="Enter Full Name"
              type="text"
              className="input-box !mt-1 !mb-0 placeholder:text-blue-900"
              required
            />
          </div>

          <div>
            <label className="text-[10px] font-bold text-blue-900 uppercase tracking-widest ml-1">
              Email Address
            </label>
            <input
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              placeholder="name@email.com"
              type="email"
              className="input-box !mt-1 !mb-0 placeholder:text-blue-900"
              required
            />
          </div>

          <div>
            <label className="text-[10px] font-bold text-blue-900 uppercase tracking-widest ml-1">
              Password
            </label>
            <div className="relative">
              <input
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                placeholder="••••••••"
                type={showPassword ? "text" : "password"}
                className="input-box !mt-1 !mb-0 pr-12 placeholder:text-blue-900"
                required
              />
              <button
                type="button"
                onClick={togglePassword}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-300 hover:text-blue-600 transition-colors"
              >
                {showPassword ? (
                  <FaRegEyeSlash size={16} />
                ) : (
                  <FaRegEye size={16} />
                )}
              </button>
            </div>
          </div>
        </div>

        {error && (
          <p className="text-rose-500 text-[10px] font-bold bg-rose-50 p-3 rounded-xl border border-rose-100">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-blue-700 transition-all active:scale-[0.98] shadow-lg shadow-blue-500/20 mt-2"
        >
          Get Started
        </button>

        <p className="text-center text-slate-500 text-xs font-medium">
          Member?{" "}
          <Link
            className="text-blue-600 hover:text-blue-800 font-bold underline underline-offset-4"
            to="/login"
          >
            Sign In
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default SignUp;
