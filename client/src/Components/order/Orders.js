import React from 'react';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import ShowPaymentInfo from '../cards/ShowPaymentInfo';

function Orders({ orders, handleStatus }) {
  return (
    <>
      {orders.map((order, index) => {
        return (
          <div key={index} className="row  pt-5">
            <div className="btn btn-block bg-light">
              <ShowPaymentInfo payment={order} showStatus={false} />
              <div className="row">
                <div className="col-md-4">Delivery Status</div>
                <div className="col-md-6">
                  <select
                    onChange={(e) => {
                      handleStatus(order._id, e.target.value);
                    }}
                    className="form-control"
                    defaultValue={order.orderStatus}
                    name="status"
                  >
                    <option value="Not Processed">Not Processed</option>
                    <option value="Processing">Processing</option>
                    <option value="Dispatched">Dispatched</option>
                    <option value="Cancelled">Cancelled</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default Orders;
