import React from 'react';
import ModalImage from 'react-modal-image';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { toast } from 'react-toastify';

function ProductCardInCheckout({ p }) {
  const colors = ['Black', 'Blue', 'White', 'Brown', 'Yellow'];
  const [count, setcount] = useState(p.count);
  const dispatch = useDispatch();

  const handleQuantityChange = (e) => {
    const value = e.target.value < 1 ? 1 : e.target.value;

    if (e.target.value > p.quantity) {
      toast.error('Products Availability limit reached');
      return;
    }

    let cart = [];
    if (window !== 'undefined') {
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
      }
      cart.map((product, i) => {
        if (product._id == p._id) {
          cart[i].count = value;
        }
      });
      localStorage.setItem('cart', JSON.stringify(cart));
      dispatch({
        type: 'ADD_TO_CART',
        payload: cart,
      });
    }
  };

  const handleColorChange = (e) => {
    let cart = [];
    if (window !== 'undefined') {
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
      }
      cart.map((product, i) => {
        if (product._id == p._id) {
          cart[i].color = e.target.value;
        }
      });
      localStorage.setItem('cart', JSON.stringify(cart));
      dispatch({
        type: 'ADD_TO_CART',
        payload: cart,
      });
    }
  };

  const handleDelete = () => {
    let cart = [];
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
      }
      cart.map((product, i) => {
        if (product._id == p._id) {
          cart.splice(i, 1);
        }
      });
      localStorage.setItem('cart', JSON.stringify(cart));
      dispatch({
        type: 'ADD_TO_CART',
        payload: cart,
      });
    }
  };

  return (
    <tbody>
      <tr>
        <td>
          <div style={{ width: '100px', height: 'auto', margin: 'auto' }}>
            {p.images.length && (
              <ModalImage small={p.images[0].url} large={p.images[0].url} />
            )}
          </div>
        </td>
        <td>{p.title}</td>
        <td>${p.price}</td>
        <td>{p.brand}</td>
        <td>
          <select className="form-control" onChange={handleColorChange}>
            {colors.map((c, i) => {
              return (
                <option key={i} value={c}>
                  {c}
                </option>
              );
            })}
          </select>
        </td>
        <td className="text-center" style={{ width: '10%' }}>
          <input
            type="number"
            className="form-control"
            value={p.count}
            onChange={handleQuantityChange}
          />
        </td>
        <td className="text-center">
          {p.shipping === 'Yes' ? (
            <CheckCircleOutlined className="text-success" />
          ) : (
            <CloseCircleOutlined className="text-danger" />
          )}
        </td>
        <td className="text-center">
          <DeleteOutlined
            className="text-danger"
            style={{ cursor: 'pointer' }}
            onClick={handleDelete}
          />
        </td>
      </tr>
    </tbody>
  );
}

export default ProductCardInCheckout;
