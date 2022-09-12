import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoadingtoRedirect() {
  const [count, setcount] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      // decreasing count
      setcount((currentcount) => --currentcount);
    }, 1000);

    count === 0 && navigate('/login');
    return () => clearInterval(interval);
  }, [count]);

  return (
    <>
      <div className="container" p-5 text-center>
        <p>Redirecting you in {count} seconds</p>
      </div>
    </>
  );
}

export default LoadingtoRedirect;
