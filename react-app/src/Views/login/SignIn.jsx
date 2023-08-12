import React from "react";
import EateryCanvas from "../../components/EateryObject/EateryCanvas";
import SignInForm from "../../components/login/SignInForm";
import { ArrowBackIos } from "@mui/icons-material";
import { Link } from "react-router-dom";
export default function SignIn() {
  return (
    <div className=" w-full h-full bg-[#d9f99d] bg-blend-normal bg-[url('assets/loginInbg.PNG')] bg-contain bg-right-top bg-no-repeat">
      <div className=" w-full h-[50px]  py-2 flex">
        <Link to={-1}>
          <ArrowBackIos className="text-black font-thin ml-2 w-fit mt-1" />
        </Link>

        <h1 className=" ml-auto text-center w-24 mx-auto text-black text-xl ">
          Login in
        </h1>
      </div>
      <div className=" flex flex-1 h-screen ">
        <SignInForm />
        {/* <EateryCanvas /> */}
      </div>
    </div>
  );
}
