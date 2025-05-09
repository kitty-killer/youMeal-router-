import { useState } from 'react';
import { Link } from 'react-router-dom';
import './forgotPassword.scss';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleResetPassword = (e) => {
        e.preventDefault();

        const auth = getAuth();

        sendPasswordResetEmail(auth, email)
            .then(() => {
                setMessage('Письмо для сброса пароля отправлено!');
                setError('');
                toast.success('Письмо для сброса пароля отправлено!');
            })
            .catch((error) => {
                let errorMessage = 'Ошибка при отправке письма для сброса пароля!';
                if (error.code === 'auth/invalid-email') {
                    errorMessage = 'Некорректный email';
                } else if (error.code === 'auth/user-not-found') {
                    errorMessage = 'Пользователь с таким email не найден';
                }
                setError(errorMessage);
                setMessage('');
                toast.error(errorMessage);
            });
    };

    return (
        <div className="auth-container">
            <h1>Восстановление пароля</h1>
            <form onSubmit={handleResetPassword}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit">Отправить письмо для сброса пароля</button>
            </form>
            {message && <p className="success-message">{message}</p>}
            {error && <p className="error-message">{error}</p>}
            <Link to="/login">Войти</Link>
        </div>
    );
}
