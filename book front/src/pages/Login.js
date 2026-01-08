import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // your original styles
import { useAuth } from './AuthContext'; // ✅ Step 1: import context

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();
  const { setUser } = useAuth(); // ✅ Step 2: get context setter

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    try {
      const res = await axios.post('http://localhost:8080/api/auth/login', {
        email,
        password,
      });

      const user = res.data;

      localStorage.setItem('user', JSON.stringify(user));
      setUser(user); // ✅ Step 3: update context to trigger navbar re-render

      // ✅ Role-based redirection
      switch (user.role) {
        case 'ADMIN':
          navigate('/admin/dashboard');
          break;
        case 'LIBRARIAN':
          navigate('/librarian/dashboard');
          break;
        case 'MEMBER':
          navigate('/member/dashboard');
          break;
        default:
          setErrorMsg('Invalid role. Please contact administrator.');
      }

    } catch (error) {
      if (error.response?.status === 401) {
        setErrorMsg('Invalid email or password');
      } else {
        setErrorMsg('Something went wrong. Please try again.');
      }
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">LOGIN</h2>
      <form className="login-form" onSubmit={handleLogin}>
        <input type="email" className="login-input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" className="login-input" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" className="login-button">Login</button>
        {errorMsg && <div className="login-error">{errorMsg}</div>}
      </form>
    </div>
  );
};

export default Login;
