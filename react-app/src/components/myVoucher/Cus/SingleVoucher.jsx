import React, {useState, useEffect} from "react";
import axios from "axios";

export default function SingleVoucher(props) {
  const { voucher } = props;
  const { id, eatery_id, discount_percentage, weekday, start_, end_, number } = voucher; //add eateryName
  const [eateryName, seteateryName] = useState('')

  // 根据eateryid查找eateryname
  useEffect(()=>{
    axios.get(`http://localhost:8081/customers/eateries/${eatery_id}`)
      .then(response => {
          seteateryName(response.data.eatery_name)
      });
}, [])

  return (
    <div className=" bg-black w-[800px] h-[240px] flex items-center mx-16 mt-8 relative ">
      <div
        id="white1"
        className=" bg-gradient-to-l from-white from-50% to-50%  rounded-[50%] w-[100px] h-[100px] -translate-x-[50%] overflow-hidden"
      ></div>
      <div className="flex-1 w-full h-full text-white ">
        <div className="flex items-start w-full h-fit justify-between text-2xl font-bold mt-2">
          <h1>
            Remain amount:<span>{number}</span>
          </h1>
          <h1 className=" justify-self-end">{eateryName}</h1>
        </div>
        <div className="flex">
          <div className="basis-1/2 relative">
            <h1 className=" text-white text-[50px] relative  top-6 w-fit h-fit mx-auto">
              {discount_percentage}% OFF
            </h1>
            <h2 className=" text-gray-500 text-lg mt-10 ml-auto w-fit">
              Used during the vivid Sydney
            </h2>
          </div>
          <div className=" basis-1/2 relative">
            <h1 className=" text-green-500 text-[50px] relative top-10 w-fit h-fit ml-auto">
              RECEIVE
            </h1>
            <h2 className=" text-gray-500 text-lg mt-10 mx-auto px-2 w-fit translate-x-10">
              valid during {start_} to {end_}
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
