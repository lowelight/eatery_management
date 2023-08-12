import server from "./index";
import { json } from "react-router-dom";
export const fetchSelfVoucher = async (type) => {
  const res = server.get(`${type}/vouchers`);
  return res;
};
export const eateryOffer = async (formData) => {
  const res = server.post("/eateries/vouchers/offer", formData);
  return res;
};

export const bookVoucher = async (vouchers) => {
  const res = server.put("/customers/voucher/book", vouchers);
  return res
};

//action
export const eateryAddAction = async ({ request }) => {
  const formData = await request.formData();
  const messages = {};
  const res = await eateryOffer(formData);
  json(res);
  console.log(res);
  if (res.status === 200) {
    messages["ok"] = "Successfully Added";
    return messages;
  } else if (res.status === 401) {
    messages["error"] = "Username or password Error!";
    return messages;
  } else if (res.status === 404) {
    messages["error"] = "network error";
    return messages;
  } else return null;
};
