import React from 'react';
import { Drawer, Button } from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

function SideDrawer() {
  const dispatch = useDispatch();
  const { drawer, cart } = useSelector((state) => ({ ...state }));
  return (
    <Drawer
      title="Cart"
      placement="right"
      closable={false}
      onClose={() => {
        dispatch({
          type: 'SET_VISIBLE',
          payload: false,
        });
      }}
      visible={drawer}
    >
      {cart.map((p) => {
        return (
          <div className="row">
            <div className="col-12">
              {p.images.length && (
                <img
                  style={{ width: '100%', height: '100px', objectFit: 'cover' }}
                  src={p.images[0].url}
                  alt=""
                />
              )}
              <p className="text-center text-light bg-secondary">
                {p.title} x {p.count}
              </p>
            </div>
          </div>
        );
      })}
      <Link to="/cart" className="text-center">
        <button
          className=" btn btn-dark"
          onClick={() =>
            dispatch({
              type: 'SET_VISIBLE',
              payload: false,
            })
          }
        >
          Checkout
        </button>
      </Link>
    </Drawer>
  );
}

export default SideDrawer;
