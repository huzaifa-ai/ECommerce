import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { getCategories } from '../../functions/category';
import { Link } from 'react-router-dom';

function CategoryList() {
  const [categories, setcategories] = useState([]);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    setloading(true);
    getCategories()
      .then((res) => {
        setloading(false);
        setcategories(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const showCategories = () => {
    return categories.map((r) => {
      return (
        <Link to={`category/${r.slug}`}>
          <button className=" btn btn-danger btn-outlined-primary btn-lg btn-block btn-raised m-4 py-3 px-5 ">
            {' '}
            {r.name}
          </button>
        </Link>
      );
    });
  };
  return (
    <div className="container text-center">
      {loading ? <h4 className="text-center"> Loading</h4> : showCategories()}
    </div>
  );
}

export default CategoryList;
