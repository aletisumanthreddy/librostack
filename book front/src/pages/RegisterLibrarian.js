import { useState } from 'react';
import axios from '../services/api';

function RegisterLibrarian() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'LIBRARIAN' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/api/admin/register-librarian', form);
    alert('Librarian registered!');
    setForm({ name: '', email: '', password: '', role: 'LIBRARIAN' });
  };

  return (
    <div className="container mt-4">
      <h3>🧑‍🏫 Register Librarian</h3>
      <form onSubmit={handleSubmit}>
        <input className="form-control mb-2" placeholder="Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
        <input className="form-control mb-2" placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
        <input className="form-control mb-2" type="password" placeholder="Password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} required />
        <button className="btn btn-primary">Register</button>
      </form>
    </div>
  );
}

export default RegisterLibrarian;
