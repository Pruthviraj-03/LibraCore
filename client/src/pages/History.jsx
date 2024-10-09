import React, { useEffect, useState } from "react";
import axios from "axios";
import { Header, BorrowHistory, ReturnHistory } from "../components/index";
import { useNavigate } from "react-router-dom";

const History = () => {
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/users/me",
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
        </>
      )}
    </div>
  );
};

export default History;
