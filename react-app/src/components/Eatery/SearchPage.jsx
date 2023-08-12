//check name

import {
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Select,
  MenuItem,
  OutlinedInput,
} from "@mui/material";
import Slider from "@material-ui/core/Slider";
import React, { useEffect, useState } from "react";
import EatItem from "./Eat_Item";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import CancelIcon from "@mui/icons-material/Cancel";
import { categories, state, cities, suburbs } from "../../constant";
import { Link, useNavigate } from "react-router-dom";
import useUserStore from "../../store/User";

export default function SearchPage() {

  const [restaurant, searchRestaurant] = useState("");
  const [isFilter, setIsFilter] = useState(true);
  const [discount, setDiscount] = useState([0, 20]);
  const [category, setCategory] = useState("all");
  const [postCode, setPostCode] = useState("");
  const [states, setState] = useState("all");
  const [city, setCity] = useState("all");
  const [suburb, setSuburb] = useState("all");
  const [allEateries, setAllEateries] = useUserStore((state) => [
    state.allEateries,
    state.setAllEateries,
  ]);

  const [googleAddress, setGoogleAddress] = useState("");
  const [googleCity, setGoogleCity] = useState("");
  const [google_Location, setGoogleLocation] = useState("");

  const searchClick = () => {
    const requestOptions = {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        eatery_name: restaurant,
        discount_start: discount[0],
        discount_end: discount[1],
        cuisine: category,
        postcode: postCode,
        state: states,
        city: city,
        suburb: suburb,
      }),
    };
    fetch("http://localhost:8081/customers/eateries/search", requestOptions)
      .then((response) => {
        if (!response.ok) {
          setAllEateries([]);
          // throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setAllEateries(data.data);
        //fix problem
        setGoogleAddress(data?.data?.[0].address);
        setGoogleCity(data?.data?.[0].city);
      });
  };

  useEffect(() => {
    const sendDataToBackend = async () => {
      const response = await fetch(
        "http://localhost:8081/customers/eateries/search",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            eatery_name: restaurant,
            discount_start: discount[0],
            discount_end: discount[1],
            cuisine: category,
            postcode: postCode,
            state: states,
            city: city,
            suburb: suburb,
          }),
        }
      );
      const data = await response.json();
      console.log(data);
      setAllEateries(data.data);
      //fix problem
      setGoogleAddress(data?.data?.[0].address);
      setGoogleCity(data?.data?.[0].city);
    };
    sendDataToBackend();
  }, []);


  useEffect(() => {
    const address = googleAddress
      ? googleAddress.trim().split(" ").join("+")
      : "UNSW";
    const city = googleCity ? googleCity.trim() : "Sydney";
    const googleSearch = `${address},${city}+Australia`;
    setGoogleLocation(googleSearch);
  }, [googleAddress, googleCity]);


  const navigate = useNavigate();
  const valuetext = (value) => {
    return `${value}%`;
  };
  const changeFilter = () => {

    if (isFilter) {
      setDiscount([0, 20]);
      setCategory("all");
    }
    setIsFilter(!isFilter);
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


  return (
    <div className="w-full h-full">
      <div className="w-fit h-fit mx-auto">
        <TextField
          type="search"
          id="restaurant"
          name="restaurant"
          placeholder="Search Restaurant"
          value={restaurant}

          onChange={(e) => searchRestaurant(e.target.value)}

        />
        <Select
          id="state"
          name="state"
          input={
            <OutlinedInput
              sx={{ color: "black", width: "10px" }}
              label="Name"
            />
          }
          value={states}

          onChange={(e) => recordState(e)}
          sx={{ width: "150px", color: "black" }}
        >
          <MenuItem value="all">all</MenuItem>

          {state.map((state) => (
            <MenuItem key={state.key} value={state.name}>
              {state.name}
            </MenuItem>
          ))}
        </Select>
        <Select
          id="city"
          name="city"
          label="City"
          value={city}

          onChange={(e) => recordCity(e)}
          sx={{ width: "150px", color: "black" }}
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
        <Select
          id="suburb"
          name="suburb"
          label="Suburb"
          value={suburb}

          onChange={(e) => recordSuburb(e)}
          sx={{ width: "150px", color: "black" }}
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

        <TextField
          type="search"
          id="postCode"
          name="postcode"
          placeholder="postCode"
          value={postCode}
          onChange={(e) => setPostCode(e.target.value)}
        />


        <button
          onClick={searchClick}
          className=" bg-orange-500 h-[56px] w-fit px-4"
        >

          <SearchRoundedIcon />
        </button>
        <button
          className="shadow-black shadow active:shadow-inner active:shadow-white h-fit w-fit inline-block px-8 py-4 ml-24 bg-[#6F6F6F]"
          onClick={() => navigate("/myVoucher")}
        >
          <CardGiftcardIcon className="mr-1 text-pink-500 " />
          <Link to="/myVoucher" className=" cursor-pointer text-black text-md ">
            MyVoucher
          </Link>
        </button>
      </div>
      <div className="mt-4 flex w-[94%]  mx-auto h-[75vh]">
        {isFilter ? (
          <div className=" basis-48 px-4 py-2 mr-1 bg-white text-black overflow-scroll ">
            <FormControl>
              <div className="mt-1" onClick={changeFilter}>
                <CheckCircleOutlineRoundedIcon className=" cursor-pointer" />
                <h1 className="ml-2 inline-block">Filter</h1>
              </div>
              <div className="mt-4">
                <label className="text-xl">Discount</label>
                <Slider
                  onChange={(_, newValue) => setDiscount(newValue)}
                  defaultValue={[0, 20]}
                  value={discount}
                  getAriaValueText={valuetext}
                  valueLabelDisplay="auto"
                  min={0}
                  max={100}
                />
              </div>
              <div className="mt-4">
                <FormLabel className="text-xl">Category</FormLabel>
                <RadioGroup
                  aria-label="Category"
                  name="category"
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories.map((category) => (
                    <FormControlLabel
                      key={category}
                      value={category}
                      control={<Radio />}
                      label={category}
                    />
                  ))}
                </RadioGroup>
              </div>
            </FormControl>
          </div>
        ) : (
          <div className="flex text-xl text-black " onClick={changeFilter}>
            <CancelIcon className=" cursor-pointer mr-2" />
            <h1>Filter</h1>
          </div>
        )}
        <div className=" flex-1 h-[75vh] ml-2 box-border flex flex-col">

          {/*临时修改 */}
          <div className="flex items-center h-[10%]">
            <h1 className="h-[5%] italic text-2xl font-bold mt-1 mb-4 text-black">
              Best restaurants near me
            </h1>
            <button
              className="shadow-black shadow active:shadow-inner active:shadow-white h-fit w-fit inline-block px-8 py-4 ml-24 bg-[#6F6F6F]"
              onClick={() => navigate("/leaderboard")}
            >
              <Link
                to="/leaderboard"
                className=" cursor-pointer text-black text-md "
              >
                Leaderboard
              </Link>
            </button>
          </div>

          <div className="flex-1  w-full  px-3 bg-white py-3 overflow-scroll">
            {
              //new component
            }

            {allEateries &&
              allEateries.map((item) => {
                return <EatItem key={item.id} data={item} />;
              })}
          </div>
        </div>
        <div className=" ml-2 basis-[30vw]">
          <iframe
            title="google_myLocation"
            id="google_iframe"
            className="w-full h-full"
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyCPgQcDR7Gt71LvRiZxO9GB-I2u7PYLpZY&q=${google_Location}`}
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
}

