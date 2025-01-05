import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [status, setStatus] = useState('Verifying...');

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await axios.post(
          `https://mdbstorebe-express.onrender.com/v1/auth/verify-email`,
          { token },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        setStatus('Your email has been verified successfully! You can now log in.');
      } catch (error) {
        setStatus('Verification failed. The link might be invalid or expired.');
      }
    };
  
    if (token) verifyToken();
  }, [token]);
  
  return (
    <div>
      <h1>Email Verification</h1>
      <p>{status}</p>
    </div>
  );
};

export default VerifyEmail;
