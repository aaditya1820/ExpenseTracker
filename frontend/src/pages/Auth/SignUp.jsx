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
        payload
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
      <div className="space-y-2 mb-8">
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Create Account</h2>
        <p className="text-slate-500 font-medium">Join us today to start tracking your finances effectively.</p>
      </div>

      <form onSubmit={handleSignUp} className="space-y-5">
        <div className="flex justify-center mb-4">
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">
            Full Name
          </label>
          <input
            value={fullname}
            onChange={({ target }) => setFullName(target.value)}
            placeholder="John Doe"
            autoComplete="name"
            type="text"
            className="input-box m-0"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">
            Email Address
          </label>
          <input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            placeholder="name@example.com"
            autoComplete="email"
            type="email"
            className="input-box m-0"
            required
          />
        </div>

        <div className="relative">
          <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Password</label>
          <div className="relative">
            <input
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              placeholder="••••••••"
              autoComplete="new-password"
              type={showPassword ? "text" : "password"}
              className="input-box m-0 pr-12"
              required
            />
            <button
              type="button"
              onClick={togglePassword}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors cursor-pointer"
            >
              {showPassword ? <FaRegEyeSlash size={20} /> : <FaRegEye size={20} />}
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-rose-50 border border-rose-100 text-rose-600 px-4 py-3 rounded-xl text-sm font-medium animate-shake">
            {error}
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-primary text-white py-3.5 rounded-xl font-bold text-lg shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all active:scale-[0.98] cursor-pointer"
        >
          Create Account
        </button>

        <p className="text-center text-slate-600 font-medium">
          Already have an account?{" "}
          <Link className="text-primary hover:text-primary-dark font-bold underline underline-offset-4" to="/login">
            Sign In
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default SignUp;
