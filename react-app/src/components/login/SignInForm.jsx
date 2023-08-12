import React, { useRef, useState } from "react";
import { Form, useActionData, useSubmit } from "react-router-dom";

import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";

export default function SignInForm() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isPassword, setIsPassword] = useState(true);
  const formRef=useRef();
  const LoginType = useRef(1);
  const errors = useActionData();
  const submit = useSubmit();
  const recordPassword = (e) => {
    setPassword(e.target.value);
  };
  const recordUserName = (e) => {
    setUserName(e.target.value);
  };

  const switchPassword = () => {
    setIsPassword(!isPassword);
  };

  const submitLogin = (e) => {
    e.preventDefault();
    const formdata=new FormData(formRef.current);
    formdata.append('LoginType',LoginType.current);
    submit(formdata, {
      method: "POST",
    });
  };

  return (
    <div className=" w-full mx-auto h-full  p-4">
      <h1 className=" text-left text-[#8C746A] w-fit ml-10 text-[60px]">
        Welcome back!
      </h1>
      <Form
        method="post"
        action="/signIn"
        className=" mx-2 "
        onSubmit={submitLogin}
        ref={formRef}
      >
        <div className="bg-white ml-32 w-[556px] h-[388px] pl-24 pr-10 pt-14 pb-20 bg-opacity-75 ">
          <label className="block mt-5">
            <span className=" block text-xl font-normal text-slate-700">
              User Name
            </span>
          </label>
          <div className="flex w-fit h-fit">
            <input
              required
              type="text"
              name="username"
              className=" w-[280px]  text-black mt-6 px-3 py-2 bg-[#d9f99d] border shadow-sm   focus:outline-none focus:border-sky-500 focus:ring-sky-500 block  border-none sm:text-sm focus:ring-1"
              onChange={recordUserName}
              value={userName}
            />
            <AccountCircleOutlinedIcon
              color="disabled"
              fontSize="medium"
              className=" -translate-x-7 translate-y-7"
            />
          </div>

          <label className="block mt-6">
            <span className=" block text-xl font-normal text-slate-700">
              Password
            </span>
          </label>
          <div className="flex w-fit h-fit">
            <input
              required
              type={`${isPassword ? "password" : "text"}`}
              name="password"
              className="mt-6 px-3 py-2 text-black bg-[#d9f99d] border shadow-sm border-slate-300  focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-[280px]  sm:text-sm focus:ring-1"
              onChange={recordPassword}
              value={password}
            />
            <div className=" w-fit h-fit" onClick={switchPassword}>
              <VisibilityOutlinedIcon
                className="-translate-x-7 translate-y-8 cursor-pointer"
                color="disabled"
                fontSize="medium"
              />
            </div>
          </div>
          <span>{errors?.message}</span>
        </div>

        <button
          type="submit"
          name="submit"
          className="ml-24 w-fit px-6 mt-8 h-12  rounded-xl mx-auto text-xl text-black   bg-[#A5D63F] bg-opacity-80 translate-x-10  "
          onClick={() => (LoginType.current = 'customers')}
        >
          Login In as Customer
        </button>
        <button
          type="submit"
          name="submit"
          className="ml-4 w-fit px-6 mt-8 h-12  rounded-xl mx-auto text-xl text-black   bg-[#A5D63F] bg-opacity-80 translate-x-10  "
          onClick={() => (LoginType.current = 'eateries')}
        >
          Login In as Eatery
        </button>
      </Form>
    </div>
  );
}
