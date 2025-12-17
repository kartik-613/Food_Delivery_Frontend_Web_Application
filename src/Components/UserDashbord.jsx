import React from "react";
import { useSelector } from "react-redux";
import { FaUserCircle, FaShoppingBag, FaHeart } from "react-icons/fa";
import Navbar from "./Navbar";

const UserDashboard = () => {
  const { userData } = useSelector((state) => state.user);

  return (
    <>
      <Navbar />

      <div className="w-full min-h-screen bg-amber-50 px-4 py-6">
        
        {/* Header */}
        <div className="max-w-6xl mx-auto mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-amber-400">
            User Dashboard
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Welcome back{userData?.fullName ? `, ${userData.fullName}` : ""} 👋
          </p>
        </div>

        {/* Cards */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

          {/* Profile Card */}
          <div className="bg-white rounded-xl shadow p-5 hover:shadow-md transition">
            <div className="flex items-center gap-3 mb-3">
              <FaUserCircle size={32} className="text-amber-400" />
              <h2 className="text-lg font-semibold">Profile</h2>
            </div>

            <div className="text-sm text-gray-600 space-y-1">
              <p>
                Email:{" "}
                <span className="font-medium break-all">
                  {userData?.email}
                </span>
              </p>
              <p>
                Role:{" "}
                <span className="font-medium">
                  {userData?.role || "User"}
                </span>
              </p>
            </div>
          </div>

          {/* Orders Card */}
          <div className="bg-white rounded-xl shadow p-5 hover:shadow-md transition">
            <div className="flex items-center gap-3 mb-3">
              <FaShoppingBag size={30} className="text-amber-400" />
              <h2 className="text-lg font-semibold">Orders</h2>
            </div>

            <p className="text-sm text-gray-600">
              You have no orders yet.
            </p>

            <button
              className="mt-4 w-full py-2 border border-amber-400 text-amber-400 rounded-lg hover:bg-amber-50 transition text-sm"
            >
              View Orders
            </button>
          </div>

          {/* Wishlist Card */}
          <div className="bg-white rounded-xl shadow p-5 hover:shadow-md transition">
            <div className="flex items-center gap-3 mb-3">
              <FaHeart size={28} className="text-amber-400" />
              <h2 className="text-lg font-semibold">Wishlist</h2>
            </div>

            <p className="text-sm text-gray-600">
              Your wishlist is empty.
            </p>

            <button
              className="mt-4 w-full py-2 border border-amber-400 text-amber-400 rounded-lg hover:bg-amber-50 transition text-sm"
            >
              Explore Items
            </button>
          </div>

        </div>
      </div>
    </>
  );
};

export default UserDashboard;
