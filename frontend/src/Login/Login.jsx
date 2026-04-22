import './Login.css';
import PatientService from '../service/PatientService.js';
import image from '../assets/medical-symbol-vector-414258.png';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const patientData = await PatientService.loginUser(login, password);
            if (patientData.token) {
                localStorage.setItem('token', patientData.token);
                console.log('Token:', patientData.token);
                console.log('Login successful!');
                navigate('/home');
            } else {
                setError(patientData.error || 'Invalid credentials');
            }
        } catch (error) {
            console.error(error);
            setError('Wrong AMKA or Password!');
            setTimeout(() => {
                setError('');
            }, 5000);
        }
    };

    return (
        <>
            <div className="login-container">
                <div className="logo-container">
                    <img src={image} alt="medical" className="login-logo" />
                </div>
                {error && <p>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <ul className="login-form">
                        <h1 className="login-header">Welcome</h1>
                        <li>
                            <label>
                                AMKA <br />
                                <input
                                    type="text"
                                    value={login}
                                    placeholder="12345678910"
                                    onChange={(e) => setLogin(e.target.value)}
                                />
                            </label>
                        </li>
                        <li>
                            <label>
                                Password <br />
                                <input
                                    type="password"
                                    value={password}
                                    placeholder="••••••••••"
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                            </label>
                        </li>
                        <li>
                            <button type="submit" className="login-button">
                                Log-in
                            </button>
                        </li>
                        <li>
                            <label className="register-label">
                                Don't have an account?
                                <button
                                    type="button"
                                    className="register-button"
                                    onClick={() => navigate('/register')}
                                >
                                    Register
                                </button>
                            </label>
                        </li>
                    </ul>
                </form>
            </div>
        </>
    );
}

export default Login;