import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.scss';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        const userData = JSON.parse(localStorage.getItem('userData'));

        if (userData && userData.email === email && userData.password === password) {
            setError('');
            localStorage.setItem('isAuthenticated', 'true');

            navigate('/main');
        } else {
            setError('Invalid email or password!');
        }
    };

    return (
        <div className="auth-container">
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
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
                <button type="submit">Login</button>
            </form>
            {error && <p className="error-message">{error}</p>}
            <Link to="/register">Register</Link>
            <Link to="/forgot-password">Forgot Password</Link>
        </div>
    );
}
