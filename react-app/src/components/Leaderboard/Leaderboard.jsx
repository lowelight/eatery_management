import React, { useState, useEffect } from 'react';
import LeaderboardItem from './LearderboardItem';
import { Link } from 'react-router-dom';
import { ArrowBackIos } from "@mui/icons-material";
import LogButton from '../LogButton'; 
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { categories, state, cities, suburbs } from "../../constant";
import {Select,MenuItem,OutlinedInput} from "@mui/material";




export default function ShowLeaderboard () {
    
    {/*filter相关 */}
    const [category, setCategory] = useState("all");
    const [states, setState] = useState("all");
    const [city, setCity] = useState("all");
    const [suburb, setSuburb] = useState("all");
    const [data, setData] =  useState([]);
    const [count, setcount] = useState(0)
    useEffect(() => {
        const sendDataToBackend = async () => {
          const response = await fetch(
            "http://localhost:8081/eateries/sorted",
            {
              method: "POST",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                cuisine: category,
                state: states,
                city: city,
                suburb: suburb,
              }),
            }
          );
          if (!response.ok) {
            
            setData([]);
            setcount(0);
          }
          else{
            const data = await response.json();
            console.log(data.data.length);
            setData(data.data);
            setcount(data.data.length)
        };}

        sendDataToBackend();
        }, [category,states,city,suburb]);


    const recordcategory = (e) => {
        setCategory(e.target.value);
      };

    const recordState = (e) => {
        setState(e.target.value);
        setCity("all");
        setSuburb("all");
      };
    const recordCity = (e) => {
    setCity(e.target.value);
    setSuburb("all");
    };

    const recordSuburb = (e) => {
    setSuburb(e.target.value);
    };

    {/*page相关 */}
    const [itemsPerPage, setitemsPerPage] = useState(7)
    const [currentPage, setCurrentPage] = useState(1);
    

    let totalPages = 0;
    let currentData = [];

    if (data) {
    // 计算总页数
    totalPages = Math.ceil(data.length / itemsPerPage);
    // 获取当前页的数据
    currentData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    }
    const handlePrevious = () => {
        setCurrentPage((oldPage) => Math.max(oldPage - 1, 1));
    };

    const handleNext = () => {
        setCurrentPage((oldPage) => Math.min(oldPage + 1, totalPages));
    };

    
    return (
        <div className="flex flex-col h-screen w-screen bg-[#fff1f2] bg-blend-normal">
            <div className=" w-full h-[50px]  py-2 flex">
                <Link to={-1}>
                    <ArrowBackIos className="text-black font-thin ml-2 w-fit mt-1" />
                </Link>

                <h1 className=" ml-auto text-center w-30 mx-auto text-black text-xl ">
                    Leaderboard
                </h1>

                <div className="ml-2 mr-3 text-black text-base  font-medium">
                    <LogButton/>
                </div>
            </div>
            {/*第二行 */}
            <div className='w-full flex flex-row justify-between text-black'>
                <h1 className=" ml-32 mt-10 w-30 mx-auto text-black text-[30px] ">
                    Top {count} eateries
                </h1>
                <div className='flex flex-row mt-10 space-x-4 mr-80'>
                    {/*选择cuisines */}
                    <div className="flex items-center">
                        <span className="mr-2">Cuisine </span>
                        <Select
                            id="categories"
                            name="categories"
                            className="p-2 bg-white text-black border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            input={
                                <OutlinedInput
                                sx={{ color: "black", width: "10px" }}
                                label="Name"
                                />
                            }
                            value={category}

                            onChange={(e) => recordcategory(e)}
                            sx={{ width: "150px", height: '50px', color: "black" }}
                            >
                            <MenuItem value="all">all</MenuItem>

                            {categories.map((item) => (
                                <MenuItem key={item} value={item}>
                                {item}
                                </MenuItem>
                            ))}
                        </Select>
                    </div>
                    
                    {/*选择state */}
                    <div className="flex items-center">
                        <span className="mr-2">State </span>
                        <Select
                            id="state"
                            name="state"
                            className="p-2 bg-white text-black border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            input={
                                <OutlinedInput
                                sx={{ color: "black", width: "10px" }}
                                label="Name"
                                />
                            }
                            value={states}

                            onChange={(e) => recordState(e)}
                            sx={{ width: "150px", height: '50px', color: "black" }}
                            >
                            <MenuItem value="all">all</MenuItem>

                            {state.map((state) => (
                                <MenuItem key={state.key} value={state.name}>
                                {state.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </div>
                    
                    {/*选择city */}
                    <div className="flex items-center">
                        <span className="mr-2">City </span>
                        <Select
                            id="city"
                            name="city"
                            className="p-2 bg-white text-black border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            label="City"
                            value={city}

                            onChange={(e) => recordCity(e)}
                            sx={{ width: "150px", height: '50px', color: "black" }}
                            >
                            <MenuItem value="all">all</MenuItem>
                            {states === "all" ? (
                                <span>Default select all</span>
                            ) : (
                                cities
                                .filter((value) => value.state === states)

                                .map((item) => (
                                    <MenuItem key={item.key} value={item.name}>
                                    {item.name}
                                    </MenuItem>
                                ))
                            )}
                        </Select>
                    </div>
                    {/*选择suburb */}
                    <div className="flex items-center">
                        <span className="mr-2">Suburb </span>
                        <Select
                            id="suburb"
                            name="suburb"
                            className="p-2 bg-white text-black border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            label="Suburb"
                            value={suburb}

                            onChange={(e) => recordSuburb(e)}
                            sx={{ width: "150px", height: '50px', color: "black" }}
                            >
                            <MenuItem value="all">all</MenuItem>
                            {city === "all" ? (
                                <span>Default select all</span>
                            ) : (
                                suburbs
                                .filter((value) => value.city === city)
                                .map((item) => (
                                    <MenuItem key={item.key} value={item.name}>
                                    {item.name}
                                    </MenuItem>
                                ))
                            )}
                        </Select>
                    </div>
                </div>
            </div>
            {/*第三行 */}
            <hr className="border-t-2 border-gray-500" />
            {/*leaderboard区域 */}
            <div className='flex items-center justify-center mt-12'>
                <div className='text-black flex flex-wrap overflow-x-auto w-2/5'>
                    {currentData && currentData.map((item, index) => (
                        <LeaderboardItem
                            key={index}
                            rank={(currentPage - 1) * itemsPerPage + index + 1}
                            name={item.name}
                            avatar={item.avatar}
                            rating={item.average_rating}
                            cuisine={item.cuisine}
                        />
                        ))}
                </div>
            </div>
           {/*翻页按钮 */}
            <div className="fixed bottom-36 left-0 right-0 flex justify-center">
                <Stack spacing={2} direction="row">
                    <Button onClick={handlePrevious} disabled={currentPage <= 1} variant="contained" className='bg-blue-500 hover:bg-blue-700 rounded w-32'>
                        Previous
                    </Button>
                    <Button onClick={handleNext} disabled={currentPage >= Math.ceil(data.length / itemsPerPage)} variant="contained" className='bg-blue-500 hover:bg-blue-700 rounded w-32'>
                        Next
                    </Button>
                </Stack>
            </div>
        </div>
        
      );
};