import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import useVoucherStore from "../../../store/Voucher";
import useUserStore from "../../../store/User";
import voucher from "../../../assets/voucher.jpg";
import SingleVoucher from "./SingleSaveVoucher";
import EateryOwnVoucher from "./SingleOwnVoucher";
import RedeemVoucher from "./EateryRedeem";
import { Link } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function CustomerVoucher() {

  const eateryStore = useUserStore((state) => state.eateryStore);
  const name = eateryStore.name;
  const [setSelfVoucher] = useVoucherStore((state) => [state.setSelfVoucher]);
  const [avatar] = useUserStore((state) => [state.avatar]);
  const avatarUrl = avatar ? `http://localhost:8081/${avatar}` : null;
  const [vouchers, setVoucher] = useState([]);

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    };
    fetch("http://localhost:8081/eateries/vouchers", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setVoucher(data.data);
        setSelfVoucher(data.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  // const { isLoading, isError, data, error } = useQuery({
  //   queryKey: ["selfVoucher"],
  //   queryFn: fetchSelfVoucher.bind(null, "customers"),
  // });
  // useEffect(() => {
  //   setSelfVoucher(data);
  // }, [data, setSelfVoucher]);
  // if (isLoading) {
  //   return <span>Loading...</span>;
  // }

  // if (isError) {
  //   return <span>Error: {error.message}</span>;
  // }
  return (
    <div key="EatVoucher" className="flex flex-col flex-1 overflow-auto">
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
          My Vouchers
        </h1>
        <div className="relative top-[80%] h-fit right-0 ml-auto w-fit mr-20">
          <Link
            to="/eateryRedeem"
            className=" px-4 py-2 bg-[#8de4bb] text-white text-base rounded-2xl"
          >
            Redeem voucher
          </Link>

          <Link
            to="/eateryAddVoucher"
            className=" px-4 py-2 bg-[#8de4bb] text-white text-base ml-2 rounded-2xl"
          >
            Add a voucher
          </Link>
          <Link
            to="/eateryDeleteVoucher"
            className="px-4 py-2 bg-[#8de4bb] text-white text-base ml-2 rounded-2xl"
          >
            Delete a voucher
          </Link>
        </div>
      </div>
      <div className=" mx-4 mt-3 rounded-3xl flex-1   bg-[#c5dad4] flex overflow-auto">
        {
          //data
        }
        <div>
          {vouchers && vouchers.map((item, index) => (
              <EateryOwnVoucher key={index} data={item} />
            ))}
        </div>
        <img
          src={voucher}
          alt="voucher"
          className=" bg-cover w-[400px] h-[400px] m-auto"
        />
      </div>
    </div>
  );
}
