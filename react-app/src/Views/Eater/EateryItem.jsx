import React,{useState,useEffect,useUserStore} from "react";
import { useParams } from "react-router-dom";
import Layout from "./Layout";
import Home from "./Home";
import Book from "./Book";
import { useQuery } from "@tanstack/react-query";
import { fetchInfo } from "../../api/eatery";
import Menu from "./Menu";
import Review from "./Review";
import axios from 'axios';

export default function EateryItem() {
  const [reviews, setreviews] = useState([])
  const param = useParams();
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["eatery"],
    queryFn: fetchInfo.bind(null, param.eat_id), //check
  });
  const [e_info,SetEinfo] = useState({})
  const errors = {}
    
  useEffect(() => {
    const requestOptions = {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    };
    fetch(`http://localhost:8081/eateries/${param.eat_id}`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        SetEinfo(data.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  useEffect(()=>{
    axios.get(`http://localhost:8081/customers/check_review_rating/${param.eat_id}`)
      .then(response => {
        if (response.status === 200) {
          if (response.data.msg) {
            //const historiesArray = Object.values(response.data.data);
            setreviews([])
          } else {
            setreviews(response.data)
          }
        } 
      });
  }, [])



  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }
  return (
    <div>
      <Layout />
      <Home info={e_info}/>
      <Menu info={e_info}/>
      <Book vouchers={data?.data.data} />
      <Review reviews={reviews}/>
    </div>
  );
}
