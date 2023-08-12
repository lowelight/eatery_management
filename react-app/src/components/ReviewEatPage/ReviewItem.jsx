import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Rating from '@mui/material/Rating';

const ReviewItem = (props) => {
  const { review } = props;
  
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
export default ReviewItem;
