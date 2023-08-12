import React, { useEffect, useState } from "react";
import HOC from "./HOC";
import bg1 from "../../assets/bg1.PNG";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
const Home = (props) => {
  const { city, address, avatar, name, phone_number, bussiness_hours_start, bussiness_hours_end, description, average_rating } = props.props.info; //you can add suburb
  const avatarUrl = avatar ? `http://localhost:8081/${avatar}` : null;
  const [googleLocation, setGoogleLocation] = useState("");
  useEffect(() => {
    const Address = address ? address.trim().split(" ").join("+") : "UNSW";
    const City = city ? city.trim() : "Sydney";
    const googleSearch = `${Address},${City}+Australia`;
    setGoogleLocation(googleSearch);
  }, [address, city]);
  return (
    <div className="flex h-5/6">
      <div className=" basis-[50%] relative">
        <div className="flex items-baseline">
          <h1 className=" font-medium text-5xl mt-20 ml-24 w-[400px] text-black">
            Welcome to {name}
          </h1>
          <Stack direction="row" spacing={2}>
            <Button color="secondary">Average rating: {average_rating}</Button>
          </Stack>
        </div>
        <h2 className=" text-black ml-24 mt-4 w-[560px] h-24 text-xl break-words font-normal">
          {description}
        </h2>
        <div className=" relative mx-auto h-[400px] w-[450px] bg-blue-950 shadow-xl px-2 py-4">
          <div className=" w-full h-full border border-white  text-white">
            <h1 className=" text-white text-2xl ml-2 mt-6">We are open</h1>
            <div className=" ml-6 mt-2">
              <h2 className=" w-fit inline-block">Weekday : </h2>
              <span className=" text-sm ml-1">
                {bussiness_hours_start} to {bussiness_hours_end}
              </span>
            </div>
            <div className="mt-6 ml-6 flex flex-col">
              <h1 className="text-2xl font-medium">Our Location</h1>
              <span className=" ml-12 mt-2 h-fit"> {address} {city}</span>
            </div>
            <div className="mt-6 ml-6 flex flex-col">
              <h1 className="text-2xl font-medium">Contact us</h1>
              <span className=" ml-12 mt-2 h-fit">{phone_number}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 ">
        <div className=" flex w-[420px] h-fit ml-16">
          <Stack direction="row" spacing={2}>
              <Avatar
              alt={name}
              src={avatarUrl}
              sx={{ width: 150, height: 150 }}
              />
          </Stack>
        </div>
        <iframe
          title="google_myLocation"
          id="google_iframe"
          className=" w-2/3 h-2/3 mx-auto mt-6"
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyCPgQcDR7Gt71LvRiZxO9GB-I2u7PYLpZY&q=${googleLocation}`}
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default HOC(Home, "home");

