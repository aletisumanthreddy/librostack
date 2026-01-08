import { Link } from 'react-router-dom';

function AdminDashboard() {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user || user.role !== 'ADMIN') {
    return <div className="container mt-5"><h4>Access Denied</h4></div>;
  }

  return (
    <div className="container mt-4">
      <h3>Welcome, {user.name} 👑</h3>
      <p>Choose a section to manage:</p>

      <div className="d-grid gap-3">
        <Link to="/admin/add-book" className="btn btn-outline-success">➕ Add Books</Link>
        <Link to="/admin/add-librarian" className="btn btn-outline-primary">🧑‍🏫 Add Librarians</Link>
        <Link to="/admin/reservations" className="btn btn-outline-info">📋 View Reservations</Link>
        <Link to="/admin/users" className="btn btn-outline-dark">👥 View All Users</Link>
      </div>
    </div>
  );
}

export default AdminDashboard;
