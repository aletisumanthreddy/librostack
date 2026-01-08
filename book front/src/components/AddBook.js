import { useState } from 'react';
import axios from '../services/api';

function AddBook() {
  const [form, setForm] = useState({ bookId: '', title: '', author: '', totalCopies: 1 });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/books/add-book', form);
      alert('Book added!');
      setForm({ bookId: '', title: '', author: '', totalCopies: 1 });
    } catch {
      alert('Book ID must be unique.');
    }
  };

  return (
    <div className="container mt-4">
      <h3>➕ Add New Book</h3>
      <form onSubmit={handleSubmit}>
        <input className="form-control mb-2" placeholder="Book ID" value={form.bookId} onChange={e => setForm({...form, bookId: e.target.value})} required />
        <input className="form-control mb-2" placeholder="Title" value={form.title} onChange={e => setForm({...form, title: e.target.value})} required />
        <input className="form-control mb-2" placeholder="Author" value={form.author} onChange={e => setForm({...form, author: e.target.value})} required />
        <input className="form-control mb-3" type="number" min="1" placeholder="Total Copies" value={form.totalCopies} onChange={e => setForm({...form, totalCopies: parseInt(e.target.value)})} required />
        <button className="btn btn-success">Add Book</button>
      </form>
    </div>
  );
}

export default AddBook;
