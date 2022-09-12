import React, { useEffect, useState } from 'react';
import AdminNav from '../../../Components/nav/AdminNav';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import CategoryForm from '../../../Components/forms/CategoryForm';
import {
  createCategory,
  getCategories,
  removeCategory,
} from '../../../functions/category';
import { useSelector } from 'react-redux';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import LocalSearch from '../../../Components/forms/LocalSearch';

function CategoryCreate() {
  const { user } = useSelector((state) => ({ ...state }));
  const [name, setname] = useState('');
  const [loading, setloading] = useState(false);
  const [categories, setCategories] = useState([]);

  //Step 1
  const [keyword, setkeyword] = useState('');

  // Step 3
  const handleSearchChange = (e) => {
    e.preventDefault();
    setkeyword(e.target.value.toLowerCase());
  };

  //Step 4

  const searched = (keyword) => (value) =>
    value.name.toLowerCase().includes(keyword);

  useEffect(() => {
    getCategories()
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.log('Failed to fetch categories', err);
      });
  }, [loading]);

  const handleRemove = (slug) => {
    setloading(true);
    removeCategory(slug, user.token)
      .then((res) => {
        setloading(false);
        toast.success('Delete successfull');
      })
      .catch((err) => {
        toast.error(err);
        setloading(false);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setloading(true);
    createCategory(name, user.token)
      .then((res) => {
        setloading(false);
        console.log(res);
        setname('');
        toast.success(`${res.data.name} is created`);
      })
      .catch((err) => {
        setloading(false);
        console.log(err);
        toast.error('Failed to create category');
      });
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-2 ">
            <AdminNav />
          </div>

          <div className="col">
            <br />
            {loading ? (
              <h4 className="text-danger">Loading</h4>
            ) : (
              <h4>Create Category</h4>
            )}
            <CategoryForm
              name={name}
              setname={setname}
              handleSubmit={handleSubmit}
            />
            <br />
            <LocalSearch
              keyword={keyword}
              handleSearchChange={handleSearchChange}
              setkeyword={setkeyword}
            />
            <br />

            {categories.filter(searched(keyword)).map((value) => {
              return (
                <div key={value._id} className="alert alert-secondary">
                  {value.name}{' '}
                  <span
                    onClick={() => handleRemove(value.slug)}
                    className="btn btn-sm float-end "
                  >
                    <DeleteOutlined className="text-danger " />
                  </span>{' '}
                  <Link to={`${value.slug}`} state={{ from: value.slug }}>
                    <span className="btn btn-sm float-end">
                      <EditOutlined className="text-danger" />
                    </span>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default CategoryCreate;
