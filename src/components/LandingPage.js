import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import '../styles.css';

const LandingPage = () => {
  const navigate = useNavigate();
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonRefs = useRef([]);
  const pageRef = useRef(null);

  useEffect(() => {
    // Title animation
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: -50, scale: 0.8 },
      { opacity: 1, y: 0, scale: 1, duration: 1.5, ease: 'power4.out' }
    );

    // Subtitle animation
    gsap.fromTo(
      subtitleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1.5, delay: 0.5, ease: 'power4.out' }
    );

    // Button animations
    buttonRefs.current.forEach((btn, index) => {
      gsap.fromTo(
        btn,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.2, delay: 1 + index * 0.2, ease: 'power4.out' }
      );
    });
  }, []);

  const handleNavigation = (path) => {
    gsap.to(pageRef.current, {
      duration: 1,
      transformOrigin: 'bottom right',
      rotateY: -180,
      ease: 'power2.inOut',
      onComplete: () => navigate(path),
    });
  };

  return (
    <div ref={pageRef} className="landing-page">
      <h1 ref={titleRef} className="main-title">Just 650.</h1>
      <p ref={subtitleRef} className="subtitle">
        Share your story, with Just650.
      </p>
      <div className="buttons">
        <button
          ref={(el) => (buttonRefs.current[0] = el)}
          className="landing-button"
          onClick={() => handleNavigation('/login')}
        >
          Login
        </button>
        <button
          ref={(el) => (buttonRefs.current[1] = el)}
          className="landing-button"
          onClick={() => handleNavigation('/register')}
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
