import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/index";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
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

  const getData = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/v1/books/allbooks"
      );
      setBooks(res.data.data || []);
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

  const handleRefreshPage = () => {
    navigate("/books");
    window.location.reload();
  };

  const handleBookAction = async (bookId, action) => {
    try {
      if (action === "BORROW") {
        await axios.post(
          `http://localhost:8000/api/v1/history/members/${userData._id}/borrow/${bookId}`,
          {},
          { withCredentials: true }
        );
      } else {
        await axios.post(
          `http://localhost:8000/api/v1/history/members/${userData._id}/return/${bookId}`,
          {},
          { withCredentials: true }
        );
      }
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header />
      {userData && (
        <div className="bg-gray-100">
          <div className="pc:container flex mx-auto mb-10 mobile:m-2 pt-20">
            <FiSearch className="text-4xl m-auto relative left-10 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              onChange={(e) => setSearch(e.target.value)}
              className="w-full py-3 pl-12 pr-4 text-gray-700 bg-white border border-gray-400 rounded-md focus:border-gray-600 focus:outline-none"
            />
          </div>

          <div className="pc:container mx-auto flex flex-wrap gap-10 pt-5 pb-20">
            {books
              .filter((val) => {
                if (search === "") {
                  return val;
                } else if (
                  val.title.toLowerCase().includes(search.toLowerCase())
                ) {
                  return val;
                }
              })
              .map((curElem) => {
                const {
                  _id: bookId,
                  title,
                  author,
                  description,
                  image,
                } = curElem;

                const isBookBorrowed =
                  userData?.borrowBooks?.includes(bookId) || false;

                return (
                  <div
                    key={bookId}
                    className="max-w-xs mx-auto overflow-hidden bg-white rounded-lg shadow-xl border"
                  >
                    <img
                      className="object-cover w-full h-48 mt-1"
                      src={image}
                      alt="books"
                    />

                    <div className="px-4 py-2 h-72">
                      <h1 className="text-3xl font-bold text-gray-800 uppercase">
                        {title}
                      </h1>
                      <h1 className="text-lg font-bold py-2">
                        Author: {author}
                      </h1>
                      <p className="mt-1 text-sm text-gray-600">
                        {description}
                      </p>
                    </div>

                    {userData && userData.role === "MEMBER" && (
                      <div
                        className="cursor-pointer flex items-center justify-center px-4 py-5 hover:text-gray-900 bg-gray-900 text-white hover:bg-white hover:border hover:border-t-gray-200 transition-colors duration-300"
                        onClick={() => {
                          handleBookAction(
                            bookId,
                            isBookBorrowed ? "RETURN" : "BORROW"
                          );
                          handleRefreshPage();
                        }}
                      >
                        <span className="text-2xl">
                          {isBookBorrowed ? "RETURN BOOK" : "BORROW BOOK"}
                        </span>
                      </div>
                    )}

                    {userData && userData.role === "LIBRARIAN" && (
                      <div
                        className="cursor-pointer flex items-center justify-center px-4 py-5 hover:text-gray-900 bg-gray-900 text-white hover:bg-white hover:border hover:border-t-gray-200 transition-colors duration-300"
                        onClick={() => {}}
                      >
                        <span className="text-2xl">DELETE BOOK</span>
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </>
  );
};

export default Books;
