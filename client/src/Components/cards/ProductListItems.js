import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

function ProductListItems({ product }) {
  const {
    price,
    description,
    category,
    subs,
    shipping,
    color,
    brand,
    quantity,
    sold,
  } = product;
  useEffect(() => {
    console.log(product);
  });
  return (
    <ul className="list-group">
      <li className="list-group-item p-3 ">
        Price <span className="float-end px-3">$ {price}</span>
      </li>
      <li className="list-group-item p-3 ">
        Category
        <Link to={`/category/ss`}>
          <span className="float-end px-3">{category && category.name}</span>
        </Link>
      </li>

      {subs && (
        <li className="list-group-item">
          Subs
          {subs.map((e) => {
            return <span className="float-end px-3">{e.name}</span>;
          })}
        </li>
      )}
      <li className="list-group-item p-3 ">
        Shipping <span className="float-end px-3">{shipping}</span>
      </li>
      <li className="list-group-item p-3 ">
        Brand <span className="float-end px-3"> {brand}</span>
      </li>
      <li className="list-group-item p-3 ">
        Color <span className="float-end px-3">{color}</span>
      </li>
      <li className="list-group-item p-3 ">
        Quantity <span className="float-end px-3">{quantity}</span>
      </li>
      <li className="list-group-item p-3 ">
        Sold <span className="float-end px-3">{sold}</span>
      </li>
    </ul>
  );
}

export default ProductListItems;
