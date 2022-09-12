import { async } from '@firebase/util';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Button } from 'antd';
import { MailOutlined, GoogleOutlined } from '@ant-design/icons';
import { auth, googleauth } from '../../Firebase';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { createorUpdateUser } from '../../functions/auth';
import './auth.css';

function Login() {
  const [email, setemail] = useState('');
  const [pass, setpass] = useState('');
  const [loading, setloading] = useState(false);
  const dispatch = useDispatch();
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

  const roleBasedRedirect = (res) => {
    if (res.data.role === 'admin') {
      navigate('/admin/dashboard');
    } else {
      navigate('/user/history');
    }
  };

  // Logging user with email
  const handlesubmit = async (e) => {
    setloading(true);
    try {
      const result = await auth.signInWithEmailAndPassword(email, pass);
      console.log(result);
      const user = result.user;
      const idtoken = await user.getIdTokenResult();

      createorUpdateUser(idtoken.token)
        .then((res) => {
          dispatch({
            type: 'LOGGED_IN_USER',
            payload: {
              token: idtoken.token,
              email: res.data.email,
              name: res.data.name,
              role: res.data.role,
              _id: res.data._id,
            },
          });
          // Role based redirect
          roleBasedRedirect(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      toast.error(err);
      setloading(false);
    }
  };

  // Google signin
  const googlesigin = async () => {
    auth
      .signInWithPopup(googleauth)
      .then(async (result) => {
        const user = result.user;
        const getidtoken = await user.getIdTokenResult();

        createorUpdateUser(getidtoken.token)
          .then((res) => {
            dispatch({
              type: 'LOGGED_IN_USER',
              payload: {
                token: getidtoken.token,
                email: res.data.email,
                name: res.data.name,
                role: res.data.role,
                _id: res.data._id,
              },
            });
            roleBasedRedirect(res);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  const LoginForm = () => (
    <div>
      <div className="form-group">
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setemail(e.target.value)}
          placeholder="Enter Your Email"
        />
      </div>

      <div className="form-group mt-2 ">
        <input
          type="password"
          className="form-control"
          value={pass}
          onChange={(e) => setpass(e.target.value)}
          placeholder="Enter Your Password"
        />
      </div>

      <br />
      <Button
        onClick={handlesubmit}
        type="primary"
        className="mb-3"
        block
        icon={<MailOutlined />}
        size="large"
        disabled={!email || pass.length < 6}
        shape="round"
      >
        Login
      </Button>
    </div>
  );

  return (
    <>
      <div
        className="container-fluid d-grid align-items-center login-container"
        style={{ height: '100vh' }}
      >
        <div className="col-md-5 col-10 m-auto login-row  ">
          <div className="col-md-10 col-8 m-auto">
            {loading ? (
              <h4>Loading..</h4>
            ) : (
              <p className="text-danger text-center display-6 text-uppercase text-body">
                Login
              </p>
            )}

            {LoginForm()}

            <Button
              type="danger"
              className="mb-3"
              block
              icon={<GoogleOutlined />}
              size="large"
              shape="round"
              onClick={googlesigin}
            >
              Google Login
            </Button>

            <Link to="/forgot/password" className="float-right text-danger">
              Forgot Password
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
