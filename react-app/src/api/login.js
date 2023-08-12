import { redirect, json } from "react-router-dom";
import server from "./index.js";
import useUserStore from "../store/User.js";


export const LoginType = () => {
  return document.cookie.length > 0 ? true : false;
};

export const LoginOut = async (type) => {
  const res = server.get(`/${type}/logout`);
  return res;
};

export const CusUserCheck = async (username) => {
  const res = server.post("/customers/check_username", username);
  return json(res);
};

export const CusPhoneCheck = async (phone) => {
  const res = server.post("/customers/check_phonenum", phone);
  return json(res);
};

export const CusEmailCheck = async (email) => {
  const res = server.post("/eateries/check_email", email);
  return json(res);
};

export const EatUserCheck = async (username) => {
  const res = server.post("/eateries/check_username", username);
  return json(res);
};

export const EatPhoneCheck = async (phone) => {
  const res = server.post("/eateries/check_phonenum", phone);
  return json(res);
};

export const EatEmailCheck = async (email) => {
  const res = server.post("/eateries/check_email", email);
  return json(res);
};

const LoginRequest = async (loginType, formData) => {
  const res = server.post(`/${loginType}/login`, formData);
  return res;
};

const RegisterRequest = async (loginType, formData) => {
  const res = server.post(`/${loginType}/register`, formData);
  return res;
};

//action

export const LoginInAction = async ({ request }) => {
  const { setType, setCustomer, setEatery } = useUserStore.getState();

  const errors = {};
  const formData = await request.formData();
  let loginType = formData.get("LoginType");
  formData.delete("LoginType");

  try {
    const res = await LoginRequest(loginType, formData);
    json(res);
    console.log(res);
    if (res.status === 200) {
      if (loginType === "customers") {
        setType("customer");
        setCustomer(res.data.data);
      } else {
        setType("eatery");
        setEatery(res.data.data);
      }
      return redirect("/eatery");
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      errors["message"] = "Username or password Error!";
      window.alert(errors["message"]);
    } else if (error.response && error.response.status === 404) {
      errors["message"] = "network error";
      window.alert(errors["message"]);
    }
  }
  return null;
};
export const SignUpAction = async ({ request }) => {
  const { setType, setCustomer, setEatery } = useUserStore.getState();
  const formData = await request.formData();
  const from = formData.get("from");
  const isOwner = formData.get("isOwner");
  const email = formData.get("email");
  const password = formData.get("password");
  const errors = {};
  formData.delete("from");
  formData.delete("isOwner");

  let loginType = isOwner === "true" ? "eateries" : "customers";

  // validate the fields
  if (typeof email !== "string" || !email.includes("@")) {
    errors.email = "That doesn't look like an email address";
  }

  if (typeof password !== "string" || password.length < 6) {
    errors.password = "Password must be > 6 characters";
  }

  // return data if we have errors
  if (Object.keys(errors).length) {
    return errors;
  }
  
  const res = await RegisterRequest(loginType, formData);
  json(res);
  if (res.status === 200) {
    if (loginType === "eateries") {
      setType("eatery");
      setEatery(res.data.data);
    } else {
      setType("customer");
      setCustomer(res.data.data);
    }

    if (from === "/") return redirect("/eatery");
    else return redirect(`${from}`);
  } else if (res.status === 401) {
    errors["message"] = "Username or password Error!";
    return errors;
  } else if (res.status === 404) {
    errors["message"] = "network error";
    return errors;
  } else return null;
};

//logout
export const LogoutAction = async (userType) => {
  const type = userType === "customer" ? "customers" : "eateries";
  const res = await LoginOut(type);
  json(res);
  return res.status;
};


//登陆验证
export const LoggedinCheck = async () => {
  const res_cus = await fetch(`http://localhost:8081/customers/loggedin`,{
    credentials: 'include', 
  });
  const res_eat = await fetch(`http://localhost:8081/eateries/loggedin`,{
    credentials: 'include', 
  });
  if (!res_cus.ok && !res_eat.ok) {
    return redirect('/signIn')
  } else {
    return null;
  }
};


