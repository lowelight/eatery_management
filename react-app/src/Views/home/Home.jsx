import React from "react";
import { Link, useLocation } from "react-router-dom";
import bg1 from "../../assets/bg1.PNG";
import { peopleGroup1, peopleGroup2 } from "../../assets/homePeople";
export default function Home() {
  const location = useLocation();

  return (
    //HomePage
    <div className="w-full h-screen overflow-hidden absolute">
      {/*
            food
            */}
      <img
        className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] h-[343px] w-[440px]"
        src={bg1}
        alt="bg1"
      />
      {/*
        people
        */}
      <div className=" grid grid-flow-col absolute top-[40%] -translate-y-[50%] left-14">
        {peopleGroup1.map((people, index) => (
          <img key={`people-${index}`} src={people} alt={`people-${index}`} />
        ))}
      </div>
      <div className=" grid grid-flow-col absolute top-[40%] -translate-y-[50%]  w-fit right-14">
        {peopleGroup2.map((people, index) => (
          <img key={`people-${index}`} src={people} alt={`people-${index}`} />
        ))}
      </div>
      {/**
       * Home mainPage
       * Link
       * SignIn SingUp
       */}
      <div className=" w-full h-1/2 bg-[#f1f1b8] ">
        <div className="flex ">
          <h1 className=" w-fit text-[#F53A2E] text-[68px] font-bold italic">
            Eathub
          </h1>
          <div className=" text-lg px-10 grid grid-flow-col gap-6 text-black ml-auto mt-1 ">
            <Link
              className="mt-0.5 p-1"
              to="/signIn"
              state={{ from: location.pathname }}
            >
              Login
            </Link>
            <Link
              className="mt-0.5 p-1"
              to="/about"
              state={{ from: location.pathname }}
            >
              About
            </Link>
            <Link
              className="mt-0.5 p-1"
              to="/contact"
              state={{ from: location.pathname }}
            >
              Contact
            </Link>
            <Link
              className=" mt-0.5 bg-[#508CE7] h-fit rounded-2xl p-1"
              to="/eatery"
              state={{ from: location.pathname }}
            >
              Search Eatery
            </Link>
          </div>
        </div>
        <h2 className="w-fit h-fit m-auto  text-black text-[40px] font-medium italic translate-y-[50%]">
          We are your best restaurant concierge.
        </h2>
      </div>
      <div className="w-full h-1/2 flex flex-1">
        <div className="bg-[#508CE7]/[.99] h-[100%] basis-1/2">
          <h1 className="mt-14 w-96 mx-auto text-gray-500 font-semibold  text-[28px]  italic -translate-x-10 h-28 ">
            help you plan, start, grow, and advertise your small business
          </h1>

          <div className=" h-fit w-fit mx-auto mt-16">
            <Link
              className=" bg-white rounded-2xl font-bold  text-[24px] text-[#28630D]/[.83] p-2 "
              to="/signUp"
              state={{
                from: location.pathname,
                isOwner: true,
              }}
            >
              Sign up as Eatery Owner
            </Link>
          </div>
        </div>
        <div className="bg-[#9ECA8A]/[.96] h-[100%] basis-1/2">
          <h1 className="mt-14 w-96  mx-auto text-gray-500 font-semibold  text-[38px]  italic  h-28  text-center translate-x-4 ">
            Save money <br />
            Boost profits
          </h1>

          <div className=" h-fit w-fit mx-auto mt-16">
            <Link
              className=" bg-white rounded-2xl font-bold  text-[24px] text-[#0D1B63]/[.78] p-2 px-6 "
              to="/signUp"
              state={{
                from: location.pathname,
                isOwner: false,
              }}
            >
              Sign up as Customer
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
