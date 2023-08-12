import React, { useEffect } from "react";
import { LoginInAction, LoginOut, LogoutAction } from "../../api/login";
import {
  Link,
  useLoaderData,
  useLocation,
  useNavigate,
} from "react-router-dom";
import LogButton from "../../components/LogButton";
import PersonIcon from "@material-ui/icons/Person";
import useUserStore, { initialCus, initialEat } from "../../store/User";
import { useQuery } from "@tanstack/react-query";
import SearchPage from "../../components/Eatery/SearchPage";
export default function EateryMain() {
  const [userType, setType, setCustomer, setEatery, setAllEateries] =
    useUserStore((state) => [
      state.userType,
      state.setType,
      state.setCustomer,
      state.setEatery,
      state.setAllEateries,
    ]);


  const location = useLocation();

  //wait for api
  const data = useLoaderData();
  useEffect(() => {
    if (Array.isArray(data)) {
      setAllEateries(data);
    } else {
      window.alert(`Get eateries error!
      error message:${data}
      `);
    }
  }, [data, setAllEateries]);

  {
    /*如果logout，初始化用户状态，并且跳转回home页面 */
  }
  const navigate = useNavigate();

  const LoginOutFunc = async () => {
    const res = await LogoutAction(userType);
    if (res === 200) {
      setType("none");
      setCustomer(initialCus);
      setEatery(initialEat);

      navigate("/");
    }
  };

  {
    /*Yue添加 */
  }
  const toPath =
    userType === "customer" ? "/customerProfile" : "/eateryProfile";

  return (
    <div className=" w-screen h-screen bg-[#f1f1b8] overflow-hidden ">
      <div className="flex ">
        <h1 className=" w-fit text-[#F53A2E] text-[68px] font-bold italic">
          Eathub
        </h1>
        <div className=" text-lg px-10 grid grid-flow-col gap-6 text-black ml-auto mt-1 ">
          <div className="flex">
            <PersonIcon className="mt-1.5" />
            <Link
              className="mt-0.5 p-1"
              to={toPath}
              state={{ from: location.pathname }}
            >
              Profile
            </Link>
          </div>
          <LogButton location={location} />
        </div>
      </div>
      <SearchPage />
    </div>
  );
}

