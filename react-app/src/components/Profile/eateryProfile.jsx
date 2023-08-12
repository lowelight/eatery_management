import React from 'react';
import useUserStore from "../../store/User";
import { Link, useNavigate } from 'react-router-dom';
import { ArrowBackIos } from "@mui/icons-material";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

import cusProfileBG from "../../assets/customerProfile_1.png";




export default function EateryProfile(){
    {/*从User.js拿到当前登录用户的状态，同时拿到修改状态的方法*/}
  const eateryStore = useUserStore(state => state.eateryStore);
  // 如果 avatar 存在，构建完整的图片 URL
  const avatarUrl = eateryStore.avatar ? `http://localhost:8081/${eateryStore.avatar}` : null;
  // 如果 menu 存在，构建完整的图片 URL
  const menuUrl = eateryStore.menu ? `http://localhost:8081/${eateryStore.menu}` : null;

  const navigate = useNavigate()
  const navigateToProfileUPD = () => {
    navigate('/eateryUpdate')
  }
  

    
  return (
    <div className=" relative w-full h-screen bg-white bg-blend-normal bg-[url('assets/customerProfile_1.png')] bg-contain bg-right-top bg-no-repeat">
        <div className=" w-full h-[50px]  py-2 flex">
            <Link to={-1}>
            <ArrowBackIos className="text-black font-thin ml-2 w-fit mt-1" />
            </Link>

            <h1 className=" ml-auto text-center w-30 mx-auto text-black text-xl ">
            Eatery Profile
            </h1>
        </div>
        {/*user profile 信息展示部分*/}
            {/*头像*/}
        <div className="relative top-1 grid place-items-center">
            <Stack direction="row" spacing={2}>
                <Avatar
                alt={eateryStore.name}
                src={avatarUrl}
                sx={{ width: 100, height: 100 }}
                />
            </Stack>
        </div>
        {/*编辑用户资料图标*/}
        <div className="absolute top-0 right-0 p-4">
            <div className="grid place-items-center text-black">
                <ManageAccountsIcon fontSize='large' onClick={navigateToProfileUPD}/>
            </div>
        </div>

        {/*资料*/}
        
        <div className="ml-20 w-[556px] h-[388px] pl-30 pr-10 pt-40 pb-10 ">
            <div className="grid place-items-center text-black text-[25px]">
                <div id="customerStore-info">
                    <p>Name: {eateryStore.name}</p>
                    <p>Adress: {eateryStore.address}</p>
                    <p>Suburb: {eateryStore.suburb}</p>
                    <p>City: {eateryStore.city}</p>
                    <p>State: {eateryStore.state}</p>
                    <p>Postcode: {eateryStore.postcode}</p>
                    <p>Cuisine: {eateryStore.cuisine}</p>
                    <p>Phone Number: {eateryStore.phone_number}</p>
                    <p>Email: {eateryStore.email}</p>
                    <p>Bussiness_hours_start: {eateryStore.bussiness_hours_start}</p>
                    <p>Bussiness_hours_end: {eateryStore.bussiness_hours_start}</p>
                    <p>Description: {eateryStore.description}</p>
                </div>
            </div>
        </div>
        {/*插画menu*/}
        <img
        className="absolute bottom-0 right-0 mb-4 mr-4 z-0 w-20 h-16"
        src={menuUrl}
        alt="cusProfileBG"
        />
        
        {/*插画图片
        <img
        className="absolute bottom-0 right-0 mb-4 mr-4 z-0"
        src={cusProfileBG}
        alt="cusProfileBG"
        />*/}
        
    </div>

  )
}