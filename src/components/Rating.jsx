import React from 'react';

function handleRating(rate) {
  const rating = [];
  for (let i = 0; i < rate; i++) {
    rating.push(<i key={i} className="fa fa-star text-yellow-400" aria-hidden="true"></i>);
  }
  return rating;
}

const Rating = ({ rate, }) => {
  const validRate = Math.max(0, Math.min(5, rate));
  const ratings = handleRating(validRate);

  return (
    <div className="rating flex">
      {ratings}
    </div>
  );
};

export default Rating;
