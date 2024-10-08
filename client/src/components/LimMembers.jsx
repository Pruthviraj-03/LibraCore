import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "./index";
import { FaUserCircle } from "react-icons/fa";

const LimMembers = () => {
  const [members, setMembers] = useState([]);
  const [userData, setUserData] = useState(null);

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
      }
    };

    fetchUserData();
  }, []);

  const getData = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/v1/librarian/members"
      );
      setMembers(res.data.data || []);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {userData && userData.role === "LIBRARIAN" && (
        <div className="bg-gray-100 py-10 tablet:pt-40 mobile:pt-10 laptop:pt-0">
          <div className="pc:container mx-auto flex flex-wrap gap-10 py-10">
            {members.slice(0, 5).map((curElem) => {
              const { name } = curElem;

              return (
                <div
                  key={curElem.id}
                  className="cursor-pointer w-64 h-80 mx-auto bg-white rounded-lg shadow-xl border flex flex-col justify-center items-center"
                >
                  <div className="flex justify-center py-6">
                    <FaUserCircle className="text-8xl text-gray-600" />
                  </div>

                  <div className="px-4 py-2 text-center">
                    <h1 className="text-xl font-bold text-gray-800">{name}</h1>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex items-center justify-center h-auto w-full">
            <Button text="View all members ..." to="/members" />
          </div>
        </div>
      )}
    </>
  );
};

export default LimMembers;
