import { async } from '@firebase/util';
import axios from 'axios';

export const CreateProduct = async (product, authtoken) => {
  return await axios.post('http://localhost:8000/api/product', product, {
    headers: { authtoken: authtoken },
  });
};

export const GetProducts = async (count) => {
  return await axios.get(`http://localhost:8000/api/products/${count}`);
};

export const SubCategory = async (_id) => {
  return await axios.get(`http://localhost:8000/api/category/sub/${_id}`);
};

export const ProductDelete = async (slug, authtoken) => {
  return await axios.delete(`http://localhost:8000/api/product/${slug}`, {
    headers: {
      authtoken: authtoken,
    },
  });
};

export const GetProductsNew = async (sort, order, page) => {
  return await axios.post('http://localhost:8000/api/products', {
    order: order,
    sort: sort,
    page: page,
  });
};

export const GetProductBest = async (sort, order, page) => {
  return await axios.post('http://localhost:8000/api/products', {
    order: order,
    sort: sort,
    page: page,
  });
};

export const GetProductsCount = async () => {
  return await axios.get('http://localhost:8000/api/products/total');
};

export const ViewProduct = async (slug) => {
  return await axios.get(`http://localhost:8000/api/product/${slug}`);
};

/*Ratings*/

export const SetRating = async (star, slug, authtoken) => {
  return await axios.post(
    `http://localhost:8000/api/products/star/${slug}`,
    { star: star },
    {
      headers: { authtoken: authtoken },
    }
  );
};

/*Related Products*/

export const RelatedProducts = (slug) => {
  return axios.get(`http://localhost:8000/api/products/related/${slug}`);
};

/*Get Products Based on Categories*/

export const CategoryProductList = async (slug) => {
  return await axios.get(`http://localhost:8000/api/category/products/${slug}`);
};

// Get Products on Filtering

export const FetchProductsFiltering = async (arg) => {
  return await axios.post('http://localhost:8000/api/search/filters', arg);
};
