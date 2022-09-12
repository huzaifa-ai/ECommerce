import axios from 'axios';

export const SubCategories = async () => {
  const URL = 'http://localhost:8000/api/subs';
  return await axios.get(URL);
};

export const SubCategory = async (slug) => {
  const URL = `http://localhost:8000/api/sub/${slug}`;
  return await axios.get(URL);
};

export const RemoveSub = async (slug, authtoken) => {
  const URL = `http://localhost:8000/api/sub/${slug}`;
  return await axios.delete(URL, { headers: { authtoken: authtoken } });
};

export const UpdateSub = async (slug, sub, authtoken) => {
  const URL = `http://localhost:8000/api/sub/${slug}`;
  return await axios.put(
    URL,
    { name: sub },
    { headers: { authtoken: authtoken } }
  );
};

export const CreateSub = async (sub, category, authtoken) => {
  const URL = 'http://localhost:8000/api/sub';
  return await axios.post(
    URL,
    { name: sub, parent: category },
    { headers: { authtoken: authtoken } }
  );
};
