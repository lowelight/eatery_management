import React, { useState, useEffect } from "react";
import HOC from "./HOC";
import SingleVoucher from "../../components/myVoucher/Cus/SingleVoucher";
import { useMutation } from "@tanstack/react-query";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Radio from "@mui/material/Radio";
import { bookVoucher } from "../../api/voucher";
import useUserStore from "../../store/User.js";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const Book = ({ props }) => {
  const { vouchers } = props;
  const length = vouchers?.length??0
  const [userType] = useUserStore((state) => [state.userType]);
  const [checkBox, setCheckBox] = useState(vouchers?.[0].id || 1);
  const mutation = useMutation({
    mutationFn: (checkBox) => {
      return bookVoucher(checkBox);
    },
  });

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("voucher_id", checkBox);
    mutation.mutate(formData);
  };

  {/*page相关 */}
  const [page, setPage] = useState(0); // 当前页
  const itemsPerPage = 2; // 每页显示的数量

  const handleNext = () => {
    setPage(page + 1);
  };

  const handlePrevious = () => {
    setPage(page - 1);
  };

  // 当page改变时，确保它始终在有效的范围内
  useEffect(() => {
    if (page < 0) {
      setPage(0);
    } else if (page > Math.ceil(length / itemsPerPage) - 1) {
      setPage(Math.ceil(length / itemsPerPage) - 1);
    }
  }, [page, length]);

  return (
    <div className="relative">
      <div className="flex w-5/6 h-5/6">
        {/* <img src="/src/assets/bg1.PNG" alt="eatery" /> */}
        <FormControl>
          <RadioGroup
            name="select"
            value={checkBox}
            onChange={(e) => setCheckBox(e.target.value)}
            //defaultValue={vouchers?.[0].id || 1}
          >
            {vouchers&& vouchers.slice(page * itemsPerPage, (page + 1) * itemsPerPage).map((voucher) => {
              return (
                <div className="flex" key={voucher.id}>
                  <SingleVoucher voucher={voucher} />
                  {userType === "customer" && (
                  <FormControlLabel
                    key={voucher.id}
                    value={voucher.id}
                    control={<Radio />}
                    label=""
                  />
                  )}
                </div>
              );
            })}
          </RadioGroup>
        </FormControl>
      </div>
      <div className=" relative mt-10 flex">
        <div className=" text-red-500 text-2xl mr-4">
          {mutation.isLoading
            ? "adding!!!"
            : mutation.isError
            ? `An error occurred: ${mutation.error.msg}`
            : mutation.isSuccess
            ? "adding success"
            : null}
        </div>
        {/*翻页按钮 */}
        <div className="relative left-96">
            <Stack spacing={2} direction="row">
                <Button onClick={handlePrevious} disabled={page <= 0} variant="contained" className='rounded w-32'>
                    Previous
                </Button>
                <Button onClick={handleNext} disabled={page >= Math.ceil(length / itemsPerPage) - 1} variant="contained" className='rounded w-32'>
                    Next
                </Button>
            </Stack>
        </div>
        {/*提交按钮 */}
        <button
          className="text-black block w-fit ml-auto  relative right-16 px-8 py-2 bg-green-300 rounded-2xl text-xl "
          onClick={handleSubmit}
        >
          Book
        </button>
      </div>
    </div>
  );
};

export default HOC(Book, "book");
