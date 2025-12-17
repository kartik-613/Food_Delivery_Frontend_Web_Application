import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/features/user.slice";

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); 
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        `${VITE_BASE_URL}/auth/signin`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      dispatch(setUserData(result.data.user));
      setError("");
      setEmail("");
      setPassword("");
      Navigate("/")
    } catch (error) {
      setError(error.response?.data.message );
    }

    console.log("Login:", { email, password });
  };

  const handleGoogleAuth = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    try {
      const res = await axios.post(
        `${VITE_BASE_URL}/auth/google-auth`,
        {
          email: result.user.email,
        },
        { withCredentials: true }
      );
      dispatch(setUserData(res.data.user));
    } catch (error) {
      console.log("Error during Google Auth:", error.response?.data);
    }
  };

  return (
    <div className="w-full h-screen bg-amber-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[360px]">

        <h1 className="text-4xl font-bold mb-1 text-amber-400">Vingo</h1>
        <p className="text-gray-600 mb-4">
          Welcome back! Login to continue ordering delicious food.
        </p>

        <form className="flex flex-col" onSubmit={handleLogin}>
          {/* Email */}
          <label className="block text-gray-700 font-medium mb-1">Email</label>
          <input
            type="email"
            value={email}
            placeholder="Enter email"
            className="mb-4 p-2 rounded border border-gray-300 outline-amber-200"
            onChange={(e) => setEmail(e.target.value)} required
          />

          {/* Password */}
          <label className="block text-gray-700 font-medium mb-1">Password</label>

          <div className="relative mb-1">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              placeholder="Enter password"
              className="p-2 pr-10 w-full rounded border border-gray-300 outline-amber-200"
              onChange={(e) => setPassword(e.target.value)} required
            />

            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>

          {/* Forgot Password – Right Side */}
          <p
            className="text-sm text-amber-400 hover:underline cursor-pointer text-right mb-4"
            onClick={() => navigate("/forgot-passwoed")}
          >
            Forgot Password?
          </p>

          {/* Login button */}
          <button
            type="submit"
            className="bg-amber-300 text-white p-2 rounded hover:bg-amber-400 transition duration-300 cursor-pointer"
          >
            Login
          </button>
          {error && <p className="text-red-500 text-center pt-5 "> {error}</p>}
          {/* OR line */}
          <div className="my-3 flex items-center gap-2">
            <span className="h-px bg-gray-300 flex-1"></span>
            <span className="text-gray-500 text-sm">OR</span>
            <span className="h-px bg-gray-300 flex-1"></span>
          </div>

          {/* Google Button */}
          <button
            type="button"
            className="w-full flex items-center justify-center gap-2 border border-gray-300 p-2 rounded hover:bg-gray-100 transition duration-300 cursor-pointer"
            onClick={handleGoogleAuth}
          >
            <FcGoogle size={20} />
            <span className="text-gray-700 font-medium">
              Sign in with Google
            </span>
          </button>

          {/* Signup Link */}
          <p className="text-gray-700 text-sm text-center mt-4">
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-amber-400 hover:underline cursor-pointer"
            >
              Register
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
