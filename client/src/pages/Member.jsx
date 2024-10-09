import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Header,
  MemberData,
  BorrowHistory,
  ReturnHistory,
  ScrollToTop,
} from "../components/index";
import { useNavigate, useParams } from "react-router-dom";

const Member = () => {
  const [userData, setUserData] = useState([]);
  const [memberData, setMemberData] = useState(null);
  const { id } = useParams();
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

  useEffect(() => {
    const fetchMemberData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/librarian/members/${id}`,
          { withCredentials: true }
        );
        setMemberData(response.data.data.member);
      } catch (error) {
        console.log(error);
        navigate("/login");
      }
    };

    fetchMemberData();
  }, [id, navigate]);

  return (
    <div>
      {userData && userData.role === "LIBRARIAN" ? (
        <>
          <Header />
          {memberData ? (
            <>
              <MemberData memberData={memberData} />
              <BorrowHistory memberData={memberData} />
              <ReturnHistory memberData={memberData} />
            </>
          ) : (
            <div>No member data found.</div>
          )}
          <ScrollToTop />
        </>
      ) : (
        <div>Access Denied. Only librarians can view this page.</div>
      )}
    </div>
  );
};

export default Member;
