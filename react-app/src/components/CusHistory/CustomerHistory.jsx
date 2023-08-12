import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowBackIos } from "@mui/icons-material";
import axios from 'axios';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import LogButton from '../LogButton'; 



export default function CustomerHistory () {
    const [histories, sethistories] = useState([])
    const [errorMessage, setErrorMessage] = useState('');
    // 记录history数目，初始值为0
    const [historyCount, sethistoryCount] = useState(0)


    // 展示每一条history item
    const HistoryItem = ({ history }) => {
        const navigate = useNavigate();

        const handleRatingClick = () => {
            // 构建跳转链接，携带 historyId 参数
            const url = `/AddRating/${history.id}`;
            navigate(url);
        }


        return (
            <div className="bg-white bg-opacity-60 rounded-3xl p-4 w-1/2 ml-40 mt-8 mb-4 flex space-x-4 text-[#075985]">
            {/* 头像 */}
            <div className="flex-shrink-0">
                <div className="grid place-items-center">
                    <Stack direction="row" spacing={2}>
                        <Avatar
                        alt={history.eatery_name}
                        src={history.avatar ? `http://localhost:8081/${history.avatar}` : null}
                        sx={{ width: 60, height: 60 }}
                        />
                    </Stack>
                </div>
            </div>
        
            {/* 信息 */}
            <div className="flex-grow">
                <p className="text-gray-500">Voucher code: {history.code}</p>
                <p className="text-gray-500">Eatery: {history.eatery_name}</p>
                <p className="text-gray-500">Discount: {history.discount_percentage}</p>
                <p className="text-gray-500">Rating: {history.rating}</p>
                <p className="text-gray-500">Review: {history.review}</p>
                <p className="text-gray-500">Review time: {history.review_time}</p>
                <p className="text-gray-500">Voucher_start: {history.start_}</p>
                <p className="text-gray-500">Voucher_end: {history.end_}</p>
                <p className="text-gray-500">Voucher use time: {history.use_voucher_time}</p>
                <p className="text-gray-500">Voucher weekday: {history.weekday}</p>
            </div>
        
            {/* 提交按钮 */}
            <div className="flex-shrink-0">
                <Stack direction="row" spacing={2}>
                    <Button variant="contained" color="success" type="submit" name="submit" onClick={handleRatingClick}>
                        Rating
                    </Button>
                </Stack>
            </div>
        </div>
        );
      };

    // 页面渲染时执行一次拉取history操作
    useEffect(()=>{
        axios.get("http://localhost:8081/customers/history")
          .then(response => {
              if (response.status === 200) {
                //const historiesArray = Object.values(response.data.data);
                sethistories(response.data)
                sethistoryCount(response.data.length)
              } else if (response.status === 404) {
                setErrorMessage('No history!')
              }
              
          });
    }, [])

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
        } else if (page > Math.ceil(histories.length / itemsPerPage) - 1) {
        setPage(Math.ceil(histories.length / itemsPerPage) - 1);
        }
    }, [page, histories.length]);

    
    return (
        <div className=" overflow-auto h-screen w-screen bg-[#fef2f2]">
            <div className=" w-full h-[50px]  py-2 flex">
                <Link to={-1}>
                    <ArrowBackIos className="text-black font-thin ml-2 w-fit mt-1" />
                </Link>

                <h1 className=" ml-auto text-center w-30 mx-auto text-black text-xl ">
                    History
                </h1>

                <div className="ml-2 mr-3 text-black text-base  font-medium">
                    <LogButton/>
                </div>

                {/* <button
                    className="ml-2 mr-3 text-black text-base  font-medium"
                    onClick={LoginOutFunc}
                    >
                    Log out
                </button>*/}
                
            </div>
            {/*第二行 */}
            <div className='w-full flex flex-row justify-between'>
                <h1 className=" ml-32 mt-10 w-30 mx-auto text-black text-[30px] ">
                    All history ({historyCount})
                </h1>
            </div>
            {/*第三行 */}
            <hr className="border-t-2 border-gray-500" />
            {/*第四行 */}
            <div className='text-black flex flex-wrap overflow-x-auto'>
                {histories && histories.slice(page * itemsPerPage, (page + 1) * itemsPerPage).map((history) => (
                    <HistoryItem key={history.id} history={history} />
                ))}
            {/*翻页按钮 */}
            <div className="fixed bottom-40 flex right-36">
                <Stack spacing={2} direction="row">
                    <Button onClick={handlePrevious} variant="contained" className='rounded w-32'>
                        Previous
                    </Button>
                    <Button onClick={handleNext} variant="contained" className='rounded w-32'>
                        Next
                    </Button>
                </Stack>
            </div>
            </div>
        </div>
    )
}