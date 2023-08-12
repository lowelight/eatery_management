import { createBrowserRouter } from "react-router-dom";
import Home from "../Views/home/Home";
import { LoginType, LoginInAction, SignUpAction, LoggedinCheck } from "../api/login";
import { eateryAddAction } from "../api/voucher";
import SignIn from "../Views/login/SignIn";
import SignUp from "../Views/login/SignUp";
import EateryMain from "../Views/Eatery/EateryMain";
import MyVoucher from "../Views/Voucher/MyVoucher";
import { getEateriesLoader } from "../api/eatery";
import EateryItem from "../Views/Eater/EateryItem";

import CustomerProfile from "../components/Profile/CustomerProfile";
import EateryProfile from "../components/Profile/eateryProfile";
import CustomerUPD from "../components/updateProfile/CustomerProfileUPD";
import EateryUPD from "../components/updateProfile/EateryProfileUPD";
import CustomerHistory from "../components/CusHistory/CustomerHistory";
import RatingAndReview from "../components/CusHistory/RatingAndReview";
import EatReviewShow from "../components/ReviewEatPage/EateryReview";

import RedeemVoucher from "../components/myVoucher/Eat/EateryRedeem";
import EateryAddVoucher from "../components/myVoucher/Eat/EateryAddVoucher";
import EateryDeleteVoucher from "../components/myVoucher/Eat/EateryDeleteVoucher";

import ShowLeaderboard from "../components/Leaderboard/Leaderboard";
import AboutUS from "../components/aboutus/about";
import Contact from "../Views/Contact/index"



const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "signIn",
    element: <SignIn />,
    action: LoginInAction,
  },
  {
    path: "signUp",
    element: <SignUp />,
    action: SignUpAction,
  },
  {
    path: "customerProfile",
    element: <CustomerProfile />,
    loader: LoggedinCheck
  },
  {
    path: "eateryProfile",
    element: <EateryProfile />,
    loader: LoggedinCheck
  },
  {
    path: "about",
    element: <AboutUS />,
  },
  {
    path: "contact",
    element: <Contact />,
  },
  {
    path: "eatery",
    element: <EateryMain />,
    loader: getEateriesLoader,
  },
  {
    path: "myVoucher",
    element: <MyVoucher />,
    action: eateryAddAction,
    loader: LoggedinCheck
  },
  {
    path: "leaderboard",
    element: <ShowLeaderboard />,
  },
  {
    path: "eateries/:eat_id",
    element: <EateryItem />,
    loader: LoggedinCheck
  },
  {
    path: "eateryRedeem",
    element: <RedeemVoucher />,
    loader: LoggedinCheck
  },
  {
    path: "eateryAddVoucher",
    element: <EateryAddVoucher />,
    loader: LoggedinCheck
  },
  {
    path: "eateryDeleteVoucher",
    element: <EateryDeleteVoucher />,
    loader: LoggedinCheck
  },
  {
    path: "customerUpdate",
    element: <CustomerUPD />,
    loader: LoggedinCheck
  },

  {
    path: "eateryUpdate",
    element: <EateryUPD />,
    loader: LoggedinCheck
  },
  {
    path: "history",
    element: <CustomerHistory />,
    loader: LoggedinCheck
  },
  {
    path: "AddRating/:historyId",
    element: <RatingAndReview />,
    loader: LoggedinCheck
  },
  {
    path: "showEateryReview/:eateryId",
    element: <EatReviewShow />,
    loader: LoggedinCheck
  },
]);

export default router;
