import React from 'react';
import { Card, Tabs, Tooltip } from 'antd';
import _, { uniq } from 'lodash';
import { useDispatch } from 'react-redux';
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import blankimage from '../../blankimages/images.png';
import ProductListItems from './ProductListItems';
import StarRating from 'react-star-ratings';
import { useState } from 'react';
import { useEffect } from 'react';
import RatingModal from '../modal/RatingModal';
import { showAverage } from '../../functions/rating';

const { Meta } = Card;
const { TabPane } = Tabs;

function SingleProduct({ product, changeRating, rating }) {
  const { title, images, description, _id, ratings } = product;
  const [tooltip, setTooltip] = useState('Click to add');

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

      // Add to Redux
    }
  };

  return (
    <>
      <div className="col-md-6 ">
        <Carousel autoplay showArrows={true} infiniteLoop>
          {images && images.length ? (
            images.map((i, key) => {
              return (
                <img src={i.url} key={key} className="img-fluid carosel" />
              );
            })
          ) : (
            <img src={blankimage} />
          )}
        </Carousel>
        <Tabs type="card" className="p-3">
          <TabPane tab="Description" key="1">
            {' '}
            {description && description}
          </TabPane>
          <TabPane tab="More" key="2">
            {' '}
            Call us of xxx xxx xxx to get more information
          </TabPane>
        </Tabs>
      </div>
      <div className="col-md-5 offset-lg-1">
        <h1 className=" bg-dark text-light p-3 text-center">{title} </h1>
        <div className="rating">
          {' '}
          {ratings && ratings.length > 0 ? (
            showAverage(product)
          ) : (
            <h1>No Ratings Yet</h1>
          )}
        </div>
        <Card
          actions={[
            <Tooltip title={tooltip}>
              <div onClick={handleAddtoCart}>
                <ShoppingCartOutlined className="text-danger" />
                <p>Add to Card</p>
              </div>
            </Tooltip>,
            <Link to="/">
              <HeartOutlined className="text-success" /> <br /> Add to Wishlist
            </Link>,
            <RatingModal>
              <StarRating
                rating={rating}
                isSelectable={true}
                starRatedColor="green"
                changeRating={changeRating}
                numberOfStars={5}
                name={_id}
              />
            </RatingModal>,
          ]}
        >
          <ProductListItems product={product} />
        </Card>
      </div>
    </>
  );
}
export default SingleProduct;
