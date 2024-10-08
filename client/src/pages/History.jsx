import React, { useEffect, useState } from "react";
import axios from "axios";
import { Header, BorrowHistory, ReturnHistory } from "../components/index";
import { useNavigate } from "react-router-dom";

const History = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/member/me",
          { withCredentials: true }
        );
        setUserData(response.data.data);
      } catch (error) {
        console.log(error);
        navigate("/login");
      }
    };

    fetchUserData();
  }, [navigate]);

  return (
    <div>
      {userData && userData.role === "member" && (
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
