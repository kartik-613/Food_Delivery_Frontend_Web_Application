import React from "react";
import { useSelector } from "react-redux";
import OwnerDashboard from "../Components/OwnerDashbord";
import DeliveryBoyDashboard from "../Components/DeliveryBoyDashbord";
import UserDashboard from "../Components/UserDashbord";


const Home = () => {
  const { userData } = useSelector((state) => state.user);

  if (!userData) return null;

  switch (userData.role) {
    case "owner":
      return <OwnerDashboard />;

    case "delivery":
      return <DeliveryBoyDashboard />;

    default:
      return <UserDashboard />;
  }
};

export default Home;
