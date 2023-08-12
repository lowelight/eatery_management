import React from "react";
import EaterySignUp from "./EaterySignUp";
import CustomerSignUp from "./CustomerSignUp";
export default function SignUpForm(props) {
  const { from, isOwner } = props;

  return (
    <div className=" bg-[#d1d5db] w-4/5 mx-auto shadow-2xl mt-6 opacity-90">
      {isOwner ? (
        <EaterySignUp from={from || "-1"} isOwner={isOwner} />
      ) : (
        <CustomerSignUp from={from || "-1"} isOwner={isOwner} />
      )}
    </div>
  );
}
