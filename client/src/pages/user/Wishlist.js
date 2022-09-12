import React from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import UserNav from '../../Components/nav/UserNav';

function Wishlist() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-2 ">
          <UserNav />
        </div>
        <div className="col">User Wishlist page</div>
      </div>
    </div>
  );
}

export default Wishlist;
