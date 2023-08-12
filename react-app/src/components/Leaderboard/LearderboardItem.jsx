import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

export default function LeaderboardItem  ({ rank, name, avatar, rating, cuisine})  {
    
  const avatarUrl = avatar ? `http://localhost:8081/${avatar}` : null;
  const Rating = rating ? rating:0;
    //星星组件
    const StarRating = ({ rating }) => {
        const stars = [];
        const roundedRating = Math.round(rating * 2) / 2;
        for (let i = 1; i <= 5; i++) {
          if (i <= Math.floor(roundedRating)) {
            stars.push(<span key={i} className="text-yellow-500">★</span>);
          } else if (i - 0.5 === roundedRating) {
            stars.push(<span key={i} className="text-yellow-500">☆</span>);
          } else {
            stars.push(<span key={i} className="text-gray-300">★</span>);
          }
        }
        return <div>{stars}</div>;
      };
    
    
    
    
    
    return (
      <div className="flex items-center bg-[#72b4a6] rounded-3xl py-2 mb-2 w-full justify-between">
        <span className="px-6 text-sm text-[#0f172a] font-bold">{rank}</span>
        <Stack direction="row" spacing={2} className="mx-2">
            <Avatar
            alt={name}
            src={avatarUrl}
            sx={{ width: 40, height: 40 }}
            />
        </Stack>
        <span className="text-sm text-[#0f172a] mx-4 font-bold">{name}</span>
        <span className="px-6 text-sm text-[#0f172a] mx-4 font-bold">{Rating.toFixed(2)}</span>
        <StarRating rating={Rating} className='mx-4'/>
        <span className="px-6 text-sm text-[#0f172a] mx-4 font-bold">{cuisine}</span>
      </div>
    );
  };
  