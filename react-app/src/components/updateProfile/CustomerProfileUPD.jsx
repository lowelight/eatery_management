import React, { useState, useEffect } from 'react';
import useUserStore from "../../store/User.js";
import { Link, json, useNavigate } from 'react-router-dom';
import { ArrowBackIos } from "@mui/icons-material";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import axios from 'axios';


import cusProfileBG from "../../assets/customerProfile_1.png";


export default function CustomerUPD(){

  {/*从User.js拿到当前登录用户的状态，同时拿到修改状态的方法*/}
  const customerStore = useUserStore(state => state.customerStore);
  const setCustomer = useUserStore(state => state.setCustomer);
  // 如果 customer.avatar 存在，直接从后端服务器获取avatar图片
  const avatarUrl = customerStore.avatar ? `http://localhost:8081/${customerStore.avatar}` : null;
  // 用于获取用户输入页面的值， 最后submit到后端成功后，后端返回的dict再记录入全局state
  const [username, setusername] = useState(customerStore.name);
  const [password, setpassword] = useState(customerStore.password)
  const [gender, setgender] = useState(customerStore.gender)
  const [birthday, setbirthday] = useState(customerStore.birthday)
  const [phoneNumber, setphoneNumber] = useState(customerStore.phone_number)
  const [email, setemail] = useState(customerStore.email)
  // 如果用户没有上传新的avatar，那么传给后端的formdata中应该不包括avatar
  // 原因是后端接收的avatar应该是个file obj，但是如果没上传新的avatar，则默认值是相对路径的str
  const [avatar, setavatar] = useState(customerStore.avatar)
  const [isAvatarChanged, setIsAvatarChanged] = useState(false)
  const [passwordConfirm, setPasswordConfirm] = useState(customerStore.password);
  const [errorMessage, setErrorMessage] = useState('');
  // 设置三个变量，用来记录是否第一次渲染，来阻止第一次渲染时监控填入的username email phone
  const [usernameFirst, setusernameFirst] = useState(true)
  const [emailFirst, setemailFirst] = useState(true)
  const [phoneFirst, setphoneFirst] = useState(true)

  const errors = {}
  const successmsg = {}
  const navigate = useNavigate()

  {/*把初始的birthday变成能够在日期选择器展示的格式,只在渲染时执行一次*/}
  useEffect(() => {
    const initialDate = new Date(birthday);
    const formattedDate = initialDate.toISOString().split('T')[0];
    setbirthday(formattedDate);
  }, []);

  {/*当用户在表单修改相应的值时，更新状态*/}
  const recordUsername = (e) => {
    setusername(e.target.value)
  }

  const recordPassword = (e) => {
    setpassword(e.target.value)
  }

  const recordGender = (e) => {
    setgender(e.target.value)
  }

  const recordBirthday = (e) => {
    setbirthday(e.target.value)
  }

  const recordPhoneNumber = (e) => {
    setphoneNumber(e.target.value)
  }

  const recordEmail = (e) => {
    setemail(e.target.value)
  }

  const handleImage = (e)=>{
    setavatar(e.target.files[0]);
    setIsAvatarChanged(true)
  }

  {/*记录输入的confirm password*/}
  const recorConfirmPwd = (e) => {
    setPasswordConfirm(e.target.value)
    setErrorMessage('')  // 清除之前的错误信息
  };

  {/*Check if username email phone_nuber already in use*/}
  const [validationMessages, setValidationMessages] = useState({
    username: false, // false 代表username没有被占用可以使用，否则不能使用
    email: false,
    phone_number: false
  });

  useEffect(() => {
    if (username && !usernameFirst) {
      axios.post("http://localhost:8081/customers/check_username", {username: username})
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
      axios.post("http://localhost:8081/customers/check_email", {email: email})
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
      axios.post("http://localhost:8081/customers/check_phonenum", {phone_number: phoneNumber})
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

  {/*提交表单*/}
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      setErrorMessage('两次输入的密码不一致');
    } else {
      const formData = new FormData();
      formData.append('username', username)
      formData.append('password', password)
      formData.append('gender', gender)
      formData.append('birthday', birthday)
      formData.append('phone_number', phoneNumber)
      formData.append('email', email)
      {/*如果更新了avatar，就添加avatar到formdata*/}
      if (isAvatarChanged) {
        formData.append('avatar', avatar)
      }
      
      
      const response = await axios.put("http://localhost:8081/customers/update", formData);
    
      if (response.status === 200) {
        // 处理成功响应
        // 更新成功，跳转回用户profile页面
        successmsg["message"] = "update success";
        // 将后端返回的更新后的customer信息记录进全局state
        setCustomer(response.data.data);
        navigate('/customerProfile')
      } else if (response.status === 404){
        // 处理错误响应
        // 可以根据需要进行错误处理，比如显示错误消息等
        errors["message"] = "network error";
        return errors;
      } else if (response.status === 401) {
        errors["message"] = "Password can not be empty!";
        return errors;
      } else if (response.status === 400) {
        errors["message"] = 'Invalid birthday format. Please use %Y-%m-%d.'
        return errors
      } else return null;
    }
    
  }

  return (
    <div className=" overflow-auto w-screen h-screen bg-white bg-blend-normal bg-[url('assets/Customer_UPD.png')] bg-contain bg-right-top bg-no-repeat">
      <div className=" w-full h-[50px]  py-2 flex">
        <Link to={-1}>
          <ArrowBackIos className="text-black font-thin ml-2 w-fit mt-1" />
        </Link>

        <h1 className=" ml-auto text-center w-30 mx-auto text-black text-xl ">
          Edit profile
        </h1>
      </div>
      <div className="relative top-1 grid place-items-center">
        <Stack direction="row" spacing={2}>
            <Avatar
              alt={customerStore.name}
              src={avatarUrl}
              sx={{ width: 100, height: 100 }}
            />
        </Stack>
      </div>

      <div className="overflow-y-auto bg-opacity-60 bg-[#fff7ed] w-2/3 mx-auto shadow-2xl mt-10 z-10">
        <form onSubmit={handleSubmit} className="grid grid-cols-2 items-center justify-items-center mt-10 pb-14 z-20">

          {/*1. username */}
          <div>
            <label className="block mt-3">
              <span className="block text-md font-medium text-slate-700">
                Username
              </span>
            </label>
            <input
              type="text"
              name="username"
              className=" w-64 text-black mt-3 px-3 py-2 bg-[#E5E5E5] border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block  rounded-md sm:text-sm focus:ring-1"
              value={username}
              defaultValue={customerStore.name}
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

          {/* 10. email */}
          <div>
            <label className="block mt-3">
              <span className="block text-md font-medium text-slate-700">
                Email Address
              </span>
            </label>
            <input
              required
              type="email"
              name="email"
              className="w-64 text-black mt-3 px-3 py-2 bg-[#E5E5E5] border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block  rounded-md sm:text-sm focus:ring-1"
              defaultValue={customerStore.email}
              value={email}
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

          {/*3. password */}
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
              defaultValue={customerStore.password}
              onChange={recordPassword}
            />
          </div>
          {/*4. confirm password */}
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
              defaultValue={customerStore.password}
              onChange={recorConfirmPwd}
            />
            {errorMessage && <span className="text-red-500">Password doesn't match</span>}
          </div>

          {/*5. 性别 */}
          <div>
            <label className="block mt-3">
              <span className=" block text-md font-medium text-slate-700 ">
                Gender
              </span>
            </label>
            <div className="flex flex-col">
                <select
                  className=" w-64 text-black mt-3 px-3 py-2 bg-[#E5E5E5] border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block  rounded-md sm:text-sm focus:ring-1"
                  name="gender"
                  value={gender}
                  defaultValue={customerStore.gender}
                  onChange={recordGender}
                >
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                </select>
            </div>
          </div>

          {/*7. birthday */}
          <div>
            <label className="block mt-5">
                <span className=" block text-md font-medium text-slate-700">
                  Birthday
                </span>
            </label>
            <div className="flex flex-col">
                <input
                  type="date"
                  name="birthday"
                  value={birthday}
                  onChange={recordBirthday}
                  className=" w-64 text-black mt-3 px-3 py-2 bg-[#E5E5E5] border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block  rounded-md sm:text-sm focus:ring-1"
                />
            </div>
          </div>

          {/*9. contact */}
          <div>
            <label className="block mt-3">
              <span className=" block text-md font-medium text-slate-700">
                Phone number
              </span>
            </label>
            <input
              type="text"
              name="phone_number"
              className="w-64 text-black mt-3 px-3 py-2 bg-[#E5E5E5] border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block  rounded-md sm:text-sm focus:ring-1"
              defaultValue={customerStore.phone_number}
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

          {/*11. 头像 */}
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
              onChange={handleImage}
            />
          </div>

          {/*8. empty */}
          <div></div>
          
          {/*12. 提交按钮 */}
          <div className="mt-8 col-span-2  rounded-xl mx-auto text-2xl text-white   bg-[#00BAAD]/50 border float-right  ">
            <Stack direction="row" spacing={2}>
              <Button variant="contained" color="success" type="submit" name="submit">
                Submit
              </Button>
            </Stack>
          </div>
        </form>
      </div>
      {/*插画图片
      <img
        className="absolute bottom-10 right-0 mb-4 mr-4 z-0"
        src={cusProfileBG}
        alt="cusProfileBG"
        />*/}
      
    </div>
  );
};


