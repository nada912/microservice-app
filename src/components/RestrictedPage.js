import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RestrictedPage = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Unauthorized access. Please log in.');
        return;
      }

      try {
        const response = await axios.get('/api/restricted-data', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setData(response.data);
      } catch (err) {
        setError('Failed to fetch data.');
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Restricted Information</h1>
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>Loading...</p>}
    </div>
  );
};

export default RestrictedPage;
