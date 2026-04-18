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
      <div className="space-y-3 mb-10 text-center md:text-left">
        <h2 className="text-4xl font-extrabold text-white tracking-tight font-display">
          Join the <span className="text-primary-light">Revolution</span>
        </h2>
        <p className="text-slate-400 font-medium text-lg">Master your finances with our futuristic tracker.</p>
      </div>

      <form onSubmit={handleSignUp} className="space-y-6">
        <div className="flex justify-center mb-6">
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-bold text-slate-300 ml-1">
            Full Name
          </label>
          <input
            value={fullname}
            onChange={({ target }) => setFullName(target.value)}
            placeholder="Enter Full Name"
            autoComplete="name"
            type="text"
            className="input-box m-0"
            required
          />
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-bold text-slate-300 ml-1">
            Email Address
          </label>
          <input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            placeholder="name@nexus.com"
            autoComplete="email"
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
              autoComplete="new-password"
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
          Create Account
        </button>

        <p className="text-center text-slate-400 font-semibold pt-4">
          Already a member?{" "}
          <Link className="text-primary-light hover:text-white font-bold underline underline-offset-8 transition-all" to="/login">
            Sign In
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default SignUp;

