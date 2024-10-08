import React, { useState } from "react";
import login from "../Images/signup.png";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Header } from "../components/index";
import axios from "axios";

const SignUp = () => {
  const [visible, setVisible] = useState(false);
  const InputType = visible ? "text" : "password";
  const navigate = useNavigate();

  const [userLogin, setUserLogin] = useState({
    name: "",
    email: "",
    passwords: "",
    role: "MEMBER",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setUserLogin({ ...userLogin, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/v1/users/signup", {
        name: userLogin.name,
        email: userLogin.email,
        password: userLogin.passwords,
        role: userLogin.role,
      });
      setSuccessMessage("Signup successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <>
      <Header />
      <div className="bg-gray-100 flex justify-center pt-32">
        <div className="bg-white font-nunito w-3/5 shadow-lg rounded-lg border-2 border-gray-200 py-5 px-8 laptop:w-4/5 tablet:w-full mobile:w-full">
          <div className="text-center font-bold text-4xl py-5 uppercase text-black">
            SignUp
          </div>
          <div className="flex items-center justify-around p-10 mobile:px-0 mobile:py-2">
            <div className="mobile:hidden tablet:hidden">
              <img src={login} alt="login svg" />
            </div>
            <div className="container max-w-full">
              <form
                autoComplete="off"
                onSubmit={handleSubmit}
                className="max-w-sm mx-auto px-6"
              >
                <div>
                  <label className="px-1 text-lg font-semibold text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="enter your name"
                    name="name"
                    value={userLogin.name}
                    onChange={handleInputs}
                    className="text-md block px-3 py-2 rounded-lg w-full border-2 border-gray-300 shadow-md focus:bg-white focus:border-gray-600 focus:outline-none my-2"
                  />
                </div>

                <div>
                  <label className="px-1 text-lg font-semibold text-gray-700">
                    Email
                  </label>
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
                  <label className="px-1 text-lg font-semibold text-gray-700">
                    Password
                  </label>
                  <div className="flex items-center">
                    <input
                      type={InputType}
                      minLength="8"
                      placeholder="enter your password"
                      name="passwords"
                      value={userLogin.passwords}
                      onChange={handleInputs}
                      className="text-md block px-3 py-2 rounded-lg w-full border-2 border-gray-300 shadow-md focus:bg-white focus:border-gray-600 focus:outline-none my-2"
                    />
                    <span
                      className="text-1xl cursor-pointer -ml-8"
                      onClick={() => setVisible((vis) => !vis)}
                    >
                      {visible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                    </span>
                  </div>
                </div>

                <div className="my-3">
                  <label className="px-1 text-lg font-semibold text-gray-700">
                    Role
                  </label>
                  <select
                    name="role"
                    value={userLogin.role}
                    onChange={handleInputs}
                    className="text-md cursor-pointer block px-3 py-2 rounded-lg w-full border-2 border-gray-300 shadow-md focus:bg-white focus:border-gray-600 focus:outline-none my-2"
                  >
                    <option value="MEMBER">Member</option>
                    <option value="LIBRARIAN">Librarian</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="mt-5 text-lg font-semibold hover:text-white hover:bg-black bg-gray-800 w-full text-white rounded-lg px-6 py-2 block shadow-md mobile:mt-0 uppercase"
                >
                  SignUp
                </button>
              </form>

              {errorMessage && (
                <div className="text-red-500 text-center mt-3">
                  {errorMessage}
                </div>
              )}
              {successMessage && (
                <div className="text-green-500 text-center mt-3">
                  {successMessage}
                </div>
              )}

              <div className="text-gray-700 text-sm font-semibold px-2 my-6 flex flex-col justify-center items-center gap-2">
                <Link
                  to="/login"
                  className="border-b border-gray-200 cursor-pointer"
                >
                  already registered? CLICK ME
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
