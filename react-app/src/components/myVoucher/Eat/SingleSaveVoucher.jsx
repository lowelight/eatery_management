import React, { useEffect, useState } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";


export default function SingleVoucher({ onChange }) {
  // const v_info = props.data;
  // console.log(props)

  const [discount, setDiscount] = useState(0);
  const [amount, setAmount] = useState(0);
  const [timeStart, setTimeStart] = useState("");
  const [timeEnd, setTimeEnd] = useState("");
  const [message, setMessage] = useState("");

  const setDefault = () => {
    setDiscount(0);
    setAmount(0);
    setTimeStart("");
    setTimeEnd("");
  };

  const recordDiscount = (e) => {
    setDiscount(e.target.value);
  };
  const recordAmount = (e) => {
    setAmount(e.target.value);
  };
  const recordTimeStart = (e) => {
    setTimeStart(e);
  };
  const recordTimeEnd = (e) => {
    setTimeEnd(e);
  };
  const handleClick = () => {
    let data = {
      discount_percentage: discount,
      start_: timeStart.toISOString().slice(0, 10),
      end_: timeEnd.toISOString().slice(0, 10),
      set_number: amount,
    };
    console.log(timeStart.toISOString().slice(0, 10));
    console.log(timeEnd.toISOString().slice(0, 10));
    const requestOptions = {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    fetch("http://localhost:8081/eateries/voucher/offer", requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        onChange("Normal voucher added successfully");
        setDefault();
      })
      .catch((error) => {
        onChange("Normal voucher failed to add");
        console.error("There was an error!", error);
      });
  };

  return (
    <div className=" bg-black w-[850px] h-[240px] flex items-center mx-16 mt-8 relative ">
      <div
        id="white1"
        className=" bg-gradient-to-l from-white from-50% to-50%  rounded-[50%] w-[100px] h-[100px] -translate-x-[50%] overflow-hidden"
      ></div>
      <div className="flex-1 w-full h-full text-white ">
        <div className="flex mt-16">
          <span className=" text-white text-2xl">Set discount</span>
          <input
            type="number"
            className="ml-2 w-12 text-2xl"
            onChange={recordDiscount}
            value={discount}
          />
          <span className="text-white text-2xl">%</span>
          <span className=" text-white text-2xl ml-28">Set amount</span>
          <input
            type="number"
            className="ml-2 w-12 text-2xl"
            onChange={recordAmount}
            value={amount}
          />
        </div>
        <div className="mt-8 flex relative">
          <span className="text-white text-xl h-fit my-auto ">
            Set Time Range
          </span>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker", "DatePicker"]}>
              <DatePicker
                value={timeStart}
                onChange={recordTimeStart}
                label="StartDate"
                sx={{
                  color: "white",
                  opacity: 0.9,
                  backgroundColor: "white",
                  borderRadius: "7px",
                  width: "200px",
                }}
              />
              <DatePicker
                value={timeEnd}
                onChange={recordTimeEnd}
                label="EndDate"
                sx={{
                  color: "white",
                  opacity: 0.9,
                  backgroundColor: "white",
                  borderRadius: "7px",
                  width: "200px",
                }}
              />
            </DemoContainer>
          </LocalizationProvider>
          <button
            onClick={handleClick}
            className=" bg-green-400 px-4 py-2 h-fit w-fit rounded-2xl top-16 left-20 relative"
          >
            Save
          </button>
        </div>
      </div>
      <div
        id="white2"
        className="bg-gradient-to-r from-white from-50% to-50%  rounded-[50%] w-[100px] h-[100px] translate-x-[50%] overflow-hidden ml-auto"
      ></div>
      {message && <p>{message}</p>}
    </div>
  );
}
