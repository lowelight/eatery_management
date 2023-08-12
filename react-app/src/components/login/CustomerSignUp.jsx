import React from "react";
import { useState, useRef, useEffect } from "react";
import { Form, useSubmit } from "react-router-dom";
import { TextField } from "@mui/material";
import { NativeSelect } from "@material-ui/core";
import axios from 'axios';


export default function CustomerSignUp(props) {
  const { from, isOwner } = props;
  const submit = useSubmit();
  const allowSubmit = useRef(true);
  const [isuser, setIsUser] = useState(true);
  const [isPhone, setIsPhone] = useState(true);
  const [isEmail, setIsEmail] = useState(true);
  const [date, setDate] = useState("");
  const [correctPassword, setCorrectPassword] = useState(true);
  const [userName, setUserName] = useState("");
  const [gender, setGender] = useState("male");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [phone, setPhone] = useState("");
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

  const recordGender = (e) => {
    setGender(e.target.value);
  };

  const recordDate = (e) => {
    setDate(e.target.value);
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
      action: "/signUp",
    });
  };


  {/*Check if username email phone_nuber already in use*/}
  useEffect(() => {
    if (userName && !usernameFirst) {
      axios.post("http://localhost:8081/customers/check_username", {username: userName})
          .then(response => {
              if (response.data.msg === '0') {
                setIsUser(true)
              } else if (response.data.msg === '1') {
                setIsUser(false)
              }
              
          });
    } else {
      setusernameFirst(false)
    }
  }, [userName]);

  useEffect(() => {
    if (email && !emailFirst) {
      axios.post("http://localhost:8081/customers/check_email", {email: email})
          .then(response => {
            if (response.data.msg === '0') {
              setIsEmail(true)
            } else if (response.data.msg === '1') {
              setIsEmail(false)
            }
          });
    } else {
      setemailFirst(false)
    }
  }, [email]);

  useEffect(() => {
    if (phone && !phoneFirst) {
      axios.post("http://localhost:8081/customers/check_phonenum", {phone_number: phone})
          .then(response => {
            if (response.data.msg === '0') {
              setIsPhone(true)
            } else if (response.data.msg === '1') {
              setIsPhone(false)
            }
          });
    } else {
      setphoneFirst(false)
    }
  }, [phone]);

  return (
    <>
      <h1 className=" text-center text-black w-fit mx-auto text-xl mt-3">
        Customer Register
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
            <h1 className="text-red-600 text-base ml-4">
              username in use
            </h1>
          )}
        </div>
        <div>
          <label className="block mt-3">
            <span className=" after:content-['*'] after:ml-0.5 after:text-red-500 block text-md font-medium text-slate-700">
              Gender
            </span>
          </label>
          <NativeSelect
            className="w-64"
            id="gender"
            name="gender"
            value={gender}
            onChange={recordGender}
          >
            <option value="M">male</option>
            <option value="F">female</option>
          </NativeSelect>
        </div>
        <div className="">
          <label className="block my-3">
            <span className=" after:content-['*'] after:ml-0.5 after:text-red-500 block text-md font-medium text-slate-700">
              Date of Birth
            </span>
          </label>
          <TextField
            className="w-64 "
            id="date"
            type="date"
            required
            name="birthday"
            value={date}
            onChange={recordDate}
            InputLabelProps={{
              shrink: true,
            }}
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
            className="w-64 text-black mt-3 px-3 py-2 bg-[#E5E5E5] border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block  rounded-md sm:text-sm focus:ring-1"
            placeholder="you@example.com"
            value={email}
            onChange={recordEmail}
          />
          {isEmail ? (
            ""
          ) : (
            <h1 className=" text-red-600 text-base ml-4">
              email in use
            </h1>
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
            className="w-64 text-black mt-3 px-3 py-2 bg-[#E5E5E5] border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block  rounded-md sm:text-sm focus:ring-1"
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
            className="w-64 text-black mt-3 px-3 py-2 bg-[#E5E5E5] border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block  rounded-md sm:text-sm focus:ring-1"
            value={passwordConfirm}
            onChange={confirmPassword}
          />
          {password !== "" && !correctPassword && (
            <span className="text-red-500">Wrong Password</span>
          )}
        </div>
        <div>
          <label className="block mt-3">
            <span className=" block text-md font-medium text-slate-700">
              Phone
            </span>
          </label>
          <input
            type="text"
            name="phone_number"
            className="w-64 text-black mt-3 px-3 py-2 bg-[#E5E5E5] border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block  rounded-md sm:text-sm focus:ring-1"
            placeholder="1234567890"
            value={phone}
            onChange={recordPhone}
          />
          {isPhone ? (
            ""
          ) : (
            <h1 className="text-red-600 text-base ml-4">
              phone number in use
            </h1>
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
