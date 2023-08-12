import React, { useEffect } from "react";
import { useState, useRef } from "react";
import { Form, useSubmit } from "react-router-dom";
import { TextField } from "@mui/material";
import { categories, cities, suburbs, state } from "../../constant";
import axios from 'axios';


export default function EaterySignUp(props) {
  const { from, isOwner } = props;
  const submit = useSubmit();
  const allowSubmit = useRef(true);

  const [correctPassword, setCorrectPassword] = useState(true);
  const [userName, setUserName] = useState("");
  const [isuser, setIsUser] = useState(true);
  const [isPhone, setIsPhone] = useState(true);
  const [isEmail, setIsEmail] = useState(true);
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [phone, setPhone] = useState("");
  const [cuisines, setCuisines] = useState("");
  const [address, setAddress] = useState("");
  const [suburb, setSuburb] = useState("");
  const [city, setCity] = useState("");
  const [states, setState] = useState("");
  const [postcode, setPostcode] = useState("");
  const refPassword = useRef("");
  const refUser = useRef(false);
  const refEmail = useRef(false);
  const refPhone = useRef(false);
  const formRef = useRef();
  // 设置三个变量，用来记录是否第一次渲染，来阻止第一次渲染时监控填入的username email phone
  const [usernameFirst, setusernameFirst] = useState(true)
  const [emailFirst, setemailFirst] = useState(true)
  const [phoneFirst, setphoneFirst] = useState(true)


  const recordPassword = (e) => {
    setPassword(e.target.value);
  };
  const recordUserName = (e) => {
    setUserName(e.target.value);
  };
  const recordEmail = (e) => {
    setEmail(e.target.value);
  };
  const recordPhone = (e) => {
    setPhone(e.target.value);
  };

  const recordFrom = (e) => {
    setFromTime(e.target.value);
  };
  const recordTo = (e) => {
    setToTime(e.target.value);
  };

  const recordCuisines = (e) => {
    setCuisines(e.target.value);
  };
  const recordAddress = (e) => {
    setAddress(e.target.value);
  };
  const recordSuburb = (e) => {
    setSuburb(e.target.value);
  };
  const recordCity = (e) => {
    setCity(e.target.value);
    setSuburb("none");
  };
  const recordState = (e) => {
    setState(e.target.value);
    setCity("none");
    setSuburb("none");

  };
  const recordPostcode = (e) => {
    setPostcode(e.target.value);
  };
  const confirmPassword = (e) => {
    refPassword.current = e.target.value;
    setPasswordConfirm(e.target.value);
    if (password === refPassword.current) {
      setCorrectPassword(true);
      return;
    }
    setCorrectPassword(false);
  };

  const verifySubmit = (e) => {
    e.preventDefault();
    if (!allowSubmit.current) {
      alert("Please check your information!");
      return;
    }
    const formdata = new FormData(formRef.current);
    formdata.append("from", from);
    formdata.append("isOwner", isOwner);
    submit(formdata, {
      method: "POST",
      from: from,
      isOwner: isOwner,
    });
  };


  {
    /*Check if username email phone_nuber already in use*/
  }
  useEffect(() => {
    if (userName && !usernameFirst) {
      axios
        .post("http://localhost:8081/eateries/check_username", {
          username: userName,
        })
        .then((response) => {
          if (response.data.msg === "0") {
            setIsUser(true);
          } else if (response.data.msg === "1") {
            setIsUser(false);
          }
        });
    } else {
      setusernameFirst(false);
    }
  }, [userName]);

  useEffect(() => {
    if (email && !emailFirst) {
      axios
        .post("http://localhost:8081/eateries/check_email", { email: email })
        .then((response) => {
          if (response.data.msg === "0") {
            setIsEmail(true);
          } else if (response.data.msg === "1") {
            setIsEmail(false);
          }
        });
    } else {
      setemailFirst(false);
    }
  }, [email]);

  useEffect(() => {
    if (phone && !phoneFirst) {
      axios
        .post("http://localhost:8081/eateries/check_phonenum", {
          phone_number: phone,
        })
        .then((response) => {
          if (response.data.msg === "0") {
            setIsPhone(true);
          } else if (response.data.msg === "1") {
            setIsPhone(false);
          }
        });
    } else {
      setphoneFirst(false);
    }
  }, [phone]);

  return (
    <>
      <h1 className=" text-center text-black w-fit mx-auto text-xl mt-3">
        Eatery Register
      </h1>
      <Form
        method="post"
        action="/signUp"
        className="  grid grid-cols-2 items-center justify-items-center mt-10 pb-14"
        onSubmit={verifySubmit}
        ref={formRef}
      >
        <div>
          <label className="block mt-3">
            <span className=" after:content-['*'] after:ml-0.5 after:text-red-500 block text-md font-medium text-slate-700">
              User Name
            </span>
          </label>
          <input
            required
            type="text"
            name="username"
            className=" w-64 text-black mt-3 px-3 py-2 bg-[#E5E5E5] border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block  rounded-md sm:text-sm focus:ring-1"
            placeholder="abc"
            onChange={recordUserName}
            value={userName}
          />
          {isuser ? (
            ""
          ) : (
            <h1 className="text-red-600 text-base ml-4">Username in use</h1>
          )}
        </div>
        <div>
          <label className="block mt-1">
            <span className=" after:content-['*'] after:ml-0.5 after:text-red-500 block text-md font-medium text-slate-700">
              Business hours
            </span>
          </label>
          <div className="flex mt-3">
            <TextField
              id="time_start"
              name="bussiness_hours_start"
              label="From"
              type="time"
              value={fromTime}
              onChange={recordFrom}
            />
            <TextField
              id="time_end"
              name="bussiness_hours_end"
              label="To"
              type="time"
              value={toTime}
              onChange={recordTo}
            />
          </div>
        </div>
        <div>
          <label className="block mt-3">
            <span className=" after:content-['*'] after:ml-0.5 after:text-red-500 block text-md font-medium text-slate-700">
              Cuisines
            </span>
          </label>
          <select
            required
            name="cuisine"
            className="mt-1 px-3 py-2 text-black bg-[#E5E5E5]  border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-64 rounded-md sm:text-sm focus:ring-1"
            value={cuisines}
            onChange={recordCuisines}
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mt-3">
            <span className=" after:content-['*'] after:ml-0.5 after:text-red-500 block text-md font-medium text-slate-700">
              Address
            </span>
          </label>
          <input
            required
            type="text"
            name="address"
            className="mt-1 px-3 py-2 text-black bg-[#E5E5E5]  border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-64 rounded-md sm:text-sm focus:ring-1"
            value={address}
            onChange={recordAddress}
          />
        </div>
        <div>
          <label className="block mt-3">
            <span className=" after:content-['*'] after:ml-0.5 after:text-red-500 block text-md font-medium text-slate-700">
              State
            </span>
          </label>
          <select
            required
            name="state"
            className="mt-1 px-3 py-2 text-black bg-[#E5E5E5]  border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-64 rounded-md sm:text-sm focus:ring-1"
            value={states}
            onChange={recordState}
          >
            <option value="none">please choose</option>
            {state.map((record) => (
              <option key={record.key} value={record.name}>
                {record.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mt-3">
            <span className=" after:content-['*'] after:ml-0.5 after:text-red-500 block text-md font-medium text-slate-700">
              City
            </span>
          </label>
          <select
            required
            name="city"
            className="mt-1 px-3 py-2 text-black bg-[#E5E5E5]  border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-64 rounded-md sm:text-sm focus:ring-1"
            value={city}
            onChange={recordCity}
          >
            <option value="none">please choose</option>
            {states === "" ? (
              <span>please choose state first</span>
            ) : (
              cities
                .filter((item) => item.state === states)
                .map((item) => (
                  <option key={item.key} value={item.name}>
                    {item.name}
                  </option>
                ))
            )}
          </select>
        </div>
        <div>
          <label className="block mt-3">
            <span className=" after:content-['*'] after:ml-0.5 after:text-red-500 block text-md font-medium text-slate-700">
              Suburb
            </span>
          </label>
          <select
            required
            type="text"
            name="suburb"
            className="mt-1 px-3 py-2 text-black bg-[#E5E5E5]  border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-64 rounded-md sm:text-sm focus:ring-1"
            value={suburb}
            onChange={recordSuburb}
          >
            <option value="none">please choose</option>
            {city === "" ? (
              <span>please choose city first</span>
            ) : (
              suburbs
                .filter((item) => item.city === city)
                .map((item) => (
                  <option key={item.key} value={item.name}>
                    {item.name}
                  </option>
                ))
            )}
          </select>
          {}
        </div>

        <div>
          <label className="block mt-3">
            <span className=" after:content-['*'] after:ml-0.5 after:text-red-500 block text-md font-medium text-slate-700">
              Postcode
            </span>
          </label>
          <input
            required
            type="text"
            name="postcode"
            className="mt-1 px-3 py-2 text-black bg-[#E5E5E5]  border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-64 rounded-md sm:text-sm focus:ring-1"
            value={postcode}
            onChange={recordPostcode}
          />
        </div>
        <div>
          <label className="block mt-3">
            <span className=" after:content-['*'] after:ml-0.5 after:text-red-500 block text-md font-medium text-slate-700">
              Email Address
            </span>
          </label>
          <input
            required
            type="email"
            name="email"
            className="mt-1 px-3 py-2 text-black bg-[#E5E5E5]  border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-64 rounded-md sm:text-sm focus:ring-1"
            placeholder="you@example.com"
            value={email}
            onChange={recordEmail}
          />
          {isEmail ? (
            ""
          ) : (
            <h1 className="text-red-600 text-base ml-4">Email in use</h1>
          )}
        </div>
        <div>
          <label className="block mt-3">
            <span className=" after:content-['*'] after:ml-0.5 after:text-red-500 block text-md font-medium text-slate-700">
              Password
            </span>
          </label>
          <input
            required
            type="password"
            name="password"
            className="mt-1 px-3 py-2 text-black bg-[#E5E5E5]  border shadow-sm border-slate-300  focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-64 rounded-md sm:text-sm focus:ring-1"
            onChange={recordPassword}
            value={password}
          />
        </div>
        <div>
          <label className="block mt-3">
            <span className=" after:content-['*'] after:ml-0.5 after:text-red-500 block text-md font-medium text-slate-700">
              Confirm Password
            </span>
          </label>
          <input
            required
            type="password"
            name="confirm"
            className="mt-1 px-3 py-2 text-black bg-[#E5E5E5]  border shadow-sm border-slate-300  focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-64 rounded-md sm:text-sm focus:ring-1"
            value={passwordConfirm}
            onChange={confirmPassword}
          />
          {password !== "" && !correctPassword && (
            <span className="text-red-500">Wrong Password</span>
          )}
        </div>
        <div>
          <label className="block mt-3">
            <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-md font-medium text-slate-700">
              Phone
            </span>
          </label>
          <input
            type="text"
            name="phone_number"
            className="mt-1 px-3 py-2 text-black bg-[#E5E5E5] border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-64 rounded-md sm:text-sm focus:ring-1"
            placeholder="1234567890"
            value={phone}
            onChange={recordPhone}
          />
          {isPhone ? (
            ""
          ) : (
            <h1 className="text-red-600 text-base ml-4">Phone number in use</h1>
          )}
        </div>
        <button
          type="submit"
          name="submit"
          className="w-64 mt-8 col-span-2  rounded-xl mx-auto text-2xl text-white   bg-[#00BAAD]/50 border float-right  "
        >
          Create
        </button>
      </Form>
    </>
  );
}
