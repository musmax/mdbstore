import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token'); // Get the token from query parameters
  const [status, setStatus] = useState('Verifying...');

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setStatus('Verification failed. No token found.');
        return;
      }
      try {
        console.log(token);
        // Send the token as a query parameter
        const response = await axios.post(
          `https://mdbstorebe-express.onrender.com/v1/auth/verify-email?token=${token}`,
          {}, // No request body is required
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        setStatus('Your email has been verified successfully! You can now log in.');
      } catch (error) {
        console.log(token);
        console.error('Error verifying token:', error); // Log error for debugging
        setStatus('Verification failed. The link might be invalid or expired.');
      }
    };

    verifyToken();
  }, [token]);

  return (
    <div>
      <h1>Email Verification</h1>
      <p>{status}</p>
    </div>
  );
};

export default VerifyEmail;
