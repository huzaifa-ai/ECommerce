import React, { useEffect, useState } from 'react';
import { Menu, Badge } from 'antd';
import { Link } from 'react-router-dom';
import { auth } from '../../Firebase';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Search from '../forms/Search';

import {
  MailOutlined,
  AppstoreOutlined,
  HomeOutlined,
  SettingOutlined,
  SearchOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';

const { SubMenu } = Menu;

function Header() {
  const [current, setcurrent] = useState('home');
  const { user, cart } = useSelector((state) => ({ ...state }));
  useEffect(() => {}, [user]);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logout = async () => {
    auth.signOut();
    dispatch({
      type: 'LOGOUT',
      payload: null,
    });
    // Redirecting to Hoome page
    navigate('/');
  };

  const users = auth.currentUser;

  const handleClick = (e) => {
    setcurrent(e.key);
  };
  const { SubMenu, Item } = Menu;

  return (
    <>
      <Menu
        onClick={handleClick}
        selectedKeys={[current]}
        mode="horizontal"
        className="d-flex"
      >
        <Item key="home" icon={<HomeOutlined />}>
          <Link to="/"> Home </Link>
        </Item>
        <Item key="shop" icon={<ShoppingOutlined />}>
          <Link to="/shop"> Shop </Link>
        </Item>
        {user && (
          <>
            <Item key="cart" icon={<ShoppingCartOutlined />}>
              <Link to="/cart">
                <Badge count={cart.length} offset={[9, 0]}>
                  Cart
                </Badge>
              </Link>
            </Item>
          </>
        )}
        {!user && (
          <>
            <Item key="Login" icon={<HomeOutlined />}>
              <Link to="/login"> Login</Link>
            </Item>

            <Item key="Register" icon={<HomeOutlined />}>
              <Link to="/register"> Register</Link>
            </Item>
          </>
        )}

        <SubMenu
          key="SubMenu"
          icon={<SettingOutlined />}
          title={user ? user.email : 'username'}
        >
          {user && user.role === 'subscriber' && (
            <Link to="/user/history">
              <Item key="setting:1">Dashboard</Item>
            </Link>
          )}

          {user && user.role === 'admin' && (
            <Link to="/admin/dashboard">
              {' '}
              <Item key="setting:1">Dashboard</Item>
            </Link>
          )}

          <Item key="setting:2" onClick={logout}>
            Logout
          </Item>
        </SubMenu>
        <Item key="setting:2" className="float-right">
          <Search />
        </Item>
      </Menu>
    </>
  );
}

export default Header;
