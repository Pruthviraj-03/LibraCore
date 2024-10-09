import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import axios from "axios";
import { FaUserCircle } from "react-icons/fa";

const Header = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

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
      }
    };

    fetchUserData();
  }, []);

  const handleRefreshPage = () => {
    navigate("/");
    window.location.reload();
  };

  return (
    <div>
      <div className="bg-white shadow w-full px-44 laptop:px-16 tablet:px-1 mobile:px-0">
        <div className="px-6 py-3 flex items-center justify-between mobile:px-3 mobile:w-screen">
          <div className="flex items-center gap-2">
            <span
              className="font-nunito text-3xl font-bold text-gray-800 hover:text-gray-500 cursor-pointer mobile:text-lg"
              onClick={handleRefreshPage}
            >
              LibraCore
            </span>

            <div className="flex items-center ml-5 gap-5 mobile:ml-0 mobile:gap-1">
              <Link
                to="/"
                className="px-2 py-1 text-lg font-medium text-gray-700 rounded hover:bg-gray-900 hover:text-gray-100 mobile:text-sm"
                onClick={handleRefreshPage}
              >
                Home
              </Link>

              <Link
                to={userData ? "/books" : "/login"}
                className="px-2 py-1 text-lg font-medium text-gray-700 rounded hover:bg-gray-900 hover:text-gray-100 mobile:text-sm"
              >
                All Books
              </Link>

              {userData && userData.role === "LIBRARIAN" && (
                <Link
                  to="/members"
                  className="px-2 py-1 text-lg font-medium text-gray-700 rounded hover:bg-gray-900 hover:text-gray-100 mobile:text-sm"
                >
                  All Members
                </Link>
              )}

              {userData && userData.role === "MEMBER" && (
                <Link
                  to="/history"
                  className="px-2 py-1 text-lg font-medium text-gray-700 rounded hover:bg-gray-900 hover:text-gray-100 mobile:text-sm"
                >
                  History
                </Link>
              )}
            </div>
          </div>
          {userData ? (
            <Link to="/profile">
              <FaUserCircle className="text-5xl text-gray-600" />
            </Link>
          ) : (
            <Button to="/login" text="Login" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
