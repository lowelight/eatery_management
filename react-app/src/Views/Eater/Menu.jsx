import React from "react";
import HOC from "./HOC";
import bg1 from "../../assets/bg1.PNG";
const Menu = (props) => {
  const { menu } = props.props.info;
  const menuUrl = menu ? `http://localhost:8081/${menu}` : null;
  return (
    <div className="w-full h-full mt-24">
      <h1 className=" mt-28 ml-4 text-black font-semibold text-3xl">
        We Service Food For You
      </h1>
      <img
        src={menuUrl || bg1}
        alt="bg1"
        className="w-[900px] h-[560px]  mt-2 bg-cover bg-clip-border rounded-2xl mx-auto"
      />
    </div>
  );
};

export default HOC(Menu, "menu");
