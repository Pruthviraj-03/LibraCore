import React, { useState } from "react";
import login from "../Images/signup.png";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate for redirecting
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Header } from "../components/index";
import axios from "axios"; // Axios for API requests

const Login = () => {
  const [visible, setVisible] = useState(false);
  const InputType = visible ? "text" : "password";
  const navigate = useNavigate(); // For navigation after successful login

  const [userLogin, setUserLogin] = useState({
    email: "",
    passwords: "",
  });

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setUserLogin({ ...userLogin, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/login",
        {
          email: userLogin.email,
          password: userLogin.passwords, // Send correct password field
        }
      );

      if (response.status === 200) {
        alert("Login successful!");
        navigate("/"); // Redirect to the home page after login
      }
    } catch (error) {
      console.log("Error logging in:", error);
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <>
      <Header />
      <div className="bg-gray-100 flex justify-center pt-32">
        <div className="bg-white font-nunito w-3/5 shadow-lg rounded-lg border-2 border-gray-200 py-5 px-8 laptop:w-4/5 tablet:w-full mobile:w-full">
          <div className="text-center font-bold text-4xl py-5 uppercase text-black">
            Login
          </div>
          <div className="flex items-center justify-around p-10 mobile:px-0 mobile:py-2">
            <div className="mobile:hidden tablet:hidden">
              <img src={login} alt="login svg" />
            </div>
            <div className="container max-w-full">
              <div className="max-w-sm mx-auto px-6">
                <form autoComplete="off" onSubmit={handleSubmit}>
                  <div>
                    <span className="px-1 text-lg font-semibold text-gray-700">
                      Email
                    </span>
                    <input
                      type="email"
                      placeholder="valid email@example.com only"
                      name="email"
                      value={userLogin.email}
                      onChange={handleInputs}
                      className="text-md block px-3 py-2 rounded-lg w-full border-2 border-gray-300 shadow-md focus:bg-white focus:border-gray-600 focus:outline-none my-2"
                    />
                  </div>

                  <div className="my-3">
                    <span className="px-1 text-lg font-semibold text-gray-700">
                      Password
                    </span>
                    <span className="flex items-center">
                      <input
                        type={InputType}
                        minLength="5"
                        maxLength="15"
                        placeholder="enter your password"
                        name="passwords"
                        value={userLogin.passwords}
                        onChange={handleInputs}
                        className="text-md block px-3 py-2 rounded-lg w-full border-2 border-gray-300 shadow-md focus:bg-white focus:border-gray-600 focus:outline-none my-2"
                      />
                      <span
                        className="text-1xl cursor-pointer -ml-8"
                        onClick={() => setVisible((visibilty) => !visibilty)}
                      >
                        {visible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                      </span>
                    </span>
                  </div>
                  <button
                    type="submit"
                    className="mt-5 text-lg font-semibold hover:text-white hover:bg-black bg-gray-800 w-full text-white rounded-lg px-6 py-2 block shadow-md mobile:mt-0 uppercase"
                  >
                    Login
                  </button>
                </form>

                <div className="text-gray-700 text-sm font-semibold px-2 my-6 flex flex-col justify-center items-center gap-2">
                  <Link
                    to="/signup"
                    className="border-b border-gray-200 cursor-pointer"
                  >
                    didn't register? CLICK ME
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
