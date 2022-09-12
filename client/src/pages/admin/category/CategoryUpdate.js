import React, { useEffect, useState } from 'react';
import AdminNav from '../../../Components/nav/AdminNav';
import { toast } from 'react-toastify';
import { getCategory, updateCategory } from '../../../functions/category';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import CategoryForm from '../../../Components/forms/CategoryForm';

function CategoryUpdate() {
  const { user } = useSelector((state) => ({ ...state }));
  const [name, setname] = useState('');
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();

  let slug = useParams().slug;
  useEffect(() => {
    console.log(slug);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name);
    setloading(true);
    updateCategory(slug, name, user.token)
      .then((res) => {
        setloading(false);
        toast.success('Category Update Successfull');
        navigate('/admin/category');
      })
      .catch((err) => {
        setloading(false);
        toast.error('Failed to Update');
      });
  };

  return (
    <>
      <div className="row">
        <div className="col-10 mx-auto">
          <br />
          <h1>Update Category</h1>
          {
            <CategoryForm
              handleSubmit={handleSubmit}
              name={name}
              setname={setname}
            />
          }
        </div>
      </div>
    </>
  );
}

export default CategoryUpdate;
