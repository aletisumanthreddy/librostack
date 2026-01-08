import { useEffect, useState } from 'react';
import axios from '../services/api';

function AdminReservations() {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    axios.get('/api/admin/reservations')
      .then(res => setReservations(res.data))
      .catch(err => console.error("Failed to fetch reservations:", err));
  }, []);

  return (
    <div className="container mt-4">
      <h3>📋 All Book Reservations</h3>

      {reservations.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-bordered table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>User Name</th>
                <th>Email</th>
                <th>Book ID</th>
                <th>Book Title</th>
                <th>Status</th>
                <th>Booking Date</th>
                <th>Expiry Date</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map(r => (
                <tr key={r.id}>
                  <td>{r.user.name}</td>
                  <td>{r.user.email}</td>
                  <td>{r.book.bookId}</td>
                  <td>{r.book.title}</td>
                  <td>
                    <span className={`badge bg-${r.status === 'CONFIRMED' ? 'success' : r.status === 'EXPIRED' ? 'danger' : 'warning'}`}>
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
        <div className="alert alert-warning mt-3">
          ❕ No reservations found.
        </div>
      )}
    </div>
  );
}

export default AdminReservations;
