import axios from '../services/api';

function BookCard({ book, user, refresh }) {
  const reserve = async () => {
    try {
      await axios.post(`/api/reservations/reserve?userId=${user.id}&bookId=${book.bookId}`);
      alert(`✅ Reserved: "${book.title}"`);
      refresh();
    } catch (err) {
      console.error('Reservation failed:', err);
      alert('❌ Reservation failed. Please try again.');
    }
  };

  return (
    <div className="col-md-4 mb-3">
      <div className="card p-3 text-dark bg-light border rounded shadow-sm">
        <h5 className="card-title">{book.title}</h5>
        <p><strong>Author:</strong> {book.author}</p>
        <p><strong>Available:</strong> {book.availableCopies}</p>
        <button
          className="btn btn-success"
          disabled={book.availableCopies <= 0}
          onClick={reserve}
        >
          {book.availableCopies > 0 ? 'Reserve 📚' : 'Unavailable ❌'}
        </button>
      </div>
    </div>
  );
}

export default BookCard;
