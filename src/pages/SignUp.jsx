import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaEye } from "react-icons/fa";
import { auth } from "../../utils/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import axios from "axios";
import { setUserData } from "../redux/features/user.slice";
import { useDispatch } from "react-redux";

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;



const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showpassword, setShowpassword] = useState(false);
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  

  const Navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        `${VITE_BASE_URL}/auth/signup`,
        {
          fullName,
          email,
          password,
          phone,
          role,
        },
        { withCredentials: true }
      );
      dispatch(setUserData(result.data.user));
      setError("");
      setFullName("");
      setEmail("");
      setPassword("");
      setPhone("");
      setRole("user");
      Navigate("/signin")
    } catch (error) {
      setError(error.response?.data.message);
    }
  };
 
const handleGoogleAuth = async () => {
  if(!phone){  
    return setError("Please enter mobile number");
  }
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    try {
      const res = await axios.post(
        `${VITE_BASE_URL}/auth/google-auth`,
        {
          fullName: result.user.displayName,
          email: result.user.email,
          phone,
          role,
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
      <div className="bg-white p-5 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-1 text-amber-400">Vingo</h1>

        <p>
          Create your account and start ordering delicious
          <br /> food delivery.
        </p>

        <form className="flex flex-col">
          <label
            htmlFor="FullName"
            className="block text-gray-700 font-medium mb-1"
          >
            FullName
          </label>
          <input
            type="text"
            value={fullName}
            placeholder="FullName"
            className="mb-4 p-2 rounded border border-gray-300 outline-amber-200"
            onChange={(e) => setFullName(e.target.value)} required
          />
          <label
            htmlFor="Email"
            className="block text-gray-700 font-medium mb-1"
          >
            Email
          </label>
          <input
            type="email"
            value={email}
            placeholder="Email"
            className="mb-4 p-2 rounded border border-gray-300 outline-amber-200"
            onChange={(e) => setEmail(e.target.value)} required
          />
          <label
            htmlFor="password"
            className="block text-gray-700 font-medium mb-1"
          >
            Password
          </label>

          <div className="relative mb-4">
            <input
              value={password}
              type={showpassword ? "text" : "password"}
              placeholder="Password"
              className="p-2 pr-10 w-full rounded border border-gray-300 outline-amber-200"
              onChange={(e) => setPassword(e.target.value)} required
            />

            <button
              type="button"
              onClick={() => setShowpassword((prev) => !prev)}
              aria-label={showpassword ? "Hide password" : "Show password"}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 cursor-pointer"
            >
              {!showpassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <label
            htmlFor="Phone"
            className="block text-gray-700 font-medium mb-1"
          >
            Phone
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
            maxLength="10"
            placeholder="Phone Number"
            className="mb-4 p-2 rounded border border-gray-300"
            required
          />
          <label
            htmlFor="role"
            className="block text-gray-700 font-medium mb-1"
          >
            Role
          </label>

          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="mb-4 p-2 w-full rounded border border-gray-300 outline-amber-200 cursor-pointer"
          >
            <option style={{ backgroundColor: "#f3f4f6" }} value="user">
              User
            </option>
            <option style={{ backgroundColor: "#f3f4f6" }} value="owner">
              Owner
            </option>
            <option style={{ backgroundColor: "#f3f4f6" }} value="deliveryboy">
              Delivery Boy
            </option>
          </select>

          <button
            type="button"
            className="bg-amber-300 text-white p-2 rounded hover:bg-amber-400 transition duration-300 cursor-pointer"
            onClick={handleSignUp}
          >
            Register
          </button>

        {error && <p className="text-red-500 text-center pt-5 "> {error}</p>}

          <div className="my-3 flex items-center gap-2">
            <span className="h-px bg-gray-300 flex-1"></span>
            <span className="text-gray-500 text-sm">OR</span>
            <span className="h-px bg-gray-300 flex-1"></span>
          </div>

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
          <p className="text-gray-700 text-sm text-center mt-4">
            Already have an account?{" "}
            <span
              onClick={() => Navigate("/signin")}
              className="text-amber-400 hover:underline cursor-pointer"
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
