import React, { useState } from 'react';
import axios from 'axios';

function Login({ onLoginSuccess }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:5001/api/login', { username, password });
            setMessage(response.data.message);
            onLoginSuccess(response.data.user);

        } catch (error) {
            console.error('Error:', error);
            setMessage('Ha ocurrido un error');
        }
    };

    return (
        <div>
            <header>
                <h1>Login</h1>
            </header>
            <div className="login">
                <input
                    type='text'
                    placeholder='Usuario'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type='password'
                    placeholder='Contraseña'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={handleSubmit}>
                    Ingresar
                </button>
                {message && <p>{message}</p>}
            </div>
        </div>
    );
}

export default Login;