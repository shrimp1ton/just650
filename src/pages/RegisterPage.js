// src/components/RegisterPage.js
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, googleProvider } from '../firebase';
import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification, signInWithPopup } from 'firebase/auth';
import { gsap } from 'gsap';
import '../styles.css';

const RegisterPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize navigate

  const googleButtonRef = useRef(null);
  const formRef = useRef(null);

  // GSAP animations
  useEffect(() => {
    gsap.fromTo(
      googleButtonRef.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    );
    gsap.fromTo(
      formRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.5 }
    );
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: firstName,
      });

      await sendEmailVerification(user);
      alert('Registration successful! Please check your email for verification.');
      
      // Redirect to /intro after registration
      navigate('/intro');
      
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Update the user's profile with their name from Google here, if needed
      await updateProfile(user, {
        displayName: user.displayName || firstName,
      });

      alert('Registration successful with Google!');
      
      // Redirect to /intro after successful Google sign-up
      navigate('/intro');
      
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-page">
      <h2>Register</h2>
      {error && <p className="error-message">{error}</p>}
      <button
        onClick={handleGoogleSignUp}
        className="google-button"
        ref={googleButtonRef}
      >
        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google logo" className="google-logo" />
        Sign Up with Google
      </button>
      <p>or</p>
      <form onSubmit={handleRegister} ref={formRef} className="register-form">
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First Name"
          required
        />
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last Name"
          required
        />
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
        <input
          type={showPassword ? 'text' : 'password'}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
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
        <button type="submit" className="register-button">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
