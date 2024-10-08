import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUserCircle } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { Header } from "../components/index";
import { useNavigate } from "react-router-dom";

const Members = () => {
  const [members, setMembers] = useState([]);
  const [search, setSearch] = useState("");
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
    if (userData) {
      getData();
    } else {
      navigate("/login");
    }
  }, [userData, navigate]);

  return (
    <>
      <Header />
      {userData && userData.role === "librarian" && (
        <div className="bg-gray-100 tablet:pt-40 mobile:pt-10 laptop:pt-0">
          <div className="pc:container flex mx-auto mb-10 mobile:m-2 pt-20">
            <FiSearch className="text-4xl m-auto relative left-10 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              onChange={(e) => setSearch(e.target.value)}
              className="w-full py-3 pl-12 pr-4 text-gray-700 bg-white border border-gray-400
                    rounded-md focus:border-gray-600 focus:outline-none"
            />
          </div>
          <div className="pc:container mx-auto flex flex-wrap gap-10 py-10">
            {members
              .filter((val) => {
                if (search === "") {
                  return val;
                } else if (
                  val.name.toLowerCase().includes(search.toLowerCase())
                ) {
                  return val;
                }
              })
              .map((curElem) => {
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
                      <h1 className="text-xl font-bold text-gray-800">
                        {name}
                      </h1>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </>
  );
};

export default Members;
