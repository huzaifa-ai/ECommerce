import React, { useEffect, useState } from 'react';
import AdminNav from '../../Components/nav/AdminNav';
import { GetProducts } from '../../functions/product';
import AdminProductdCard from '../../Components/cards/AdminProductdCard';
import { AllOrders } from '../../functions/admin';
import { useSelector } from 'react-redux';
import { Status } from '../../functions/admin';
import { toast } from 'react-toastify';
import Orders from '../../Components/order/Orders';

function AdminDashboard() {
  const { user } = useSelector((state) => ({ ...state }));
  const [orders, setorders] = useState([]);
  // const [Products, setProducts] = useState([]);
  // const [loading, setLoading] = useState(false);
  // useEffect(() => {
  //   loadAllProducts();
  // }, []);

  // const loadAllProducts = () => {
  //   setLoading(true);
  //   GetProducts(10)
  //     .then((res) => {
  //       setLoading(false);
  //       setProducts(res.data);
  //       console.log(Products);
  //       setLoading(false);
  //     })
  //     .catch((err) => console.log(err));
  // };

  useEffect(() => {
    AllOrders(user.token).then((res) => {
      setorders(res.data);
    });
  }, []);

  const handleStatus = (orderId, orderStatus) => {
    Status(user.token, orderId, orderStatus).then((res) => {
      toast.success('Status updates');
    });
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-2  ">
            <AdminNav />
          </div>
          <div className="col">
            <h4>Admin Dashboard</h4>
            <Orders orders={orders} handleStatus={handleStatus} />
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
