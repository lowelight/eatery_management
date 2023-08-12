import React, { useEffect, useState } from "react";
import useUserStore from "../../../store/User";
import voucher from "../../../assets/voucher.jpg";
import { Link } from "react-router-dom";
import SingleVoucher from "./SingleSaveVoucher";
import WeekdaySingleVoucher from "./SingleWeekdayVoucher";
import LogoutButton from "../../LogoutButton";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

export default function EateryAddVoucher() {
  const eateryStore = useUserStore((state) => state.eateryStore);
  const name = eateryStore.name;
  const [update, setUpdate] = useState(false);
  const [avatar] = useUserStore((state) => [state.avatar]);
  const avatarUrl = avatar ? `http://localhost:8081/${avatar}` : null;
  const [message, setMessage] = useState("");

  const handleChange = (data) => {
    setMessage(data);
    // window.location.reload();
  };
  return (
    <div
      key="EatVoucher"
      className="bg-[#91bbae] h-screen w-screen overflow-auto flex flex-col"
    >
      <LogoutButton />
      <div className="flex w-screen h-fit basis-auto relative">
        <Stack direction="row" spacing={2} className="ml-12 rounded-[50%] bg-cover h-28 w-28">
            <Avatar
            alt={eateryStore.name}
            src={avatarUrl}
            sx={{ width: 100, height: 100 }}
            />
        </Stack>

        <div className=" rounded-full bg-black w-16 h-16 ml-1 text-center  text-[34px] translate-y-4">
          <h1 className="h-[40px] m-auto w-fit p-0 translate-y-1.5">
            {name.charAt(0).toUpperCase()}
          </h1>
        </div>
        <h1 className="ml-2 h-fit text-black text-[40px] font-medium translate-y-4 ">
          {name}
        </h1>
        <h1 className="relative w-fit h-fit left-[25%] -translate-x-[50%] text-black text-[32px] translate-y-[150%]">
          Create Vouchers
        </h1>
      </div>
      <div className=" mx-4 mt-3 rounded-3xl flex-1 overflow-auto  bg-[#c5dad4] ">
        <div
          style={{
            width: "100%",
            fontSize: "50px",
            color: "black",
            textAlign: "center",
          }}
          className="mt-3"
        >
          <p>{message}</p>
        </div>
        <div className="flex mt-4">
          <h1 className="text-gray-700 text-3xl ml-4 mt-2 mr-8 self-center font-sans font-bold tracking-wide">
            Normal voucher:
          </h1>
          <SingleVoucher onChange={handleChange} />
        </div>
        <div className="flex mt-4">
          <h1 className="text-gray-700 text-3xl ml-4 mt-2 mr-8 self-center font-sans font-bold tracking-wide">
            Weekday voucher:
          </h1>
          <WeekdaySingleVoucher onChange={handleChange} />
        </div>
      </div>
    </div>
  );
}

