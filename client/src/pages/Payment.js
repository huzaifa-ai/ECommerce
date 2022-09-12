import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import '../stripe.css';
import StripeCheckout from '../Components/stripe/StripeCheckout';

// Loading stripe outside render

const promise = loadStripe(
  'pk_test_51LcqBoLoq06UcIXYXftOJ3wspvadLnPS4cyELDnu2CH6JFZmMZcRirtTqFml2ZQZ68Jb5oyHAqHBbzVbuNvuX7ou00lJkuOIKW'
);

function Payment() {
  return (
    <div className="container p-5 text-center">
      <h4>Complete your purchase</h4>
      <Elements stripe={promise}>
        <div className="col-md-8 offset-md-2">
          <StripeCheckout />
        </div>
      </Elements>
    </div>
  );
}

export default Payment;
