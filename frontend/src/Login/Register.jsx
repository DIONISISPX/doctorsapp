import './Register.css';
import image from '../assets/medical-symbol-vector-414258.png';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import PatientService from '../service/PatientService.js';

export default function Register() {

    const navigate = useNavigate();
    const[formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        login: '',
        password: '',
    });
    const [error, setError] = useState('');

    function handleInputChange(e) {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const patientData = await PatientService.registerUser(formData);
            if (patientData.token) {
                localStorage.setItem('token', patientData.token);
                setFormData({
                    firstName: '',
                    lastName: '',
                    login: '',
                    password: ''
                });
                navigate('/home');
            }
        }catch(err){
            console.error(err);
            setError('User already exists!');
            setTimeout(() => {
                setError('');
            }, 5000);
        }
    }

    
    return (
        <>
            <div className="login-container">
                <div className="logo-container">
                    <img src={image} alt="medical" className="login-logo" />
                </div>
                {error && <p className="error-message" style={{color: 'red', textAlign: 'center'}}>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <ul className="login-form">
                        <h1 className="login-header">Welcome</h1>
                        <li>
                            <label>
                                First Name <br />
                                <input type="text" name='firstName' placeholder="Giorgos" value={formData.firstName} onChange={handleInputChange} required />
                            </label>
                        </li>
                        <li>
                            <label>
                                Last Name <br />
                                <input type="text" name='lastName' placeholder="Papadopoulos" value={formData.lastName} onChange={handleInputChange} required />
                            </label>
                        </li>
                        <li>
                            <label>
                                AMKA <br />
                                <input type="text" name='login' placeholder="12345678910" value={formData.login} onChange={handleInputChange} required />
                            </label>
                        </li>
                        <li>
                            <label>
                                Password <br />
                                <input type="password" name='password' placeholder="••••••••••" value={formData.password} onChange={handleInputChange} required />
                            </label>
                        </li>
                        <li>
                            <button type="submit" className="login-button">
                                Register
                            </button>
                        </li>
                        <li>
                            <label className="register-label">
                                Already have an account?
                                <button
                                    type="button"
                                    className="register-button"
                                    onClick={() => navigate('/login')}
                                    >
                                    Log-in
                                </button>
                            </label>
                        </li>
                    </ul>
                </form>
            </div>
        </>
    );
}
