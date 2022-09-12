import React from 'react';

function ShowPaymentInfo({ payment, showStatus = true }) {
  return (
    <p>
      <span>Order Id: {payment.paymentIntent.id}</span> {' / '}
      <span>
        Amount:
        {(payment.paymentIntent.amount /= 100).toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
        })}
      </span>
      {' / '}
      {''}
      <span>Currency: {payment.paymentIntent.currency.toUpperCase()}</span>{' '}
      {' / '}
      <span>Payment: {payment.paymentIntent.status.toUpperCase()}</span>
      <br />
      {showStatus && (
        <span className="badge bg-primary text-white">
          Status: {payment.orderStatus}
        </span>
      )}
    </p>
  );
}

export default ShowPaymentInfo;
