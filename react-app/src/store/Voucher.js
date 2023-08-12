import { create } from "zustand";
import useUserStore from "./User";
import { persist } from "zustand/middleware";
let VoucherStore = (set) => ({
  userType: "none",
  selfVoucher: [],
  updateType: () => {
    const user = useUserStore.getState().userType;
    return set(() => ({ userType: user }));
  },
  setSelfVoucher: (value) =>
    set(() => ({
      selfVoucher: value,
    })),
});

VoucherStore = persist(VoucherStore, {
  name: "VoucherStore",
  getStorage: () => sessionStorage,
});
const useVoucherStore = create(VoucherStore);

export default useVoucherStore;
