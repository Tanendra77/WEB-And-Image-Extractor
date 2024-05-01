import React, { useState } from 'react';
import ApiService from '../ApiService';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const response = await ApiService.login({ username, password });
      console.log(response.data); // Handle success
      setIsLoading(false);
      // Redirect to index page after successful login
      window.location.href = '/'; // Adjust the URL as needed
    } catch (error) {
      console.error(error); // Log the error for debugging
      setError('Login failed. Please check your credentials.'); // Set error message
      setIsLoading(false);
    }
  };

  const styles = {
    loginContainer: {
      maxWidth: '400px',
      margin: '0 auto',
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      fontFamily: 'Monospace, monospace, sans-serif',
    },
    inputContainer: {
      marginBottom: '15px',
    },
    input: {
      width: '100%',
      padding: '10px',
      boxSizing: 'border-box',
      borderRadius: '3px',
      border: '1px solid #ccc',
      marginBottom: '10px',
      fontSize: '16px',
    },
    button: {
      backgroundColor: '#0ef',
      color: 'white',
      padding: '10px 15px',
      border: 'none',
      borderRadius: '3px',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: 'bold',
    },
    disabledButton: {
      backgroundColor: '#cccccc',
      cursor: 'not-allowed',
    },
    errorMessage: {
      color: '#ff0000',
      marginTop: '10px',
    },
    backLink: {
      color: '#0ef',
      textDecoration: 'none',
      fontSize: '14px',
      display: 'block',
      marginBottom: '10px',
    },
  };

  return (
    <div style={styles.loginContainer}>
      <h1>Login</h1>
      <div style={styles.inputContainer}>
        <input
          style={styles.input}
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div style={styles.inputContainer}>
        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button
        style={isLoading ? { ...styles.button, ...styles.disabledButton } : styles.button}
        onClick={handleLogin}
        disabled={isLoading}
      >
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
      {error && <div style={styles.errorMessage}>{error}</div>}
      <a style={styles.backLink} href="/">
        Back to Home
      </a>
    </div>
  );
};

export default Login;
