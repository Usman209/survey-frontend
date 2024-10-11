// src/App.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Spin, Alert } from 'antd'; 

const LoginPage = () => {
  const [cnic, setCnic] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Show the spinner
    setError(null); // Clear any previous error message

    // API request body
    const requestBody = {
      cnic: cnic,
      password: password,
    };

    try {
      // Making the POST request
      const response = await fetch('http://203.161.43.125:4000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        // localStorage.setItem('token', data.token);
        navigate('/dashboard');
      } else {
        console.error('Login failed:', data);
        setError('Login failed, please check your CNIC and password.'); // Set the error message
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('An error occurred. Please try again later.'); // Set the error message
    } finally {
      setLoading(false); // Hide the spinner after the request is completed
    }
  };

  return (
    <div className="containerLogin">
      {loading && (
        <div className="spinner-container">
          <Spin size="large" /> 
        </div>
      )}
      {!loading && ( /* Only show the form when not loading */
        <div className="wrapperLogin">
          <div className="leftLogin">
            <div className="logoLogin">Polio</div>
            <h1 className="titleLogin">Welcome</h1>
            <p>Enter your CNIC and password to sign in</p>

            {error && (
              <Alert
                message="Error"
                description={error} // Display the error message
                type="error"
                showIcon
                style={{ marginBottom: '20px' }}
              />
            )}

            <form className="formLogin" onSubmit={handleSubmit}>
              <input
                type="text"
                className="inputLogin"
                placeholder="Enter your CNIC"
                value={cnic}
                onChange={(e) => setCnic(e.target.value)}
              />
              <input
                type="password"
                className="inputLogin"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit" className="buttonLogin">Sign in</button>
            </form>
          </div>
          <div className="rightLogin"></div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
