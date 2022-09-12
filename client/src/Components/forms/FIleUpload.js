import React from 'react';
import Resizer from 'react-image-file-resizer';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { IdcardTwoTone, UserOutlined } from '@ant-design/icons';
import { Avatar, Badge } from 'antd';

function FIleUpload({ values, setvalues, setloading }) {
  const { user } = useSelector((state) => ({ ...state }));
  let allUploadedFiles = values.images;
  const { images } = values;

  const fileUploadAndResize = (e) => {
    // resize
    let files = e.target.files;
    if (files) {
      setloading(true);
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          'JPEG',
          100,
          0,
          (uri) => {
            axios
              .post(
                'http://localhost:8000/api/uploadImages',
                {
                  image: uri,
                },
                {
                  headers: {
                    authtoken: user.token,
                  },
                }
              )
              .then((res) => {
                console.log(res.data);

                setloading(false);
                allUploadedFiles.push(res.data);
                setvalues({ ...values, images: allUploadedFiles });
                console.log(values);
              })
              .catch((err) => {
                setloading(false);
                console.log(err);
              });
          },
          'base64'
        );
      }
    }
    //send back to server to uplaod on cloudinary

    //set url in images[] PRODCUTCREATE
  };

  const handleImageRemove = (id) => {
    setloading(true);
    console.log('Handle remove', id);
    axios
      .post(
        'http://localhost:8000/api/removeImages',
        { public_id: id },
        {
          headers: {
            authtoken: user.token,
          },
        }
      )
      .then((res) => {
        console.log(res);
        setloading(false);
        let filteredItem = images.filter((item) => {
          return item.public_id != id;
        });
        setvalues({ ...values, images: filteredItem });
      })
      .catch((err) => {
        console.log(err);
        setloading(false);
      });
  };
  return (
    <>
      <div>
        {images.map((b) => {
          return (
            <Badge
              className="mx-3"
              style={{ cursor: 'pointer' }}
              count="x"
              onClick={() => {
                handleImageRemove(b.public_id);
              }}
            >
              <Avatar shape="square" key={b.public_id} size={100} src={b.url} />
            </Badge>
          );
        })}
      </div>
      <br />
      <div>
        <label className="btn btn-primary">
          Choose File{' '}
          <input
            type="file"
            name=""
            id=""
            multiple
            accept="images/*"
            onChange={fileUploadAndResize}
            hidden
          />
        </label>
      </div>
    </>
  );
}

export default FIleUpload;
