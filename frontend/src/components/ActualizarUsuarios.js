import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ActualizarUsuarios() {
    const [users, setUsers] = useState([]);
    const [newData, setNewData] = useState({ nombre: '', email: '', telefono: '' });
    const [selectedData, setSelectedData] = useState(null);


    const handleInputChange = (e) => {
        setNewData({ ...newData, [e.target.name]: e.target.value });
    }

    const updateUser = (e) => {
        axios.put('http://localhost:5001/api/usuarios', newData)
            .then(res => {
                newData([...users, res.data]);
                setNewData({ nombre: '', email: '', telefono: '' });
            })
            .catch(err => console.error(err));
    }

    useEffect(() => {
        axios.get('http://localhost:5001/api/usuarios')
            .then(res => setUsers(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div style={{ padding: "20px" }}>
            <h2>Actualizar Usuarios</h2>
            <table border="1" cellPadding="10">
                <thead>
                    <tr>
                        <th>ID</th><th>Name</th><th>Email</th><th>Telefono</th><th>Actualizar Usuarios</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(u => (
                        <tr key={u.id}>
                            <td>{u.id}</td>
                            <td>{u.nombre}</td>
                            <td>{u.email}</td>
                            <td>{u.telefono}</td>
                            <td><button type="edit">Editar</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ActualizarUsuarios;