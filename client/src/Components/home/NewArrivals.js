import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { GetProducts } from '../../functions/product';
import { useState } from 'react';
import ProductCard from '../cards/ProductCard';
import LoadingCard from '../cards/LoadingCard';
import { GetProductsNew } from '../../functions/product';
import { GetProductsCount } from '../../functions/product';
import { Pagination } from 'antd';
function NewArrivals() {
  const [products, setproducts] = useState([]);
  const [loading, setloading] = useState(false);
  const [productsCount, setProductCounts] = useState(0);
  const [page, setpage] = useState(1);
  // useEffect(() => {
  //   LoadAllProducts();
  // }, []);

  useEffect(() => {
    GetProductsCount().then((res) => {
      setProductCounts(res.data);
      console.log(productsCount);
    });
  }, []);

  useEffect(() => {
    LoadAllProducts();
  }, [setpage]);

  const LoadAllProducts = () => {
    GetProductsNew('createdAt', 'desc', page)
      .then((res) => {
        setproducts(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="container my-2">
        <div className="row">
          {products.map((product) => {
            return (
              <div className="col-md-4">
                {loading ? (
                  <LoadingCard count={3} />
                ) : (
                  <ProductCard product={product} />
                )}
              </div>
            );
          })}
        </div>
        <br />
        <Pagination
          current={page}
          total={(productsCount / 3) * 10}
          onChange={(value) => {
            setpage(value);
          }}
        />
      </div>
    </>
  );
}

export default NewArrivals;
