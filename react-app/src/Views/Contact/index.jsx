import React from "react";
import { Link } from "react-router-dom";
import { ArrowBackIos } from "@mui/icons-material";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import EmailIcon from "@mui/icons-material/Email";
const Contact = () => {
  return (
    <div className=" w-screen h-screen bg-slate-200 overflow-hidden ">
      <div className="w-full h-fit mt-10 flex">
        <Link to={-1}>
          <ArrowBackIos className="text-black ml-4 w-fit text-xl " />
        </Link>
      </div>
      <h1 className=" text-black text-3xl text-center ">
        Contact us by phone or email
      </h1>
      <div className=" bg-white w-2/3 mx-auto h-2/3 mt-16 px-10 py-8 shadow-lg">
        <SmartphoneIcon
          sx={{ color: "red", fontSize: "40px" }}
          className=" mt-10 ml-12"
        />
        <p className=" text-gray-400 text-2xl text-left pl-12 mt-6">
          Service call ( Working hours: 9:00 - 22:00 )
        </p>
        <h2 className=" text-black text-3xl pl-12 mt-6">+61 411865048</h2>
        <EmailIcon
          sx={{ color: "red", fontSize: "40px" }}
          className=" mt-10 ml-12"
        />
        <p className=" text-gray-400 text-2xl text-left pl-12 mt-6">
          Service mailbox
        </p>
        <h2 className=" text-black text-3xl pl-12 mt-6">Eathub@gmail.com</h2>
      </div>
    </div>
  );
};
export default Contact;
