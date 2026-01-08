import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Login from './pages/Login';
import RegisterMember from './pages/RegisterMember';
import MemberDashboard from './pages/MemberDashboard';
import LibrarianDashboard from './pages/LibrarianDashboard';
import AdminDashboard from './pages/AdminDashboard';
import AdminUsers from './pages/AdminUsers';
import AddBook from './components/AddBook';
import RegisterLibrarian from './pages/RegisterLibrarian';
import AdminReservations from './pages/AdminReservations.js';
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register-member" element={<RegisterMember />} />
        <Route path="/member/dashboard" element={<MemberDashboard />} />
        <Route path="/librarian/dashboard" element={<LibrarianDashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/add-book" element={<AddBook/>} />
        <Route path="/admin/add-librarian" element={<RegisterLibrarian />} />
        <Route path="/admin/reservations" element={<AdminReservations />} />
      </Routes>
    </Router>
  );
}

export default App;
