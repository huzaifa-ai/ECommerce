import React from 'react';
import StarRating from 'react-star-ratings';

export const showAverage = (p) => {
  if (p && p.ratings) {
    let EmptyArray = [];
    let TotalRatings = p && p.ratings;
    let length = TotalRatings.length;

    TotalRatings.map((r) => EmptyArray.push(r.star));
    let Calculting = EmptyArray.reduce((p, n) => {
      return p + n;
    }, 0);
    let highest = length * 5;
    let finalResult = (Calculting * 5) / highest;

    return (
      <div className="text-center pt-1 pb-3">
        <span>
          <StarRating
            starDimension="20px"
            starSpacing="2px"
            starRatedColor="red"
            rating={finalResult}
          />{' '}
          ({p.ratings.length})
        </span>
      </div>
    );
  }
};
