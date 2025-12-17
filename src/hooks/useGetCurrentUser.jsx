import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/features/user.slice";

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

function useGetCurrentUser() {

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const result = await axios.get(
          `${VITE_BASE_URL}/user/current`,
          {
            withCredentials: true,
            
          }
        );
        dispatch(setUserData(result.data.user));   
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
    };
    fetchCurrentUser();
  }, []);
}

export default useGetCurrentUser;
