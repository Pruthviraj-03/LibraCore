import React from "react";
import { Header, BorrowHistory, ReturnHistory } from "../components/index";

const History = () => {
  return (
    <div>
      <Header />
      <BorrowHistory />
      <ReturnHistory />
    </div>
  );
};

export default History;
