import React, { useState } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
export default function SingleDeleteVoucher(props) {
    const info = props.data;
    console.log(info)
    return (
      <div className=" bg-black w-[800px] h-[240px] flex items-center mx-16 mt-8 relative ">
        <div
          id="white1"
          className=" bg-gradient-to-l from-white from-50% to-50%  rounded-[50%] w-[100px] h-[100px] -translate-x-[50%] overflow-hidden"
        ></div>
        <div className="flex-1 w-full h-full text-white ">
          <div className="flex items-start w-full h-fit justify-between text-2xl font-bold mt-2">
            <h1>Set number: <span>{info.set_number}</span></h1>
            <h1 className=" justify-self-end">Remain number: {info.number}</h1>
          </div>
          <div className="flex">
            <div className="basis-1/2 relative">
              <h1 className=" text-white text-[50px] relative  top-6 w-fit h-fit mx-auto">
                {info.discount_percentage}% OFF
              </h1>
              <h2 className=" text-gray-500 text-lg mt-10 ml-auto w-fit">
                Weekday: {info.weekday || 'None'}
              </h2>
            </div>
            <div className=" basis-1/2 relative">
                <h1 className=" text-green-500 text-[50px] relative top-10 w-fit h-fit ml-auto">
                RECEIVE
                </h1>
                <h2 className=" text-gray-500 text-lg mt-10 mx-auto px-2 w-fit translate-x-10">
                start date: {info.start_}
                </h2>
                <h2 className=" text-gray-500 text-lg  mx-auto px-2 w-fit translate-x-10">
                expire date: {info.end_}
                </h2>
                
            </div>
          </div>

        </div>
        <div
          id="white2"
          className="bg-gradient-to-r from-white from-50% to-50%  rounded-[50%] w-[100px] h-[100px] translate-x-[50%] overflow-hidden ml-auto"
        ></div>
      </div>
    );
}