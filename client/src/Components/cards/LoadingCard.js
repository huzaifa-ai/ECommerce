import React from 'react';
import { Avatar, Card, Skeleton, Switch } from 'antd';

function LoadingCard({ count }) {
  const cards = () => {
    let totalCards = [];
    for (let i = 0; i < count; i++) {
      totalCards.push(
        <Card className="col m-3">
          <Skeleton active></Skeleton>
        </Card>
      );
    }
    return totalCards;
  };
  return (
    <>
      <div>{cards()}</div>
    </>
  );
}

export default LoadingCard;
