import React, { useEffect, useState } from "react";
import SignUpForm from "../../components/login/SignUpForm";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { ArrowBackIos } from "@mui/icons-material";
import signup from "../../assets/signup.jpg";
export default function SignUp() {
  const location = useLocation();
  const [from, setFrom] = useState("");
  const [isOwner, setIsOwner] = useState(true);
  useEffect(() => {
    setFrom(location.state?.from);
    setIsOwner(location.state?.isOwner);
  }, []);

  return (

    <div
      className=" bg-yellow-100  w-screen h-screen bg-blend-multiply bg-no-repeat bg-center bg-contain"
      style={{
        backgroundImage: `url(${signup})`,
      }}
    >
      <div className=" w-full h-[50px]  py-2 flex">
        <Link to={-1}>
          <ArrowBackIos className="text-black font-thin ml-2 w-fit mt-1" />
        </Link>

        <h1 className=" ml-auto text-center w-24 mx-auto text-black text-xl ">
          Registration
        </h1>
      </div>
      <SignUpForm from={from} isOwner={isOwner} />
    </div>
  );
}
