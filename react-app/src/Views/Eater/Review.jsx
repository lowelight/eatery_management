import React,{useState} from "react";
import HOC from "./HOC";
import ReviewItem from "../../components/ReviewEatPage/ReviewItem";

const Review = ({props}) => {
  const reviews = props.reviews
  // const reviews = (props.props.reviews);
  // 记录review数目，初始值为0
  const [reviewCount, setreviewCount] = useState(reviews.length)
  return (
    <div className="mt-4 flex flex-col h-5/6">
      <h1 className=" text-center text-2xl text">Review</h1>
      <h2 className=" ml-4 text-xl ">All reviews</h2>
      <h3 className=" text-right mr-10 font-normal">
        &hearts; We love your feedback &hearts;
      </h3>
      <div className=" border-t-4 border-gray-400"></div>
      <div className="flex-1 h-5/6 my-auto overflow-y-scroll">
        {reviews.map((review, index) => (
          <ReviewItem key={index} review={review} />
          ))}
      </div>
    </div>
  );
};

export default HOC(Review, "review");
