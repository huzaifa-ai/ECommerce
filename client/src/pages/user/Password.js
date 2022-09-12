import { async } from '@firebase/util';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import UserNav from '../../Components/nav/UserNav';
import { auth } from '../../Firebase';

function Password() {
  const [password, setpassword] = useState('');
  const [loading, setloading] = useState(false);

  const handlesubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    await auth.currentUser
      .updatePassword(password)
      .then(() => {
        setloading(false);
        toast.success('Password updated');
      })
      .catch((e) => {
        setloading(false);
        toast.error('Failed to update');
        console.log(e);
      });
  };

  const PasswordupdateForm = () => (
    <form onSubmit={handlesubmit}>
      <div className="form-group">
        <label>Your Password</label>
        <input
          disabled={loading}
          type="password"
          name=""
          id=""
          onChange={(e) => setpassword(e.target.value)}
          className="form-control"
          placeholder="Enter new password"
          value={password}
        />
        <button
          className="btn btn-primary my-2"
          disabled={!password || password.length < 6 || loading}
        >
          Submit
        </button>
      </div>
    </form>
  );

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-2 ">
          <UserNav />
        </div>
        <div className="col my-3">
          {loading ? (
            <h4 className="text-danger">Loading</h4>
          ) : (
            <h4>Password Update</h4>
          )}
          {PasswordupdateForm()}
        </div>
      </div>
    </div>
  );
}

export default Password;
