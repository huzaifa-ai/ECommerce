import React, { useEffect, useState } from 'react';
import AdminNav from '../../../Components/nav/AdminNav';
import CategoryForm from '../../../Components/forms/CategoryForm';
import { useNavigate, useParams } from 'react-router-dom';
import { async } from '@firebase/util';
import { UpdateSub, SubCategory } from '../../../functions/sub';
import { useSelector } from 'react-redux';
import { getCategories } from '../../../functions/category';

function SubUpdate() {
  const [name, setname] = useState('');
  const [sub, setsub] = useState('');
  const [parent, setparent] = useState('');
  const [categories, setcategories] = useState([]);
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));
  let slug = useParams().slug;

  const loadSub = () => {
    SubCategory(slug)
      .then((res) => {
        setsub(res.data.name);
        setparent(res.data.parent);
      })
      .catch((err) => console.log(err));
  };

  const loadCategories = () => {
    getCategories()
      .then((res) => {
        setcategories(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadSub();
    loadCategories();
    console.log(categories);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    UpdateSub(slug, name, user.token).then((res) => {
      console.log('Update complete', res);
      navigate('/admin/sub');
    });
  };

  return (
    <>
      <div className="container">
        <br />
        <div className="row">
          <div className="col-8 m-auto">
            <h1>Update sub Category</h1>
            Parent Category
            <select name="" id="" className="form-control">
              {categories.map((c) => {
                return (
                  <option key={c.value} selected={c._id === parent}>
                    {c.name}
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
        </div>
      </div>
    </>
  );
}

export default SubUpdate;
