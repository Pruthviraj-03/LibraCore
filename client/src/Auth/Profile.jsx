import React, { useEffect, useState } from "react";
import ProfilePng from "../Images/profile.png";
import { Header } from "../components/index";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
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
        if (error.response && error.response.status === 401) {
          navigate("/login");
        }
      }
    };

    fetchUserData();
  }, [navigate]);

  useEffect(() => {
    if (!userData) {
      navigate("/login");
    }
  }, [userData, navigate]);

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:8000/api/v1/users/logout",
        {},
        { withCredentials: true }
      );
      setUserData(null);
      navigate("/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      try {
        await axios.delete("http://localhost:8000/api/v1/member/deleteme", {
          withCredentials: true,
        });
        navigate("/");
      } catch (error) {
        console.error("Error during account deletion:", error);
      }
    }
  };

  return (
    <>
      <Header />
      {userData && (
        <div className="flex justify-center">
          <div className="font-nunito w-3/5 py-5 px-8 laptop:w-4/5 tablet:w-full mobile:w-full mobile:px-0">
            <form method="GET">
              <div className="pt-32 pb-20 mobile:pt-24 mobile:pb-10">
                <div className="mx-5 px-5 bg-gray-50 border-2 border-gray-300 hover:border-black rounded-lg shadow-md">
                  <div className="flex items-center justify-around p-10 mobile:px-0 mobile:py-2">
                    <div>
                      <div className="avatar online"></div>
                      <div className="pt-5">
                        <label className="text-lg text-gray-500">
                          Full Name :
                        </label>
                        <p className="text-xl font-medium text-gray-700">
                          {userData.name || "N/A"}
                        </p>
                      </div>
                      <div className="pt-5">
                        <label className="text-lg text-gray-500">
                          Email id :
                        </label>
                        <p className="text-xl font-medium text-gray-700">
                          {userData.email || "N/A"}
                        </p>
                      </div>
                      <div className="pt-5">
                        <label className="text-lg text-gray-500">Role :</label>
                        <p className="text-xl font-medium text-gray-700">
                          {userData.role || "N/A"}
                        </p>
                      </div>

                      <div className="flex flex-col">
                        <button
                          className="bg-gray-600 text-white font-nunito font-semibold p-2 rounded-md shadow-md mt-10 
                          mobile:py-2 w-48 mobile:w-full hover:bg-white hover:text-gray-600 cursor-pointer hover:border hover:border-black"
                          type="button"
                          onClick={handleLogout}
                        >
                          Log Out
                        </button>

                        <button
                          className="bg-red-600 text-white font-nunito font-semibold p-2 text-sm rounded-md shadow-md mt-5 
                          mobile:text-base mobile:py-2 w-48 mobile:w-full hover:bg-white hover:text-red-600 cursor-pointer hover:border hover:border-black"
                          type="button"
                          onClick={handleDeleteAccount}
                        >
                          Delete Account
                        </button>
                      </div>
                    </div>

                    <div
                      className="mobile:hidden tablet:hidden"
                      style={{ width: "500px" }}
                    >
                      <img src={ProfilePng} alt="Profile illustration" />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
