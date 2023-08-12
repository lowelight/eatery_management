import React, { useEffect } from "react";
import useUserStore from "../../store/User";
import CustomerVoucher from "../../components/myVoucher/Cus/CustomerVoucher";
import EateryVoucher from "../../components/myVoucher/Eat/EateryVoucher";
import useVoucherStore from "../../store/Voucher";
import { ArrowBackIos } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import setting from "../../assets/settings.png";
import { initialCus, initialEat } from "../../store/User";
import { LogoutAction } from "../../api/login";
export default function MyVoucher() {
  const [userType, setType, setCustomer, setEatery] = useUserStore((state) => [
    state.userType,
    state.setType,
    state.setCustomer,
    state.setEatery,
  ]);
  const [updateType] = useVoucherStore((state) => [state.updateType]);
  const navigate = useNavigate();
  useEffect(() => {
    updateType();
  }, []);
  const LoginOutFunc = async () => {
    const res = await LogoutAction(userType);
    if (res === 200) {
      setType("none");
      setCustomer(initialCus);
      setEatery(initialEat);
      navigate("/");
    }
  };
  return (
    <div className="bg-[#91bbae] h-screen w-screen overflow-hidden flex flex-col">
      <div className="w-full h-fit mt-2 flex">
        <Link to={-1}>
          <ArrowBackIos className="text-black ml-2 w-fit mt-1" />
        </Link>

        <Link to={userType === "customer" ? "/customerProfile" : "/eateryProfile"} className="ml-auto">
          <img src={setting} alt="setting" className=" w-10 h-10" />
        </Link>
        <button
          className="ml-2 mr-3 text-black text-base  font-medium"
          onClick={LoginOutFunc}
        >
          Log out
        </button>
      </div>
      {userType === "customer" ? <CustomerVoucher /> : <EateryVoucher />}
    </div>
  );
}
