import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Header,
  MemberData,
  BorrowHistory,
  ReturnHistory,
} from "../components/index";
import { useNavigate } from "react-router-dom";

const Member = () => {
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
      {userData && userData.role === "LIBRARIAN" && (
        <>
          <Header />
          <MemberData />
          <BorrowHistory />
          <ReturnHistory />
        </>
      )}
    </div>
  );
};

export default Member;
