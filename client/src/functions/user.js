import axios from 'axios';

export const userCart = async (cart, authToken) => {
  return await axios.post(
    'http://localhost:8000/api/user/cart',
    { cart },
    { headers: { authToken } }
  );
};

export const getUserCart = async (authToken) => {
  return await axios.get('http://localhost:8000/api/user/cart', {
    headers: { authToken },
  });
};

export const DeleteCart = async (authToken) => {
  return await axios.delete('http://localhost:8000/api/user/cart', {
    headers: { authToken },
  });
};

export const SaveUserAddress = async (address, authToken) => {
  return await axios.post(
    'http://localhost:8000/api/user/address',
    { address },
    { headers: { authToken } }
  );
};

export const createOrder = async (stripeResponse, authToken) => {
  return await axios.post(
    'http://localhost:8000/api/user/order',
    { stripeResponse },
    { headers: { authToken } }
  );
};

export const userOrders = async (authToken) => {
  return await axios.get('http://localhost:8000/api/user/orders', {
    headers: { authToken },
  });
};
