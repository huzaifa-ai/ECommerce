import React, { useEffect, useState } from 'react';
import AdminNav from '../../../Components/nav/AdminNav';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import CategoryForm from '../../../Components/forms/CategoryForm';
import { getCategories } from '../../../functions/category';
import { CreateSub, RemoveSub, SubCategories } from '../../../functions/sub';
import { useSelector } from 'react-redux';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import LocalSearch from '../../../Components/forms/LocalSearch';

function SubCreate() {
  const { user } = useSelector((state) => ({ ...state }));
  const [name, setname] = useState('');
  const [loading, setloading] = useState(false);
  const [Subcategories, setSubCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [Category, SetCategory] = useState('');
  const [parent, setparent] = useState('');

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

  // Getting all the Categories and the SubCategories
  useEffect(() => {
    getCategories()
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.log('Failed to fetch categories', err);
      });
    SubCategories()
      .then((res) => {
        console.log(res);
        setSubCategories(res.data);
        setparent(res.data.parent);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [loading]);

  //Removing SubCatigories
  const handleRemove = (slug) => {
    setloading(true);
    RemoveSub(slug, user.token)
      .then((res) => {
        setloading(false);
        toast.success('Delete successfull');
      })
      .catch((err) => {
        toast.error(err);
        setloading(false);
      });
  };

  //Creating SubCategory
  const handleSubmit = (e) => {
    console.log(Category);
    e.preventDefault();
    setloading(true);
    CreateSub(name, Category, user.token)
      .then((res) => {
        setloading(false);
        console.log(res);
        toast.success(`${res.data.name} is created`);
        setname('');
      })
      .catch((err) => {
        setloading(false);
        console.log(err);
        toast.error('Failed to create category');
      });
  };

  //////Rendering
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
              <h4>Create Sub Category</h4>
            )}
            <br />
            <div className="form-group">
              <label htmlFor="">Category</label>
              <select
                name=""
                id=""
                className="form-control"
                onChange={(e) => SetCategory(e.target.value)}
              >
                {categories.map((value) => {
                  return (
                    <option key={value._id} value={value._id}>
                      {value.name}
                    </option>
                  );
                })}
              </select>
              <br />
              <CategoryForm
                name={name}
                setname={setname}
                handleSubmit={handleSubmit}
              />
            </div>
            <br />
            <LocalSearch
              keyword={keyword}
              handleSearchChange={handleSearchChange}
              setkeyword={setkeyword}
            />
            <br />
            {Subcategories.map((c) => {
              return (
                <div className="alert alert-secondary">
                  {c.name}
                  <span className="btn btn-sm float-end">
                    <DeleteOutlined
                      className="text-danger"
                      onClick={() => handleRemove(c.slug)}
                    />
                  </span>
                  <Link to={`${c.slug}`}>
                    <span className="btn btn-sm float-end">
                      <EditOutlined className="text-danger" />
                    </span>
                  </Link>
                </div>
              );
            })}

            {/* {categories.filter(searched(keyword)).map((value) => {
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
          */}
          </div>
        </div>
      </div>
    </>
  );
}

export default SubCreate;
