import { useState } from 'react';
import { Link } from 'react-router';
import './forgotPassword.scss';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleResetPassword = (e) => {
        e.preventDefault();

        const auth = getAuth();

        sendPasswordResetEmail(auth, email)
            .then(() => {
                setMessage('Password reset email sent!');
                setError('');
            })
            .catch((error) => {
                setError('Error sending password reset email!');
                setMessage('');
            });
    };

    return (
        <div className="auth-container">
            <h1>Forgot Password</h1>
            <form onSubmit={handleResetPassword}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit">Send Reset Password</button>
            </form>
            {message && <p className="success-message">{message}</p>}
            {error && <p className="error-message">{error}</p>}
            <Link to="/login">Login</Link>
        </div>
    );
}
