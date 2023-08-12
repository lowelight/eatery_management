import { create } from "zustand";
import { persist } from "zustand/middleware";

export const UserType = {
  customer: "customer",
  eatery: "eatery",
  none: "none",
};
export const initialCus = {
  id: 0,
  name: "",
  password: "",
  gender: "male",
  birthday: "",
  phone_number: "",
  email: "",
  avatar: "",
};
export const initialEat = {
  id: 0,
  name: "",
  password: "",
  address: "",
  suburb: "",
  city: "",
  state: "",
  postcode: "",
  cuisine: "",
  phone_number: "",
  email: "",
  bussiness_hours_start: "",
  bussiness_hours_end: "",
  avatar: "",
  menu: "",
  description: "",
  average_rating: "",
};

let UserStore = (set) => ({
  userType: "none",
  customerStore: {
    id: 0,
    name: "",
    password: "",
    gender: "male",
    birthday: "",
    phone_number: "",
    email: "",
    avatar: "",
  },
  eateryStore: {
    id: 0,
    name: "",
    password: "",
    address: "",
    suburb: "",
    city: "",
    state: "",
    postcode: "",
    cuisine: "",
    phone_number: "",
    email: "",
    bussiness_hours_start: "",
    bussiness_hours_end: "",
    avatar: "",
    menu: "",
    description: "",
    average_rating: "",
  },
  allEateries: [],
  setType: (value) => set(() => ({ userType: value })),
  setCustomer: (value) =>
    set(() => ({
      customerStore: {
        id: value.id,
        name: value.name,
        password: value.password,
        gender: value.gender,
        birthday: value.birthday,
        phone_number: value.phone_number,
        email: value.email,
        avatar: value.avatar,
      },
    })),
  setEatery: (value) =>
    set(() => ({
      eateryStore: {
        id: value.id,
        name: value.name,
        password: value.password,
        address: value.address,
        suburb: value.suburb,
        city: value.city,
        state: value.state,
        postcode: value.postcode,
        cuisine: value.cuisine,
        phone_number: value.phone_number,
        email: value.email,
        bussiness_hours_start: value.bussiness_hours_start,
        bussiness_hours_end: value.bussiness_hours_end,
        avatar: value.avatar,
        menu: value.menu,
        description: value.description,
      },
    })),
  setAllEateries: (value) => set(() => ({ allEateries: value })),
});
UserStore = persist(UserStore, {
  name: "userStorage",

  getStorage: () => sessionStorage,
});
const useUserStore = create(UserStore);

export default useUserStore;
