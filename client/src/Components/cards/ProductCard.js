import React from 'react';
import blankimages from '../../blankimages/images.png';
import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Avatar, Card, Skeleton, Switch, Tooltip } from 'antd';
import StarRatings from 'react-star-ratings';
import { showAverage } from '../../functions/rating';
import _, { uniq } from 'lodash';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const { Meta } = Card;

function ProductCard({ product }) {
  const { title, description, images, slug, ratings, price } = product;
  const [tooltip, setTooltip] = useState('Click to add');

  const { user, cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const handleAddtoCart = (e) => {
    e.preventDefault();
    let cart = [];
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
      }
      cart.push({
        ...product,
        count: 1,
      });
      let unique = _.uniqWith(cart, _.isEqual);
      localStorage.setItem('cart', JSON.stringify(unique));
      setTooltip('Added');
      dispatch({
        type: 'ADD_TO_CART',
        payload: unique,
      });
      dispatch({
        type: 'SET_VISIBLE',
        payload: true,
      });

      // Add to Redux
    }
  };

  return (
    <>
      {ratings && ratings.length > 0 ? (
        showAverage(product)
      ) : (
        <div classname="text-center pt-1 pb-3">No ratings yet</div>
      )}
      <Card
        hoverable
        className="my-2"
        cover={
          <img
            style={{
              height: '190px',
              objectFit: 'cover',
              width: '100%',
              margin: 'auto',
            }}
            className="p-2"
            alt="example"
            src={images && images.length ? images[0].url : blankimages}
          />
        }
        actions={[
          <Link to={`/product/${slug}`}>
            <EyeOutlined className="text-danger" />
            <p>View Product</p>
          </Link>,
          <Tooltip title={tooltip}>
            <div onClick={handleAddtoCart}>
              <ShoppingCartOutlined className="text-danger" />
              <p>Add to Card</p>
            </div>
          </Tooltip>,
        ]}
      >
        <Meta
          title={`${title} - $${price}`}
          description={
            description && description.length
              ? `${description.substring(0, 10)}....`
              : ''
          }
        />
      </Card>
    </>
  );
}

export default ProductCard;
