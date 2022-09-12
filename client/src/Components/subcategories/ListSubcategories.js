import React, { useEffect, useState } from 'react';
import { SubCategories } from '../../functions/sub';

function ListSubcategories() {
  const [Sub, setSub] = useState([]);
  const [Loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    SubCategories()
      .then((res) => {
        setLoading(false);
        setSub(res.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, []);

  const ShowSubs = () => {
    return Sub.map((s) => {
      return <button className="btn btn-danger btn-lg m-3">{s.name}</button>;
    });
  };

  return (
    <div className="container text-center">
      {Loading ? <h1>Loading</h1> : ShowSubs()}
    </div>
  );
}

export default ListSubcategories;
