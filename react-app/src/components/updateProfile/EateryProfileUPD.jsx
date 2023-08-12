import React, { useState, useEffect } from 'react';
import useUserStore from "../../store/User.js";
import { Link, json, useNavigate } from 'react-router-dom';
import { ArrowBackIos } from "@mui/icons-material";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { TextField } from "@mui/material";
import { categories, cities, suburbs, state } from "../../constant";
import Button from '@mui/material/Button';
import axios from 'axios';

import cusProfileBG from "../../assets/customerProfile_1.png";

export default function EateryUPD(){
  {
    /*从User.js拿到当前登录用户的状态，同时拿到修改状态的方法*/
  }
  const eateryStore = useUserStore(state => state.eateryStore);
  const setEatery = useUserStore(state => state.setEatery);
  // 如果 avatar 存在，直接从后端服务器获取avatar图片
  const avatarUrl = eateryStore.avatar 
    ? `http://localhost:8081/${eateryStore.avatar}` 
    : null;
  // 如果 menu 存在，直接从后端服务器获取menu图片
  const menuUrl = eateryStore.avatar 
    ? `http://localhost:8081/${eateryStore.menu}` 
    : null;
  // 用于获取用户输入页面的值， 最后submit到后端成功后，后端返回的dict再记录入全局state
  const [username, setusername] = useState(eateryStore.name);
  const [password, setpassword] = useState(eateryStore.password)
  const [phoneNumber, setphoneNumber] = useState(eateryStore.phone_number)
  const [email, setemail] = useState(eateryStore.email)
  const [fromTime, setFromTime] = useState(eateryStore.bussiness_hours_start);
  const [toTime, setToTime] = useState(eateryStore.bussiness_hours_end);
  const [cuisine, setCuisine] = useState(eateryStore.cuisine);
  const [address, setAddress] = useState(eateryStore.address);
  const [suburb, setsuburb] = useState(eateryStore.suburb);
  const [city, setcity] = useState(eateryStore.city);
  const [states, setstate] = useState(eateryStore.state);
  const [postcode, setpostcode] = useState(eateryStore.postcode);
  const [description, setdescription] = useState(eateryStore.description);
  // 如果用户没有上传新的avatar，那么传给后端的formdata中应该不包括avatar
  // 原因是后端接收的avatar应该是个file obj，但是如果没上传新的avatar，则默认值是相对路径的str
  const [avatar, setavatar] = useState(eateryStore.avatar)
  const [isAvatarChanged, setIsAvatarChanged] = useState(false)
  // Menu
  const [menu, setmenu] = useState(eateryStore.menu)
  const [isMenuChanged, setIsMenuChanged] = useState(false)
  const [passwordConfirm, setPasswordConfirm] = useState(eateryStore.password);
  const [errorMessage, setErrorMessage] = useState('');
  // 设置三个变量，用来记录是否第一次渲染，来阻止第一次渲染时监控填入的username email phone
  const [usernameFirst, setusernameFirst] = useState(true)
  const [emailFirst, setemailFirst] = useState(true)
  const [phoneFirst, setphoneFirst] = useState(true)

  const errors = {}
  const successmsg = {}
  const navigate = useNavigate()

  {
    /*当用户在表单修改相应的值时，更新状态*/
  }
  const recordUsername = (e) => {
    setusername(e.target.value)
  }

  const recordPassword = (e) => {
    setpassword(e.target.value)
  }

  const recordPhoneNumber = (e) => {
    setphoneNumber(e.target.value)
  }

  const recordEmail = (e) => {
    setemail(e.target.value)
  }

  const recordFromtime = (e) => {
    setFromTime(e.target.value)
  }

  const recordTotime = (e) => {
    setToTime(e.target.value)
  }

  const recordcuisine = (e) => {
    setCuisine(e.target.value)
  }

  const recordAddress = (e) => {
    setAddress(e.target.value)
  }

  const recordSuburb = (e) => {
    setsuburb(e.target.value)
  }

  const recordCity = (e) => {
    setcity(e.target.value)
  }

  const recordState = (e) => {
    setstate(e.target.value)
  }

  const recordPostcode = (e) => {
    setpostcode(e.target.value)
  }

  const recordDescription = (e) => {
    setdescription(e.target.value)
  }

  const handleAvatar = (e)=>{
    setavatar(e.target.files[0]);
    setIsAvatarChanged(true)
  }

  const handleMenu = (e)=>{
    setmenu(e.target.files[0]);
    setIsMenuChanged(true)
  }


  {
    /*记录输入的confirm password*/
  }
  const recorConfirmPwd = (e) => {
    setPasswordConfirm(e.target.value)
    setErrorMessage('')  // 清除之前的错误信息
  };

  {
    /*Check if username email phone_nuber already in use*/
  }
  const [validationMessages, setValidationMessages] = useState({
    username: false, // false 代表username没有被占用可以使用，否则不能使用
    email: false,
    phone_number: false
  });

  useEffect(() => {
    if (username && !usernameFirst) {
      axios
        .post("http://localhost:8081/eateries/check_username", {
          username: username
        })
        .then(response => {
            if (response.data.msg === '0') {
              setValidationMessages({...validationMessages, username: false});
            } else if (response.data.msg === '1') {
              setValidationMessages({...validationMessages, username: true});
            }
            
        });
    } else {
      setusernameFirst(false)
    }
  }, [username]);

  useEffect(() => {
    if (email && !emailFirst) {
      axios
        .post("http://localhost:8081/eateries/check_email", {
          email: email
        })
        .then(response => {
          if (response.data.msg === '0') {
            setValidationMessages({...validationMessages, email: false});
          } else if (response.data.msg === '1') {
            setValidationMessages({...validationMessages, email: true});
          }
        });
    } else {
      setemailFirst(false)
    }
  }, [email]);

  useEffect(() => {
    if (phoneNumber && !phoneFirst) {
      axios
        .post("http://localhost:8081/eateries/check_phonenum", {
          phone_number: phoneNumber
        })
        .then(response => {
          if (response.data.msg === '0') {
            setValidationMessages({...validationMessages, phone_number: false});
          } else if (response.data.msg === '1') {
            setValidationMessages({...validationMessages, phone_number: true});
          }
        });
    } else {
      setphoneFirst(false)
    }
  }, [phoneNumber]);

  {
    /*提交表单*/
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      setErrorMessage('两次输入的密码不一致');
    } else {
      const formData = new FormData();
      formData.append('username', username)
      formData.append('password', password)
      formData.append('phone_number', phoneNumber)
      formData.append('email', email)
      formData.append('bussiness_hours_start', fromTime)
      formData.append('bussiness_hours_end', toTime)
      formData.append('cuisine', cuisine)
      formData.append('address', address)
      formData.append('suburb', suburb)
      formData.append('city', city)
      formData.append('state', states)

      formData.append('postcode', postcode)
      formData.append('description', description)

      {
        /*如果更新了avatar，就添加avatar到formdata*/
      }
      if (isAvatarChanged) {
        formData.append('avatar', avatar)
      }
      {
        /*如果更新了menu，就添加menu到formdata*/
      }
      if (isMenuChanged) {
        formData.append('menu', menu)
      }
      
      
      const response = await axios.put("http://localhost:8081/eateries/update", formData);
    
      if (response.status === 200) {
        // 处理成功响应
        // 更新成功，跳转回用户profile页面
        successmsg["message"] = "update success";
        // 将后端返回的更新后的customer信息记录进全局state
        setEatery(response.data.data);
        navigate('/eateryProfile')
      } else if (response.status === 404){
        // 处理错误响应
        // 可以根据需要进行错误处理，比如显示错误消息等
        errors["message"] = "network error";
        return errors;
      } else if (response.status === 401) {
        errors["message"] = "Password can not be empty!";
        return errors;
      } else if (response.status === 400) {
        errors["message"] = 'Invalid time format. Please use %H-%M.'
        return errors
      } else return null;
    }
    
  }

  return (
    <div className=" overflow-auto w-screen h-screen bg-white bg-blend-normal bg-[url('assets/Eatery_UPD.png')] bg-contain bg-right-top bg-no-repeat">
      <div className="fixed top-0 w-full h-[50px]  py-2 flex">
        <Link to={-1}>
          <ArrowBackIos className="text-black font-thin ml-2 w-fit mt-1" />
        </Link>

        <h1 className=" ml-auto text-center w-30 mx-auto text-black text-xl ">
          Edit profile
        </h1>
      </div>
      <div className="fixed left-32 top-16">
        <Stack direction="row" spacing={2}>
            <Avatar
              alt={eateryStore.name}
              src={avatarUrl}
              sx={{ width: 100, height: 100 }}
            />
        </Stack>
      </div>

      {/*给子元素容器添加一个滚动条 */}
      <div className=" overflow-y-auto bg-opacity-60 bg-[#fff7ed] w-2/3 mx-auto shadow-2xl mt-10 z-10">
        <form onSubmit={handleSubmit} className="grid grid-cols-2 items-center justify-items-center mt-10 pb-14 z-20">
            
            {/*1. username */}
            <div>
                <label className="block mt-3">
                    <span className=" after:content-['*'] after:ml-0.5 after:text-red-500 block text-md font-medium text-slate-700">
                    User Name
                    </span>
                </label>
                <input
                    type="text"
                    name="username"
                    className=" w-64 text-black mt-3 px-3 py-2 bg-[#E5E5E5] border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block  rounded-md sm:text-sm focus:ring-1"
                    value={username}
                    defaultValue={eateryStore.name}
                    onChange={recordUsername}
                />
                {!validationMessages.username ? (
                ""
                ) : (
                <h1 className="text-red-600 text-base ml-4">
                    username in use
                </h1>
                )}
            </div>

            {/*2. bussiness hours */}
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
                    onChange={recordFromtime}
                    />
                    <TextField
                    id="time_end"
                    name="bussiness_hours_end"
                    label="To"
                    type="time"
                    value={toTime}
                    onChange={recordTotime}
                    />
                </div>
            </div>

            {/*3. Cuisine */}
            <div>
                <label className="block mt-3">
                    <span className=" after:content-['*'] after:ml-0.5 after:text-red-500 block text-md font-medium text-slate-700">
                    cuisine
                    </span>
                </label>
                <select
                  required
                  name="cuisine"
                  className="mt-1 px-3 py-2 text-black bg-[#E5E5E5]  border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-64 rounded-md sm:text-sm focus:ring-1"
                  value={cuisine}
                  //defaultValue={eateryStore.cuisine}
                  onChange={recordcuisine}
                >
                  {categories.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
            </div>
            
            {/*4. Address */}
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
                    defaultValue={eateryStore.address}
                    onChange={recordAddress}
                />
            </div>

            {/*7. State */}
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

            {/*6. City */}
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

            {/*5. Suburb */}
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
            </div>

            

            

            {/*8. Postcode */}
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
                    defaultValue={eateryStore.postcode}
                    onChange={recordPostcode}
                />
            </div>

            {/*9. Email */}
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
                    defaultValue={eateryStore.email}
                    onChange={recordEmail}
                />
                {!validationMessages.email ? (
                ""
                ) : (
                <h1 className="text-red-600 text-base ml-4">
                    Email in use
                </h1>
                )}
            </div>

            {/*9. Password */}
            <div>
                <label className="block mt-3">
                <span className="block text-md font-medium text-slate-700">
                    Password
                </span>
                </label>
                <input
                type="password"
                name="password"
                className="w-64 text-black mt-3 px-3 py-2 bg-[#E5E5E5] border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block  rounded-md sm:text-sm focus:ring-1"
                value={password}
                defaultValue={eateryStore.password}
                onChange={recordPassword}
                />
            </div>
            {/*10. confirm password */}
            <div>
                <label className="block mt-3">
                    <span className=" block text-md font-medium text-slate-700">
                        Confirm Password
                    </span>
                </label>
                <input
                    required
                    type="password"
                    name="confirm"
                    className="w-64 text-black mt-3 px-3 py-2 bg-[#E5E5E5] border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block  rounded-md sm:text-sm focus:ring-1"
                    value={passwordConfirm}
                    defaultValue={eateryStore.password}
                    onChange={recorConfirmPwd}
                />
                {errorMessage && <span className="text-red-500">Password doesn't match</span>}
            </div>

            {/*11. Phone number */}
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
                    defaultValue={eateryStore.phone_number}
                    value={phoneNumber}
                    onChange={recordPhoneNumber}
                />
                {!validationMessages.phone_number ? (
                ""
                ) : (
                <h1 className="text-red-600 text-base ml-4">
                    Phone number in use
                </h1>
                )}
            </div>

            {/*12. Change avatar */}
            <div>
                <label className="block mt-3">
                    <span className="block text-md font-medium text-slate-700">
                        Change avatar
                    </span>
                </label>
                <input
                type="file"
                name="avatar"
                className=" w-64 text-black mt-3 px-3 py-2 bg-[#E5E5E5] border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block  rounded-md sm:text-sm focus:ring-1"
                onChange={handleAvatar}
                />
            </div>

            {/*13. Change menu */}
            <div>
                <label className="block mt-3">
                    <span className="block text-md font-medium text-slate-700">
                        Change menu
                    </span>
                </label>
                <input
                type="file"
                name="menu"
                className=" w-64 text-black mt-3 px-3 py-2 bg-[#E5E5E5] border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block  rounded-md sm:text-sm focus:ring-1"
                onChange={handleMenu}
                />
            </div>

            {/*14. Description */}
            <div>
                <label className="block mt-3">
                    <span className=" block text-md font-medium text-slate-700">
                    Add description
                    </span>
                </label>
                <input
                    type="text"
                    name="description"
                    className=" w-64 text-black mt-3 px-3 py-2 bg-[#E5E5E5] border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block  rounded-md sm:text-sm focus:ring-1"
                    value={description}
                    defaultValue={eateryStore.description}
                    onChange={recordDescription}
                />
            </div>


            {/*15.  */}
            <div></div>

            {/*16.  */}
            <div></div>

            {/*17. Submit */}
            <button
                type="submit"
                name="submit"
                className="w-64 mt-8 col-span-2  rounded-xl mx-auto text-2xl text-white   bg-[#00BAAD]/50 border float-right  "
                >
                Submit
            </button>
        </form>
      </div>
    </div>
  );
};


