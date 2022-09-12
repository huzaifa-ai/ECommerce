import React from 'react';
import { Card } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import blankimages from '../../blankimages/images.png';

const { Meta } = Card;

function AdminProductdCard({ product, DeleteProduct }) {
  const { title, description, images, slug } = product;

  return (
    <Card
      hoverable
      className="my-2"
      cover={
        <img
          style={{
            height: '190px',
            objectFit: 'cover',
            width: '90%',
            margin: 'auto',
          }}
          className="p-2"
          alt="example"
          src={images && images.length ? images[0].url : blankimages}
        />
      }
      actions={[
        <Link to={`${slug}`}>
          <EditOutlined className="text-warning" />
        </Link>,
        <DeleteOutlined
          className="text-danger"
          onClick={() => DeleteProduct(slug)}
        />,
      ]}
    >
      <Meta
        title={title}
        description={`${description && description.substring(0, 40)}...`}
      />
    </Card>
  );
}

export default AdminProductdCard;
