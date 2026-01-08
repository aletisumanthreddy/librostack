import { useState } from 'react';
import axios from '../services/api';

function RegisterMember() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'MEMBER'
  });

  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState('');

  const validateForm = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.includes('@')) newErrors.email = 'Invalid email format';
    if (form.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    return newErrors;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({});
    setSuccessMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await axios.post('/api/auth/register', form);
      setSuccessMsg('✅ Member registered successfully!');
      setForm({ name: '', email: '', password: '', role: 'MEMBER' });
    } catch (err) {
      if (err.response?.status === 409) {
        setErrors({ email: '❌ Email already in use' });
      } else {
        setErrors({ general: '❌ Registration failed. Please try again.' });
      }
    }
  };

  return (
    <div className="container mt-4">
      <h2>Register as Member</h2>

      {/* Success + General Errors */}
      {successMsg && <div className="alert alert-success">{successMsg}</div>}
      {errors.general && <div className="alert alert-danger">{errors.general}</div>}

      <form onSubmit={handleSubmit} noValidate>
        <input name="name" className={`form-control mb-2 ${errors.name ? 'is-invalid' : ''}`} placeholder="Name"
          value={form.name} onChange={handleChange} required />
        {errors.name && <div className="text-danger">{errors.name}</div>}
        <input name="email"  type="email" className={`form-control mb-2 ${errors.email ? 'is-invalid' : ''}`}
           placeholder="Email" value={form.email} onChange={handleChange} required/>
        {errors.email && <div className="text-danger">{errors.email}</div>}
        <input  name="password" type="password" className={`form-control mb-2 ${errors.password ? 'is-invalid' : ''}`} placeholder="Password" value={form.password} onChange={handleChange} required/>
        {errors.password && <div className="text-danger">{errors.password}</div>}

        <button className="btn btn-success" type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegisterMember;
