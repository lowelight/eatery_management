import React, { useState, useEffect } from 'react';
import useUserStore from "../../store/User";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowBackIos } from "@mui/icons-material";
import { LogoutAction } from "../../api/login";
import { initialCus, initialEat } from "../../store/User";
import axios from 'axios';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';



export default function EatReviewShow () {
    const { eateryId } = useParams();
    // 记录review数目，初始值为0
    const [reviewCount, setreviewCount] = useState(0)

    const [reviews, setreviews] = useState([])
    const [userType, setType, setCustomer, setEatery] = useUserStore((state) => [
        state.userType,
        state.setType,
        state.setCustomer,
        state.setEatery,
      ]);

    const errors = {}
    const successmsg = {}

    // 登出逻辑
    const navigate = useNavigate();
    const LoginOutFunc = async () => {
        const res = await LogoutAction(userType);
        if (res === 200) {
        setType("none");
        setCustomer(initialCus);
        setEatery(initialEat);
        navigate("/");
        }
    }

    // 渲染时，根据eateryID从后端拿到该商家所有review信息
    useEffect(()=>{
        axios.get(`http://localhost:8081/customers/check_review_rating/${eateryId}`)
          .then(response => {
            if (response.status === 200) {
            //const historiesArray = Object.values(response.data.data);
            setreviews(response.data)
            setreviewCount(response.data.length)
            } else if (response.status === 404) {
                errors["message"] = 'Eatery account does not exist!'
            } else if (response.status === 401) {
                errors["message"] = 'No review or rating for this eatery'
            } 
          });
    }, [])

    
    // 展示每一条review item
    const ReviewItem = ({ review }) => {
        
        return (
            
            <div className="bg-white bg-opacity-50 rounded-3xl p-4 w-[700px] h-[200px] ml-40 mt-10 mb-4 flex flex-col space-y-4 text-[#075985]  shadow-lg">
                <div className="flex items-center space-x-2 ">
                    {/*头像*/}
                    <div className="flex w-[300px]">
                        <Stack direction="row" spacing={2}>
                            <Avatar
                            alt={review.customer_username}
                            src={review.customer_avatar !== "Unknown" ? `http://localhost:8081/${review.customer_avatar}` : null}
                            sx={{ width: 60, height: 60 }}
                            />
                        </Stack>
                        <span className="text-gray-700 text-lg  w-fit translate-x-6  translate-y-1">{review.customer_username}</span>
                    </div>
                    <div className="w-fit mx-auto">
                        <Stack spacing={1}>
                            <Rating name="half-rating-read" defaultValue={review.rating} precision={0.5} readOnly />
                        </Stack>
                    </div>
                </div>
                <div className='text-center'>{review.review}</div>
                <div className="text-gray-500 text-sm flex-1">
                    <h2 className="mt-6 ">
                    {new Date(review.review_time).toLocaleString()}
                    </h2>
                </div>
            </div>


        );
      };


    return (
        
        
        // <div className="mt-4 flex flex-col h-5/6">
        //     <h1 className=" text-center text-2xl text">Review</h1>
        //     <h2 className=" ml-4 text-xl ">All reviews</h2>
        //     <h3 className=" text-right mr-10 font-normal">
        //         &hearts; We love your feedback &hearts;
        //     </h3>
        //     <div className=" border-t-4 border-gray-400"></div>
        //     <div className="flex-1 h-5/6 my-auto overflow-y-scroll">
        //         {reviews.map((review, index) => (
        //         <ReviewItem key={index} review={review} />
        //         ))}
        //     </div>
        // </div>
        
        <div className="h-screen w-screen bg-[#f3e8ff] bg-blend-normal bg-[url('assets/Eatery_UPD.png')] bg-contain bg-right-top bg-no-repeat">
            {/* 前三行 */}
            <div className="h-[100px]">
                {/*第一行 */}
                <div className="absolute top-0 z-20 w-full h-[50px] py-2 flex">
                    <Link to={-1}>
                    <ArrowBackIos className="text-black font-thin ml-2 w-fit mt-1" />
                    </Link>
                    <h1 className="ml-auto text-center w-30 mx-auto text-black text-[24px]">
                        Review
                    </h1>
                    <button
                        className="ml-2 mr-3 text-black text-base font-medium"
                        onClick={LoginOutFunc}
                    >
                        Log out
                    </button>
                </div>
                {/*第二行 */}
                <div className="absolute top-[50px] z-20 w-full flex flex-row justify-between">
                    <h1 className="ml-32 w-30 mx-auto text-black text-[30px]">
                        All reviews ({reviewCount})
                    </h1>
                    <h1 className="mr-10 text-black text-[30px]">&hearts; We love your feedback &hearts;</h1>
                </div>
                {/*第三行 */}
                <hr className="absolute top-[100px] z-20 border-t-2 border-gray-500 w-full" />
            </div>
            {/*第四行 */}
            <div className="overflow-auto z-10 h-[calc(100vh-100px)] scrollbar-hide pt-[50px]">
                {reviews.map((review, index) => (
                    <ReviewItem key={index} review={review} />
                ))}
            </div>
        </div>
    
      );
    
}