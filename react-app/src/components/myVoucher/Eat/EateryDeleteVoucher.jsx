import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import useVoucherStore from "../../../store/Voucher";
import useUserStore from "../../../store/User";
import voucher from "../../../assets/voucher.jpg";
import SingleVoucher from "./SingleSaveVoucher";
import { Link } from "react-router-dom";
import SingleDeleteVoucher from "./SingleDeleteVoucher";
import LogoutButton from "../../LogoutButton";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

export default function EateryDeleteVoucher() {
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
        console.log(data);
        setVoucher(data.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const handleDelete = (id) => {
    const requestOptions = {
      method: "DELETE",
      credentials: "include",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        id: id,
      }),
    };
    fetch("http://localhost:8081/eateries/vouchers/delete", requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setVoucher((prevVouchers) =>
          prevVouchers.filter((voucher) => voucher.id !== id)
        );
        // console.log(data);
        // console.log(avaliable);
        // console.log(data.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  return (
    <div
      key="EatVoucher"
      className="bg-[#91bbae] h-screen w-screen flex flex-col"
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
          Delete voucher
        </h1>
        <div className="relative top-[80%] h-fit left-[35%]"></div>
      </div>
      <div className=" mx-4 mt-3 rounded-3xl flex-1   bg-[#c5dad4] flex overflow-auto">
        <div>
          {vouchers &&
            vouchers.map((item, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <SingleDeleteVoucher data={item} />
                <button
                  onClick={() => handleDelete(item.id)}
                  style={{ backgroundColor: "red" }}
                >
                  Delete
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

