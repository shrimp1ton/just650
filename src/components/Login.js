import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, googleProvider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';

const Login = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('Error logging in with Google:', error);
    }
  };

  const redirectToRegister = () => {
    navigate('/register');
  };

  return (
    <div className="overlay">
      <div className="login-popup">
        <h2>Login to Your Account</h2>
        <button onClick={handleGoogleLogin}>
          Login with Google
        </button>
        <p>By logging in, you agree to our terms and conditions.</p>
        <button onClick={redirectToRegister} className="register-button">
          Register with Email and Password
        </button>
      </div>
    </div>
  );
};

export default Login;
