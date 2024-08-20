import React, { useState } from 'react';
import { auth, googleProvider } from '../firebase';
import { signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import '../styles.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook to navigate to different routes

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/'); // Redirect to the main page after successful login
    } catch (err) {
      setError('Google Sign-in failed: ' + err.message);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/'); // Redirect to the main page after successful login
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-page">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}
      <button className="google-button" onClick={handleGoogleLogin}>
        Sign In with Google
      </button>
      <form onSubmit={handleLogin} className="login-form">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <label className="show-password">
          <input
            type="checkbox"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
          />
          Show Password
        </label>
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
