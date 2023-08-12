import React from 'react';
import useUserStore from "../../store/User";
import { Link, useNavigate } from 'react-router-dom';
import { ArrowBackIos } from "@mui/icons-material";

import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

import cusProfileBG from "../../assets/customerProfile_1.png";




export default function CustomerProfile(){
    {/*从User.js拿到当前登录用户的状态，同时拿到修改状态的方法*/}
  const customerStore = useUserStore(state => state.customerStore);
  // 如果 customer.avatar 存在，构建完整的图片 URL
  const avatarUrl = customerStore.avatar ? `http://localhost:8081/${customerStore.avatar}` : null;

  const navigate = useNavigate()
  const navigateToProfileUPD = () => {
    navigate('/customerUpdate')
  }
  const GoToHistory = ()=>{
    navigate('/history')
  }

  // 将获取的birthday日期格式去掉GMT时间
  const date = new Date(customerStore.birthday);
  const formattedDate = date.toLocaleDateString();

    
  return (
    <div className=" relative w-full h-screen bg-white">
        <div className=" w-full h-[50px]  py-2 flex">
            <Link to={-1}>
                <ArrowBackIos className="text-black font-thin ml-2 w-fit mt-1" />
            </Link>

            <h1 className=" ml-auto text-center w-30 mx-auto text-black text-xl ">
            Customer Profile
            </h1>
            <button className='text-black mr-20' onClick={GoToHistory}>
                History
            </button>
            <div className="grid place-items-center text-black">
                <ManageAccountsIcon fontSize='large' onClick={navigateToProfileUPD}/>
            </div>
        </div>
        {/*user profile 信息展示部分*/}
        
        {/*资料*/}
        <div className="absolute left-1/2 right-1/2 transform -translate-x-1/2 bg-[#fdf2f8] w-2/3 shadow-2xl mt-6 z-10">
            {/*头像*/}
            <div className="relative top-5 grid place-items-center">
                <Stack direction="row" spacing={2}>
                    <Avatar
                    alt={customerStore.name}
                    src={avatarUrl}
                    sx={{ width: 100, height: 100 }}
                    />
                </Stack>
            </div>
            <div className="ml-20 w-[556px] h-auto pl-16 pr-10 pt-32 pb-10 ">
                <div className="grid place-items-center text-black text-[25px]">
                    <div id="customerStore-info">
                        <p>Name: {customerStore.name}</p>
                        <p>Gender: {customerStore.gender}</p>
                        <p>Birthday: {formattedDate}</p>
                        <p>Phone Number: {customerStore.phone_number}</p>
                        <p>Email: {customerStore.email}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}