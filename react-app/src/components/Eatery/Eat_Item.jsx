import React, { useEffect, useRef, useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import CheckIcon from "@mui/icons-material/Check";
import { useNavigate } from "react-router-dom";
import { green, orange } from "@material-ui/core/colors";
import bg from "../../assets/bg1.PNG";

//need reservation code
export default function EatItem(props) {
  const { data } = props;
  const avatarUrl = data?.avatar ? `http://localhost:8081/${data?.avatar}` : null;
  const navigate = useNavigate();
  const redirectPage = () => {
    navigate(`/eateries/${data?.id || "1"}`);
  };
  const formRef = useRef();
  const star = Math.floor(data?.average_rating);
  const isHalfstar = data?.average_rating > star;

  return (
    <div className="flex" ref={formRef} id="1">
      <img
        src={avatarUrl || bg}
        alt="img_1"
        className="image-element w-40 h-32 object-cover cursor-pointer"
        onClick={redirectPage}
      />
      <div className="flex-1 text-black ml-4 mt-2">
        <h1 className="text-xl font-bold cursor-pointer" onClick={redirectPage}>
          {data?.name || "food"}
        </h1>
        <div className="flex mt-2">
          {Array.from({ length: star }).map(() => (
            <StarIcon sx={{ color: orange[600] }} />
          ))}
          {isHalfstar && <StarHalfIcon sx={{ color: orange[600] }} />}

          <h1 className=" text-gray-400 ml-2 text-base">
            {data?.average_rating ? data?.average_rating : "0.0"}
          </h1>

        </div>
        <h1 className="mr-2 border bg-gray-200 text-gray-600 w-fit px-0.5">
          {data?.cuisine}
        </h1>
        <h2 className="mt-2 text-gray-400 text-base">
          from {data?.bussiness_hours_start} to {data?.bussiness_hours_end}
        </h2>
        <div className="flex mt-2">
          <CheckIcon sx={{ color: green[500] }} />
          <h2 className="ml-1 text-gray-400 text-base">Voucher available</h2>
        </div>
      </div>
    </div>
  );
}
