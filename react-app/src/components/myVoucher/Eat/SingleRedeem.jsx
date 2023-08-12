import React from "react";
import { useState } from "react";

export default function SingleRedeem(props) {
    const info = props.data
    const code = info.code
    const name = info.eatery_name
    const city = info.city
    const discount = info.discount_percentag
    const weekday = info.weekday
    const start_ = info.start_
    const end_ = info.end_
    const [message, setMessage] = useState("");

  
    
    
    
    return(
        
      <div className=" bg-black w-[800px] h-[240px] flex items-center mx-16 mt-8 relative "
      style={{
        position: 'absolute', 
        left: '200px', 
        top: '450px', 
        width: '854px', 
        height: '204px', 
        opacity: 1
      }}
      >
      <div
        id="white1"
        className=" bg-gradient-to-l from-white from-50% to-50%  rounded-[50%] w-[100px] h-[100px] -translate-x-[50%] overflow-hidden"
      ></div>
      <div className="flex-1 w-full h-full text-white ">
        <div className="flex items-start w-full h-fit justify-between text-2xl font-bold mt-2">
          <h1>Code: <span>{code}</span></h1>
          
        </div>
        <div className="flex">
          <div className="basis-1/2 relative">
            <h1 className=" text-white text-[50px] relative  top-6 w-fit h-fit mx-auto">
              {discount}% OFF
            </h1>
            <h2 className=" text-gray-500 text-lg mt-10 ml-auto w-fit">
              Weekday: {weekday || 'None'}
            </h2>
          </div>
          <div className=" basis-1/2 relative">
            
            <h2 className=" text-gray-500 text-lg mt-10 mx-auto px-2 w-fit translate-x-10">
              start date: {start_}
            </h2>
            <h2 className=" text-gray-500 text-lg  mx-auto px-2 w-fit translate-x-10">
              expire date: {end_}
            </h2>
          </div>
        </div>
      </div>
      <div
        id="white2"
        className="bg-gradient-to-r from-white from-50% to-50%  rounded-[50%] w-[100px] h-[100px] translate-x-[50%] overflow-hidden ml-auto"
      ></div>
     {/* <button onClick={redeemClick} style={{color: 'white', fontSize: '20px', 
                position: 'absolute', top: '80px', 
                left: '1000px',backgroundColor: 'green',
                width: '150px', height: '50px',
                }}>Redeem it</button>
            {message && <p>{message}</p>} */}

    </div>
         
    
    )

}