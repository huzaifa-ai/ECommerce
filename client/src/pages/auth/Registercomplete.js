import { async } from '@firebase/util';
import React, { useEffect, useState } from 'react';
import { createorUpdateUser } from '../../functions/auth';
import { toast } from 'react-toastify';
import { auth } from '../../Firebase';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useDispatch } from 'react-redux';

function Completeregister() {
  const [email, setemail] = useState('');
  const [pass, setpass] = useState('');
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  useEffect(() => {
    setemail(window.localStorage.getItem('email'));
  }, []);

  const handlesubmit = async (e) => {
    e.preventDefault();
    if (!pass || !email) {
      toast.error('Password required for registration!');
      return;
    }
    if (pass.length < 6) {
      toast.error('Password must be of 6 characters');
      return;
    }

    try {
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );

      if (result.user.emailVerified) {
        window.localStorage.removeItem('email');
        let user = auth.currentUser;
        await user.updatePassword(pass);
        const tokenresult = await user.getIdTokenResult();
        createorUpdateUser(tokenresult.token).then((res) => {
          dispatch({
            type: 'LOGGED_IN_USER',
            payload: {
              token: tokenresult.token,
              email: res.data.email,
              name: res.data.name,
              role: res.data.role,
              _id: res.data._id,
            },
          });
        });
        console.log(tokenresult);
        navigate('/');
      }
    } catch (err) {
      toast.error(err);
    }
    setpass('');
  };

  const completeregisterForm = () => (
    <form onSubmit={handlesubmit}>
      <input type="email" className="form-control" value={email} disabled />
      <input
        placeholder="Enter password"
        type="password"
        className="form-control "
        value={pass}
        autoFocus
        onChange={(e) => setpass(e.target.value)}
      />

      <button type="submit" className="btn btn-danger btn-raised m-3">
        Complete Registration
      </button>
    </form>
  );

  return (
    <>
      <div className="container p-5">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h4>Register</h4>
            {completeregisterForm()}
          </div>
        </div>
      </div>
    </>
  );
}

export default Completeregister;
