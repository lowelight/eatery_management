import React, { useEffect, useState } from "react";
import useVoucherStore from "../../../store/Voucher";
import useUserStore from "../../../store/User";
import voucher from "../../../assets/voucher.jpg";
import SingleVoucher from "./SingleVoucherCusSelf";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function CustomerVoucher() {

  const [setSelfVoucher] = useVoucherStore((state) => [state.setSelfVoucher]);
  const [customerStore] = useUserStore((state) => [state.customerStore]);
  const avatarUrl = customerStore.avatar ? `http://localhost:8081/${customerStore.avatar}` : null;
  const [vouchers, setVoucher] = useState([]);
  
  useEffect(() => {
    const requestOptions = {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    };
    fetch("http://localhost:8081/customers/vouchers", requestOptions)
      .then((response) => response.json())
      .then((data) => {
      if (data.msg === 'No vouchers.') {
        return null
      } else {
        setVoucher(data.data);
        setSelfVoucher(data.data);
      }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);


  // const { isLoading, isError, data, error } = useQuery({
  //   queryKey: ["selfVoucher"],
  //   queryFn: fetchSelfVoucher.bind(null, "customers"),
  // });
  // useEffect(() => {
  //   setSelfVoucher(data);
  // }, [data, setSelfVoucher]);
  // if (isLoading) {
  //   return <span>Loading...</span>;
  // }

  // if (isError) {
  //   return <span>Error: {error.message}</span>;
  // }
  return (
    <div key="cusVoucher" className="flex flex-col flex-1 overflow-auto">
      <div className="flex w-screen h-fit basis-auto">
        <Stack direction="row" spacing={2} className="ml-12 rounded-[50%] bg-cover h-28 w-28">
            <Avatar
            alt={customerStore.name}
            src={avatarUrl}
            sx={{ width: 100, height: 100 }}
            />
        </Stack>
        <div className=" rounded-full bg-black w-16 h-16 ml-1 text-center  text-[34px] translate-y-4">
          <h1 className="h-[40px] m-auto w-fit p-0 translate-y-1.5">
            {customerStore.name[0].toUpperCase()}
          </h1>
        </div>
        <h1 className="ml-2 h-fit text-black text-[40px] font-medium translate-y-4 ">
          {customerStore.name}
        </h1>
        <h1 className="absolute w-fit h-fit left-[50%] -translate-x-[50%] text-black text-[32px] translate-y-[150%]">
          My Vouchers
        </h1>
      </div>
      <div className=" mx-4 mt-3 rounded-3xl flex-1   bg-[#c5dad4] flex overflow-auto">
        {
          //data
        }
        <div>
          {vouchers.map((item, index) => (
            <SingleVoucher 
              key={index}
              data={item} 
            />
          ))}
        </div>
        <img
          src={voucher}
          alt="voucher"
          className=" bg-cover w-[400px] h-[400px] m-auto"
        />
      </div>
    </div>
  );
}
