import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ViewProduct } from '../functions/product';
import SingleProduct from '../Components/cards/SingleProduct';
import { SetRating } from '../functions/product';
import { useSelector } from 'react-redux';
import { RelatedProducts } from '../functions/product';
import ProductCard from '../Components/cards/ProductCard';

function Product() {
  const { user } = useSelector((state) => ({ ...state }));

  let slug = useParams().slug;
  const [product, setproduct] = useState({});
  const [rating, setrating] = useState(0);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    LoadProduct();
  }, [slug]);

  const LoadProduct = () => {
    ViewProduct(slug)
      .then((res) => {
        setproduct(res.data);

        RelatedProducts(res.data._id)
          .then((res) => {
            setRelated(res.data);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  const changeRating = (changeRating, name) => {
    SetRating(changeRating, name, user.token)
      .then()
      .catch((err) => console.log(err));
    setrating(changeRating);
  };

  return (
    <div className="container-fluid">
      <div className="row pt-4">
        <SingleProduct
          product={product}
          changeRating={changeRating}
          rating={rating}
        />
      </div>

      <div className="row">
        <div className="text-center pt-5 pb-5">
          <hr />
          <h4>Related Products</h4>
          <hr />
        </div>
      </div>
      <div className="row">
        {related.length ? (
          related.map((r) => {
            return (
              <div key={r._id}>
                <ProductCard product={r} />
              </div>
            );
          })
        ) : (
          <div className="text-center">
            <h4>No Products Found</h4>
          </div>
        )}
      </div>
    </div>
  );
}

export default Product;
