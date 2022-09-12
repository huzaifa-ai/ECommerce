import { async } from '@firebase/util';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { auth } from '../../Firebase';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Forgotpassword = () => {
  const [email, setemail] = useState('');
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) {
      navigate('/');
    }
  }, [user]);

  const redirect = 'http://localhost:3000/login';

  const handlesubmit = async (e) => {
    e.PreventDefault();
    setloading(true);

    const config = {
      redirect,
      handleCodeInApp: true,
    };

    await auth
      .sendPasswordResetEmail(email, config)
      .then(() => {
        setemail('');
        setloading(false);
        toast.success('Email Dekh Londay');
      })
      .catch((error) => {
        setloading(false);
        toast.error('Error sending ');
        console.log(error);
      });
  };

  return (
    <div className="container col-md-6 offset-md-3 p-5">
      {loading ? <h4>Loading</h4> : <h4>Forgot Password</h4>}
      <form onSubmit={handlesubmit}>
        <input
          type="email"
          className="form-control"
          name=""
          id=""
          placeholder="Type your Email"
          value={email}
          onChange={(e) => {
            setemail(e.target.value);
          }}
        />
        <button className="btn btn-danger mt-2 btn-raised" disabled={!email}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Forgotpassword;
