import React, { useEffect, useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useSelector, useDispatch } from 'react-redux';
import { createPaymentIntent } from '../../functions/stripe';
import { Link } from 'react-router-dom';
import { Card } from 'antd';
import { DollarOutlined, CheckCircleOutlined } from '@ant-design/icons';
import blankimages from '../../blankimages/images.png';
import { createOrder } from '../../functions/user';
import { DeleteCart } from '../../functions/user';

export default function StripeCheckout() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));

  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);

  const [processing, setProcessing] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState('');
  const [totalCart, setTotalCart] = useState(0);

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    createPaymentIntent(user.token).then((res) => {
      console.log('Create payment Intent', res.data);
      setClientSecret(res.data.clientSecret);
      setTotalCart(res.data.CartTotal);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: e.target.name.value,
        },
      },
    });
    if (payload.error) {
      setError('Payment Failed');
      setProcessing(false);
    } else {
      createOrder(payload, user.token).then((res) => {
        console.log(res.data);
        if (res.data) {
          DeleteCart(user.token).then((res) => console.log('Cart Removed'));
          localStorage.removeItem('cart');
          dispatch({
            type: 'ADD_TO_CART',
            payload: [],
          });
        }
      });
      console.log(JSON.stringify(payload));
      setError(false);
      setProcessing(false);
      setSucceeded(true);
    }
  };
  const handleChange = (e) => {
    setDisabled(false);
    setError(e.error ? e.error.message : '');
  };

  const cardStyle = {
    style: {
      base: {
        color: '#32325d',
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#32325d',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    },
  };

  return (
    <>
      <p className={succeeded ? 'result-message' : 'result-message hidden'}>
        Payment Successful{' '}
        <Link to="/user/history">See it in your dashboard</Link>
      </p>

      <div className="text-center pb-5">
        <Card
          cover={
            <img
              src={blankimages}
              style={{
                height: '200px',
                objectFit: 'Cover',
                marginBottom: '-50px',
              }}
            />
          }
          actions={[
            <>
              <DollarOutlined className="text-success" /> <br />
              CartTotal: {totalCart}$
            </>,
          ]}
        />
      </div>

      <form
        action=""
        id="payment-form"
        className="stripe-form"
        onSubmit={handleSubmit}
      >
        <CardElement
          id="card-element"
          options={cardStyle}
          onChange={handleChange}
        />
        <button
          className="stripe-button"
          disabled={processing || succeeded || disabled}
        >
          <span id="button-text">
            {processing ? <div className="spinner" id="spinner"></div> : 'Pay'}
          </span>
        </button>
        {error && (
          <div className="card-error mt-4" role={alert}>
            {error}
          </div>
        )}
      </form>
    </>
  );
}
