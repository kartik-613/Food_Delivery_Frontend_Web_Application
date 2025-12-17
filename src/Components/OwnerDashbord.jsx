import React from "react";
import { useSelector } from "react-redux";
import {
  FaStore,
  FaUtensils,
  FaClipboardList,
  FaChartLine,
} from "react-icons/fa";

const OwnerDashboard = () => {
  const { userData } = useSelector((state) => state.user);

  return (
    <div className="w-full min-h-screen bg-amber-50 p-6">
      
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-6">
        <h1 className="text-3xl font-bold text-amber-400">
          Owner Dashboard
        </h1>
        <p className="text-gray-600">
          Welcome{userData?.fullName ? `, ${userData.fullName}` : ""} 👋
        </p>
      </div>

      {/* Stats Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        
        <StatCard
          icon={<FaStore />}
          title="Restaurants"
          value="1"
        />
        <StatCard
          icon={<FaUtensils />}
          title="Menu Items"
          value="24"
        />
        <StatCard
          icon={<FaClipboardList />}
          title="Orders Today"
          value="8"
        />
        <StatCard
          icon={<FaChartLine />}
          title="Revenue"
          value="₹3,450"
        />

      </div>

      {/* Management Sections */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Menu Management */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-2">
            Manage Menu
          </h2>
          <p className="text-gray-600 text-sm mb-4">
            Add, update or remove food items.
          </p>
          <button className="bg-amber-300 text-white px-4 py-2 rounded hover:bg-amber-400 transition">
            Manage Menu
          </button>
        </div>

        {/* Order Management */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-2">
            Manage Orders
          </h2>
          <p className="text-gray-600 text-sm mb-4">
            View and update order statuses.
          </p>
          <button className="bg-amber-300 text-white px-4 py-2 rounded hover:bg-amber-400 transition">
            View Orders
          </button>
        </div>

      </div>
    </div>
  );
};

/* Reusable Stat Card */
const StatCard = ({ icon, title, value }) => {
  return (
    <div className="bg-white rounded-lg shadow p-5 flex items-center gap-4">
      <div className="text-amber-400 text-3xl">{icon}</div>
      <div>
        <p className="text-gray-600 text-sm">{title}</p>
        <p className="text-xl font-bold">{value}</p>
      </div>
    </div>
  );
};

export default OwnerDashboard;
