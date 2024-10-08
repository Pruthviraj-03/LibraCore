import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home, Books, Members, History, Member } from "./pages/index";
import { Login, SignUp, Profile } from "./Auth/index.js";

const App = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/books" element={<Books />} />
      <Route exact path="/members" element={<Members />} />
      <Route exact path="/history" element={<History />} />
      <Route exact path="/member/:id" element={<Member />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/signup" element={<SignUp />} />
      <Route exact path="/profile" element={<Profile />} />
    </Routes>
  );
};

export default App;
