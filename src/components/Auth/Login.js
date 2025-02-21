import React, { useState } from 'react';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase/firebase';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setSuccessMessage('Login successful! Redirecting...');
      setTimeout(() => navigate('/Add Grammar'), 1000); // Redirect after 2 seconds
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    try {
      await sendPasswordResetEmail(auth, forgotPasswordEmail);
      setSuccessMessage('Password reset email sent! Check your inbox.');
      setTimeout(() => setIsForgotPassword(false), 2000); // Hide forgot password form after success
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        setErrorMessage('No account found with this email. Please check your email and try again.');
      } else {
        setErrorMessage(error.message);
      }
    }
  };

  return (
    <div className="login-container" style={styles.container}>
      <h2>Login</h2>
      {!isForgotPassword ? (
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
          <button type="submit" style={styles.button}>Login</button>
        </form>
      ) : (
        <form onSubmit={handleForgotPassword}>
          <input
            type="email"
            placeholder="Enter your email"
            value={forgotPasswordEmail}
            onChange={(e) => setForgotPasswordEmail(e.target.value)}
            style={styles.input}
          />
          <button type="submit" style={styles.button}>Send Reset Link</button>
        </form>
      )}

      {errorMessage && <p style={styles.errorMessage}>{errorMessage}</p>}
      {successMessage && <p style={styles.successMessage}>{successMessage}</p>}

      {!isForgotPassword && (
        <p
          style={styles.forgotPassword}
          onClick={() => setIsForgotPassword(true)}
        >
          Forgot password?
        </p>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    maxWidth: '400px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f4f4f4',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  },
  input: {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
  },
  errorMessage: {
    color: 'red',
    marginTop: '10px',
    textAlign: 'center',
  },
  successMessage: {
    color: 'green',
    marginTop: '10px',
    textAlign: 'center',
  },
  forgotPassword: {
    color: '#007BFF',
    textAlign: 'center',
    marginTop: '10px',
    cursor: 'pointer',
  }
};

export default Login;
