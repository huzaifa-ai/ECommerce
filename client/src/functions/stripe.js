import axios from 'axios';

export const createPaymentIntent = async (authToken) => {
  return await axios.post(
    'http://localhost:8000/api/createPaymentIntent',
    {},
    { headers: { authToken } }
  );
};
