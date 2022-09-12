import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SearchOutlined } from '@ant-design/icons';

function Search() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  const handleChange = (e) => {
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: e.target.value },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/shop?${text}`);
  };

  return (
    <form className="d-flex align-items-center p-1 " onSubmit={handleSubmit}>
      <input
        onChange={handleChange}
        type="text"
        value={text}
        className="form-control me-2"
        placeholder="Search"
      />
      <SearchOutlined onClick={handleSubmit} style={{ cursor: 'pointer' }} />
    </form>
  );
}

export default Search;
