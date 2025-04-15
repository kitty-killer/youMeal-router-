import './App.scss';
import Header from '../components/header/header.jsx';
import Footer from '../components/footer/footer.jsx';
import Main from '../components/main/main.jsx';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from '../pages/auth/login/Login';
import Register from '../pages/auth/register/Register';
import ForgotPassword from '../pages/auth/forgotPassword/ForgotPassword';

function ProtectedRoute({ children }) {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    return isAuthenticated ? children : <Navigate to="/" />;
}

export default function App() {
    return (
        <Router>
            <Header />
            <div className="main-container">
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/main" element={<ProtectedRoute><Main /></ProtectedRoute>} />
                </Routes>
            </div>
            <Footer />
        </Router>
    );
}
