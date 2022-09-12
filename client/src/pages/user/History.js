import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import UserNav from '../../Components/nav/UserNav';
import { userOrders } from '../../functions/user';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import ShowPaymentInfo from '../../Components/cards/ShowPaymentInfo';
// import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
// import { PDFViewer } from '@react-pdf/renderer';

function History() {
  const { user } = useSelector((state) => ({ ...state }));
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    userOrders(user.token).then((res) => {
      console.log(res.data);
      setOrders(res.data);
    });
  }, []);

  const showOrderInTable = (order) => {
    return (
      <table className="table table-bordered">
        <thead>
          <tr className="bg-light">
            <th scope="col">Title</th>
            <th scope="col">Price</th>
            <th scope="col">Brand</th>
            <th scope="col">Color</th>
            <th scope="col">Count</th>
            <th scope="col">Shipping</th>
          </tr>
        </thead>
        <tbody>
          {order.map((p, i) => {
            return (
              <tr key={i}>
                <td>
                  <b>{p.product.title}</b>
                </td>
                <td>
                  <b>${p.product.price}</b>
                </td>
                <td>
                  <b>{p.product.brand}</b>
                </td>
                <td>
                  <b>{p.color}</b>
                </td>
                <td>
                  <b>{p.count}</b>
                </td>

                <td>
                  <b>
                    {p.product.shipping === 'Yes' ? (
                      <CheckCircleOutlined className="text-success" />
                    ) : (
                      <CloseCircleOutlined className="text-danger" />
                    )}
                  </b>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  const showDownloadLink = (order) => {
    // <PDFViewer>
    //   <Document>
    //     <Page size="A4">
    //       <View>
    //         <Text>Section 1</Text>
    //         <Text>Section 2</Text>
    //       </View>
    //     </Page>
    //   </Document>
    // </PDFViewer>;
  };

  const showEachOrders = () => {
    return orders.map((order, i) => {
      return (
        <div key={i} className="m-5 p-3 card text-center">
          <ShowPaymentInfo payment={order} />
          {showOrderInTable(order.products)}
          <div className="row">
            <div className="col">
              <p className="btn btn-primary"> {showDownloadLink(order)} </p>
            </div>
          </div>
        </div>
      );
    });
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-2 ">
          <UserNav />
        </div>
        <div className="col pt-2">
          <h4 className="text-center">
            {orders && orders.length > 0
              ? 'User Purchase Orders'
              : 'No Purchase Orders'}
          </h4>
          {showEachOrders()}
        </div>
      </div>
    </div>
  );
}

export default History;
