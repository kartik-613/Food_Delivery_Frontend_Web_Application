import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaMapMarkerAlt,
  FaSearch,
  FaShoppingCart,
  FaClipboardList,
  FaSignOutAlt,
} from "react-icons/fa";
import { setUserData } from "../redux/features/user.slice";

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        `${VITE_BASE_URL}/auth/signout`,
        {},
        { withCredentials: true }
      );
    } catch (err) {
      console.error(err);
    } finally {
      dispatch(setUserData(null));
      navigate("/signin");
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* LEFT: Logo + Location */}
        <div className="flex flex-col cursor-pointer" onClick={() => navigate("/")}>
          <h1 className="text-2xl font-bold text-amber-400">Vingo</h1>
          <div className="flex items-center text-xs text-gray-600">
            <FaMapMarkerAlt className="mr-1 text-amber-400" />
            Bhopal
          </div>
        </div>

        {/* CENTER: Search (Tablet & Desktop only) */}
        <div className="hidden md:flex flex-1 mx-8">
          <input
            type="text"
            placeholder="Search for food or restaurants"
            className="w-full px-4 py-2 border rounded-lg outline-amber-300"
          />
        </div>

        {/* RIGHT: Actions */}
        <div className="flex items-center gap-4">

          {/* Search Icon (Mobile only) */}
          <button className="md:hidden text-gray-600 hover:text-amber-400">
            <FaSearch size={18} />
          </button>

          {/* My Orders (Desktop only) */}
          <button
            onClick={() => alert("Orders coming soon 📦")}
            className="hidden sm:flex items-center gap-2 text-gray-600 hover:text-amber-400"
          >
            <FaClipboardList />
            <span className="text-sm">My Orders</span>
          </button>

          {/* Cart */}
          <button
            className="relative text-gray-600 hover:text-amber-400"
            onClick={() => alert("Cart coming soon 🛒")}
          >
            <FaShoppingCart size={18} />
            <span className="absolute -top-2 -right-2 bg-amber-400 text-white text-[10px] px-1.5 rounded-full">
              0
            </span>
          </button>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="text-gray-600 hover:text-red-500"
            title="Logout"
          >
            <FaSignOutAlt size={18} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
