import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { auth } from '../../Firebase';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
function Register() {
  const [email, setemail] = useState('');
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.role === 'subscriber') {
      navigate('/user/history');
    }
    if (user && user.role === 'admin') {
      navigate('/admin/dashboard');
    }
  }, [user]);

  const handlesubmit = async (e) => {
    e.preventDefault();

    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };
    await auth.sendSignInLinkToEmail(email, config);
    toast.success(`Email sent to ${email} Click to complete registration`);

    window.localStorage.setItem('email', email);
    setemail('');
  };

  const registerForm = () => (
    <form onSubmit={handlesubmit}>
      <input
        type="email"
        className="form-control"
        value={email}
        onChange={(e) => setemail(e.target.value)}
        autoFocus
      />
      <br />
      <button type="submit" className="btn btn-danger btn-raised ">
        Register
      </button>
    </form>
  );

  return (
    <>
      <div className="container p-5">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h4>Register</h4>
            {registerForm()}
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
