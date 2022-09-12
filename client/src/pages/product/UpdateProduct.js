import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import AdminNav from '../../Components/nav/AdminNav';
import { CreateProduct, GetProducts } from '../../functions/product';
import { useSelector } from 'react-redux';
import { getCategories } from '../../functions/category';
import { SubCategory } from '../../functions/product';
import FIleUpload from '../../Components/forms/FIleUpload';
import { Select } from 'antd';
const { Option } = Select;

function UpdateProduct() {
  const { user } = useSelector((state) => ({ ...state }));
  const [suboptions, setsuboptions] = useState([]);
  const [ShowSub, setShowSub] = useState(false);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    loadCategories();
    console.log(values);
  }, []);
  const loadCategories = () => {
    getCategories().then((res) => {
      setvalues({ ...values, categories: res.data });
    });
  };
  const InitialState = {
    title: '',
    description: '',
    price: '',
    category: '',
    subs: [],
    shipping: '',
    quantity: '',
    categories: [],
    images: [],
    colors: ['Black', 'Brown', 'Silver', 'White', 'Blue'],
    brands: ['Apple', 'Samsung', 'Micrsoft', 'Lenovo', 'ASUS'],
    color: '',
    brand: '',
  };
  const [values, setvalues] = useState(InitialState);
  const handleSubmit = (e) => {
    e.preventDefault();
    CreateProduct(values, user.token)
      .then((res) => {
        window.alert('Product added');
        window.location.reload();
      })
      .catch((err) => {
        console.log(values);
        window.alert('Failed to add');
      });
  };

  const handleCategoryChange = (e) => {
    e.preventDefault();
    setvalues({ ...values, category: e.target.value });
    SubCategory(category).then((res) => {
      setsuboptions(res.data);
      setShowSub(true);
      console.log(suboptions);
    });
  };

  const {
    title,
    description,
    price,
    category,
    subs,
    shipping,
    quantity,
    categories,
    images,
    colors,
    brands,
    color,
    brand,
  } = values;

  const handleChange = (e) => {
    setvalues({ ...values, [e.target.name]: e.target.value });
    console.log(values);
    SubCategory(category)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-2">
          <AdminNav />
        </div>
        <div className="col-10">
          <br />
          <h4>Product Create</h4>
          <br />
          <div className="pb-3">
            <FIleUpload
              values={values}
              setvalues={setvalues}
              setloading={setloading}
            />
          </div>

          <form action="" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="">Title</label>

              <input
                type="text"
                name="title"
                id=""
                value={title}
                className="form-control"
                onChange={handleChange}
              />
              <div className="form-group">
                <label htmlFor="">Description</label>
                <input
                  type="text"
                  name="description"
                  id=""
                  value={description}
                  className="form-control"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="">Price</label>
                <input
                  type="number"
                  name="price"
                  id=""
                  value={price}
                  className="form-control"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="">Shipping</label>
                <select
                  name="shipping"
                  id=""
                  className="form-control"
                  onChange={handleChange}
                >
                  <option>Select One</option>

                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="">Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  id=""
                  value={quantity}
                  className="form-control"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="">Colors</label>

                <select
                  name="color"
                  id=""
                  className="form-control"
                  onChange={handleChange}
                >
                  <option>Select One</option>
                  {colors.map((c, index) => {
                    return (
                      <option value={c} key={index}>
                        {c}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="">Brands</label>
                <select
                  name="brand"
                  id=""
                  className="form-control"
                  onChange={handleChange}
                >
                  <option>Select One</option>
                  {brands.map((b, index) => {
                    return (
                      <option value={b} key={index}>
                        {b}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="">Category</label>
                <select
                  name="category"
                  id=""
                  className="form-control"
                  onChange={handleCategoryChange}
                >
                  <option>Select One</option>
                  {categories.map((b, index) => {
                    return (
                      <option value={b._id} key={b._id}>
                        {b.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div>
                <label htmlFor=""></label>
              </div>
              <div>
                <label htmlFor="">Sub Categories</label>
                <Select
                  mode="multiple"
                  style={{ width: '100%' }}
                  placeholder="Please Select the value"
                  value={subs}
                  onChange={(value) => setvalues({ ...values, subs: value })}
                >
                  {suboptions.length &&
                    suboptions.map((c, index) => {
                      return (
                        <>
                          <Option value={c._id} key={index}>
                            {c.name}
                          </Option>
                        </>
                      );
                    })}
                </Select>
              </div>
              <br />
              <button className="btn btn-outline-info ">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateProduc;
