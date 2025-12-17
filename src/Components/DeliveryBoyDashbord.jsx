import React from "react";
import { useSelector } from "react-redux";
import {
  FaMotorcycle,
  FaMapMarkedAlt,
  FaClipboardCheck,
  FaRupeeSign,
} from "react-icons/fa";

const DeliveryBoyDashboard = () => {
  const { userData } = useSelector((state) => state.user);

  return (
    <div className="w-full min-h-screen bg-amber-50 p-6">

      {/* Header */}
      <div className="max-w-6xl mx-auto mb-6">
        <h1 className="text-3xl font-bold text-amber-400">
          Delivery Dashboard
        </h1>
        <p className="text-gray-600">
          Hello{userData?.fullName ? `, ${userData.fullName}` : ""} 👋
        </p>
      </div>

      {/* Stats Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

        <StatCard
          icon={<FaClipboardCheck />}
          title="Today's Deliveries"
          value="5"
        />
        <StatCard
          icon={<FaMotorcycle />}
          title="Active Delivery"
          value="1"
        />
        <StatCard
          icon={<FaMapMarkedAlt />}
          title="Completed"
          value="42"
        />
        <StatCard
          icon={<FaRupeeSign />}
          title="Today's Earnings"
          value="₹620"
        />

      </div>

      {/* Current Delivery */}
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-3">
          Current Delivery
        </h2>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="text-gray-600 text-sm">
              Order ID: <span className="font-medium">#ORD12345</span>
            </p>
            <p className="text-gray-600 text-sm">
              Pickup: <span className="font-medium">Vingo Restaurant</span>
            </p>
            <p className="text-gray-600 text-sm">
              Drop: <span className="font-medium">Bhopal, MP</span>
            </p>
          </div>

          <button className="bg-amber-300 text-white px-5 py-2 rounded hover:bg-amber-400 transition">
            Mark as Delivered
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

export default DeliveryBoyDashboard;
