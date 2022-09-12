import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { GetProducts } from '../functions/product';
import { useState } from 'react';
import ProductCard from '../Components/cards/ProductCard';
import Jumbotron from '../Components/cards/Jumbotron';
import LoadingCard from '../Components/cards/LoadingCard';
import { GetProductsBest } from '../functions/product';
import NewArrivals from '../Components/home/NewArrivals';
import BestSellers from '../Components/home/BestSellers';
import CategoryList from '../Components/categories/CategoryList';
import ListSubcategories from '../Components/subcategories/ListSubcategories';

function Home() {
  return (
    <>
      <div className=" jumbotron font-weight-bold	 container-fluid display-4 text-center text-danger h1 font-weight-bold p-5 bg-light">
        <Jumbotron text={['New Arrivals', 'Latest Arrivals', 'Best Sellers']} />
      </div>

      <h4 className="text-center p-3 mt-5 mb-5 display-6 jumbotron bg-light">
        New Arrivals
      </h4>
      <NewArrivals />
      <h4 className="text-center p-3 mt-5 mb-5 display-6 jumbotron bg-light">
        Best Sellers
      </h4>
      <BestSellers />
      <h4 className="text-center p-3 mt-5 mb-5 display-6  bg-light">
        Top Categories
      </h4>
      <CategoryList />
      <h4 className="text-center p-3 mt-5 mb-5 display-6  bg-light">
        Sub Categories
      </h4>
      <ListSubcategories />
    </>
  );
}

export default Home;

// useEffect(() => {
//   if (user && user.role === 'subscriber') {
//     navigate('/');
//   }
//   if (user && user.role === 'admin') {
//     navigate('/admin/dashboard');
//   }
// }, [user]);
