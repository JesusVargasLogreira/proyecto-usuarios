import React, { useEffect, useState } from 'react';
import axios from 'axios';

function EliminarUsuarios() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        axios.get('http://localhost:5001/api/usuarios')
            .then(res => setUsers(res.data))
            .catch(err => console.error('Error al obtener usuarios:', err));
    };

    // Eliminar usuario
    const deleteUser = (id, nombre) => {
        const confirmar = window.confirm(`¿Seguro que deseas eliminar al usuario "${nombre}"?`);
        if (!confirmar) return;

        axios.delete(`http://localhost:5001/api/usuarios/${id}`)
            .then(() => {
                setUsers(users.filter(u => u.id !== id));
                alert(`Usuario "${nombre}" eliminado correctamente.`);
            })
            .catch(err => {
                console.error('Error al eliminar usuario:', err);
                alert('Hubo un error al eliminar el usuario.');
            });
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Eliminar Usuarios</h2>

            {users.length === 0 ? (
                <p>No hay usuarios registrados.</p>
            ) : (
                <table border="1" cellPadding="10">
                    <thead>
                        <tr>
                            <th>ID</th><th>Nombre</th><th>Email</th><th>Telefono</th><th>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(u => (
                            <tr key={u.id}>
                                <td>{u.id}</td>
                                <td>{u.nombre}</td>
                                <td>{u.email}</td>
                                <td>{u.telefono}</td>
                                <td>
                                    <button onClick={() => deleteUser(u.id, u.nombre)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default EliminarUsuarios;
