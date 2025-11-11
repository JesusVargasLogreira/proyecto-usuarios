import React, { useState } from 'react';
import axios from 'axios';

function AgregarUsuarios() {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({ nombre: '', email: '', telefono: '' });

    const handleInputChange = (e) => {
        setNewUser({ ...newUser, [e.target.name]: e.target.value });
    };

    // Agregar Usuario
    const addUser = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5001/api/usuarios', newUser)
            .then(res => {
                setUsers([...users, res.data]);
                setNewUser({ nombre: '', email: '', telefono: '' });
            })
            .catch(err => console.error(err));
    };

    return (
        <div>
            <h2>Agregar Usuario</h2>
            <form onSubmit={addUser}>
                <label>
                    Nombre:
                    <input
                        type="text"
                        name="nombre"
                        value={newUser.nombre}
                        onChange={handleInputChange}
                    />
                </label>
                <br />

                <label>
                    Email:
                    <input
                        type="text"
                        name="email"
                        value={newUser.email}
                        onChange={handleInputChange}
                    />
                </label>
                <br />

                <label>
                    Telefono:
                    <input
                        type="text"
                        name="telefono"
                        value={newUser.telefono}
                        onChange={handleInputChange}
                    />
                </label>
                <br />

                <button type="submit">Agregar</button>
            </form>
        </div>
    );
}

export default AgregarUsuarios;
