import React, { useEffect, useState } from 'react';
import AdminNav from '../../Components/nav/AdminNav';
import { GetProducts } from '../../functions/product';
import AdminProductdCard from '../../Components/cards/AdminProductdCard';
import { ProductDelete } from '../../functions/product';
import { useSelector } from 'react-redux';

function AllProducts() {
  const { user } = useSelector((state) => ({ ...state }));
  const [Products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    loadAllProducts();
  }, []);

  const DeleteProduct = async (slug) => {
    await ProductDelete(slug, user.token)
      .then((res) => {
        console.log(res.data);
        loadAllProducts();
      })
      .catch((err) => console.log(err));
  };

  const loadAllProducts = () => {
    setLoading(true);
    GetProducts(10)
      .then((res) => {
        console.log(res.data);
        setLoading(false);
        setProducts(res.data);
        console.log(Products);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-2  ">
            <AdminNav />
          </div>

          <div className="col-10 ">
            {loading ? (
              <h4 className="text-danger">Loading</h4>
            ) : (
              <h1>Products</h1>
            )}
            <div className="row">
              {Products.map((product, key) => {
                return (
                  <div className="col-md-4">
                    <AdminProductdCard
                      product={product}
                      key={key}
                      DeleteProduct={DeleteProduct}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AllProducts;
