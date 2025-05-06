import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './register.scss';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();
    const auth = getAuth();

    const handleRegister = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error('Пароли не совпадают!');
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;


            const initialProfile = {
                email: user.email,
                fullName: "",
                phone: "",
                address: "",
                city: "",
                postalCode: "",
                birthDate: "",
                deliveryPreference: "",
                notes: "",
                avatar: null
            };

            localStorage.setItem(`userProfile_${user.uid}`, JSON.stringify(initialProfile));

            toast.success('Регистрация успешна! Заполните профиль', {
                autoClose: 2000,
                onClose: () => navigate('/profile')
            });

        } catch (error) {
            let errorMessage = 'Ошибка регистрации';
            switch(error.code) {
                case 'auth/email-already-in-use':
                    errorMessage = 'Этот email уже используется';
                    break;
                case 'auth/invalid-email':
                    errorMessage = 'Некорректный email';
                    break;
                case 'auth/weak-password':
                    errorMessage = 'Пароль должен содержать минимум 6 символов';
                    break;
                default:
                    errorMessage = error.message;
            }
            toast.error(errorMessage);
        }
    };

    return (
        <div className="register-container">
            <h1>Регистрация</h1>
            <form onSubmit={handleRegister}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength="6"
                />
                <input
                    type="password"
                    placeholder="Подтвердите пароль"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <button type="submit">Зарегистрироваться</button>
            </form>

            <p className="login-link">
                Уже есть аккаунт? <Link to="/login">Войти</Link>
            </p>
        </div>
    );
}