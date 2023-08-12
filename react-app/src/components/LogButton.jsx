import React from "react";
import useUserStore, { initialCus, initialEat } from "../store/User";
import { Link, useNavigate } from "react-router-dom";
import HighlightOffRoundedIcon from "@material-ui/icons/HighlightOffRounded";
import { LogoutAction } from "../api/login";

const LogButton = ({ location }) => {
  const [userType, setType, setCustomer, setEatery] = useUserStore((state) => [
    state.userType,
    state.setType,
    state.setCustomer,
    state.setEatery,
  ]);
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
  return (
    <>
      {userType === "none" ? (
        <Link
          className="mt-0.5 bg-green-300 rounded-2xl px-4 py-2 text-white w-fit h-fit  ml-auto cursor-pointer mr-4"
          to="/signIn"
          state={{ from: location?.pathname }}
        >
          Login in
        </Link>
      ) : (
        <div className="flex w-fit ml-auto">
          <HighlightOffRoundedIcon className="mt-1.5" />
          <button
            className=" h-fit mt-0.5 p-1 mr-4 w-fit"
            onClick={LoginOutFunc}
          >
            Logout
          </button>
        </div>
      )}
    </>
  );
};

export default LogButton;
