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

      console.log("Payload before sending:", payload); // helpful to verify

      const response = await axiosInstance.post(
        API_PATHS.AUTH.REGISTER,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Signup error:", error);
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
        <h3 className="text-2xl font-semibold text-black">Create an Account</h3>
        <p className="text-xl text-slate-700 mt-[5px] mb-6">
          Join us today by entering your details below !!
        </p>

        <form onSubmit={handleSignUp} className="space-y-5">
          <div className="flex justify-center">
            <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Full Name
            </label>
            <input
              value={fullname}
              onChange={({ target }) => setFullName(target.value)}
              placeholder="Your Name"
              autoComplete="name"
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Email Address
            </label>
            <input
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              placeholder="example@gmail.com"
              autoComplete="email"
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
              required
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm text-gray-700 mb-1">Password</label>
            <div className="relative">
              <input
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                placeholder="Enter a strong password"
                autoComplete="new-password"
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-2 border border-gray-300 rounded pr-10 focus:outline-none focus:ring-2 focus:ring-purple-600"
                required
              />
              <div
                onClick={togglePassword}
                className="absolute right-3 top-2/4 -translate-y-2/4 cursor-pointer text-gray-500"
              >
                {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-700 text-white py-2 hover:bg-fuchsia-700 rounded-xl transition"
          >
            Sign Up
          </button>

          <p className="text-[13px] text-slate-800 mt-3">
            Already have an account?{" "}
            <Link className="font-medium text-primary underline" to="/login">
              Log In
            </Link>
          </p>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
