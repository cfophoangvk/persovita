import { Star } from 'lucide-react';

const StarRating = (props: { rating: number }) => {

  if (props.rating < 0 || props.rating > 5) {
    return <div></div>
  }

  const fullStars = Math.floor(props.rating);
  const hasHalfStar = props.rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} className="w-3 h-3 fill-current stroke-1" />
      ))}

      {hasHalfStar && (
        <div className="relative w-3 h-3">
          <Star className="absolute top-0 left-0 w-3 h-3 stroke-1" />
          <div
            className="absolute top-0 left-0 overflow-hidden"
            style={{ width: `${(props.rating % 1) * 100}%` }}
          >
            <Star className="w-3 h-3 fill-current stroke-1" />
          </div>
        </div>
      )}

      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className="w-3 h-3 stroke-1" />
      ))}
    </div>
  );
};

export default StarRating;