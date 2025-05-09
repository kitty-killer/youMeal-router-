import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import './login.scss';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const auth = getAuth();

    const handleLogin = (e) => {
        e.preventDefault();

        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                toast.success('Успешный вход!');
                navigate('/');
            })
            .catch((error) => {
                let message = 'Произошла ошибка. Попробуйте снова.';

                switch (error.code) {
                    case 'auth/invalid-email':
                        message = 'Некорректный email.';
                        break;
                    case 'auth/user-disabled':
                        message = 'Учетная запись отключена.';
                        break;
                    case 'auth/user-not-found':
                        message = 'Пользователь не найден.';
                        break;
                    case 'auth/wrong-password':
                        message = 'Неверный пароль.';
                        break;
                    default:
                        message = 'Ошибка входа. Проверьте данные.';
                        break;
                }

                toast.error(message, {
                    autoClose: 5000,
                    position: 'top-center',
                });
            });
    };

    return (
        <div className="auth-container">
            <ToastContainer />
            <h1>Вход</h1>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Войти</button>
            </form>
            <div className="links">
                <Link to="/register">Регистрация</Link>
                <Link to="/forgot-password">Забыли пароль?</Link>
            </div>
        </div>
    );
}
