import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { useAuth } from '../pages/AuthContext'; // ✅ import context

function Navbar() {
  const { user, setUser } = useAuth(); // ✅ use context
  const role = user?.role;

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null); // ✅ reset context
  };

  const greeting = user ? `Hi, ${user.name} (${role})` : 'Welcome!';
  const navColor =
    role === 'ADMIN' ? 'bg-danger'
    : role === 'LIBRARIAN' ? 'bg-info'
    : role === 'MEMBER' ? 'bg-primary'
    : 'bg-dark';

  return (
    <nav className={`navbar navbar-expand-lg navbar-dark ${navColor} px-4`}>
      <Link className="navbar-brand" to="/">📚 LibroStack</Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <span className="nav-link disabled">{greeting}</span>
          </li>

          {!user && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/register-member">Register Member</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
            </>
          )}

          {role === 'MEMBER' && (
            <li className="nav-item">
              <Link className="nav-link" to="/member/dashboard">Member Dashboard</Link>
            </li>
          )}
          {role === 'LIBRARIAN' && (
            <li className="nav-item">
              <Link className="nav-link" to="/librarian/dashboard">Librarian Dashboard</Link>
            </li>
          )}
          {role === 'ADMIN' && (
            <li className="nav-item">
              <Link className="nav-link" to="/admin/dashboard">Admin Panel</Link>
            </li>
          )}

          {user && (
            <li className="nav-item">
              <Link className="nav-link" to="/" onClick={handleLogout}>Logout</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
