import { useEffect, useState } from 'react';
import axios from '../services/api';

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [nameFilter, setNameFilter] = useState('');

  useEffect(() => {
    axios.get('/api/admin/users')
      .then(res => setUsers(res.data))
      .catch(() => alert('Failed to fetch users.'));
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Are you sure you want to remove this user?');
    if (!confirmed) return;

    try {
      const res = await axios.delete(`/api/admin/users/${id}`);
      alert(res.data);
      setUsers(prev => prev.filter(u => u.id !== id));
    } catch (err) {
      alert(err.response?.data || 'Deletion failed.');
    }
  };

  // Combined filtering by role and name
  const filteredUsers = users.filter(u => {
    const matchesRole = roleFilter === 'ALL' || u.role === roleFilter;
    const matchesName = u.name.toLowerCase().includes(nameFilter.toLowerCase());
    return matchesRole && matchesName;
  });

  return (
    <div className="container mt-4">
      <h3>👥 All Users</h3>

      <div className="row mb-3">
        <div className="col-md-6">
          <label htmlFor="roleFilter" className="form-label">Filter by Role</label>
          <select
            id="roleFilter"
            className="form-select"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option value="ALL">All</option>
            <option value="ADMIN">Admin</option>
            <option value="LIBRARIAN">Librarian</option>
            <option value="MEMBER">Member</option>
          </select>
        </div>

        <div className="col-md-6">
          <label htmlFor="nameFilter" className="form-label">Search by Name</label>
          <input
            type="text"
            id="nameFilter"
            className="form-control"
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
            placeholder="Type a name..."
          />
        </div>
      </div>

      {filteredUsers.length > 0 ? (
        <ul className="list-group">
          {filteredUsers.map(u => (
            <li key={u.id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <strong>{u.name}</strong> – {u.email}
                <span className={`badge ms-2 bg-${u.role === 'ADMIN' ? 'danger' : u.role === 'LIBRARIAN' ? 'primary' : 'secondary'}`}>
                  {u.role}
                </span>
              </div>
              <button
                className="btn btn-sm btn-outline-danger"
                onClick={() => handleDelete(u.id)}
              >
                🗑 Remove
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-3">No users found for your filters.</p>
      )}
    </div>
  );
}

export default AdminUsers;
