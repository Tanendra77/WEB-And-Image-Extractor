import React, { useState, useEffect } from 'react';
import ApiService from '../ApiService';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [redirectToLogin, setRedirectToLogin] = useState(false);

  useEffect(() => {
    if (redirectToLogin) {
      // Redirect to the login page
      window.location.href = '/Login';
    }
  }, [redirectToLogin]);

  const handleSignup = async () => {
    setIsLoading(true);
    try {
      const response = await ApiService.signup({ username, password });
      console.log(response.data); // Handle success
      setIsLoading(false);
      // Show a success message (you can customize this)
      alert('Signup successful! You can now log in.');
      // Clear fields and set flag to redirect to login
      setUsername('');
      setPassword('');
      setError(null);
      setRedirectToLogin(true);
    } catch (error) {
      console.error(error); // Log the error for debugging
      setError('Signup failed. Please try again.'); // Set error message
      setIsLoading(false);
    }
  };

  const styles = {
    signupContainer: {
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
      backgroundColor: '#4caf50',
      color: 'white',
      padding: '12px 20px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '18px',
    },
    disabledButton: {
      backgroundColor: '#cccccc',
      cursor: 'not-allowed',
    },
    errorMessage: {
      color: '#ff0000',
      marginTop: '10px',
      fontSize: '14px',
    },
  };

  return (
    <div style={styles.signupContainer}>
      <h1>Signup</h1>
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
        onClick={handleSignup}
        disabled={isLoading}
      >
        {isLoading ? 'Signing up...' : 'Signup'}
      </button>
      {error && <div style={styles.errorMessage}>{error}</div>}
    </div>
  );
};

export default Signup;
