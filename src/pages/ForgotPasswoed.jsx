import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import axios from "axios";

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");

  const Navigate = useNavigate();

  // Step 1 → Send OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        `${VITE_BASE_URL}/auth/send-otp`,
        {
          email,
        },
        { withCredentials: true }
      );
      setError("");
      console.log(result);
      setStep(2);
    } catch (error) {
      setError(error.response?.data.message);
    }
  };

  // Step 2 → Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        `${VITE_BASE_URL}/auth/verify-otp`,
        {
          email,
          otp,
        },
        { withCredentials: true }
      );
      setError("");
      console.log(result);
      setStep(3);
    } catch (error) {
      setError(error.response?.data.message);
    }
  };

  // Step 3 → Reset Password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        `${VITE_BASE_URL}/auth/reset-password`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      setError("");
      console.log(result);
      Navigate("/signin");
    } catch (error) {
      setError(error.response?.data.message);
    }
  };

  return (
    <div className="w-full h-screen bg-amber-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[380px]">
        {/* Back Button */}
        <button
          className="flex items-center gap-2 text-gray-600 mb-4 hover:text-gray-800 cursor-pointer"
          onClick={() => {
            if (step === 1) Navigate(-1);
            else setStep(step - 1);
          }}
        >
          <IoArrowBack size={22} />
        </button>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-amber-400 mb-2">
          Forgot Password
        </h2>

        {/* Step 1: Email */}
        {step === 1 && (
          <>
            <p className="text-gray-600 text-sm mb-6">
              Enter your registered email. We will send you an OTP.
            </p>
            <form className="flex flex-col" onSubmit={handleSendOtp}>
              <label className="block text-gray-700 font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mb-4 p-2 rounded border border-gray-300 outline-amber-200"
                required
              />
              {error && (
                <p className="text-red-500 text-center pb-3"> {error}</p>
              )}
              <button
                type="submit"
                className="bg-amber-300 text-white p-2 rounded hover:bg-amber-400 transition duration-300 cursor-pointer"
              >
                Send OTP
              </button>
            </form>
          </>
        )}

        {/* Step 2: OTP */}
        {step === 2 && (
          <>
            <p className="text-gray-600 text-sm mb-6">
              Enter the OTP sent to <span className="font-medium">{email}</span>
              .
            </p>
            <form className="flex flex-col" onSubmit={handleVerifyOtp}>
              <label className="block text-gray-700 font-medium mb-1">
                OTP
              </label>
              <input
                type="text"
                maxLength="6"
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                className="mb-4 p-2 rounded border border-gray-300 outline-amber-200 tracking-widest text-center"
                required
              />
              {error && (
                <p className="text-red-500 text-center pb-3 "> {error}</p>
              )}
              <button
                type="submit"
                className="bg-amber-300 text-white p-2 rounded hover:bg-amber-400 transition duration-300 cursor-pointer"
              >
                Verify OTP
              </button>
            </form>
          </>
        )}

        {/* Step 3: Reset Password */}
        {step === 3 && (
          <>
            <p className="text-gray-600 text-sm mb-6">
              Enter your new password.
            </p>
            <form className="flex flex-col" onSubmit={handleResetPassword}>
              <label className="block text-gray-700 font-medium mb-1">
                New Password
              </label>
              <input
                type="password"
                placeholder="New password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mb-4 p-2 rounded border border-gray-300 outline-amber-200"
                required
              />

              <label className="block text-gray-700 font-medium mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mb-4 p-2 rounded border border-gray-300 outline-amber-200"
                required
              />

              {password !== confirmPassword && confirmPassword.length > 0 && (
                <p className="text-red-500 text-center pb-3">
                  Passwords do not match
                </p>
              )}
              {error && (
                <p className="text-red-500 text-center pb-3 "> {error}</p>
              )}
              <button
                type="submit"
                className="bg-amber-300 text-white p-2 rounded hover:bg-amber-400 transition duration-300 cursor-pointer"
              >
                Reset Password
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
