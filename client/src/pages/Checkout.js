import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { getUserCart } from '../functions/user';
import { DeleteCart } from '../functions/user';
import { SaveUserAddress } from '../functions/user';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';

function Checkout() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState('');
  const [addressSaved, setAddressSaved] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  useEffect(() => {
    getUserCart(user.token).then((res) => {
      console.log(res.data);
      setProducts(res.data.products);
      setTotal(res.data.CartTotal);
    });
  }, []);

  const EmptyCart = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('cart');
    }

    dispatch({
      type: 'ADD_TO_CART',
      payload: [],
    });

    DeleteCart(user.token).then((res) => {
      console.log(res);
      setProducts([]);
      setTotal(0);
    });
    toast.success('Cart is Empty.');
  };

  const Savetobackend = () => {
    console.log(address);
    SaveUserAddress(address, user.token).then((res) => {
      if (res.data.ok) {
        setAddressSaved(true);
        toast.success('Address Saved');
      }
    });
  };

  return (
    <div className="row p-4">
      <div className="col-6">
        <p className="bg-light py-3 text-center display-6">Billing Address</p>
        <br />

        <ReactQuill theme="snow" value={address} onChange={setAddress} />
        <button className="btn btn-primary mt-2" onClick={Savetobackend}>
          Save
        </button>

        <br />
      </div>
      <div className="col-6 order-summary">
        <h4>Order Summary</h4>
        <hr />
        <p>Products {products.length} </p>
        <hr />
        {products.map((p, i) => {
          return (
            <div key={i}>
              {p.product.title} ({p.color}) x {p.count} = ${p.price * p.count}
            </div>
          );
        })}
        <hr />
        <p className="bg-light pt-3 pb-3">Cart Total: ${total}</p>

        <div className="row">
          <div className="col-12">
            <button
              className="btn btn-primary"
              disabled={!addressSaved}
              onClick={() => navigate('/payment')}
              style={{ display: 'block', width: '100%' }}
            >
              Place Order
            </button>
          </div>
          <div className="col-12 mt-2">
            <button
              className="btn btn-primary"
              onClick={EmptyCart}
              style={{ display: 'block', width: '100%' }}
            >
              Empty Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
