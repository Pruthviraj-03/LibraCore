import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Header,
  BorrowHistory,
  ReturnHistory,
  ScrollToTop,
} from "../components/index";
import { useNavigate } from "react-router-dom";

const History = () => {
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "libra-core-api.vercel.app/api/v1/users/me",
          { withCredentials: true }
        );
        setUserData(response.data.data.user);
      } catch (error) {
        console.log(error);
        navigate("/login");
      }
    };

    fetchUserData();
  }, [navigate]);

  return (
    <div>
      {userData && userData.role === "MEMBER" && (
        <>
          <Header />
          <BorrowHistory />
          <ReturnHistory />
          <ScrollToTop />
        </>
      )}
    </div>
  );
};

export default History;
