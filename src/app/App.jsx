import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom';
import Header from '../components/header/header.jsx';
import Footer from '../components/footer/footer.jsx';
import Main from '../pages/main/main.jsx';
import Login from '../pages/auth/login/Login';
import Register from '../pages/auth/register/Register';
import ForgotPassword from '../pages/auth/forgotPassword/ForgotPassword';
import Profile from '../pages/profile/Profile';
import OrderHistory from '../pages/order history/OrderHistory';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ProtectedRoute({ children }) {
    const auth = getAuth();
    const user = auth.currentUser;
    return user ? children : <Navigate to="/login" />;
}

export default function App() {
    const auth = getAuth();
    const [user, setUser] = useState(null);
    const [profileComplete, setProfileComplete] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                const savedData = localStorage.getItem(`userProfile_${user.uid}`);
                if (savedData) {
                    const profileData = JSON.parse(savedData);
                    if (!profileData.fullName || !profileData.address || !profileData.phone) {
                        setProfileComplete(false);
                    } else {
                        setProfileComplete(true);
                    }
                } else {
                    setProfileComplete(false);
                }
            }
        });

        return () => unsubscribe();
    }, [auth, navigate]);

    useEffect(() => {
        if (user && !profileComplete) {
            toast.warning(
                <div>
                    <h4>Пожалуйста, заполните профиль!</h4>
                    <p>Ваши данные не полные. <Link to="/profile">Перейти в профиль</Link></p>
                </div>,
                {
                    autoClose: 100,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                }
            );
        }
    }, [user, profileComplete]);

    return (
        <>
            <ToastContainer position="top-right" />
            <Header>
                {user && (
                    <Link to="/profile" className="profile-link">Профиль</Link>
                )}
            </Header>
            <div className="main-container">
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/" element={<ProtectedRoute><Main /></ProtectedRoute>} />
                    <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                    <Route path="/order-history" element={<ProtectedRoute><OrderHistory /></ProtectedRoute>} />
                </Routes>
            </div>
            <Footer />
        </>
    );
}
