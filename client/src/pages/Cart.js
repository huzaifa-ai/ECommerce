import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ProductCardInCheckout from '../Components/cards/ProductCardInCheckout';
import { useNavigate } from 'react-router-dom';
import { userCart } from '../functions/user';

function Cart() {
  const { cart, user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getTotal = () => {
    return cart.reduce((currentvalue, nextvalue) => {
      return currentvalue + nextvalue.count * nextvalue.price;
    }, 0);
  };

  const ShowCartItems = () => {
    return (
      <table className="table table-bordered">
        <thead>
          <tr className="table-light">
            <th scope="col">Image</th>
            <th scope="col">Title</th>
            <th scope="col">Price</th>
            <th scope="col">Brand</th>
            <th scope="col">Color</th>
            <th scope="col">Count</th>
            <th scope="col">Shipping</th>
            <th scope="col">Remove</th>
          </tr>
        </thead>
        {cart.map((p) => {
          return <ProductCardInCheckout key={p._id} p={p} />;
        })}
      </table>
    );
  };

  const saveOrdertoDB = () => {
    userCart(cart, user.token)
      .then((res) => {
        console.log(res.data);
        if (res.data.ok) {
          navigate('/checkout');
        }
      })
      .catch((err) => console.log('cart save error', err));
  };

  return (
    <div className="container-fluid">
      <div className="row pt-5">
        <div className="col-lg-8 col-12">
          <h4>Cart / {cart.length} Product</h4>
          {!cart.length ? (
            <p>
              No Products in cart.<Link to="/shop"> Continue Shopping</Link>
            </p>
          ) : (
            ShowCartItems()
          )}
        </div>
        <div className="col-lg-4 col-12">
          <h4>Order summary</h4>
          <hr />
          <p>Total Products</p>
          {cart.map((c, i) => {
            return (
              <>
                <div key={i}>
                  <p>
                    {c.title} x {c.count} = ${c.price * c.count}
                  </p>
                </div>
              </>
            );
          })}
          <hr />
          Total: <b>${getTotal()}</b>
          <hr />
          {user ? (
            <button
              className="btn btn-sm btn-dark"
              onClick={saveOrdertoDB}
              disabled={!user}
            >
              Proceed to checkout
            </button>
          ) : (
            <Link to="/login">Login to proceed</Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;
