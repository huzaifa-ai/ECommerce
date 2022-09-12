import axios from 'axios';

export const getCategories = async () => {
  const URL = 'http://localhost:8000/api/categories';
  return await axios.get(URL);
};

export const getCategory = async (slug) => {
  const URL = `http://localhost:8000/api/category/${slug}`;
  return await axios.get(URL);
};

export const removeCategory = async (slug, authtoken) => {
  const URL = `http://localhost:8000/api/DeleteCategory/${slug}`;
  return await axios.delete(URL, { headers: { authtoken: authtoken } });
};

export const updateCategory = async (slug, category, authtoken) => {
  const URL = `http://localhost:8000/api/UpdateCategory/${slug}`;
  return await axios.put(
    URL,
    { name: category },
    { headers: { authtoken: authtoken } }
  );
};

export const createCategory = async (category, authtoken) => {
  const URL = 'http://localhost:8000/api/category';
  return await axios.post(
    URL,
    { name: category },
    { headers: { authtoken: authtoken } }
  );
};
