import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import './register.scss';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'; // Импортируем Firebase Auth

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();
    const auth = getAuth();

    const handleRegister = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Passwords do not match!');
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                setSuccessMessage('Registration successful! Redirecting to Login...');
                setError('');


                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            })
            .catch((error) => {
                setError(error.message);
                setSuccessMessage('');
            });
    };

    return (
        <div className="register-container">
            <h1>Register</h1>
            <form onSubmit={handleRegister}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button type="submit">Register</button>
            </form>

            {error && <p className="error-message">{error}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}

            <Link to="/login">Login</Link>
        </div>
    );
}
