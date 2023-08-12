import React, { useState, useEffect } from "react";
import LogButton from "../../components/LogButton";
import { useLocation, Link } from "react-router-dom";
export default function Layout() {
  const [color, setColor] = useState("Home");
  const location = useLocation();
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < window.innerHeight - 20) {
        setColor("Home");
      } else if (window.scrollY < window.innerHeight * 2 - 20) {
        setColor("Menu");
      } else if (window.scrollY < window.innerHeight * 3 - 20) {
        setColor("Voucher");
      } else {
        setColor("Review");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className="w-full bg-transparent top-0 left-0 flex mt-2 h-fit fixed text-black">
      {/* <img src="/" alt="oops" /> */}
      <Link
        className=" ml-2 text-orange-500 text-xl cursor-pointer"
        to="/eatery"
      >
        Main
      </Link>
      <ul className="ml-4 flex justify-around w-[40%] cursor-pointer ">
        <li
          className={`h-fit ${color === "Home" ? "text-orange-500" : ""}`}
          onClick={() => setColor("Home")}
        >
          <a href="#home">Home</a>
        </li>
        <li
          className={`h-fit ${color === "Menu" ? "text-orange-500" : ""}`}
          onClick={() => setColor("Menu")}
        >
          <a href="#menu">Menu</a>
        </li>
        <li
          className={`h-fit ${color === "Voucher" ? "text-orange-500" : ""}`}
          onClick={() => setColor("Voucher")}
        >
          <a href="#book">Book a voucher</a>
        </li>
        <li
          className={`h-fit ${color === "Review" ? "text-orange-500" : ""}`}
          onClick={() => setColor("Review")}
        >
          <a href="#review">Review</a>
        </li>
      </ul>
      <LogButton location={location} />
    </div>
  );
}
