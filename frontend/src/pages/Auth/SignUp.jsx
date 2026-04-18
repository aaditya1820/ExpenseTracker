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
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-[#caf0f8] tracking-tight">Create Account</h2>
        <p className="text-[#90e0ef] font-medium mt-1">Join CashSprout and track properly.</p>
      </div>

      <form onSubmit={handleSignUp} className="space-y-6">
        <div className="flex justify-center mb-6">
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
        </div>

        <div>
          <label className="text-xs font-bold text-[#00b4d8] uppercase tracking-widest ml-1">
            Full Name
          </label>
          <input
            value={fullname}
            onChange={({ target }) => setFullName(target.value)}
            placeholder="Enter Full Name"
            type="text"
            className="input-box border-[#0077b6] focus:border-[#48cae4] placeholder:text-[#0077b6]"
            required
          />
        </div>

        <div>
          <label className="text-xs font-bold text-[#00b4d8] uppercase tracking-widest ml-1">
            Email Address
          </label>
          <input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            placeholder="name@email.com"
            type="email"
            className="input-box border-[#0077b6] focus:border-[#48cae4] placeholder:text-[#0077b6]"
            required
          />
        </div>

        <div>
          <label className="text-xs font-bold text-[#00b4d8] uppercase tracking-widest ml-1">Password</label>
          <div className="relative">
            <input
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              placeholder="••••••••"
              type={showPassword ? "text" : "password"}
              className="input-box pr-12 border-[#0077b6] focus:border-[#48cae4] placeholder:text-[#0077b6]"
              required
            />
            <button
              type="button"
              onClick={togglePassword}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#0077b6] hover:text-[#48cae4] transition-colors"
            >
              {showPassword ? <FaRegEyeSlash size={18} /> : <FaRegEye size={18} />}
            </button>
          </div>
        </div>

        {error && (
          <p className="text-[#f43f5e] text-xs font-bold bg-[#f43f5e]/5 p-4 rounded-xl border border-[#f43f5e]/10">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="w-full bg-[#00b4d8] text-[#03045e] py-4 rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-[#48cae4] transition-all active:scale-[0.98]"
        >
          Get Started
        </button>

        <p className="text-center text-[#90e0ef] text-sm font-medium">
          Member?{" "}
          <Link className="text-[#caf0f8] hover:text-[#00b4d8] font-bold underline underline-offset-4" to="/login">
            Sign In
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};


export default SignUp;


