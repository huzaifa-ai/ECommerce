import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'antd';
import { toast, Toast } from 'react-toastify';
import { StarOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

function RatingModal({ children }) {
  const { user } = useSelector((state) => ({ ...state }));
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();
  let slug = useParams().slug;

  useEffect(() => {
    console.log(slug);
  });

  const handleOk = () => {
    setIsModalVisible(false);
    toast.success('Thankyou for your Review. It will be added soon.');
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleModel = () => {
    if (user && user.token) {
      setIsModalVisible(true);
    } else {
      navigate({
        pathname: '/login',
        state: `product/${slug}`,
      });
    }
  };
  return (
    <>
      <div onClick={handleModel}>
        <StarOutlined className="text-danger" />
        <br />
        {user ? 'Leave a Rating' : 'Login to give a review'}
      </div>

      <Modal visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        {children}
      </Modal>
    </>
  );
}

export default RatingModal;
