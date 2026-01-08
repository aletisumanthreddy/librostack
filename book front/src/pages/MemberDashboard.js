import { useEffect, useState } from 'react';
import axios from '../services/api';
import BookCard from '../components/BookCard';

function MemberDashboard() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [books, setBooks] = useState([]);
  const [reservations, setReservations] = useState([]);

  const fetchData = async () => {
    try {
      const b = await axios.get('/api/books/books'); // ✅ Member-accessible route
      const r = await axios.get(`/api/reservations/user/${user.id}`);
      setBooks(b.data);
      setReservations(r.data);
    } catch (err) {
      console.error("Failed to load dashboard data:", err);
    }
  };

  useEffect(() => {
    if (user?.role === 'MEMBER') fetchData();
  }, []);

  return (
    <div className="container mt-4">
      <h3>Welcome, {user.name} 👋</h3>

      <h5>Your Reservations</h5>
      {reservations.length > 0 ? (
  <div className="table-responsive">
    <table className="table table-bordered table-striped align-middle">
      <thead className="table-dark">
        <tr>
          <th>Title</th>
          <th>Status</th>
          <th>Booking Date</th>
          <th>Expiry Date</th>
        </tr>
      </thead>
      <tbody>
        {reservations.map(r => (
          <tr key={r.id}>
            <td><strong>{r.book.title}</strong></td>
            <td>
              <span className={`badge bg-${r.status === 'CONFIRMED' ? 'success' : 'warning'}`}>
                {r.status}
              </span>
            </td>
            <td>{new Date(r.bookingDate).toLocaleDateString()}</td>
            <td>{new Date(r.expiryDate).toLocaleDateString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
) : (
  <div className="alert alert-info mt-2">
    🗒️ You haven’t reserved any books yet.
  </div>
)}

      <h5 className="mt-4">Available Books</h5>
      {books.length > 0 ? (
        <div className="row">
          {books.map(book => (
            <BookCard
              key={book.bookId}
              book={book}
              user={user}
              refresh={fetchData}
            />
          ))}
        </div>
      ) : (
        <div className="alert alert-warning mt-3">
          📚 No books available at the moment. Please check back later.
        </div>
      )}
    </div>
  );
}

export default MemberDashboard;
