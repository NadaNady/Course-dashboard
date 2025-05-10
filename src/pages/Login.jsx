import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';
import "@/styles/Login.css"
import Header from '@/components/Header';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


    const handleLogin = (e) => {
        e.preventDefault();
        localStorage.setItem('User', email);
        localStorage.setItem('password', password);
        localStorage.setItem('userLoggedIn', JSON.stringify(true));
        toast.success('LogIn successful!');
        navigate('/courses');
    };


    return (
        <>
            <Header />
            <div className="login-container">
                <h1>Login</h1>
                <form className="login-form" onSubmit={handleLogin}>
                    <input
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    />
                    <input
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    />
                    <button className='sign-button' type="submit">SIGN IN</button>
                </form>
                <div className="login-links mt-5">
                    <a href="/register">Create Account</a>
                    <a href="#">Forgot your password?</a>
                </div>
            </div>
        </>
    )
}
