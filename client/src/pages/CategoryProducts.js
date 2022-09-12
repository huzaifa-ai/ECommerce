import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CategoryProductList } from '../functions/product';
import { getCategory } from '../functions/category';
import ProductCard from '../Components/cards/ProductCard';

function CategoryProducts() {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    LoadProducts();
  }, []);

  const LoadProducts = () => {
    getCategory(slug).then((res) => {
      CategoryProductList(res.data[0]._id).then((res) => {
        setProducts(res.data);
      });
    });
  };

  return (
    <>
      <h4 className="bg-light text-center p-4  display-5 text-capitalize ">
        {slug}
      </h4>
      <div className="container p-4 text-center">
        <div className="row">
          {products.map((r) => {
            return (
              <div className="col-md-4">
                <ProductCard product={r} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default CategoryProducts;
