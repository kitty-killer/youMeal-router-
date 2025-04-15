import { Link } from 'react-router-dom';
import './forgotPassword.scss';

export default function ForgotPassword() {
    return (
        <div className="auth-container">
            <h1>Forgot Password</h1>
            <form>
                <input type="email" placeholder="Email" />
                <button type="submit">Send Reset Password</button>
            </form>
            <Link to="/">Login</Link>
        </div>
    );
}
