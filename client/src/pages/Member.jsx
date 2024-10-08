import React from "react";
import {
  Header,
  MemberData,
  BorrowHistory,
  ReturnHistory,
} from "../components/index";

const Member = () => {
  return (
    <div>
      <Header />
      <MemberData />
      <BorrowHistory />
      <ReturnHistory />
    </div>
  );
};

export default Member;
