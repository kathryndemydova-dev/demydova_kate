import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
            <h1>404 - Page not found</h1>
            <p>You may have entered an incorrect address or the page does not exist.</p>
            <Link
                to="/"
                style={{
                    display: 'inline-block',
                    marginTop: '1rem',
                    padding: '10px 20px',
                    backgroundColor: '#ccc',
                    borderRadius: '5px',
                    textDecoration: 'none'
                }}
            >
                Go to Home
            </Link>
        </div>
    );
}