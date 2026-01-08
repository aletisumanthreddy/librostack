import { useEffect, useState } from 'react';
import axios from '../services/api';
import './LibrarianDashboard.css';

function LibrarianDashboard() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [books, setBooks] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState('title');
  const [sortOrder, setSortOrder] = useState('asc');
  const [editBookId, setEditBookId] = useState(null);
  const [editedBook, setEditedBook] = useState(null);

  const [newBook, setNewBook] = useState({
    bookId: '',
    title: '',
    author: '',
    totalCopies: 1
  });

  useEffect(() => {
    if (user?.role === 'LIBRARIAN') {
      axios.get('/api/books/books')
        .then(res => setBooks(res.data))
        .catch(err => console.error('Error fetching books:', err));

      axios.get('/api/admin/reservations')
        .then(res => setReservations(res.data))
        .catch(err => console.error('Error fetching reservations:', err));
    }
  }, []);

  const handleAddBook = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/books/add-book', newBook);
      alert('✅ Book added successfully');
      setNewBook({ bookId: '', title: '', author: '', totalCopies: 1 });
      window.location.reload();
    } catch (err) {
      console.error('Add failed:', err);
      alert('❌ Failed to add book');
    }
  };

  const startEdit = (book) => {
    setEditBookId(book.bookId);
    setEditedBook({
      title: book.title,
      author: book.author,
      totalCopies: book.totalCopies,
      availableCopies: book.availableCopies
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedBook(prev => ({
      ...prev,
      [name]: name.includes('Copies') ? Number(value) : value
    }));
  };

  const saveEdit = async () => {
    if (!editedBook || editedBook.totalCopies < editedBook.availableCopies || editedBook.availableCopies < 0) {
      alert('❌ Invalid values: Available must be ≤ Total, and ≥ 0');
      return;
    }
    try {
      await axios.put(`/api/books/update/${editBookId}`, editedBook);
      alert('✅ Book updated');
      setEditBookId(null);
      setEditedBook(null);
      window.location.reload();
    } catch (err) {
      console.error('Update failed', err);
      alert('❌ Could not update book');
    }
  };

  const cancelEdit = () => {
    setEditBookId(null);
    setEditedBook(null);
  };

  const filteredBooks = books
    .filter(b =>
      b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.author.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const valA = a[sortKey];
      const valB = b[sortKey];
      return sortOrder === 'asc' ? (valA > valB ? 1 : -1) : (valA < valB ? 1 : -1);
    });

  if (!user || user.role !== 'LIBRARIAN') {
    return (
      <div className="container mt-5">
        <h4>Access Denied</h4>
        <p>This dashboard is only accessible to logged-in librarians.</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container librarian-dashboard container">
      <h3 className="dashboard-heading">📘 Librarian Dashboard</h3>

      {/* 🧾 Add Book Section */}
      <div className="dashboard-section add-book-section">
        <form className="row g-3" onSubmit={handleAddBook}>
          <h5>Add New Book</h5>
          <div className="col-md-2">
            <input type="text" className="form-control" placeholder="Book ID"
              value={newBook.bookId} onChange={(e) => setNewBook({ ...newBook, bookId: e.target.value })} required />
          </div>
          <div className="col-md-3">
            <input type="text" className="form-control" placeholder="Title"
              value={newBook.title} onChange={(e) => setNewBook({ ...newBook, title: e.target.value })} required />
          </div>
          <div className="col-md-3">
            <input type="text" className="form-control" placeholder="Author"
              value={newBook.author} onChange={(e) => setNewBook({ ...newBook, author: e.target.value })} required />
          </div>
          <div className="col-md-2">
            <input type="number" className="form-control" min={1} placeholder="Total Copies"
              value={newBook.totalCopies} onChange={(e) => setNewBook({ ...newBook, totalCopies: Number(e.target.value) })} required />
          </div>
          <div className="col-md-2">
            <button type="submit" className="btn btn-success">Add Book</button>
          </div>
        </form>
      </div>

      {/* 🔍 Filter & Sort Section */}
      <div className="dashboard-section book-controls d-flex gap-2 flex-wrap">
        <input type="text" className="form-control" placeholder="Search books..."
          value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <select className="form-select w-auto" value={sortKey} onChange={(e) => setSortKey(e.target.value)}>
          <option value="title">Title</option>
          <option value="author">Author</option>
          <option value="availableCopies">Available</option>
        </select>
        <select className="form-select w-auto" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="asc">⬆ Ascending</option>
          <option value="desc">⬇ Descending</option>
        </select>
      </div>

      {/* 📚 Book Table Section */}
      <div className="dashboard-section books-table-section">
        <h5>Book Inventory</h5>
        <table className="custom-table">
          <thead>
            <tr>
              <th>Book ID</th>
              <th>Title</th>
              <th>Author</th>
              <th>Total</th>
              <th>Available</th>
              <th>Booked</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredBooks.map(book => {
              const bookedCopies = book.totalCopies - book.availableCopies;
              if (editBookId === book.bookId && editedBook) {
                return (
                  <tr key={book.bookId}>
                    <td>{book.bookId}</td>
                    <td><input value={editedBook.title} name="title" onChange={handleEditChange} /></td>
                    <td><input value={editedBook.author} name="author" onChange={handleEditChange} /></td>
                    <td><input type="number" name="totalCopies" value={editedBook.totalCopies} onChange={handleEditChange} /></td>
                    <td><input type="number" name="availableCopies" value={editedBook.availableCopies} onChange={handleEditChange} /></td>
                    <td>{bookedCopies}</td>
                    <td className="d-flex gap-2">
                      <button className="btn btn-sm btn-success" onClick={saveEdit}>Save</button>
                      <button className="btn btn-sm btn-secondary" onClick={cancelEdit}>Cancel</button>
                    </td>
                  </tr>
                );
              }
              return (
                <tr key={book.bookId}>
                  <td>{book.bookId}</td>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.totalCopies}</td>
                  <td>{book.availableCopies}</td>
                  <td>{bookedCopies}</td>
                  <td>
                    <button className="btn btn-sm btn-outline-primary" onClick={() => startEdit(book)}>Edit</button>
                    <button className="btn btn-sm btn-outline-danger ms-2" onClick={() => {
                      if (window.confirm(`Delete "${book.title}" permanently?`)) {
                        axios.delete(`/api/books/delete/${book.bookId}`)
                          .then(() => {
                            alert("✅ Book deleted");
                            window.location.reload();
                          })
                          .catch(err => {
                            console.error("Delete failed", err);
                            alert("❌ Could not delete book");
                          });
                      }
                    }}>Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* 🧾 Reservation Table Section */}
      <div className="dashboard-section reservation-table-section">
        <h5>All Book Reservations</h5>
        {reservations.length > 0 ? (
          <table className="custom-table">
            <thead>
              <tr>
                <th>User Name</th>
                <th>Email</th>
                <th>Book Title</th>
                <th>Status</th>
                <th>Booking Date</th>
                <th>Expiry Date</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map(res => (
                <tr key={res.id}>
                  <td>{res.user.name}</td>
                  <td>{res.user.email}</td>
                  <td>{res.book.title}</td>
                  <td>{res.status}</td>
                  <td>{new Date(res.bookingDate).toLocaleDateString()}</td>
                  <td>{new Date(res.expiryDate).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No reservations available.</p>
        )}
      </div>
    </div>
  );
}

export default LibrarianDashboard;
