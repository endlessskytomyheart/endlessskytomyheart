import React, { useState } from 'react';

// Helper function to simulate OTP generation
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP
};

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [otpEntered, setOtpEntered] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [isOtpView, setIsOtpView] = useState(false); // Manage OTP view

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username === '' || password === '') {
      setError('Invalid username or password.');
      return;
    }

    // Simulate OTP generation and sending
    const newOtp = generateOTP();
    setGeneratedOtp(newOtp);
    setOtpSent(true);
    setIsOtpView(true); // Show OTP view

    setError('');
    setOtpEntered('');
    setUsername('');
    setPassword('');

    alert('OTP has been sent to your email!');
  };

  const handleOtpVerification = (e) => {
    e.preventDefault();

    if (otpEntered === '') {
      setError('Please enter the OTP.');
      return;
    }

    if (otpEntered === generatedOtp) {
      setLoggedIn(true);
      setOtpEntered('');
      setOtpSent(false);
      setIsOtpView(false); // Return to login page view
      alert('Login successful!');
    } else {
      setError('Invalid OTP. Please try again.');
    }
  };

  const handleResendOtp = () => {
    const newOtp = generateOTP();
    setGeneratedOtp(newOtp);
    alert('New OTP has been sent to your email!');
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setOtpSent(false);
    setIsOtpView(false); // Return to login page view
    setUsername('');
    setPassword('');
    setOtpEntered('');
    setError('');
    alert('You have been logged out.');
  };

  const handleBackToLogin = () => {
    setOtpSent(false);
    setIsOtpView(false); // Return to login page view
  };

  return (
    <div className="login-container" style={{ maxWidth: '400px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2 style={{ color: 'white' }}>
        {loggedIn ? 'Welcome' : isOtpView ? 'Enter OTP' : 'User Login'}
      </h2>
      {error && <p style={{ color: 'white' }}>{error}</p>}
      {loggedIn ? (
        <button
          onClick={handleLogout}
          style={{ padding: '10px 15px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px' }}
        >
          Logout
        </button>
      ) : isOtpView ? (
        <div>
          <form onSubmit={handleOtpVerification}>
            <div className="form-group" style={{ marginBottom: '15px' }}>
              <label htmlFor="otp" style={{ color: 'white' }}>Enter OTP</label>
              <input
                type="text"
                id="otp"
                value={otpEntered}
                onChange={(e) => setOtpEntered(e.target.value)}
                style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  type="submit"
                  style={{ flex: '1', padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px' }}
                >
                  Verify OTP
                </button>
                <button
                  type="button"
                  onClick={handleBackToLogin}
                  style={{ flex: '1', padding: '10px', backgroundColor: '#6c757d', color: '#fff', border: 'none', borderRadius: '4px' }}
                >
                  Back
                </button>
              </div>
              <button
                type="button"
                onClick={handleResendOtp}
                style={{ padding: '10px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px' }}
              >
                Resend OTP
              </button>
            </div>
          </form>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ marginBottom: '20px' }}>
            <label htmlFor="username" style={{ color: 'white' }}>Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            />
          </div>
          <div className="form-group" style={{ marginBottom: '15px' }}>
            <label htmlFor="password" style={{ color: 'white' }}>Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            />
          </div>
          <button
            type="submit"
            style={{ padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px' }}
          >
            Login
          </button>
        </form>
      )}
    </div>
  );
};

export default LoginPage;
