import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { ArrowBackIos } from "@mui/icons-material";
import { LogoutAction } from "../../api/login";
import useUserStore from "../../store/User";
import { initialCus, initialEat } from "../../store/User";
import axios from "axios";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import TextField from "@mui/material/TextField";
import LogoutButton from "../LogoutButton";
import { Label } from "@material-ui/icons";

export default function RatingAndReview() {
  //根据路由参数获取historyID
  const { historyId } = useParams();
  const [review, setreview] = useState("");
  const [rating, setrating] = useState(1);
  const [eateryID, seteateryID] = useState("");
  const [eateryAvatar, seteateryAvatar] = useState("");
  const [eateryName, seteateryName] = useState("");
  // rating星星组件用到的变量
  const [value, setValue] = React.useState(1);
  const [hover, setHover] = React.useState(-1);

  const errors = {};
  const successmsg = {};

  const [userType, setType, setCustomer, setEatery] = useUserStore((state) => [
    state.userType,
    state.setType,
    state.setCustomer,
    state.setEatery,
  ]);

  // rating的分数设定
  const labels = {
    0.5: "Useless",
    1: "Useless+",
    1.5: "Poor",
    2: "Poor+",
    2.5: "Ok",
    3: "Ok+",
    3.5: "Good",
    4: "Good+",
    4.5: "Excellent",
    5: "Excellent+",
  };
  function getLabelText(value) {
    return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
  }

  // 渲染时，根据historyID从后端拿到数据
  useEffect(() => {
    axios
      .get(`http://localhost:8081/customers/singleHistory/${historyId}`)
      .then((response) => {
        setreview(response.data.review);
        setrating(response.data.rating);
        if (rating) {
          setValue(rating);
        }
        seteateryID(response.data.eatery_id);
        seteateryAvatar(response.data.eatery_avatar);
        seteateryName(response.data.eatery_name);
      });
  }, []);
  // 如果avatar不为空，从后端拿到avatar
  const avatarUrl = eateryAvatar
    ? `http://localhost:8081/${eateryAvatar}`
    : null;

  // 登出逻辑
  const navigate = useNavigate();

  const handleReview = (e) => {
    setreview(e.target.value);
  };

  {
    /*提交表单*/
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    // 验证字段是否为空
    if (!review || !rating) {
      alert("Please fill in all fields");
    } else {
      formData.append("review", review);
      formData.append("rating", rating);
      const response = await axios.post(
        `http://localhost:8081/customers/add_review_rating/${historyId}`,
        formData
      );

      if (response.status === 200) {
        // 处理成功响应
        // 更新成功，跳转回用户profile页面
        successmsg["message"] = "update success";
        const url = `/showEateryReview/${eateryID}`;
        navigate(url);
      } else if (response.status === 404) {
        // 处理错误响应
        // 可以根据需要进行错误处理，比如显示错误消息等
        errors["message"] = "History record not found";
        return errors;
      } else if (response.status === 500) {
        errors["message"] = "Server error, please try again later.";
        return errors;
      } else if (response.status === 400) {
        errors["message"] = "Eatery account does not exist!";
        return errors;
      } else return null;
    }
  };

  return (
    <div className="bg-[#dcfce7] h-screen w-screen overflow-hidden flex flex-col z-0">
      <LogoutButton />
      <h2 className=" ml-10 text-center w-30 mx-auto text-black text-xl ">
        Order completed
      </h2>
      <h2 className=" ml-32 text-center w-30 mx-auto text-black text-xl ">
        Please review your last eatery!
      </h2>

      {/*评论区域 */}
      <div className="flex w-full flex-col flex-1 overflow-auto">
        <div className="flex w-screen h-fit basis-auto">
          {/*显示头像 */}
          <div className=" flex mt-5 ml-32 top-1 place-items-center">
            <Stack direction="row" spacing={2}>
              <Avatar
                alt={eateryName}
                src={avatarUrl}
                sx={{ width: 100, height: 100 }}
              />
            </Stack>
          </div>
          <div class="flex mt-8 ml-32 text-[48px] text-[#374151] font-bold">
            {eateryName}
          </div>
        </div>

        <div className="flex w-full h-fit text-[30px] items-center justify-center">
          <form
            onSubmit={handleSubmit}
            className="flex w-full flex-col items-center justify-items-center mt-10 pb-14 z-10"
          >
            {/*星星大小跟随这个div的字体大小 */}
            <Box
              sx={{
                width: 200,
                display: "flex",
                alignItems: "center",
                margin: "auto",
                marginBottom: "20px",
                marginTop: "0px",
              }}
            >
              <Rating
                sx={{ fontSize: 50 }}
                name="hover-feedback"
                value={value}
                precision={0.5}
                getLabelText={getLabelText}
                onChange={(event, newValue) => {
                  setValue(newValue);
                  setrating(newValue);
                }}
                onChangeActive={(event, newHover) => {
                  setHover(newHover);
                }}
                emptyIcon={
                  <StarIcon
                    style={{ opacity: 0.55, fontSize: "50px" }}
                    fontSize="inherit"
                  />
                }
              />
              {value !== null && (
                <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
              )}
            </Box>
            {/*添加评论*/}
            <div className=" bg-white w-[800px] h-[400px] flex flex-col">
              <h1 className=" w-fit h-fit mx-auto text-2xl text-black mt-4">
                How’s your experience so far?
              </h1>
              <TextField
                multiline
                rows={9} // 指定输入框有4行
                variant="outlined" // 输入框使用 outlined 样式
                placeholder="Add a comment"
                defaultValue={review}
                onChange={handleReview}
                sx={{
                  width: "70%",
                  height: "70%",
                  margin: "auto",
                  flexBasis: "auto",
                  marginTop: "20px",
                  backgroundColor: "#BDBDBF",
                }}
              />
              {/*12. 提交按钮 */}
              <div className="block mt-8 col-span-2  rounded-xl mx-auto text-2xl text-white   bg-[#00BAAD]/50 border mb-10 ">
                <Stack direction="row" spacing={2}>
                  <Button
                    variant="contained"
                    color="success"
                    type="submit"
                    name="submit"
                  >
                    Submit
                  </Button>
                </Stack>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

