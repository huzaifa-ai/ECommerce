import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import 'react-toastify/dist/ReactToastify.css';
import Completeregister from './pages/auth/Registercomplete';
import { auth } from './Firebase';
import { useDispatch } from 'react-redux';
import Forgotpassword from './pages/auth/ForgotPassword';
import { useSelector } from 'react-redux';
import { currentUser } from './functions/auth';
import SideDrawer from './Components/drawer/SideDrawer';
import History from './pages/user/History';
import { Navigate } from 'react-router-dom';
import UserRoute from './Components/routes/UserRoute';
import { useNavigate } from 'react-router-dom';
import LoadingtoRedirect from './Components/routes/LoadingtoRedirect';
import Password from './pages/user/Password';
import Wishlist from './pages/user/Wishlist';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminRoute from './Components/routes/AdminRoute';
import CategoryCreate from './pages/admin/category/CategoryCreate';
import CategoryUpdate from './pages/admin/category/CategoryUpdate';
import SubCreate from './pages/admin/sub/SubCreate';
import SubUpdate from './pages/admin/sub/SubUpdate';
import ProductCreate from './pages/product/ProductCreate';
import AllProducts from './pages/product/AllProducts';
import Home from './pages/Home';
import { ToastContainer } from 'react-toastify';
import Product from './pages/Product';
import CategoryProducts from './pages/CategoryProducts';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Payment from './pages/Payment';

import Header from './Components/nav/header';
import { useEffect } from 'react';
function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const getidtoken = await user.getIdTokenResult();

        currentUser(getidtoken.token)
          .then((res) => {
            console.log(res);
            dispatch({
              type: 'LOGGED_IN_USER',
              payload: {
                email: res.data.email,
                name: res.data.name,
                role: res.data.role,
                token: getidtoken.token,
                _id: res.data._id,
              },
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });

    //Clean up function
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <>
              <Header /> <Home /> <ToastContainer /> <SideDrawer />
            </>
          }
        />
        <Route
          exact
          path="/login"
          element={
            <>
              <Header /> <Login /> <ToastContainer /> <SideDrawer />
            </>
          }
        />
        <Route
          exact
          path="/register"
          element={
            <>
              <Header /> <Register /> <ToastContainer /> <SideDrawer />
            </>
          }
        />
        <Route
          exact
          path="/register/complete"
          element={
            <>
              {' '}
              <Header /> <Completeregister /> <ToastContainer /> <SideDrawer />{' '}
            </>
          }
        />

        <Route
          exact
          path="/forgot/password"
          element={
            <>
              {' '}
              <Header /> <Forgotpassword /> <ToastContainer /> <SideDrawer />{' '}
            </>
          }
        />
        <Route
          exact
          path="/user/history"
          element={
            <UserRoute>
              <Header />
              <History />
              <ToastContainer />
              <SideDrawer />
            </UserRoute>
          }
        />

        <Route
          exact
          path="/user/password"
          element={
            <UserRoute>
              <Header />
              <Password />
              <ToastContainer />
              <SideDrawer />
            </UserRoute>
          }
        />
        <Route
          exact
          path="/user/wishlist"
          element={
            <UserRoute>
              <Header />
              <Wishlist />
              <ToastContainer />
              <SideDrawer />
            </UserRoute>
          }
        />
        <Route
          exact
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <Header />
              <AdminDashboard />
              <ToastContainer />
              <SideDrawer />
            </AdminRoute>
          }
        />
        <Route
          exact
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <Header />
              <AdminDashboard />
              <ToastContainer />
              <SideDrawer />
            </AdminRoute>
          }
        />
        <Route
          exact
          path="/admin/category"
          element={
            <AdminRoute>
              <Header />
              <CategoryCreate />
              <ToastContainer />
              <SideDrawer />
            </AdminRoute>
          }
        />
        <Route
          exact
          path="/admin/category/:slug"
          element={
            <AdminRoute>
              <Header />
              <CategoryUpdate />
              <ToastContainer />
              <SideDrawer />
            </AdminRoute>
          }
        />
        <Route
          exact
          path="/admin/sub"
          element={
            <AdminRoute>
              <Header />
              <SubCreate />
              <ToastContainer />
              <SideDrawer />
            </AdminRoute>
          }
        />
        <Route
          exact
          path="/admin/sub/:slug"
          element={
            <AdminRoute>
              <Header />
              <SubUpdate />
              <ToastContainer />
              <SideDrawer />
            </AdminRoute>
          }
        />
        <Route
          exact
          path="/admin/product"
          element={
            <AdminRoute>
              <Header />
              <ProductCreate />
              <ToastContainer />
              <SideDrawer />
            </AdminRoute>
          }
        />
        <Route
          exact
          path="/admin/products"
          element={
            <AdminRoute>
              <Header />
              <AllProducts />
              <ToastContainer />
              <SideDrawer />
            </AdminRoute>
          }
        />
        <Route
          exact
          path="/product/:slug"
          element={
            <>
              <Header />
              <Product />
              <ToastContainer />
              <SideDrawer />
            </>
          }
        />
        <Route
          exact
          path="/category/:slug"
          element={
            <>
              <Header />
              <CategoryProducts />
              <ToastContainer />
              <SideDrawer />
            </>
          }
        />
        <Route
          exact
          path="/shop"
          element={
            <>
              <Header />
              <Shop />
              <ToastContainer />
              <SideDrawer />
            </>
          }
        />
        <Route
          exact
          path="/cart"
          element={
            <>
              <Header />
              <Cart />
              <ToastContainer />
              <SideDrawer />
            </>
          }
        />
        <Route
          exact
          path="/checkout"
          element={
            <>
              <Header />
              <Checkout />
              <ToastContainer />
              <SideDrawer />
            </>
          }
        />
        <Route
          exact
          path="/payment"
          element={
            <>
              <Header />
              <Payment />
              <ToastContainer />
              <SideDrawer />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
