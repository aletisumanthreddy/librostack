import { Link } from 'react-router-dom';
import './Landing.css';

function Landing() {
  return (
    <div className="landing-container text-center">
      <h1 className="title">📚 LibroStack</h1>
      <p>Reserve. Read. Relax.</p>
      <Link to="/register-member" className="btn btn-success m-2">Register as Member</Link>
    </div>
  );
}

export default Landing;
