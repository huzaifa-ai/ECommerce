import axios from 'axios';

export const AllOrders = async (authToken) => {
  return await axios.get('http://localhost:8000/api/admin/orders', {
    headers: { authToken },
  });
};

export const Status = async (authToken, orderID, orderStatus) => {
  return await axios.put(
    'http://localhost:8000/api/admin/orderStatus',
    {
      headers: { authToken },
    },
    {
      orderID,
      orderStatus,
    }
  );
};
