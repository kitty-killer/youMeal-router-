import './App.scss';
import Header from '../components/header/header.jsx';
import Footer from '../components/footer/footer.jsx';
import Main from '../components/main/main.jsx';
import { Routes, Route, Navigate } from 'react-router';
import Login from '../pages/auth/login/Login';
import Register from '../pages/auth/register/Register';
import ForgotPassword from '../pages/auth/forgotPassword/ForgotPassword';
import { getAuth } from 'firebase/auth';

function ProtectedRoute({ children }) {
    const auth = getAuth();
    const user = auth.currentUser;
    return user ? children : <Navigate to="/login" />;
}

export default function App() {
    return (
        <>
            <Header />
            <div className="main-container">
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/" element={<ProtectedRoute><Main /></ProtectedRoute>} />
                </Routes>
            </div>
            <Footer />
        </>
    );
}
