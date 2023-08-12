import React, { useEffect, useState } from "react";
import useUserStore from "../../../store/User";
import voucher from "../../../assets/voucher.jpg";
import SingleRedeem from "./SingleRedeem";
import LogoutButton from "../../LogoutButton";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

export default function RedeemVoucher() {
  const eateryStore = useUserStore((state) => state.eateryStore);
  const name = eateryStore.name;
  const [avatar] = useUserStore((state) => [state.avatar]);
  const avatarUrl = avatar ? `http://localhost:8081/${avatar}` : null;
  const [code, setCode] = useState("");
  const [avaliable, setAvaliable] = useState(false);
  const [vouchers, setVouchers] = useState({});
  const [message, setMessage] = useState("");

  const redeemClick = () => {
    setAvaliable(false);
    setMessage("");
    const requestOptions = {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: code }),
    };
    console.log(code);
    fetch("http://localhost:8081/eateries/vouchers/use", requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setMessage("Voucher used successfully!");
        setCode("");
        // console.log(data);
        // console.log(avaliable);
        // console.log(data.data);
      })
      .catch((error) => {
        setMessage("There was an error or voucher has been used!");
        console.error("There was an error!", error);
      });
  };

  const checkVoucher = () => {
    setAvaliable(false);
    setMessage("");
    const requestOptions = {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: code }),
    };
    fetch("http://localhost:8081/eateries/vouchers/verify", requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setAvaliable(true);
        setVouchers(data.data);
        // console.log(data);
        // console.log(avaliable);
        // console.log(data.data);
      })
      .catch((error) => {
        setCode("");
        setMessage("No voucher to use");
        console.error("There was an error!", error);
      });
  };

  return (
    <div
      key="EatVoucher"
      className="bg-[#91bbae] h-screen w-screen overflow-hidden flex flex-col"
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
          Redeem
        </h1>
        <div className="relative top-[80%] h-fit left-[35%]"></div>
      </div>
      <div className=" mx-4 mt-3 rounded-3xl flex-1   bg-[#c5dad4] flex">
        {
          //data
        }
        <div>
          <input
            type="text"
            style={{
              position: "absolute",
              left: "427.05px",
              top: "300px",
              width: "457.95px",
              height: "60px",
              opacity: 1,
              borderRadius: "3px",
              background: "rgba(254, 253, 254, 1)",
              fontSize: "40px",
              color: "black",
            }}
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <div
            style={{
              position: "absolute",
              left: 307,
              top: 300,
              width: 88.92,
              height: 60,
              opacity: 1,
              borderRadius: 3,
              background: "rgba(81, 121, 239, 1)",
            }}
          >
            <button
              style={{
                width: "100%",
                height: "100%",
                fontSize: "20px",
              }}
              onClick={checkVoucher}
            >
              Submit
            </button>
          </div>
        </div>
        {avaliable && (
          <div>
            <SingleRedeem data={vouchers} />
            <button
              onClick={redeemClick}
              className="text-white text-lg bg-[#8de4bb] rounded-3xl w-40 h-12 absolute right-48 bottom-60"
            >
              Redeem it
            </button>
          </div>
        )}
        {message && (
          <p
            style={{
              position: "fixed",
              top: "70%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              fontSize: 50,
              color: "black",
            }}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

