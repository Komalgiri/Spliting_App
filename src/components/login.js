import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { auth } from '../firebase'; // Ensure this path is correct
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import loginImage from '../assets/signupImage.jpg'; // Adjust the path based on your folder structure
import signupImage from '../assets/signupImage.jpg'; // Adjust the path based on your folder structure
import backgroundImage from "../assets/Background2.jpg";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); // For Sign Up
  const [error, setError] = useState('');
  const navigate = useNavigate(); // useNavigate hook to programmatically navigate

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError(''); // Clear error message when toggling
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Navigate to the homepage after successful login
      navigate('/Homepage'); // Redirect to homepage
    } catch (error) {
      setError("Failed to log in. Check your email and password.");
      console.error("Login error:", error);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // Optionally navigate to the homepage or login page after successful signup
      navigate('/Homepage'); // Redirect to homepage after sign up
    } catch (error) {
      setError("Failed to create an account. Please try again.");
      console.error("Sign Up error:", error);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        
        backgroundImage: `url(${backgroundImage})`, // Set the background image
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.8, // Adjust opacity as needed
      }}
    >
      <div
        style={{
          display: 'flex',
          width: '700px',
          height: '500px',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          boxShadow: '0 15px 25px rgba(0, 0, 0, 0.1)',
          borderRadius: '10px',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Left Side (Login/Signup Form) */}
        <div
          style={{
            flex: '1',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '40px',
            transition: 'transform 0.6s ease-in-out, opacity 0.6s ease-in-out',
            transform: isLogin ? 'translateX(0)' : 'translateX(100%)',
            opacity: isLogin ? 1 : 0,
            zIndex: 2,
            position: 'absolute',
            left: '0',
            top: '0',
            height: '100%',
            width: '50%',
            backgroundColor: 'white',
          }}
        >
          {isLogin ? (
            <div>
              <h2 style={{ marginBottom: '20px' }}>Login</h2>
              {error && <p style={{ color: 'red' }}>{error}</p>}
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  padding: '10px',
                  marginBottom: '15px',
                  width: '100%',
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                  outline: 'none',
                }}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  padding: '10px',
                  marginBottom: '15px',
                  width: '100%',
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                  outline: 'none',
                }}
              />
              <button
                style={{
                  padding: '10px',
                  backgroundColor: '#6200ea',
                  color: 'white',
                  width: '100%',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s ease',
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = '#3700b3')}
                onMouseLeave={(e) => (e.target.style.backgroundColor = '#6200ea')}
                onClick={handleLogin}
              >
                Login
              </button>
              <p
                style={{ textAlign: 'center', marginTop: '20px', cursor: 'pointer', color: '#6200ea' }}
                onClick={toggleForm}
              >
                Don't have an account? Sign Up
              </p>
            </div>
          ) : null}
        </div>

        {/* Signup Form */}
        <div
          style={{
            flex: '1',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '40px',
            transition: 'transform 0.6s ease-in-out, opacity 0.6s ease-in-out',
            transform: isLogin ? 'translateX(-100%)' : 'translateX(0)',
            opacity: isLogin ? 0 : 1,
            zIndex: 2,
            position: 'absolute',
            left: '0',
            top: '0',
            height: '100%',
            width: '50%',
            backgroundColor: 'white',
          }}
        >
          {!isLogin ? (
            <div>
              <h2 style={{ marginBottom: '20px' }}>Sign Up</h2>
              {error && <p style={{ color: 'red' }}>{error}</p>}
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{
                  padding: '10px',
                  marginBottom: '15px',
                  width: '100%',
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                  outline: 'none',
                }}
              />
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  padding: '10px',
                  marginBottom: '15px',
                  width: '100%',
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                  outline: 'none',
                }}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  padding: '10px',
                  marginBottom: '15px',
                  width: '100%',
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                  outline: 'none',
                }}
              />
              <button
                style={{
                  padding: '10px',
                  backgroundColor: '#6200ea',
                  color: 'white',
                  width: '100%',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s ease',
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = '#3700b3')}
                onMouseLeave={(e) => (e.target.style.backgroundColor = '#6200ea')}
                onClick={handleSignUp}
              >
                Sign Up
              </button>
              <p
                style={{ textAlign: 'center', marginTop: '20px', cursor: 'pointer', color: '#6200ea' }}
                onClick={toggleForm}
              >
                Already have an account? Login
              </p>
            </div>
          ) : null}
        </div>

        {/* Right Side (Image + Purple Background) */}
        <div
          style={{
            flex: '1',
            backgroundColor: '#6200ea',
            color: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            transition: 'transform 0.6s ease-in-out',
            transform: isLogin ? 'translateX(0)' : 'translateX(100%)',
            zIndex: 1,
            position: 'absolute',
            right: '0',
            top: '0',
            height: '100%',
            width: '50%',
          }}
        >
          <div>
            <img
              src={isLogin ? loginImage : signupImage}
              alt="Auth illustration"
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
